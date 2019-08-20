/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const RequireResolveDependency = require("./RequireResolveDependency");
const RequireResolveContextDependency = require("./RequireResolveContextDependency");
const RequireResolveHeaderDependency = require("./RequireResolveHeaderDependency");
const ContextDependencyHelpers = require("./ContextDependencyHelpers");

class RequireResolveDependencyParserPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(parser) {
		const options = this.options;

		const process = (expr, weak) => {
			if (expr.arguments.length !== 1) return;
			const param = parser.evaluateExpression(expr.arguments[0]);
			if (param.isConditional()) {
				for (const option of param.options) {
					const result = processItem(expr, option, weak);
					if (result === undefined) {
						processContext(expr, option, weak);
					}
				}
				const dep = new RequireResolveHeaderDependency(expr.callee.range);
				dep.loc = expr.loc;
				parser.state.current.addDependency(dep);
				return true;
			} else {
				const result = processItem(expr, param, weak);
				if (result === undefined) {
					processContext(expr, param, weak);
				}
				const dep = new RequireResolveHeaderDependency(expr.callee.range);
				dep.loc = expr.loc;
				parser.state.current.addDependency(dep);
				return true;
			}
		};
		const processItem = (expr, param, weak) => {
			if (param.isString()) {
				const dep = new RequireResolveDependency(param.string, param.range);
				dep.loc = expr.loc;
				dep.optional = !!parser.scope.inTry;
				dep.weak = weak;
				parser.state.current.addDependency(dep);
				return true;
			}
		};
		const processContext = (expr, param, weak) => {
			const dep = ContextDependencyHelpers.create(
				RequireResolveContextDependency,
				param.range,
				param,
				expr,
				options,
				{
					mode: weak ? "weak" : "sync"
				},
				parser
			);
			if (!dep) return;
			dep.loc = expr.loc;
			dep.optional = !!parser.scope.inTry;
			parser.state.current.addDependency(dep);
			return true;
		};

		parser.hooks.call
			.for("require.resolve")
			.tap("RequireResolveDependencyParserPlugin", expr => {
				return process(expr, false);
			});
		parser.hooks.call
			.for("require.resolveWeak")
			.tap("RequireResolveDependencyParserPlugin", expr => {
				return process(expr, true);
			});
	}
}
module.exports = RequireResolveDependencyParserPlugin;
