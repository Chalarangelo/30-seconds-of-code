/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const ConstDependency = require("./dependencies/ConstDependency");

/** @typedef {import("./Compiler")} Compiler */

class UseStrictPlugin {
	/**
	 * @param {Compiler} compiler Webpack Compiler
	 * @returns {void}
	 */
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"UseStrictPlugin",
			(compilation, { normalModuleFactory }) => {
				const handler = parser => {
					parser.hooks.program.tap("UseStrictPlugin", ast => {
						const firstNode = ast.body[0];
						if (
							firstNode &&
							firstNode.type === "ExpressionStatement" &&
							firstNode.expression.type === "Literal" &&
							firstNode.expression.value === "use strict"
						) {
							// Remove "use strict" expression. It will be added later by the renderer again.
							// This is necessary in order to not break the strict mode when webpack prepends code.
							// @see https://github.com/webpack/webpack/issues/1970
							const dep = new ConstDependency("", firstNode.range);
							dep.loc = firstNode.loc;
							parser.state.current.addDependency(dep);
							parser.state.module.buildInfo.strict = true;
						}
					});
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("UseStrictPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("UseStrictPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/esm")
					.tap("UseStrictPlugin", handler);
			}
		);
	}
}

module.exports = UseStrictPlugin;
