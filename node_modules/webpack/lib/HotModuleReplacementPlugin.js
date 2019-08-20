/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { SyncBailHook } = require("tapable");
const { RawSource } = require("webpack-sources");
const Template = require("./Template");
const ModuleHotAcceptDependency = require("./dependencies/ModuleHotAcceptDependency");
const ModuleHotDeclineDependency = require("./dependencies/ModuleHotDeclineDependency");
const ConstDependency = require("./dependencies/ConstDependency");
const NullFactory = require("./NullFactory");
const ParserHelpers = require("./ParserHelpers");

module.exports = class HotModuleReplacementPlugin {
	constructor(options) {
		this.options = options || {};
		this.multiStep = this.options.multiStep;
		this.fullBuildTimeout = this.options.fullBuildTimeout || 200;
		this.requestTimeout = this.options.requestTimeout || 10000;
	}

	apply(compiler) {
		const multiStep = this.multiStep;
		const fullBuildTimeout = this.fullBuildTimeout;
		const requestTimeout = this.requestTimeout;
		const hotUpdateChunkFilename =
			compiler.options.output.hotUpdateChunkFilename;
		const hotUpdateMainFilename = compiler.options.output.hotUpdateMainFilename;
		compiler.hooks.additionalPass.tapAsync(
			"HotModuleReplacementPlugin",
			callback => {
				if (multiStep) return setTimeout(callback, fullBuildTimeout);
				return callback();
			}
		);

		const addParserPlugins = (parser, parserOptions) => {
			parser.hooks.expression
				.for("__webpack_hash__")
				.tap(
					"HotModuleReplacementPlugin",
					ParserHelpers.toConstantDependencyWithWebpackRequire(
						parser,
						"__webpack_require__.h()"
					)
				);
			parser.hooks.evaluateTypeof
				.for("__webpack_hash__")
				.tap(
					"HotModuleReplacementPlugin",
					ParserHelpers.evaluateToString("string")
				);
			parser.hooks.evaluateIdentifier.for("module.hot").tap(
				{
					name: "HotModuleReplacementPlugin",
					before: "NodeStuffPlugin"
				},
				expr => {
					return ParserHelpers.evaluateToIdentifier(
						"module.hot",
						!!parser.state.compilation.hotUpdateChunkTemplate
					)(expr);
				}
			);
			// TODO webpack 5: refactor this, no custom hooks
			if (!parser.hooks.hotAcceptCallback) {
				parser.hooks.hotAcceptCallback = new SyncBailHook([
					"expression",
					"requests"
				]);
			}
			if (!parser.hooks.hotAcceptWithoutCallback) {
				parser.hooks.hotAcceptWithoutCallback = new SyncBailHook([
					"expression",
					"requests"
				]);
			}
			parser.hooks.call
				.for("module.hot.accept")
				.tap("HotModuleReplacementPlugin", expr => {
					if (!parser.state.compilation.hotUpdateChunkTemplate) {
						return false;
					}
					if (expr.arguments.length >= 1) {
						const arg = parser.evaluateExpression(expr.arguments[0]);
						let params = [];
						let requests = [];
						if (arg.isString()) {
							params = [arg];
						} else if (arg.isArray()) {
							params = arg.items.filter(param => param.isString());
						}
						if (params.length > 0) {
							params.forEach((param, idx) => {
								const request = param.string;
								const dep = new ModuleHotAcceptDependency(request, param.range);
								dep.optional = true;
								dep.loc = Object.create(expr.loc);
								dep.loc.index = idx;
								parser.state.module.addDependency(dep);
								requests.push(request);
							});
							if (expr.arguments.length > 1) {
								parser.hooks.hotAcceptCallback.call(
									expr.arguments[1],
									requests
								);
								parser.walkExpression(expr.arguments[1]); // other args are ignored
								return true;
							} else {
								parser.hooks.hotAcceptWithoutCallback.call(expr, requests);
								return true;
							}
						}
					}
				});
			parser.hooks.call
				.for("module.hot.decline")
				.tap("HotModuleReplacementPlugin", expr => {
					if (!parser.state.compilation.hotUpdateChunkTemplate) {
						return false;
					}
					if (expr.arguments.length === 1) {
						const arg = parser.evaluateExpression(expr.arguments[0]);
						let params = [];
						if (arg.isString()) {
							params = [arg];
						} else if (arg.isArray()) {
							params = arg.items.filter(param => param.isString());
						}
						params.forEach((param, idx) => {
							const dep = new ModuleHotDeclineDependency(
								param.string,
								param.range
							);
							dep.optional = true;
							dep.loc = Object.create(expr.loc);
							dep.loc.index = idx;
							parser.state.module.addDependency(dep);
						});
					}
				});
			parser.hooks.expression
				.for("module.hot")
				.tap("HotModuleReplacementPlugin", ParserHelpers.skipTraversal);
		};

		compiler.hooks.compilation.tap(
			"HotModuleReplacementPlugin",
			(compilation, { normalModuleFactory }) => {
				const hotUpdateChunkTemplate = compilation.hotUpdateChunkTemplate;
				if (!hotUpdateChunkTemplate) return;

				compilation.dependencyFactories.set(ConstDependency, new NullFactory());
				compilation.dependencyTemplates.set(
					ConstDependency,
					new ConstDependency.Template()
				);

				compilation.dependencyFactories.set(
					ModuleHotAcceptDependency,
					normalModuleFactory
				);
				compilation.dependencyTemplates.set(
					ModuleHotAcceptDependency,
					new ModuleHotAcceptDependency.Template()
				);

				compilation.dependencyFactories.set(
					ModuleHotDeclineDependency,
					normalModuleFactory
				);
				compilation.dependencyTemplates.set(
					ModuleHotDeclineDependency,
					new ModuleHotDeclineDependency.Template()
				);

				compilation.hooks.record.tap(
					"HotModuleReplacementPlugin",
					(compilation, records) => {
						if (records.hash === compilation.hash) return;
						records.hash = compilation.hash;
						records.moduleHashs = {};
						for (const module of compilation.modules) {
							const identifier = module.identifier();
							records.moduleHashs[identifier] = module.hash;
						}
						records.chunkHashs = {};
						for (const chunk of compilation.chunks) {
							records.chunkHashs[chunk.id] = chunk.hash;
						}
						records.chunkModuleIds = {};
						for (const chunk of compilation.chunks) {
							records.chunkModuleIds[chunk.id] = Array.from(
								chunk.modulesIterable,
								m => m.id
							);
						}
					}
				);
				let initialPass = false;
				let recompilation = false;
				compilation.hooks.afterHash.tap("HotModuleReplacementPlugin", () => {
					let records = compilation.records;
					if (!records) {
						initialPass = true;
						return;
					}
					if (!records.hash) initialPass = true;
					const preHash = records.preHash || "x";
					const prepreHash = records.prepreHash || "x";
					if (preHash === compilation.hash) {
						recompilation = true;
						compilation.modifyHash(prepreHash);
						return;
					}
					records.prepreHash = records.hash || "x";
					records.preHash = compilation.hash;
					compilation.modifyHash(records.prepreHash);
				});
				compilation.hooks.shouldGenerateChunkAssets.tap(
					"HotModuleReplacementPlugin",
					() => {
						if (multiStep && !recompilation && !initialPass) return false;
					}
				);
				compilation.hooks.needAdditionalPass.tap(
					"HotModuleReplacementPlugin",
					() => {
						if (multiStep && !recompilation && !initialPass) return true;
					}
				);
				compilation.hooks.additionalChunkAssets.tap(
					"HotModuleReplacementPlugin",
					() => {
						const records = compilation.records;
						if (records.hash === compilation.hash) return;
						if (
							!records.moduleHashs ||
							!records.chunkHashs ||
							!records.chunkModuleIds
						)
							return;
						for (const module of compilation.modules) {
							const identifier = module.identifier();
							let hash = module.hash;
							module.hotUpdate = records.moduleHashs[identifier] !== hash;
						}
						const hotUpdateMainContent = {
							h: compilation.hash,
							c: {}
						};
						for (const key of Object.keys(records.chunkHashs)) {
							const chunkId = isNaN(+key) ? key : +key;
							const currentChunk = compilation.chunks.find(
								chunk => `${chunk.id}` === key
							);
							if (currentChunk) {
								const newModules = currentChunk
									.getModules()
									.filter(module => module.hotUpdate);
								const allModules = new Set();
								for (const module of currentChunk.modulesIterable) {
									allModules.add(module.id);
								}
								const removedModules = records.chunkModuleIds[chunkId].filter(
									id => !allModules.has(id)
								);
								if (newModules.length > 0 || removedModules.length > 0) {
									const source = hotUpdateChunkTemplate.render(
										chunkId,
										newModules,
										removedModules,
										compilation.hash,
										compilation.moduleTemplates.javascript,
										compilation.dependencyTemplates
									);
									const filename = compilation.getPath(hotUpdateChunkFilename, {
										hash: records.hash,
										chunk: currentChunk
									});
									compilation.additionalChunkAssets.push(filename);
									compilation.assets[filename] = source;
									hotUpdateMainContent.c[chunkId] = true;
									currentChunk.files.push(filename);
									compilation.hooks.chunkAsset.call(currentChunk, filename);
								}
							} else {
								hotUpdateMainContent.c[chunkId] = false;
							}
						}
						const source = new RawSource(JSON.stringify(hotUpdateMainContent));
						const filename = compilation.getPath(hotUpdateMainFilename, {
							hash: records.hash
						});
						compilation.assets[filename] = source;
					}
				);

				const mainTemplate = compilation.mainTemplate;

				mainTemplate.hooks.hash.tap("HotModuleReplacementPlugin", hash => {
					hash.update("HotMainTemplateDecorator");
				});

				mainTemplate.hooks.moduleRequire.tap(
					"HotModuleReplacementPlugin",
					(_, chunk, hash, varModuleId) => {
						return `hotCreateRequire(${varModuleId})`;
					}
				);

				mainTemplate.hooks.requireExtensions.tap(
					"HotModuleReplacementPlugin",
					source => {
						const buf = [source];
						buf.push("");
						buf.push("// __webpack_hash__");
						buf.push(
							mainTemplate.requireFn +
								".h = function() { return hotCurrentHash; };"
						);
						return Template.asString(buf);
					}
				);

				const needChunkLoadingCode = chunk => {
					for (const chunkGroup of chunk.groupsIterable) {
						if (chunkGroup.chunks.length > 1) return true;
						if (chunkGroup.getNumberOfChildren() > 0) return true;
					}
					return false;
				};

				mainTemplate.hooks.bootstrap.tap(
					"HotModuleReplacementPlugin",
					(source, chunk, hash) => {
						source = mainTemplate.hooks.hotBootstrap.call(source, chunk, hash);
						return Template.asString([
							source,
							"",
							hotInitCode
								.replace(/\$require\$/g, mainTemplate.requireFn)
								.replace(/\$hash\$/g, JSON.stringify(hash))
								.replace(/\$requestTimeout\$/g, requestTimeout)
								.replace(
									/\/\*foreachInstalledChunks\*\//g,
									needChunkLoadingCode(chunk)
										? "for(var chunkId in installedChunks)"
										: `var chunkId = ${JSON.stringify(chunk.id)};`
								)
						]);
					}
				);

				mainTemplate.hooks.globalHash.tap(
					"HotModuleReplacementPlugin",
					() => true
				);

				mainTemplate.hooks.currentHash.tap(
					"HotModuleReplacementPlugin",
					(_, length) => {
						if (isFinite(length)) {
							return `hotCurrentHash.substr(0, ${length})`;
						} else {
							return "hotCurrentHash";
						}
					}
				);

				mainTemplate.hooks.moduleObj.tap(
					"HotModuleReplacementPlugin",
					(source, chunk, hash, varModuleId) => {
						return Template.asString([
							`${source},`,
							`hot: hotCreateModule(${varModuleId}),`,
							"parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),",
							"children: []"
						]);
					}
				);

				// TODO add HMR support for javascript/esm
				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("HotModuleReplacementPlugin", addParserPlugins);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("HotModuleReplacementPlugin", addParserPlugins);

				compilation.hooks.normalModuleLoader.tap(
					"HotModuleReplacementPlugin",
					context => {
						context.hot = true;
					}
				);
			}
		);
	}
};

const hotInitCode = Template.getFunctionContent(
	require("./HotModuleReplacement.runtime")
);
