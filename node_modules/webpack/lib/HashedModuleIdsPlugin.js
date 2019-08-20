/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const createHash = require("./util/createHash");

const validateOptions = require("schema-utils");
const schema = require("../schemas/plugins/HashedModuleIdsPlugin.json");

/** @typedef {import("../declarations/plugins/HashedModuleIdsPlugin").HashedModuleIdsPluginOptions} HashedModuleIdsPluginOptions */

class HashedModuleIdsPlugin {
	/**
	 * @param {HashedModuleIdsPluginOptions=} options options object
	 */
	constructor(options) {
		if (!options) options = {};

		validateOptions(schema, options, "Hashed Module Ids Plugin");

		/** @type {HashedModuleIdsPluginOptions} */
		this.options = Object.assign(
			{
				context: null,
				hashFunction: "md4",
				hashDigest: "base64",
				hashDigestLength: 4
			},
			options
		);
	}

	apply(compiler) {
		const options = this.options;
		compiler.hooks.compilation.tap("HashedModuleIdsPlugin", compilation => {
			const usedIds = new Set();
			compilation.hooks.beforeModuleIds.tap(
				"HashedModuleIdsPlugin",
				modules => {
					for (const module of modules) {
						if (module.id === null && module.libIdent) {
							const id = module.libIdent({
								context: this.options.context || compiler.options.context
							});
							const hash = createHash(options.hashFunction);
							hash.update(id);
							const hashId = hash.digest(options.hashDigest);
							let len = options.hashDigestLength;
							while (usedIds.has(hashId.substr(0, len))) len++;
							module.id = hashId.substr(0, len);
							usedIds.add(module.id);
						}
					}
				}
			);
		});
	}
}

module.exports = HashedModuleIdsPlugin;
