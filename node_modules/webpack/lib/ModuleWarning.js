/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const WebpackError = require("./WebpackError");
const { cleanUp } = require("./ErrorHelpers");

class ModuleWarning extends WebpackError {
	constructor(module, warning, { from = null } = {}) {
		let message = "Module Warning";
		if (from) {
			message += ` (from ${from}):\n`;
		} else {
			message += ": ";
		}
		if (warning && typeof warning === "object" && warning.message) {
			message += warning.message;
		} else if (warning) {
			message += warning;
		}
		super(message);
		this.name = "ModuleWarning";
		this.module = module;
		this.warning = warning;
		this.details =
			warning && typeof warning === "object" && warning.stack
				? cleanUp(warning.stack, this.message)
				: undefined;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = ModuleWarning;
