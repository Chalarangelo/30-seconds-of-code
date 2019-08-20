/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { Tapable, SyncWaterfallHook, SyncHook } = require("tapable");

/** @typedef {import("./ModuleTemplate")} ModuleTemplate */
/** @typedef {import("./Chunk")} Chunk */
/** @typedef {import("./Module")} Module} */
/** @typedef {import("./Dependency").DependencyTemplate} DependencyTemplate} */
/** @typedef {import("./util/createHash").Hash} Hash} */

/**
 * @typedef {Object} RenderManifestOptions
 * @property {Chunk} chunk the chunk used to render
 * @property {string} hash
 * @property {string} fullHash
 * @property {TODO} outputOptions
 * @property {{javascript: ModuleTemplate, webassembly: ModuleTemplate}} moduleTemplates
 * @property {Map<TODO, TODO>} dependencyTemplates
 */

module.exports = class ChunkTemplate extends Tapable {
	constructor(outputOptions) {
		super();
		this.outputOptions = outputOptions || {};
		this.hooks = {
			/** @type {SyncWaterfallHook<TODO[], RenderManifestOptions>} */
			renderManifest: new SyncWaterfallHook(["result", "options"]),
			modules: new SyncWaterfallHook([
				"source",
				"chunk",
				"moduleTemplate",
				"dependencyTemplates"
			]),
			render: new SyncWaterfallHook([
				"source",
				"chunk",
				"moduleTemplate",
				"dependencyTemplates"
			]),
			renderWithEntry: new SyncWaterfallHook(["source", "chunk"]),
			hash: new SyncHook(["hash"]),
			hashForChunk: new SyncHook(["hash", "chunk"])
		};
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
	 * Updates hash with information from this template
	 * @param {Hash} hash the hash to update
	 * @returns {void}
	 */
	updateHash(hash) {
		hash.update("ChunkTemplate");
		hash.update("2");
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
	}
};
