/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Queue = require("../util/Queue");
const { intersect } = require("../util/SetHelpers");

const getParentChunksWithModule = (currentChunk, module) => {
	const chunks = [];
	const stack = new Set(currentChunk.parentsIterable);

	for (const chunk of stack) {
		if (chunk.containsModule(module)) {
			chunks.push(chunk);
		} else {
			for (const parent of chunk.parentsIterable) {
				stack.add(parent);
			}
		}
	}

	return chunks;
};

class RemoveParentModulesPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap("RemoveParentModulesPlugin", compilation => {
			const handler = (chunks, chunkGroups) => {
				const queue = new Queue();
				const availableModulesMap = new WeakMap();

				for (const chunkGroup of compilation.entrypoints.values()) {
					// initialize available modules for chunks without parents
					availableModulesMap.set(chunkGroup, new Set());
					for (const child of chunkGroup.childrenIterable) {
						queue.enqueue(child);
					}
				}

				while (queue.length > 0) {
					const chunkGroup = queue.dequeue();
					let availableModules = availableModulesMap.get(chunkGroup);
					let changed = false;
					for (const parent of chunkGroup.parentsIterable) {
						const availableModulesInParent = availableModulesMap.get(parent);
						if (availableModulesInParent !== undefined) {
							// If we know the available modules in parent: process these
							if (availableModules === undefined) {
								// if we have not own info yet: create new entry
								availableModules = new Set(availableModulesInParent);
								for (const chunk of parent.chunks) {
									for (const m of chunk.modulesIterable) {
										availableModules.add(m);
									}
								}
								availableModulesMap.set(chunkGroup, availableModules);
								changed = true;
							} else {
								for (const m of availableModules) {
									if (
										!parent.containsModule(m) &&
										!availableModulesInParent.has(m)
									) {
										availableModules.delete(m);
										changed = true;
									}
								}
							}
						}
					}
					if (changed) {
						// if something changed: enqueue our children
						for (const child of chunkGroup.childrenIterable) {
							queue.enqueue(child);
						}
					}
				}

				// now we have available modules for every chunk
				for (const chunk of chunks) {
					const availableModulesSets = Array.from(
						chunk.groupsIterable,
						chunkGroup => availableModulesMap.get(chunkGroup)
					);
					if (availableModulesSets.some(s => s === undefined)) continue; // No info about this chunk group
					const availableModules =
						availableModulesSets.length === 1
							? availableModulesSets[0]
							: intersect(availableModulesSets);
					const numberOfModules = chunk.getNumberOfModules();
					const toRemove = new Set();
					if (numberOfModules < availableModules.size) {
						for (const m of chunk.modulesIterable) {
							if (availableModules.has(m)) {
								toRemove.add(m);
							}
						}
					} else {
						for (const m of availableModules) {
							if (chunk.containsModule(m)) {
								toRemove.add(m);
							}
						}
					}
					for (const module of toRemove) {
						module.rewriteChunkInReasons(
							chunk,
							getParentChunksWithModule(chunk, module)
						);
						chunk.removeModule(module);
					}
				}
			};
			compilation.hooks.optimizeChunksBasic.tap(
				"RemoveParentModulesPlugin",
				handler
			);
			compilation.hooks.optimizeExtractedChunksBasic.tap(
				"RemoveParentModulesPlugin",
				handler
			);
		});
	}
}
module.exports = RemoveParentModulesPlugin;
