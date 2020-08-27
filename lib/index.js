const params = require("./paramTypes");
const errorHandling = require("./errorHandling");
const swagger = require("./swagger");
const {
  swaggerSchemaToUI
} = require("./swaggerSchemaToUI");

module.exports = swagger;
module.exports.params = params;
module.exports.queryParam = params.query;
module.exports.pathParam = params.path;
module.exports.bodyParam = params.body;
module.exports.formParam = params.form;
module.exports.headerParam = params.header;
module.exports.error = errorHandling.error;
module.exports.swaggerSchemaToUI = swaggerSchemaToUI;
