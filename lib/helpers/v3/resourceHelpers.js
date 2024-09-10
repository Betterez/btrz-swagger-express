'use strict';

var _ = require('lodash');

module.exports.wrap = wrap;
module.exports.appendToApi = appendToApi;
module.exports.sortTags = sortTags;

function wrap(callback, req, resp) {
  callback(req, resp);
}

// return a list of sorted tags to be rendered in documentation
function sortTags(tags) {
  if(tags){
    tags.sort((a, b) => a.name.localeCompare(b.name));
  }
}

// appends a spec to an existing operation

function appendToApi(rootResource, api, spec) {
  if (!spec.nickname || spec.nickname.indexOf(' ') >= 0) {
    //  nicknames don't allow spaces
    throw new Error(`${spec.method.toUpperCase()} ${api.path} has invalid nickname ${spec.nickname} because the nickname is undefined, or it includes spaces.`);
  }
  // validate params
  _.forOwn(spec.parameters, function (parameter) {

    if (parameter.paramType) {
      throw new Error(`${spec.method.toUpperCase()} ${api.path} has invalid parameter ${parameter.name} which declares a "paramType".  "paramType" is not supported; use the "in" property instead.`);
    }

    if (!parameter.in) {
      throw new Error(`${spec.method.toUpperCase()} ${api.path} has invalid parameter ${parameter.name}. The "in" property is missing.`);
    }

    switch (parameter.in) {
      case 'path':
        if (api.path.indexOf('{' + parameter.name + '}') < 0) {
          throw new Error(`${spec.method.toUpperCase()} ${api.path} has an invalid path because it does not include the path parameter ${parameter.name}`);
        }
        break;
      case 'query':
      case 'body':
      case 'form':
      case 'formData':
      case 'header':
        break;
      default:
        throw new Error(`${spec.method.toUpperCase()} ${api.path} has invalid parameter ${parameter.name}. The "in" property has an invalid value.  "in" should be one of: 'path', 'query', 'body', 'form', 'formData', 'header'`);
    }
  });

  if (!api.operations) {
    api.operations = [];
  }

  // TODO: replace if existing HTTP operation in same api path
  var op = {
    'parameters': spec.parameters,
    'method': spec.method,
    'notes': spec.notes,
    'responseMessages': spec.responseMessages,
    'nickname': spec.nickname,
    'summary': spec.summary,
    'consumes' : spec.consumes,
    'produces' : spec.produces
  };

  // Add custom fields.
  op = _.extend({}, spec, op);

  if (!spec.type) {
    op.type = 'void';
  }
  api.operations.push(op);

  if (!rootResource.models) {
    rootResource.models = {};
  }
}
