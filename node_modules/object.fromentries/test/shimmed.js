'use strict';

var fromEntries = require('../');
fromEntries.shim();

var test = require('tape');
var defineProperties = require('define-properties');
var isEnumerable = Object.prototype.propertyIsEnumerable;
var functionsHaveNames = function f() {}.name === 'f';

var runTests = require('./tests');

test('shimmed', function (t) {
	t.equal(Object.fromEntries.length, 1, 'Object.fromEntries has a length of 1');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(Object.fromEntries.name, 'fromEntries', 'Object.fromEntries has name "fromEntries"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(Object, 'fromEntries'), 'Object.fromEntries is not enumerable');
		et.end();
	});

	var supportsStrictMode = (function () { return typeof this === 'undefined'; }());

	t.test('bad object value', { skip: !supportsStrictMode }, function (st) {
		st['throws'](function () { return Object.fromEntries(undefined); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return Object.fromEntries(null); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(Object.fromEntries, t);

	t.end();
});
