/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const sortByIndex = (a, b) => {
	return a.index - b.index;
};

const sortByIndex2 = (a, b) => {
	return a.index2 - b.index2;
};

class ChunkModuleIdRangePlugin {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		const options = this.options;
		compiler.hooks.compilation.tap("ChunkModuleIdRangePlugin", compilation => {
			compilation.hooks.moduleIds.tap("ChunkModuleIdRangePlugin", modules => {
				const chunk = compilation.chunks.find(
					chunk => chunk.name === options.name
				);
				if (!chunk) {
					throw new Error(
						`ChunkModuleIdRangePlugin: Chunk with name '${
							options.name
						}"' was not found`
					);
				}

				let chunkModules;
				if (options.order) {
					chunkModules = Array.from(chunk.modulesIterable);
					switch (options.order) {
						case "index":
							chunkModules.sort(sortByIndex);
							break;
						case "index2":
							chunkModules.sort(sortByIndex2);
							break;
						default:
							throw new Error(
								"ChunkModuleIdRangePlugin: unexpected value of order"
							);
					}
				} else {
					chunkModules = modules.filter(m => {
						return m.chunksIterable.has(chunk);
					});
				}

				let currentId = options.start || 0;
				for (let i = 0; i < chunkModules.length; i++) {
					const m = chunkModules[i];
					if (m.id === null) {
						m.id = currentId++;
					}
					if (options.end && currentId > options.end) break;
				}
			});
		});
	}
}
module.exports = ChunkModuleIdRangePlugin;
