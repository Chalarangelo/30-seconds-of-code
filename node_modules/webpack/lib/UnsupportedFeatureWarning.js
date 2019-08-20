/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const WebpackError = require("./WebpackError");

/** @typedef {import("./Module")} Module */
/** @typedef {import("./Dependency").DependencyLocation} DependencyLocation */

class UnsupportedFeatureWarning extends WebpackError {
	/**
	 * @param {Module} module module relevant to warning
	 * @param {string} message description of warning
	 * @param {DependencyLocation} loc location start and end positions of the module
	 */
	constructor(module, message, loc) {
		super(message);

		this.name = "UnsupportedFeatureWarning";
		this.module = module;
		this.loc = loc;
		this.hideStack = true;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = UnsupportedFeatureWarning;
