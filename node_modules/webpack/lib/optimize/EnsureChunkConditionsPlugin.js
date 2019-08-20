/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const GraphHelpers = require("../GraphHelpers");

class EnsureChunkConditionsPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"EnsureChunkConditionsPlugin",
			compilation => {
				const handler = chunks => {
					let changed = false;
					for (const module of compilation.modules) {
						if (!module.chunkCondition) continue;
						const sourceChunks = new Set();
						const chunkGroups = new Set();
						for (const chunk of module.chunksIterable) {
							if (!module.chunkCondition(chunk)) {
								sourceChunks.add(chunk);
								for (const group of chunk.groupsIterable) {
									chunkGroups.add(group);
								}
							}
						}
						if (sourceChunks.size === 0) continue;
						const targetChunks = new Set();
						chunkGroupLoop: for (const chunkGroup of chunkGroups) {
							// Can module be placed in a chunk of this group?
							for (const chunk of chunkGroup.chunks) {
								if (module.chunkCondition(chunk)) {
									targetChunks.add(chunk);
									continue chunkGroupLoop;
								}
							}
							// We reached the entrypoint: fail
							if (chunkGroup.isInitial()) {
								throw new Error(
									"Cannot fullfil chunk condition of " + module.identifier()
								);
							}
							// Try placing in all parents
							for (const group of chunkGroup.parentsIterable) {
								chunkGroups.add(group);
							}
						}
						for (const sourceChunk of sourceChunks) {
							GraphHelpers.disconnectChunkAndModule(sourceChunk, module);
						}
						for (const targetChunk of targetChunks) {
							GraphHelpers.connectChunkAndModule(targetChunk, module);
						}
					}
					if (changed) return true;
				};
				compilation.hooks.optimizeChunksBasic.tap(
					"EnsureChunkConditionsPlugin",
					handler
				);
				compilation.hooks.optimizeExtractedChunksBasic.tap(
					"EnsureChunkConditionsPlugin",
					handler
				);
			}
		);
	}
}
module.exports = EnsureChunkConditionsPlugin;
