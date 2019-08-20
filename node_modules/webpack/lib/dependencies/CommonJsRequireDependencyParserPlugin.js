/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const CommonJsRequireDependency = require("./CommonJsRequireDependency");
const CommonJsRequireContextDependency = require("./CommonJsRequireContextDependency");
const RequireHeaderDependency = require("./RequireHeaderDependency");
const LocalModuleDependency = require("./LocalModuleDependency");
const ContextDependencyHelpers = require("./ContextDependencyHelpers");
const LocalModulesHelpers = require("./LocalModulesHelpers");
const ParserHelpers = require("../ParserHelpers");

class CommonJsRequireDependencyParserPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(parser) {
		const options = this.options;

		const processItem = (expr, param) => {
			if (param.isString()) {
				const dep = new CommonJsRequireDependency(param.string, param.range);
				dep.loc = expr.loc;
				dep.optional = !!parser.scope.inTry;
				parser.state.current.addDependency(dep);
				return true;
			}
		};
		const processContext = (expr, param) => {
			const dep = ContextDependencyHelpers.create(
				CommonJsRequireContextDependency,
				expr.range,
				param,
				expr,
				options,
				{},
				parser
			);
			if (!dep) return;
			dep.loc = expr.loc;
			dep.optional = !!parser.scope.inTry;
			parser.state.current.addDependency(dep);
			return true;
		};

		parser.hooks.expression
			.for("require.cache")
			.tap(
				"CommonJsRequireDependencyParserPlugin",
				ParserHelpers.toConstantDependencyWithWebpackRequire(
					parser,
					"__webpack_require__.c"
				)
			);
		parser.hooks.expression
			.for("require")
			.tap("CommonJsRequireDependencyParserPlugin", expr => {
				const dep = new CommonJsRequireContextDependency(
					{
						request: options.unknownContextRequest,
						recursive: options.unknownContextRecursive,
						regExp: options.unknownContextRegExp,
						mode: "sync"
					},
					expr.range
				);
				dep.critical =
					options.unknownContextCritical &&
					"require function is used in a way in which dependencies cannot be statically extracted";
				dep.loc = expr.loc;
				dep.optional = !!parser.scope.inTry;
				parser.state.current.addDependency(dep);
				return true;
			});

		const createHandler = callNew => expr => {
			if (expr.arguments.length !== 1) return;
			let localModule;
			const param = parser.evaluateExpression(expr.arguments[0]);
			if (param.isConditional()) {
				let isExpression = false;
				const prevLength = parser.state.current.dependencies.length;
				const dep = new RequireHeaderDependency(expr.callee.range);
				dep.loc = expr.loc;
				parser.state.current.addDependency(dep);
				for (const p of param.options) {
					const result = processItem(expr, p);
					if (result === undefined) {
						isExpression = true;
					}
				}
				if (isExpression) {
					parser.state.current.dependencies.length = prevLength;
				} else {
					return true;
				}
			}
			if (
				param.isString() &&
				(localModule = LocalModulesHelpers.getLocalModule(
					parser.state,
					param.string
				))
			) {
				const dep = new LocalModuleDependency(localModule, expr.range, callNew);
				dep.loc = expr.loc;
				parser.state.current.addDependency(dep);
				return true;
			} else {
				const result = processItem(expr, param);
				if (result === undefined) {
					processContext(expr, param);
				} else {
					const dep = new RequireHeaderDependency(expr.callee.range);
					dep.loc = expr.loc;
					parser.state.current.addDependency(dep);
				}
				return true;
			}
		};
		parser.hooks.call
			.for("require")
			.tap("CommonJsRequireDependencyParserPlugin", createHandler(false));
		parser.hooks.new
			.for("require")
			.tap("CommonJsRequireDependencyParserPlugin", createHandler(true));
		parser.hooks.call
			.for("module.require")
			.tap("CommonJsRequireDependencyParserPlugin", createHandler(false));
		parser.hooks.new
			.for("module.require")
			.tap("CommonJsRequireDependencyParserPlugin", createHandler(true));
	}
}
module.exports = CommonJsRequireDependencyParserPlugin;
