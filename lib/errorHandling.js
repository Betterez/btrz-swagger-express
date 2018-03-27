"use strict";

// TODO can this be removed?
// Create Error JSON by code and text
function error(code, description) {
  return {
    code,
    "message": description
  };
}


exports.error = error;
