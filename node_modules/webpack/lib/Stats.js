/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const RequestShortener = require("./RequestShortener");
const SizeFormatHelpers = require("./SizeFormatHelpers");
const formatLocation = require("./formatLocation");
const identifierUtils = require("./util/identifier");
const compareLocations = require("./compareLocations");

const optionsOrFallback = (...args) => {
	let optionValues = [];
	optionValues.push(...args);
	return optionValues.find(optionValue => optionValue !== undefined);
};

const compareId = (a, b) => {
	if (typeof a !== typeof b) {
		return typeof a < typeof b ? -1 : 1;
	}
	if (a < b) return -1;
	if (a > b) return 1;
	return 0;
};

class Stats {
	constructor(compilation) {
		this.compilation = compilation;
		this.hash = compilation.hash;
		this.startTime = undefined;
		this.endTime = undefined;
	}

	static filterWarnings(warnings, warningsFilter) {
		// we dont have anything to filter so all warnings can be shown
		if (!warningsFilter) {
			return warnings;
		}

		// create a chain of filters
		// if they return "true" a warning should be suppressed
		const normalizedWarningsFilters = [].concat(warningsFilter).map(filter => {
			if (typeof filter === "string") {
				return warning => warning.includes(filter);
			}

			if (filter instanceof RegExp) {
				return warning => filter.test(warning);
			}

			if (typeof filter === "function") {
				return filter;
			}

			throw new Error(
				`Can only filter warnings with Strings or RegExps. (Given: ${filter})`
			);
		});
		return warnings.filter(warning => {
			return !normalizedWarningsFilters.some(check => check(warning));
		});
	}

	formatFilePath(filePath) {
		const OPTIONS_REGEXP = /^(\s|\S)*!/;
		return filePath.includes("!")
			? `${filePath.replace(OPTIONS_REGEXP, "")} (${filePath})`
			: `${filePath}`;
	}

	hasWarnings() {
		return (
			this.compilation.warnings.length > 0 ||
			this.compilation.children.some(child => child.getStats().hasWarnings())
		);
	}

	hasErrors() {
		return (
			this.compilation.errors.length > 0 ||
			this.compilation.children.some(child => child.getStats().hasErrors())
		);
	}

	// remove a prefixed "!" that can be specified to reverse sort order
	normalizeFieldKey(field) {
		if (field[0] === "!") {
			return field.substr(1);
		}
		return field;
	}

	// if a field is prefixed by a "!" reverse sort order
	sortOrderRegular(field) {
		if (field[0] === "!") {
			return false;
		}
		return true;
	}

	toJson(options, forToString) {
		if (typeof options === "boolean" || typeof options === "string") {
			options = Stats.presetToOptions(options);
		} else if (!options) {
			options = {};
		}

		const optionOrLocalFallback = (v, def) =>
			v !== undefined ? v : options.all !== undefined ? options.all : def;

		const testAgainstGivenOption = item => {
			if (typeof item === "string") {
				const regExp = new RegExp(
					`[\\\\/]${item.replace(
						// eslint-disable-next-line no-useless-escape
						/[-[\]{}()*+?.\\^$|]/g,
						"\\$&"
					)}([\\\\/]|$|!|\\?)`
				);
				return ident => regExp.test(ident);
			}
			if (item && typeof item === "object" && typeof item.test === "function") {
				return ident => item.test(ident);
			}
			if (typeof item === "function") {
				return item;
			}
			if (typeof item === "boolean") {
				return () => item;
			}
		};

		const compilation = this.compilation;
		const context = optionsOrFallback(
			options.context,
			compilation.compiler.context
		);
		const requestShortener =
			compilation.compiler.context === context
				? compilation.requestShortener
				: new RequestShortener(context);
		const showPerformance = optionOrLocalFallback(options.performance, true);
		const showHash = optionOrLocalFallback(options.hash, true);
		const showEnv = optionOrLocalFallback(options.env, false);
		const showVersion = optionOrLocalFallback(options.version, true);
		const showTimings = optionOrLocalFallback(options.timings, true);
		const showBuiltAt = optionOrLocalFallback(options.builtAt, true);
		const showAssets = optionOrLocalFallback(options.assets, true);
		const showEntrypoints = optionOrLocalFallback(options.entrypoints, true);
		const showChunkGroups = optionOrLocalFallback(
			options.chunkGroups,
			!forToString
		);
		const showChunks = optionOrLocalFallback(options.chunks, !forToString);
		const showChunkModules = optionOrLocalFallback(options.chunkModules, true);
		const showChunkOrigins = optionOrLocalFallback(
			options.chunkOrigins,
			!forToString
		);
		const showModules = optionOrLocalFallback(options.modules, true);
		const showNestedModules = optionOrLocalFallback(
			options.nestedModules,
			true
		);
		const showModuleAssets = optionOrLocalFallback(
			options.moduleAssets,
			!forToString
		);
		const showDepth = optionOrLocalFallback(options.depth, !forToString);
		const showCachedModules = optionOrLocalFallback(options.cached, true);
		const showCachedAssets = optionOrLocalFallback(options.cachedAssets, true);
		const showReasons = optionOrLocalFallback(options.reasons, !forToString);
		const showUsedExports = optionOrLocalFallback(
			options.usedExports,
			!forToString
		);
		const showProvidedExports = optionOrLocalFallback(
			options.providedExports,
			!forToString
		);
		const showOptimizationBailout = optionOrLocalFallback(
			options.optimizationBailout,
			!forToString
		);
		const showChildren = optionOrLocalFallback(options.children, true);
		const showSource = optionOrLocalFallback(options.source, !forToString);
		const showModuleTrace = optionOrLocalFallback(options.moduleTrace, true);
		const showErrors = optionOrLocalFallback(options.errors, true);
		const showErrorDetails = optionOrLocalFallback(
			options.errorDetails,
			!forToString
		);
		const showWarnings = optionOrLocalFallback(options.warnings, true);
		const warningsFilter = optionsOrFallback(options.warningsFilter, null);
		const showPublicPath = optionOrLocalFallback(
			options.publicPath,
			!forToString
		);
		const excludeModules = []
			.concat(optionsOrFallback(options.excludeModules, options.exclude, []))
			.map(testAgainstGivenOption);
		const excludeAssets = []
			.concat(optionsOrFallback(options.excludeAssets, []))
			.map(testAgainstGivenOption);
		const maxModules = optionsOrFallback(
			options.maxModules,
			forToString ? 15 : Infinity
		);
		const sortModules = optionsOrFallback(options.modulesSort, "id");
		const sortChunks = optionsOrFallback(options.chunksSort, "id");
		const sortAssets = optionsOrFallback(options.assetsSort, "");
		const showOutputPath = optionOrLocalFallback(
			options.outputPath,
			!forToString
		);

		if (!showCachedModules) {
			excludeModules.push((ident, module) => !module.built);
		}

		const createModuleFilter = () => {
			let i = 0;
			return module => {
				if (excludeModules.length > 0) {
					const ident = requestShortener.shorten(module.resource);
					const excluded = excludeModules.some(fn => fn(ident, module));
					if (excluded) return false;
				}
				const result = i < maxModules;
				i++;
				return result;
			};
		};

		const createAssetFilter = () => {
			return asset => {
				if (excludeAssets.length > 0) {
					const ident = asset.name;
					const excluded = excludeAssets.some(fn => fn(ident, asset));
					if (excluded) return false;
				}
				return showCachedAssets || asset.emitted;
			};
		};

		const sortByFieldAndOrder = (fieldKey, a, b) => {
			if (a[fieldKey] === null && b[fieldKey] === null) return 0;
			if (a[fieldKey] === null) return 1;
			if (b[fieldKey] === null) return -1;
			if (a[fieldKey] === b[fieldKey]) return 0;
			if (typeof a[fieldKey] !== typeof b[fieldKey])
				return typeof a[fieldKey] < typeof b[fieldKey] ? -1 : 1;
			return a[fieldKey] < b[fieldKey] ? -1 : 1;
		};

		const sortByField = (field, originalArray) => {
			const originalMap = originalArray.reduce((map, v, i) => {
				map.set(v, i);
				return map;
			}, new Map());
			return (a, b) => {
				if (field) {
					const fieldKey = this.normalizeFieldKey(field);

					// if a field is prefixed with a "!" the sort is reversed!
					const sortIsRegular = this.sortOrderRegular(field);

					const cmp = sortByFieldAndOrder(
						fieldKey,
						sortIsRegular ? a : b,
						sortIsRegular ? b : a
					);
					if (cmp) return cmp;
				}
				return originalMap.get(a) - originalMap.get(b);
			};
		};

		const formatError = e => {
			let text = "";
			if (typeof e === "string") {
				e = { message: e };
			}
			if (e.chunk) {
				text += `chunk ${e.chunk.name || e.chunk.id}${
					e.chunk.hasRuntime()
						? " [entry]"
						: e.chunk.canBeInitial()
							? " [initial]"
							: ""
				}\n`;
			}
			if (e.file) {
				text += `${e.file}\n`;
			}
			if (
				e.module &&
				e.module.readableIdentifier &&
				typeof e.module.readableIdentifier === "function"
			) {
				text += this.formatFilePath(
					e.module.readableIdentifier(requestShortener)
				);
				if (typeof e.loc === "object") {
					const locInfo = formatLocation(e.loc);
					if (locInfo) text += ` ${locInfo}`;
				}
				text += "\n";
			}
			text += e.message;
			if (showErrorDetails && e.details) {
				text += `\n${e.details}`;
			}
			if (showErrorDetails && e.missing) {
				text += e.missing.map(item => `\n[${item}]`).join("");
			}
			if (showModuleTrace && e.origin) {
				text += `\n @ ${this.formatFilePath(
					e.origin.readableIdentifier(requestShortener)
				)}`;
				if (typeof e.originLoc === "object") {
					const locInfo = formatLocation(e.originLoc);
					if (locInfo) text += ` ${locInfo}`;
				}
				if (e.dependencies) {
					for (const dep of e.dependencies) {
						if (!dep.loc) continue;
						if (typeof dep.loc === "string") continue;
						const locInfo = formatLocation(dep.loc);
						if (!locInfo) continue;
						text += ` ${locInfo}`;
					}
				}
				let current = e.origin;
				while (current.issuer) {
					current = current.issuer;
					text += `\n @ ${current.readableIdentifier(requestShortener)}`;
				}
			}
			return text;
		};

		const obj = {
			errors: compilation.errors.map(formatError),
			warnings: Stats.filterWarnings(
				compilation.warnings.map(formatError),
				warningsFilter
			)
		};

		//We just hint other renderers since actually omitting
		//errors/warnings from the JSON would be kind of weird.
		Object.defineProperty(obj, "_showWarnings", {
			value: showWarnings,
			enumerable: false
		});
		Object.defineProperty(obj, "_showErrors", {
			value: showErrors,
			enumerable: false
		});

		if (showVersion) {
			obj.version = require("../package.json").version;
		}

		if (showHash) obj.hash = this.hash;
		if (showTimings && this.startTime && this.endTime) {
			obj.time = this.endTime - this.startTime;
		}

		if (showBuiltAt && this.endTime) {
			obj.builtAt = this.endTime;
		}

		if (showEnv && options._env) {
			obj.env = options._env;
		}

		if (compilation.needAdditionalPass) {
			obj.needAdditionalPass = true;
		}
		if (showPublicPath) {
			obj.publicPath = this.compilation.mainTemplate.getPublicPath({
				hash: this.compilation.hash
			});
		}
		if (showOutputPath) {
			obj.outputPath = this.compilation.mainTemplate.outputOptions.path;
		}
		if (showAssets) {
			const assetsByFile = {};
			const compilationAssets = Object.keys(compilation.assets).sort();
			obj.assetsByChunkName = {};
			obj.assets = compilationAssets
				.map(asset => {
					const obj = {
						name: asset,
						size: compilation.assets[asset].size(),
						chunks: [],
						chunkNames: [],
						emitted: compilation.assets[asset].emitted
					};

					if (showPerformance) {
						obj.isOverSizeLimit = compilation.assets[asset].isOverSizeLimit;
					}

					assetsByFile[asset] = obj;
					return obj;
				})
				.filter(createAssetFilter());
			obj.filteredAssets = compilationAssets.length - obj.assets.length;

			for (const chunk of compilation.chunks) {
				for (const asset of chunk.files) {
					if (assetsByFile[asset]) {
						for (const id of chunk.ids) {
							assetsByFile[asset].chunks.push(id);
						}
						if (chunk.name) {
							assetsByFile[asset].chunkNames.push(chunk.name);
							if (obj.assetsByChunkName[chunk.name]) {
								obj.assetsByChunkName[chunk.name] = []
									.concat(obj.assetsByChunkName[chunk.name])
									.concat([asset]);
							} else {
								obj.assetsByChunkName[chunk.name] = asset;
							}
						}
					}
				}
			}
			obj.assets.sort(sortByField(sortAssets, obj.assets));
		}

		const fnChunkGroup = groupMap => {
			const obj = {};
			for (const keyValuePair of groupMap) {
				const name = keyValuePair[0];
				const cg = keyValuePair[1];
				const children = cg.getChildrenByOrders();
				obj[name] = {
					chunks: cg.chunks.map(c => c.id),
					assets: cg.chunks.reduce(
						(array, c) => array.concat(c.files || []),
						[]
					),
					children: Object.keys(children).reduce((obj, key) => {
						const groups = children[key];
						obj[key] = groups.map(group => ({
							name: group.name,
							chunks: group.chunks.map(c => c.id),
							assets: group.chunks.reduce(
								(array, c) => array.concat(c.files || []),
								[]
							)
						}));
						return obj;
					}, Object.create(null)),
					childAssets: Object.keys(children).reduce((obj, key) => {
						const groups = children[key];
						obj[key] = Array.from(
							groups.reduce((set, group) => {
								for (const chunk of group.chunks) {
									for (const asset of chunk.files) {
										set.add(asset);
									}
								}
								return set;
							}, new Set())
						);
						return obj;
					}, Object.create(null))
				};
				if (showPerformance) {
					obj[name].isOverSizeLimit = cg.isOverSizeLimit;
				}
			}

			return obj;
		};

		if (showEntrypoints) {
			obj.entrypoints = fnChunkGroup(compilation.entrypoints);
		}

		if (showChunkGroups) {
			obj.namedChunkGroups = fnChunkGroup(compilation.namedChunkGroups);
		}

		const fnModule = module => {
			const path = [];
			let current = module;
			while (current.issuer) {
				path.push((current = current.issuer));
			}
			path.reverse();
			const obj = {
				id: module.id,
				identifier: module.identifier(),
				name: module.readableIdentifier(requestShortener),
				index: module.index,
				index2: module.index2,
				size: module.size(),
				cacheable: module.buildInfo.cacheable,
				built: !!module.built,
				optional: module.optional,
				prefetched: module.prefetched,
				chunks: Array.from(module.chunksIterable, chunk => chunk.id),
				issuer: module.issuer && module.issuer.identifier(),
				issuerId: module.issuer && module.issuer.id,
				issuerName:
					module.issuer && module.issuer.readableIdentifier(requestShortener),
				issuerPath:
					module.issuer &&
					path.map(module => ({
						id: module.id,
						identifier: module.identifier(),
						name: module.readableIdentifier(requestShortener),
						profile: module.profile
					})),
				profile: module.profile,
				failed: !!module.error,
				errors: module.errors ? module.errors.length : 0,
				warnings: module.warnings ? module.warnings.length : 0
			};
			if (showModuleAssets) {
				obj.assets = Object.keys(module.buildInfo.assets || {});
			}
			if (showReasons) {
				obj.reasons = module.reasons
					.sort((a, b) => {
						if (a.module && !b.module) return -1;
						if (!a.module && b.module) return 1;
						if (a.module && b.module) {
							const cmp = compareId(a.module.id, b.module.id);
							if (cmp) return cmp;
						}
						if (a.dependency && !b.dependency) return -1;
						if (!a.dependency && b.dependency) return 1;
						if (a.dependency && b.dependency) {
							const cmp = compareLocations(a.dependency.loc, b.dependency.loc);
							if (cmp) return cmp;
							if (a.dependency.type < b.dependency.type) return -1;
							if (a.dependency.type > b.dependency.type) return 1;
						}
						return 0;
					})
					.map(reason => {
						const obj = {
							moduleId: reason.module ? reason.module.id : null,
							moduleIdentifier: reason.module
								? reason.module.identifier()
								: null,
							module: reason.module
								? reason.module.readableIdentifier(requestShortener)
								: null,
							moduleName: reason.module
								? reason.module.readableIdentifier(requestShortener)
								: null,
							type: reason.dependency ? reason.dependency.type : null,
							explanation: reason.explanation,
							userRequest: reason.dependency
								? reason.dependency.userRequest
								: null
						};
						if (reason.dependency) {
							const locInfo = formatLocation(reason.dependency.loc);
							if (locInfo) {
								obj.loc = locInfo;
							}
						}
						return obj;
					});
			}
			if (showUsedExports) {
				if (module.used === true) {
					obj.usedExports = module.usedExports;
				} else if (module.used === false) {
					obj.usedExports = false;
				}
			}
			if (showProvidedExports) {
				obj.providedExports = Array.isArray(module.buildMeta.providedExports)
					? module.buildMeta.providedExports
					: null;
			}
			if (showOptimizationBailout) {
				obj.optimizationBailout = module.optimizationBailout.map(item => {
					if (typeof item === "function") return item(requestShortener);
					return item;
				});
			}
			if (showDepth) {
				obj.depth = module.depth;
			}
			if (showNestedModules) {
				if (module.modules) {
					const modules = module.modules;
					obj.modules = modules
						.sort(sortByField("depth", modules))
						.filter(createModuleFilter())
						.map(fnModule);
					obj.filteredModules = modules.length - obj.modules.length;
					obj.modules.sort(sortByField(sortModules, obj.modules));
				}
			}
			if (showSource && module._source) {
				obj.source = module._source.source();
			}
			return obj;
		};
		if (showChunks) {
			obj.chunks = compilation.chunks.map(chunk => {
				const parents = new Set();
				const children = new Set();
				const siblings = new Set();
				const childIdByOrder = chunk.getChildIdsByOrders();
				for (const chunkGroup of chunk.groupsIterable) {
					for (const parentGroup of chunkGroup.parentsIterable) {
						for (const chunk of parentGroup.chunks) {
							parents.add(chunk.id);
						}
					}
					for (const childGroup of chunkGroup.childrenIterable) {
						for (const chunk of childGroup.chunks) {
							children.add(chunk.id);
						}
					}
					for (const sibling of chunkGroup.chunks) {
						if (sibling !== chunk) siblings.add(sibling.id);
					}
				}
				const obj = {
					id: chunk.id,
					rendered: chunk.rendered,
					initial: chunk.canBeInitial(),
					entry: chunk.hasRuntime(),
					recorded: chunk.recorded,
					reason: chunk.chunkReason,
					size: chunk.modulesSize(),
					names: chunk.name ? [chunk.name] : [],
					files: chunk.files.slice(),
					hash: chunk.renderedHash,
					siblings: Array.from(siblings).sort(compareId),
					parents: Array.from(parents).sort(compareId),
					children: Array.from(children).sort(compareId),
					childrenByOrder: childIdByOrder
				};
				if (showChunkModules) {
					const modules = chunk.getModules();
					obj.modules = modules
						.slice()
						.sort(sortByField("depth", modules))
						.filter(createModuleFilter())
						.map(fnModule);
					obj.filteredModules = chunk.getNumberOfModules() - obj.modules.length;
					obj.modules.sort(sortByField(sortModules, obj.modules));
				}
				if (showChunkOrigins) {
					obj.origins = Array.from(chunk.groupsIterable, g => g.origins)
						.reduce((a, b) => a.concat(b), [])
						.map(origin => ({
							moduleId: origin.module ? origin.module.id : undefined,
							module: origin.module ? origin.module.identifier() : "",
							moduleIdentifier: origin.module ? origin.module.identifier() : "",
							moduleName: origin.module
								? origin.module.readableIdentifier(requestShortener)
								: "",
							loc: formatLocation(origin.loc),
							request: origin.request,
							reasons: origin.reasons || []
						}))
						.sort((a, b) => {
							const cmp1 = compareId(a.moduleId, b.moduleId);
							if (cmp1) return cmp1;
							const cmp2 = compareId(a.loc, b.loc);
							if (cmp2) return cmp2;
							const cmp3 = compareId(a.request, b.request);
							if (cmp3) return cmp3;
							return 0;
						});
				}
				return obj;
			});
			obj.chunks.sort(sortByField(sortChunks, obj.chunks));
		}
		if (showModules) {
			obj.modules = compilation.modules
				.slice()
				.sort(sortByField("depth", compilation.modules))
				.filter(createModuleFilter())
				.map(fnModule);
			obj.filteredModules = compilation.modules.length - obj.modules.length;
			obj.modules.sort(sortByField(sortModules, obj.modules));
		}
		if (showChildren) {
			obj.children = compilation.children.map((child, idx) => {
				const childOptions = Stats.getChildOptions(options, idx);
				const obj = new Stats(child).toJson(childOptions, forToString);
				delete obj.hash;
				delete obj.version;
				if (child.name) {
					obj.name = identifierUtils.makePathsRelative(
						context,
						child.name,
						compilation.cache
					);
				}
				return obj;
			});
		}

		return obj;
	}

	toString(options) {
		if (typeof options === "boolean" || typeof options === "string") {
			options = Stats.presetToOptions(options);
		} else if (!options) {
			options = {};
		}

		const useColors = optionsOrFallback(options.colors, false);

		const obj = this.toJson(options, true);

		return Stats.jsonToString(obj, useColors);
	}

	static jsonToString(obj, useColors) {
		const buf = [];

		const defaultColors = {
			bold: "\u001b[1m",
			yellow: "\u001b[1m\u001b[33m",
			red: "\u001b[1m\u001b[31m",
			green: "\u001b[1m\u001b[32m",
			cyan: "\u001b[1m\u001b[36m",
			magenta: "\u001b[1m\u001b[35m"
		};

		const colors = Object.keys(defaultColors).reduce(
			(obj, color) => {
				obj[color] = str => {
					if (useColors) {
						buf.push(
							useColors === true || useColors[color] === undefined
								? defaultColors[color]
								: useColors[color]
						);
					}
					buf.push(str);
					if (useColors) {
						buf.push("\u001b[39m\u001b[22m");
					}
				};
				return obj;
			},
			{
				normal: str => buf.push(str)
			}
		);

		const coloredTime = time => {
			let times = [800, 400, 200, 100];
			if (obj.time) {
				times = [obj.time / 2, obj.time / 4, obj.time / 8, obj.time / 16];
			}
			if (time < times[3]) colors.normal(`${time}ms`);
			else if (time < times[2]) colors.bold(`${time}ms`);
			else if (time < times[1]) colors.green(`${time}ms`);
			else if (time < times[0]) colors.yellow(`${time}ms`);
			else colors.red(`${time}ms`);
		};

		const newline = () => buf.push("\n");

		const getText = (arr, row, col) => {
			return arr[row][col].value;
		};

		const table = (array, align, splitter) => {
			const rows = array.length;
			const cols = array[0].length;
			const colSizes = new Array(cols);
			for (let col = 0; col < cols; col++) {
				colSizes[col] = 0;
			}
			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					const value = `${getText(array, row, col)}`;
					if (value.length > colSizes[col]) {
						colSizes[col] = value.length;
					}
				}
			}
			for (let row = 0; row < rows; row++) {
				for (let col = 0; col < cols; col++) {
					const format = array[row][col].color;
					const value = `${getText(array, row, col)}`;
					let l = value.length;
					if (align[col] === "l") {
						format(value);
					}
					for (; l < colSizes[col] && col !== cols - 1; l++) {
						colors.normal(" ");
					}
					if (align[col] === "r") {
						format(value);
					}
					if (col + 1 < cols && colSizes[col] !== 0) {
						colors.normal(splitter || "  ");
					}
				}
				newline();
			}
		};

		const getAssetColor = (asset, defaultColor) => {
			if (asset.isOverSizeLimit) {
				return colors.yellow;
			}

			return defaultColor;
		};

		if (obj.hash) {
			colors.normal("Hash: ");
			colors.bold(obj.hash);
			newline();
		}
		if (obj.version) {
			colors.normal("Version: webpack ");
			colors.bold(obj.version);
			newline();
		}
		if (typeof obj.time === "number") {
			colors.normal("Time: ");
			colors.bold(obj.time);
			colors.normal("ms");
			newline();
		}
		if (typeof obj.builtAt === "number") {
			const builtAtDate = new Date(obj.builtAt);
			colors.normal("Built at: ");
			colors.normal(
				builtAtDate.toLocaleDateString(undefined, {
					day: "2-digit",
					month: "2-digit",
					year: "numeric"
				})
			);
			colors.normal(" ");
			colors.bold(builtAtDate.toLocaleTimeString());
			newline();
		}
		if (obj.env) {
			colors.normal("Environment (--env): ");
			colors.bold(JSON.stringify(obj.env, null, 2));
			newline();
		}
		if (obj.publicPath) {
			colors.normal("PublicPath: ");
			colors.bold(obj.publicPath);
			newline();
		}

		if (obj.assets && obj.assets.length > 0) {
			const t = [
				[
					{
						value: "Asset",
						color: colors.bold
					},
					{
						value: "Size",
						color: colors.bold
					},
					{
						value: "Chunks",
						color: colors.bold
					},
					{
						value: "",
						color: colors.bold
					},
					{
						value: "",
						color: colors.bold
					},
					{
						value: "Chunk Names",
						color: colors.bold
					}
				]
			];
			for (const asset of obj.assets) {
				t.push([
					{
						value: asset.name,
						color: getAssetColor(asset, colors.green)
					},
					{
						value: SizeFormatHelpers.formatSize(asset.size),
						color: getAssetColor(asset, colors.normal)
					},
					{
						value: asset.chunks.join(", "),
						color: colors.bold
					},
					{
						value: asset.emitted ? "[emitted]" : "",
						color: colors.green
					},
					{
						value: asset.isOverSizeLimit ? "[big]" : "",
						color: getAssetColor(asset, colors.normal)
					},
					{
						value: asset.chunkNames.join(", "),
						color: colors.normal
					}
				]);
			}
			table(t, "rrrlll");
		}
		if (obj.filteredAssets > 0) {
			colors.normal(" ");
			if (obj.assets.length > 0) colors.normal("+ ");
			colors.normal(obj.filteredAssets);
			if (obj.assets.length > 0) colors.normal(" hidden");
			colors.normal(obj.filteredAssets !== 1 ? " assets" : " asset");
			newline();
		}

		const processChunkGroups = (namedGroups, prefix) => {
			for (const name of Object.keys(namedGroups)) {
				const cg = namedGroups[name];
				colors.normal(`${prefix} `);
				colors.bold(name);
				if (cg.isOverSizeLimit) {
					colors.normal(" ");
					colors.yellow("[big]");
				}
				colors.normal(" =");
				for (const asset of cg.assets) {
					colors.normal(" ");
					colors.green(asset);
				}
				for (const name of Object.keys(cg.childAssets)) {
					const assets = cg.childAssets[name];
					if (assets && assets.length > 0) {
						colors.normal(" ");
						colors.magenta(`(${name}:`);
						for (const asset of assets) {
							colors.normal(" ");
							colors.green(asset);
						}
						colors.magenta(")");
					}
				}
				newline();
			}
		};

		if (obj.entrypoints) {
			processChunkGroups(obj.entrypoints, "Entrypoint");
		}

		if (obj.namedChunkGroups) {
			let outputChunkGroups = obj.namedChunkGroups;
			if (obj.entrypoints) {
				outputChunkGroups = Object.keys(outputChunkGroups)
					.filter(name => !obj.entrypoints[name])
					.reduce((result, name) => {
						result[name] = obj.namedChunkGroups[name];
						return result;
					}, {});
			}
			processChunkGroups(outputChunkGroups, "Chunk Group");
		}

		const modulesByIdentifier = {};
		if (obj.modules) {
			for (const module of obj.modules) {
				modulesByIdentifier[`$${module.identifier}`] = module;
			}
		} else if (obj.chunks) {
			for (const chunk of obj.chunks) {
				if (chunk.modules) {
					for (const module of chunk.modules) {
						modulesByIdentifier[`$${module.identifier}`] = module;
					}
				}
			}
		}

		const processModuleAttributes = module => {
			colors.normal(" ");
			colors.normal(SizeFormatHelpers.formatSize(module.size));
			if (module.chunks) {
				for (const chunk of module.chunks) {
					colors.normal(" {");
					colors.yellow(chunk);
					colors.normal("}");
				}
			}
			if (typeof module.depth === "number") {
				colors.normal(` [depth ${module.depth}]`);
			}
			if (module.cacheable === false) {
				colors.red(" [not cacheable]");
			}
			if (module.optional) {
				colors.yellow(" [optional]");
			}
			if (module.built) {
				colors.green(" [built]");
			}
			if (module.assets && module.assets.length) {
				colors.magenta(
					` [${module.assets.length} asset${
						module.assets.length === 1 ? "" : "s"
					}]`
				);
			}
			if (module.prefetched) {
				colors.magenta(" [prefetched]");
			}
			if (module.failed) colors.red(" [failed]");
			if (module.warnings) {
				colors.yellow(
					` [${module.warnings} warning${module.warnings === 1 ? "" : "s"}]`
				);
			}
			if (module.errors) {
				colors.red(
					` [${module.errors} error${module.errors === 1 ? "" : "s"}]`
				);
			}
		};

		const processModuleContent = (module, prefix) => {
			if (Array.isArray(module.providedExports)) {
				colors.normal(prefix);
				if (module.providedExports.length === 0) {
					colors.cyan("[no exports]");
				} else {
					colors.cyan(`[exports: ${module.providedExports.join(", ")}]`);
				}
				newline();
			}
			if (module.usedExports !== undefined) {
				if (module.usedExports !== true) {
					colors.normal(prefix);
					if (module.usedExports === null) {
						colors.cyan("[used exports unknown]");
					} else if (module.usedExports === false) {
						colors.cyan("[no exports used]");
					} else if (
						Array.isArray(module.usedExports) &&
						module.usedExports.length === 0
					) {
						colors.cyan("[no exports used]");
					} else if (Array.isArray(module.usedExports)) {
						const providedExportsCount = Array.isArray(module.providedExports)
							? module.providedExports.length
							: null;
						if (
							providedExportsCount !== null &&
							providedExportsCount === module.usedExports.length
						) {
							colors.cyan("[all exports used]");
						} else {
							colors.cyan(
								`[only some exports used: ${module.usedExports.join(", ")}]`
							);
						}
					}
					newline();
				}
			}
			if (Array.isArray(module.optimizationBailout)) {
				for (const item of module.optimizationBailout) {
					colors.normal(prefix);
					colors.yellow(item);
					newline();
				}
			}
			if (module.reasons) {
				for (const reason of module.reasons) {
					colors.normal(prefix);
					if (reason.type) {
						colors.normal(reason.type);
						colors.normal(" ");
					}
					if (reason.userRequest) {
						colors.cyan(reason.userRequest);
						colors.normal(" ");
					}
					if (reason.moduleId !== null) {
						colors.normal("[");
						colors.normal(reason.moduleId);
						colors.normal("]");
					}
					if (reason.module && reason.module !== reason.moduleId) {
						colors.normal(" ");
						colors.magenta(reason.module);
					}
					if (reason.loc) {
						colors.normal(" ");
						colors.normal(reason.loc);
					}
					if (reason.explanation) {
						colors.normal(" ");
						colors.cyan(reason.explanation);
					}
					newline();
				}
			}
			if (module.profile) {
				colors.normal(prefix);
				let sum = 0;
				if (module.issuerPath) {
					for (const m of module.issuerPath) {
						colors.normal("[");
						colors.normal(m.id);
						colors.normal("] ");
						if (m.profile) {
							const time = (m.profile.factory || 0) + (m.profile.building || 0);
							coloredTime(time);
							sum += time;
							colors.normal(" ");
						}
						colors.normal("-> ");
					}
				}
				for (const key of Object.keys(module.profile)) {
					colors.normal(`${key}:`);
					const time = module.profile[key];
					coloredTime(time);
					colors.normal(" ");
					sum += time;
				}
				colors.normal("= ");
				coloredTime(sum);
				newline();
			}
			if (module.modules) {
				processModulesList(module, prefix + "| ");
			}
		};

		const processModulesList = (obj, prefix) => {
			if (obj.modules) {
				let maxModuleId = 0;
				for (const module of obj.modules) {
					if (typeof module.id === "number") {
						if (maxModuleId < module.id) maxModuleId = module.id;
					}
				}
				let contentPrefix = prefix + "    ";
				if (maxModuleId >= 10) contentPrefix += " ";
				if (maxModuleId >= 100) contentPrefix += " ";
				if (maxModuleId >= 1000) contentPrefix += " ";
				for (const module of obj.modules) {
					colors.normal(prefix);
					const name = module.name || module.identifier;
					if (typeof module.id === "string" || typeof module.id === "number") {
						if (typeof module.id === "number") {
							if (module.id < 1000 && maxModuleId >= 1000) colors.normal(" ");
							if (module.id < 100 && maxModuleId >= 100) colors.normal(" ");
							if (module.id < 10 && maxModuleId >= 10) colors.normal(" ");
						} else {
							if (maxModuleId >= 1000) colors.normal(" ");
							if (maxModuleId >= 100) colors.normal(" ");
							if (maxModuleId >= 10) colors.normal(" ");
						}
						if (name !== module.id) {
							colors.normal("[");
							colors.normal(module.id);
							colors.normal("]");
							colors.normal(" ");
						} else {
							colors.normal("[");
							colors.bold(module.id);
							colors.normal("]");
						}
					}
					if (name !== module.id) {
						colors.bold(name);
					}
					processModuleAttributes(module);
					newline();
					processModuleContent(module, contentPrefix);
				}
				if (obj.filteredModules > 0) {
					colors.normal(prefix);
					colors.normal("   ");
					if (obj.modules.length > 0) colors.normal(" + ");
					colors.normal(obj.filteredModules);
					if (obj.modules.length > 0) colors.normal(" hidden");
					colors.normal(obj.filteredModules !== 1 ? " modules" : " module");
					newline();
				}
			}
		};

		if (obj.chunks) {
			for (const chunk of obj.chunks) {
				colors.normal("chunk ");
				if (chunk.id < 1000) colors.normal(" ");
				if (chunk.id < 100) colors.normal(" ");
				if (chunk.id < 10) colors.normal(" ");
				colors.normal("{");
				colors.yellow(chunk.id);
				colors.normal("} ");
				colors.green(chunk.files.join(", "));
				if (chunk.names && chunk.names.length > 0) {
					colors.normal(" (");
					colors.normal(chunk.names.join(", "));
					colors.normal(")");
				}
				colors.normal(" ");
				colors.normal(SizeFormatHelpers.formatSize(chunk.size));
				for (const id of chunk.parents) {
					colors.normal(" <{");
					colors.yellow(id);
					colors.normal("}>");
				}
				for (const id of chunk.siblings) {
					colors.normal(" ={");
					colors.yellow(id);
					colors.normal("}=");
				}
				for (const id of chunk.children) {
					colors.normal(" >{");
					colors.yellow(id);
					colors.normal("}<");
				}
				if (chunk.childrenByOrder) {
					for (const name of Object.keys(chunk.childrenByOrder)) {
						const children = chunk.childrenByOrder[name];
						colors.normal(" ");
						colors.magenta(`(${name}:`);
						for (const id of children) {
							colors.normal(" {");
							colors.yellow(id);
							colors.normal("}");
						}
						colors.magenta(")");
					}
				}
				if (chunk.entry) {
					colors.yellow(" [entry]");
				} else if (chunk.initial) {
					colors.yellow(" [initial]");
				}
				if (chunk.rendered) {
					colors.green(" [rendered]");
				}
				if (chunk.recorded) {
					colors.green(" [recorded]");
				}
				if (chunk.reason) {
					colors.yellow(` ${chunk.reason}`);
				}
				newline();
				if (chunk.origins) {
					for (const origin of chunk.origins) {
						colors.normal("    > ");
						if (origin.reasons && origin.reasons.length) {
							colors.yellow(origin.reasons.join(" "));
							colors.normal(" ");
						}
						if (origin.request) {
							colors.normal(origin.request);
							colors.normal(" ");
						}
						if (origin.module) {
							colors.normal("[");
							colors.normal(origin.moduleId);
							colors.normal("] ");
							const module = modulesByIdentifier[`$${origin.module}`];
							if (module) {
								colors.bold(module.name);
								colors.normal(" ");
							}
						}
						if (origin.loc) {
							colors.normal(origin.loc);
						}
						newline();
					}
				}
				processModulesList(chunk, " ");
			}
		}

		processModulesList(obj, "");

		if (obj._showWarnings && obj.warnings) {
			for (const warning of obj.warnings) {
				newline();
				colors.yellow(`WARNING in ${warning}`);
				newline();
			}
		}
		if (obj._showErrors && obj.errors) {
			for (const error of obj.errors) {
				newline();
				colors.red(`ERROR in ${error}`);
				newline();
			}
		}
		if (obj.children) {
			for (const child of obj.children) {
				const childString = Stats.jsonToString(child, useColors);
				if (childString) {
					if (child.name) {
						colors.normal("Child ");
						colors.bold(child.name);
						colors.normal(":");
					} else {
						colors.normal("Child");
					}
					newline();
					buf.push("    ");
					buf.push(childString.replace(/\n/g, "\n    "));
					newline();
				}
			}
		}
		if (obj.needAdditionalPass) {
			colors.yellow(
				"Compilation needs an additional pass and will compile again."
			);
		}

		while (buf[buf.length - 1] === "\n") {
			buf.pop();
		}
		return buf.join("");
	}

	static presetToOptions(name) {
		// Accepted values: none, errors-only, minimal, normal, detailed, verbose
		// Any other falsy value will behave as 'none', truthy values as 'normal'
		const pn =
			(typeof name === "string" && name.toLowerCase()) || name || "none";
		switch (pn) {
			case "none":
				return {
					all: false
				};
			case "verbose":
				return {
					entrypoints: true,
					chunkGroups: true,
					modules: false,
					chunks: true,
					chunkModules: true,
					chunkOrigins: true,
					depth: true,
					env: true,
					reasons: true,
					usedExports: true,
					providedExports: true,
					optimizationBailout: true,
					errorDetails: true,
					publicPath: true,
					exclude: false,
					maxModules: Infinity
				};
			case "detailed":
				return {
					entrypoints: true,
					chunkGroups: true,
					chunks: true,
					chunkModules: false,
					chunkOrigins: true,
					depth: true,
					usedExports: true,
					providedExports: true,
					optimizationBailout: true,
					errorDetails: true,
					publicPath: true,
					exclude: false,
					maxModules: Infinity
				};
			case "minimal":
				return {
					all: false,
					modules: true,
					maxModules: 0,
					errors: true,
					warnings: true
				};
			case "errors-only":
				return {
					all: false,
					errors: true,
					moduleTrace: true
				};
			default:
				return {};
		}
	}

	static getChildOptions(options, idx) {
		let innerOptions;
		if (Array.isArray(options.children)) {
			if (idx < options.children.length) {
				innerOptions = options.children[idx];
			}
		} else if (typeof options.children === "object" && options.children) {
			innerOptions = options.children;
		}
		if (typeof innerOptions === "boolean" || typeof innerOptions === "string") {
			innerOptions = Stats.presetToOptions(innerOptions);
		}
		if (!innerOptions) {
			return options;
		}
		const childOptions = Object.assign({}, options);
		delete childOptions.children; // do not inherit children
		return Object.assign(childOptions, innerOptions);
	}
}

module.exports = Stats;
