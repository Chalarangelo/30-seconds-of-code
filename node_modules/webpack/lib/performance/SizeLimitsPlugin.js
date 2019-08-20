/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Sean Larkin @thelarkinn
*/
"use strict";
const EntrypointsOverSizeLimitWarning = require("./EntrypointsOverSizeLimitWarning");
const AssetsOverSizeLimitWarning = require("./AssetsOverSizeLimitWarning");
const NoAsyncChunksWarning = require("./NoAsyncChunksWarning");

module.exports = class SizeLimitsPlugin {
	constructor(options) {
		this.hints = options.hints;
		this.maxAssetSize = options.maxAssetSize;
		this.maxEntrypointSize = options.maxEntrypointSize;
		this.assetFilter = options.assetFilter;
	}
	apply(compiler) {
		const entrypointSizeLimit = this.maxEntrypointSize;
		const assetSizeLimit = this.maxAssetSize;
		const hints = this.hints;
		const assetFilter = this.assetFilter || (asset => !asset.endsWith(".map"));

		compiler.hooks.afterEmit.tap("SizeLimitsPlugin", compilation => {
			const warnings = [];

			const getEntrypointSize = entrypoint =>
				entrypoint.getFiles().reduce((currentSize, file) => {
					if (assetFilter(file) && compilation.assets[file]) {
						return currentSize + compilation.assets[file].size();
					}

					return currentSize;
				}, 0);

			const assetsOverSizeLimit = [];
			for (const assetName of Object.keys(compilation.assets)) {
				if (!assetFilter(assetName)) {
					continue;
				}

				const asset = compilation.assets[assetName];
				const size = asset.size();
				if (size > assetSizeLimit) {
					assetsOverSizeLimit.push({
						name: assetName,
						size: size
					});
					asset.isOverSizeLimit = true;
				}
			}

			const entrypointsOverLimit = [];
			for (const pair of compilation.entrypoints) {
				const name = pair[0];
				const entry = pair[1];
				const size = getEntrypointSize(entry);

				if (size > entrypointSizeLimit) {
					entrypointsOverLimit.push({
						name: name,
						size: size,
						files: entry.getFiles().filter(assetFilter)
					});
					entry.isOverSizeLimit = true;
				}
			}

			if (hints) {
				// 1. Individual Chunk: Size < 250kb
				// 2. Collective Initial Chunks [entrypoint] (Each Set?): Size < 250kb
				// 3. No Async Chunks
				// if !1, then 2, if !2 return
				if (assetsOverSizeLimit.length > 0) {
					warnings.push(
						new AssetsOverSizeLimitWarning(assetsOverSizeLimit, assetSizeLimit)
					);
				}
				if (entrypointsOverLimit.length > 0) {
					warnings.push(
						new EntrypointsOverSizeLimitWarning(
							entrypointsOverLimit,
							entrypointSizeLimit
						)
					);
				}

				if (warnings.length > 0) {
					const hasAsyncChunks =
						compilation.chunks.filter(chunk => !chunk.canBeInitial()).length >
						0;

					if (!hasAsyncChunks) {
						warnings.push(new NoAsyncChunksWarning());
					}

					if (hints === "error") {
						compilation.errors.push(...warnings);
					} else {
						compilation.warnings.push(...warnings);
					}
				}
			}
		});
	}
};
