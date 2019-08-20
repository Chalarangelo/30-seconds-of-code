'use strict';
var stripIndent = require('strip-indent');
var indentString = require('indent-string');

module.exports = function (str, count, indent) {
	return indentString(stripIndent(str), indent || ' ', count || 0);
};
