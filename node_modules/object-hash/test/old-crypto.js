'use strict';

var assert = require('assert');
var crypto = require('crypto');
var hash = require('../index');
var validSha1 = /^[0-9a-f]{40}$/i;
var validBase64 = /^([A-Za-z0-9+\/]{4})*([A-Za-z0-9+\/==]{4})$/;

describe('hash() without crypto.getHashes', function() {
  var getHashes_;
  beforeEach(function() {
    getHashes_ = crypto.getHashes;
    delete crypto.getHashes;
  });
  
  afterEach(function() {
    crypto.getHashes = getHashes_;
  });
  
  it('should work fine for SHA1', function() {
    assert.ok(validSha1.test(hash(42)), 'hash some value');
    assert.ok(validSha1.test(hash(NaN)), 'hash some value');
  });
});

describe('hash() without Duplex streams', function() {
  var createHash_;
  beforeEach(function() {
    createHash_ = crypto.createHash;
    crypto.createHash = function(algorithm) {
      var strm = createHash_(algorithm);
      
      return {
        update: strm.write.bind(strm),
        digest: strm.digest.bind(strm)
      };
    };
  });
  
  afterEach(function() {
    crypto.createHash = createHash_;
  });
  
  it('should work fine for SHA1 without .write()/.read()', function() {
    assert.ok(validSha1.test(hash(42)), 'hash some value');
    assert.ok(validSha1.test(hash(NaN)), 'hash some value');
  });
  
  it('should work fine for SHA1 without .write()/.read() with base64', function() {
    assert.ok(validBase64.test(hash(42, {encoding: 'base64'})), 'hash some value');
    assert.ok(validBase64.test(hash(NaN, {encoding: 'base64'})), 'hash some value');
  });
  
  if (typeof Buffer !== 'undefined') {
    it('should work fine for SHA1 without .write()/.read() with buffer', function() {
      assert.ok(Buffer.isBuffer(hash(42, {encoding: 'buffer'})), 'hash some value');
      assert.ok(Buffer.isBuffer(hash(NaN, {encoding: 'buffer'})), 'hash some value');
    });
  }
});
