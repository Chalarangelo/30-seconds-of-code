/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const identifierUtils = require("../util/identifier");
const { intersect } = require("../util/SetHelpers");
const validateOptions = require("schema-utils");
const schema = require("../../schemas/plugins/optimize/AggressiveSplittingPlugin.json");

/** @typedef {import("../../declarations/plugins/optimize/AggressiveSplittingPlugin").AggressiveSplittingPluginOptions} AggressiveSplittingPluginOptions */

const moveModuleBetween = (oldChunk, newChunk) => {
	return module => {
		oldChunk.moveModule(module, newChunk);
	};
};

const isNotAEntryModule = entryModule => {
	return module => {
		return entryModule !== module;
	};
};

class AggressiveSplittingPlugin {
	/**
	 * @param {AggressiveSplittingPluginOptions=} options options object
	 */
	constructor(options) {
		if (!options) options = {};

		validateOptions(schema, options, "Aggressive Splitting Plugin");

		this.options = options;
		if (typeof this.options.minSize !== "number") {
			this.options.minSize = 30 * 1024;
		}
		if (typeof this.options.maxSize !== "number") {
			this.options.maxSize = 50 * 1024;
		}
		if (typeof this.options.chunkOverhead !== "number") {
			this.options.chunkOverhead = 0;
		}
		if (typeof this.options.entryChunkMultiplicator !== "number") {
			this.options.entryChunkMultiplicator = 1;
		}
	}
	apply(compiler) {
		compiler.hooks.thisCompilation.tap(
			"AggressiveSplittingPlugin",
			compilation => {
				let needAdditionalSeal = false;
				let newSplits;
				let fromAggressiveSplittingSet;
				let chunkSplitDataMap;
				compilation.hooks.optimize.tap("AggressiveSplittingPlugin", () => {
					newSplits = [];
					fromAggressiveSplittingSet = new Set();
					chunkSplitDataMap = new Map();
				});
				compilation.hooks.optimizeChunksAdvanced.tap(
					"AggressiveSplittingPlugin",
					chunks => {
						// Precompute stuff
						const nameToModuleMap = new Map();
						const moduleToNameMap = new Map();
						for (const m of compilation.modules) {
							const name = identifierUtils.makePathsRelative(
								compiler.context,
								m.identifier(),
								compilation.cache
							);
							nameToModuleMap.set(name, m);
							moduleToNameMap.set(m, name);
						}

						// Check used chunk ids
						const usedIds = new Set();
						for (const chunk of chunks) {
							usedIds.add(chunk.id);
						}

						const recordedSplits =
							(compilation.records && compilation.records.aggressiveSplits) ||
							[];
						const usedSplits = newSplits
							? recordedSplits.concat(newSplits)
							: recordedSplits;

						const minSize = this.options.minSize;
						const maxSize = this.options.maxSize;

						const applySplit = splitData => {
							// Cannot split if id is already taken
							if (splitData.id !== undefined && usedIds.has(splitData.id)) {
								return false;
							}

							// Get module objects from names
							const selectedModules = splitData.modules.map(name =>
								nameToModuleMap.get(name)
							);

							// Does the modules exist at all?
							if (!selectedModules.every(Boolean)) return false;

							// Check if size matches (faster than waiting for hash)
							const size = selectedModules.reduce(
								(sum, m) => sum + m.size(),
								0
							);
							if (size !== splitData.size) return false;

							// get chunks with all modules
							const selectedChunks = intersect(
								selectedModules.map(m => new Set(m.chunksIterable))
							);

							// No relevant chunks found
							if (selectedChunks.size === 0) return false;

							// The found chunk is already the split or similar
							if (
								selectedChunks.size === 1 &&
								Array.from(selectedChunks)[0].getNumberOfModules() ===
									selectedModules.length
							) {
								const chunk = Array.from(selectedChunks)[0];
								if (fromAggressiveSplittingSet.has(chunk)) return false;
								fromAggressiveSplittingSet.add(chunk);
								chunkSplitDataMap.set(chunk, splitData);
								return true;
							}

							// split the chunk into two parts
							const newChunk = compilation.addChunk();
							newChunk.chunkReason = "aggressive splitted";
							for (const chunk of selectedChunks) {
								selectedModules.forEach(moveModuleBetween(chunk, newChunk));
								chunk.split(newChunk);
								chunk.name = null;
							}
							fromAggressiveSplittingSet.add(newChunk);
							chunkSplitDataMap.set(newChunk, splitData);

							if (splitData.id !== null && splitData.id !== undefined) {
								newChunk.id = splitData.id;
							}
							return true;
						};

						// try to restore to recorded splitting
						let changed = false;
						for (let j = 0; j < usedSplits.length; j++) {
							const splitData = usedSplits[j];
							if (applySplit(splitData)) changed = true;
						}

						// for any chunk which isn't splitted yet, split it and create a new entry
						// start with the biggest chunk
						const sortedChunks = chunks.slice().sort((a, b) => {
							const diff1 = b.modulesSize() - a.modulesSize();
							if (diff1) return diff1;
							const diff2 = a.getNumberOfModules() - b.getNumberOfModules();
							if (diff2) return diff2;
							const modulesA = Array.from(a.modulesIterable);
							const modulesB = Array.from(b.modulesIterable);
							modulesA.sort();
							modulesB.sort();
							const aI = modulesA[Symbol.iterator]();
							const bI = modulesB[Symbol.iterator]();
							// eslint-disable-next-line no-constant-condition
							while (true) {
								const aItem = aI.next();
								const bItem = bI.next();
								if (aItem.done) return 0;
								const aModuleIdentifier = aItem.value.identifier();
								const bModuleIdentifier = bItem.value.identifier();
								if (aModuleIdentifier > bModuleIdentifier) return -1;
								if (aModuleIdentifier < bModuleIdentifier) return 1;
							}
						});
						for (const chunk of sortedChunks) {
							if (fromAggressiveSplittingSet.has(chunk)) continue;
							const size = chunk.modulesSize();
							if (size > maxSize && chunk.getNumberOfModules() > 1) {
								const modules = chunk
									.getModules()
									.filter(isNotAEntryModule(chunk.entryModule))
									.sort((a, b) => {
										a = a.identifier();
										b = b.identifier();
										if (a > b) return 1;
										if (a < b) return -1;
										return 0;
									});
								const selectedModules = [];
								let selectedModulesSize = 0;
								for (let k = 0; k < modules.length; k++) {
									const module = modules[k];
									const newSize = selectedModulesSize + module.size();
									if (newSize > maxSize && selectedModulesSize >= minSize) {
										break;
									}
									selectedModulesSize = newSize;
									selectedModules.push(module);
								}
								if (selectedModules.length === 0) continue;
								const splitData = {
									modules: selectedModules
										.map(m => moduleToNameMap.get(m))
										.sort(),
									size: selectedModulesSize
								};

								if (applySplit(splitData)) {
									newSplits = (newSplits || []).concat(splitData);
									changed = true;
								}
							}
						}
						if (changed) return true;
					}
				);
				compilation.hooks.recordHash.tap(
					"AggressiveSplittingPlugin",
					records => {
						// 4. save made splittings to records
						const allSplits = new Set();
						const invalidSplits = new Set();

						// Check if some splittings are invalid
						// We remove invalid splittings and try again
						for (const chunk of compilation.chunks) {
							const splitData = chunkSplitDataMap.get(chunk);
							if (splitData !== undefined) {
								if (splitData.hash && chunk.hash !== splitData.hash) {
									// Split was successful, but hash doesn't equal
									// We can throw away the split since it's useless now
									invalidSplits.add(splitData);
								}
							}
						}

						if (invalidSplits.size > 0) {
							records.aggressiveSplits = records.aggressiveSplits.filter(
								splitData => !invalidSplits.has(splitData)
							);
							needAdditionalSeal = true;
						} else {
							// set hash and id values on all (new) splittings
							for (const chunk of compilation.chunks) {
								const splitData = chunkSplitDataMap.get(chunk);
								if (splitData !== undefined) {
									splitData.hash = chunk.hash;
									splitData.id = chunk.id;
									allSplits.add(splitData);
									// set flag for stats
									chunk.recorded = true;
								}
							}

							// Also add all unused historial splits (after the used ones)
							// They can still be used in some future compilation
							const recordedSplits =
								compilation.records && compilation.records.aggressiveSplits;
							if (recordedSplits) {
								for (const splitData of recordedSplits) {
									if (!invalidSplits.has(splitData)) allSplits.add(splitData);
								}
							}

							// record all splits
							records.aggressiveSplits = Array.from(allSplits);

							needAdditionalSeal = false;
						}
					}
				);
				compilation.hooks.needAdditionalSeal.tap(
					"AggressiveSplittingPlugin",
					() => {
						if (needAdditionalSeal) {
							needAdditionalSeal = false;
							return true;
						}
					}
				);
			}
		);
	}
}
module.exports = AggressiveSplittingPlugin;
