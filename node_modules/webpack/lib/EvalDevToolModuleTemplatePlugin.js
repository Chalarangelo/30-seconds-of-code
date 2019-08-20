/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { RawSource } = require("webpack-sources");
const ModuleFilenameHelpers = require("./ModuleFilenameHelpers");

const cache = new WeakMap();

class EvalDevToolModuleTemplatePlugin {
	constructor(options) {
		this.sourceUrlComment = options.sourceUrlComment || "\n//# sourceURL=[url]";
		this.moduleFilenameTemplate =
			options.moduleFilenameTemplate ||
			"webpack://[namespace]/[resourcePath]?[loaders]";
		this.namespace = options.namespace || "";
	}

	apply(moduleTemplate) {
		moduleTemplate.hooks.module.tap(
			"EvalDevToolModuleTemplatePlugin",
			(source, module) => {
				const cacheEntry = cache.get(source);
				if (cacheEntry !== undefined) return cacheEntry;
				const content = source.source();
				const str = ModuleFilenameHelpers.createFilename(
					module,
					{
						moduleFilenameTemplate: this.moduleFilenameTemplate,
						namespace: this.namespace
					},
					moduleTemplate.runtimeTemplate.requestShortener
				);
				const footer =
					"\n" +
					this.sourceUrlComment.replace(
						/\[url\]/g,
						encodeURI(str)
							.replace(/%2F/g, "/")
							.replace(/%20/g, "_")
							.replace(/%5E/g, "^")
							.replace(/%5C/g, "\\")
							.replace(/^\//, "")
					);
				const result = new RawSource(
					`eval(${JSON.stringify(content + footer)});`
				);
				cache.set(source, result);
				return result;
			}
		);
		moduleTemplate.hooks.hash.tap("EvalDevToolModuleTemplatePlugin", hash => {
			hash.update("EvalDevToolModuleTemplatePlugin");
			hash.update("2");
		});
	}
}

module.exports = EvalDevToolModuleTemplatePlugin;
