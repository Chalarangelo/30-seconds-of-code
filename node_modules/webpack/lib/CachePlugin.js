/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const asyncLib = require("neo-async");

class CachePlugin {
	constructor(cache) {
		this.cache = cache || {};
		this.FS_ACCURACY = 2000;
	}

	apply(compiler) {
		if (Array.isArray(compiler.compilers)) {
			compiler.compilers.forEach((c, idx) => {
				new CachePlugin((this.cache[idx] = this.cache[idx] || {})).apply(c);
			});
		} else {
			const registerCacheToCompiler = (compiler, cache) => {
				compiler.hooks.thisCompilation.tap("CachePlugin", compilation => {
					compilation.cache = cache;
					compilation.hooks.childCompiler.tap(
						"CachePlugin",
						(childCompiler, compilerName, compilerIndex) => {
							if (cache) {
								let childCache;
								if (!cache.children) {
									cache.children = {};
								}
								if (!cache.children[compilerName]) {
									cache.children[compilerName] = [];
								}
								if (cache.children[compilerName][compilerIndex]) {
									childCache = cache.children[compilerName][compilerIndex];
								} else {
									cache.children[compilerName].push((childCache = {}));
								}
								registerCacheToCompiler(childCompiler, childCache);
							}
						}
					);
				});
			};
			registerCacheToCompiler(compiler, this.cache);
			compiler.hooks.watchRun.tap("CachePlugin", () => {
				this.watching = true;
			});
			compiler.hooks.run.tapAsync("CachePlugin", (compiler, callback) => {
				if (!compiler._lastCompilationFileDependencies) {
					return callback();
				}
				const fs = compiler.inputFileSystem;
				const fileTs = (compiler.fileTimestamps = new Map());
				asyncLib.forEach(
					compiler._lastCompilationFileDependencies,
					(file, callback) => {
						fs.stat(file, (err, stat) => {
							if (err) {
								if (err.code === "ENOENT") return callback();
								return callback(err);
							}

							if (stat.mtime) this.applyMtime(+stat.mtime);

							fileTs.set(file, +stat.mtime || Infinity);

							callback();
						});
					},
					err => {
						if (err) return callback(err);

						for (const [file, ts] of fileTs) {
							fileTs.set(file, ts + this.FS_ACCURACY);
						}

						callback();
					}
				);
			});
			compiler.hooks.afterCompile.tap("CachePlugin", compilation => {
				compilation.compiler._lastCompilationFileDependencies =
					compilation.fileDependencies;
				compilation.compiler._lastCompilationContextDependencies =
					compilation.contextDependencies;
			});
		}
	}

	/* istanbul ignore next */
	applyMtime(mtime) {
		if (this.FS_ACCURACY > 1 && mtime % 2 !== 0) this.FS_ACCURACY = 1;
		else if (this.FS_ACCURACY > 10 && mtime % 20 !== 0) this.FS_ACCURACY = 10;
		else if (this.FS_ACCURACY > 100 && mtime % 200 !== 0)
			this.FS_ACCURACY = 100;
		else if (this.FS_ACCURACY > 1000 && mtime % 2000 !== 0)
			this.FS_ACCURACY = 1000;
	}
}
module.exports = CachePlugin;
