/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const WebpackError = require("../WebpackError");

class CriticalDependencyWarning extends WebpackError {
	constructor(message) {
		super();

		this.name = "CriticalDependencyWarning";
		this.message = "Critical dependency: " + message;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = CriticalDependencyWarning;
