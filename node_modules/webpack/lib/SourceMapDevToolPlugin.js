/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const path = require("path");
const { ConcatSource, RawSource } = require("webpack-sources");
const ModuleFilenameHelpers = require("./ModuleFilenameHelpers");
const SourceMapDevToolModuleOptionsPlugin = require("./SourceMapDevToolModuleOptionsPlugin");
const createHash = require("./util/createHash");

const validateOptions = require("schema-utils");
const schema = require("../schemas/plugins/SourceMapDevToolPlugin.json");

/** @typedef {import("../declarations/plugins/SourceMapDevToolPlugin").SourceMapDevToolPluginOptions} SourceMapDevToolPluginOptions */

const basename = name => {
	if (!name.includes("/")) return name;
	return name.substr(name.lastIndexOf("/") + 1);
};

const assetsCache = new WeakMap();

const getTaskForFile = (file, chunk, options, compilation) => {
	const asset = compilation.assets[file];
	const cache = assetsCache.get(asset);
	if (cache && cache.file === file) {
		for (const cachedFile in cache.assets) {
			compilation.assets[cachedFile] = cache.assets[cachedFile];
			if (cachedFile !== file) chunk.files.push(cachedFile);
		}
		return;
	}
	let source, sourceMap;
	if (asset.sourceAndMap) {
		const sourceAndMap = asset.sourceAndMap(options);
		sourceMap = sourceAndMap.map;
		source = sourceAndMap.source;
	} else {
		sourceMap = asset.map(options);
		source = asset.source();
	}
	if (sourceMap) {
		return {
			chunk,
			file,
			asset,
			source,
			sourceMap,
			modules: undefined
		};
	}
};

class SourceMapDevToolPlugin {
	/**
	 * @param {SourceMapDevToolPluginOptions=} options options object
	 */
	constructor(options) {
		if (arguments.length > 1) {
			throw new Error(
				"SourceMapDevToolPlugin only takes one argument (pass an options object)"
			);
		}

		if (!options) options = {};

		validateOptions(schema, options, "SourceMap DevTool Plugin");

		this.sourceMapFilename = options.filename;
		/** @type {string | false} */
		this.sourceMappingURLComment =
			options.append === false
				? false
				: options.append || "\n//# sourceMappingURL=[url]";
		this.moduleFilenameTemplate =
			options.moduleFilenameTemplate || "webpack://[namespace]/[resourcePath]";
		this.fallbackModuleFilenameTemplate =
			options.fallbackModuleFilenameTemplate ||
			"webpack://[namespace]/[resourcePath]?[hash]";
		this.namespace = options.namespace || "";
		this.options = options;
	}

	apply(compiler) {
		const sourceMapFilename = this.sourceMapFilename;
		const sourceMappingURLComment = this.sourceMappingURLComment;
		const moduleFilenameTemplate = this.moduleFilenameTemplate;
		const namespace = this.namespace;
		const fallbackModuleFilenameTemplate = this.fallbackModuleFilenameTemplate;
		const requestShortener = compiler.requestShortener;
		const options = this.options;
		options.test = options.test || /\.(m?js|css)($|\?)/i;

		const matchObject = ModuleFilenameHelpers.matchObject.bind(
			undefined,
			options
		);

		compiler.hooks.compilation.tap("SourceMapDevToolPlugin", compilation => {
			new SourceMapDevToolModuleOptionsPlugin(options).apply(compilation);

			compilation.hooks.afterOptimizeChunkAssets.tap(
				{
					name: "SourceMapDevToolPlugin",
					context: true
				},
				(context, chunks) => {
					const moduleToSourceNameMapping = new Map();
					const reportProgress =
						context && context.reportProgress
							? context.reportProgress
							: () => {};

					const files = [];
					for (const chunk of chunks) {
						for (const file of chunk.files) {
							if (matchObject(file)) {
								files.push({
									file,
									chunk
								});
							}
						}
					}

					reportProgress(0.0);
					const tasks = [];
					files.forEach(({ file, chunk }, idx) => {
						reportProgress(
							(0.5 * idx) / files.length,
							file,
							"generate SourceMap"
						);
						const task = getTaskForFile(file, chunk, options, compilation);

						if (task) {
							const modules = task.sourceMap.sources.map(source => {
								const module = compilation.findModule(source);
								return module || source;
							});

							for (let idx = 0; idx < modules.length; idx++) {
								const module = modules[idx];
								if (!moduleToSourceNameMapping.get(module)) {
									moduleToSourceNameMapping.set(
										module,
										ModuleFilenameHelpers.createFilename(
											module,
											{
												moduleFilenameTemplate: moduleFilenameTemplate,
												namespace: namespace
											},
											requestShortener
										)
									);
								}
							}

							task.modules = modules;

							tasks.push(task);
						}
					});

					reportProgress(0.5, "resolve sources");
					const usedNamesSet = new Set(moduleToSourceNameMapping.values());
					const conflictDetectionSet = new Set();

					// all modules in defined order (longest identifier first)
					const allModules = Array.from(moduleToSourceNameMapping.keys()).sort(
						(a, b) => {
							const ai = typeof a === "string" ? a : a.identifier();
							const bi = typeof b === "string" ? b : b.identifier();
							return ai.length - bi.length;
						}
					);

					// find modules with conflicting source names
					for (let idx = 0; idx < allModules.length; idx++) {
						const module = allModules[idx];
						let sourceName = moduleToSourceNameMapping.get(module);
						let hasName = conflictDetectionSet.has(sourceName);
						if (!hasName) {
							conflictDetectionSet.add(sourceName);
							continue;
						}

						// try the fallback name first
						sourceName = ModuleFilenameHelpers.createFilename(
							module,
							{
								moduleFilenameTemplate: fallbackModuleFilenameTemplate,
								namespace: namespace
							},
							requestShortener
						);
						hasName = usedNamesSet.has(sourceName);
						if (!hasName) {
							moduleToSourceNameMapping.set(module, sourceName);
							usedNamesSet.add(sourceName);
							continue;
						}

						// elsewise just append stars until we have a valid name
						while (hasName) {
							sourceName += "*";
							hasName = usedNamesSet.has(sourceName);
						}
						moduleToSourceNameMapping.set(module, sourceName);
						usedNamesSet.add(sourceName);
					}
					tasks.forEach((task, index) => {
						reportProgress(
							0.5 + (0.5 * index) / tasks.length,
							task.file,
							"attach SourceMap"
						);
						const assets = Object.create(null);
						const chunk = task.chunk;
						const file = task.file;
						const asset = task.asset;
						const sourceMap = task.sourceMap;
						const source = task.source;
						const modules = task.modules;
						const moduleFilenames = modules.map(m =>
							moduleToSourceNameMapping.get(m)
						);
						sourceMap.sources = moduleFilenames;
						if (options.noSources) {
							sourceMap.sourcesContent = undefined;
						}
						sourceMap.sourceRoot = options.sourceRoot || "";
						sourceMap.file = file;
						assetsCache.set(asset, { file, assets });
						/** @type {string | false} */
						let currentSourceMappingURLComment = sourceMappingURLComment;
						if (
							currentSourceMappingURLComment !== false &&
							/\.css($|\?)/i.test(file)
						) {
							currentSourceMappingURLComment = currentSourceMappingURLComment.replace(
								/^\n\/\/(.*)$/,
								"\n/*$1*/"
							);
						}
						const sourceMapString = JSON.stringify(sourceMap);
						if (sourceMapFilename) {
							let filename = file;
							let query = "";
							const idx = filename.indexOf("?");
							if (idx >= 0) {
								query = filename.substr(idx);
								filename = filename.substr(0, idx);
							}
							let sourceMapFile = compilation.getPath(sourceMapFilename, {
								chunk,
								filename: options.fileContext
									? path.relative(options.fileContext, filename)
									: filename,
								query,
								basename: basename(filename),
								contentHash: createHash("md4")
									.update(sourceMapString)
									.digest("hex")
							});
							const sourceMapUrl = options.publicPath
								? options.publicPath + sourceMapFile.replace(/\\/g, "/")
								: path
										.relative(path.dirname(file), sourceMapFile)
										.replace(/\\/g, "/");
							if (currentSourceMappingURLComment !== false) {
								assets[file] = compilation.assets[file] = new ConcatSource(
									new RawSource(source),
									currentSourceMappingURLComment.replace(
										/\[url\]/g,
										sourceMapUrl
									)
								);
							}
							assets[sourceMapFile] = compilation.assets[
								sourceMapFile
							] = new RawSource(sourceMapString);
							chunk.files.push(sourceMapFile);
						} else {
							if (currentSourceMappingURLComment === false) {
								throw new Error(
									"SourceMapDevToolPlugin: append can't be false when no filename is provided"
								);
							}
							assets[file] = compilation.assets[file] = new ConcatSource(
								new RawSource(source),
								currentSourceMappingURLComment
									.replace(/\[map\]/g, () => sourceMapString)
									.replace(
										/\[url\]/g,
										() =>
											`data:application/json;charset=utf-8;base64,${Buffer.from(
												sourceMapString,
												"utf-8"
											).toString("base64")}`
									)
							);
						}
					});
					reportProgress(1.0);
				}
			);
		});
	}
}

module.exports = SourceMapDevToolPlugin;
