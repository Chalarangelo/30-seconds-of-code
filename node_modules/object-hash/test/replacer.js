'use strict';

var assert = require('assert');
var stream = require('stream');
var hash = require('../index');

describe('replacer option', function() {
  it('should emit information about an object to a stream', function() {
    var strm = new stream.PassThrough();
    
    var replacer = function(value) {
      try {
        return JSON.stringify(value);
      } catch (e) {
        return value;
      }
    };
    
    var obj = {foo: 'bar'};
    hash.writeToStream(obj, {replacer: replacer}, strm);
    var result = strm.read().toString();
    assert.strictEqual(typeof result, 'string');
    assert.notStrictEqual(result.indexOf(JSON.stringify(obj)), -1);
  });

  it('should not reach property values when excludeValues = true', function() {
    var strm = new stream.PassThrough();
    
    var replacer = function(k) {
      assert.notStrictEqual(k, 'bar');
      return k;
    };
    
    hash.writeToStream({foo: 'bar'}, {excludeValues: true}, strm);
  });
});
