'use strict';

const _ = require('lodash');

module.exports.convertOperation = convertOperationToOpenApi2;
module.exports.convertModelsToOpenApi2 = convertModelsToOpenApi2;
module.exports.setParameters = setParameters;
module.exports.setResponses = setResponses;
module.exports.getBodySchema = getBodySchema;
module.exports.getSpecPath = getOperationPath;
module.exports.getSpecMethod = getOperationMethod;
module.exports.getSpecVisibility = getOperationVisibility;

//using the developer created spec object to get the path, using eith new or older OpenApi schema style
function getOperationVisibility(spec) {
  let isSpecVisible = false;

  //take care of 1.2 spec declaration
  isSpecVisible = (spec.hideInDocumentation || spec.hideInDocumentation === true); 

  //search for it in OpenApi 2 object


  return pathName;
}

//using the developer created spec object to get the path, using eith new or older OpenApi schema style
function getOperationVisibility(spec) {
  pathName = (operationValue.path) ? operationValue.path : Object.keys(operationValue)[0];

  return pathName;
}

//using the developer created spec object to get the path, using eith new or older OpenApi schema style
function getOperationPath(spec) {
  pathName = (operationValue.path) ? operationValue.path : Object.keys(operationValue)[0];

  return pathName;
}

function getOperationMethod(operationPathValue) {
  // All the potential Operation Object types in Open Api 2
  const methods = ["get", "post", "delete", "put", "patch", "options", "head"];

  // most likely a single key, but need to account for $ref and global parameters
  const objectKeys = Object.keys(operationPathValue);

  for (var key in objectKeys) {
    for (var prop in methods) {
      if (objectKeys[key] === methods[prop]) {
        return objectKeys[key];
      }
    }
  }

  return "MethodNotFound";

}

function getBodySchema(param) {
  if (param.schema) {
    return param.schema;
  } else {
    if (param.type === "string" || param.type === "number" || param.type === "integer" || param.type === "boolean") {
      return {
        "type": param.type
      };
    }
    else if (param.type === "array") {
      return {
        "type": "array",
        "items": {
          "$ref": "#/definitions/" + param.items.$ref
        }
      };
    }
    return {
      "$ref": "#/definitions/" + param.type
    };
  }
}

// If using old style errorResponse, convert to OPenApi 2 responses.  Otherwise just assign responses
function setResponses(docPathMethod, operationValue) {
  //if OpenApi 2.0 responses were sent, hopefully no need to make any changes
  if (!_.isEmpty(operationValue.responses)) {
    docPathMethod["responses"] = operationValue.responses;
  } else {
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
          "description": docPathMethod["responses"][response.code].description + "\n\n" + responseDescription
        }
      }

      //need to deal with responseModel from old 1.2 spec.  Currently for simple object declaration. Include hack to ignore string at the moment
      if (response.responseModel && response.responseModel !== "string") {
        if (response.responseModel !== "file") {
          docPathMethod["responses"][response.code]["schema"] = {
            "$ref": "#/definitions/" + response.responseModel
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

function convertModelsToOpenApi2(models) {
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

      //required can't be included if it is empty
      if (modelValue.required && modelValue.required.length === 0) {
        delete modelValue.required;
      }

      //if there is no type described, add a type of model.
      if (!modelValue.type) {
        modelValue["type"] = "object";
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
          modelValue.properties[propKey]["$ref"] = "#/definitions/" + modelValue.properties[propKey]["$ref"];
          if (modelValue.properties[propKey]["type"] && modelValue.properties[propKey]["type"] === "object") {
            delete modelValue.properties[propKey]["type"];
          }
        }
        if (modelValue.properties[propKey]["items"] && modelValue.properties[propKey]["items"]["$ref"]) {
          modelValue.properties[propKey]["items"]["$ref"] = "#/definitions/" + modelValue.properties[propKey]["items"]["$ref"];
        }
      });

    }

  });
}

//transform the existing definition into a Swagger 2 friendly format
function convertOperationToOpenApi2(doc, operationValue, key) {
  const
    self = this,
    // the usage of Object.keys method assumes only one property for native OpenApi 2 object, may need to revisit
    pathName = operationValue.path,
    method = operationValue.method.toLowerCase();

  if (!doc.paths[pathName]) {
    doc.paths[pathName] = {};
  }

  // if there is an operation property, it must be a new declaration  ignore this for now
  // if (operationValue.operation) {
  //   doc.paths[pathName][method] = operationValue.operation;
  // } else {
      doc.paths[pathName][method] = {
        "tags": [
          key
        ],
        "summary": operationValue.summary,
        "description": operationValue.description,
        "operationId": operationValue.nickname,
        "produces": operationValue.produces,
        "consumes": (operationValue.consumes) ? operationValue.consumes : [],
        "parameters": [],
        "responses": {},
        "deprecated": operationValue.deprecated || false
      };

      setResponses(doc.paths[pathName][method], operationValue);

      setParameters(doc.paths[pathName][method], operationValue);
  // }
}

