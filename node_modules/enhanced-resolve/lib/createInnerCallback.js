/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const util = require("util");

// TODO remove in enhanced-resolve 5
module.exports = util.deprecate(function createInnerCallback(callback, options, message, messageOptional) {
	const log = options.log;
	if(!log) {
		if(options.stack !== callback.stack) {
			const callbackWrapper = function callbackWrapper() {
				return callback.apply(this, arguments);
			};
			callbackWrapper.stack = options.stack;
			callbackWrapper.missing = options.missing;
			return callbackWrapper;
		}
		return callback;
	}

	function loggingCallbackWrapper() {
		return callback.apply(this, arguments);

	}
	if(message) {
		if(!messageOptional) {
			log(message);
		}
		loggingCallbackWrapper.log = function writeLog(msg) {
			if(messageOptional) {
				log(message);
				messageOptional = false;
			}
			log("  " + msg);
		};
	} else {
		loggingCallbackWrapper.log = function writeLog(msg) {
			log(msg);
		};
	}
	loggingCallbackWrapper.stack = options.stack;
	loggingCallbackWrapper.missing = options.missing;
	return loggingCallbackWrapper;
}, "Pass resolveContext instead and use createInnerContext");
