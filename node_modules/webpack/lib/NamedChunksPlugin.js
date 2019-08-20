/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

class NamedChunksPlugin {
	static defaultNameResolver(chunk) {
		return chunk.name || null;
	}

	constructor(nameResolver) {
		this.nameResolver = nameResolver || NamedChunksPlugin.defaultNameResolver;
	}

	apply(compiler) {
		compiler.hooks.compilation.tap("NamedChunksPlugin", compilation => {
			compilation.hooks.beforeChunkIds.tap("NamedChunksPlugin", chunks => {
				for (const chunk of chunks) {
					if (chunk.id === null) {
						chunk.id = this.nameResolver(chunk);
					}
				}
			});
		});
	}
}

module.exports = NamedChunksPlugin;
