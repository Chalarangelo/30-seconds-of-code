'use strict';

var assert = require('assert');
var crypto = require('crypto');
var stream = require('stream');
var hash = require('../index');
var validSha1 = /^[0-9a-f]{40}$/i;

describe('hash() objects with custom class names', function() {
  var builtinToString;
  beforeEach(function() {
    builtinToString = Object.prototype.toString;
    Object.prototype.toString = function() {
      if (this && typeof this.__className !== 'undefined') {
        return this.__className;
      }
      
      return builtinToString.apply(this, arguments);
    };
  });
  
  afterEach(function() {
    Object.prototype.toString = builtinToString;
  });
  
  it('should throw when trying to hash an unknown object', function() {
    assert.throws(function() {
      hash({a:1, __className: '[object Foo]'});
    }, /Unknown object type "foo"/);
    
    assert.throws(function() {
      hash({a:1, __className: 'Foo'});
    }, /Unknown object type/);
  });

  it('should not throw when trying to hash an unknown object with ignoreUnknown', function() {
    var opt = {ignoreUnknown: true};
    
    assert.ok(validSha1.test(hash({a:1, __className: '[object Foo]'}, opt)));
  });

  it('should not throw when trying to hash a weirdly-named object with ignoreUnknown', function() {
    var opt = {ignoreUnknown: true};
    
    assert.ok(validSha1.test(hash({a:1, __className: 'Foo'}, opt)));
  });
  
  it('should not delve further into a number of native types', function() {
    var nativeTypes = [
      'domwindow',
      'process', 'timer', 'pipe', 'tcp', 'udp', 'tty', 'statwatcher',
      'securecontext', 'connection', 'zlib', 'context', 'nodescript',
      'httpparser', 'dataview', 'signal', 'fsevent', 'tlswrap'
    ];
    
    for (var i = 0; i < nativeTypes.length; i++) {
      var obj = { foobar: 1, __className: '[object ' + nativeTypes[i] + ']' };
      var serialized = hash(obj, { algorithm: 'passthrough', encoding: 'utf8' });
      assert.strictEqual(serialized, nativeTypes[i]);
    }
  });
  
  it('should hash xml based on its string representation', function() {
    var obj = {
      __className: '[object xml]',
      toString: function() { return 'Bananä' }
    };
    
    var serialized = hash(obj, { algorithm: 'passthrough', encoding: 'utf8' });
    assert.strictEqual(serialized, 'xml:Bananä');
  });
  
  it('should hash URLs based on its string representation', function() {
    var obj = {
      __className: '[object url]',
      toString: function() { return 'https://example.com/' }
    };
    
    var serialized = hash(obj, { algorithm: 'passthrough', encoding: 'utf8' });
    assert.strictEqual(serialized, 'url:https://example.com/');
  });
  
  it('should not hash blobs without ignoreUnknown', function() {
    var obj = {
      __className: '[object blob]'
    };
    
    assert.throws(function() {
      hash(obj);
    }, /not supported/);
  });
  
  it('should ignore blobs with ignoreUnknown', function() {
    var obj = {
      __className: '[object blob]'
    };
    
    var serialized = hash(obj, {
      algorithm: 'passthrough',
      encoding: 'utf8',
      ignoreUnknown: true
    });
    
    assert.strictEqual(serialized, '[blob]');
  });
});
