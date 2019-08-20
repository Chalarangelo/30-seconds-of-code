'use strict';

var assert = require('assert');
var crypto = require('crypto');
var hash = require('../index');
var validSha1 = /^[0-9a-f]{40}$/i;

describe('hash', function() {
  it('throws when nothing to hash', function () {
    assert.throws(hash, 'no arguments');
    assert.throws(function() {
      hash(undefined, {algorithm: 'md5'});
    }, 'undefined');
  });

  it('throws when passed an invalid options', function() {
    assert.throws(function() {
      hash({foo: 'bar'}, {algorithm: 'shalala'});
    }, 'bad algorithm');
    assert.throws(function() {
      hash({foo: 'bar'}, {encoding: 'base16'});
    }, 'bad encoding');
  });

  it('hashes a simple object', function() {
    assert.ok(validSha1.test(hash({foo: 'bar', bar: 'baz'})), 'hash object');
  });

  if (typeof Buffer !== 'undefined') {
    it('can return buffers', function() {
      assert.ok(Buffer.isBuffer(hash({foo: 'bar', bar: 'baz'}, {encoding: 'buffer'})), 'hash object');
    });
  }

  it('hashes identical objects with different key ordering', function() {
    var hash1 = hash({foo: 'bar', bar: 'baz'});
    var hash2 = hash({bar: 'baz', foo: 'bar'});
    var hash3 = hash({bar: 'foo', foo: 'baz'});
    assert.equal(hash1, hash2, 'hashes are equal');
    assert.notEqual(hash1, hash3, 'different objects not equal');
  });

  it('respects object key ordering when unorderedObjects = false', function() {
    var hash1 = hash({foo: 'bar', bar: 'baz'}, { unorderedObjects: false });
    var hash2 = hash({bar: 'baz', foo: 'bar'}, { unorderedObjects: false });
    assert.notEqual(hash1, hash2, 'hashes are not equal');
  });

  it('hashes only object keys when excludeValues option is set', function() {
    var hash1 = hash({foo: false, bar: 'OK'}, { excludeValues: true });
    var hash2 = hash({foo: true, bar: 'NO'}, { excludeValues: true });
    var hash3 = hash({foo: true, bar: 'OK', baz: false}, { excludeValues: true });
    assert.equal(hash1, hash2, 'values not in hash digest');
    assert.notEqual(hash1, hash3, 'different keys not equal');
  });

  it('array values are hashed', function() {
    var hash1 = hash({foo: ['bar', 'baz'], bax: true });
    var hash2 = hash({foo: ['baz', 'bar'], bax: true });
    assert.notEqual(hash1, hash2, 'different array orders are unique');
  });

  it('nested object values are hashed', function() {
    var hash1 = hash({foo: {bar: true, bax: 1}});
    var hash2 = hash({foo: {bar: true, bax: 1}});
    var hash3 = hash({foo: {bar: false, bax: 1}});
    assert.equal(hash1, hash2, 'hashes are equal');
    assert.notEqual(hash1, hash3, 'different objects not equal');
  });

  it('sugar methods should be equivalent', function() {
    var obj = {foo: 'bar', baz: true};
    assert.equal(hash.keys(obj), hash(obj, {excludeValues: true}), 'keys');
    assert.equal(hash.sha1(obj), hash(obj, {algorithm: 'sha1'}), 'sha1');
    assert.equal(hash.MD5(obj), hash(obj, {algorithm: 'md5'}), 'md5');
    assert.equal(hash.keysMD5(obj),
      hash(obj, {algorithm: 'md5', excludeValues: true}), 'keys md5');
  });

  it('array of nested object values are hashed', function() {
    var hash1 = hash({foo: [ {bar: true, bax: 1}, {bar: false, bax: 2} ] });
    var hash2 = hash({foo: [ {bar: true, bax: 1}, {bar: false, bax: 2} ] });
    var hash3 = hash({foo: [ {bar: false, bax: 2} ] });
    assert.equal(hash1, hash2, 'hashes are equal');
    assert.notEqual(hash1, hash3, 'different objects not equal');
  });

  it("recursive objects don't blow up stack", function() {
    var hash1 = {foo: 'bar'};
    hash1.recursive = hash1;
    assert.doesNotThrow(function() {hash(hash1);}, /Maximum call stack size exceeded/, 'Should not throw an stack size exceeded exception');
  });

  it("recursive arrays don't blow up stack", function() {
    var hash1 = ['foo', 'bar'];
    hash1.push(hash1);
    assert.doesNotThrow(function() {hash(hash1);}, /Maximum call stack size exceeded/, 'Should not throw an stack size exceeded exception');
  });

  it("recursive arrays don't blow up stack with unorderedArrays", function() {
    var hash1 = ['foo', 'bar'];
    hash1.push(hash1);
    assert.doesNotThrow(function() {hash(hash1, {unorderedArrays: true});}, /Maximum call stack size exceeded/, 'Should not throw an stack size exceeded exception');
  });

  it("recursive handling tracks identity", function() {
    var hash1 = {k1: {k: 'v'}, k2: {k: 'k2'}};
    hash1.k1.r1 = hash1.k1;
    hash1.k2.r2 = hash1.k2;
    var hash2 = {k1: {k: 'v'}, k2: {k: 'k2'}};
    hash2.k1.r1 = hash2.k2;
    hash2.k2.r2 = hash2.k1;
    assert.notEqual(hash(hash1), hash(hash2), "order of recursive objects should matter");
  });

  it("object types are hashed", function() {
    var hash1 = hash({foo: 'bar'});
    var hash2 = hash(['foo', 'bar']);
    assert.notEqual(hash1, hash2, "arrays and objects should not produce identical hashes");
  });

  it("utf8 strings are hashed correctly", function() {
    var hash1 = hash('\u03c3'); // cf 83 in utf8
    var hash2 = hash('\u01c3'); // c7 83 in utf8
    assert.notEqual(hash1, hash2, "different strings with similar utf8 encodings should produce different hashes");
  });

  it("strings passed as new String are hashed correctly", function() {
    var hash1 = hash(new String('foo'));
    assert.equal(hash1, '7cd3edacc4c9dd43908177508c112608a398bb9a');
    var hash2 = hash({foo: new String('bar')});
    assert.equal(hash2, 'a75c05bdca7d704bdfcd761913e5a4e4636e956b');
  });

  it("various hashes in crypto.getHashes() should be supported", function() {
    var hashes = ['sha1', 'md5'];

    if (crypto.getHashes) {
      // take all hashes from crypto.getHashes() starting with MD or SHA
      hashes = crypto.getHashes().filter(RegExp.prototype.test.bind(/^(md|sha)/i));
    }

    var obj = {randomText: 'bananas'};

    for (var i = 0; i < hashes.length; i++) {
      assert.ok(hash(obj, {algorithm: hashes[i]}), 'Algorithm ' + hashes[i] + ' should be supported');
    }
  });

  it("null and 'Null' string produce different hashes", function() {
    var hash1 = hash({foo: null});
    var hash2 = hash({foo: 'Null'});
    assert.notEqual(hash1, hash2, "null and 'Null' should not produce identical hashes");
  });

  it('Distinguish functions based on their properties', function() {

    var a, b, c, d;
    function Foo() {}
    a = hash(Foo);

    Foo.foo = 22;
    b = hash(Foo);

    Foo.bar = "42";
    c = hash(Foo);

    Foo.foo = "22";
    d = hash(Foo);

    assert.notEqual(a,b, 'adding a property changes the hash');
    assert.notEqual(b,c, 'adding another property changes the hash');
    assert.notEqual(c,d, 'changing a property changes the hash');
  });

  it('respectFunctionProperties = false', function() {

    var a, b;
    function Foo() {}
    a = hash(Foo, {respectFunctionProperties: false});

    Foo.foo = 22;
    b = hash(Foo, {respectFunctionProperties: false});

    assert.equal(a,b, 'function properties are ignored');
  });

  it('Distinguish functions based on prototype properties', function() {

    var a, b, c, d;
    function Foo() {}
    a = hash(Foo);

    Foo.prototype.foo = 22;
    b = hash(Foo);

    Foo.prototype.bar = "42";
    c = hash(Foo);

    Foo.prototype.foo = "22";
    d = hash(Foo);

    assert.notEqual(a,b, 'adding a property to the prototype changes the hash');
    assert.notEqual(b,c, 'adding another property to the prototype changes the hash');
    assert.notEqual(c,d, 'changing a property in the prototype changes the hash');
  });

  it('Distinguish objects based on their type', function() {

    function Foo() {}
    function Bar() {}

    var f = new Foo(), b = new Bar();

    assert.notEqual(hash(Foo), hash(Bar), 'Functions with different names should produce a different Hash.');
    assert.notEqual(hash(f), hash(b), 'Objects with different constructor should have a different Hash.');
  });

  it('respectType = false', function() {
    var opt = { respectType: false };


    function Foo() {}
    function Bar() {}

    var f = new Foo(), b = new Bar();
    assert.equal(hash(f, opt), hash(b, opt), 'Hashing should disregard the different constructor');


    var ha, hb;
    function F() {}
    ha = hash(F, opt);

    F.prototype.meaningOfLife = 42;
    hb = hash(F, opt);

    assert.equal(ha, hb, 'Hashing should disregard changes in the function\'s prototype');
  });

  it('unorderedArrays = false', function() {
    var ha, hb;
    ha = hash([1, 2, 3]);
    hb = hash([3, 2, 1]);

    assert.notEqual(ha, hb, 'Hashing should respect the order of array entries');
  });

  it('unorderedArrays = true', function() {
    var opt = { unorderedArrays: true };

    var ha, hb;
    ha = hash([1, 2, 3], opt);
    hb = hash([3, 2, 1], opt);

    assert.equal(ha, hb, 'Hashing should not respect the order of array entries');

    ha = hash([{a: 1}, {a: 2}], opt);
    hb = hash([{a: 2}, {a: 1}], opt);

    assert.equal(ha, hb, 'Hashing should not respect the order of array entries');
  });

  it('excludeKeys works', function() {
    var ha, hb;
    ha = hash({a: 1, b: 4}, { excludeKeys: function(key) { return key === 'b' } });
    hb = hash({a: 1});

    assert.equal(ha, hb, 'Hashing should ignore key `b`');
  });

  if (typeof Set !== 'undefined') {
    it('unorderedSets = false', function() {
      var opt = { unorderedSets: false };

      var ha, hb;
      ha = hash(new Set([1, 2, 3]), opt);
      hb = hash(new Set([3, 2, 1]), opt);

      assert.notEqual(ha, hb, 'Hashing should respect the order of Set entries');
    });

    it('unorderedSets = true', function() {
      var ha, hb;
      ha = hash(new Set([1, 2, 3]));
      hb = hash(new Set([3, 2, 1]));

      assert.equal(ha, hb, 'Hashing should not respect the order of Set entries');
    });
  }
});
