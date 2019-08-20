/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const RequireContextDependency = require("./RequireContextDependency");
const ContextElementDependency = require("./ContextElementDependency");

const RequireContextDependencyParserPlugin = require("./RequireContextDependencyParserPlugin");

class RequireContextPlugin {
	constructor(modulesDirectories, extensions, mainFiles) {
		if (!Array.isArray(modulesDirectories)) {
			throw new Error("modulesDirectories must be an array");
		}
		if (!Array.isArray(extensions)) {
			throw new Error("extensions must be an array");
		}
		this.modulesDirectories = modulesDirectories;
		this.extensions = extensions;
		this.mainFiles = mainFiles;
	}

	apply(compiler) {
		compiler.hooks.compilation.tap(
			"RequireContextPlugin",
			(compilation, { contextModuleFactory, normalModuleFactory }) => {
				compilation.dependencyFactories.set(
					RequireContextDependency,
					contextModuleFactory
				);
				compilation.dependencyTemplates.set(
					RequireContextDependency,
					new RequireContextDependency.Template()
				);

				compilation.dependencyFactories.set(
					ContextElementDependency,
					normalModuleFactory
				);

				const handler = (parser, parserOptions) => {
					if (
						parserOptions.requireContext !== undefined &&
						!parserOptions.requireContext
					)
						return;

					new RequireContextDependencyParserPlugin().apply(parser);
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("RequireContextPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("RequireContextPlugin", handler);

				contextModuleFactory.hooks.alternatives.tap(
					"RequireContextPlugin",
					items => {
						if (items.length === 0) return items;
						return items
							.map(obj => {
								return this.extensions
									.filter(ext => {
										const l = obj.request.length;
										return (
											l > ext.length &&
											obj.request.substr(l - ext.length, l) === ext
										);
									})
									.map(ext => {
										const l = obj.request.length;
										return {
											context: obj.context,
											request: obj.request.substr(0, l - ext.length)
										};
									})
									.concat(obj);
							})
							.reduce((a, b) => a.concat(b), []);
					}
				);

				contextModuleFactory.hooks.alternatives.tap(
					"RequireContextPlugin",
					items => {
						if (items.length === 0) return items;
						return items
							.map(obj => {
								return this.mainFiles
									.filter(mainFile => {
										const l = obj.request.length;
										return (
											l > mainFile.length + 1 &&
											obj.request.substr(l - mainFile.length - 1, l) ===
												"/" + mainFile
										);
									})
									.map(mainFile => {
										const l = obj.request.length;
										return [
											{
												context: obj.context,
												request: obj.request.substr(0, l - mainFile.length)
											},
											{
												context: obj.context,
												request: obj.request.substr(0, l - mainFile.length - 1)
											}
										];
									})
									.reduce((a, b) => a.concat(b), [])
									.concat(obj);
							})
							.reduce((a, b) => a.concat(b), []);
					}
				);

				contextModuleFactory.hooks.alternatives.tap(
					"RequireContextPlugin",
					items => {
						if (items.length === 0) return items;
						return items.map(obj => {
							for (let i = 0; i < this.modulesDirectories.length; i++) {
								const dir = this.modulesDirectories[i];
								const idx = obj.request.indexOf("./" + dir + "/");
								if (idx === 0) {
									obj.request = obj.request.slice(dir.length + 3);
									break;
								}
							}
							return obj;
						});
					}
				);
			}
		);
	}
}
module.exports = RequireContextPlugin;
