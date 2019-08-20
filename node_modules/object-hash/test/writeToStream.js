'use strict';

var assert = require('assert');
var stream = require('stream');
var hash = require('../index');

describe('writeToStream', function() {
  it('should emit information about an object to a stream', function() {
    var strm = new stream.PassThrough();
    
    hash.writeToStream({foo: 'bar'}, strm);
    var result = strm.read().toString();
    assert.strictEqual(typeof result, 'string');
    assert.notStrictEqual(result.indexOf('foo'), -1);
    assert.notStrictEqual(result.indexOf('bar'), -1);
  });

  it('should leave out keys when excludeValues = true', function() {
    var strm = new stream.PassThrough();
    
    hash.writeToStream({foo: 'bar'}, {excludeValues: true}, strm);
    var result = strm.read().toString();
    assert.strictEqual(typeof result, 'string');
    assert.notStrictEqual(result.indexOf('foo'), -1);
    assert.   strictEqual(result.indexOf('bar'), -1);
  });
});
