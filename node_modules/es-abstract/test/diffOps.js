'use strict';

var keys = require('object-keys');
var forEach = require('foreach');

module.exports = function diffOperations(actual, expected, expectedMissing) {
	var actualKeys = keys(actual);
	var expectedKeys = keys(expected);

	var extra = [];
	var missing = [];
	forEach(actualKeys, function (op) {
		if (!(op in expected)) {
			extra.push(op);
		} else if (expectedMissing.indexOf(op) !== -1) {
			extra.push(op);
		}
	});
	forEach(expectedKeys, function (op) {
		if (typeof actual[op] !== 'function' && expectedMissing.indexOf(op) === -1) {
			missing.push(op);
		}
	});

	return { missing: missing, extra: extra };
};
