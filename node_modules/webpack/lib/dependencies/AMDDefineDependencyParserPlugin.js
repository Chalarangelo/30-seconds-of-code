/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const AMDRequireItemDependency = require("./AMDRequireItemDependency");
const AMDRequireContextDependency = require("./AMDRequireContextDependency");
const ConstDependency = require("./ConstDependency");
const AMDDefineDependency = require("./AMDDefineDependency");
const AMDRequireArrayDependency = require("./AMDRequireArrayDependency");
const LocalModuleDependency = require("./LocalModuleDependency");
const ContextDependencyHelpers = require("./ContextDependencyHelpers");
const LocalModulesHelpers = require("./LocalModulesHelpers");

const isBoundFunctionExpression = expr => {
	if (expr.type !== "CallExpression") return false;
	if (expr.callee.type !== "MemberExpression") return false;
	if (expr.callee.computed) return false;
	if (expr.callee.object.type !== "FunctionExpression") return false;
	if (expr.callee.property.type !== "Identifier") return false;
	if (expr.callee.property.name !== "bind") return false;
	return true;
};

const isUnboundFunctionExpression = expr => {
	if (expr.type === "FunctionExpression") return true;
	if (expr.type === "ArrowFunctionExpression") return true;
	return false;
};

const isCallable = expr => {
	if (isUnboundFunctionExpression(expr)) return true;
	if (isBoundFunctionExpression(expr)) return true;
	return false;
};

class AMDDefineDependencyParserPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(parser) {
		parser.hooks.call
			.for("define")
			.tap(
				"AMDDefineDependencyParserPlugin",
				this.processCallDefine.bind(this, parser)
			);
	}

	processArray(parser, expr, param, identifiers, namedModule) {
		if (param.isArray()) {
			param.items.forEach((param, idx) => {
				if (
					param.isString() &&
					["require", "module", "exports"].includes(param.string)
				)
					identifiers[idx] = param.string;
				const result = this.processItem(parser, expr, param, namedModule);
				if (result === undefined) {
					this.processContext(parser, expr, param);
				}
			});
			return true;
		} else if (param.isConstArray()) {
			const deps = [];
			param.array.forEach((request, idx) => {
				let dep;
				let localModule;
				if (request === "require") {
					identifiers[idx] = request;
					dep = "__webpack_require__";
				} else if (["exports", "module"].includes(request)) {
					identifiers[idx] = request;
					dep = request;
				} else if (
					(localModule = LocalModulesHelpers.getLocalModule(
						parser.state,
						request
					))
				) {
					dep = new LocalModuleDependency(localModule, undefined, false);
					dep.loc = expr.loc;
					parser.state.current.addDependency(dep);
				} else {
					dep = this.newRequireItemDependency(request);
					dep.loc = expr.loc;
					dep.optional = !!parser.scope.inTry;
					parser.state.current.addDependency(dep);
				}
				deps.push(dep);
			});
			const dep = this.newRequireArrayDependency(deps, param.range);
			dep.loc = expr.loc;
			dep.optional = !!parser.scope.inTry;
			parser.state.current.addDependency(dep);
			return true;
		}
	}
	processItem(parser, expr, param, namedModule) {
		if (param.isConditional()) {
			param.options.forEach(param => {
				const result = this.processItem(parser, expr, param);
				if (result === undefined) {
					this.processContext(parser, expr, param);
				}
			});
			return true;
		} else if (param.isString()) {
			let dep, localModule;
			if (param.string === "require") {
				dep = new ConstDependency("__webpack_require__", param.range);
			} else if (["require", "exports", "module"].includes(param.string)) {
				dep = new ConstDependency(param.string, param.range);
			} else if (
				(localModule = LocalModulesHelpers.getLocalModule(
					parser.state,
					param.string,
					namedModule
				))
			) {
				dep = new LocalModuleDependency(localModule, param.range, false);
			} else {
				dep = this.newRequireItemDependency(param.string, param.range);
			}
			dep.loc = expr.loc;
			dep.optional = !!parser.scope.inTry;
			parser.state.current.addDependency(dep);
			return true;
		}
	}
	processContext(parser, expr, param) {
		const dep = ContextDependencyHelpers.create(
			AMDRequireContextDependency,
			param.range,
			param,
			expr,
			this.options,
			{},
			parser
		);
		if (!dep) return;
		dep.loc = expr.loc;
		dep.optional = !!parser.scope.inTry;
		parser.state.current.addDependency(dep);
		return true;
	}

	processCallDefine(parser, expr) {
		let array, fn, obj, namedModule;
		switch (expr.arguments.length) {
			case 1:
				if (isCallable(expr.arguments[0])) {
					// define(f() {…})
					fn = expr.arguments[0];
				} else if (expr.arguments[0].type === "ObjectExpression") {
					// define({…})
					obj = expr.arguments[0];
				} else {
					// define(expr)
					// unclear if function or object
					obj = fn = expr.arguments[0];
				}
				break;
			case 2:
				if (expr.arguments[0].type === "Literal") {
					namedModule = expr.arguments[0].value;
					// define("…", …)
					if (isCallable(expr.arguments[1])) {
						// define("…", f() {…})
						fn = expr.arguments[1];
					} else if (expr.arguments[1].type === "ObjectExpression") {
						// define("…", {…})
						obj = expr.arguments[1];
					} else {
						// define("…", expr)
						// unclear if function or object
						obj = fn = expr.arguments[1];
					}
				} else {
					array = expr.arguments[0];
					if (isCallable(expr.arguments[1])) {
						// define([…], f() {})
						fn = expr.arguments[1];
					} else if (expr.arguments[1].type === "ObjectExpression") {
						// define([…], {…})
						obj = expr.arguments[1];
					} else {
						// define([…], expr)
						// unclear if function or object
						obj = fn = expr.arguments[1];
					}
				}
				break;
			case 3:
				// define("…", […], f() {…})
				namedModule = expr.arguments[0].value;
				array = expr.arguments[1];
				if (isCallable(expr.arguments[2])) {
					// define("…", […], f() {})
					fn = expr.arguments[2];
				} else if (expr.arguments[2].type === "ObjectExpression") {
					// define("…", […], {…})
					obj = expr.arguments[2];
				} else {
					// define("…", […], expr)
					// unclear if function or object
					obj = fn = expr.arguments[2];
				}
				break;
			default:
				return;
		}
		let fnParams = null;
		let fnParamsOffset = 0;
		if (fn) {
			if (isUnboundFunctionExpression(fn)) {
				fnParams = fn.params;
			} else if (isBoundFunctionExpression(fn)) {
				fnParams = fn.callee.object.params;
				fnParamsOffset = fn.arguments.length - 1;
				if (fnParamsOffset < 0) {
					fnParamsOffset = 0;
				}
			}
		}
		let fnRenames = parser.scope.renames.createChild();
		if (array) {
			const identifiers = {};
			const param = parser.evaluateExpression(array);
			const result = this.processArray(
				parser,
				expr,
				param,
				identifiers,
				namedModule
			);
			if (!result) return;
			if (fnParams) {
				fnParams = fnParams.slice(fnParamsOffset).filter((param, idx) => {
					if (identifiers[idx]) {
						fnRenames.set(param.name, identifiers[idx]);
						return false;
					}
					return true;
				});
			}
		} else {
			const identifiers = ["require", "exports", "module"];
			if (fnParams) {
				fnParams = fnParams.slice(fnParamsOffset).filter((param, idx) => {
					if (identifiers[idx]) {
						fnRenames.set(param.name, identifiers[idx]);
						return false;
					}
					return true;
				});
			}
		}
		let inTry;
		if (fn && isUnboundFunctionExpression(fn)) {
			inTry = parser.scope.inTry;
			parser.inScope(fnParams, () => {
				parser.scope.renames = fnRenames;
				parser.scope.inTry = inTry;
				if (fn.body.type === "BlockStatement") {
					parser.walkStatement(fn.body);
				} else {
					parser.walkExpression(fn.body);
				}
			});
		} else if (fn && isBoundFunctionExpression(fn)) {
			inTry = parser.scope.inTry;
			parser.inScope(
				fn.callee.object.params.filter(
					i => !["require", "module", "exports"].includes(i.name)
				),
				() => {
					parser.scope.renames = fnRenames;
					parser.scope.inTry = inTry;
					if (fn.callee.object.body.type === "BlockStatement") {
						parser.walkStatement(fn.callee.object.body);
					} else {
						parser.walkExpression(fn.callee.object.body);
					}
				}
			);
			if (fn.arguments) {
				parser.walkExpressions(fn.arguments);
			}
		} else if (fn || obj) {
			parser.walkExpression(fn || obj);
		}

		const dep = this.newDefineDependency(
			expr.range,
			array ? array.range : null,
			fn ? fn.range : null,
			obj ? obj.range : null,
			namedModule ? namedModule : null
		);
		dep.loc = expr.loc;
		if (namedModule) {
			dep.localModule = LocalModulesHelpers.addLocalModule(
				parser.state,
				namedModule
			);
		}
		parser.state.current.addDependency(dep);
		return true;
	}

	newDefineDependency(
		range,
		arrayRange,
		functionRange,
		objectRange,
		namedModule
	) {
		return new AMDDefineDependency(
			range,
			arrayRange,
			functionRange,
			objectRange,
			namedModule
		);
	}
	newRequireArrayDependency(depsArray, range) {
		return new AMDRequireArrayDependency(depsArray, range);
	}
	newRequireItemDependency(request, range) {
		return new AMDRequireItemDependency(request, range);
	}
}
module.exports = AMDDefineDependencyParserPlugin;
