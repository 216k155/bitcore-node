'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export lux-lib', function() {
    var lux = require('../');
    should.exist(lux.lib);
    should.exist(lux.lib.Transaction);
    should.exist(lux.lib.Block);
  });
});
