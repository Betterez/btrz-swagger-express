'use strict';

describe('swagger 2 conversion helpers', function () {
  const expect = require("chai").expect;
  const conversionHelper = require('../lib/openApi2ConversionHelpers.js');

  let sampleArrayParam = {

  };
  let sampleObjectParam = {

  };

  it('should convert body primitive to valid OpenApi 2.0 format', function () {
    let samplePrimitiveParam = {
      name: "testPrimitive",
      description: "testPrimitive id required.",
      type: "string",
      required: true,
      paramType: "body"
    };

    let schemaObject = conversionHelper.getBodySchema(samplePrimitiveParam);

    expect(schemaObject).to.deep.equal({ "type": "string" });

  });

  it('should convert body array type to valid OpenApi 2.0 format', function () {
    let sampleArrayParam = {
      name: "testArray",
      description: "List of testOperations to apply.",
      type: "array",
      required: true,
      paramType: "body",
      defaultValue: null,
      items: { "$ref": "objectToPointTo" }
    };

    let schemaObject = conversionHelper.getBodySchema(sampleArrayParam);

    expect(schemaObject).to.deep.equal({
      type: 'array',
      items: { '$ref': '#/definitions/objectToPointTo' }
    });
  });
  /*
  {
  "name": "operations",
  "in": "body",
  "description": "List of operations to apply to a promo.",
  "required": true,
  "schema": {
  "properties": {
  "sources": {
  "type": "array",
  "items": {
  "$ref": "#/definitions/PromoUpdateOperation"
  }
  }
  }
  }
  }
  */
  it('should convert body object type to valid OpenApi 2.0 format', function () {
    let sampleObjectParam = {
      name: "testObject",
      description: "testObject required.",
      type: "objectToPointTo",
      required: true,
      paramType: "body"
    };

    let schemaObject = conversionHelper.getBodySchema(sampleObjectParam);

    expect(schemaObject).to.deep.equal({ "$ref": "#/definitions/objectToPointTo" });
  });

  it('should convert model to OpenAPI 2.0 friendly format', function () {
    let models = {
      "Info": {
        "id": "Info",
        "required": [],
        "properties": {
          "name": {
            "type": "string"
          }
        }
      }
    };

    conversionHelper.convertModelsToOpenApi2(models);

    expect(models).to.deep.equal({
      "Info": {
        "properties": {
          "name": {
            "type": "string"
          }
        }
      }
    }
    );
  });

});
