'use strict';
var util = require('util');
var currentlyUnhandled = require('currently-unhandled');

// WARNING: This undocumented API is subject to change.

module.exports = util.deprecate(function (process) {
	return {
		currentlyUnhandled: currentlyUnhandled(process)
	};
}, 'loudRejection/api is deprecated. Use the currently-unhandled module instead.');
