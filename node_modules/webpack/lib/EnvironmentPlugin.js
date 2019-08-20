/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Authors Simen Brekken @simenbrekken, Einar Löve @einarlove
*/

"use strict";

/** @typedef {import("./Compiler")} Compiler */

const WebpackError = require("./WebpackError");
const DefinePlugin = require("./DefinePlugin");

const needsEnvVarFix =
	["8", "9"].indexOf(process.versions.node.split(".")[0]) >= 0 &&
	process.platform === "win32";

class EnvironmentPlugin {
	constructor(...keys) {
		if (keys.length === 1 && Array.isArray(keys[0])) {
			this.keys = keys[0];
			this.defaultValues = {};
		} else if (keys.length === 1 && keys[0] && typeof keys[0] === "object") {
			this.keys = Object.keys(keys[0]);
			this.defaultValues = keys[0];
		} else {
			this.keys = keys;
			this.defaultValues = {};
		}
	}

	/**
	 * @param {Compiler} compiler webpack compiler instance
	 * @returns {void}
	 */
	apply(compiler) {
		const definitions = this.keys.reduce((defs, key) => {
			// TODO remove once the fix has made its way into Node 8.
			// Work around https://github.com/nodejs/node/pull/18463,
			// affecting Node 8 & 9 by performing an OS-level
			// operation that always succeeds before reading
			// environment variables:
			if (needsEnvVarFix) require("os").cpus();

			const value =
				process.env[key] !== undefined
					? process.env[key]
					: this.defaultValues[key];

			if (value === undefined) {
				compiler.hooks.thisCompilation.tap("EnvironmentPlugin", compilation => {
					const error = new WebpackError(
						`EnvironmentPlugin - ${key} environment variable is undefined.\n\n` +
							"You can pass an object with default values to suppress this warning.\n" +
							"See https://webpack.js.org/plugins/environment-plugin for example."
					);

					error.name = "EnvVariableNotDefinedError";
					compilation.warnings.push(error);
				});
			}

			defs[`process.env.${key}`] =
				value === undefined ? "undefined" : JSON.stringify(value);

			return defs;
		}, {});

		new DefinePlugin(definitions).apply(compiler);
	}
}

module.exports = EnvironmentPlugin;
