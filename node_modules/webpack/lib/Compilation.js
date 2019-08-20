/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
	*/
"use strict";

const asyncLib = require("neo-async");
const util = require("util");
const { CachedSource } = require("webpack-sources");
const {
	Tapable,
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	AsyncSeriesHook
} = require("tapable");
const EntryModuleNotFoundError = require("./EntryModuleNotFoundError");
const ModuleNotFoundError = require("./ModuleNotFoundError");
const ModuleDependencyWarning = require("./ModuleDependencyWarning");
const ModuleDependencyError = require("./ModuleDependencyError");
const ChunkGroup = require("./ChunkGroup");
const Chunk = require("./Chunk");
const Entrypoint = require("./Entrypoint");
const MainTemplate = require("./MainTemplate");
const ChunkTemplate = require("./ChunkTemplate");
const HotUpdateChunkTemplate = require("./HotUpdateChunkTemplate");
const ModuleTemplate = require("./ModuleTemplate");
const RuntimeTemplate = require("./RuntimeTemplate");
const ChunkRenderError = require("./ChunkRenderError");
const AsyncDependencyToInitialChunkError = require("./AsyncDependencyToInitialChunkError");
const Stats = require("./Stats");
const Semaphore = require("./util/Semaphore");
const createHash = require("./util/createHash");
const Queue = require("./util/Queue");
const SortableSet = require("./util/SortableSet");
const GraphHelpers = require("./GraphHelpers");
const ModuleDependency = require("./dependencies/ModuleDependency");
const compareLocations = require("./compareLocations");

/** @typedef {import("./Module")} Module */
/** @typedef {import("./Compiler")} Compiler */
/** @typedef {import("webpack-sources").Source} Source */
/** @typedef {import("./WebpackError")} WebpackError */
/** @typedef {import("./DependenciesBlockVariable")} DependenciesBlockVariable */
/** @typedef {import("./dependencies/SingleEntryDependency")} SingleEntryDependency */
/** @typedef {import("./dependencies/MultiEntryDependency")} MultiEntryDependency */
/** @typedef {import("./dependencies/DllEntryDependency")} DllEntryDependency */
/** @typedef {import("./dependencies/DependencyReference")} DependencyReference */
/** @typedef {import("./DependenciesBlock")} DependenciesBlock */
/** @typedef {import("./AsyncDependenciesBlock")} AsyncDependenciesBlock */
/** @typedef {import("./Dependency")} Dependency */
/** @typedef {import("./Dependency").DependencyLocation} DependencyLocation */
/** @typedef {import("./Dependency").DependencyTemplate} DependencyTemplate */
/** @typedef {import("./util/createHash").Hash} Hash */

// TODO use @callback
/** @typedef {{[assetName: string]: Source}} CompilationAssets */
/** @typedef {(err: Error|null, result?: Module) => void } ModuleCallback */
/** @typedef {(err?: Error|null, result?: Module) => void } ModuleChainCallback */
/** @typedef {(module: Module) => void} OnModuleCallback */
/** @typedef {(err?: Error|null) => void} Callback */
/** @typedef {(d: Dependency) => any} DepBlockVarDependenciesCallback */
/** @typedef {new (...args: any[]) => Dependency} DepConstructor */
/** @typedef {{apply: () => void}} Plugin */

/**
 * @typedef {Object} ModuleFactoryCreateDataContextInfo
 * @property {string} issuer
 * @property {string} compiler
 */

/**
 * @typedef {Object} ModuleFactoryCreateData
 * @property {ModuleFactoryCreateDataContextInfo} contextInfo
 * @property {any=} resolveOptions
 * @property {string} context
 * @property {Dependency[]} dependencies
 */

/**
 * @typedef {Object} ModuleFactory
 * @property {(data: ModuleFactoryCreateData, callback: ModuleCallback) => any} create
 */

/**
 * @typedef {Object} SortedDependency
 * @property {ModuleFactory} factory
 * @property {Dependency[]} dependencies
 */

/**
 * @typedef {Object} DependenciesBlockLike
 * @property {Dependency[]} dependencies
 * @property {AsyncDependenciesBlock[]} blocks
 * @property {DependenciesBlockVariable[]} variables
 */

/**
 * @param {Chunk} a first chunk to sort by id
 * @param {Chunk} b second chunk to sort by id
 * @returns {-1|0|1} sort value
 */
const byId = (a, b) => {
	if (typeof a.id !== typeof b.id) {
		return typeof a.id < typeof b.id ? -1 : 1;
	}
	if (a.id < b.id) return -1;
	if (a.id > b.id) return 1;
	return 0;
};

/**
 * @param {Module} a first module to sort by
 * @param {Module} b second module to sort by
 * @returns {-1|0|1} sort value
 */
const byIdOrIdentifier = (a, b) => {
	if (typeof a.id !== typeof b.id) {
		return typeof a.id < typeof b.id ? -1 : 1;
	}
	if (a.id < b.id) return -1;
	if (a.id > b.id) return 1;
	const identA = a.identifier();
	const identB = b.identifier();
	if (identA < identB) return -1;
	if (identA > identB) return 1;
	return 0;
};

/**
 * @param {Module} a first module to sort by
 * @param {Module} b second module to sort by
 * @returns {-1|0|1} sort value
 */
const byIndexOrIdentifier = (a, b) => {
	if (a.index < b.index) return -1;
	if (a.index > b.index) return 1;
	const identA = a.identifier();
	const identB = b.identifier();
	if (identA < identB) return -1;
	if (identA > identB) return 1;
	return 0;
};

/**
 * @param {Compilation} a first compilation to sort by
 * @param {Compilation} b second compilation to sort by
 * @returns {-1|0|1} sort value
 */
const byNameOrHash = (a, b) => {
	if (a.name < b.name) return -1;
	if (a.name > b.name) return 1;
	if (a.fullHash < b.fullHash) return -1;
	if (a.fullHash > b.fullHash) return 1;
	return 0;
};

/**
 * @template T
 * @param {Set<T>} a first set
 * @param {Set<T>} b second set
 * @returns {number} cmp
 */
const bySetSize = (a, b) => {
	return a.size - b.size;
};

/**
 * @param {DependenciesBlockVariable[]} variables DepBlock Variables to iterate over
 * @param {DepBlockVarDependenciesCallback} fn callback to apply on iterated elements
 * @returns {void}
 */
const iterationBlockVariable = (variables, fn) => {
	for (
		let indexVariable = 0;
		indexVariable < variables.length;
		indexVariable++
	) {
		const varDep = variables[indexVariable].dependencies;
		for (let indexVDep = 0; indexVDep < varDep.length; indexVDep++) {
			fn(varDep[indexVDep]);
		}
	}
};

/**
 * @template T
 * @param {T[]} arr array of elements to iterate over
 * @param {function(T): void} fn callback applied to each element
 * @returns {void}
 */
const iterationOfArrayCallback = (arr, fn) => {
	for (let index = 0; index < arr.length; index++) {
		fn(arr[index]);
	}
};

/**
 * @template T
 * @param {Set<T>} set set to add items to
 * @param {Set<T>} otherSet set to add items from
 * @returns {void}
 */
const addAllToSet = (set, otherSet) => {
	for (const item of otherSet) {
		set.add(item);
	}
};

class Compilation extends Tapable {
	/**
	 * Creates an instance of Compilation.
	 * @param {Compiler} compiler the compiler which created the compilation
	 */
	constructor(compiler) {
		super();
		this.hooks = {
			/** @type {SyncHook<Module>} */
			buildModule: new SyncHook(["module"]),
			/** @type {SyncHook<Module>} */
			rebuildModule: new SyncHook(["module"]),
			/** @type {SyncHook<Module, Error>} */
			failedModule: new SyncHook(["module", "error"]),
			/** @type {SyncHook<Module>} */
			succeedModule: new SyncHook(["module"]),

			/** @type {SyncHook<Dependency, string>} */
			addEntry: new SyncHook(["entry", "name"]),
			/** @type {SyncHook<Dependency, string, Error>} */
			failedEntry: new SyncHook(["entry", "name", "error"]),
			/** @type {SyncHook<Dependency, string, Module>} */
			succeedEntry: new SyncHook(["entry", "name", "module"]),

			/** @type {SyncWaterfallHook<DependencyReference, Dependency, Module>} */
			dependencyReference: new SyncWaterfallHook([
				"dependencyReference",
				"dependency",
				"module"
			]),

			/** @type {SyncHook<Module[]>} */
			finishModules: new SyncHook(["modules"]),
			/** @type {SyncHook<Module>} */
			finishRebuildingModule: new SyncHook(["module"]),
			/** @type {SyncHook} */
			unseal: new SyncHook([]),
			/** @type {SyncHook} */
			seal: new SyncHook([]),

			/** @type {SyncHook} */
			beforeChunks: new SyncHook([]),
			/** @type {SyncHook<Chunk[]>} */
			afterChunks: new SyncHook(["chunks"]),

			/** @type {SyncBailHook<Module[]>} */
			optimizeDependenciesBasic: new SyncBailHook(["modules"]),
			/** @type {SyncBailHook<Module[]>} */
			optimizeDependencies: new SyncBailHook(["modules"]),
			/** @type {SyncBailHook<Module[]>} */
			optimizeDependenciesAdvanced: new SyncBailHook(["modules"]),
			/** @type {SyncBailHook<Module[]>} */
			afterOptimizeDependencies: new SyncHook(["modules"]),

			/** @type {SyncHook} */
			optimize: new SyncHook([]),
			/** @type {SyncBailHook<Module[]>} */
			optimizeModulesBasic: new SyncBailHook(["modules"]),
			/** @type {SyncBailHook<Module[]>} */
			optimizeModules: new SyncBailHook(["modules"]),
			/** @type {SyncBailHook<Module[]>} */
			optimizeModulesAdvanced: new SyncBailHook(["modules"]),
			/** @type {SyncHook<Module[]>} */
			afterOptimizeModules: new SyncHook(["modules"]),

			/** @type {SyncBailHook<Chunk[], ChunkGroup[]>} */
			optimizeChunksBasic: new SyncBailHook(["chunks", "chunkGroups"]),
			/** @type {SyncBailHook<Chunk[], ChunkGroup[]>} */
			optimizeChunks: new SyncBailHook(["chunks", "chunkGroups"]),
			/** @type {SyncBailHook<Chunk[], ChunkGroup[]>} */
			optimizeChunksAdvanced: new SyncBailHook(["chunks", "chunkGroups"]),
			/** @type {SyncHook<Chunk[], ChunkGroup[]>} */
			afterOptimizeChunks: new SyncHook(["chunks", "chunkGroups"]),

			/** @type {AsyncSeriesHook<Chunk[], Module[]>} */
			optimizeTree: new AsyncSeriesHook(["chunks", "modules"]),
			/** @type {SyncHook<Chunk[], Module[]>} */
			afterOptimizeTree: new SyncHook(["chunks", "modules"]),

			/** @type {SyncBailHook<Chunk[], Module[]>} */
			optimizeChunkModulesBasic: new SyncBailHook(["chunks", "modules"]),
			/** @type {SyncBailHook<Chunk[], Module[]>} */
			optimizeChunkModules: new SyncBailHook(["chunks", "modules"]),
			/** @type {SyncBailHook<Chunk[], Module[]>} */
			optimizeChunkModulesAdvanced: new SyncBailHook(["chunks", "modules"]),
			/** @type {SyncHook<Chunk[], Module[]>} */
			afterOptimizeChunkModules: new SyncHook(["chunks", "modules"]),
			/** @type {SyncBailHook} */
			shouldRecord: new SyncBailHook([]),

			/** @type {SyncHook<Module[], any>} */
			reviveModules: new SyncHook(["modules", "records"]),
			/** @type {SyncHook<Module[]>} */
			optimizeModuleOrder: new SyncHook(["modules"]),
			/** @type {SyncHook<Module[]>} */
			advancedOptimizeModuleOrder: new SyncHook(["modules"]),
			/** @type {SyncHook<Module[]>} */
			beforeModuleIds: new SyncHook(["modules"]),
			/** @type {SyncHook<Module[]>} */
			moduleIds: new SyncHook(["modules"]),
			/** @type {SyncHook<Module[]>} */
			optimizeModuleIds: new SyncHook(["modules"]),
			/** @type {SyncHook<Module[]>} */
			afterOptimizeModuleIds: new SyncHook(["modules"]),

			/** @type {SyncHook<Chunk[], any>} */
			reviveChunks: new SyncHook(["chunks", "records"]),
			/** @type {SyncHook<Chunk[]>} */
			optimizeChunkOrder: new SyncHook(["chunks"]),
			/** @type {SyncHook<Chunk[]>} */
			beforeChunkIds: new SyncHook(["chunks"]),
			/** @type {SyncHook<Chunk[]>} */
			optimizeChunkIds: new SyncHook(["chunks"]),
			/** @type {SyncHook<Chunk[]>} */
			afterOptimizeChunkIds: new SyncHook(["chunks"]),

			/** @type {SyncHook<Module[], any>} */
			recordModules: new SyncHook(["modules", "records"]),
			/** @type {SyncHook<Chunk[], any>} */
			recordChunks: new SyncHook(["chunks", "records"]),

			/** @type {SyncHook} */
			beforeHash: new SyncHook([]),
			/** @type {SyncHook<Chunk>} */
			contentHash: new SyncHook(["chunk"]),
			/** @type {SyncHook} */
			afterHash: new SyncHook([]),
			/** @type {SyncHook<any>} */
			recordHash: new SyncHook(["records"]),
			/** @type {SyncHook<Compilation, any>} */
			record: new SyncHook(["compilation", "records"]),

			/** @type {SyncHook} */
			beforeModuleAssets: new SyncHook([]),
			/** @type {SyncBailHook} */
			shouldGenerateChunkAssets: new SyncBailHook([]),
			/** @type {SyncHook} */
			beforeChunkAssets: new SyncHook([]),
			/** @type {SyncHook<Chunk[]>} */
			additionalChunkAssets: new SyncHook(["chunks"]),

			/** @type {AsyncSeriesHook} */
			additionalAssets: new AsyncSeriesHook([]),
			/** @type {AsyncSeriesHook<Chunk[]>} */
			optimizeChunkAssets: new AsyncSeriesHook(["chunks"]),
			/** @type {SyncHook<Chunk[]>} */
			afterOptimizeChunkAssets: new SyncHook(["chunks"]),
			/** @type {AsyncSeriesHook<CompilationAssets>} */
			optimizeAssets: new AsyncSeriesHook(["assets"]),
			/** @type {SyncHook<CompilationAssets>} */
			afterOptimizeAssets: new SyncHook(["assets"]),

			/** @type {SyncBailHook} */
			needAdditionalSeal: new SyncBailHook([]),
			/** @type {AsyncSeriesHook} */
			afterSeal: new AsyncSeriesHook([]),

			/** @type {SyncHook<Chunk, Hash>} */
			chunkHash: new SyncHook(["chunk", "chunkHash"]),
			/** @type {SyncHook<Module, string>} */
			moduleAsset: new SyncHook(["module", "filename"]),
			/** @type {SyncHook<Chunk, string>} */
			chunkAsset: new SyncHook(["chunk", "filename"]),

			/** @type {SyncWaterfallHook<string, TODO>} */
			assetPath: new SyncWaterfallHook(["filename", "data"]), // TODO MainTemplate

			/** @type {SyncBailHook} */
			needAdditionalPass: new SyncBailHook([]),

			/** @type {SyncHook<Compiler, string, number>} */
			childCompiler: new SyncHook([
				"childCompiler",
				"compilerName",
				"compilerIndex"
			]),

			// TODO the following hooks are weirdly located here
			// TODO move them for webpack 5
			/** @type {SyncHook<object, Module>} */
			normalModuleLoader: new SyncHook(["loaderContext", "module"]),

			/** @type {SyncBailHook<Chunk[]>} */
			optimizeExtractedChunksBasic: new SyncBailHook(["chunks"]),
			/** @type {SyncBailHook<Chunk[]>} */
			optimizeExtractedChunks: new SyncBailHook(["chunks"]),
			/** @type {SyncBailHook<Chunk[]>} */
			optimizeExtractedChunksAdvanced: new SyncBailHook(["chunks"]),
			/** @type {SyncHook<Chunk[]>} */
			afterOptimizeExtractedChunks: new SyncHook(["chunks"])
		};
		this._pluginCompat.tap("Compilation", options => {
			switch (options.name) {
				case "optimize-tree":
				case "additional-assets":
				case "optimize-chunk-assets":
				case "optimize-assets":
				case "after-seal":
					options.async = true;
					break;
			}
		});
		/** @type {string=} */
		this.name = undefined;
		/** @type {Compiler} */
		this.compiler = compiler;
		this.resolverFactory = compiler.resolverFactory;
		this.inputFileSystem = compiler.inputFileSystem;
		this.requestShortener = compiler.requestShortener;

		const options = compiler.options;
		this.options = options;
		this.outputOptions = options && options.output;
		/** @type {boolean=} */
		this.bail = options && options.bail;
		this.profile = options && options.profile;
		this.performance = options && options.performance;

		this.mainTemplate = new MainTemplate(this.outputOptions);
		this.chunkTemplate = new ChunkTemplate(this.outputOptions);
		this.hotUpdateChunkTemplate = new HotUpdateChunkTemplate(
			this.outputOptions
		);
		this.runtimeTemplate = new RuntimeTemplate(
			this.outputOptions,
			this.requestShortener
		);
		this.moduleTemplates = {
			javascript: new ModuleTemplate(this.runtimeTemplate, "javascript"),
			webassembly: new ModuleTemplate(this.runtimeTemplate, "webassembly")
		};

		this.semaphore = new Semaphore(options.parallelism || 100);

		this.entries = [];
		/** @private @type {{name: string, request: string, module: Module}[]} */
		this._preparedEntrypoints = [];
		this.entrypoints = new Map();
		/** @type {Chunk[]} */
		this.chunks = [];
		/** @type {ChunkGroup[]} */
		this.chunkGroups = [];
		/** @type {Map<string, ChunkGroup>} */
		this.namedChunkGroups = new Map();
		/** @type {Map<string, Chunk>} */
		this.namedChunks = new Map();
		/** @type {Module[]} */
		this.modules = [];
		/** @private @type {Map<string, Module>} */
		this._modules = new Map();
		this.cache = null;
		this.records = null;
		/** @type {string[]} */
		this.additionalChunkAssets = [];
		/** @type {CompilationAssets} */
		this.assets = {};
		/** @type {WebpackError[]} */
		this.errors = [];
		/** @type {WebpackError[]} */
		this.warnings = [];
		/** @type {Compilation[]} */
		this.children = [];
		/** @type {Map<DepConstructor, ModuleFactory>} */
		this.dependencyFactories = new Map();
		/** @type {Map<DepConstructor, DependencyTemplate>} */
		this.dependencyTemplates = new Map();
		// TODO refactor this in webpack 5 to a custom DependencyTemplates class with a hash property
		// @ts-ignore
		this.dependencyTemplates.set("hash", "");
		this.childrenCounters = {};
		/** @type {Set<number|string>} */
		this.usedChunkIds = null;
		/** @type {Set<number>} */
		this.usedModuleIds = null;
		/** @type {Map<string, number>=} */
		this.fileTimestamps = undefined;
		/** @type {Map<string, number>=} */
		this.contextTimestamps = undefined;
		/** @type {Set<string>=} */
		this.compilationDependencies = undefined;
		/** @private @type {Map<Module, Callback[]>} */
		this._buildingModules = new Map();
		/** @private @type {Map<Module, Callback[]>} */
		this._rebuildingModules = new Map();
	}

	getStats() {
		return new Stats(this);
	}

	/**
	 * @typedef {Object} AddModuleResult
	 * @property {Module} module the added or existing module
	 * @property {boolean} issuer was this the first request for this module
	 * @property {boolean} build should the module be build
	 * @property {boolean} dependencies should dependencies be walked
	 */

	/**
	 * @param {Module} module module to be added that was created
	 * @param {any=} cacheGroup cacheGroup it is apart of
	 * @returns {AddModuleResult} returns meta about whether or not the module had built
	 * had an issuer, or any dependnecies
	 */
	addModule(module, cacheGroup) {
		const identifier = module.identifier();
		const alreadyAddedModule = this._modules.get(identifier);
		if (alreadyAddedModule) {
			return {
				module: alreadyAddedModule,
				issuer: false,
				build: false,
				dependencies: false
			};
		}
		const cacheName = (cacheGroup || "m") + identifier;
		if (this.cache && this.cache[cacheName]) {
			const cacheModule = this.cache[cacheName];

			if (typeof cacheModule.updateCacheModule === "function") {
				cacheModule.updateCacheModule(module);
			}

			let rebuild = true;
			if (this.fileTimestamps && this.contextTimestamps) {
				rebuild = cacheModule.needRebuild(
					this.fileTimestamps,
					this.contextTimestamps
				);
			}

			if (!rebuild) {
				cacheModule.disconnect();
				this._modules.set(identifier, cacheModule);
				this.modules.push(cacheModule);
				for (const err of cacheModule.errors) {
					this.errors.push(err);
				}
				for (const err of cacheModule.warnings) {
					this.warnings.push(err);
				}
				return {
					module: cacheModule,
					issuer: true,
					build: false,
					dependencies: true
				};
			}
			cacheModule.unbuild();
			module = cacheModule;
		}
		this._modules.set(identifier, module);
		if (this.cache) {
			this.cache[cacheName] = module;
		}
		this.modules.push(module);
		return {
			module: module,
			issuer: true,
			build: true,
			dependencies: true
		};
	}

	/**
	 * Fetches a module from a compilation by its identifier
	 * @param {Module} module the module provided
	 * @returns {Module} the module requested
	 */
	getModule(module) {
		const identifier = module.identifier();
		return this._modules.get(identifier);
	}

	/**
	 * Attempts to search for a module by its identifier
	 * @param {string} identifier identifier (usually path) for module
	 * @returns {Module|undefined} attempt to search for module and return it, else undefined
	 */
	findModule(identifier) {
		return this._modules.get(identifier);
	}

	/**
	 * @param {Module} module module with its callback list
	 * @param {Callback} callback the callback function
	 * @returns {void}
	 */
	waitForBuildingFinished(module, callback) {
		let callbackList = this._buildingModules.get(module);
		if (callbackList) {
			callbackList.push(() => callback());
		} else {
			process.nextTick(callback);
		}
	}

	/**
	 * Builds the module object
	 *
	 * @param {Module} module module to be built
	 * @param {boolean} optional optional flag
	 * @param {Module=} origin origin module this module build was requested from
	 * @param {Dependency[]=} dependencies optional dependencies from the module to be built
	 * @param {TODO} thisCallback the callback
	 * @returns {TODO} returns the callback function with results
	 */
	buildModule(module, optional, origin, dependencies, thisCallback) {
		let callbackList = this._buildingModules.get(module);
		if (callbackList) {
			callbackList.push(thisCallback);
			return;
		}
		this._buildingModules.set(module, (callbackList = [thisCallback]));

		const callback = err => {
			this._buildingModules.delete(module);
			for (const cb of callbackList) {
				cb(err);
			}
		};

		this.hooks.buildModule.call(module);
		module.build(
			this.options,
			this,
			this.resolverFactory.get("normal", module.resolveOptions),
			this.inputFileSystem,
			error => {
				const errors = module.errors;
				for (let indexError = 0; indexError < errors.length; indexError++) {
					const err = errors[indexError];
					err.origin = origin;
					err.dependencies = dependencies;
					if (optional) {
						this.warnings.push(err);
					} else {
						this.errors.push(err);
					}
				}

				const warnings = module.warnings;
				for (
					let indexWarning = 0;
					indexWarning < warnings.length;
					indexWarning++
				) {
					const war = warnings[indexWarning];
					war.origin = origin;
					war.dependencies = dependencies;
					this.warnings.push(war);
				}
				const originalMap = module.dependencies.reduce((map, v, i) => {
					map.set(v, i);
					return map;
				}, new Map());
				module.dependencies.sort((a, b) => {
					const cmp = compareLocations(a.loc, b.loc);
					if (cmp) return cmp;
					return originalMap.get(a) - originalMap.get(b);
				});
				if (error) {
					this.hooks.failedModule.call(module, error);
					return callback(error);
				}
				this.hooks.succeedModule.call(module);
				return callback();
			}
		);
	}

	/**
	 * @param {Module} module to be processed for deps
	 * @param {ModuleCallback} callback callback to be triggered
	 * @returns {void}
	 */
	processModuleDependencies(module, callback) {
		const dependencies = new Map();

		const addDependency = dep => {
			const resourceIdent = dep.getResourceIdentifier();
			if (resourceIdent) {
				const factory = this.dependencyFactories.get(dep.constructor);
				if (factory === undefined) {
					throw new Error(
						`No module factory available for dependency type: ${
							dep.constructor.name
						}`
					);
				}
				let innerMap = dependencies.get(factory);
				if (innerMap === undefined) {
					dependencies.set(factory, (innerMap = new Map()));
				}
				let list = innerMap.get(resourceIdent);
				if (list === undefined) innerMap.set(resourceIdent, (list = []));
				list.push(dep);
			}
		};

		const addDependenciesBlock = block => {
			if (block.dependencies) {
				iterationOfArrayCallback(block.dependencies, addDependency);
			}
			if (block.blocks) {
				iterationOfArrayCallback(block.blocks, addDependenciesBlock);
			}
			if (block.variables) {
				iterationBlockVariable(block.variables, addDependency);
			}
		};

		try {
			addDependenciesBlock(module);
		} catch (e) {
			callback(e);
		}

		const sortedDependencies = [];

		for (const pair1 of dependencies) {
			for (const pair2 of pair1[1]) {
				sortedDependencies.push({
					factory: pair1[0],
					dependencies: pair2[1]
				});
			}
		}

		this.addModuleDependencies(
			module,
			sortedDependencies,
			this.bail,
			null,
			true,
			callback
		);
	}

	/**
	 * @param {Module} module module to add deps to
	 * @param {SortedDependency[]} dependencies set of sorted dependencies to iterate through
	 * @param {(boolean|null)=} bail whether to bail or not
	 * @param {TODO} cacheGroup optional cacheGroup
	 * @param {boolean} recursive whether it is recursive traversal
	 * @param {function} callback callback for when dependencies are finished being added
	 * @returns {void}
	 */
	addModuleDependencies(
		module,
		dependencies,
		bail,
		cacheGroup,
		recursive,
		callback
	) {
		const start = this.profile && Date.now();
		const currentProfile = this.profile && {};

		asyncLib.forEach(
			dependencies,
			(item, callback) => {
				const dependencies = item.dependencies;

				const errorAndCallback = err => {
					err.origin = module;
					err.dependencies = dependencies;
					this.errors.push(err);
					if (bail) {
						callback(err);
					} else {
						callback();
					}
				};
				const warningAndCallback = err => {
					err.origin = module;
					this.warnings.push(err);
					callback();
				};

				const semaphore = this.semaphore;
				semaphore.acquire(() => {
					const factory = item.factory;
					factory.create(
						{
							contextInfo: {
								issuer: module.nameForCondition && module.nameForCondition(),
								compiler: this.compiler.name
							},
							resolveOptions: module.resolveOptions,
							context: module.context,
							dependencies: dependencies
						},
						(err, dependentModule) => {
							let afterFactory;

							const isOptional = () => {
								return dependencies.every(d => d.optional);
							};

							const errorOrWarningAndCallback = err => {
								if (isOptional()) {
									return warningAndCallback(err);
								} else {
									return errorAndCallback(err);
								}
							};

							if (err) {
								semaphore.release();
								return errorOrWarningAndCallback(
									new ModuleNotFoundError(module, err)
								);
							}
							if (!dependentModule) {
								semaphore.release();
								return process.nextTick(callback);
							}
							if (currentProfile) {
								afterFactory = Date.now();
								currentProfile.factory = afterFactory - start;
							}

							const iterationDependencies = depend => {
								for (let index = 0; index < depend.length; index++) {
									const dep = depend[index];
									dep.module = dependentModule;
									dependentModule.addReason(module, dep);
								}
							};

							const addModuleResult = this.addModule(
								dependentModule,
								cacheGroup
							);
							dependentModule = addModuleResult.module;
							iterationDependencies(dependencies);

							const afterBuild = () => {
								if (currentProfile) {
									const afterBuilding = Date.now();
									currentProfile.building = afterBuilding - afterFactory;
								}

								if (recursive && addModuleResult.dependencies) {
									this.processModuleDependencies(dependentModule, callback);
								} else {
									return callback();
								}
							};

							if (addModuleResult.issuer) {
								if (currentProfile) {
									dependentModule.profile = currentProfile;
								}

								dependentModule.issuer = module;
							} else {
								if (this.profile) {
									if (module.profile) {
										const time = Date.now() - start;
										if (
											!module.profile.dependencies ||
											time > module.profile.dependencies
										) {
											module.profile.dependencies = time;
										}
									}
								}
							}

							if (addModuleResult.build) {
								this.buildModule(
									dependentModule,
									isOptional(),
									module,
									dependencies,
									err => {
										if (err) {
											semaphore.release();
											return errorOrWarningAndCallback(err);
										}

										if (currentProfile) {
											const afterBuilding = Date.now();
											currentProfile.building = afterBuilding - afterFactory;
										}

										semaphore.release();
										afterBuild();
									}
								);
							} else {
								semaphore.release();
								this.waitForBuildingFinished(dependentModule, afterBuild);
							}
						}
					);
				});
			},
			err => {
				// In V8, the Error objects keep a reference to the functions on the stack. These warnings &
				// errors are created inside closures that keep a reference to the Compilation, so errors are
				// leaking the Compilation object.

				if (err) {
					// eslint-disable-next-line no-self-assign
					err.stack = err.stack;
					return callback(err);
				}

				return process.nextTick(callback);
			}
		);
	}

	/**
	 *
	 * @param {string} context context string path
	 * @param {Dependency} dependency dependency used to create Module chain
	 * @param {OnModuleCallback} onModule function invoked on modules creation
	 * @param {ModuleChainCallback} callback callback for when module chain is complete
	 * @returns {void} will throw if dependency instance is not a valid Dependency
	 */
	_addModuleChain(context, dependency, onModule, callback) {
		const start = this.profile && Date.now();
		const currentProfile = this.profile && {};

		const errorAndCallback = this.bail
			? err => {
					callback(err);
			  }
			: err => {
					err.dependencies = [dependency];
					this.errors.push(err);
					callback();
			  };

		if (
			typeof dependency !== "object" ||
			dependency === null ||
			!dependency.constructor
		) {
			throw new Error("Parameter 'dependency' must be a Dependency");
		}
		const Dep = /** @type {DepConstructor} */ (dependency.constructor);
		const moduleFactory = this.dependencyFactories.get(Dep);
		if (!moduleFactory) {
			throw new Error(
				`No dependency factory available for this dependency type: ${
					dependency.constructor.name
				}`
			);
		}

		this.semaphore.acquire(() => {
			moduleFactory.create(
				{
					contextInfo: {
						issuer: "",
						compiler: this.compiler.name
					},
					context: context,
					dependencies: [dependency]
				},
				(err, module) => {
					if (err) {
						this.semaphore.release();
						return errorAndCallback(new EntryModuleNotFoundError(err));
					}

					let afterFactory;

					if (currentProfile) {
						afterFactory = Date.now();
						currentProfile.factory = afterFactory - start;
					}

					const addModuleResult = this.addModule(module);
					module = addModuleResult.module;

					onModule(module);

					dependency.module = module;
					module.addReason(null, dependency);

					const afterBuild = () => {
						if (currentProfile) {
							const afterBuilding = Date.now();
							currentProfile.building = afterBuilding - afterFactory;
						}

						if (addModuleResult.dependencies) {
							this.processModuleDependencies(module, err => {
								if (err) return callback(err);
								callback(null, module);
							});
						} else {
							return callback(null, module);
						}
					};

					if (addModuleResult.issuer) {
						if (currentProfile) {
							module.profile = currentProfile;
						}
					}

					if (addModuleResult.build) {
						this.buildModule(module, false, null, null, err => {
							if (err) {
								this.semaphore.release();
								return errorAndCallback(err);
							}

							if (currentProfile) {
								const afterBuilding = Date.now();
								currentProfile.building = afterBuilding - afterFactory;
							}

							this.semaphore.release();
							afterBuild();
						});
					} else {
						this.semaphore.release();
						this.waitForBuildingFinished(module, afterBuild);
					}
				}
			);
		});
	}

	/**
	 *
	 * @param {string} context context path for entry
	 * @param {Dependency} entry entry dependency being created
	 * @param {string} name name of entry
	 * @param {ModuleCallback} callback callback function
	 * @returns {void} returns
	 */
	addEntry(context, entry, name, callback) {
		this.hooks.addEntry.call(entry, name);

		const slot = {
			name: name,
			// TODO webpack 5 remove `request`
			request: null,
			module: null
		};

		if (entry instanceof ModuleDependency) {
			slot.request = entry.request;
		}

		// TODO webpack 5: merge modules instead when multiple entry modules are supported
		const idx = this._preparedEntrypoints.findIndex(slot => slot.name === name);
		if (idx >= 0) {
			// Overwrite existing entrypoint
			this._preparedEntrypoints[idx] = slot;
		} else {
			this._preparedEntrypoints.push(slot);
		}
		this._addModuleChain(
			context,
			entry,
			module => {
				this.entries.push(module);
			},
			(err, module) => {
				if (err) {
					this.hooks.failedEntry.call(entry, name, err);
					return callback(err);
				}

				if (module) {
					slot.module = module;
				} else {
					const idx = this._preparedEntrypoints.indexOf(slot);
					if (idx >= 0) {
						this._preparedEntrypoints.splice(idx, 1);
					}
				}
				this.hooks.succeedEntry.call(entry, name, module);
				return callback(null, module);
			}
		);
	}

	/**
	 * @param {string} context context path string
	 * @param {Dependency} dependency dep used to create module
	 * @param {ModuleCallback} callback module callback sending module up a level
	 * @returns {void}
	 */
	prefetch(context, dependency, callback) {
		this._addModuleChain(
			context,
			dependency,
			module => {
				module.prefetched = true;
			},
			callback
		);
	}

	/**
	 * @param {Module} module module to be rebuilt
	 * @param {Callback} thisCallback callback when module finishes rebuilding
	 * @returns {void}
	 */
	rebuildModule(module, thisCallback) {
		let callbackList = this._rebuildingModules.get(module);
		if (callbackList) {
			callbackList.push(thisCallback);
			return;
		}
		this._rebuildingModules.set(module, (callbackList = [thisCallback]));

		const callback = err => {
			this._rebuildingModules.delete(module);
			for (const cb of callbackList) {
				cb(err);
			}
		};

		this.hooks.rebuildModule.call(module);
		const oldDependencies = module.dependencies.slice();
		const oldVariables = module.variables.slice();
		const oldBlocks = module.blocks.slice();
		module.unbuild();
		this.buildModule(module, false, module, null, err => {
			if (err) {
				this.hooks.finishRebuildingModule.call(module);
				return callback(err);
			}

			this.processModuleDependencies(module, err => {
				if (err) return callback(err);
				this.removeReasonsOfDependencyBlock(module, {
					dependencies: oldDependencies,
					variables: oldVariables,
					blocks: oldBlocks
				});
				this.hooks.finishRebuildingModule.call(module);
				callback();
			});
		});
	}

	finish() {
		const modules = this.modules;
		this.hooks.finishModules.call(modules);

		for (let index = 0; index < modules.length; index++) {
			const module = modules[index];
			this.reportDependencyErrorsAndWarnings(module, [module]);
		}
	}

	unseal() {
		this.hooks.unseal.call();
		this.chunks.length = 0;
		this.chunkGroups.length = 0;
		this.namedChunks.clear();
		this.namedChunkGroups.clear();
		this.additionalChunkAssets.length = 0;
		this.assets = {};
		for (const module of this.modules) {
			module.unseal();
		}
	}

	/**
	 * @param {Callback} callback signals when the seal method is finishes
	 * @returns {void}
	 */
	seal(callback) {
		this.hooks.seal.call();

		while (
			this.hooks.optimizeDependenciesBasic.call(this.modules) ||
			this.hooks.optimizeDependencies.call(this.modules) ||
			this.hooks.optimizeDependenciesAdvanced.call(this.modules)
		) {
			/* empty */
		}
		this.hooks.afterOptimizeDependencies.call(this.modules);

		this.hooks.beforeChunks.call();
		for (const preparedEntrypoint of this._preparedEntrypoints) {
			const module = preparedEntrypoint.module;
			const name = preparedEntrypoint.name;
			const chunk = this.addChunk(name);
			const entrypoint = new Entrypoint(name);
			entrypoint.setRuntimeChunk(chunk);
			entrypoint.addOrigin(null, name, preparedEntrypoint.request);
			this.namedChunkGroups.set(name, entrypoint);
			this.entrypoints.set(name, entrypoint);
			this.chunkGroups.push(entrypoint);

			GraphHelpers.connectChunkGroupAndChunk(entrypoint, chunk);
			GraphHelpers.connectChunkAndModule(chunk, module);

			chunk.entryModule = module;
			chunk.name = name;

			this.assignDepth(module);
		}
		this.processDependenciesBlocksForChunkGroups(this.chunkGroups.slice());
		this.sortModules(this.modules);
		this.hooks.afterChunks.call(this.chunks);

		this.hooks.optimize.call();

		while (
			this.hooks.optimizeModulesBasic.call(this.modules) ||
			this.hooks.optimizeModules.call(this.modules) ||
			this.hooks.optimizeModulesAdvanced.call(this.modules)
		) {
			/* empty */
		}
		this.hooks.afterOptimizeModules.call(this.modules);

		while (
			this.hooks.optimizeChunksBasic.call(this.chunks, this.chunkGroups) ||
			this.hooks.optimizeChunks.call(this.chunks, this.chunkGroups) ||
			this.hooks.optimizeChunksAdvanced.call(this.chunks, this.chunkGroups)
		) {
			/* empty */
		}
		this.hooks.afterOptimizeChunks.call(this.chunks, this.chunkGroups);

		this.hooks.optimizeTree.callAsync(this.chunks, this.modules, err => {
			if (err) {
				return callback(err);
			}

			this.hooks.afterOptimizeTree.call(this.chunks, this.modules);

			while (
				this.hooks.optimizeChunkModulesBasic.call(this.chunks, this.modules) ||
				this.hooks.optimizeChunkModules.call(this.chunks, this.modules) ||
				this.hooks.optimizeChunkModulesAdvanced.call(this.chunks, this.modules)
			) {
				/* empty */
			}
			this.hooks.afterOptimizeChunkModules.call(this.chunks, this.modules);

			const shouldRecord = this.hooks.shouldRecord.call() !== false;

			this.hooks.reviveModules.call(this.modules, this.records);
			this.hooks.optimizeModuleOrder.call(this.modules);
			this.hooks.advancedOptimizeModuleOrder.call(this.modules);
			this.hooks.beforeModuleIds.call(this.modules);
			this.hooks.moduleIds.call(this.modules);
			this.applyModuleIds();
			this.hooks.optimizeModuleIds.call(this.modules);
			this.hooks.afterOptimizeModuleIds.call(this.modules);

			this.sortItemsWithModuleIds();

			this.hooks.reviveChunks.call(this.chunks, this.records);
			this.hooks.optimizeChunkOrder.call(this.chunks);
			this.hooks.beforeChunkIds.call(this.chunks);
			this.applyChunkIds();
			this.hooks.optimizeChunkIds.call(this.chunks);
			this.hooks.afterOptimizeChunkIds.call(this.chunks);

			this.sortItemsWithChunkIds();

			if (shouldRecord) {
				this.hooks.recordModules.call(this.modules, this.records);
				this.hooks.recordChunks.call(this.chunks, this.records);
			}

			this.hooks.beforeHash.call();
			this.createHash();
			this.hooks.afterHash.call();

			if (shouldRecord) {
				this.hooks.recordHash.call(this.records);
			}

			this.hooks.beforeModuleAssets.call();
			this.createModuleAssets();
			if (this.hooks.shouldGenerateChunkAssets.call() !== false) {
				this.hooks.beforeChunkAssets.call();
				this.createChunkAssets();
			}
			this.hooks.additionalChunkAssets.call(this.chunks);
			this.summarizeDependencies();
			if (shouldRecord) {
				this.hooks.record.call(this, this.records);
			}

			this.hooks.additionalAssets.callAsync(err => {
				if (err) {
					return callback(err);
				}
				this.hooks.optimizeChunkAssets.callAsync(this.chunks, err => {
					if (err) {
						return callback(err);
					}
					this.hooks.afterOptimizeChunkAssets.call(this.chunks);
					this.hooks.optimizeAssets.callAsync(this.assets, err => {
						if (err) {
							return callback(err);
						}
						this.hooks.afterOptimizeAssets.call(this.assets);
						if (this.hooks.needAdditionalSeal.call()) {
							this.unseal();
							return this.seal(callback);
						}
						return this.hooks.afterSeal.callAsync(callback);
					});
				});
			});
		});
	}

	/**
	 * @param {Module[]} modules the modules array on compilation to perform the sort for
	 * @returns {void}
	 */
	sortModules(modules) {
		// TODO webpack 5: this should only be enabled when `moduleIds: "natural"`
		// TODO move it into a plugin (NaturalModuleIdsPlugin) and use this in WebpackOptionsApply
		// TODO remove this method
		modules.sort(byIndexOrIdentifier);
	}

	/**
	 * @param {Module} module moulde to report from
	 * @param {DependenciesBlock[]} blocks blocks to report from
	 * @returns {void}
	 */
	reportDependencyErrorsAndWarnings(module, blocks) {
		for (let indexBlock = 0; indexBlock < blocks.length; indexBlock++) {
			const block = blocks[indexBlock];
			const dependencies = block.dependencies;

			for (let indexDep = 0; indexDep < dependencies.length; indexDep++) {
				const d = dependencies[indexDep];

				const warnings = d.getWarnings();
				if (warnings) {
					for (let indexWar = 0; indexWar < warnings.length; indexWar++) {
						const w = warnings[indexWar];

						const warning = new ModuleDependencyWarning(module, w, d.loc);
						this.warnings.push(warning);
					}
				}
				const errors = d.getErrors();
				if (errors) {
					for (let indexErr = 0; indexErr < errors.length; indexErr++) {
						const e = errors[indexErr];

						const error = new ModuleDependencyError(module, e, d.loc);
						this.errors.push(error);
					}
				}
			}

			this.reportDependencyErrorsAndWarnings(module, block.blocks);
		}
	}

	/**
	 * @param {TODO} groupOptions options for the chunk group
	 * @param {Module} module the module the references the chunk group
	 * @param {DependencyLocation} loc the location from with the chunk group is referenced (inside of module)
	 * @param {string} request the request from which the the chunk group is referenced
	 * @returns {ChunkGroup} the new or existing chunk group
	 */
	addChunkInGroup(groupOptions, module, loc, request) {
		if (typeof groupOptions === "string") {
			groupOptions = { name: groupOptions };
		}
		const name = groupOptions.name;
		if (name) {
			const chunkGroup = this.namedChunkGroups.get(name);
			if (chunkGroup !== undefined) {
				chunkGroup.addOptions(groupOptions);
				if (module) {
					chunkGroup.addOrigin(module, loc, request);
				}
				return chunkGroup;
			}
		}
		const chunkGroup = new ChunkGroup(groupOptions);
		if (module) chunkGroup.addOrigin(module, loc, request);
		const chunk = this.addChunk(name);

		GraphHelpers.connectChunkGroupAndChunk(chunkGroup, chunk);

		this.chunkGroups.push(chunkGroup);
		if (name) {
			this.namedChunkGroups.set(name, chunkGroup);
		}
		return chunkGroup;
	}

	/**
	 * This method first looks to see if a name is provided for a new chunk,
	 * and first looks to see if any named chunks already exist and reuse that chunk instead.
	 *
	 * @param {string=} name optional chunk name to be provided
	 * @returns {Chunk} create a chunk (invoked during seal event)
	 */
	addChunk(name) {
		if (name) {
			const chunk = this.namedChunks.get(name);
			if (chunk !== undefined) {
				return chunk;
			}
		}
		const chunk = new Chunk(name);
		this.chunks.push(chunk);
		if (name) {
			this.namedChunks.set(name, chunk);
		}
		return chunk;
	}

	/**
	 * @param {Module} module module to assign depth
	 * @returns {void}
	 */
	assignDepth(module) {
		const queue = new Set([module]);
		let depth;

		module.depth = 0;

		/**
		 * @param {Module} module module for processeing
		 * @returns {void}
		 */
		const enqueueJob = module => {
			const d = module.depth;
			if (typeof d === "number" && d <= depth) return;
			queue.add(module);
			module.depth = depth;
		};

		/**
		 * @param {Dependency} dependency dependency to assign depth to
		 * @returns {void}
		 */
		const assignDepthToDependency = dependency => {
			if (dependency.module) {
				enqueueJob(dependency.module);
			}
		};

		/**
		 * @param {DependenciesBlock} block block to assign depth to
		 * @returns {void}
		 */
		const assignDepthToDependencyBlock = block => {
			if (block.variables) {
				iterationBlockVariable(block.variables, assignDepthToDependency);
			}

			if (block.dependencies) {
				iterationOfArrayCallback(block.dependencies, assignDepthToDependency);
			}

			if (block.blocks) {
				iterationOfArrayCallback(block.blocks, assignDepthToDependencyBlock);
			}
		};

		for (module of queue) {
			queue.delete(module);
			depth = module.depth;

			depth++;
			assignDepthToDependencyBlock(module);
		}
	}

	/**
	 * @param {Module} module the module containing the dependency
	 * @param {Dependency} dependency the dependency
	 * @returns {DependencyReference} a reference for the dependency
	 */
	getDependencyReference(module, dependency) {
		// TODO remove dep.getReference existence check in webpack 5
		if (typeof dependency.getReference !== "function") return null;
		const ref = dependency.getReference();
		if (!ref) return null;
		return this.hooks.dependencyReference.call(ref, dependency, module);
	}

	/**
	 * This method creates the Chunk graph from the Module graph
	 * @private
	 * @param {TODO[]} inputChunkGroups chunk groups which are processed
	 * @returns {void}
	 */
	processDependenciesBlocksForChunkGroups(inputChunkGroups) {
		// Process is splitting into two parts:
		// Part one traverse the module graph and builds a very basic chunks graph
		//   in chunkDependencies.
		// Part two traverse every possible way through the basic chunk graph and
		//   tracks the available modules. While traversing it connects chunks with
		//   eachother and Blocks with Chunks. It stops traversing when all modules
		//   for a chunk are already available. So it doesn't connect unneeded chunks.

		/** @type {Map<ChunkGroup, {block: AsyncDependenciesBlock, chunkGroup: ChunkGroup, couldBeFiltered: boolean}[]>} */
		const chunkDependencies = new Map();
		const allCreatedChunkGroups = new Set();

		// PREPARE
		/** @type {Map<DependenciesBlock, { modules: Module[], blocks: AsyncDependenciesBlock[]}>} */
		const blockInfoMap = new Map();

		/**
		 * @param {Dependency} d dependency to iterate over
		 * @returns {void}
		 */
		const iteratorDependency = d => {
			// We skip Dependencies without Reference
			const ref = this.getDependencyReference(currentModule, d);
			if (!ref) {
				return;
			}
			// We skip Dependencies without Module pointer
			const refModule = ref.module;
			if (!refModule) {
				return;
			}
			// We skip weak Dependencies
			if (ref.weak) {
				return;
			}

			blockInfoModules.add(refModule);
		};

		/**
		 * @param {AsyncDependenciesBlock} b blocks to prepare
		 * @returns {void}
		 */
		const iteratorBlockPrepare = b => {
			blockInfoBlocks.push(b);
			blockQueue.push(b);
		};

		/** @type {Module} */
		let currentModule;
		/** @type {DependenciesBlock} */
		let block;
		/** @type {DependenciesBlock[]} */
		let blockQueue;
		/** @type {Set<Module>} */
		let blockInfoModules;
		/** @type {AsyncDependenciesBlock[]} */
		let blockInfoBlocks;

		for (const module of this.modules) {
			blockQueue = [module];
			currentModule = module;
			while (blockQueue.length > 0) {
				block = blockQueue.pop();
				blockInfoModules = new Set();
				blockInfoBlocks = [];

				if (block.variables) {
					iterationBlockVariable(block.variables, iteratorDependency);
				}

				if (block.dependencies) {
					iterationOfArrayCallback(block.dependencies, iteratorDependency);
				}

				if (block.blocks) {
					iterationOfArrayCallback(block.blocks, iteratorBlockPrepare);
				}

				const blockInfo = {
					modules: Array.from(blockInfoModules),
					blocks: blockInfoBlocks
				};
				blockInfoMap.set(block, blockInfo);
			}
		}

		// PART ONE

		/** @type {Map<ChunkGroup, { index: number, index2: number }>} */
		const chunkGroupCounters = new Map();
		for (const chunkGroup of inputChunkGroups) {
			chunkGroupCounters.set(chunkGroup, { index: 0, index2: 0 });
		}

		let nextFreeModuleIndex = 0;
		let nextFreeModuleIndex2 = 0;

		/** @type {Map<DependenciesBlock, ChunkGroup>} */
		const blockChunkGroups = new Map();

		/** @type {Set<DependenciesBlock>} */
		const blocksWithNestedBlocks = new Set();

		const ADD_AND_ENTER_MODULE = 0;
		const ENTER_MODULE = 1;
		const PROCESS_BLOCK = 2;
		const LEAVE_MODULE = 3;

		/**
		 * @typedef {Object} QueueItem
		 * @property {number} action
		 * @property {DependenciesBlock} block
		 * @property {Module} module
		 * @property {Chunk} chunk
		 * @property {ChunkGroup} chunkGroup
		 */

		/**
		 * @param {ChunkGroup} chunkGroup chunk group
		 * @returns {QueueItem} queue item
		 */
		const chunkGroupToQueueItem = chunkGroup => ({
			action: ENTER_MODULE,
			block: chunkGroup.chunks[0].entryModule,
			module: chunkGroup.chunks[0].entryModule,
			chunk: chunkGroup.chunks[0],
			chunkGroup
		});

		// Start with the provided modules/chunks
		/** @type {QueueItem[]} */
		let queue = inputChunkGroups.map(chunkGroupToQueueItem).reverse();
		/** @type {QueueItem[]} */
		let queueDelayed = [];

		/** @type {Module} */
		let module;
		/** @type {Chunk} */
		let chunk;
		/** @type {ChunkGroup} */
		let chunkGroup;

		// For each async Block in graph
		/**
		 * @param {AsyncDependenciesBlock} b iterating over each Async DepBlock
		 * @returns {void}
		 */
		const iteratorBlock = b => {
			// 1. We create a chunk for this Block
			// but only once (blockChunkGroups map)
			let c = blockChunkGroups.get(b);
			if (c === undefined) {
				c = this.namedChunkGroups.get(b.chunkName);
				if (c && c.isInitial()) {
					this.errors.push(
						new AsyncDependencyToInitialChunkError(b.chunkName, module, b.loc)
					);
					c = chunkGroup;
				} else {
					c = this.addChunkInGroup(
						b.groupOptions || b.chunkName,
						module,
						b.loc,
						b.request
					);
					chunkGroupCounters.set(c, { index: 0, index2: 0 });
					blockChunkGroups.set(b, c);
					allCreatedChunkGroups.add(c);
				}
			} else {
				// TODO webpack 5 remove addOptions check
				if (c.addOptions) c.addOptions(b.groupOptions);
				c.addOrigin(module, b.loc, b.request);
			}

			// 2. We store the Block+Chunk mapping as dependency for the chunk
			let deps = chunkDependencies.get(chunkGroup);
			if (!deps) chunkDependencies.set(chunkGroup, (deps = []));
			deps.push({
				block: b,
				chunkGroup: c,
				couldBeFiltered: true
			});

			// 3. We enqueue the DependenciesBlock for traversal
			queueDelayed.push({
				action: PROCESS_BLOCK,
				block: b,
				module: module,
				chunk: c.chunks[0],
				chunkGroup: c
			});
		};

		// Iterative traversal of the Module graph
		// Recursive would be simpler to write but could result in Stack Overflows
		while (queue.length) {
			while (queue.length) {
				const queueItem = queue.pop();
				module = queueItem.module;
				block = queueItem.block;
				chunk = queueItem.chunk;
				chunkGroup = queueItem.chunkGroup;

				switch (queueItem.action) {
					case ADD_AND_ENTER_MODULE: {
						// We connect Module and Chunk when not already done
						if (chunk.addModule(module)) {
							module.addChunk(chunk);
						} else {
							// already connected, skip it
							break;
						}
					}
					// fallthrough
					case ENTER_MODULE: {
						if (chunkGroup !== undefined) {
							const index = chunkGroup.getModuleIndex(module);
							if (index === undefined) {
								chunkGroup.setModuleIndex(
									module,
									chunkGroupCounters.get(chunkGroup).index++
								);
							}
						}

						if (module.index === null) {
							module.index = nextFreeModuleIndex++;
						}

						queue.push({
							action: LEAVE_MODULE,
							block,
							module,
							chunk,
							chunkGroup
						});
					}
					// fallthrough
					case PROCESS_BLOCK: {
						// get prepared block info
						const blockInfo = blockInfoMap.get(block);

						// Traverse all referenced modules
						for (let i = blockInfo.modules.length - 1; i >= 0; i--) {
							const refModule = blockInfo.modules[i];
							if (chunk.containsModule(refModule)) {
								// skip early if already connected
								continue;
							}
							// enqueue the add and enter to enter in the correct order
							// this is relevant with circular dependencies
							queue.push({
								action: ADD_AND_ENTER_MODULE,
								block: refModule,
								module: refModule,
								chunk,
								chunkGroup
							});
						}

						// Traverse all Blocks
						iterationOfArrayCallback(blockInfo.blocks, iteratorBlock);

						if (blockInfo.blocks.length > 0 && module !== block) {
							blocksWithNestedBlocks.add(block);
						}
						break;
					}
					case LEAVE_MODULE: {
						if (chunkGroup !== undefined) {
							const index = chunkGroup.getModuleIndex2(module);
							if (index === undefined) {
								chunkGroup.setModuleIndex2(
									module,
									chunkGroupCounters.get(chunkGroup).index2++
								);
							}
						}

						if (module.index2 === null) {
							module.index2 = nextFreeModuleIndex2++;
						}
						break;
					}
				}
			}
			const tempQueue = queue;
			queue = queueDelayed.reverse();
			queueDelayed = tempQueue;
		}

		// PART TWO
		/** @type {Set<Module>} */
		let newAvailableModules;

		/**
		 * @typedef {Object} ChunkGroupInfo
		 * @property {Set<Module>} minAvailableModules current minimal set of modules available at this point
		 * @property {Set<Module>[]} availableModulesToBeMerged enqueued updates to the minimal set of available modules
		 */

		/** @type {Map<ChunkGroup, ChunkGroupInfo>} */
		const chunkGroupInfoMap = new Map();

		/** @type {Queue<ChunkGroup>} */
		const queue2 = new Queue(inputChunkGroups);

		for (const chunkGroup of inputChunkGroups) {
			chunkGroupInfoMap.set(chunkGroup, {
				minAvailableModules: undefined,
				availableModulesToBeMerged: [new Set()]
			});
		}

		/**
		 * Helper function to check if all modules of a chunk are available
		 *
		 * @param {ChunkGroup} chunkGroup the chunkGroup to scan
		 * @param {Set<Module>} availableModules the comparitor set
		 * @returns {boolean} return true if all modules of a chunk are available
		 */
		const areModulesAvailable = (chunkGroup, availableModules) => {
			for (const chunk of chunkGroup.chunks) {
				for (const module of chunk.modulesIterable) {
					if (!availableModules.has(module)) return false;
				}
			}
			return true;
		};

		// For each edge in the basic chunk graph
		/**
		 * @param {TODO} dep the dependency used for filtering
		 * @returns {boolean} used to filter "edges" (aka Dependencies) that were pointing
		 * to modules that are already available. Also filters circular dependencies in the chunks graph
		 */
		const filterFn = dep => {
			const depChunkGroup = dep.chunkGroup;
			if (!dep.couldBeFiltered) return true;
			if (blocksWithNestedBlocks.has(dep.block)) return true;
			if (areModulesAvailable(depChunkGroup, newAvailableModules)) {
				return false; // break all modules are already available
			}
			dep.couldBeFiltered = false;
			return true;
		};

		// Iterative traversing of the basic chunk graph
		while (queue2.length) {
			chunkGroup = queue2.dequeue();
			const info = chunkGroupInfoMap.get(chunkGroup);
			const availableModulesToBeMerged = info.availableModulesToBeMerged;
			let minAvailableModules = info.minAvailableModules;

			// 1. Get minimal available modules
			// It doesn't make sense to traverse a chunk again with more available modules.
			// This step calculates the minimal available modules and skips traversal when
			// the list didn't shrink.
			availableModulesToBeMerged.sort(bySetSize);
			let changed = false;
			for (const availableModules of availableModulesToBeMerged) {
				if (minAvailableModules === undefined) {
					minAvailableModules = new Set(availableModules);
					info.minAvailableModules = minAvailableModules;
					changed = true;
				} else {
					for (const m of minAvailableModules) {
						if (!availableModules.has(m)) {
							minAvailableModules.delete(m);
							changed = true;
						}
					}
				}
			}
			availableModulesToBeMerged.length = 0;
			if (!changed) continue;

			// 2. Get the edges at this point of the graph
			const deps = chunkDependencies.get(chunkGroup);
			if (!deps) continue;
			if (deps.length === 0) continue;

			// 3. Create a new Set of available modules at this points
			newAvailableModules = new Set(minAvailableModules);
			for (const chunk of chunkGroup.chunks) {
				for (const m of chunk.modulesIterable) {
					newAvailableModules.add(m);
				}
			}

			// 4. Foreach remaining edge
			const nextChunkGroups = new Set();
			for (let i = 0; i < deps.length; i++) {
				const dep = deps[i];

				// Filter inline, rather than creating a new array from `.filter()`
				if (!filterFn(dep)) {
					continue;
				}
				const depChunkGroup = dep.chunkGroup;
				const depBlock = dep.block;

				// 5. Connect block with chunk
				GraphHelpers.connectDependenciesBlockAndChunkGroup(
					depBlock,
					depChunkGroup
				);

				// 6. Connect chunk with parent
				GraphHelpers.connectChunkGroupParentAndChild(chunkGroup, depChunkGroup);

				nextChunkGroups.add(depChunkGroup);
			}

			// 7. Enqueue further traversal
			for (const nextChunkGroup of nextChunkGroups) {
				let nextInfo = chunkGroupInfoMap.get(nextChunkGroup);
				if (nextInfo === undefined) {
					nextInfo = {
						minAvailableModules: undefined,
						availableModulesToBeMerged: []
					};
					chunkGroupInfoMap.set(nextChunkGroup, nextInfo);
				}
				nextInfo.availableModulesToBeMerged.push(newAvailableModules);

				// As queue deduplicates enqueued items this makes sure that a ChunkGroup
				// is not enqueued twice
				queue2.enqueue(nextChunkGroup);
			}
		}

		// Remove all unconnected chunk groups
		for (const chunkGroup of allCreatedChunkGroups) {
			if (chunkGroup.getNumberOfParents() === 0) {
				for (const chunk of chunkGroup.chunks) {
					const idx = this.chunks.indexOf(chunk);
					if (idx >= 0) this.chunks.splice(idx, 1);
					chunk.remove("unconnected");
				}
				chunkGroup.remove("unconnected");
			}
		}
	}

	/**
	 *
	 * @param {Module} module module relationship for removal
	 * @param {DependenciesBlockLike} block //TODO: good description
	 * @returns {void}
	 */
	removeReasonsOfDependencyBlock(module, block) {
		const iteratorDependency = d => {
			if (!d.module) {
				return;
			}
			if (d.module.removeReason(module, d)) {
				for (const chunk of d.module.chunksIterable) {
					this.patchChunksAfterReasonRemoval(d.module, chunk);
				}
			}
		};

		if (block.blocks) {
			iterationOfArrayCallback(block.blocks, block =>
				this.removeReasonsOfDependencyBlock(module, block)
			);
		}

		if (block.dependencies) {
			iterationOfArrayCallback(block.dependencies, iteratorDependency);
		}

		if (block.variables) {
			iterationBlockVariable(block.variables, iteratorDependency);
		}
	}

	/**
	 * @param {Module} module module to patch tie
	 * @param {Chunk} chunk chunk to patch tie
	 * @returns {void}
	 */
	patchChunksAfterReasonRemoval(module, chunk) {
		if (!module.hasReasons()) {
			this.removeReasonsOfDependencyBlock(module, module);
		}
		if (!module.hasReasonForChunk(chunk)) {
			if (module.removeChunk(chunk)) {
				this.removeChunkFromDependencies(module, chunk);
			}
		}
	}

	/**
	 *
	 * @param {DependenciesBlock} block block tie for Chunk
	 * @param {Chunk} chunk chunk to remove from dep
	 * @returns {void}
	 */
	removeChunkFromDependencies(block, chunk) {
		const iteratorDependency = d => {
			if (!d.module) {
				return;
			}
			this.patchChunksAfterReasonRemoval(d.module, chunk);
		};

		const blocks = block.blocks;
		for (let indexBlock = 0; indexBlock < blocks.length; indexBlock++) {
			const asyncBlock = blocks[indexBlock];
			// Grab all chunks from the first Block's AsyncDepBlock
			const chunks = asyncBlock.chunkGroup.chunks;
			// For each chunk in chunkGroup
			for (let indexChunk = 0; indexChunk < chunks.length; indexChunk++) {
				const iteratedChunk = chunks[indexChunk];
				asyncBlock.chunkGroup.removeChunk(iteratedChunk);
				asyncBlock.chunkGroup.removeParent(iteratedChunk);
				// Recurse
				this.removeChunkFromDependencies(block, iteratedChunk);
			}
		}

		if (block.dependencies) {
			iterationOfArrayCallback(block.dependencies, iteratorDependency);
		}

		if (block.variables) {
			iterationBlockVariable(block.variables, iteratorDependency);
		}
	}

	applyModuleIds() {
		const unusedIds = [];
		let nextFreeModuleId = 0;
		const usedIds = new Set();
		if (this.usedModuleIds) {
			for (const id of this.usedModuleIds) {
				usedIds.add(id);
			}
		}

		const modules1 = this.modules;
		for (let indexModule1 = 0; indexModule1 < modules1.length; indexModule1++) {
			const module1 = modules1[indexModule1];
			if (module1.id !== null) {
				usedIds.add(module1.id);
			}
		}

		if (usedIds.size > 0) {
			let usedIdMax = -1;
			for (const usedIdKey of usedIds) {
				if (typeof usedIdKey !== "number") {
					continue;
				}

				usedIdMax = Math.max(usedIdMax, usedIdKey);
			}

			let lengthFreeModules = (nextFreeModuleId = usedIdMax + 1);

			while (lengthFreeModules--) {
				if (!usedIds.has(lengthFreeModules)) {
					unusedIds.push(lengthFreeModules);
				}
			}
		}

		const modules2 = this.modules;
		for (let indexModule2 = 0; indexModule2 < modules2.length; indexModule2++) {
			const module2 = modules2[indexModule2];
			if (module2.id === null) {
				if (unusedIds.length > 0) {
					module2.id = unusedIds.pop();
				} else {
					module2.id = nextFreeModuleId++;
				}
			}
		}
	}

	applyChunkIds() {
		/** @type {Set<number>} */
		const usedIds = new Set();

		// Get used ids from usedChunkIds property (i. e. from records)
		if (this.usedChunkIds) {
			for (const id of this.usedChunkIds) {
				if (typeof id !== "number") {
					continue;
				}

				usedIds.add(id);
			}
		}

		// Get used ids from existing chunks
		const chunks = this.chunks;
		for (let indexChunk = 0; indexChunk < chunks.length; indexChunk++) {
			const chunk = chunks[indexChunk];
			const usedIdValue = chunk.id;

			if (typeof usedIdValue !== "number") {
				continue;
			}

			usedIds.add(usedIdValue);
		}

		// Calculate maximum assigned chunk id
		let nextFreeChunkId = -1;
		for (const id of usedIds) {
			nextFreeChunkId = Math.max(nextFreeChunkId, id);
		}
		nextFreeChunkId++;

		// Determine free chunk ids from 0 to maximum
		/** @type {number[]} */
		const unusedIds = [];
		if (nextFreeChunkId > 0) {
			let index = nextFreeChunkId;
			while (index--) {
				if (!usedIds.has(index)) {
					unusedIds.push(index);
				}
			}
		}

		// Assign ids to chunk which has no id
		for (let indexChunk = 0; indexChunk < chunks.length; indexChunk++) {
			const chunk = chunks[indexChunk];
			if (chunk.id === null) {
				if (unusedIds.length > 0) {
					chunk.id = unusedIds.pop();
				} else {
					chunk.id = nextFreeChunkId++;
				}
			}
			if (!chunk.ids) {
				chunk.ids = [chunk.id];
			}
		}
	}

	sortItemsWithModuleIds() {
		this.modules.sort(byIdOrIdentifier);

		const modules = this.modules;
		for (let indexModule = 0; indexModule < modules.length; indexModule++) {
			modules[indexModule].sortItems(false);
		}

		const chunks = this.chunks;
		for (let indexChunk = 0; indexChunk < chunks.length; indexChunk++) {
			chunks[indexChunk].sortItems();
		}

		chunks.sort((a, b) => a.compareTo(b));
	}

	sortItemsWithChunkIds() {
		for (const chunkGroup of this.chunkGroups) {
			chunkGroup.sortItems();
		}

		this.chunks.sort(byId);

		for (
			let indexModule = 0;
			indexModule < this.modules.length;
			indexModule++
		) {
			this.modules[indexModule].sortItems(true);
		}

		const chunks = this.chunks;
		for (let indexChunk = 0; indexChunk < chunks.length; indexChunk++) {
			chunks[indexChunk].sortItems();
		}

		/**
		 * Used to sort errors and warnings in compilation. this.warnings, and
		 * this.errors contribute to the compilation hash and therefore should be
		 * updated whenever other references (having a chunk id) are sorted. This preserves the hash
		 * integrity
		 *
		 * @param {WebpackError} a first WebpackError instance (including subclasses)
		 * @param {WebpackError} b second WebpackError instance (including subclasses)
		 * @returns {-1|0|1} sort order index
		 */
		const byMessage = (a, b) => {
			const ma = `${a.message}`;
			const mb = `${b.message}`;
			if (ma < mb) return -1;
			if (mb < ma) return 1;
			return 0;
		};

		this.errors.sort(byMessage);
		this.warnings.sort(byMessage);
		this.children.sort(byNameOrHash);
	}

	summarizeDependencies() {
		this.fileDependencies = new SortableSet(this.compilationDependencies);
		this.contextDependencies = new SortableSet();
		this.missingDependencies = new SortableSet();

		for (
			let indexChildren = 0;
			indexChildren < this.children.length;
			indexChildren++
		) {
			const child = this.children[indexChildren];

			addAllToSet(this.fileDependencies, child.fileDependencies);
			addAllToSet(this.contextDependencies, child.contextDependencies);
			addAllToSet(this.missingDependencies, child.missingDependencies);
		}

		for (
			let indexModule = 0;
			indexModule < this.modules.length;
			indexModule++
		) {
			const module = this.modules[indexModule];

			if (module.buildInfo.fileDependencies) {
				addAllToSet(this.fileDependencies, module.buildInfo.fileDependencies);
			}
			if (module.buildInfo.contextDependencies) {
				addAllToSet(
					this.contextDependencies,
					module.buildInfo.contextDependencies
				);
			}
		}
		for (const error of this.errors) {
			if (
				typeof error.missing === "object" &&
				error.missing &&
				error.missing[Symbol.iterator]
			) {
				addAllToSet(this.missingDependencies, error.missing);
			}
		}
		this.fileDependencies.sort();
		this.contextDependencies.sort();
		this.missingDependencies.sort();
	}

	createHash() {
		const outputOptions = this.outputOptions;
		const hashFunction = outputOptions.hashFunction;
		const hashDigest = outputOptions.hashDigest;
		const hashDigestLength = outputOptions.hashDigestLength;
		const hash = createHash(hashFunction);
		if (outputOptions.hashSalt) {
			hash.update(outputOptions.hashSalt);
		}
		this.mainTemplate.updateHash(hash);
		this.chunkTemplate.updateHash(hash);
		for (const key of Object.keys(this.moduleTemplates).sort()) {
			this.moduleTemplates[key].updateHash(hash);
		}
		for (const child of this.children) {
			hash.update(child.hash);
		}
		for (const warning of this.warnings) {
			hash.update(`${warning.message}`);
		}
		for (const error of this.errors) {
			hash.update(`${error.message}`);
		}
		const modules = this.modules;
		for (let i = 0; i < modules.length; i++) {
			const module = modules[i];
			const moduleHash = createHash(hashFunction);
			module.updateHash(moduleHash);
			module.hash = moduleHash.digest(hashDigest);
			module.renderedHash = module.hash.substr(0, hashDigestLength);
		}
		// clone needed as sort below is inplace mutation
		const chunks = this.chunks.slice();
		/**
		 * sort here will bring all "falsy" values to the beginning
		 * this is needed as the "hasRuntime()" chunks are dependent on the
		 * hashes of the non-runtime chunks.
		 */
		chunks.sort((a, b) => {
			const aEntry = a.hasRuntime();
			const bEntry = b.hasRuntime();
			if (aEntry && !bEntry) return 1;
			if (!aEntry && bEntry) return -1;
			return byId(a, b);
		});
		for (let i = 0; i < chunks.length; i++) {
			const chunk = chunks[i];
			const chunkHash = createHash(hashFunction);
			try {
				if (outputOptions.hashSalt) {
					chunkHash.update(outputOptions.hashSalt);
				}
				chunk.updateHash(chunkHash);
				const template = chunk.hasRuntime()
					? this.mainTemplate
					: this.chunkTemplate;
				template.updateHashForChunk(
					chunkHash,
					chunk,
					this.moduleTemplates.javascript,
					this.dependencyTemplates
				);
				this.hooks.chunkHash.call(chunk, chunkHash);
				chunk.hash = chunkHash.digest(hashDigest);
				hash.update(chunk.hash);
				chunk.renderedHash = chunk.hash.substr(0, hashDigestLength);
				this.hooks.contentHash.call(chunk);
			} catch (err) {
				this.errors.push(new ChunkRenderError(chunk, "", err));
			}
		}
		this.fullHash = hash.digest(hashDigest);
		this.hash = this.fullHash.substr(0, hashDigestLength);
	}

	/**
	 * @param {string} update extra information
	 * @returns {void}
	 */
	modifyHash(update) {
		const outputOptions = this.outputOptions;
		const hashFunction = outputOptions.hashFunction;
		const hashDigest = outputOptions.hashDigest;
		const hashDigestLength = outputOptions.hashDigestLength;
		const hash = createHash(hashFunction);
		hash.update(this.fullHash);
		hash.update(update);
		this.fullHash = hash.digest(hashDigest);
		this.hash = this.fullHash.substr(0, hashDigestLength);
	}

	createModuleAssets() {
		for (let i = 0; i < this.modules.length; i++) {
			const module = this.modules[i];
			if (module.buildInfo.assets) {
				for (const assetName of Object.keys(module.buildInfo.assets)) {
					const fileName = this.getPath(assetName);
					this.assets[fileName] = module.buildInfo.assets[assetName];
					this.hooks.moduleAsset.call(module, fileName);
				}
			}
		}
	}

	createChunkAssets() {
		const outputOptions = this.outputOptions;
		const cachedSourceMap = new Map();
		/** @type {Map<string, {hash: string, source: Source, chunk: Chunk}>} */
		const alreadyWrittenFiles = new Map();
		for (let i = 0; i < this.chunks.length; i++) {
			const chunk = this.chunks[i];
			chunk.files = [];
			let source;
			let file;
			let filenameTemplate;
			try {
				const template = chunk.hasRuntime()
					? this.mainTemplate
					: this.chunkTemplate;
				const manifest = template.getRenderManifest({
					chunk,
					hash: this.hash,
					fullHash: this.fullHash,
					outputOptions,
					moduleTemplates: this.moduleTemplates,
					dependencyTemplates: this.dependencyTemplates
				}); // [{ render(), filenameTemplate, pathOptions, identifier, hash }]
				for (const fileManifest of manifest) {
					const cacheName = fileManifest.identifier;
					const usedHash = fileManifest.hash;
					filenameTemplate = fileManifest.filenameTemplate;
					file = this.getPath(filenameTemplate, fileManifest.pathOptions);

					// check if the same filename was already written by another chunk
					const alreadyWritten = alreadyWrittenFiles.get(file);
					if (alreadyWritten !== undefined) {
						if (alreadyWritten.hash === usedHash) {
							if (this.cache) {
								this.cache[cacheName] = {
									hash: usedHash,
									source: alreadyWritten.source
								};
							}
							chunk.files.push(file);
							this.hooks.chunkAsset.call(chunk, file);
							continue;
						} else {
							throw new Error(
								`Conflict: Multiple chunks emit assets to the same filename ${file}` +
									` (chunks ${alreadyWritten.chunk.id} and ${chunk.id})`
							);
						}
					}
					if (
						this.cache &&
						this.cache[cacheName] &&
						this.cache[cacheName].hash === usedHash
					) {
						source = this.cache[cacheName].source;
					} else {
						source = fileManifest.render();
						// Ensure that source is a cached source to avoid additional cost because of repeated access
						if (!(source instanceof CachedSource)) {
							const cacheEntry = cachedSourceMap.get(source);
							if (cacheEntry) {
								source = cacheEntry;
							} else {
								const cachedSource = new CachedSource(source);
								cachedSourceMap.set(source, cachedSource);
								source = cachedSource;
							}
						}
						if (this.cache) {
							this.cache[cacheName] = {
								hash: usedHash,
								source
							};
						}
					}
					if (this.assets[file] && this.assets[file] !== source) {
						throw new Error(
							`Conflict: Multiple assets emit to the same filename ${file}`
						);
					}
					this.assets[file] = source;
					chunk.files.push(file);
					this.hooks.chunkAsset.call(chunk, file);
					alreadyWrittenFiles.set(file, {
						hash: usedHash,
						source,
						chunk
					});
				}
			} catch (err) {
				this.errors.push(
					new ChunkRenderError(chunk, file || filenameTemplate, err)
				);
			}
		}
	}

	/**
	 * @param {string} filename used to get asset path with hash
	 * @param {TODO=} data // TODO: figure out this param type
	 * @returns {string} interpolated path
	 */
	getPath(filename, data) {
		data = data || {};
		data.hash = data.hash || this.hash;
		return this.mainTemplate.getAssetPath(filename, data);
	}

	/**
	 * This function allows you to run another instance of webpack inside of webpack however as
	 * a child with different settings and configurations (if desired) applied. It copies all hooks, plugins
	 * from parent (or top level compiler) and creates a child Compilation
	 *
	 * @param {string} name name of the child compiler
	 * @param {TODO} outputOptions // Need to convert config schema to types for this
	 * @param {Plugin[]} plugins webpack plugins that will be applied
	 * @returns {Compiler} creates a child Compiler instance
	 */
	createChildCompiler(name, outputOptions, plugins) {
		const idx = this.childrenCounters[name] || 0;
		this.childrenCounters[name] = idx + 1;
		return this.compiler.createChildCompiler(
			this,
			name,
			idx,
			outputOptions,
			plugins
		);
	}

	checkConstraints() {
		/** @type {Set<number|string>} */
		const usedIds = new Set();

		const modules = this.modules;
		for (let indexModule = 0; indexModule < modules.length; indexModule++) {
			const moduleId = modules[indexModule].id;
			if (moduleId === null) continue;
			if (usedIds.has(moduleId)) {
				throw new Error(`checkConstraints: duplicate module id ${moduleId}`);
			}
			usedIds.add(moduleId);
		}

		const chunks = this.chunks;
		for (let indexChunk = 0; indexChunk < chunks.length; indexChunk++) {
			const chunk = chunks[indexChunk];
			if (chunks.indexOf(chunk) !== indexChunk) {
				throw new Error(
					`checkConstraints: duplicate chunk in compilation ${chunk.debugId}`
				);
			}
		}

		for (const chunkGroup of this.chunkGroups) {
			chunkGroup.checkConstraints();
		}
	}
}

// TODO remove in webpack 5
Compilation.prototype.applyPlugins = util.deprecate(
	/**
	 * @deprecated
	 * @param {string} name Name
	 * @param {any[]} args Other arguments
	 * @returns {void}
	 * @this {Compilation}
	 */
	function(name, ...args) {
		this.hooks[
			name.replace(/[- ]([a-z])/g, match => match[1].toUpperCase())
		].call(...args);
	},
	"Compilation.applyPlugins is deprecated. Use new API on `.hooks` instead"
);

// TODO remove in webpack 5
Object.defineProperty(Compilation.prototype, "moduleTemplate", {
	configurable: false,
	get: util.deprecate(
		/**
		 * @deprecated
		 * @this {Compilation}
		 * @returns {TODO} module template
		 */
		function() {
			return this.moduleTemplates.javascript;
		},
		"Compilation.moduleTemplate: Use Compilation.moduleTemplates.javascript instead"
	),
	set: util.deprecate(
		/**
		 * @deprecated
		 * @param {ModuleTemplate} value Template value
		 * @this {Compilation}
		 * @returns {void}
		 */
		function(value) {
			this.moduleTemplates.javascript = value;
		},
		"Compilation.moduleTemplate: Use Compilation.moduleTemplates.javascript instead."
	)
});

module.exports = Compilation;
