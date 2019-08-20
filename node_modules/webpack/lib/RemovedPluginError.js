"use strict";

const WebpackError = require("./WebpackError");

module.exports = class RemovedPluginError extends WebpackError {
	constructor(message) {
		super(message);

		Error.captureStackTrace(this, this.constructor);
	}
};
