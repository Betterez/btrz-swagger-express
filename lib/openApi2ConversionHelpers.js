'use strict';

var _ = require('lodash');

module.exports.getBodySchema = getBodySchema;
module.exports.convertModelsToOpenApi2 = convertModelsToOpenApi2;



function getBodySchema(param){
  if(param.type === "string" || param.type === "number" || param.type === "integer" || param.type === "boolean"){
    return {
      "type": param.type
    };
  }
  else if(param.type === "array"){
    return {
      "properties": {
        "sources": {
          "type": "array",
          "items": { 
            "$ref": "#/definitions/" + param.items.$ref 
          }
        }
      }
    };
  }
  return {
    "$ref": "#/definitions/" + param.type
  };
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
          if(modelValue.properties[propKey]["type"] && modelValue.properties[propKey]["type"] === "object"){
            delete modelValue.properties[propKey]["type"];
          }
        }
        if (modelValue.properties[propKey]["items"] && modelValue.properties[propKey]["items"]["$ref"]) {
          modelValue.properties[propKey]["items"]["$ref"] = "#/definitions/" + modelValue.properties[propKey]["items"]["$ref"];
        }
      });

    }

  });
};
