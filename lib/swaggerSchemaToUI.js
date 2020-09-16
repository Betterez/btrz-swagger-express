const uuid = require("uuid");

function findSchema(schema, name) {
  let result = null;
  if (schema && schema.definitions) {
    result = schema.definitions[name];
  }
  return result;
}

function generateValidations(result, formName) {
  const validations = (result.required || []).map((n) => {
    // eslint-disable-next-line no-param-reassign
    const validator = {
      name: `${formName}${n}`,
      required: true
    };
    if (result.properties[n].pattern && !result.properties[n].enum) {
      validator.regexp = `helpers.regex('${formName}${n}RegexVal', /${result.properties[n].pattern}/)`;
    }
    if (result.properties[n].enum) {
      validator.key = true;
    }
    return validator;
  });
  return validations;
}

function isEnumWithNoOption(property) {
  return property.type === "string" && property.enum && !property.options;
}

function addOptionsToEnum(property) {
  if (isEnumWithNoOption(property)) {
    property.options = property.enum.map((e) => {
      return {
        key: e,
        value: e
      };
    });
    property.selectedOption = "";
  }
}

function addSelectOption(model, property, propName) {
  if (model && model[propName] && property.options) {
    property.selectedOption = property.options.find((o) => {
      return o.key === model[propName];
    }) || "";
  }
}

function processExtraProps(extraProps, schemaName, propName, property) {
  if (extraProps && extraProps[`${schemaName}.${propName}`]) {
    if (extraProps[`${schemaName}.${propName}`].options) {
      property.options = extraProps[`${schemaName}.${propName}`].options;
      property.selectedOption = "";
      property.enum = [];
    }
    if (extraProps[`${schemaName}.${propName}`].hint) {
      property.hint = extraProps[`${schemaName}.${propName}`].hint;
    }
  }
}

function getModelNameFromRef(reference) {  
  const modelPathSplit = reference.split("/");
  const model = modelPathSplit[modelPathSplit.length - 1];
  return model;
}

function getKey(propName, accountId, model) {
  if (model && model.lexiconKeys && model.lexiconKeys[propName] && model.lexiconKeys[propName].key) {
    return model.lexiconKeys[propName].key;
  } 
  return `${propName}-${accountId}-${uuid.v4()}`;
}

function getCleanKeyValues(propName, accountId, model) {
  return {
    key: getKey(propName, accountId, model),
    values: {
      "en-us": ""
    }
  };
}

/**
 * 
 * @param {Object} schema The swagger schema
 * @param {Object} property The lexiconKeys property with the reference to the translatable properties object
 */

function getTranslatableProps(schema, property, accountId, model) {
  const lexiconKeys = findSchema(schema, getModelNameFromRef(property["$ref"] || ""));  
  const lexiconKeyValues = findSchema(schema,"LexiconKeyValues");
  const lexiconValues = findSchema(schema,"LexiconValues");  

  lexiconKeyValues.properties.values = lexiconValues;
  lexiconKeys.model = {};

  Object.keys(lexiconKeys.properties).forEach((p) => {
    lexiconKeys.properties[p] = Object.assign(lexiconKeyValues, {});
    lexiconKeys.model[p] = getCleanKeyValues(p, accountId, model);
  });  

  return lexiconKeys;
}

module.exports = {
  /**
   * Generate a UI compatible (enhanced) swagger schema, and pre generates some Vue validations to be used
   * with Vuelidate
   *
   * @param {object} schema The swagger schema
   * @param {string} schemaName The name of the main property in the swagger schema
   * @param {object} extraProps An object with keys to add options and override properties of the schema
   * @param {string} formName The name of the form in the UI, used to generate validations
   * @param {object} model The model with the data, to preselect combo items (for example)
   */
  swaggerSchemaToUI(schema, schemaName, extraProps, formName, model, accountId) {
    const result = findSchema(schema, schemaName);
    if (!result) {
      return null;
    }
    let translatableProps = {};

    Object.keys(result.properties).forEach((propName) => {
      const property = result.properties[propName];      

      if (propName === "lexiconKeys") {
        translatableProps = getTranslatableProps(schema, property, accountId, model);
      }      

      processExtraProps(extraProps, schemaName, propName, property);
      addOptionsToEnum(property);
      addSelectOption(model, property, propName);
    });
    
    result.properties.lexiconKeys = translatableProps;
    result.validations = generateValidations(result, formName);
    return result;
  }
}