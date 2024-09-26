'use strict';

describe('swagger 2 conversion helpers', function () {
  const expect = require("chai").expect;
  const conversionHelper = require('../lib/openApi2ConversionHelpers.js');
  const paramTypes = require('../lib/paramTypes.js')
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

  it('should convert a body parameter with a schema that contains a $ref to valid OpenApi 2.0 format', function () {
    let sampleObjectParam = {
      name: "testObject",
      description: "testObject required.",
      schema: {
        $ref: "objectToPointTo"
      },
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
        "type": "object",
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
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      }
    }
    );
  });

  it('should add type: object if no type exists', function () {
    let models = {
      "Info": {
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
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          }
        }
      }
    }
    );
  });

  it('should add 1.2 errorResponses to new 2.0 responses', function () {
    let doc = {
      tags: ['customer'],
      responses: {}
    },
      opValue = {
        errorResponses:
          [{ code: 200, reason: 'Success', responseModel: 'Customer' },
          { code: 401, reason: 'Missing or invalid X-API-KEY header' },
          { code: 400, reason: 'Customer not found in body' },
          { code: 409, reason: 'Customer already exists.' }]
      },
      docAfterValue = {
        tags: ['customer'],
        responses: {
          '200': {
            description: 'Success', schema: {
              "$ref": "#/definitions/Customer"
            }
          },
          '400': { description: 'Customer not found in body' },
          '401': { description: 'Missing or invalid X-API-KEY header' },
          '409': { description: 'Customer already exists.' }
        }
      }

    conversionHelper.setResponses(doc, opValue);

    expect(doc).to.deep.equal(docAfterValue);
  });

  it('should leave 2.0 responses unmodified', function () {
    let doc = {
      tags: ['customer'],
      responses: {}
    },
      opValue = {
        responses: {
          "200": {
            description: "Success",
            schema: {
              "$ref": "#/definitions/Customer"
            }
          },
          "400": { description: "Customer not found in body" },
          "401": { description: "Missing or invalid X-API-KEY header" },
          "409": { description: "Customer already exists." }
        }
      },
      docAfterValue = {
        tags: ['customer'],
        responses: {
          "200": {
            description: "Success",
            schema: {
              "$ref": "#/definitions/Customer"
            }
          },
          "400": { description: "Customer not found in body" },
          "401": { description: "Missing or invalid X-API-KEY header" },
          "409": { description: "Customer already exists." }
        }
      }

    conversionHelper.setResponses(doc, opValue);

    expect(doc).to.deep.equal(docAfterValue);
  });

  it('should convert body parameter set with paramTypes.body to OpenApi 2 format', function () {
    let
      doc = {
        tags: ['customer'],
        parameters: []
      },
      opValue = {
        parameters: [
          paramTypes.body("s3Bucket", "Elements required to post a s3 bucket for the account", "s3BucketPost", null, true)
        ]
      },
      docAfterValue = {
        tags: ['customer'],
        parameters:
          [
            {
              in: "body",
              name: 's3Bucket',
              description: 'Elements required to post a s3 bucket for the account',
              required: true,
              schema: {
                "$ref": "#/definitions/s3BucketPost"
              }
            }
          ]
      }

    conversionHelper.setParameters(doc, opValue);

    expect(doc).to.deep.equal(docAfterValue);
  });

  it('should not convert schema property if it has already been set. (Ie, already using 2.0 syntax)', function () {
    let
      doc = {
        tags: ['customer'],
        parameters: []
      },
      opValue = {
        parameters:
          [
            {
              in: 'body',
              name: 's3Bucket',
              description: 'Elements required to post a s3 bucket for the account',
              required: true,
              schema: { '$ref': '#/definitions/s3BucketPost' }
            }
          ]
      },
      docAfterValue = {
        tags: ['customer'],
        parameters:
          [
            {
              in: 'body',
              name: 's3Bucket',
              description: 'Elements required to post a s3 bucket for the account',
              required: true,
              schema: { '$ref': '#/definitions/s3BucketPost' }
            }
          ]
      }

    conversionHelper.setParameters(doc, opValue);

    expect(doc).to.deep.equal(docAfterValue);
  });

  it('should convert primitive types to lowercase', function () {
    let
      doc = {
        tags: ['customer'],
        parameters: []
      },
      opValue = {
        parameters:
          [
            paramTypes.query("parcelString", "The parcel String", "String"),
            paramTypes.query("parcelInteger", "The parcel Integer", "Integer"),
            paramTypes.query("parcelNumber", "The parcel Number", "Number"),
            paramTypes.query("parcelBoolean", "The parcel Boolean", "Boolean")
          ]
      },
      docAfterValue = {
        tags: ['customer'],
        parameters:
          [
            {
              'in': "query",
              'name': "parcelString",
              'description': "The parcel String",
              'type': "string",
              'required': false
            },
            {
              'in': "query",
              'name': "parcelInteger",
              'description': "The parcel Integer",
              'type': "integer",
              'required': false
            },
            {
              'in': "query",
              'name': "parcelNumber",
              'description': "The parcel Number",
              'type': "number",
              'required': false
            },
            {
              'in': "query",
              'name': "parcelBoolean",
              'description': "The parcel Boolean",
              'type': "boolean",
              'required': false
            }
          ]
      }

    conversionHelper.setParameters(doc, opValue);

    expect(doc).to.deep.equal(docAfterValue);
  });

  it("should convert OpenApi 1.2 syntax to OpenApi 2 syntax", () => {
    const
      key = "customers",
      doc = {
        paths: {}
      },
      opValue = {
        "path": "/customers/{customerId}/credentials",
        "method": "POST",
        "parameters": [
          paramTypes.path("customerId", "The Customer ID", "string"),
          {
            "name": "body",
            "in": "body",
            "description": "Customer credential data",
            "required": true,
            "type": "PasswordConfirmationCredentialsPost",
          }
        ],
        "summary": "Set new Customer Credential",
        "description": "Sets the Credential of a Customer account that doesn't have it configured. Password must be at least 6 characters long and match the confirmation. The Credential will be pending validation (token+email).",
        "produces": ["text/plain"],
        "type": "string",
        "errorResponses": [
          {"code": 200, "reason": "Success", "responseModel": "string"},
          {"code": 401, "reason": "Missing or invalid X-API-KEY header"},
          {"code": 400, "reason": "Invalid Customer ID."},
          {"code": 400, "reason": "Invalid password or confirmation does not match."},
          {"code": 404, "reason": "Customer not found."},
          {"code": 400, "reason": "Customer account already has the Credential configured."},
          {"code": 400, "reason": "Password must be at least 6 characters long."},
          {"code": 400, "reason": "passwordConfirmation is required"},
          {"code": 400, "reason": "password is required"},
          {"code": 400, "reason": "Invalid email"},
          {"code": 400, "reason": "A customer with this email credential already exists"},
        ],
        "nickname": "change-customer-credential"
      },
      docAfterValue = {
        paths: {
          "/customers/{customerId}/credentials": {
            "post": {
              "tags": [
                "customers"
              ],
              "summary": "Set new Customer Credential",
              "description": "Sets the Credential of a Customer account that doesn't have it configured. Password must be at least 6 characters long and match the confirmation. The Credential will be pending validation (token+email).",
              "operationId": "change-customer-credential",
              "produces": [
                "text/plain"
              ],
              "consumes": [],
              "parameters": [
                {
                  "name": "customerId",
                  "in": "path",
                  "description": "The Customer ID",
                  "required": true,
                  "type": "string"
                },
                {
                  "name": "body",
                  "in": "body",
                  "description": "Customer credential data",
                  "required": true,
                  "schema": {
                    "$ref": "#/definitions/PasswordConfirmationCredentialsPost"
                  }
                }
              ],
              "responses": {
                "200": {
                  "description": "Success"
                },
                "400": {
                  "description": "\n- Invalid Customer ID.\n- Invalid password or confirmation does not match.\n- Customer account already has the Credential configured.\n- Password must be at least 6 characters long.\n- passwordConfirmation is required\n- password is required\n- Invalid email\n- A customer with this email credential already exists"
                },
                "401": {
                  "description": "Missing or invalid X-API-KEY header"
                },
                "404": {
                  "description": "Customer not found."
                }
              },
              "deprecated": false
            }
          }
        }
      };

    conversionHelper.convertOperation(doc, opValue, key);

    expect(doc).to.deep.equal(docAfterValue);
  });
});
