/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const validateOptions = require("schema-utils");
const schema = require("../../schemas/plugins/optimize/MinChunkSizePlugin.json");

/** @typedef {import("../../declarations/plugins/optimize/MinChunkSizePlugin").MinChunkSizePluginOptions} MinChunkSizePluginOptions */

class MinChunkSizePlugin {
	/**
	 * @param {MinChunkSizePluginOptions} options options object
	 */
	constructor(options) {
		validateOptions(schema, options, "Min Chunk Size Plugin");
		this.options = options;
	}

	apply(compiler) {
		const options = this.options;
		const minChunkSize = options.minChunkSize;
		compiler.hooks.compilation.tap("MinChunkSizePlugin", compilation => {
			compilation.hooks.optimizeChunksAdvanced.tap(
				"MinChunkSizePlugin",
				chunks => {
					const equalOptions = {
						chunkOverhead: 1,
						entryChunkMultiplicator: 1
					};

					const sortedSizeFilteredExtendedPairCombinations = chunks
						.reduce((combinations, a, idx) => {
							// create combination pairs
							for (let i = 0; i < idx; i++) {
								const b = chunks[i];
								combinations.push([b, a]);
							}
							return combinations;
						}, [])
						.filter(pair => {
							// check if one of the chunks sizes is smaller than the minChunkSize
							const p0SmallerThanMinChunkSize =
								pair[0].size(equalOptions) < minChunkSize;
							const p1SmallerThanMinChunkSize =
								pair[1].size(equalOptions) < minChunkSize;
							return p0SmallerThanMinChunkSize || p1SmallerThanMinChunkSize;
						})
						.map(pair => {
							// extend combination pairs with size and integrated size
							const a = pair[0].size(options);
							const b = pair[1].size(options);
							const ab = pair[0].integratedSize(pair[1], options);
							return [a + b - ab, ab, pair[0], pair[1]];
						})
						.filter(pair => {
							// filter pairs that do not have an integratedSize
							// meaning they can NOT be integrated!
							return pair[1] !== false;
						})
						.sort((a, b) => {
							// sadly javascript does an inplace sort here
							// sort by size
							const diff = b[0] - a[0];
							if (diff !== 0) return diff;
							return a[1] - b[1];
						});

					if (sortedSizeFilteredExtendedPairCombinations.length === 0) return;

					const pair = sortedSizeFilteredExtendedPairCombinations[0];

					pair[2].integrate(pair[3], "min-size");
					chunks.splice(chunks.indexOf(pair[3]), 1);
					return true;
				}
			);
		});
	}
}
module.exports = MinChunkSizePlugin;
