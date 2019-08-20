/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const ParserHelpers = require("../ParserHelpers");
const WebpackError = require("../WebpackError");

class SystemPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		compiler.hooks.compilation.tap(
			"SystemPlugin",
			(compilation, { normalModuleFactory }) => {
				const handler = (parser, parserOptions) => {
					if (parserOptions.system !== undefined && !parserOptions.system)
						return;

					const shouldWarn = parserOptions.system === undefined;

					const setNotSupported = name => {
						parser.hooks.evaluateTypeof
							.for(name)
							.tap("SystemPlugin", ParserHelpers.evaluateToString("undefined"));
						parser.hooks.expression
							.for(name)
							.tap(
								"SystemPlugin",
								ParserHelpers.expressionIsUnsupported(
									parser,
									name + " is not supported by webpack."
								)
							);
					};

					parser.hooks.typeof
						.for("System.import")
						.tap(
							"SystemPlugin",
							ParserHelpers.toConstantDependency(
								parser,
								JSON.stringify("function")
							)
						);
					parser.hooks.evaluateTypeof
						.for("System.import")
						.tap("SystemPlugin", ParserHelpers.evaluateToString("function"));
					parser.hooks.typeof
						.for("System")
						.tap(
							"SystemPlugin",
							ParserHelpers.toConstantDependency(
								parser,
								JSON.stringify("object")
							)
						);
					parser.hooks.evaluateTypeof
						.for("System")
						.tap("SystemPlugin", ParserHelpers.evaluateToString("object"));

					setNotSupported("System.set");
					setNotSupported("System.get");
					setNotSupported("System.register");

					parser.hooks.expression.for("System").tap("SystemPlugin", () => {
						const systemPolyfillRequire = ParserHelpers.requireFileAsExpression(
							parser.state.module.context,
							require.resolve("../../buildin/system")
						);
						return ParserHelpers.addParsedVariableToModule(
							parser,
							"System",
							systemPolyfillRequire
						);
					});

					parser.hooks.call.for("System.import").tap("SystemPlugin", expr => {
						if (shouldWarn) {
							parser.state.module.warnings.push(
								new SystemImportDeprecationWarning(
									parser.state.module,
									expr.loc
								)
							);
						}

						return parser.hooks.importCall.call(expr);
					});
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("SystemPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("SystemPlugin", handler);
			}
		);
	}
}

class SystemImportDeprecationWarning extends WebpackError {
	constructor(module, loc) {
		super(
			"System.import() is deprecated and will be removed soon. Use import() instead.\n" +
				"For more info visit https://webpack.js.org/guides/code-splitting/"
		);

		this.name = "SystemImportDeprecationWarning";

		this.module = module;
		this.loc = loc;

		Error.captureStackTrace(this, this.constructor);
	}
}

module.exports = SystemPlugin;
