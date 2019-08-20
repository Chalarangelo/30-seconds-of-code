/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const validateOptions = require("schema-utils");
const schema = require("../../schemas/plugins/optimize/OccurrenceOrderModuleIdsPlugin.json");

/** @typedef {import("../../declarations/plugins/optimize/OccurrenceOrderModuleIdsPlugin").OccurrenceOrderModuleIdsPluginOptions} OccurrenceOrderModuleIdsPluginOptions */

class OccurrenceOrderModuleIdsPlugin {
	/**
	 * @param {OccurrenceOrderModuleIdsPluginOptions=} options options object
	 */
	constructor(options = {}) {
		validateOptions(schema, options, "Occurrence Order Module Ids Plugin");
		this.options = options;
	}

	apply(compiler) {
		const prioritiseInitial = this.options.prioritiseInitial;
		compiler.hooks.compilation.tap(
			"OccurrenceOrderModuleIdsPlugin",
			compilation => {
				compilation.hooks.optimizeModuleOrder.tap(
					"OccurrenceOrderModuleIdsPlugin",
					modules => {
						const occursInInitialChunksMap = new Map();
						const occursInAllChunksMap = new Map();

						const initialChunkChunkMap = new Map();
						const entryCountMap = new Map();
						for (const m of modules) {
							let initial = 0;
							let entry = 0;
							for (const c of m.chunksIterable) {
								if (c.canBeInitial()) initial++;
								if (c.entryModule === m) entry++;
							}
							initialChunkChunkMap.set(m, initial);
							entryCountMap.set(m, entry);
						}

						const countOccursInEntry = (sum, r) => {
							if (!r.module) {
								return sum;
							}
							const count = initialChunkChunkMap.get(r.module);
							if (!count) {
								return sum;
							}
							return sum + count;
						};
						const countOccurs = (sum, r) => {
							if (!r.module) {
								return sum;
							}
							let factor = 1;
							if (typeof r.dependency.getNumberOfIdOccurrences === "function") {
								factor = r.dependency.getNumberOfIdOccurrences();
							}
							if (factor === 0) {
								return sum;
							}
							return sum + factor * r.module.getNumberOfChunks();
						};

						if (prioritiseInitial) {
							for (const m of modules) {
								const result =
									m.reasons.reduce(countOccursInEntry, 0) +
									initialChunkChunkMap.get(m) +
									entryCountMap.get(m);
								occursInInitialChunksMap.set(m, result);
							}
						}

						const originalOrder = new Map();
						let i = 0;
						for (const m of modules) {
							const result =
								m.reasons.reduce(countOccurs, 0) +
								m.getNumberOfChunks() +
								entryCountMap.get(m);
							occursInAllChunksMap.set(m, result);
							originalOrder.set(m, i++);
						}

						modules.sort((a, b) => {
							if (prioritiseInitial) {
								const aEntryOccurs = occursInInitialChunksMap.get(a);
								const bEntryOccurs = occursInInitialChunksMap.get(b);
								if (aEntryOccurs > bEntryOccurs) return -1;
								if (aEntryOccurs < bEntryOccurs) return 1;
							}
							const aOccurs = occursInAllChunksMap.get(a);
							const bOccurs = occursInAllChunksMap.get(b);
							if (aOccurs > bOccurs) return -1;
							if (aOccurs < bOccurs) return 1;
							const orgA = originalOrder.get(a);
							const orgB = originalOrder.get(b);
							return orgA - orgB;
						});
					}
				);
			}
		);
	}
}

module.exports = OccurrenceOrderModuleIdsPlugin;
