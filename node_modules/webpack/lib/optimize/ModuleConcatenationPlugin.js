/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const HarmonyImportDependency = require("../dependencies/HarmonyImportDependency");
const ModuleHotAcceptDependency = require("../dependencies/ModuleHotAcceptDependency");
const ModuleHotDeclineDependency = require("../dependencies/ModuleHotDeclineDependency");
const ConcatenatedModule = require("./ConcatenatedModule");
const HarmonyCompatibilityDependency = require("../dependencies/HarmonyCompatibilityDependency");
const StackedSetMap = require("../util/StackedSetMap");

const formatBailoutReason = msg => {
	return "ModuleConcatenation bailout: " + msg;
};

class ModuleConcatenationPlugin {
	constructor(options) {
		if (typeof options !== "object") options = {};
		this.options = options;
	}

	apply(compiler) {
		compiler.hooks.compilation.tap(
			"ModuleConcatenationPlugin",
			(compilation, { normalModuleFactory }) => {
				const handler = (parser, parserOptions) => {
					parser.hooks.call.for("eval").tap("ModuleConcatenationPlugin", () => {
						// Because of variable renaming we can't use modules with eval.
						parser.state.module.buildMeta.moduleConcatenationBailout = "eval()";
					});
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("ModuleConcatenationPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("ModuleConcatenationPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/esm")
					.tap("ModuleConcatenationPlugin", handler);

				const bailoutReasonMap = new Map();

				const setBailoutReason = (module, reason) => {
					bailoutReasonMap.set(module, reason);
					module.optimizationBailout.push(
						typeof reason === "function"
							? rs => formatBailoutReason(reason(rs))
							: formatBailoutReason(reason)
					);
				};

				const getBailoutReason = (module, requestShortener) => {
					const reason = bailoutReasonMap.get(module);
					if (typeof reason === "function") return reason(requestShortener);
					return reason;
				};

				compilation.hooks.optimizeChunkModules.tap(
					"ModuleConcatenationPlugin",
					(chunks, modules) => {
						const relevantModules = [];
						const possibleInners = new Set();
						for (const module of modules) {
							// Only harmony modules are valid for optimization
							if (
								!module.buildMeta ||
								module.buildMeta.exportsType !== "namespace" ||
								!module.dependencies.some(
									d => d instanceof HarmonyCompatibilityDependency
								)
							) {
								setBailoutReason(module, "Module is not an ECMAScript module");
								continue;
							}

							// Some expressions are not compatible with module concatenation
							// because they may produce unexpected results. The plugin bails out
							// if some were detected upfront.
							if (
								module.buildMeta &&
								module.buildMeta.moduleConcatenationBailout
							) {
								setBailoutReason(
									module,
									`Module uses ${module.buildMeta.moduleConcatenationBailout}`
								);
								continue;
							}

							// Exports must be known (and not dynamic)
							if (!Array.isArray(module.buildMeta.providedExports)) {
								setBailoutReason(module, "Module exports are unknown");
								continue;
							}

							// Using dependency variables is not possible as this wraps the code in a function
							if (module.variables.length > 0) {
								setBailoutReason(
									module,
									`Module uses injected variables (${module.variables
										.map(v => v.name)
										.join(", ")})`
								);
								continue;
							}

							// Hot Module Replacement need it's own module to work correctly
							if (
								module.dependencies.some(
									dep =>
										dep instanceof ModuleHotAcceptDependency ||
										dep instanceof ModuleHotDeclineDependency
								)
							) {
								setBailoutReason(module, "Module uses Hot Module Replacement");
								continue;
							}

							relevantModules.push(module);

							// Module must not be the entry points
							if (module.isEntryModule()) {
								setBailoutReason(module, "Module is an entry point");
								continue;
							}

							// Module must be in any chunk (we don't want to do useless work)
							if (module.getNumberOfChunks() === 0) {
								setBailoutReason(module, "Module is not in any chunk");
								continue;
							}

							// Module must only be used by Harmony Imports
							const nonHarmonyReasons = module.reasons.filter(
								reason =>
									!reason.dependency ||
									!(reason.dependency instanceof HarmonyImportDependency)
							);
							if (nonHarmonyReasons.length > 0) {
								const importingModules = new Set(
									nonHarmonyReasons.map(r => r.module).filter(Boolean)
								);
								const importingExplanations = new Set(
									nonHarmonyReasons.map(r => r.explanation).filter(Boolean)
								);
								const importingModuleTypes = new Map(
									Array.from(importingModules).map(
										m => /** @type {[string, Set]} */ ([
											m,
											new Set(
												nonHarmonyReasons
													.filter(r => r.module === m)
													.map(r => r.dependency.type)
													.sort()
											)
										])
									)
								);
								setBailoutReason(module, requestShortener => {
									const names = Array.from(importingModules)
										.map(
											m =>
												`${m.readableIdentifier(
													requestShortener
												)} (referenced with ${Array.from(
													importingModuleTypes.get(m)
												).join(", ")})`
										)
										.sort();
									const explanations = Array.from(importingExplanations).sort();
									if (names.length > 0 && explanations.length === 0) {
										return `Module is referenced from these modules with unsupported syntax: ${names.join(
											", "
										)}`;
									} else if (names.length === 0 && explanations.length > 0) {
										return `Module is referenced by: ${explanations.join(
											", "
										)}`;
									} else if (names.length > 0 && explanations.length > 0) {
										return `Module is referenced from these modules with unsupported syntax: ${names.join(
											", "
										)} and by: ${explanations.join(", ")}`;
									} else {
										return "Module is referenced in a unsupported way";
									}
								});
								continue;
							}

							possibleInners.add(module);
						}
						// sort by depth
						// modules with lower depth are more likely suited as roots
						// this improves performance, because modules already selected as inner are skipped
						relevantModules.sort((a, b) => {
							return a.depth - b.depth;
						});
						const concatConfigurations = [];
						const usedAsInner = new Set();
						for (const currentRoot of relevantModules) {
							// when used by another configuration as inner:
							// the other configuration is better and we can skip this one
							if (usedAsInner.has(currentRoot)) continue;

							// create a configuration with the root
							const currentConfiguration = new ConcatConfiguration(currentRoot);

							// cache failures to add modules
							const failureCache = new Map();

							// try to add all imports
							for (const imp of this._getImports(compilation, currentRoot)) {
								const problem = this._tryToAdd(
									compilation,
									currentConfiguration,
									imp,
									possibleInners,
									failureCache
								);
								if (problem) {
									failureCache.set(imp, problem);
									currentConfiguration.addWarning(imp, problem);
								}
							}
							if (!currentConfiguration.isEmpty()) {
								concatConfigurations.push(currentConfiguration);
								for (const module of currentConfiguration.getModules()) {
									if (module !== currentConfiguration.rootModule) {
										usedAsInner.add(module);
									}
								}
							}
						}
						// HACK: Sort configurations by length and start with the longest one
						// to get the biggers groups possible. Used modules are marked with usedModules
						// TODO: Allow to reuse existing configuration while trying to add dependencies.
						// This would improve performance. O(n^2) -> O(n)
						concatConfigurations.sort((a, b) => {
							return b.modules.size - a.modules.size;
						});
						const usedModules = new Set();
						for (const concatConfiguration of concatConfigurations) {
							if (usedModules.has(concatConfiguration.rootModule)) continue;
							const modules = concatConfiguration.getModules();
							const rootModule = concatConfiguration.rootModule;
							const newModule = new ConcatenatedModule(
								rootModule,
								Array.from(modules),
								ConcatenatedModule.createConcatenationList(
									rootModule,
									modules,
									compilation
								)
							);
							for (const warning of concatConfiguration.getWarningsSorted()) {
								newModule.optimizationBailout.push(requestShortener => {
									const reason = getBailoutReason(warning[0], requestShortener);
									const reasonWithPrefix = reason ? ` (<- ${reason})` : "";
									if (warning[0] === warning[1]) {
										return formatBailoutReason(
											`Cannot concat with ${warning[0].readableIdentifier(
												requestShortener
											)}${reasonWithPrefix}`
										);
									} else {
										return formatBailoutReason(
											`Cannot concat with ${warning[0].readableIdentifier(
												requestShortener
											)} because of ${warning[1].readableIdentifier(
												requestShortener
											)}${reasonWithPrefix}`
										);
									}
								});
							}
							const chunks = concatConfiguration.rootModule.getChunks();
							for (const m of modules) {
								usedModules.add(m);
								for (const chunk of chunks) {
									chunk.removeModule(m);
								}
							}
							for (const chunk of chunks) {
								chunk.addModule(newModule);
								newModule.addChunk(chunk);
								if (chunk.entryModule === concatConfiguration.rootModule) {
									chunk.entryModule = newModule;
								}
							}
							compilation.modules.push(newModule);
							for (const reason of newModule.reasons) {
								if (reason.dependency.module === concatConfiguration.rootModule)
									reason.dependency.module = newModule;
								if (
									reason.dependency.redirectedModule ===
									concatConfiguration.rootModule
								)
									reason.dependency.redirectedModule = newModule;
							}
							// TODO: remove when LTS node version contains fixed v8 version
							// @see https://github.com/webpack/webpack/pull/6613
							// Turbofan does not correctly inline for-of loops with polymorphic input arrays.
							// Work around issue by using a standard for loop and assigning dep.module.reasons
							for (let i = 0; i < newModule.dependencies.length; i++) {
								let dep = newModule.dependencies[i];
								if (dep.module) {
									let reasons = dep.module.reasons;
									for (let j = 0; j < reasons.length; j++) {
										let reason = reasons[j];
										if (reason.dependency === dep) {
											reason.module = newModule;
										}
									}
								}
							}
						}
						compilation.modules = compilation.modules.filter(
							m => !usedModules.has(m)
						);
					}
				);
			}
		);
	}

	_getImports(compilation, module) {
		return new Set(
			module.dependencies

				// Get reference info only for harmony Dependencies
				.map(dep => {
					if (!(dep instanceof HarmonyImportDependency)) return null;
					if (!compilation) return dep.getReference();
					return compilation.getDependencyReference(module, dep);
				})

				// Reference is valid and has a module
				// Dependencies are simple enough to concat them
				.filter(
					ref =>
						ref &&
						ref.module &&
						(Array.isArray(ref.importedNames) ||
							Array.isArray(ref.module.buildMeta.providedExports))
				)

				// Take the imported module
				.map(ref => ref.module)
		);
	}

	_tryToAdd(compilation, config, module, possibleModules, failureCache) {
		const cacheEntry = failureCache.get(module);
		if (cacheEntry) {
			return cacheEntry;
		}

		// Already added?
		if (config.has(module)) {
			return null;
		}

		// Not possible to add?
		if (!possibleModules.has(module)) {
			failureCache.set(module, module); // cache failures for performance
			return module;
		}

		// module must be in the same chunks
		if (!config.rootModule.hasEqualsChunks(module)) {
			failureCache.set(module, module); // cache failures for performance
			return module;
		}

		// Clone config to make experimental changes
		const testConfig = config.clone();

		// Add the module
		testConfig.add(module);

		// Every module which depends on the added module must be in the configuration too.
		for (const reason of module.reasons) {
			// Modules that are not used can be ignored
			if (
				reason.module.factoryMeta.sideEffectFree &&
				reason.module.used === false
			)
				continue;

			const problem = this._tryToAdd(
				compilation,
				testConfig,
				reason.module,
				possibleModules,
				failureCache
			);
			if (problem) {
				failureCache.set(module, problem); // cache failures for performance
				return problem;
			}
		}

		// Commit experimental changes
		config.set(testConfig);

		// Eagerly try to add imports too if possible
		for (const imp of this._getImports(compilation, module)) {
			const problem = this._tryToAdd(
				compilation,
				config,
				imp,
				possibleModules,
				failureCache
			);
			if (problem) {
				config.addWarning(imp, problem);
			}
		}
		return null;
	}
}

class ConcatConfiguration {
	constructor(rootModule, cloneFrom) {
		this.rootModule = rootModule;
		if (cloneFrom) {
			this.modules = cloneFrom.modules.createChild(5);
			this.warnings = cloneFrom.warnings.createChild(5);
		} else {
			this.modules = new StackedSetMap();
			this.modules.add(rootModule);
			this.warnings = new StackedSetMap();
		}
	}

	add(module) {
		this.modules.add(module);
	}

	has(module) {
		return this.modules.has(module);
	}

	isEmpty() {
		return this.modules.size === 1;
	}

	addWarning(module, problem) {
		this.warnings.set(module, problem);
	}

	getWarningsSorted() {
		return new Map(
			this.warnings.asPairArray().sort((a, b) => {
				const ai = a[0].identifier();
				const bi = b[0].identifier();
				if (ai < bi) return -1;
				if (ai > bi) return 1;
				return 0;
			})
		);
	}

	getModules() {
		return this.modules.asSet();
	}

	clone() {
		return new ConcatConfiguration(this.rootModule, this);
	}

	set(config) {
		this.rootModule = config.rootModule;
		this.modules = config.modules;
		this.warnings = config.warnings;
	}
}

module.exports = ModuleConcatenationPlugin;
