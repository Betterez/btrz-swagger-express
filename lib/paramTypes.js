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

'use strict';

const {query, path} = require('./helpers/v3/paramTypes');

exports.query = query;

exports.path = path;

exports.body = function(name, description, type, defaultValue, required) {
  return {
    'in': "body",
    'name' : name,
    'description' : description,
    'type' : type,
    'required' : required ?? false,
    'defaultValue' : defaultValue
  };
};

exports.form = exports.formData =  function(name, description, type, required, allowableValuesEnum, defaultValue) {
  return {
    'in': "formData",
    'name' : name,
    'description' : description,
    'type' : type,
    'required' : required ?? true,
    'enum' : allowableValuesEnum,
    'defaultValue' : defaultValue
  };
};

exports.header = function(name, description, type, required) {
  return {
    'in': "header",
    'name' : name,
    'description' : description,
    'type' : type,
    'required' : required,
    'allowMultiple' : false
  };
};
