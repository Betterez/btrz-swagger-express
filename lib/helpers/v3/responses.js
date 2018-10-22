"use strict";

const openApi3ConversionHelpers = require("./openApi3ConversionHelpers");

exports.v3 = (responseCodes) => {
  return openApi3ConversionHelpers.generateResponses(responseCodes);
};

