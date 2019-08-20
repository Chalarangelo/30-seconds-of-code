'use strict';
var Buffer = require('../../').Buffer;


var assert = require('assert');

assert.doesNotThrow(function() {
  Buffer.allocUnsafe(10);
});

assert.throws(function() {
  Buffer.from(10, 'hex');
});

assert.doesNotThrow(function() {
  Buffer.from('deadbeaf', 'hex');
});

