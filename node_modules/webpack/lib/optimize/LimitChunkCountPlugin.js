/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const validateOptions = require("schema-utils");
const schema = require("../../schemas/plugins/optimize/LimitChunkCountPlugin.json");

/** @typedef {import("../../declarations/plugins/optimize/LimitChunkCountPlugin").LimitChunkCountPluginOptions} LimitChunkCountPluginOptions */

class LimitChunkCountPlugin {
	/**
	 * @param {LimitChunkCountPluginOptions=} options options object
	 */
	constructor(options) {
		if (!options) options = {};

		validateOptions(schema, options, "Limit Chunk Count Plugin");
		this.options = options;
	}
	apply(compiler) {
		const options = this.options;
		compiler.hooks.compilation.tap("LimitChunkCountPlugin", compilation => {
			compilation.hooks.optimizeChunksAdvanced.tap(
				"LimitChunkCountPlugin",
				chunks => {
					const maxChunks = options.maxChunks;
					if (!maxChunks) return;
					if (maxChunks < 1) return;
					if (chunks.length <= maxChunks) return;

					const orderedChunks = chunks.slice().sort((a, b) => a.compareTo(b));

					const sortedExtendedPairCombinations = orderedChunks
						.reduce((combinations, a, idx) => {
							// create combination pairs
							for (let i = 0; i < idx; i++) {
								const b = orderedChunks[i];
								combinations.push([b, a]);
							}
							return combinations;
						}, [])
						.map(pair => {
							// extend combination pairs with size and integrated size
							const a = pair[0].size(options);
							const b = pair[1].size(options);
							const ab = pair[0].integratedSize(pair[1], options);
							return [a + b - ab, ab, pair[0], pair[1], a, b];
						})
						.filter(extendedPair => {
							// filter pairs that do not have an integratedSize
							// meaning they can NOT be integrated!
							return extendedPair[1] !== false;
						})
						.sort((a, b) => {
							// sadly javascript does an inplace sort here
							// sort them by size
							const diff1 = b[0] - a[0];
							if (diff1 !== 0) return diff1;
							const diff2 = a[1] - b[1];
							if (diff2 !== 0) return diff2;
							const diff3 = a[2].compareTo(b[2]);
							if (diff3 !== 0) return diff3;
							return a[3].compareTo(b[3]);
						});

					const pair = sortedExtendedPairCombinations[0];

					if (pair && pair[2].integrate(pair[3], "limit")) {
						chunks.splice(chunks.indexOf(pair[3]), 1);
						return true;
					}
				}
			);
		});
	}
}
module.exports = LimitChunkCountPlugin;
