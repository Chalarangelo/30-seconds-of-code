/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const RequireIncludeDependency = require("./RequireIncludeDependency");

module.exports = class RequireIncludeDependencyParserPlugin {
	apply(parser) {
		parser.hooks.call
			.for("require.include")
			.tap("RequireIncludeDependencyParserPlugin", expr => {
				if (expr.arguments.length !== 1) return;
				const param = parser.evaluateExpression(expr.arguments[0]);
				if (!param.isString()) return;
				const dep = new RequireIncludeDependency(param.string, expr.range);
				dep.loc = expr.loc;
				parser.state.current.addDependency(dep);
				return true;
			});
	}
};
