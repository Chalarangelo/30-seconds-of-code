'use strict';
var indentString = require('indent-string');
var longest = require('longest');

module.exports = function (str, arr, indent) {
	var pad = typeof indent === 'number' ? indent : 0;

	if (typeof str !== 'string') {
		throw new TypeError('Expected a `string`, got `' + typeof str + '`');
	}

	if (!Array.isArray(arr)) {
		throw new TypeError('Expected an `Array`, got `' + typeof arr + '`');
	}

	return indentString(str, ' ', pad + longest(arr).length - str.length);
};
