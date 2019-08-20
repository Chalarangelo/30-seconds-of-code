/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Queue = require("./util/Queue");

const addToSet = (a, b) => {
	let changed = false;
	for (const item of b) {
		if (!a.has(item)) {
			a.add(item);
			changed = true;
		}
	}
	return changed;
};

class FlagDependencyExportsPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"FlagDependencyExportsPlugin",
			compilation => {
				compilation.hooks.finishModules.tap(
					"FlagDependencyExportsPlugin",
					modules => {
						const dependencies = new Map();

						const queue = new Queue();

						let module;
						let moduleWithExports;
						let moduleProvidedExports;
						let providedExportsAreTemporary;

						const processDependenciesBlock = depBlock => {
							for (const dep of depBlock.dependencies) {
								if (processDependency(dep)) return true;
							}
							for (const variable of depBlock.variables) {
								for (const dep of variable.dependencies) {
									if (processDependency(dep)) return true;
								}
							}
							for (const block of depBlock.blocks) {
								if (processDependenciesBlock(block)) return true;
							}
							return false;
						};

						const processDependency = dep => {
							const exportDesc = dep.getExports && dep.getExports();
							if (!exportDesc) return;
							moduleWithExports = true;
							const exports = exportDesc.exports;
							// break early if it's only in the worst state
							if (module.buildMeta.providedExports === true) {
								return true;
							}
							// break if it should move to the worst state
							if (exports === true) {
								module.buildMeta.providedExports = true;
								notifyDependencies();
								return true;
							}
							// merge in new exports
							if (Array.isArray(exports)) {
								if (addToSet(moduleProvidedExports, exports)) {
									notifyDependencies();
								}
							}
							// store dependencies
							const exportDeps = exportDesc.dependencies;
							if (exportDeps) {
								providedExportsAreTemporary = true;
								for (const exportDependency of exportDeps) {
									// add dependency for this module
									const set = dependencies.get(exportDependency);
									if (set === undefined) {
										dependencies.set(exportDependency, new Set([module]));
									} else {
										set.add(module);
									}
								}
							}
							return false;
						};

						const notifyDependencies = () => {
							const deps = dependencies.get(module);
							if (deps !== undefined) {
								for (const dep of deps) {
									queue.enqueue(dep);
								}
							}
						};

						// Start with all modules without provided exports
						for (const module of modules) {
							if (module.buildInfo.temporaryProvidedExports) {
								// Clear exports when they are temporary
								// and recreate them
								module.buildMeta.providedExports = null;
								queue.enqueue(module);
							} else if (!module.buildMeta.providedExports) {
								queue.enqueue(module);
							}
						}

						while (queue.length > 0) {
							module = queue.dequeue();

							if (module.buildMeta.providedExports !== true) {
								moduleWithExports =
									module.buildMeta && module.buildMeta.exportsType;
								moduleProvidedExports = Array.isArray(
									module.buildMeta.providedExports
								)
									? new Set(module.buildMeta.providedExports)
									: new Set();
								providedExportsAreTemporary = false;
								processDependenciesBlock(module);
								module.buildInfo.temporaryProvidedExports = providedExportsAreTemporary;
								if (!moduleWithExports) {
									module.buildMeta.providedExports = true;
									notifyDependencies();
								} else if (module.buildMeta.providedExports !== true) {
									module.buildMeta.providedExports = Array.from(
										moduleProvidedExports
									);
								}
							}
						}
					}
				);
				const providedExportsCache = new WeakMap();
				compilation.hooks.rebuildModule.tap(
					"FlagDependencyExportsPlugin",
					module => {
						providedExportsCache.set(module, module.buildMeta.providedExports);
					}
				);
				compilation.hooks.finishRebuildingModule.tap(
					"FlagDependencyExportsPlugin",
					module => {
						module.buildMeta.providedExports = providedExportsCache.get(module);
					}
				);
			}
		);
	}
}

module.exports = FlagDependencyExportsPlugin;
