'use strict';
var core = require('./core');

function unwrapEvent(event) {
	if (event && event.detail && event.detail.promise) {
		return event.detail;
	}

	return event;
}

module.exports = function (w) {
	w = w || window;
	var c = core();

	w.addEventListener('unhandledrejection', function (event) {
		event = unwrapEvent(event);
		c.onUnhandledRejection(event.reason, event.promise);
	});

	w.addEventListener('rejectionhandled', function (event) {
		event = unwrapEvent(event);
		c.onRejectionHandled(event.promise);
	});

	return c.currentlyUnhandled;
};
