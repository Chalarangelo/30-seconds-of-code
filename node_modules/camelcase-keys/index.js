'use strict';
var mapObj = require('map-obj');
var camelCase = require('camelcase');

module.exports = function (input, options) {
	options = options || {};
	var exclude = options.exclude || [];
	return mapObj(input, function (key, val) {
		key = exclude.indexOf(key) === -1 ? camelCase(key) : key;
		return [key, val];
	});
};
