/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const path = require("path");
const ParserHelpers = require("./ParserHelpers");
const ConstDependency = require("./dependencies/ConstDependency");

const NullFactory = require("./NullFactory");

class NodeStuffPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		const options = this.options;
		compiler.hooks.compilation.tap(
			"NodeStuffPlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(ConstDependency, new NullFactory());
				compilation.dependencyTemplates.set(
					ConstDependency,
					new ConstDependency.Template()
				);

				const handler = (parser, parserOptions) => {
					if (parserOptions.node === false) return;

					let localOptions = options;
					if (parserOptions.node) {
						localOptions = Object.assign({}, localOptions, parserOptions.node);
					}

					const setConstant = (expressionName, value) => {
						parser.hooks.expression
							.for(expressionName)
							.tap("NodeStuffPlugin", () => {
								parser.state.current.addVariable(
									expressionName,
									JSON.stringify(value)
								);
								return true;
							});
					};

					const setModuleConstant = (expressionName, fn) => {
						parser.hooks.expression
							.for(expressionName)
							.tap("NodeStuffPlugin", () => {
								parser.state.current.addVariable(
									expressionName,
									JSON.stringify(fn(parser.state.module))
								);
								return true;
							});
					};
					const context = compiler.context;
					if (localOptions.__filename === "mock") {
						setConstant("__filename", "/index.js");
					} else if (localOptions.__filename) {
						setModuleConstant("__filename", module =>
							path.relative(context, module.resource)
						);
					}
					parser.hooks.evaluateIdentifier
						.for("__filename")
						.tap("NodeStuffPlugin", expr => {
							if (!parser.state.module) return;
							const resource = parser.state.module.resource;
							const i = resource.indexOf("?");
							return ParserHelpers.evaluateToString(
								i < 0 ? resource : resource.substr(0, i)
							)(expr);
						});
					if (localOptions.__dirname === "mock") {
						setConstant("__dirname", "/");
					} else if (localOptions.__dirname) {
						setModuleConstant("__dirname", module =>
							path.relative(context, module.context)
						);
					}
					parser.hooks.evaluateIdentifier
						.for("__dirname")
						.tap("NodeStuffPlugin", expr => {
							if (!parser.state.module) return;
							return ParserHelpers.evaluateToString(
								parser.state.module.context
							)(expr);
						});
					parser.hooks.expression
						.for("require.main")
						.tap(
							"NodeStuffPlugin",
							ParserHelpers.toConstantDependencyWithWebpackRequire(
								parser,
								"__webpack_require__.c[__webpack_require__.s]"
							)
						);
					parser.hooks.expression
						.for("require.extensions")
						.tap(
							"NodeStuffPlugin",
							ParserHelpers.expressionIsUnsupported(
								parser,
								"require.extensions is not supported by webpack. Use a loader instead."
							)
						);
					parser.hooks.expression
						.for("require.main.require")
						.tap(
							"NodeStuffPlugin",
							ParserHelpers.expressionIsUnsupported(
								parser,
								"require.main.require is not supported by webpack."
							)
						);
					parser.hooks.expression
						.for("module.parent.require")
						.tap(
							"NodeStuffPlugin",
							ParserHelpers.expressionIsUnsupported(
								parser,
								"module.parent.require is not supported by webpack."
							)
						);
					parser.hooks.expression
						.for("module.loaded")
						.tap("NodeStuffPlugin", expr => {
							parser.state.module.buildMeta.moduleConcatenationBailout =
								"module.loaded";
							return ParserHelpers.toConstantDependency(parser, "module.l")(
								expr
							);
						});
					parser.hooks.expression
						.for("module.id")
						.tap("NodeStuffPlugin", expr => {
							parser.state.module.buildMeta.moduleConcatenationBailout =
								"module.id";
							return ParserHelpers.toConstantDependency(parser, "module.i")(
								expr
							);
						});
					parser.hooks.expression
						.for("module.exports")
						.tap("NodeStuffPlugin", () => {
							const module = parser.state.module;
							const isHarmony =
								module.buildMeta && module.buildMeta.exportsType;
							if (!isHarmony) return true;
						});
					parser.hooks.evaluateIdentifier
						.for("module.hot")
						.tap(
							"NodeStuffPlugin",
							ParserHelpers.evaluateToIdentifier("module.hot", false)
						);
					parser.hooks.expression.for("module").tap("NodeStuffPlugin", () => {
						const module = parser.state.module;
						const isHarmony = module.buildMeta && module.buildMeta.exportsType;
						let moduleJsPath = path.join(
							__dirname,
							"..",
							"buildin",
							isHarmony ? "harmony-module.js" : "module.js"
						);
						if (module.context) {
							moduleJsPath = path.relative(
								parser.state.module.context,
								moduleJsPath
							);
							if (!/^[A-Z]:/i.test(moduleJsPath)) {
								moduleJsPath = `./${moduleJsPath.replace(/\\/g, "/")}`;
							}
						}
						return ParserHelpers.addParsedVariableToModule(
							parser,
							"module",
							`require(${JSON.stringify(moduleJsPath)})(module)`
						);
					});
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("NodeStuffPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("NodeStuffPlugin", handler);
			}
		);
	}
}
module.exports = NodeStuffPlugin;
