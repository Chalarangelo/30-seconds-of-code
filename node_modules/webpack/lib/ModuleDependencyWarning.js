/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const WebpackError = require("./WebpackError");

module.exports = class ModuleDependencyWarning extends WebpackError {
	constructor(module, err, loc) {
		super(err.message);

		this.name = "ModuleDependencyWarning";
		this.details = err.stack
			.split("\n")
			.slice(1)
			.join("\n");
		this.module = module;
		this.loc = loc;
		this.error = err;
		this.origin = module.issuer;

		Error.captureStackTrace(this, this.constructor);
	}
};
