/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { Tapable, SyncHook, MultiHook } = require("tapable");
const asyncLib = require("neo-async");
const MultiWatching = require("./MultiWatching");
const MultiStats = require("./MultiStats");
const ConcurrentCompilationError = require("./ConcurrentCompilationError");

module.exports = class MultiCompiler extends Tapable {
	constructor(compilers) {
		super();
		this.hooks = {
			done: new SyncHook(["stats"]),
			invalid: new MultiHook(compilers.map(c => c.hooks.invalid)),
			run: new MultiHook(compilers.map(c => c.hooks.run)),
			watchClose: new SyncHook([]),
			watchRun: new MultiHook(compilers.map(c => c.hooks.watchRun))
		};
		if (!Array.isArray(compilers)) {
			compilers = Object.keys(compilers).map(name => {
				compilers[name].name = name;
				return compilers[name];
			});
		}
		this.compilers = compilers;
		let doneCompilers = 0;
		let compilerStats = [];
		let index = 0;
		for (const compiler of this.compilers) {
			let compilerDone = false;
			const compilerIndex = index++;
			// eslint-disable-next-line no-loop-func
			compiler.hooks.done.tap("MultiCompiler", stats => {
				if (!compilerDone) {
					compilerDone = true;
					doneCompilers++;
				}
				compilerStats[compilerIndex] = stats;
				if (doneCompilers === this.compilers.length) {
					this.hooks.done.call(new MultiStats(compilerStats));
				}
			});
			// eslint-disable-next-line no-loop-func
			compiler.hooks.invalid.tap("MultiCompiler", () => {
				if (compilerDone) {
					compilerDone = false;
					doneCompilers--;
				}
			});
		}
		this.running = false;
	}

	get outputPath() {
		let commonPath = this.compilers[0].outputPath;
		for (const compiler of this.compilers) {
			while (
				compiler.outputPath.indexOf(commonPath) !== 0 &&
				/[/\\]/.test(commonPath)
			) {
				commonPath = commonPath.replace(/[/\\][^/\\]*$/, "");
			}
		}

		if (!commonPath && this.compilers[0].outputPath[0] === "/") return "/";
		return commonPath;
	}

	get inputFileSystem() {
		throw new Error("Cannot read inputFileSystem of a MultiCompiler");
	}

	get outputFileSystem() {
		throw new Error("Cannot read outputFileSystem of a MultiCompiler");
	}

	set inputFileSystem(value) {
		for (const compiler of this.compilers) {
			compiler.inputFileSystem = value;
		}
	}

	set outputFileSystem(value) {
		for (const compiler of this.compilers) {
			compiler.outputFileSystem = value;
		}
	}

	validateDependencies(callback) {
		const edges = new Set();
		const missing = [];
		const targetFound = compiler => {
			for (const edge of edges) {
				if (edge.target === compiler) {
					return true;
				}
			}
			return false;
		};
		const sortEdges = (e1, e2) => {
			return (
				e1.source.name.localeCompare(e2.source.name) ||
				e1.target.name.localeCompare(e2.target.name)
			);
		};
		for (const source of this.compilers) {
			if (source.dependencies) {
				for (const dep of source.dependencies) {
					const target = this.compilers.find(c => c.name === dep);
					if (!target) {
						missing.push(dep);
					} else {
						edges.add({
							source,
							target
						});
					}
				}
			}
		}
		const errors = missing.map(m => `Compiler dependency \`${m}\` not found.`);
		const stack = this.compilers.filter(c => !targetFound(c));
		while (stack.length > 0) {
			const current = stack.pop();
			for (const edge of edges) {
				if (edge.source === current) {
					edges.delete(edge);
					const target = edge.target;
					if (!targetFound(target)) {
						stack.push(target);
					}
				}
			}
		}
		if (edges.size > 0) {
			const lines = Array.from(edges)
				.sort(sortEdges)
				.map(edge => `${edge.source.name} -> ${edge.target.name}`);
			lines.unshift("Circular dependency found in compiler dependencies.");
			errors.unshift(lines.join("\n"));
		}
		if (errors.length > 0) {
			const message = errors.join("\n");
			callback(new Error(message));
			return false;
		}
		return true;
	}

	runWithDependencies(compilers, fn, callback) {
		const fulfilledNames = new Set();
		let remainingCompilers = compilers;
		const isDependencyFulfilled = d => fulfilledNames.has(d);
		const getReadyCompilers = () => {
			let readyCompilers = [];
			let list = remainingCompilers;
			remainingCompilers = [];
			for (const c of list) {
				const ready =
					!c.dependencies || c.dependencies.every(isDependencyFulfilled);
				if (ready) {
					readyCompilers.push(c);
				} else {
					remainingCompilers.push(c);
				}
			}
			return readyCompilers;
		};
		const runCompilers = callback => {
			if (remainingCompilers.length === 0) return callback();
			asyncLib.map(
				getReadyCompilers(),
				(compiler, callback) => {
					fn(compiler, err => {
						if (err) return callback(err);
						fulfilledNames.add(compiler.name);
						runCompilers(callback);
					});
				},
				callback
			);
		};
		runCompilers(callback);
	}

	watch(watchOptions, handler) {
		if (this.running) return handler(new ConcurrentCompilationError());

		let watchings = [];
		let allStats = this.compilers.map(() => null);
		let compilerStatus = this.compilers.map(() => false);
		if (this.validateDependencies(handler)) {
			this.running = true;
			this.runWithDependencies(
				this.compilers,
				(compiler, callback) => {
					const compilerIdx = this.compilers.indexOf(compiler);
					let firstRun = true;
					let watching = compiler.watch(
						Array.isArray(watchOptions)
							? watchOptions[compilerIdx]
							: watchOptions,
						(err, stats) => {
							if (err) handler(err);
							if (stats) {
								allStats[compilerIdx] = stats;
								compilerStatus[compilerIdx] = "new";
								if (compilerStatus.every(Boolean)) {
									const freshStats = allStats.filter((s, idx) => {
										return compilerStatus[idx] === "new";
									});
									compilerStatus.fill(true);
									const multiStats = new MultiStats(freshStats);
									handler(null, multiStats);
								}
							}
							if (firstRun && !err) {
								firstRun = false;
								callback();
							}
						}
					);
					watchings.push(watching);
				},
				() => {
					// ignore
				}
			);
		}

		return new MultiWatching(watchings, this);
	}

	run(callback) {
		if (this.running) {
			return callback(new ConcurrentCompilationError());
		}

		const finalCallback = (err, stats) => {
			this.running = false;

			if (callback !== undefined) {
				return callback(err, stats);
			}
		};

		const allStats = this.compilers.map(() => null);
		if (this.validateDependencies(callback)) {
			this.running = true;
			this.runWithDependencies(
				this.compilers,
				(compiler, callback) => {
					const compilerIdx = this.compilers.indexOf(compiler);
					compiler.run((err, stats) => {
						if (err) {
							return callback(err);
						}
						allStats[compilerIdx] = stats;
						callback();
					});
				},
				err => {
					if (err) {
						return finalCallback(err);
					}
					finalCallback(null, new MultiStats(allStats));
				}
			);
		}
	}

	purgeInputFileSystem() {
		for (const compiler of this.compilers) {
			if (compiler.inputFileSystem && compiler.inputFileSystem.purge) {
				compiler.inputFileSystem.purge();
			}
		}
	}
};
