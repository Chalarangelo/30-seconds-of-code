/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const validateOptions = require("schema-utils");
const schema = require("../schemas/plugins/WatchIgnorePlugin.json");

/** @typedef {import("../declarations/plugins/WatchIgnorePlugin").WatchIgnorePluginOptions} WatchIgnorePluginOptions */

class IgnoringWatchFileSystem {
	constructor(wfs, paths) {
		this.wfs = wfs;
		this.paths = paths;
	}

	watch(files, dirs, missing, startTime, options, callback, callbackUndelayed) {
		const ignored = path =>
			this.paths.some(
				p => (p instanceof RegExp ? p.test(path) : path.indexOf(p) === 0)
			);

		const notIgnored = path => !ignored(path);

		const ignoredFiles = files.filter(ignored);
		const ignoredDirs = dirs.filter(ignored);

		const watcher = this.wfs.watch(
			files.filter(notIgnored),
			dirs.filter(notIgnored),
			missing,
			startTime,
			options,
			(
				err,
				filesModified,
				dirsModified,
				missingModified,
				fileTimestamps,
				dirTimestamps,
				removedFiles
			) => {
				if (err) return callback(err);
				for (const path of ignoredFiles) {
					fileTimestamps.set(path, 1);
				}

				for (const path of ignoredDirs) {
					dirTimestamps.set(path, 1);
				}

				callback(
					err,
					filesModified,
					dirsModified,
					missingModified,
					fileTimestamps,
					dirTimestamps,
					removedFiles
				);
			},
			callbackUndelayed
		);

		return {
			close: () => watcher.close(),
			pause: () => watcher.pause(),
			getContextTimestamps: () => {
				const dirTimestamps = watcher.getContextTimestamps();
				for (const path of ignoredDirs) {
					dirTimestamps.set(path, 1);
				}
				return dirTimestamps;
			},
			getFileTimestamps: () => {
				const fileTimestamps = watcher.getFileTimestamps();
				for (const path of ignoredFiles) {
					fileTimestamps.set(path, 1);
				}
				return fileTimestamps;
			}
		};
	}
}

class WatchIgnorePlugin {
	/**
	 * @param {WatchIgnorePluginOptions} paths list of paths
	 */
	constructor(paths) {
		validateOptions(schema, paths, "Watch Ignore Plugin");
		this.paths = paths;
	}

	apply(compiler) {
		compiler.hooks.afterEnvironment.tap("WatchIgnorePlugin", () => {
			compiler.watchFileSystem = new IgnoringWatchFileSystem(
				compiler.watchFileSystem,
				this.paths
			);
		});
	}
}

module.exports = WatchIgnorePlugin;
