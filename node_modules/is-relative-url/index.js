'use strict';
var isAbsoluteUrl = require('is-absolute-url');

module.exports = function (url) {
	return !isAbsoluteUrl(url);
};
