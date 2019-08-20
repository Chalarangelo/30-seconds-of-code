/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const LoaderDependency = require("./LoaderDependency");
const NormalModule = require("../NormalModule");

/** @typedef {import("../Module")} Module */

/**
 * @callback LoadModuleCallback
 * @param {Error=} err error object
 * @param {string=} source source code
 * @param {object=} map source map
 * @param {Module=} module loaded module if successful
 */

class LoaderPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"LoaderPlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(
					LoaderDependency,
					normalModuleFactory
				);
			}
		);

		compiler.hooks.compilation.tap("LoaderPlugin", compilation => {
			compilation.hooks.normalModuleLoader.tap(
				"LoaderPlugin",
				(loaderContext, module) => {
					/**
					 * @param {string} request the request string to load the module from
					 * @param {LoadModuleCallback} callback callback returning the loaded module or error
					 * @returns {void}
					 */
					loaderContext.loadModule = (request, callback) => {
						const dep = new LoaderDependency(request);
						dep.loc = {
							name: request
						};
						const factory = compilation.dependencyFactories.get(
							dep.constructor
						);
						if (factory === undefined) {
							return callback(
								new Error(
									`No module factory available for dependency type: ${
										dep.constructor.name
									}`
								)
							);
						}
						compilation.semaphore.release();
						compilation.addModuleDependencies(
							module,
							[
								{
									factory,
									dependencies: [dep]
								}
							],
							true,
							"lm",
							true,
							err => {
								compilation.semaphore.acquire(() => {
									if (err) {
										return callback(err);
									}
									if (!dep.module) {
										return callback(new Error("Cannot load the module"));
									}
									// TODO consider removing this in webpack 5
									if (dep.module instanceof NormalModule && dep.module.error) {
										return callback(dep.module.error);
									}
									if (!dep.module._source) {
										throw new Error(
											"The module created for a LoaderDependency must have a property _source"
										);
									}
									let source, map;
									const moduleSource = dep.module._source;
									if (moduleSource.sourceAndMap) {
										const sourceAndMap = moduleSource.sourceAndMap();
										map = sourceAndMap.map;
										source = sourceAndMap.source;
									} else {
										map = moduleSource.map();
										source = moduleSource.source();
									}
									if (dep.module.buildInfo.fileDependencies) {
										for (const d of dep.module.buildInfo.fileDependencies) {
											loaderContext.addDependency(d);
										}
									}
									if (dep.module.buildInfo.contextDependencies) {
										for (const d of dep.module.buildInfo.contextDependencies) {
											loaderContext.addContextDependency(d);
										}
									}
									return callback(null, source, map, dep.module);
								});
							}
						);
					};
				}
			);
		});
	}
}
module.exports = LoaderPlugin;
