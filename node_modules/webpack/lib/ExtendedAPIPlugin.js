/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Template = require("./Template");
const ConstDependency = require("./dependencies/ConstDependency");
const ParserHelpers = require("./ParserHelpers");
const NullFactory = require("./NullFactory");

const REPLACEMENTS = {
	// eslint-disable-next-line camelcase
	__webpack_hash__: "__webpack_require__.h",
	// eslint-disable-next-line camelcase
	__webpack_chunkname__: "__webpack_require__.cn"
};
const REPLACEMENT_TYPES = {
	// eslint-disable-next-line camelcase
	__webpack_hash__: "string",
	// eslint-disable-next-line camelcase
	__webpack_chunkname__: "string"
};

class ExtendedAPIPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"ExtendedAPIPlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(ConstDependency, new NullFactory());
				compilation.dependencyTemplates.set(
					ConstDependency,
					new ConstDependency.Template()
				);

				const mainTemplate = compilation.mainTemplate;
				mainTemplate.hooks.requireExtensions.tap(
					"ExtendedAPIPlugin",
					(source, chunk, hash) => {
						const buf = [source];
						buf.push("");
						buf.push("// __webpack_hash__");
						buf.push(`${mainTemplate.requireFn}.h = ${JSON.stringify(hash)};`);
						buf.push("");
						buf.push("// __webpack_chunkname__");
						buf.push(
							`${mainTemplate.requireFn}.cn = ${JSON.stringify(chunk.name)};`
						);
						return Template.asString(buf);
					}
				);
				mainTemplate.hooks.globalHash.tap("ExtendedAPIPlugin", () => true);

				const handler = (parser, parserOptions) => {
					Object.keys(REPLACEMENTS).forEach(key => {
						parser.hooks.expression
							.for(key)
							.tap(
								"ExtendedAPIPlugin",
								ParserHelpers.toConstantDependencyWithWebpackRequire(
									parser,
									REPLACEMENTS[key]
								)
							);
						parser.hooks.evaluateTypeof
							.for(key)
							.tap(
								"ExtendedAPIPlugin",
								ParserHelpers.evaluateToString(REPLACEMENT_TYPES[key])
							);
					});
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("ExtendedAPIPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("ExtendedAPIPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/esm")
					.tap("ExtendedAPIPlugin", handler);
			}
		);
	}
}

module.exports = ExtendedAPIPlugin;
