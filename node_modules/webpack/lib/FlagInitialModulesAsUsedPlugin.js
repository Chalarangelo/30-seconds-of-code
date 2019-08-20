/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

class FlagInitialModulesAsUsedPlugin {
	constructor(explanation) {
		this.explanation = explanation;
	}

	apply(compiler) {
		compiler.hooks.compilation.tap(
			"FlagInitialModulesAsUsedPlugin",
			compilation => {
				compilation.hooks.afterOptimizeChunks.tap(
					"FlagInitialModulesAsUsedPlugin",
					chunks => {
						for (const chunk of chunks) {
							if (!chunk.isOnlyInitial()) {
								return;
							}
							for (const module of chunk.modulesIterable) {
								module.used = true;
								module.usedExports = true;
								module.addReason(null, null, this.explanation);
							}
						}
					}
				);
			}
		);
	}
}

module.exports = FlagInitialModulesAsUsedPlugin;
