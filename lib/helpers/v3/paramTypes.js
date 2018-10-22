/**
 *  Copyright 2013 Wordnik, Inc.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

const openApi3ConversionHelpers = require("./openApi3ConversionHelpers");

exports.query = exports.q = (name, description, type, required, allowableValuesEnum, defaultValue) => {
  return openApi3ConversionHelpers.getQueryParam({name, description, type, required, allowableValuesEnum, defaultValue});
};

exports.path = (name, description, type, allowableValuesEnum, defaultValue) => {
  return openApi3ConversionHelpers.getPathParam({name, description, type, allowableValuesEnum, defaultValue});
};

exports.header = (name, description, type, defaultValue, required) => {
  return {
    "in": "header",
    "name": name,
    "description": description,
    "type": type,
    "required": required || false,
    "defaultValue": defaultValue
  };
};

exports.cookie = exports.formData =  (name, description, type, required, allowableValuesEnum, defaultValue) => {
  return {
    "in": "cookie",
    "name": name,
    "description": description,
    "type": type,
    "required": (typeof required !== "undefined") ? required: true,
    "enum": allowableValuesEnum,
    "defaultValue": defaultValue
  };
};

