/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const ParserHelpers = require("./ParserHelpers");
const ConstDependency = require("./dependencies/ConstDependency");

const NullFactory = require("./NullFactory");

class ProvidePlugin {
	constructor(definitions) {
		this.definitions = definitions;
	}

	apply(compiler) {
		const definitions = this.definitions;
		compiler.hooks.compilation.tap(
			"ProvidePlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(ConstDependency, new NullFactory());
				compilation.dependencyTemplates.set(
					ConstDependency,
					new ConstDependency.Template()
				);
				const handler = (parser, parserOptions) => {
					Object.keys(definitions).forEach(name => {
						var request = [].concat(definitions[name]);
						var splittedName = name.split(".");
						if (splittedName.length > 0) {
							splittedName.slice(1).forEach((_, i) => {
								const name = splittedName.slice(0, i + 1).join(".");
								parser.hooks.canRename
									.for(name)
									.tap("ProvidePlugin", ParserHelpers.approve);
							});
						}
						parser.hooks.expression.for(name).tap("ProvidePlugin", expr => {
							let nameIdentifier = name;
							const scopedName = name.includes(".");
							let expression = `require(${JSON.stringify(request[0])})`;
							if (scopedName) {
								nameIdentifier = `__webpack_provided_${name.replace(
									/\./g,
									"_dot_"
								)}`;
							}
							if (request.length > 1) {
								expression += request
									.slice(1)
									.map(r => `[${JSON.stringify(r)}]`)
									.join("");
							}
							if (
								!ParserHelpers.addParsedVariableToModule(
									parser,
									nameIdentifier,
									expression
								)
							) {
								return false;
							}
							if (scopedName) {
								ParserHelpers.toConstantDependency(parser, nameIdentifier)(
									expr
								);
							}
							return true;
						});
					});
				};
				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("ProvidePlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("ProvidePlugin", handler);

				// Disable ProvidePlugin for javascript/esm, see https://github.com/webpack/webpack/issues/7032
			}
		);
	}
}
module.exports = ProvidePlugin;
