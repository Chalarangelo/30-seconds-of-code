/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const RequireIncludeDependency = require("./RequireIncludeDependency");
const RequireIncludeDependencyParserPlugin = require("./RequireIncludeDependencyParserPlugin");

const ParserHelpers = require("../ParserHelpers");

class RequireIncludePlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"RequireIncludePlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(
					RequireIncludeDependency,
					normalModuleFactory
				);
				compilation.dependencyTemplates.set(
					RequireIncludeDependency,
					new RequireIncludeDependency.Template()
				);

				const handler = (parser, parserOptions) => {
					if (
						parserOptions.requireInclude !== undefined &&
						!parserOptions.requireInclude
					)
						return;

					new RequireIncludeDependencyParserPlugin().apply(parser);
					parser.hooks.evaluateTypeof
						.for("require.include")
						.tap(
							"RequireIncludePlugin",
							ParserHelpers.evaluateToString("function")
						);
					parser.hooks.typeof
						.for("require.include")
						.tap(
							"RequireIncludePlugin",
							ParserHelpers.toConstantDependency(
								parser,
								JSON.stringify("function")
							)
						);
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("RequireIncludePlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("RequireIncludePlugin", handler);
			}
		);
	}
}
module.exports = RequireIncludePlugin;
