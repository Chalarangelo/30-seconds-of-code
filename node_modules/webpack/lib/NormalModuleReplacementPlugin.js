/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const path = require("path");

class NormalModuleReplacementPlugin {
	constructor(resourceRegExp, newResource) {
		this.resourceRegExp = resourceRegExp;
		this.newResource = newResource;
	}

	apply(compiler) {
		const resourceRegExp = this.resourceRegExp;
		const newResource = this.newResource;
		compiler.hooks.normalModuleFactory.tap(
			"NormalModuleReplacementPlugin",
			nmf => {
				nmf.hooks.beforeResolve.tap("NormalModuleReplacementPlugin", result => {
					if (!result) return;
					if (resourceRegExp.test(result.request)) {
						if (typeof newResource === "function") {
							newResource(result);
						} else {
							result.request = newResource;
						}
					}
					return result;
				});
				nmf.hooks.afterResolve.tap("NormalModuleReplacementPlugin", result => {
					if (!result) return;
					if (resourceRegExp.test(result.resource)) {
						if (typeof newResource === "function") {
							newResource(result);
						} else {
							result.resource = path.resolve(
								path.dirname(result.resource),
								newResource
							);
						}
					}
					return result;
				});
			}
		);
	}
}

module.exports = NormalModuleReplacementPlugin;
