'use strict';

describe('resource helpers', function () {
  const expect = require("chai").expect;
  const resourceHelper = require('../lib/resourceHelpers.js');

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

    expect(arrayTags).to.deep.equal([{ name: 'account', description: '' },
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
