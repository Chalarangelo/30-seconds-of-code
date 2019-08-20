// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var assert = require('assert');

var util = require('../../');

suite('is');

test('util.isArray', function () {
  assert.equal(true, util.isArray([]));
  assert.equal(true, util.isArray(Array()));
  assert.equal(true, util.isArray(new Array()));
  assert.equal(true, util.isArray(new Array(5)));
  assert.equal(true, util.isArray(new Array('with', 'some', 'entries')));
  assert.equal(false, util.isArray({}));
  assert.equal(false, util.isArray({ push: function() {} }));
  assert.equal(false, util.isArray(/regexp/));
  assert.equal(false, util.isArray(new Error()));
  assert.equal(false, util.isArray(Object.create(Array.prototype)));
});

test('util.isRegExp', function () {
  assert.equal(true, util.isRegExp(/regexp/));
  assert.equal(true, util.isRegExp(RegExp()));
  assert.equal(true, util.isRegExp(new RegExp()));
  assert.equal(false, util.isRegExp({}));
  assert.equal(false, util.isRegExp([]));
  assert.equal(false, util.isRegExp(new Date()));
  assert.equal(false, util.isRegExp(Object.create(RegExp.prototype)));
});

test('util.isDate', function () {
  assert.equal(true, util.isDate(new Date()));
  assert.equal(true, util.isDate(new Date(0)));
  assert.equal(false, util.isDate(Date()));
  assert.equal(false, util.isDate({}));
  assert.equal(false, util.isDate([]));
  assert.equal(false, util.isDate(new Error()));
  assert.equal(false, util.isDate(Object.create(Date.prototype)));
});

test('util.isError', function () {
  assert.equal(true, util.isError(new Error()));
  assert.equal(true, util.isError(new TypeError()));
  assert.equal(true, util.isError(new SyntaxError()));
  assert.equal(false, util.isError({}));
  assert.equal(false, util.isError({ name: 'Error', message: '' }));
  assert.equal(false, util.isError([]));
  assert.equal(true, util.isError(Object.create(Error.prototype)));
});

test('util._extend', function () {
  assert.deepEqual(util._extend({a:1}),             {a:1});
  assert.deepEqual(util._extend({a:1}, []),         {a:1});
  assert.deepEqual(util._extend({a:1}, null),       {a:1});
  assert.deepEqual(util._extend({a:1}, true),       {a:1});
  assert.deepEqual(util._extend({a:1}, false),      {a:1});
  assert.deepEqual(util._extend({a:1}, {b:2}),      {a:1, b:2});
  assert.deepEqual(util._extend({a:1, b:2}, {b:3}), {a:1, b:3});
});

test('util.isBuffer', function () {
  assert.equal(true, util.isBuffer(new Buffer(4)));
  assert.equal(true, util.isBuffer(Buffer(4)));
  assert.equal(true, util.isBuffer(new Buffer(4)));
  assert.equal(true, util.isBuffer(new Buffer([1, 2, 3, 4])));
  assert.equal(false, util.isBuffer({}));
  assert.equal(false, util.isBuffer([]));
  assert.equal(false, util.isBuffer(new Error()));
  assert.equal(false, util.isRegExp(new Date()));
  assert.equal(true, util.isBuffer(Object.create(Buffer.prototype)));
});
