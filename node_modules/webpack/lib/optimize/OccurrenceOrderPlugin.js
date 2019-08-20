/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

// TODO webpack 5 remove this plugin
// It has been splitted into separate plugins for modules and chunks
class OccurrenceOrderPlugin {
	constructor(preferEntry) {
		if (preferEntry !== undefined && typeof preferEntry !== "boolean") {
			throw new Error(
				"Argument should be a boolean.\nFor more info on this plugin, see https://webpack.js.org/plugins/"
			);
		}
		this.preferEntry = preferEntry;
	}
	apply(compiler) {
		const preferEntry = this.preferEntry;
		compiler.hooks.compilation.tap("OccurrenceOrderPlugin", compilation => {
			compilation.hooks.optimizeModuleOrder.tap(
				"OccurrenceOrderPlugin",
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
						return sum + initialChunkChunkMap.get(r.module);
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

					if (preferEntry) {
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
						if (preferEntry) {
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
			compilation.hooks.optimizeChunkOrder.tap(
				"OccurrenceOrderPlugin",
				chunks => {
					const occursInInitialChunksMap = new Map();
					const originalOrder = new Map();

					let i = 0;
					for (const c of chunks) {
						let occurs = 0;
						for (const chunkGroup of c.groupsIterable) {
							for (const parent of chunkGroup.parentsIterable) {
								if (parent.isInitial()) occurs++;
							}
						}
						occursInInitialChunksMap.set(c, occurs);
						originalOrder.set(c, i++);
					}

					chunks.sort((a, b) => {
						const aEntryOccurs = occursInInitialChunksMap.get(a);
						const bEntryOccurs = occursInInitialChunksMap.get(b);
						if (aEntryOccurs > bEntryOccurs) return -1;
						if (aEntryOccurs < bEntryOccurs) return 1;
						const aOccurs = a.getNumberOfGroups();
						const bOccurs = b.getNumberOfGroups();
						if (aOccurs > bOccurs) return -1;
						if (aOccurs < bOccurs) return 1;
						const orgA = originalOrder.get(a);
						const orgB = originalOrder.get(b);
						return orgA - orgB;
					});
				}
			);
		});
	}
}

module.exports = OccurrenceOrderPlugin;
