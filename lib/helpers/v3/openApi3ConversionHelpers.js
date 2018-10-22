"use strict";

const _ = require("lodash");

function transformResponseCode(item) {
  if (!item.contentType) {
    item["contentType"] = "application/json";
  }
  return {
    [item.code]: {
      "description": item.reason,
      "content": {
        [item.contentType]: (!item.responseModel) ? {} : {
          "schema": {
            "$ref": `#/components/schemas/${item.responseModel}`
          }
        }
      } 
    }  
  };
}

function generateResponses(responseCodes) {
  const responses = {},
    transformedResponses = responseCodes.map(transformResponseCode);
  
  transformedResponses.forEach((response) => {
    for (const key in response) {
      if (response.hasOwnProperty(key)) {
        responses[key] = response[key];
      }
    }
  });

  return responses;
}

function getBodySchema(param) {
  if (param.schema) {
    return param.schema;
  } else {
    if (param.type === "string" || param.type === "number" || param.type === "integer" || param.type === "boolean") {
      return {
        "type": param.type
      };
    } else if (param.type === "array") {
      return {
        "type": "array",
        "items": {
          "$ref": "#/components/schemas/" + param.items.$ref
        }
      };
    }
    return {
      "$ref": "#/components/schemas/" + param.type
    };
  }
}

// If using old style errorResponse, convert to OPenApi 2 responses.  Otherwise just assign responses
function setResponses(docPathMethod, operationValue) {
  //if OpenApi 2.0 responses were sent, hopefully no need to make any changes
  if (!_.isEmpty(operationValue.responses)) {
    docPathMethod["responses"] = operationValue.responses;
  } else {
    if (operationValue.errorResponses) {
      operationValue.errorResponses.forEach(function (response) {
        let responseDescription = (!response.reason) ? response.message : response.reason;
        //check if response code already exists
        if (!docPathMethod["responses"][response.code]) {
          docPathMethod["responses"][response.code] = {
            "description": responseDescription
          }
        }
        else {
          docPathMethod["responses"][response.code] = {
            "description": (docPathMethod["responses"][response.code].description.startsWith("\n- ")) ? docPathMethod["responses"][response.code].description + "\n- " + responseDescription : "\n- " + docPathMethod["responses"][response.code].description + "\n- " + responseDescription
          }
        }

        //need to deal with responseModel from old 1.2 spec.  Currently for simple object declaration. Include hack to ignore string at the moment
        if (response.responseModel && response.responseModel !== "string") {
          if (response.responseModel !== "file") {
            docPathMethod["responses"][response.code]["schema"] = {
              "$ref": "#/components/schemas/" + response.responseModel
            }
          }
          else {
            docPathMethod["responses"][response.code]["schema"] = {
              "type": response.responseModel
            }
          }
        }
      });
    }

  }
}

// If using old style errorResponse, convert to OPenApi 2 responses.  Otherwise just assign responses
function setParameters(docPathMethod, operationValue) {
  if (operationValue.parameters && operationValue.parameters.length > 0) {
    operationValue.parameters.forEach(function (param) {
      //set the param.type to lowercase, to eliminate the String vs string issue plaguing the OPenApi 2 docs
      if (param.type === "String" || param.type === "Number" || param.type === "Integer" || param.type === "Boolean") {
        param.type = (param.type) ? param.type.toLowerCase() : param.type
      }

      if (param.paramType === "body" || (param.in && param.in === "body")) {
        docPathMethod["parameters"].push({
          "name": param.name,
          "in": (param.in) ? param.in : param.paramType,
          "description": param.description,
          "required": param.required,
          "schema": getBodySchema(param)
        });
      }
      else if (param.paramType === "path" || param.paramType === "query" || param.paramType === "form" || param.paramType === "form") {
        let convertedParam = {
          "name": param.name,
          "in": (param.in) ? param.in : (param.paramType === "form") ? "formData" : param.paramType,
          "description": param.description,
          "required": param.required,
          "type": param.type
        }
        if (param.format) {
          convertedParam["format"] = param.format;
        }
        if (param.enum) {
          convertedParam["enum"] = param.enum;
        }

        docPathMethod["parameters"].push(convertedParam);
      }
    });
  }
}

function convertModelsToOpenApi3(models) {
  //console.dir(models, {depth:null});
  _.forOwn(models, function (modelValue, key) {
    //id | _id are not allowed in api spec 2
    if (modelValue) {
      if (modelValue.id) {
        delete modelValue.id;
      }

      if (modelValue._id) {
        delete modelValue._id;
      }

      //required can"t be included if it is empty
      if (modelValue.required && modelValue.required.length === 0) {
        delete modelValue.required;
      }

      // if there is no type described, add a type of model.
      if (!modelValue.type) {
        modelValue["type"] = "object";
      }

      if (modelValue.oneOf) {
        modelValue.oneOf = modelValue.oneOf.map((item) => {
          return {
            "$ref": `#/components/schemas/${item["$ref"]}`
          };
        });
      }

      _.forOwn(modelValue.properties, function (propValue, propKey) {
        if (modelValue.properties[propKey].type === "dateTime") {
          modelValue.properties[propKey].type = "string";
          modelValue.properties[propKey]["format"] = "date-time";
        }

        if (modelValue.properties[propKey]["chance"]) {
          delete modelValue.properties[propKey]["chance"];
        }

        if (modelValue.properties[propKey]["faker"]) {
          delete modelValue.properties[propKey]["faker"];
        }

        if (modelValue.properties[propKey]["$ref"]) {
          modelValue.properties[propKey]["$ref"] = "#/components/schemas/" + modelValue.properties[propKey]["$ref"];
          if (modelValue.properties[propKey]["type"] && modelValue.properties[propKey]["type"] === "object") {
            delete modelValue.properties[propKey]["type"];
          }
        }
        if (modelValue.properties[propKey]["items"] && modelValue.properties[propKey]["items"]["$ref"]) {
          modelValue.properties[propKey]["items"]["$ref"] = "#/components/schemas/" + modelValue.properties[propKey]["items"]["$ref"];
        }
      });

    }

  });
}

// transform the existing definition into a Swagger 2 friendly format
function convertOperationToOpenApi3(doc, operationValue, key) {
  const
    // the usage of Object.keys method assumes only one property for native OpenApi 2 object, may need to revisit
    pathName = operationValue.path,
    method = operationValue.method.toLowerCase();

  if (!doc.paths[pathName]) {
    doc.paths[pathName] = {};
  }

  doc.paths[pathName][method] = {
    "tags": [
      key
    ],
    "summary": operationValue.summary,
    "description": operationValue.description,
    "operationId": operationValue.nickname,
    "parameters": operationValue.parameters,
    "responses": operationValue.responses,
    "deprecated": operationValue.deprecated || false
  };
  
  if (operationValue.security) {
    doc.paths[pathName][method].security = operationValue.security;
  }

  // setResponses(doc.paths[pathName][method], operationValue);
  // setParameters(doc.paths[pathName][method], operationValue);
}

function getQueryParam(paramValues) {
  return {
    "in": "query",
    "name": paramValues.name,
    "description": paramValues.description,
    "required": paramValues.required || false,
    "enum": paramValues.allowableValuesEnum,
    "defaultValue": paramValues.defaultValue,
    "schema": {
      "type": paramValues.type.toLowerCase()
    }
  };
}

function getPathParam(paramValues) {
  return {
    "in": "path",
    "name": paramValues.name,
    "description": paramValues.description,
    "required": true,
    "enum": paramValues.allowableValuesEnum,
    "defaultValue": paramValues.defaultValue,
    "schema": {
      "type": paramValues.type.toLowerCase()
    }
  };
}

module.exports.convertOperation = convertOperationToOpenApi3;
module.exports.convertModels = convertModelsToOpenApi3;
// module.exports.setParameters = setParameters;
// module.exports.setResponses = setResponses;
module.exports.getBodySchema = getBodySchema;
module.exports.generateResponses = generateResponses;
module.exports.getQueryParam = getQueryParam;
module.exports.getPathParam = getPathParam;

