/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const RequireEnsureItemDependency = require("./RequireEnsureItemDependency");
const RequireEnsureDependency = require("./RequireEnsureDependency");

const NullFactory = require("../NullFactory");

const RequireEnsureDependenciesBlockParserPlugin = require("./RequireEnsureDependenciesBlockParserPlugin");

const ParserHelpers = require("../ParserHelpers");

class RequireEnsurePlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"RequireEnsurePlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(
					RequireEnsureItemDependency,
					normalModuleFactory
				);
				compilation.dependencyTemplates.set(
					RequireEnsureItemDependency,
					new RequireEnsureItemDependency.Template()
				);

				compilation.dependencyFactories.set(
					RequireEnsureDependency,
					new NullFactory()
				);
				compilation.dependencyTemplates.set(
					RequireEnsureDependency,
					new RequireEnsureDependency.Template()
				);

				const handler = (parser, parserOptions) => {
					if (
						parserOptions.requireEnsure !== undefined &&
						!parserOptions.requireEnsure
					)
						return;

					new RequireEnsureDependenciesBlockParserPlugin().apply(parser);
					parser.hooks.evaluateTypeof
						.for("require.ensure")
						.tap(
							"RequireEnsurePlugin",
							ParserHelpers.evaluateToString("function")
						);
					parser.hooks.typeof
						.for("require.ensure")
						.tap(
							"RequireEnsurePlugin",
							ParserHelpers.toConstantDependency(
								parser,
								JSON.stringify("function")
							)
						);
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("RequireEnsurePlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("RequireEnsurePlugin", handler);
			}
		);
	}
}
module.exports = RequireEnsurePlugin;
