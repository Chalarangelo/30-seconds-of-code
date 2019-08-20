/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const validateOptions = require("schema-utils");
const schema = require("../schemas/plugins/IgnorePlugin.json");

/** @typedef {import("../declarations/plugins/IgnorePlugin").IgnorePluginOptions} IgnorePluginOptions */
/** @typedef {import("./Compiler")} Compiler */

class IgnorePlugin {
	/**
	 * @param {IgnorePluginOptions} options IgnorePlugin options
	 */
	constructor(options) {
		// TODO webpack 5 remove this compat-layer
		if (arguments.length > 1 || options instanceof RegExp) {
			options = {
				resourceRegExp: arguments[0],
				contextRegExp: arguments[1]
			};
		}

		validateOptions(schema, options, "IgnorePlugin");
		this.options = options;

		/** @private @type {Function} */
		this.checkIgnore = this.checkIgnore.bind(this);
	}

	/**
	 * Note that if "contextRegExp" is given, both the "resourceRegExp"
	 * and "contextRegExp" have to match.
	 *
	 * @param {TODO} result result
	 * @returns {TODO|null} returns result or null if result should be ignored
	 */
	checkIgnore(result) {
		if (!result) return result;

		if (
			"checkResource" in this.options &&
			this.options.checkResource &&
			this.options.checkResource(result.request, result.context)
		) {
			// TODO webpack 5 remove checkContext, as checkResource already gets context
			if ("checkContext" in this.options && this.options.checkContext) {
				if (this.options.checkContext(result.context)) {
					return null;
				}
			} else {
				return null;
			}
		}

		if (
			"resourceRegExp" in this.options &&
			this.options.resourceRegExp &&
			this.options.resourceRegExp.test(result.request)
		) {
			if ("contextRegExp" in this.options && this.options.contextRegExp) {
				// if "contextRegExp" is given,
				// both the "resourceRegExp" and "contextRegExp" have to match.
				if (this.options.contextRegExp.test(result.context)) {
					return null;
				}
			} else {
				return null;
			}
		}

		return result;
	}

	/**
	 * @param {Compiler} compiler Webpack Compiler
	 * @returns {void}
	 */
	apply(compiler) {
		compiler.hooks.normalModuleFactory.tap("IgnorePlugin", nmf => {
			nmf.hooks.beforeResolve.tap("IgnorePlugin", this.checkIgnore);
		});
		compiler.hooks.contextModuleFactory.tap("IgnorePlugin", cmf => {
			cmf.hooks.beforeResolve.tap("IgnorePlugin", this.checkIgnore);
		});
	}
}

module.exports = IgnorePlugin;
