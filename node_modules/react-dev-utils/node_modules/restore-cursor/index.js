'use strict';
const onetime = require('onetime');
const signalExit = require('signal-exit');

module.exports = onetime(() => {
	signalExit(() => {
		process.stderr.write('\u001b[?25h');
	}, {alwaysLast: true});
});
