'use strict';
var util = require('util');
var onExit = require('signal-exit');
var currentlyUnhandled = require('currently-unhandled');

var installed = false;

module.exports = function (log) {
	if (installed) {
		return;
	}

	installed = true;

	log = log || console.error;

	var listUnhandled = currentlyUnhandled();

	onExit(function () {
		var unhandledRejections = listUnhandled();

		if (unhandledRejections.length > 0) {
			unhandledRejections.forEach(function (x) {
				var err = x.reason;

				if (!(err instanceof Error)) {
					err = new Error('Promise rejected with value: ' + util.inspect(err));
				}

				log(err.stack);
			});

			process.exitCode = 1;
		}
	});
};
