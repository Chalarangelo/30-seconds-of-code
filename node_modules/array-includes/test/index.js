'use strict';

var includes = require('../');
var test = require('tape');
var runTests = require('./tests');

test('as a function', function (t) {
	t.test('bad array/this value', function (st) {
		st.throws(includes.bind(null, undefined, 'a'), TypeError, 'undefined is not an object');
		st.throws(includes.bind(null, null, 'a'), TypeError, 'null is not an object');
		st.end();
	});

	runTests(includes, t);

	t.end();
});
