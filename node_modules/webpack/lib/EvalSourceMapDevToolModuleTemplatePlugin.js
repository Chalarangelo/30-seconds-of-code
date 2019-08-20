/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { RawSource } = require("webpack-sources");
const ModuleFilenameHelpers = require("./ModuleFilenameHelpers");

const cache = new WeakMap();

class EvalSourceMapDevToolModuleTemplatePlugin {
	constructor(compilation, options) {
		this.compilation = compilation;
		this.sourceMapComment =
			options.append || "//# sourceURL=[module]\n//# sourceMappingURL=[url]";
		this.moduleFilenameTemplate =
			options.moduleFilenameTemplate ||
			"webpack://[namespace]/[resource-path]?[hash]";
		this.namespace = options.namespace || "";
		this.options = options;
	}

	apply(moduleTemplate) {
		const self = this;
		const options = this.options;
		const matchModule = ModuleFilenameHelpers.matchObject.bind(
			ModuleFilenameHelpers,
			options
		);
		moduleTemplate.hooks.module.tap(
			"EvalSourceMapDevToolModuleTemplatePlugin",
			(source, module) => {
				const cachedSource = cache.get(source);
				if (cachedSource !== undefined) {
					return cachedSource;
				}

				if (!matchModule(module.resource)) {
					return source;
				}

				/** @type {{ [key: string]: TODO; }} */
				let sourceMap;
				let content;
				if (source.sourceAndMap) {
					const sourceAndMap = source.sourceAndMap(options);
					sourceMap = sourceAndMap.map;
					content = sourceAndMap.source;
				} else {
					sourceMap = source.map(options);
					content = source.source();
				}
				if (!sourceMap) {
					return source;
				}

				// Clone (flat) the sourcemap to ensure that the mutations below do not persist.
				sourceMap = Object.keys(sourceMap).reduce((obj, key) => {
					obj[key] = sourceMap[key];
					return obj;
				}, {});
				const modules = sourceMap.sources.map(source => {
					const module = self.compilation.findModule(source);
					return module || source;
				});
				let moduleFilenames = modules.map(module => {
					return ModuleFilenameHelpers.createFilename(
						module,
						{
							moduleFilenameTemplate: self.moduleFilenameTemplate,
							namespace: self.namespace
						},
						moduleTemplate.runtimeTemplate.requestShortener
					);
				});
				moduleFilenames = ModuleFilenameHelpers.replaceDuplicates(
					moduleFilenames,
					(filename, i, n) => {
						for (let j = 0; j < n; j++) filename += "*";
						return filename;
					}
				);
				sourceMap.sources = moduleFilenames;
				sourceMap.sourceRoot = options.sourceRoot || "";
				sourceMap.file = `${module.id}.js`;

				const footer =
					self.sourceMapComment.replace(
						/\[url\]/g,
						`data:application/json;charset=utf-8;base64,${Buffer.from(
							JSON.stringify(sourceMap),
							"utf8"
						).toString("base64")}`
					) + `\n//# sourceURL=webpack-internal:///${module.id}\n`; // workaround for chrome bug

				const evalSource = new RawSource(
					`eval(${JSON.stringify(content + footer)});`
				);

				cache.set(source, evalSource);

				return evalSource;
			}
		);
		moduleTemplate.hooks.hash.tap(
			"EvalSourceMapDevToolModuleTemplatePlugin",
			hash => {
				hash.update("eval-source-map");
				hash.update("2");
			}
		);
	}
}
module.exports = EvalSourceMapDevToolModuleTemplatePlugin;
