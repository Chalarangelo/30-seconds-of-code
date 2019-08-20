/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const asyncLib = require("neo-async");
const PrefetchDependency = require("./dependencies/PrefetchDependency");
const NormalModule = require("./NormalModule");

/** @typedef {import("./Compiler")} Compiler */

class AutomaticPrefetchPlugin {
	/**
	 * Apply the plugin
	 * @param {Compiler} compiler Webpack Compiler
	 * @returns {void}
	 */
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"AutomaticPrefetchPlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(
					PrefetchDependency,
					normalModuleFactory
				);
			}
		);
		let lastModules = null;
		compiler.hooks.afterCompile.tap("AutomaticPrefetchPlugin", compilation => {
			lastModules = compilation.modules
				.filter(m => m instanceof NormalModule)
				.map((/** @type {NormalModule} */ m) => ({
					context: m.context,
					request: m.request
				}));
		});
		compiler.hooks.make.tapAsync(
			"AutomaticPrefetchPlugin",
			(compilation, callback) => {
				if (!lastModules) return callback();
				asyncLib.forEach(
					lastModules,
					(m, callback) => {
						compilation.prefetch(
							m.context || compiler.context,
							new PrefetchDependency(m.request),
							callback
						);
					},
					callback
				);
			}
		);
	}
}
module.exports = AutomaticPrefetchPlugin;
