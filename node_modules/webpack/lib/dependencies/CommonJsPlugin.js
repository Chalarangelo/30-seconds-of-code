/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const ConstDependency = require("./ConstDependency");
const CommonJsRequireDependency = require("./CommonJsRequireDependency");
const CommonJsRequireContextDependency = require("./CommonJsRequireContextDependency");
const RequireResolveDependency = require("./RequireResolveDependency");
const RequireResolveContextDependency = require("./RequireResolveContextDependency");
const RequireResolveHeaderDependency = require("./RequireResolveHeaderDependency");
const RequireHeaderDependency = require("./RequireHeaderDependency");

const NullFactory = require("../NullFactory");

const RequireResolveDependencyParserPlugin = require("./RequireResolveDependencyParserPlugin");
const CommonJsRequireDependencyParserPlugin = require("./CommonJsRequireDependencyParserPlugin");

const ParserHelpers = require("../ParserHelpers");

class CommonJsPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		const options = this.options;
		compiler.hooks.compilation.tap(
			"CommonJsPlugin",
			(compilation, { contextModuleFactory, normalModuleFactory }) => {
				compilation.dependencyFactories.set(
					CommonJsRequireDependency,
					normalModuleFactory
				);
				compilation.dependencyTemplates.set(
					CommonJsRequireDependency,
					new CommonJsRequireDependency.Template()
				);

				compilation.dependencyFactories.set(
					CommonJsRequireContextDependency,
					contextModuleFactory
				);
				compilation.dependencyTemplates.set(
					CommonJsRequireContextDependency,
					new CommonJsRequireContextDependency.Template()
				);

				compilation.dependencyFactories.set(
					RequireResolveDependency,
					normalModuleFactory
				);
				compilation.dependencyTemplates.set(
					RequireResolveDependency,
					new RequireResolveDependency.Template()
				);

				compilation.dependencyFactories.set(
					RequireResolveContextDependency,
					contextModuleFactory
				);
				compilation.dependencyTemplates.set(
					RequireResolveContextDependency,
					new RequireResolveContextDependency.Template()
				);

				compilation.dependencyFactories.set(
					RequireResolveHeaderDependency,
					new NullFactory()
				);
				compilation.dependencyTemplates.set(
					RequireResolveHeaderDependency,
					new RequireResolveHeaderDependency.Template()
				);

				compilation.dependencyFactories.set(
					RequireHeaderDependency,
					new NullFactory()
				);
				compilation.dependencyTemplates.set(
					RequireHeaderDependency,
					new RequireHeaderDependency.Template()
				);

				const handler = (parser, parserOptions) => {
					if (parserOptions.commonjs !== undefined && !parserOptions.commonjs)
						return;

					const requireExpressions = [
						"require",
						"require.resolve",
						"require.resolveWeak"
					];
					for (let expression of requireExpressions) {
						parser.hooks.typeof
							.for(expression)
							.tap(
								"CommonJsPlugin",
								ParserHelpers.toConstantDependency(
									parser,
									JSON.stringify("function")
								)
							);
						parser.hooks.evaluateTypeof
							.for(expression)
							.tap(
								"CommonJsPlugin",
								ParserHelpers.evaluateToString("function")
							);
						parser.hooks.evaluateIdentifier
							.for(expression)
							.tap(
								"CommonJsPlugin",
								ParserHelpers.evaluateToIdentifier(expression, true)
							);
					}

					parser.hooks.evaluateTypeof
						.for("module")
						.tap("CommonJsPlugin", ParserHelpers.evaluateToString("object"));
					parser.hooks.assign.for("require").tap("CommonJsPlugin", expr => {
						// to not leak to global "require", we need to define a local require here.
						const dep = new ConstDependency("var require;", 0);
						dep.loc = expr.loc;
						parser.state.current.addDependency(dep);
						parser.scope.definitions.add("require");
						return true;
					});
					parser.hooks.canRename
						.for("require")
						.tap("CommonJsPlugin", () => true);
					parser.hooks.rename.for("require").tap("CommonJsPlugin", expr => {
						// define the require variable. It's still undefined, but not "not defined".
						const dep = new ConstDependency("var require;", 0);
						dep.loc = expr.loc;
						parser.state.current.addDependency(dep);
						return false;
					});
					parser.hooks.typeof.for("module").tap("CommonJsPlugin", () => true);
					parser.hooks.evaluateTypeof
						.for("exports")
						.tap("CommonJsPlugin", ParserHelpers.evaluateToString("object"));

					new CommonJsRequireDependencyParserPlugin(options).apply(parser);
					new RequireResolveDependencyParserPlugin(options).apply(parser);
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("CommonJsPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("CommonJsPlugin", handler);
			}
		);
	}
}
module.exports = CommonJsPlugin;
