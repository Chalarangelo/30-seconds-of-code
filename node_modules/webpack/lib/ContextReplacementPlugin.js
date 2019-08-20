/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const path = require("path");
const ContextElementDependency = require("./dependencies/ContextElementDependency");

class ContextReplacementPlugin {
	constructor(
		resourceRegExp,
		newContentResource,
		newContentRecursive,
		newContentRegExp
	) {
		this.resourceRegExp = resourceRegExp;

		if (typeof newContentResource === "function") {
			this.newContentCallback = newContentResource;
		} else if (
			typeof newContentResource === "string" &&
			typeof newContentRecursive === "object"
		) {
			this.newContentResource = newContentResource;
			this.newContentCreateContextMap = (fs, callback) => {
				callback(null, newContentRecursive);
			};
		} else if (
			typeof newContentResource === "string" &&
			typeof newContentRecursive === "function"
		) {
			this.newContentResource = newContentResource;
			this.newContentCreateContextMap = newContentRecursive;
		} else {
			if (typeof newContentResource !== "string") {
				newContentRegExp = newContentRecursive;
				newContentRecursive = newContentResource;
				newContentResource = undefined;
			}
			if (typeof newContentRecursive !== "boolean") {
				newContentRegExp = newContentRecursive;
				newContentRecursive = undefined;
			}
			this.newContentResource = newContentResource;
			this.newContentRecursive = newContentRecursive;
			this.newContentRegExp = newContentRegExp;
		}
	}

	apply(compiler) {
		const resourceRegExp = this.resourceRegExp;
		const newContentCallback = this.newContentCallback;
		const newContentResource = this.newContentResource;
		const newContentRecursive = this.newContentRecursive;
		const newContentRegExp = this.newContentRegExp;
		const newContentCreateContextMap = this.newContentCreateContextMap;

		compiler.hooks.contextModuleFactory.tap("ContextReplacementPlugin", cmf => {
			cmf.hooks.beforeResolve.tap("ContextReplacementPlugin", result => {
				if (!result) return;
				if (resourceRegExp.test(result.request)) {
					if (newContentResource !== undefined) {
						result.request = newContentResource;
					}
					if (newContentRecursive !== undefined) {
						result.recursive = newContentRecursive;
					}
					if (newContentRegExp !== undefined) {
						result.regExp = newContentRegExp;
					}
					if (typeof newContentCallback === "function") {
						newContentCallback(result);
					} else {
						for (const d of result.dependencies) {
							if (d.critical) d.critical = false;
						}
					}
				}
				return result;
			});
			cmf.hooks.afterResolve.tap("ContextReplacementPlugin", result => {
				if (!result) return;
				if (resourceRegExp.test(result.resource)) {
					if (newContentResource !== undefined) {
						result.resource = path.resolve(result.resource, newContentResource);
					}
					if (newContentRecursive !== undefined) {
						result.recursive = newContentRecursive;
					}
					if (newContentRegExp !== undefined) {
						result.regExp = newContentRegExp;
					}
					if (typeof newContentCreateContextMap === "function") {
						result.resolveDependencies = createResolveDependenciesFromContextMap(
							newContentCreateContextMap
						);
					}
					if (typeof newContentCallback === "function") {
						const origResource = result.resource;
						newContentCallback(result);
						if (result.resource !== origResource) {
							result.resource = path.resolve(origResource, result.resource);
						}
					} else {
						for (const d of result.dependencies) {
							if (d.critical) d.critical = false;
						}
					}
				}
				return result;
			});
		});
	}
}

const createResolveDependenciesFromContextMap = createContextMap => {
	const resolveDependenciesFromContextMap = (fs, options, callback) => {
		createContextMap(fs, (err, map) => {
			if (err) return callback(err);
			const dependencies = Object.keys(map).map(key => {
				return new ContextElementDependency(
					map[key] + options.resourceQuery,
					key
				);
			});
			callback(null, dependencies);
		});
	};
	return resolveDependenciesFromContextMap;
};

module.exports = ContextReplacementPlugin;
