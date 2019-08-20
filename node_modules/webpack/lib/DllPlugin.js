/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
	*/
"use strict";

const DllEntryPlugin = require("./DllEntryPlugin");
const LibManifestPlugin = require("./LibManifestPlugin");
const FlagInitialModulesAsUsedPlugin = require("./FlagInitialModulesAsUsedPlugin");

const validateOptions = require("schema-utils");
const schema = require("../schemas/plugins/DllPlugin.json");

/** @typedef {import("../declarations/plugins/DllPlugin").DllPluginOptions} DllPluginOptions */

class DllPlugin {
	/**
	 * @param {DllPluginOptions} options options object
	 */
	constructor(options) {
		validateOptions(schema, options, "Dll Plugin");
		this.options = options;
	}

	apply(compiler) {
		compiler.hooks.entryOption.tap("DllPlugin", (context, entry) => {
			const itemToPlugin = (item, name) => {
				if (Array.isArray(item)) {
					return new DllEntryPlugin(context, item, name);
				}
				throw new Error("DllPlugin: supply an Array as entry");
			};
			if (typeof entry === "object" && !Array.isArray(entry)) {
				Object.keys(entry).forEach(name => {
					itemToPlugin(entry[name], name).apply(compiler);
				});
			} else {
				itemToPlugin(entry, "main").apply(compiler);
			}
			return true;
		});
		new LibManifestPlugin(this.options).apply(compiler);
		if (!this.options.entryOnly) {
			new FlagInitialModulesAsUsedPlugin("DllPlugin").apply(compiler);
		}
	}
}

module.exports = DllPlugin;
