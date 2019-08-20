/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Stats = require("./Stats");

class Watching {
	constructor(compiler, watchOptions, handler) {
		this.startTime = null;
		this.invalid = false;
		this.handler = handler;
		this.callbacks = [];
		this.closed = false;
		if (typeof watchOptions === "number") {
			this.watchOptions = {
				aggregateTimeout: watchOptions
			};
		} else if (watchOptions && typeof watchOptions === "object") {
			this.watchOptions = Object.assign({}, watchOptions);
		} else {
			this.watchOptions = {};
		}
		this.watchOptions.aggregateTimeout =
			this.watchOptions.aggregateTimeout || 200;
		this.compiler = compiler;
		this.running = true;
		this.compiler.readRecords(err => {
			if (err) return this._done(err);

			this._go();
		});
	}

	_go() {
		this.startTime = Date.now();
		this.running = true;
		this.invalid = false;
		this.compiler.hooks.watchRun.callAsync(this.compiler, err => {
			if (err) return this._done(err);
			const onCompiled = (err, compilation) => {
				if (err) return this._done(err);
				if (this.invalid) return this._done();

				if (this.compiler.hooks.shouldEmit.call(compilation) === false) {
					return this._done(null, compilation);
				}

				this.compiler.emitAssets(compilation, err => {
					if (err) return this._done(err);
					if (this.invalid) return this._done();
					this.compiler.emitRecords(err => {
						if (err) return this._done(err);

						if (compilation.hooks.needAdditionalPass.call()) {
							compilation.needAdditionalPass = true;

							const stats = new Stats(compilation);
							stats.startTime = this.startTime;
							stats.endTime = Date.now();
							this.compiler.hooks.done.callAsync(stats, err => {
								if (err) return this._done(err);

								this.compiler.hooks.additionalPass.callAsync(err => {
									if (err) return this._done(err);
									this.compiler.compile(onCompiled);
								});
							});
							return;
						}
						return this._done(null, compilation);
					});
				});
			};
			this.compiler.compile(onCompiled);
		});
	}

	_getStats(compilation) {
		const stats = new Stats(compilation);
		stats.startTime = this.startTime;
		stats.endTime = Date.now();
		return stats;
	}

	_done(err, compilation) {
		this.running = false;
		if (this.invalid) return this._go();

		const stats = compilation ? this._getStats(compilation) : null;
		if (err) {
			this.compiler.hooks.failed.call(err);
			this.handler(err, stats);
			return;
		}
		this.compiler.hooks.done.callAsync(stats, () => {
			this.handler(null, stats);
			if (!this.closed) {
				this.watch(
					Array.from(compilation.fileDependencies),
					Array.from(compilation.contextDependencies),
					Array.from(compilation.missingDependencies)
				);
			}
			for (const cb of this.callbacks) cb();
			this.callbacks.length = 0;
		});
	}

	watch(files, dirs, missing) {
		this.pausedWatcher = null;
		this.watcher = this.compiler.watchFileSystem.watch(
			files,
			dirs,
			missing,
			this.startTime,
			this.watchOptions,
			(
				err,
				filesModified,
				contextModified,
				missingModified,
				fileTimestamps,
				contextTimestamps,
				removedFiles
			) => {
				this.pausedWatcher = this.watcher;
				this.watcher = null;
				if (err) {
					return this.handler(err);
				}
				this.compiler.fileTimestamps = fileTimestamps;
				this.compiler.contextTimestamps = contextTimestamps;
				this.compiler.removedFiles = removedFiles;
				this._invalidate();
			},
			(fileName, changeTime) => {
				this.compiler.hooks.invalid.call(fileName, changeTime);
			}
		);
	}

	invalidate(callback) {
		if (callback) {
			this.callbacks.push(callback);
		}
		if (this.watcher) {
			this.compiler.fileTimestamps = this.watcher.getFileTimestamps();
			this.compiler.contextTimestamps = this.watcher.getContextTimestamps();
		}
		return this._invalidate();
	}

	_invalidate() {
		if (this.watcher) {
			this.pausedWatcher = this.watcher;
			this.watcher.pause();
			this.watcher = null;
		}
		if (this.running) {
			this.invalid = true;
			return false;
		} else {
			this._go();
		}
	}

	close(callback) {
		const finalCallback = () => {
			this.compiler.hooks.watchClose.call();
			this.compiler.running = false;
			this.compiler.watchMode = false;
			if (callback !== undefined) callback();
		};

		this.closed = true;
		if (this.watcher) {
			this.watcher.close();
			this.watcher = null;
		}
		if (this.pausedWatcher) {
			this.pausedWatcher.close();
			this.pausedWatcher = null;
		}
		if (this.running) {
			this.invalid = true;
			this._done = finalCallback;
		} else {
			finalCallback();
		}
	}
}

module.exports = Watching;
