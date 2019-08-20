'use strict';
var core = require('./core');

module.exports = function (p) {
	p = p || process;
	var c = core();

	p.on('unhandledRejection', c.onUnhandledRejection);
	p.on('rejectionHandled', c.onRejectionHandled);

	return c.currentlyUnhandled;
};
