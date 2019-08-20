'use strict';

var assert = require('assert');
var crypto = require('crypto');
var hash = require('../index');
var validSha1 = /^[0-9a-f]{40}$/i;

describe('hash()ing different types', function() {
  it('hashes non-object types', function() {
    var func = function(a){ return a + 1; };
    assert.ok(validSha1.test(hash('Shazbot!')), 'hash string');
    assert.ok(validSha1.test(hash(42)), 'hash number');
    assert.ok(validSha1.test(hash(NaN)), 'hash bool');
    assert.ok(validSha1.test(hash(true)), 'hash bool');
    assert.ok(validSha1.test(hash(func)), 'hash function');
  });

  it('hashes special object types', function() {
    var dt = new Date();
    dt.setDate(dt.getDate() + 1);

    assert.ok(validSha1.test(hash([1,2,3,4])), 'hash array');
    assert.notEqual(hash([1,2,3,4]), hash([4,3,2,1]), 'different arrays not equal');
    assert.ok(validSha1.test(hash(new Date())), 'hash date');
    assert.notEqual(hash(new Date()), hash(dt), 'different dates not equal');
    assert.ok(validSha1.test(hash(null)), 'hash Null');
    assert.ok(validSha1.test(hash(Number.NaN)), 'hash NaN');
    assert.ok(validSha1.test(hash({ foo: undefined })), 'hash Undefined value');
    assert.ok(validSha1.test(hash(new RegExp())), 'hash regex');
    assert.ok(validSha1.test(hash(new Error())), 'hash error');
  });

  it('hashes node.js-internal object types', function() {
    if (typeof process !== 'undefined') {
      assert.ok(validSha1.test(hash(process)), 'hash process');
    }
    
    var timer = setTimeout(function() {}, 0);
    assert.ok(validSha1.test(hash(timer)), 'hash timer');
  });

  if (typeof Symbol !== 'undefined') {
    it('hashes Symbols', function() {
      assert.ok(validSha1.test(hash(Symbol('Banana'))), 'hash error');
    });
  }

  if (typeof Buffer !== 'undefined') {
    it("Buffers can be hashed", function() {
      assert.ok(validSha1.test(hash(new Buffer('Banana'))), 'hashes Buffers');
    });
  }

  if (typeof Uint8Array !== 'undefined') {
    it("Typed arrays can be hashed", function() {
      
      assert.ok(validSha1.test(hash(new Uint8Array([1,2,3,4]))), 'hashes Uint8Array');
      assert.ok(validSha1.test(hash(new  Int8Array([1,2,3,4]))), 'hashes  Int8Array');
      assert.ok(validSha1.test(hash(new Uint16Array([1,2,3,4]))), 'hashes Uint16Array');
      assert.ok(validSha1.test(hash(new  Int16Array([1,2,3,4]))), 'hashes  Int16Array');
      assert.ok(validSha1.test(hash(new Uint32Array([1,2,3,4]))), 'hashes Uint32Array');
      assert.ok(validSha1.test(hash(new  Int32Array([1,2,3,4]))), 'hashes  Int32Array');
      assert.ok(validSha1.test(hash(new Float32Array([1,2,3,4]))), 'hashes Float32Array');
      if (typeof Float64Array !== 'undefined')
      assert.ok(validSha1.test(hash(new Float64Array([1,2,3,4]))), 'hashes Float64Array');
      if (typeof Uint8ClampedArray !== 'undefined')
      assert.ok(validSha1.test(hash(new Uint8ClampedArray([1,2,3,4]))), 'hashes Uint8ClampedArray');
      assert.ok(validSha1.test(hash(new Uint8Array([1,2,3,4]).buffer)), 'hashes ArrayBuffer');
    });
  }

  if (typeof Map !== 'undefined') {
    it("Maps can be hashed", function() {
      var map = new Map([['a',1],['b',2]]);
      assert.ok(validSha1.test(hash(map)), 'hashes Maps');
    });
  }

  if (typeof WeakMap !== 'undefined') {
    it("WeakMaps can’t be hashed", function() {
      var map = new WeakMap([[{foo: 'bar'},1]]);
      assert.throws(function() {
        validSha1.test(hash(map))
      }, 'does not hash WeakMaps');
    });
  }

  if (typeof Set !== 'undefined') {
    it("Sets can be hashed", function() {
      var set = new Set(['you', 'du', 'tu', 'あなた', '您']);
      assert.ok(validSha1.test(hash(set)), 'hashes Sets');
    });
  }

  if (typeof WeakSet !== 'undefined') {
    it("WeakSets can’t be hashed", function() {
      var obj = {foo: 'bar'};
      var set = new WeakSet([obj]);
      assert.throws(function() {
        validSha1.test(hash(set))
      }, 'does not hash WeakSets');
    });
  }

  it("Builtin types themselves can be hashed", function() {
    var hashcount = {};
    var types = [Object, Date, Number, String, Function, RegExp,
      Error, 0, null, NaN];
    if (typeof WeakSet !== 'undefined') types.push(WeakSet);
    if (typeof Set !== 'undefined') types.push(Set);
    if (typeof WeakMap !== 'undefined') types.push(WeakMap);
    if (typeof Map !== 'undefined') types.push(Map);
    if (typeof Symbol !== 'undefined') types.push(Symbol);
    if (typeof Uint8Array !== 'undefined') types.push(Uint8Array);

    // Hash each type
    for (var idx in types) {
      var h = hash(types[idx]);
      assert.ok(validSha1.test(h));
      hashcount[h] = (hashcount[h] || 0) + 1;
    }

    // Check for collisions
    var no = 0;
    for (var h in hashcount) {
      assert.equal(hashcount[h], 1);
      no++;
    }

    // Self check; did we really hash all the types?
    assert.equal(no, types.length);
  });
  
  it("Builtin types might result in identical hashes with respectFunctionNames = false", function() {
    var hashcount = {};
    var types = [Object, Date, Number, String, Function, RegExp,
      Error, 0, null, NaN];
    if (typeof WeakSet !== 'undefined') types.push(WeakSet);
    if (typeof Set !== 'undefined') types.push(Set);
    if (typeof WeakMap !== 'undefined') types.push(WeakMap);
    if (typeof Map !== 'undefined') types.push(Map);
    if (typeof Symbol !== 'undefined') types.push(Symbol);
    if (typeof Uint8Array !== 'undefined') types.push(Uint8Array);

    // Hash each type
    for (var idx in types) {
      var h = hash(types[idx], { respectFunctionNames: false });
      assert.ok(validSha1.test(h));
      hashcount[h] = (hashcount[h] || 0) + 1;
    }

    // Check for collisions
    var no = 0;
    for (var h in hashcount) {
      assert.ok(hashcount[h] >= 1);
      no += hashcount[h];
    }

    // Self check; did we really hash all the types?
    assert.equal(no, types.length);
  });
  
  it("Functions with identical bodies and different names result in identical hashes with respectFunctionNames = false", function() {
    var fn1 = function a() {};
    var fn2 = function b() {};
    var toStringDummy = function() { return '...'; };
    fn1.toString = toStringDummy;
    fn2.toString = toStringDummy;
    
    var h1 = hash(fn1, { respectFunctionNames: false });
    var h2 = hash(fn2, { respectFunctionNames: false });
    assert.strictEqual(h1, h2);
  });
});
