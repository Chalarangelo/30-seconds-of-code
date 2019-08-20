'use strict'

var assert = require('assert')
var dnsEqual = require('./')

assert.strictEqual(dnsEqual('Foo', 'foo'), true)
assert.strictEqual(dnsEqual('FooÆØÅ', 'fooÆØÅ'), true)

assert.strictEqual(dnsEqual('foo', 'bar'), false)
assert.strictEqual(dnsEqual('FooÆØÅ', 'fooæøå'), false)
assert.strictEqual(dnsEqual('café', 'cafe'), false)
