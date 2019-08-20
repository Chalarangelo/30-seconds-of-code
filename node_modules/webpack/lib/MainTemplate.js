/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const {
	ConcatSource,
	OriginalSource,
	PrefixSource,
	RawSource
} = require("webpack-sources");
const {
	Tapable,
	SyncWaterfallHook,
	SyncHook,
	SyncBailHook
} = require("tapable");
const Template = require("./Template");

/** @typedef {import("webpack-sources").ConcatSource} ConcatSource */
/** @typedef {import("webpack-sources").Source} Source */
/** @typedef {import("./ModuleTemplate")} ModuleTemplate */
/** @typedef {import("./Chunk")} Chunk */
/** @typedef {import("./Module")} Module} */
/** @typedef {import("./util/createHash").Hash} Hash} */
/** @typedef {import("./Dependency").DependencyTemplate} DependencyTemplate} */

/**
 * @typedef {Object} RenderManifestOptions
 * @property {Chunk} chunk the chunk used to render
 * @property {string} hash
 * @property {string} fullHash
 * @property {TODO} outputOptions
 * @property {{javascript: ModuleTemplate, webassembly: ModuleTemplate}} moduleTemplates
 * @property {Map<TODO, TODO>} dependencyTemplates
 */

// require function shortcuts:
// __webpack_require__.s = the module id of the entry point
// __webpack_require__.c = the module cache
// __webpack_require__.m = the module functions
// __webpack_require__.p = the bundle public path
// __webpack_require__.i = the identity function used for harmony imports
// __webpack_require__.e = the chunk ensure function
// __webpack_require__.d = the exported property define getter function
// __webpack_require__.o = Object.prototype.hasOwnProperty.call
// __webpack_require__.r = define compatibility on export
// __webpack_require__.t = create a fake namespace object
// __webpack_require__.n = compatibility get default export
// __webpack_require__.h = the webpack hash
// __webpack_require__.w = an object containing all installed WebAssembly.Instance export objects keyed by module id
// __webpack_require__.oe = the uncaught error handler for the webpack runtime
// __webpack_require__.nc = the script nonce

module.exports = class MainTemplate extends Tapable {
	/**
	 *
	 * @param {TODO=} outputOptions output options for the MainTemplate
	 */
	constructor(outputOptions) {
		super();
		/** @type {TODO?} */
		this.outputOptions = outputOptions || {};
		this.hooks = {
			/** @type {SyncWaterfallHook<TODO[], RenderManifestOptions>} */
			renderManifest: new SyncWaterfallHook(["result", "options"]),
			modules: new SyncWaterfallHook([
				"modules",
				"chunk",
				"hash",
				"moduleTemplate",
				"dependencyTemplates"
			]),
			moduleObj: new SyncWaterfallHook([
				"source",
				"chunk",
				"hash",
				"moduleIdExpression"
			]),
			requireEnsure: new SyncWaterfallHook([
				"source",
				"chunk",
				"hash",
				"chunkIdExpression"
			]),
			bootstrap: new SyncWaterfallHook([
				"source",
				"chunk",
				"hash",
				"moduleTemplate",
				"dependencyTemplates"
			]),
			localVars: new SyncWaterfallHook(["source", "chunk", "hash"]),
			require: new SyncWaterfallHook(["source", "chunk", "hash"]),
			requireExtensions: new SyncWaterfallHook(["source", "chunk", "hash"]),
			/** @type {SyncWaterfallHook<string, Chunk, string>} */
			beforeStartup: new SyncWaterfallHook(["source", "chunk", "hash"]),
			/** @type {SyncWaterfallHook<string, Chunk, string>} */
			startup: new SyncWaterfallHook(["source", "chunk", "hash"]),
			render: new SyncWaterfallHook([
				"source",
				"chunk",
				"hash",
				"moduleTemplate",
				"dependencyTemplates"
			]),
			renderWithEntry: new SyncWaterfallHook(["source", "chunk", "hash"]),
			moduleRequire: new SyncWaterfallHook([
				"source",
				"chunk",
				"hash",
				"moduleIdExpression"
			]),
			addModule: new SyncWaterfallHook([
				"source",
				"chunk",
				"hash",
				"moduleIdExpression",
				"moduleExpression"
			]),
			currentHash: new SyncWaterfallHook(["source", "requestedLength"]),
			assetPath: new SyncWaterfallHook(["path", "options"]),
			hash: new SyncHook(["hash"]),
			hashForChunk: new SyncHook(["hash", "chunk"]),
			globalHashPaths: new SyncWaterfallHook(["paths"]),
			globalHash: new SyncBailHook(["chunk", "paths"]),

			// TODO this should be moved somewhere else
			// It's weird here
			hotBootstrap: new SyncWaterfallHook(["source", "chunk", "hash"])
		};
		this.hooks.startup.tap("MainTemplate", (source, chunk, hash) => {
			/** @type {string[]} */
			const buf = [];
			if (chunk.entryModule) {
				buf.push("// Load entry module and return exports");
				buf.push(
					`return ${this.renderRequireFunctionForModule(
						hash,
						chunk,
						JSON.stringify(chunk.entryModule.id)
					)}(${this.requireFn}.s = ${JSON.stringify(chunk.entryModule.id)});`
				);
			}
			return Template.asString(buf);
		});
		this.hooks.render.tap(
			"MainTemplate",
			(bootstrapSource, chunk, hash, moduleTemplate, dependencyTemplates) => {
				const source = new ConcatSource();
				source.add("/******/ (function(modules) { // webpackBootstrap\n");
				source.add(new PrefixSource("/******/", bootstrapSource));
				source.add("/******/ })\n");
				source.add(
					"/************************************************************************/\n"
				);
				source.add("/******/ (");
				source.add(
					this.hooks.modules.call(
						new RawSource(""),
						chunk,
						hash,
						moduleTemplate,
						dependencyTemplates
					)
				);
				source.add(")");
				return source;
			}
		);
		this.hooks.localVars.tap("MainTemplate", (source, chunk, hash) => {
			return Template.asString([
				source,
				"// The module cache",
				"var installedModules = {};"
			]);
		});
		this.hooks.require.tap("MainTemplate", (source, chunk, hash) => {
			return Template.asString([
				source,
				"// Check if module is in cache",
				"if(installedModules[moduleId]) {",
				Template.indent("return installedModules[moduleId].exports;"),
				"}",
				"// Create a new module (and put it into the cache)",
				"var module = installedModules[moduleId] = {",
				Template.indent(this.hooks.moduleObj.call("", chunk, hash, "moduleId")),
				"};",
				"",
				Template.asString(
					outputOptions.strictModuleExceptionHandling
						? [
								"// Execute the module function",
								"var threw = true;",
								"try {",
								Template.indent([
									`modules[moduleId].call(module.exports, module, module.exports, ${this.renderRequireFunctionForModule(
										hash,
										chunk,
										"moduleId"
									)});`,
									"threw = false;"
								]),
								"} finally {",
								Template.indent([
									"if(threw) delete installedModules[moduleId];"
								]),
								"}"
						  ]
						: [
								"// Execute the module function",
								`modules[moduleId].call(module.exports, module, module.exports, ${this.renderRequireFunctionForModule(
									hash,
									chunk,
									"moduleId"
								)});`
						  ]
				),
				"",
				"// Flag the module as loaded",
				"module.l = true;",
				"",
				"// Return the exports of the module",
				"return module.exports;"
			]);
		});
		this.hooks.moduleObj.tap(
			"MainTemplate",
			(source, chunk, hash, varModuleId) => {
				return Template.asString(["i: moduleId,", "l: false,", "exports: {}"]);
			}
		);
		this.hooks.requireExtensions.tap("MainTemplate", (source, chunk, hash) => {
			const buf = [];
			const chunkMaps = chunk.getChunkMaps();
			// Check if there are non initial chunks which need to be imported using require-ensure
			if (Object.keys(chunkMaps.hash).length) {
				buf.push("// This file contains only the entry chunk.");
				buf.push("// The chunk loading function for additional chunks");
				buf.push(`${this.requireFn}.e = function requireEnsure(chunkId) {`);
				buf.push(Template.indent("var promises = [];"));
				buf.push(
					Template.indent(
						this.hooks.requireEnsure.call("", chunk, hash, "chunkId")
					)
				);
				buf.push(Template.indent("return Promise.all(promises);"));
				buf.push("};");
			} else if (
				chunk.hasModuleInGraph(m =>
					m.blocks.some(b => b.chunkGroup && b.chunkGroup.chunks.length > 0)
				)
			) {
				// There async blocks in the graph, so we need to add an empty requireEnsure
				// function anyway. This can happen with multiple entrypoints.
				buf.push("// The chunk loading function for additional chunks");
				buf.push("// Since all referenced chunks are already included");
				buf.push("// in this file, this function is empty here.");
				buf.push(`${this.requireFn}.e = function requireEnsure() {`);
				buf.push(Template.indent("return Promise.resolve();"));
				buf.push("};");
			}
			buf.push("");
			buf.push("// expose the modules object (__webpack_modules__)");
			buf.push(`${this.requireFn}.m = modules;`);

			buf.push("");
			buf.push("// expose the module cache");
			buf.push(`${this.requireFn}.c = installedModules;`);

			buf.push("");
			buf.push("// define getter function for harmony exports");
			buf.push(`${this.requireFn}.d = function(exports, name, getter) {`);
			buf.push(
				Template.indent([
					`if(!${this.requireFn}.o(exports, name)) {`,
					Template.indent([
						"Object.defineProperty(exports, name, { enumerable: true, get: getter });"
					]),
					"}"
				])
			);
			buf.push("};");

			buf.push("");
			buf.push("// define __esModule on exports");
			buf.push(`${this.requireFn}.r = function(exports) {`);
			buf.push(
				Template.indent([
					"if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {",
					Template.indent([
						"Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });"
					]),
					"}",
					"Object.defineProperty(exports, '__esModule', { value: true });"
				])
			);
			buf.push("};");

			buf.push("");
			buf.push("// create a fake namespace object");
			buf.push("// mode & 1: value is a module id, require it");
			buf.push("// mode & 2: merge all properties of value into the ns");
			buf.push("// mode & 4: return value when already ns object");
			buf.push("// mode & 8|1: behave like require");
			buf.push(`${this.requireFn}.t = function(value, mode) {`);
			buf.push(
				Template.indent([
					`if(mode & 1) value = ${this.requireFn}(value);`,
					`if(mode & 8) return value;`,
					"if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;",
					"var ns = Object.create(null);",
					`${this.requireFn}.r(ns);`,
					"Object.defineProperty(ns, 'default', { enumerable: true, value: value });",
					"if(mode & 2 && typeof value != 'string') for(var key in value) " +
						`${this.requireFn}.d(ns, key, function(key) { ` +
						"return value[key]; " +
						"}.bind(null, key));",
					"return ns;"
				])
			);
			buf.push("};");

			buf.push("");
			buf.push(
				"// getDefaultExport function for compatibility with non-harmony modules"
			);
			buf.push(this.requireFn + ".n = function(module) {");
			buf.push(
				Template.indent([
					"var getter = module && module.__esModule ?",
					Template.indent([
						"function getDefault() { return module['default']; } :",
						"function getModuleExports() { return module; };"
					]),
					`${this.requireFn}.d(getter, 'a', getter);`,
					"return getter;"
				])
			);
			buf.push("};");

			buf.push("");
			buf.push("// Object.prototype.hasOwnProperty.call");
			buf.push(
				`${
					this.requireFn
				}.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };`
			);

			const publicPath = this.getPublicPath({
				hash: hash
			});
			buf.push("");
			buf.push("// __webpack_public_path__");
			buf.push(`${this.requireFn}.p = ${JSON.stringify(publicPath)};`);
			return Template.asString(buf);
		});

		this.requireFn = "__webpack_require__";
	}

	/**
	 *
	 * @param {RenderManifestOptions} options render manifest options
	 * @returns {TODO[]} returns render manifest
	 */
	getRenderManifest(options) {
		const result = [];

		this.hooks.renderManifest.call(result, options);

		return result;
	}

	/**
	 * TODO webpack 5: remove moduleTemplate and dependencyTemplates
	 * @param {string} hash hash to be used for render call
	 * @param {Chunk} chunk Chunk instance
	 * @param {ModuleTemplate} moduleTemplate ModuleTemplate instance for render
	 * @param {Map<Function, DependencyTemplate>} dependencyTemplates dependency templates
	 * @returns {string[]} the generated source of the bootstrap code
	 */
	renderBootstrap(hash, chunk, moduleTemplate, dependencyTemplates) {
		const buf = [];
		buf.push(
			this.hooks.bootstrap.call(
				"",
				chunk,
				hash,
				moduleTemplate,
				dependencyTemplates
			)
		);
		buf.push(this.hooks.localVars.call("", chunk, hash));
		buf.push("");
		buf.push("// The require function");
		buf.push(`function ${this.requireFn}(moduleId) {`);
		buf.push(Template.indent(this.hooks.require.call("", chunk, hash)));
		buf.push("}");
		buf.push("");
		buf.push(
			Template.asString(this.hooks.requireExtensions.call("", chunk, hash))
		);
		buf.push("");
		buf.push(Template.asString(this.hooks.beforeStartup.call("", chunk, hash)));
		buf.push(Template.asString(this.hooks.startup.call("", chunk, hash)));
		return buf;
	}

	/**
	 * @param {string} hash hash to be used for render call
	 * @param {Chunk} chunk Chunk instance
	 * @param {ModuleTemplate} moduleTemplate ModuleTemplate instance for render
	 * @param {Map<Function, DependencyTemplate>} dependencyTemplates dependency templates
	 * @returns {ConcatSource} the newly generated source from rendering
	 */
	render(hash, chunk, moduleTemplate, dependencyTemplates) {
		const buf = this.renderBootstrap(
			hash,
			chunk,
			moduleTemplate,
			dependencyTemplates
		);
		let source = this.hooks.render.call(
			new OriginalSource(
				Template.prefix(buf, " \t") + "\n",
				"webpack/bootstrap"
			),
			chunk,
			hash,
			moduleTemplate,
			dependencyTemplates
		);
		if (chunk.hasEntryModule()) {
			source = this.hooks.renderWithEntry.call(source, chunk, hash);
		}
		if (!source) {
			throw new Error(
				"Compiler error: MainTemplate plugin 'render' should return something"
			);
		}
		chunk.rendered = true;
		return new ConcatSource(source, ";");
	}

	/**
	 *
	 * @param {string} hash hash for render fn
	 * @param {Chunk} chunk Chunk instance for require
	 * @param {(number|string)=} varModuleId module id
	 * @returns {TODO} the moduleRequire hook call return signature
	 */
	renderRequireFunctionForModule(hash, chunk, varModuleId) {
		return this.hooks.moduleRequire.call(
			this.requireFn,
			chunk,
			hash,
			varModuleId
		);
	}

	/**
	 *
	 * @param {string} hash hash for render add fn
	 * @param {Chunk} chunk Chunk instance for require add fn
	 * @param {(string|number)=} varModuleId module id
	 * @param {Module} varModule Module instance
	 * @returns {TODO} renderAddModule call
	 */
	renderAddModule(hash, chunk, varModuleId, varModule) {
		return this.hooks.addModule.call(
			`modules[${varModuleId}] = ${varModule};`,
			chunk,
			hash,
			varModuleId,
			varModule
		);
	}

	/**
	 *
	 * @param {string} hash string hash
	 * @param {number=} length length
	 * @returns {string} call hook return
	 */
	renderCurrentHashCode(hash, length) {
		length = length || Infinity;
		return this.hooks.currentHash.call(
			JSON.stringify(hash.substr(0, length)),
			length
		);
	}

	/**
	 *
	 * @param {object} options get public path options
	 * @returns {string} hook call
	 */
	getPublicPath(options) {
		return this.hooks.assetPath.call(
			this.outputOptions.publicPath || "",
			options
		);
	}

	getAssetPath(path, options) {
		return this.hooks.assetPath.call(path, options);
	}

	/**
	 * Updates hash with information from this template
	 * @param {Hash} hash the hash to update
	 * @returns {void}
	 */
	updateHash(hash) {
		hash.update("maintemplate");
		hash.update("3");
		this.hooks.hash.call(hash);
	}

	/**
	 * TODO webpack 5: remove moduleTemplate and dependencyTemplates
	 * Updates hash with chunk-specific information from this template
	 * @param {Hash} hash the hash to update
	 * @param {Chunk} chunk the chunk
	 * @param {ModuleTemplate} moduleTemplate ModuleTemplate instance for render
	 * @param {Map<Function, DependencyTemplate>} dependencyTemplates dependency templates
	 * @returns {void}
	 */
	updateHashForChunk(hash, chunk, moduleTemplate, dependencyTemplates) {
		this.updateHash(hash);
		this.hooks.hashForChunk.call(hash, chunk);
		for (const line of this.renderBootstrap(
			"0000",
			chunk,
			moduleTemplate,
			dependencyTemplates
		)) {
			hash.update(line);
		}
	}

	useChunkHash(chunk) {
		const paths = this.hooks.globalHashPaths.call([]);
		return !this.hooks.globalHash.call(chunk, paths);
	}
};
