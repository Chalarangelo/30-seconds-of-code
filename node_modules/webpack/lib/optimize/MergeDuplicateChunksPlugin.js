/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

class MergeDuplicateChunksPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"MergeDuplicateChunksPlugin",
			compilation => {
				compilation.hooks.optimizeChunksBasic.tap(
					"MergeDuplicateChunksPlugin",
					chunks => {
						// remember already tested chunks for performance
						const notDuplicates = new Set();

						// for each chunk
						for (const chunk of chunks) {
							// track a Set of all chunk that could be duplicates
							let possibleDuplicates;
							for (const module of chunk.modulesIterable) {
								if (possibleDuplicates === undefined) {
									// when possibleDuplicates is not yet set,
									// create a new Set from chunks of the current module
									// including only chunks with the same number of modules
									for (const dup of module.chunksIterable) {
										if (
											dup !== chunk &&
											chunk.getNumberOfModules() === dup.getNumberOfModules() &&
											!notDuplicates.has(dup)
										) {
											// delay allocating the new Set until here, reduce memory pressure
											if (possibleDuplicates === undefined) {
												possibleDuplicates = new Set();
											}
											possibleDuplicates.add(dup);
										}
									}
									// when no chunk is possible we can break here
									if (possibleDuplicates === undefined) break;
								} else {
									// validate existing possible duplicates
									for (const dup of possibleDuplicates) {
										// remove possible duplicate when module is not contained
										if (!dup.containsModule(module)) {
											possibleDuplicates.delete(dup);
										}
									}
									// when all chunks has been removed we can break here
									if (possibleDuplicates.size === 0) break;
								}
							}

							// when we found duplicates
							if (
								possibleDuplicates !== undefined &&
								possibleDuplicates.size > 0
							) {
								for (const otherChunk of possibleDuplicates) {
									if (otherChunk.hasRuntime() !== chunk.hasRuntime()) continue;
									// merge them
									if (chunk.integrate(otherChunk, "duplicate")) {
										chunks.splice(chunks.indexOf(otherChunk), 1);
									}
								}
							}

							// don't check already processed chunks twice
							notDuplicates.add(chunk);
						}
					}
				);
			}
		);
	}
}
module.exports = MergeDuplicateChunksPlugin;
