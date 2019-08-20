/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

module.exports = function createInnerContext(options, message, messageOptional) {
	let messageReported = false;
	const childContext = {
		log: (() => {
			if(!options.log) return undefined;
			if(!message) return options.log;
			const logFunction = (msg) => {
				if(!messageReported) {
					options.log(message);
					messageReported = true;
				}
				options.log("  " + msg);
			};
			return logFunction;
		})(),
		stack: options.stack,
		missing: options.missing
	};
	return childContext;
};
