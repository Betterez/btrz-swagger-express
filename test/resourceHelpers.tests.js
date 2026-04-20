'use strict';

const assert = require("node:assert/strict");
const { describe, it } = require("node:test");

describe('resource helpers', function () {
  const resourceHelper = require('../lib/helpers/v3/resourceHelpers.js');

  it('should sort the OpenApi tags section alphabetically', function () {
    const arrayTags = [{ name: 'healthcheck', description: '' },
    { name: 'info', description: '' },
    { name: 'users', description: '' },
    { name: 'applications', description: '' },
    { name: 'customers', description: '' },
    { name: 'tokens', description: '' },
    { name: 'shift', description: '' },
    { name: 'networks', description: '' },
    { name: 'lexicons', description: '' },
    { name: 'customer', description: '' },
    { name: 'account', description: '' }];

    resourceHelper.sortTags(arrayTags);

    assert.deepStrictEqual(arrayTags, [{ name: 'account', description: '' },
    { name: 'applications', description: '' },
    { name: 'customer', description: '' },
    { name: 'customers', description: '' },
    { name: 'healthcheck', description: '' },
    { name: 'info', description: '' },
    { name: 'lexicons', description: '' },
    { name: 'networks', description: '' },
    { name: 'shift', description: '' },
    { name: 'tokens', description: '' },
    { name: 'users', description: '' }]);

  });
});
