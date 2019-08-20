/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

class AggressiveMergingPlugin {
	constructor(options) {
		if (
			(options !== undefined && typeof options !== "object") ||
			Array.isArray(options)
		) {
			throw new Error(
				"Argument should be an options object. To use defaults, pass in nothing.\nFor more info on options, see https://webpack.js.org/plugins/"
			);
		}
		this.options = options || {};
	}

	apply(compiler) {
		const options = this.options;
		const minSizeReduce = options.minSizeReduce || 1.5;

		compiler.hooks.thisCompilation.tap(
			"AggressiveMergingPlugin",
			compilation => {
				compilation.hooks.optimizeChunksAdvanced.tap(
					"AggressiveMergingPlugin",
					chunks => {
						let combinations = [];
						chunks.forEach((a, idx) => {
							if (a.canBeInitial()) return;
							for (let i = 0; i < idx; i++) {
								const b = chunks[i];
								if (b.canBeInitial()) continue;
								combinations.push({
									a,
									b,
									improvement: undefined
								});
							}
						});

						for (const pair of combinations) {
							const a = pair.b.size({
								chunkOverhead: 0
							});
							const b = pair.a.size({
								chunkOverhead: 0
							});
							const ab = pair.b.integratedSize(pair.a, {
								chunkOverhead: 0
							});
							let newSize;
							if (ab === false) {
								pair.improvement = false;
								return;
							} else {
								newSize = ab;
							}

							pair.improvement = (a + b) / newSize;
						}
						combinations = combinations.filter(pair => {
							return pair.improvement !== false;
						});
						combinations.sort((a, b) => {
							return b.improvement - a.improvement;
						});

						const pair = combinations[0];

						if (!pair) return;
						if (pair.improvement < minSizeReduce) return;

						if (pair.b.integrate(pair.a, "aggressive-merge")) {
							chunks.splice(chunks.indexOf(pair.a), 1);
							return true;
						}
					}
				);
			}
		);
	}
}

module.exports = AggressiveMergingPlugin;
