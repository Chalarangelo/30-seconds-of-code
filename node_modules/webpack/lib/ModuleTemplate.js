/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { Tapable, SyncWaterfallHook, SyncHook } = require("tapable");

/** @typedef {import("webpack-sources").Source} Source */
/** @typedef {import("./Module")} Module */

module.exports = class ModuleTemplate extends Tapable {
	constructor(runtimeTemplate, type) {
		super();
		this.runtimeTemplate = runtimeTemplate;
		this.type = type;
		this.hooks = {
			content: new SyncWaterfallHook([
				"source",
				"module",
				"options",
				"dependencyTemplates"
			]),
			module: new SyncWaterfallHook([
				"source",
				"module",
				"options",
				"dependencyTemplates"
			]),
			render: new SyncWaterfallHook([
				"source",
				"module",
				"options",
				"dependencyTemplates"
			]),
			package: new SyncWaterfallHook([
				"source",
				"module",
				"options",
				"dependencyTemplates"
			]),
			hash: new SyncHook(["hash"])
		};
	}

	/**
	 * @param {Module} module the module
	 * @param {TODO} dependencyTemplates templates for dependencies
	 * @param {TODO} options render options
	 * @returns {Source} the source
	 */
	render(module, dependencyTemplates, options) {
		try {
			const moduleSource = module.source(
				dependencyTemplates,
				this.runtimeTemplate,
				this.type
			);
			const moduleSourcePostContent = this.hooks.content.call(
				moduleSource,
				module,
				options,
				dependencyTemplates
			);
			const moduleSourcePostModule = this.hooks.module.call(
				moduleSourcePostContent,
				module,
				options,
				dependencyTemplates
			);
			const moduleSourcePostRender = this.hooks.render.call(
				moduleSourcePostModule,
				module,
				options,
				dependencyTemplates
			);
			return this.hooks.package.call(
				moduleSourcePostRender,
				module,
				options,
				dependencyTemplates
			);
		} catch (e) {
			e.message = `${module.identifier()}\n${e.message}`;
			throw e;
		}
	}

	updateHash(hash) {
		hash.update("1");
		this.hooks.hash.call(hash);
	}
};
