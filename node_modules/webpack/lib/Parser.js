/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

// Syntax: https://developer.mozilla.org/en/SpiderMonkey/Parser_API

const acorn = require("acorn-dynamic-import").default;
const { Tapable, SyncBailHook, HookMap } = require("tapable");
const util = require("util");
const vm = require("vm");
const BasicEvaluatedExpression = require("./BasicEvaluatedExpression");
const StackedSetMap = require("./util/StackedSetMap");
const TrackingSet = require("./util/TrackingSet");

const joinRanges = (startRange, endRange) => {
	if (!endRange) return startRange;
	if (!startRange) return endRange;
	return [startRange[0], endRange[1]];
};

const defaultParserOptions = {
	ranges: true,
	locations: true,
	ecmaVersion: 2019,
	sourceType: "module",
	onComment: null,
	plugins: {
		dynamicImport: true
	}
};

// regexp to match at lease one "magic comment"
const webpackCommentRegExp = new RegExp(/(^|\W)webpack[A-Z]{1,}[A-Za-z]{1,}:/);

const EMPTY_ARRAY = [];

const EMPTY_COMMENT_OPTIONS = {
	options: null,
	errors: null
};

class Parser extends Tapable {
	constructor(options, sourceType = "auto") {
		super();
		this.hooks = {
			evaluateTypeof: new HookMap(() => new SyncBailHook(["expression"])),
			evaluate: new HookMap(() => new SyncBailHook(["expression"])),
			evaluateIdentifier: new HookMap(() => new SyncBailHook(["expression"])),
			evaluateDefinedIdentifier: new HookMap(
				() => new SyncBailHook(["expression"])
			),
			evaluateCallExpressionMember: new HookMap(
				() => new SyncBailHook(["expression", "param"])
			),
			statement: new SyncBailHook(["statement"]),
			statementIf: new SyncBailHook(["statement"]),
			label: new HookMap(() => new SyncBailHook(["statement"])),
			import: new SyncBailHook(["statement", "source"]),
			importSpecifier: new SyncBailHook([
				"statement",
				"source",
				"exportName",
				"identifierName"
			]),
			export: new SyncBailHook(["statement"]),
			exportImport: new SyncBailHook(["statement", "source"]),
			exportDeclaration: new SyncBailHook(["statement", "declaration"]),
			exportExpression: new SyncBailHook(["statement", "declaration"]),
			exportSpecifier: new SyncBailHook([
				"statement",
				"identifierName",
				"exportName",
				"index"
			]),
			exportImportSpecifier: new SyncBailHook([
				"statement",
				"source",
				"identifierName",
				"exportName",
				"index"
			]),
			varDeclaration: new HookMap(() => new SyncBailHook(["declaration"])),
			varDeclarationLet: new HookMap(() => new SyncBailHook(["declaration"])),
			varDeclarationConst: new HookMap(() => new SyncBailHook(["declaration"])),
			varDeclarationVar: new HookMap(() => new SyncBailHook(["declaration"])),
			canRename: new HookMap(() => new SyncBailHook(["initExpression"])),
			rename: new HookMap(() => new SyncBailHook(["initExpression"])),
			assigned: new HookMap(() => new SyncBailHook(["expression"])),
			assign: new HookMap(() => new SyncBailHook(["expression"])),
			typeof: new HookMap(() => new SyncBailHook(["expression"])),
			importCall: new SyncBailHook(["expression"]),
			call: new HookMap(() => new SyncBailHook(["expression"])),
			callAnyMember: new HookMap(() => new SyncBailHook(["expression"])),
			new: new HookMap(() => new SyncBailHook(["expression"])),
			expression: new HookMap(() => new SyncBailHook(["expression"])),
			expressionAnyMember: new HookMap(() => new SyncBailHook(["expression"])),
			expressionConditionalOperator: new SyncBailHook(["expression"]),
			expressionLogicalOperator: new SyncBailHook(["expression"]),
			program: new SyncBailHook(["ast", "comments"])
		};
		const HOOK_MAP_COMPAT_CONFIG = {
			evaluateTypeof: /^evaluate typeof (.+)$/,
			evaluateIdentifier: /^evaluate Identifier (.+)$/,
			evaluateDefinedIdentifier: /^evaluate defined Identifier (.+)$/,
			evaluateCallExpressionMember: /^evaluate CallExpression .(.+)$/,
			evaluate: /^evaluate (.+)$/,
			label: /^label (.+)$/,
			varDeclarationLet: /^var-let (.+)$/,
			varDeclarationConst: /^var-const (.+)$/,
			varDeclarationVar: /^var-var (.+)$/,
			varDeclaration: /^var (.+)$/,
			canRename: /^can-rename (.+)$/,
			rename: /^rename (.+)$/,
			typeof: /^typeof (.+)$/,
			assigned: /^assigned (.+)$/,
			assign: /^assign (.+)$/,
			callAnyMember: /^call (.+)\.\*$/,
			call: /^call (.+)$/,
			new: /^new (.+)$/,
			expressionConditionalOperator: /^expression \?:$/,
			expressionAnyMember: /^expression (.+)\.\*$/,
			expression: /^expression (.+)$/
		};
		this._pluginCompat.tap("Parser", options => {
			for (const name of Object.keys(HOOK_MAP_COMPAT_CONFIG)) {
				const regexp = HOOK_MAP_COMPAT_CONFIG[name];
				const match = regexp.exec(options.name);
				if (match) {
					if (match[1]) {
						this.hooks[name].tap(
							match[1],
							options.fn.name || "unnamed compat plugin",
							options.fn.bind(this)
						);
					} else {
						this.hooks[name].tap(
							options.fn.name || "unnamed compat plugin",
							options.fn.bind(this)
						);
					}
					return true;
				}
			}
		});
		this.options = options;
		this.sourceType = sourceType;
		this.scope = undefined;
		this.state = undefined;
		this.comments = undefined;
		this.initializeEvaluating();
	}

	initializeEvaluating() {
		this.hooks.evaluate.for("Literal").tap("Parser", expr => {
			switch (typeof expr.value) {
				case "number":
					return new BasicEvaluatedExpression()
						.setNumber(expr.value)
						.setRange(expr.range);
				case "string":
					return new BasicEvaluatedExpression()
						.setString(expr.value)
						.setRange(expr.range);
				case "boolean":
					return new BasicEvaluatedExpression()
						.setBoolean(expr.value)
						.setRange(expr.range);
			}
			if (expr.value === null) {
				return new BasicEvaluatedExpression().setNull().setRange(expr.range);
			}
			if (expr.value instanceof RegExp) {
				return new BasicEvaluatedExpression()
					.setRegExp(expr.value)
					.setRange(expr.range);
			}
		});
		this.hooks.evaluate.for("LogicalExpression").tap("Parser", expr => {
			let left;
			let leftAsBool;
			let right;
			if (expr.operator === "&&") {
				left = this.evaluateExpression(expr.left);
				leftAsBool = left && left.asBool();
				if (leftAsBool === false) return left.setRange(expr.range);
				if (leftAsBool !== true) return;
				right = this.evaluateExpression(expr.right);
				return right.setRange(expr.range);
			} else if (expr.operator === "||") {
				left = this.evaluateExpression(expr.left);
				leftAsBool = left && left.asBool();
				if (leftAsBool === true) return left.setRange(expr.range);
				if (leftAsBool !== false) return;
				right = this.evaluateExpression(expr.right);
				return right.setRange(expr.range);
			}
		});
		this.hooks.evaluate.for("BinaryExpression").tap("Parser", expr => {
			let left;
			let right;
			let res;
			if (expr.operator === "+") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				res = new BasicEvaluatedExpression();
				if (left.isString()) {
					if (right.isString()) {
						res.setString(left.string + right.string);
					} else if (right.isNumber()) {
						res.setString(left.string + right.number);
					} else if (
						right.isWrapped() &&
						right.prefix &&
						right.prefix.isString()
					) {
						// "left" + ("prefix" + inner + "postfix")
						// => ("leftprefix" + inner + "postfix")
						res.setWrapped(
							new BasicEvaluatedExpression()
								.setString(left.string + right.prefix.string)
								.setRange(joinRanges(left.range, right.prefix.range)),
							right.postfix,
							right.wrappedInnerExpressions
						);
					} else if (right.isWrapped()) {
						// "left" + ([null] + inner + "postfix")
						// => ("left" + inner + "postfix")
						res.setWrapped(left, right.postfix, right.wrappedInnerExpressions);
					} else {
						// "left" + expr
						// => ("left" + expr + "")
						res.setWrapped(left, null, [right]);
					}
				} else if (left.isNumber()) {
					if (right.isString()) {
						res.setString(left.number + right.string);
					} else if (right.isNumber()) {
						res.setNumber(left.number + right.number);
					} else {
						return;
					}
				} else if (left.isWrapped()) {
					if (left.postfix && left.postfix.isString() && right.isString()) {
						// ("prefix" + inner + "postfix") + "right"
						// => ("prefix" + inner + "postfixright")
						res.setWrapped(
							left.prefix,
							new BasicEvaluatedExpression()
								.setString(left.postfix.string + right.string)
								.setRange(joinRanges(left.postfix.range, right.range)),
							left.wrappedInnerExpressions
						);
					} else if (
						left.postfix &&
						left.postfix.isString() &&
						right.isNumber()
					) {
						// ("prefix" + inner + "postfix") + 123
						// => ("prefix" + inner + "postfix123")
						res.setWrapped(
							left.prefix,
							new BasicEvaluatedExpression()
								.setString(left.postfix.string + right.number)
								.setRange(joinRanges(left.postfix.range, right.range)),
							left.wrappedInnerExpressions
						);
					} else if (right.isString()) {
						// ("prefix" + inner + [null]) + "right"
						// => ("prefix" + inner + "right")
						res.setWrapped(left.prefix, right, left.wrappedInnerExpressions);
					} else if (right.isNumber()) {
						// ("prefix" + inner + [null]) + 123
						// => ("prefix" + inner + "123")
						res.setWrapped(
							left.prefix,
							new BasicEvaluatedExpression()
								.setString(right.number + "")
								.setRange(right.range),
							left.wrappedInnerExpressions
						);
					} else if (right.isWrapped()) {
						// ("prefix1" + inner1 + "postfix1") + ("prefix2" + inner2 + "postfix2")
						// ("prefix1" + inner1 + "postfix1" + "prefix2" + inner2 + "postfix2")
						res.setWrapped(
							left.prefix,
							right.postfix,
							left.wrappedInnerExpressions &&
								right.wrappedInnerExpressions &&
								left.wrappedInnerExpressions
									.concat(left.postfix ? [left.postfix] : [])
									.concat(right.prefix ? [right.prefix] : [])
									.concat(right.wrappedInnerExpressions)
						);
					} else {
						// ("prefix" + inner + postfix) + expr
						// => ("prefix" + inner + postfix + expr + [null])
						res.setWrapped(
							left.prefix,
							null,
							left.wrappedInnerExpressions &&
								left.wrappedInnerExpressions.concat(
									left.postfix ? [left.postfix, right] : [right]
								)
						);
					}
				} else {
					if (right.isString()) {
						// left + "right"
						// => ([null] + left + "right")
						res.setWrapped(null, right, [left]);
					} else if (right.isWrapped()) {
						// left + (prefix + inner + "postfix")
						// => ([null] + left + prefix + inner + "postfix")
						res.setWrapped(
							null,
							right.postfix,
							right.wrappedInnerExpressions &&
								(right.prefix ? [left, right.prefix] : [left]).concat(
									right.wrappedInnerExpressions
								)
						);
					} else {
						return;
					}
				}
				res.setRange(expr.range);
				return res;
			} else if (expr.operator === "-") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				if (!left.isNumber() || !right.isNumber()) return;
				res = new BasicEvaluatedExpression();
				res.setNumber(left.number - right.number);
				res.setRange(expr.range);
				return res;
			} else if (expr.operator === "*") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				if (!left.isNumber() || !right.isNumber()) return;
				res = new BasicEvaluatedExpression();
				res.setNumber(left.number * right.number);
				res.setRange(expr.range);
				return res;
			} else if (expr.operator === "/") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				if (!left.isNumber() || !right.isNumber()) return;
				res = new BasicEvaluatedExpression();
				res.setNumber(left.number / right.number);
				res.setRange(expr.range);
				return res;
			} else if (expr.operator === "**") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				if (!left.isNumber() || !right.isNumber()) return;
				res = new BasicEvaluatedExpression();
				res.setNumber(Math.pow(left.number, right.number));
				res.setRange(expr.range);
				return res;
			} else if (expr.operator === "==" || expr.operator === "===") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				res = new BasicEvaluatedExpression();
				res.setRange(expr.range);
				if (left.isString() && right.isString()) {
					return res.setBoolean(left.string === right.string);
				} else if (left.isNumber() && right.isNumber()) {
					return res.setBoolean(left.number === right.number);
				} else if (left.isBoolean() && right.isBoolean()) {
					return res.setBoolean(left.bool === right.bool);
				}
			} else if (expr.operator === "!=" || expr.operator === "!==") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				res = new BasicEvaluatedExpression();
				res.setRange(expr.range);
				if (left.isString() && right.isString()) {
					return res.setBoolean(left.string !== right.string);
				} else if (left.isNumber() && right.isNumber()) {
					return res.setBoolean(left.number !== right.number);
				} else if (left.isBoolean() && right.isBoolean()) {
					return res.setBoolean(left.bool !== right.bool);
				}
			} else if (expr.operator === "&") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				if (!left.isNumber() || !right.isNumber()) return;
				res = new BasicEvaluatedExpression();
				res.setNumber(left.number & right.number);
				res.setRange(expr.range);
				return res;
			} else if (expr.operator === "|") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				if (!left.isNumber() || !right.isNumber()) return;
				res = new BasicEvaluatedExpression();
				res.setNumber(left.number | right.number);
				res.setRange(expr.range);
				return res;
			} else if (expr.operator === "^") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				if (!left.isNumber() || !right.isNumber()) return;
				res = new BasicEvaluatedExpression();
				res.setNumber(left.number ^ right.number);
				res.setRange(expr.range);
				return res;
			} else if (expr.operator === ">>>") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				if (!left.isNumber() || !right.isNumber()) return;
				res = new BasicEvaluatedExpression();
				res.setNumber(left.number >>> right.number);
				res.setRange(expr.range);
				return res;
			} else if (expr.operator === ">>") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				if (!left.isNumber() || !right.isNumber()) return;
				res = new BasicEvaluatedExpression();
				res.setNumber(left.number >> right.number);
				res.setRange(expr.range);
				return res;
			} else if (expr.operator === "<<") {
				left = this.evaluateExpression(expr.left);
				right = this.evaluateExpression(expr.right);
				if (!left || !right) return;
				if (!left.isNumber() || !right.isNumber()) return;
				res = new BasicEvaluatedExpression();
				res.setNumber(left.number << right.number);
				res.setRange(expr.range);
				return res;
			}
		});
		this.hooks.evaluate.for("UnaryExpression").tap("Parser", expr => {
			if (expr.operator === "typeof") {
				let res;
				let name;
				if (expr.argument.type === "Identifier") {
					name =
						this.scope.renames.get(expr.argument.name) || expr.argument.name;
					if (!this.scope.definitions.has(name)) {
						const hook = this.hooks.evaluateTypeof.get(name);
						if (hook !== undefined) {
							res = hook.call(expr);
							if (res !== undefined) return res;
						}
					}
				}
				if (expr.argument.type === "MemberExpression") {
					const exprName = this.getNameForExpression(expr.argument);
					if (exprName && exprName.free) {
						const hook = this.hooks.evaluateTypeof.get(exprName.name);
						if (hook !== undefined) {
							res = hook.call(expr);
							if (res !== undefined) return res;
						}
					}
				}
				if (expr.argument.type === "FunctionExpression") {
					return new BasicEvaluatedExpression()
						.setString("function")
						.setRange(expr.range);
				}
				const arg = this.evaluateExpression(expr.argument);
				if (arg.isString() || arg.isWrapped()) {
					return new BasicEvaluatedExpression()
						.setString("string")
						.setRange(expr.range);
				}
				if (arg.isNumber()) {
					return new BasicEvaluatedExpression()
						.setString("number")
						.setRange(expr.range);
				}
				if (arg.isBoolean()) {
					return new BasicEvaluatedExpression()
						.setString("boolean")
						.setRange(expr.range);
				}
				if (arg.isArray() || arg.isConstArray() || arg.isRegExp()) {
					return new BasicEvaluatedExpression()
						.setString("object")
						.setRange(expr.range);
				}
			} else if (expr.operator === "!") {
				const argument = this.evaluateExpression(expr.argument);
				if (!argument) return;
				if (argument.isBoolean()) {
					return new BasicEvaluatedExpression()
						.setBoolean(!argument.bool)
						.setRange(expr.range);
				}
				if (argument.isTruthy()) {
					return new BasicEvaluatedExpression()
						.setBoolean(false)
						.setRange(expr.range);
				}
				if (argument.isFalsy()) {
					return new BasicEvaluatedExpression()
						.setBoolean(true)
						.setRange(expr.range);
				}
				if (argument.isString()) {
					return new BasicEvaluatedExpression()
						.setBoolean(!argument.string)
						.setRange(expr.range);
				}
				if (argument.isNumber()) {
					return new BasicEvaluatedExpression()
						.setBoolean(!argument.number)
						.setRange(expr.range);
				}
			} else if (expr.operator === "~") {
				const argument = this.evaluateExpression(expr.argument);
				if (!argument) return;
				if (!argument.isNumber()) return;
				const res = new BasicEvaluatedExpression();
				res.setNumber(~argument.number);
				res.setRange(expr.range);
				return res;
			}
		});
		this.hooks.evaluateTypeof.for("undefined").tap("Parser", expr => {
			return new BasicEvaluatedExpression()
				.setString("undefined")
				.setRange(expr.range);
		});
		this.hooks.evaluate.for("Identifier").tap("Parser", expr => {
			const name = this.scope.renames.get(expr.name) || expr.name;
			if (!this.scope.definitions.has(expr.name)) {
				const hook = this.hooks.evaluateIdentifier.get(name);
				if (hook !== undefined) {
					const result = hook.call(expr);
					if (result) return result;
				}
				return new BasicEvaluatedExpression()
					.setIdentifier(name)
					.setRange(expr.range);
			} else {
				const hook = this.hooks.evaluateDefinedIdentifier.get(name);
				if (hook !== undefined) {
					return hook.call(expr);
				}
			}
		});
		this.hooks.evaluate.for("ThisExpression").tap("Parser", expr => {
			const name = this.scope.renames.get("this");
			if (name) {
				const hook = this.hooks.evaluateIdentifier.get(name);
				if (hook !== undefined) {
					const result = hook.call(expr);
					if (result) return result;
				}
				return new BasicEvaluatedExpression()
					.setIdentifier(name)
					.setRange(expr.range);
			}
		});
		this.hooks.evaluate.for("MemberExpression").tap("Parser", expression => {
			let exprName = this.getNameForExpression(expression);
			if (exprName) {
				if (exprName.free) {
					const hook = this.hooks.evaluateIdentifier.get(exprName.name);
					if (hook !== undefined) {
						const result = hook.call(expression);
						if (result) return result;
					}
					return new BasicEvaluatedExpression()
						.setIdentifier(exprName.name)
						.setRange(expression.range);
				} else {
					const hook = this.hooks.evaluateDefinedIdentifier.get(exprName.name);
					if (hook !== undefined) {
						return hook.call(expression);
					}
				}
			}
		});
		this.hooks.evaluate.for("CallExpression").tap("Parser", expr => {
			if (expr.callee.type !== "MemberExpression") return;
			if (
				expr.callee.property.type !==
				(expr.callee.computed ? "Literal" : "Identifier")
			)
				return;
			const param = this.evaluateExpression(expr.callee.object);
			if (!param) return;
			const property = expr.callee.property.name || expr.callee.property.value;
			const hook = this.hooks.evaluateCallExpressionMember.get(property);
			if (hook !== undefined) {
				return hook.call(expr, param);
			}
		});
		this.hooks.evaluateCallExpressionMember
			.for("replace")
			.tap("Parser", (expr, param) => {
				if (!param.isString()) return;
				if (expr.arguments.length !== 2) return;
				let arg1 = this.evaluateExpression(expr.arguments[0]);
				let arg2 = this.evaluateExpression(expr.arguments[1]);
				if (!arg1.isString() && !arg1.isRegExp()) return;
				arg1 = arg1.regExp || arg1.string;
				if (!arg2.isString()) return;
				arg2 = arg2.string;
				return new BasicEvaluatedExpression()
					.setString(param.string.replace(arg1, arg2))
					.setRange(expr.range);
			});
		["substr", "substring"].forEach(fn => {
			this.hooks.evaluateCallExpressionMember
				.for(fn)
				.tap("Parser", (expr, param) => {
					if (!param.isString()) return;
					let arg1;
					let result,
						str = param.string;
					switch (expr.arguments.length) {
						case 1:
							arg1 = this.evaluateExpression(expr.arguments[0]);
							if (!arg1.isNumber()) return;
							result = str[fn](arg1.number);
							break;
						case 2: {
							arg1 = this.evaluateExpression(expr.arguments[0]);
							const arg2 = this.evaluateExpression(expr.arguments[1]);
							if (!arg1.isNumber()) return;
							if (!arg2.isNumber()) return;
							result = str[fn](arg1.number, arg2.number);
							break;
						}
						default:
							return;
					}
					return new BasicEvaluatedExpression()
						.setString(result)
						.setRange(expr.range);
				});
		});

		/**
		 * @param {string} kind "cooked" | "raw"
		 * @param {TODO} templateLiteralExpr TemplateLiteral expr
		 * @returns {{quasis: BasicEvaluatedExpression[], parts: BasicEvaluatedExpression[]}} Simplified template
		 */
		const getSimplifiedTemplateResult = (kind, templateLiteralExpr) => {
			const quasis = [];
			const parts = [];

			for (let i = 0; i < templateLiteralExpr.quasis.length; i++) {
				const quasiExpr = templateLiteralExpr.quasis[i];
				const quasi = quasiExpr.value[kind];

				if (i > 0) {
					const prevExpr = parts[parts.length - 1];
					const expr = this.evaluateExpression(
						templateLiteralExpr.expressions[i - 1]
					);
					const exprAsString = expr.asString();
					if (typeof exprAsString === "string") {
						// We can merge quasi + expr + quasi when expr
						// is a const string

						prevExpr.setString(prevExpr.string + exprAsString + quasi);
						prevExpr.setRange([prevExpr.range[0], quasiExpr.range[1]]);
						// We unset the expression as it doesn't match to a single expression
						prevExpr.setExpression(undefined);
						continue;
					}
					parts.push(expr);
				}

				const part = new BasicEvaluatedExpression()
					.setString(quasi)
					.setRange(quasiExpr.range)
					.setExpression(quasiExpr);
				quasis.push(part);
				parts.push(part);
			}
			return {
				quasis,
				parts
			};
		};

		this.hooks.evaluate.for("TemplateLiteral").tap("Parser", node => {
			const { quasis, parts } = getSimplifiedTemplateResult("cooked", node);
			if (parts.length === 1) {
				return parts[0].setRange(node.range);
			}
			return new BasicEvaluatedExpression()
				.setTemplateString(quasis, parts, "cooked")
				.setRange(node.range);
		});
		this.hooks.evaluate.for("TaggedTemplateExpression").tap("Parser", node => {
			if (this.evaluateExpression(node.tag).identifier !== "String.raw") return;
			const { quasis, parts } = getSimplifiedTemplateResult("raw", node.quasi);
			if (parts.length === 1) {
				return parts[0].setRange(node.range);
			}
			return new BasicEvaluatedExpression()
				.setTemplateString(quasis, parts, "raw")
				.setRange(node.range);
		});

		this.hooks.evaluateCallExpressionMember
			.for("concat")
			.tap("Parser", (expr, param) => {
				if (!param.isString() && !param.isWrapped()) return;

				let stringSuffix = null;
				let hasUnknownParams = false;
				for (let i = expr.arguments.length - 1; i >= 0; i--) {
					const argExpr = this.evaluateExpression(expr.arguments[i]);
					if (!argExpr.isString() && !argExpr.isNumber()) {
						hasUnknownParams = true;
						break;
					}

					const value = argExpr.isString()
						? argExpr.string
						: "" + argExpr.number;

					const newString = value + (stringSuffix ? stringSuffix.string : "");
					const newRange = [
						argExpr.range[0],
						(stringSuffix || argExpr).range[1]
					];
					stringSuffix = new BasicEvaluatedExpression()
						.setString(newString)
						.setRange(newRange);
				}

				if (hasUnknownParams) {
					const prefix = param.isString() ? param : param.prefix;
					return new BasicEvaluatedExpression()
						.setWrapped(prefix, stringSuffix)
						.setRange(expr.range);
				} else if (param.isWrapped()) {
					const postfix = stringSuffix || param.postfix;
					return new BasicEvaluatedExpression()
						.setWrapped(param.prefix, postfix)
						.setRange(expr.range);
				} else {
					const newString =
						param.string + (stringSuffix ? stringSuffix.string : "");
					return new BasicEvaluatedExpression()
						.setString(newString)
						.setRange(expr.range);
				}
			});
		this.hooks.evaluateCallExpressionMember
			.for("split")
			.tap("Parser", (expr, param) => {
				if (!param.isString()) return;
				if (expr.arguments.length !== 1) return;
				let result;
				const arg = this.evaluateExpression(expr.arguments[0]);
				if (arg.isString()) {
					result = param.string.split(arg.string);
				} else if (arg.isRegExp()) {
					result = param.string.split(arg.regExp);
				} else {
					return;
				}
				return new BasicEvaluatedExpression()
					.setArray(result)
					.setRange(expr.range);
			});
		this.hooks.evaluate.for("ConditionalExpression").tap("Parser", expr => {
			const condition = this.evaluateExpression(expr.test);
			const conditionValue = condition.asBool();
			let res;
			if (conditionValue === undefined) {
				const consequent = this.evaluateExpression(expr.consequent);
				const alternate = this.evaluateExpression(expr.alternate);
				if (!consequent || !alternate) return;
				res = new BasicEvaluatedExpression();
				if (consequent.isConditional()) {
					res.setOptions(consequent.options);
				} else {
					res.setOptions([consequent]);
				}
				if (alternate.isConditional()) {
					res.addOptions(alternate.options);
				} else {
					res.addOptions([alternate]);
				}
			} else {
				res = this.evaluateExpression(
					conditionValue ? expr.consequent : expr.alternate
				);
			}
			res.setRange(expr.range);
			return res;
		});
		this.hooks.evaluate.for("ArrayExpression").tap("Parser", expr => {
			const items = expr.elements.map(element => {
				return element !== null && this.evaluateExpression(element);
			});
			if (!items.every(Boolean)) return;
			return new BasicEvaluatedExpression()
				.setItems(items)
				.setRange(expr.range);
		});
	}

	getRenameIdentifier(expr) {
		const result = this.evaluateExpression(expr);
		if (result && result.isIdentifier()) {
			return result.identifier;
		}
	}

	walkClass(classy) {
		if (classy.superClass) this.walkExpression(classy.superClass);
		if (classy.body && classy.body.type === "ClassBody") {
			const wasTopLevel = this.scope.topLevelScope;
			this.scope.topLevelScope = false;
			for (const methodDefinition of classy.body.body) {
				if (methodDefinition.type === "MethodDefinition") {
					this.walkMethodDefinition(methodDefinition);
				}
			}
			this.scope.topLevelScope = wasTopLevel;
		}
	}

	walkMethodDefinition(methodDefinition) {
		if (methodDefinition.computed && methodDefinition.key) {
			this.walkExpression(methodDefinition.key);
		}
		if (methodDefinition.value) {
			this.walkExpression(methodDefinition.value);
		}
	}

	// Prewalking iterates the scope for variable declarations
	prewalkStatements(statements) {
		for (let index = 0, len = statements.length; index < len; index++) {
			const statement = statements[index];
			this.prewalkStatement(statement);
		}
	}

	// Walking iterates the statements and expressions and processes them
	walkStatements(statements) {
		for (let index = 0, len = statements.length; index < len; index++) {
			const statement = statements[index];
			this.walkStatement(statement);
		}
	}

	prewalkStatement(statement) {
		switch (statement.type) {
			case "BlockStatement":
				this.prewalkBlockStatement(statement);
				break;
			case "ClassDeclaration":
				this.prewalkClassDeclaration(statement);
				break;
			case "DoWhileStatement":
				this.prewalkDoWhileStatement(statement);
				break;
			case "ExportAllDeclaration":
				this.prewalkExportAllDeclaration(statement);
				break;
			case "ExportDefaultDeclaration":
				this.prewalkExportDefaultDeclaration(statement);
				break;
			case "ExportNamedDeclaration":
				this.prewalkExportNamedDeclaration(statement);
				break;
			case "ForInStatement":
				this.prewalkForInStatement(statement);
				break;
			case "ForOfStatement":
				this.prewalkForOfStatement(statement);
				break;
			case "ForStatement":
				this.prewalkForStatement(statement);
				break;
			case "FunctionDeclaration":
				this.prewalkFunctionDeclaration(statement);
				break;
			case "IfStatement":
				this.prewalkIfStatement(statement);
				break;
			case "ImportDeclaration":
				this.prewalkImportDeclaration(statement);
				break;
			case "LabeledStatement":
				this.prewalkLabeledStatement(statement);
				break;
			case "SwitchStatement":
				this.prewalkSwitchStatement(statement);
				break;
			case "TryStatement":
				this.prewalkTryStatement(statement);
				break;
			case "VariableDeclaration":
				this.prewalkVariableDeclaration(statement);
				break;
			case "WhileStatement":
				this.prewalkWhileStatement(statement);
				break;
			case "WithStatement":
				this.prewalkWithStatement(statement);
				break;
		}
	}

	walkStatement(statement) {
		if (this.hooks.statement.call(statement) !== undefined) return;
		switch (statement.type) {
			case "BlockStatement":
				this.walkBlockStatement(statement);
				break;
			case "ClassDeclaration":
				this.walkClassDeclaration(statement);
				break;
			case "DoWhileStatement":
				this.walkDoWhileStatement(statement);
				break;
			case "ExportDefaultDeclaration":
				this.walkExportDefaultDeclaration(statement);
				break;
			case "ExportNamedDeclaration":
				this.walkExportNamedDeclaration(statement);
				break;
			case "ExpressionStatement":
				this.walkExpressionStatement(statement);
				break;
			case "ForInStatement":
				this.walkForInStatement(statement);
				break;
			case "ForOfStatement":
				this.walkForOfStatement(statement);
				break;
			case "ForStatement":
				this.walkForStatement(statement);
				break;
			case "FunctionDeclaration":
				this.walkFunctionDeclaration(statement);
				break;
			case "IfStatement":
				this.walkIfStatement(statement);
				break;
			case "LabeledStatement":
				this.walkLabeledStatement(statement);
				break;
			case "ReturnStatement":
				this.walkReturnStatement(statement);
				break;
			case "SwitchStatement":
				this.walkSwitchStatement(statement);
				break;
			case "ThrowStatement":
				this.walkThrowStatement(statement);
				break;
			case "TryStatement":
				this.walkTryStatement(statement);
				break;
			case "VariableDeclaration":
				this.walkVariableDeclaration(statement);
				break;
			case "WhileStatement":
				this.walkWhileStatement(statement);
				break;
			case "WithStatement":
				this.walkWithStatement(statement);
				break;
		}
	}

	// Real Statements
	prewalkBlockStatement(statement) {
		this.prewalkStatements(statement.body);
	}

	walkBlockStatement(statement) {
		this.walkStatements(statement.body);
	}

	walkExpressionStatement(statement) {
		this.walkExpression(statement.expression);
	}

	prewalkIfStatement(statement) {
		this.prewalkStatement(statement.consequent);
		if (statement.alternate) {
			this.prewalkStatement(statement.alternate);
		}
	}

	walkIfStatement(statement) {
		const result = this.hooks.statementIf.call(statement);
		if (result === undefined) {
			this.walkExpression(statement.test);
			this.walkStatement(statement.consequent);
			if (statement.alternate) {
				this.walkStatement(statement.alternate);
			}
		} else {
			if (result) {
				this.walkStatement(statement.consequent);
			} else if (statement.alternate) {
				this.walkStatement(statement.alternate);
			}
		}
	}

	prewalkLabeledStatement(statement) {
		this.prewalkStatement(statement.body);
	}

	walkLabeledStatement(statement) {
		const hook = this.hooks.label.get(statement.label.name);
		if (hook !== undefined) {
			const result = hook.call(statement);
			if (result === true) return;
		}
		this.walkStatement(statement.body);
	}

	prewalkWithStatement(statement) {
		this.prewalkStatement(statement.body);
	}

	walkWithStatement(statement) {
		this.walkExpression(statement.object);
		this.walkStatement(statement.body);
	}

	prewalkSwitchStatement(statement) {
		this.prewalkSwitchCases(statement.cases);
	}

	walkSwitchStatement(statement) {
		this.walkExpression(statement.discriminant);
		this.walkSwitchCases(statement.cases);
	}

	walkTerminatingStatement(statement) {
		if (statement.argument) this.walkExpression(statement.argument);
	}

	walkReturnStatement(statement) {
		this.walkTerminatingStatement(statement);
	}

	walkThrowStatement(statement) {
		this.walkTerminatingStatement(statement);
	}

	prewalkTryStatement(statement) {
		this.prewalkStatement(statement.block);
	}

	walkTryStatement(statement) {
		if (this.scope.inTry) {
			this.walkStatement(statement.block);
		} else {
			this.scope.inTry = true;
			this.walkStatement(statement.block);
			this.scope.inTry = false;
		}
		if (statement.handler) this.walkCatchClause(statement.handler);
		if (statement.finalizer) this.walkStatement(statement.finalizer);
	}

	prewalkWhileStatement(statement) {
		this.prewalkStatement(statement.body);
	}

	walkWhileStatement(statement) {
		this.walkExpression(statement.test);
		this.walkStatement(statement.body);
	}

	prewalkDoWhileStatement(statement) {
		this.prewalkStatement(statement.body);
	}

	walkDoWhileStatement(statement) {
		this.walkStatement(statement.body);
		this.walkExpression(statement.test);
	}

	prewalkForStatement(statement) {
		if (statement.init) {
			if (statement.init.type === "VariableDeclaration") {
				this.prewalkStatement(statement.init);
			}
		}
		this.prewalkStatement(statement.body);
	}

	walkForStatement(statement) {
		if (statement.init) {
			if (statement.init.type === "VariableDeclaration") {
				this.walkStatement(statement.init);
			} else {
				this.walkExpression(statement.init);
			}
		}
		if (statement.test) {
			this.walkExpression(statement.test);
		}
		if (statement.update) {
			this.walkExpression(statement.update);
		}
		this.walkStatement(statement.body);
	}

	prewalkForInStatement(statement) {
		if (statement.left.type === "VariableDeclaration") {
			this.prewalkVariableDeclaration(statement.left);
		}
		this.prewalkStatement(statement.body);
	}

	walkForInStatement(statement) {
		if (statement.left.type === "VariableDeclaration") {
			this.walkVariableDeclaration(statement.left);
		} else {
			this.walkPattern(statement.left);
		}
		this.walkExpression(statement.right);
		this.walkStatement(statement.body);
	}

	prewalkForOfStatement(statement) {
		if (statement.left.type === "VariableDeclaration") {
			this.prewalkVariableDeclaration(statement.left);
		}
		this.prewalkStatement(statement.body);
	}

	walkForOfStatement(statement) {
		if (statement.left.type === "VariableDeclaration") {
			this.walkVariableDeclaration(statement.left);
		} else {
			this.walkPattern(statement.left);
		}
		this.walkExpression(statement.right);
		this.walkStatement(statement.body);
	}

	// Declarations
	prewalkFunctionDeclaration(statement) {
		if (statement.id) {
			this.scope.renames.set(statement.id.name, null);
			this.scope.definitions.add(statement.id.name);
		}
	}

	walkFunctionDeclaration(statement) {
		const wasTopLevel = this.scope.topLevelScope;
		this.scope.topLevelScope = false;
		this.inScope(statement.params, () => {
			for (const param of statement.params) {
				this.walkPattern(param);
			}
			if (statement.body.type === "BlockStatement") {
				this.detectStrictMode(statement.body.body);
				this.prewalkStatement(statement.body);
				this.walkStatement(statement.body);
			} else {
				this.walkExpression(statement.body);
			}
		});
		this.scope.topLevelScope = wasTopLevel;
	}

	prewalkImportDeclaration(statement) {
		const source = statement.source.value;
		this.hooks.import.call(statement, source);
		for (const specifier of statement.specifiers) {
			const name = specifier.local.name;
			this.scope.renames.set(name, null);
			this.scope.definitions.add(name);
			switch (specifier.type) {
				case "ImportDefaultSpecifier":
					this.hooks.importSpecifier.call(statement, source, "default", name);
					break;
				case "ImportSpecifier":
					this.hooks.importSpecifier.call(
						statement,
						source,
						specifier.imported.name,
						name
					);
					break;
				case "ImportNamespaceSpecifier":
					this.hooks.importSpecifier.call(statement, source, null, name);
					break;
			}
		}
	}

	prewalkExportNamedDeclaration(statement) {
		let source;
		if (statement.source) {
			source = statement.source.value;
			this.hooks.exportImport.call(statement, source);
		} else {
			this.hooks.export.call(statement);
		}
		if (statement.declaration) {
			if (
				!this.hooks.exportDeclaration.call(statement, statement.declaration)
			) {
				const originalDefinitions = this.scope.definitions;
				const tracker = new TrackingSet(this.scope.definitions);
				this.scope.definitions = tracker;
				this.prewalkStatement(statement.declaration);
				const newDefs = Array.from(tracker.getAddedItems());
				this.scope.definitions = originalDefinitions;
				for (let index = newDefs.length - 1; index >= 0; index--) {
					const def = newDefs[index];
					this.hooks.exportSpecifier.call(statement, def, def, index);
				}
			}
		}
		if (statement.specifiers) {
			for (
				let specifierIndex = 0;
				specifierIndex < statement.specifiers.length;
				specifierIndex++
			) {
				const specifier = statement.specifiers[specifierIndex];
				switch (specifier.type) {
					case "ExportSpecifier": {
						const name = specifier.exported.name;
						if (source) {
							this.hooks.exportImportSpecifier.call(
								statement,
								source,
								specifier.local.name,
								name,
								specifierIndex
							);
						} else {
							this.hooks.exportSpecifier.call(
								statement,
								specifier.local.name,
								name,
								specifierIndex
							);
						}
						break;
					}
				}
			}
		}
	}

	walkExportNamedDeclaration(statement) {
		if (statement.declaration) {
			this.walkStatement(statement.declaration);
		}
	}

	prewalkExportDefaultDeclaration(statement) {
		if (statement.declaration.id) {
			const originalDefinitions = this.scope.definitions;
			const tracker = new TrackingSet(this.scope.definitions);
			this.scope.definitions = tracker;
			this.prewalkStatement(statement.declaration);
			const newDefs = Array.from(tracker.getAddedItems());
			this.scope.definitions = originalDefinitions;
			for (let index = 0, len = newDefs.length; index < len; index++) {
				const def = newDefs[index];
				this.hooks.exportSpecifier.call(statement, def, "default");
			}
		}
	}

	walkExportDefaultDeclaration(statement) {
		this.hooks.export.call(statement);
		if (
			statement.declaration.id &&
			statement.declaration.type !== "FunctionExpression" &&
			statement.declaration.type !== "ClassExpression"
		) {
			if (
				!this.hooks.exportDeclaration.call(statement, statement.declaration)
			) {
				this.walkStatement(statement.declaration);
			}
		} else {
			// Acorn parses `export default function() {}` as `FunctionDeclaration` and
			// `export default class {}` as `ClassDeclaration`, both with `id = null`.
			// These nodes must be treated as expressions.
			if (statement.declaration.type === "FunctionDeclaration") {
				this.walkFunctionDeclaration(statement.declaration);
			} else if (statement.declaration.type === "ClassDeclaration") {
				this.walkClassDeclaration(statement.declaration);
			} else {
				this.walkExpression(statement.declaration);
			}
			if (!this.hooks.exportExpression.call(statement, statement.declaration)) {
				this.hooks.exportSpecifier.call(
					statement,
					statement.declaration,
					"default"
				);
			}
		}
	}

	prewalkExportAllDeclaration(statement) {
		const source = statement.source.value;
		this.hooks.exportImport.call(statement, source);
		this.hooks.exportImportSpecifier.call(statement, source, null, null, 0);
	}

	prewalkVariableDeclaration(statement) {
		const hookMap =
			statement.kind === "const"
				? this.hooks.varDeclarationConst
				: statement.kind === "let"
					? this.hooks.varDeclarationLet
					: this.hooks.varDeclarationVar;
		for (const declarator of statement.declarations) {
			switch (declarator.type) {
				case "VariableDeclarator": {
					this.enterPattern(declarator.id, (name, decl) => {
						let hook = hookMap.get(name);
						if (hook === undefined || !hook.call(decl)) {
							hook = this.hooks.varDeclaration.get(name);
							if (hook === undefined || !hook.call(decl)) {
								this.scope.renames.set(name, null);
								this.scope.definitions.add(name);
							}
						}
					});
					break;
				}
			}
		}
	}

	walkVariableDeclaration(statement) {
		for (const declarator of statement.declarations) {
			switch (declarator.type) {
				case "VariableDeclarator": {
					const renameIdentifier =
						declarator.init && this.getRenameIdentifier(declarator.init);
					if (renameIdentifier && declarator.id.type === "Identifier") {
						const hook = this.hooks.canRename.get(renameIdentifier);
						if (hook !== undefined && hook.call(declarator.init)) {
							// renaming with "var a = b;"
							const hook = this.hooks.rename.get(renameIdentifier);
							if (hook === undefined || !hook.call(declarator.init)) {
								this.scope.renames.set(
									declarator.id.name,
									this.scope.renames.get(renameIdentifier) || renameIdentifier
								);
								this.scope.definitions.delete(declarator.id.name);
							}
							break;
						}
					}
					this.walkPattern(declarator.id);
					if (declarator.init) this.walkExpression(declarator.init);
					break;
				}
			}
		}
	}

	prewalkClassDeclaration(statement) {
		if (statement.id) {
			this.scope.renames.set(statement.id.name, null);
			this.scope.definitions.add(statement.id.name);
		}
	}

	walkClassDeclaration(statement) {
		this.walkClass(statement);
	}

	prewalkSwitchCases(switchCases) {
		for (let index = 0, len = switchCases.length; index < len; index++) {
			const switchCase = switchCases[index];
			this.prewalkStatements(switchCase.consequent);
		}
	}

	walkSwitchCases(switchCases) {
		for (let index = 0, len = switchCases.length; index < len; index++) {
			const switchCase = switchCases[index];

			if (switchCase.test) {
				this.walkExpression(switchCase.test);
			}
			this.walkStatements(switchCase.consequent);
		}
	}

	walkCatchClause(catchClause) {
		// Error binding is optional in catch clause since ECMAScript 2019
		const errorBinding =
			catchClause.param === null ? EMPTY_ARRAY : [catchClause.param];

		this.inScope(errorBinding, () => {
			this.prewalkStatement(catchClause.body);
			this.walkStatement(catchClause.body);
		});
	}

	walkPattern(pattern) {
		switch (pattern.type) {
			case "ArrayPattern":
				this.walkArrayPattern(pattern);
				break;
			case "AssignmentPattern":
				this.walkAssignmentPattern(pattern);
				break;
			case "MemberExpression":
				this.walkMemberExpression(pattern);
				break;
			case "ObjectPattern":
				this.walkObjectPattern(pattern);
				break;
			case "RestElement":
				this.walkRestElement(pattern);
				break;
		}
	}

	walkAssignmentPattern(pattern) {
		this.walkExpression(pattern.right);
		this.walkPattern(pattern.left);
	}

	walkObjectPattern(pattern) {
		for (let i = 0, len = pattern.properties.length; i < len; i++) {
			const prop = pattern.properties[i];
			if (prop) {
				if (prop.computed) this.walkExpression(prop.key);
				if (prop.value) this.walkPattern(prop.value);
			}
		}
	}

	walkArrayPattern(pattern) {
		for (let i = 0, len = pattern.elements.length; i < len; i++) {
			const element = pattern.elements[i];
			if (element) this.walkPattern(element);
		}
	}

	walkRestElement(pattern) {
		this.walkPattern(pattern.argument);
	}

	walkExpressions(expressions) {
		for (const expression of expressions) {
			if (expression) {
				this.walkExpression(expression);
			}
		}
	}

	walkExpression(expression) {
		switch (expression.type) {
			case "ArrayExpression":
				this.walkArrayExpression(expression);
				break;
			case "ArrowFunctionExpression":
				this.walkArrowFunctionExpression(expression);
				break;
			case "AssignmentExpression":
				this.walkAssignmentExpression(expression);
				break;
			case "AwaitExpression":
				this.walkAwaitExpression(expression);
				break;
			case "BinaryExpression":
				this.walkBinaryExpression(expression);
				break;
			case "CallExpression":
				this.walkCallExpression(expression);
				break;
			case "ClassExpression":
				this.walkClassExpression(expression);
				break;
			case "ConditionalExpression":
				this.walkConditionalExpression(expression);
				break;
			case "FunctionExpression":
				this.walkFunctionExpression(expression);
				break;
			case "Identifier":
				this.walkIdentifier(expression);
				break;
			case "LogicalExpression":
				this.walkLogicalExpression(expression);
				break;
			case "MemberExpression":
				this.walkMemberExpression(expression);
				break;
			case "NewExpression":
				this.walkNewExpression(expression);
				break;
			case "ObjectExpression":
				this.walkObjectExpression(expression);
				break;
			case "SequenceExpression":
				this.walkSequenceExpression(expression);
				break;
			case "SpreadElement":
				this.walkSpreadElement(expression);
				break;
			case "TaggedTemplateExpression":
				this.walkTaggedTemplateExpression(expression);
				break;
			case "TemplateLiteral":
				this.walkTemplateLiteral(expression);
				break;
			case "ThisExpression":
				this.walkThisExpression(expression);
				break;
			case "UnaryExpression":
				this.walkUnaryExpression(expression);
				break;
			case "UpdateExpression":
				this.walkUpdateExpression(expression);
				break;
			case "YieldExpression":
				this.walkYieldExpression(expression);
				break;
		}
	}

	walkAwaitExpression(expression) {
		this.walkExpression(expression.argument);
	}

	walkArrayExpression(expression) {
		if (expression.elements) {
			this.walkExpressions(expression.elements);
		}
	}

	walkSpreadElement(expression) {
		if (expression.argument) {
			this.walkExpression(expression.argument);
		}
	}

	walkObjectExpression(expression) {
		for (
			let propIndex = 0, len = expression.properties.length;
			propIndex < len;
			propIndex++
		) {
			const prop = expression.properties[propIndex];
			if (prop.type === "SpreadElement") {
				this.walkExpression(prop.argument);
				continue;
			}
			if (prop.computed) {
				this.walkExpression(prop.key);
			}
			if (prop.shorthand) {
				this.scope.inShorthand = true;
			}
			this.walkExpression(prop.value);
			if (prop.shorthand) {
				this.scope.inShorthand = false;
			}
		}
	}

	walkFunctionExpression(expression) {
		const wasTopLevel = this.scope.topLevelScope;
		this.scope.topLevelScope = false;
		this.inScope(expression.params, () => {
			for (const param of expression.params) {
				this.walkPattern(param);
			}
			if (expression.body.type === "BlockStatement") {
				this.detectStrictMode(expression.body.body);
				this.prewalkStatement(expression.body);
				this.walkStatement(expression.body);
			} else {
				this.walkExpression(expression.body);
			}
		});
		this.scope.topLevelScope = wasTopLevel;
	}

	walkArrowFunctionExpression(expression) {
		this.inScope(expression.params, () => {
			for (const param of expression.params) {
				this.walkPattern(param);
			}
			if (expression.body.type === "BlockStatement") {
				this.detectStrictMode(expression.body.body);
				this.prewalkStatement(expression.body);
				this.walkStatement(expression.body);
			} else {
				this.walkExpression(expression.body);
			}
		});
	}

	walkSequenceExpression(expression) {
		if (expression.expressions) this.walkExpressions(expression.expressions);
	}

	walkUpdateExpression(expression) {
		this.walkExpression(expression.argument);
	}

	walkUnaryExpression(expression) {
		if (expression.operator === "typeof") {
			const exprName = this.getNameForExpression(expression.argument);
			if (exprName && exprName.free) {
				const hook = this.hooks.typeof.get(exprName.name);
				if (hook !== undefined) {
					const result = hook.call(expression);
					if (result === true) return;
				}
			}
		}
		this.walkExpression(expression.argument);
	}

	walkLeftRightExpression(expression) {
		this.walkExpression(expression.left);
		this.walkExpression(expression.right);
	}

	walkBinaryExpression(expression) {
		this.walkLeftRightExpression(expression);
	}

	walkLogicalExpression(expression) {
		const result = this.hooks.expressionLogicalOperator.call(expression);
		if (result === undefined) {
			this.walkLeftRightExpression(expression);
		} else {
			if (result) {
				this.walkExpression(expression.right);
			}
		}
	}

	walkAssignmentExpression(expression) {
		const renameIdentifier = this.getRenameIdentifier(expression.right);
		if (expression.left.type === "Identifier" && renameIdentifier) {
			const hook = this.hooks.canRename.get(renameIdentifier);
			if (hook !== undefined && hook.call(expression.right)) {
				// renaming "a = b;"
				const hook = this.hooks.rename.get(renameIdentifier);
				if (hook === undefined || !hook.call(expression.right)) {
					this.scope.renames.set(expression.left.name, renameIdentifier);
					this.scope.definitions.delete(expression.left.name);
				}
				return;
			}
		}
		if (expression.left.type === "Identifier") {
			const assignedHook = this.hooks.assigned.get(expression.left.name);
			if (assignedHook === undefined || !assignedHook.call(expression)) {
				this.walkExpression(expression.right);
			}
			this.scope.renames.set(expression.left.name, null);
			const assignHook = this.hooks.assign.get(expression.left.name);
			if (assignHook === undefined || !assignHook.call(expression)) {
				this.walkExpression(expression.left);
			}
			return;
		}
		this.walkExpression(expression.right);
		this.walkPattern(expression.left);
		this.enterPattern(expression.left, (name, decl) => {
			this.scope.renames.set(name, null);
		});
	}

	walkConditionalExpression(expression) {
		const result = this.hooks.expressionConditionalOperator.call(expression);
		if (result === undefined) {
			this.walkExpression(expression.test);
			this.walkExpression(expression.consequent);
			if (expression.alternate) {
				this.walkExpression(expression.alternate);
			}
		} else {
			if (result) {
				this.walkExpression(expression.consequent);
			} else if (expression.alternate) {
				this.walkExpression(expression.alternate);
			}
		}
	}

	walkNewExpression(expression) {
		const callee = this.evaluateExpression(expression.callee);
		if (callee.isIdentifier()) {
			const hook = this.hooks.new.get(callee.identifier);
			if (hook !== undefined) {
				const result = hook.call(expression);
				if (result === true) {
					return;
				}
			}
		}

		this.walkExpression(expression.callee);
		if (expression.arguments) {
			this.walkExpressions(expression.arguments);
		}
	}

	walkYieldExpression(expression) {
		if (expression.argument) {
			this.walkExpression(expression.argument);
		}
	}

	walkTemplateLiteral(expression) {
		if (expression.expressions) {
			this.walkExpressions(expression.expressions);
		}
	}

	walkTaggedTemplateExpression(expression) {
		if (expression.tag) {
			this.walkExpression(expression.tag);
		}
		if (expression.quasi && expression.quasi.expressions) {
			this.walkExpressions(expression.quasi.expressions);
		}
	}

	walkClassExpression(expression) {
		this.walkClass(expression);
	}

	_walkIIFE(functionExpression, options, currentThis) {
		const renameArgOrThis = argOrThis => {
			const renameIdentifier = this.getRenameIdentifier(argOrThis);
			if (renameIdentifier) {
				const hook = this.hooks.canRename.get(renameIdentifier);
				if (hook !== undefined && hook.call(argOrThis)) {
					const hook = this.hooks.rename.get(renameIdentifier);
					if (hook === undefined || !hook.call(argOrThis)) {
						return renameIdentifier;
					}
				}
			}
			this.walkExpression(argOrThis);
		};
		const params = functionExpression.params;
		const renameThis = currentThis ? renameArgOrThis(currentThis) : null;
		const args = options.map(renameArgOrThis);
		const wasTopLevel = this.scope.topLevelScope;
		this.scope.topLevelScope = false;
		this.inScope(params.filter((identifier, idx) => !args[idx]), () => {
			if (renameThis) {
				this.scope.renames.set("this", renameThis);
			}
			for (let i = 0; i < args.length; i++) {
				const param = args[i];
				if (!param) continue;
				if (!params[i] || params[i].type !== "Identifier") continue;
				this.scope.renames.set(params[i].name, param);
			}
			if (functionExpression.body.type === "BlockStatement") {
				this.prewalkStatement(functionExpression.body);
				this.walkStatement(functionExpression.body);
			} else {
				this.walkExpression(functionExpression.body);
			}
		});
		this.scope.topLevelScope = wasTopLevel;
	}

	walkCallExpression(expression) {
		if (
			expression.callee.type === "MemberExpression" &&
			expression.callee.object.type === "FunctionExpression" &&
			!expression.callee.computed &&
			(expression.callee.property.name === "call" ||
				expression.callee.property.name === "bind") &&
			expression.arguments.length > 0
		) {
			// (function(…) { }.call/bind(?, …))
			this._walkIIFE(
				expression.callee.object,
				expression.arguments.slice(1),
				expression.arguments[0]
			);
		} else if (expression.callee.type === "FunctionExpression") {
			// (function(…) { }(…))
			this._walkIIFE(expression.callee, expression.arguments, null);
		} else if (expression.callee.type === "Import") {
			let result = this.hooks.importCall.call(expression);
			if (result === true) return;

			if (expression.arguments) this.walkExpressions(expression.arguments);
		} else {
			const callee = this.evaluateExpression(expression.callee);
			if (callee.isIdentifier()) {
				const callHook = this.hooks.call.get(callee.identifier);
				if (callHook !== undefined) {
					let result = callHook.call(expression);
					if (result === true) return;
				}
				let identifier = callee.identifier.replace(/\.[^.]+$/, "");
				if (identifier !== callee.identifier) {
					const callAnyHook = this.hooks.callAnyMember.get(identifier);
					if (callAnyHook !== undefined) {
						let result = callAnyHook.call(expression);
						if (result === true) return;
					}
				}
			}

			if (expression.callee) this.walkExpression(expression.callee);
			if (expression.arguments) this.walkExpressions(expression.arguments);
		}
	}

	walkMemberExpression(expression) {
		const exprName = this.getNameForExpression(expression);
		if (exprName && exprName.free) {
			const expressionHook = this.hooks.expression.get(exprName.name);
			if (expressionHook !== undefined) {
				const result = expressionHook.call(expression);
				if (result === true) return;
			}
			const expressionAnyMemberHook = this.hooks.expressionAnyMember.get(
				exprName.nameGeneral
			);
			if (expressionAnyMemberHook !== undefined) {
				const result = expressionAnyMemberHook.call(expression);
				if (result === true) return;
			}
		}
		this.walkExpression(expression.object);
		if (expression.computed === true) this.walkExpression(expression.property);
	}

	walkThisExpression(expression) {
		const expressionHook = this.hooks.expression.get("this");
		if (expressionHook !== undefined) {
			expressionHook.call(expression);
		}
	}

	walkIdentifier(expression) {
		if (!this.scope.definitions.has(expression.name)) {
			const hook = this.hooks.expression.get(
				this.scope.renames.get(expression.name) || expression.name
			);
			if (hook !== undefined) {
				const result = hook.call(expression);
				if (result === true) return;
			}
		}
	}

	inScope(params, fn) {
		const oldScope = this.scope;
		this.scope = {
			topLevelScope: oldScope.topLevelScope,
			inTry: false,
			inShorthand: false,
			isStrict: oldScope.isStrict,
			definitions: oldScope.definitions.createChild(),
			renames: oldScope.renames.createChild()
		};

		this.scope.renames.set("this", null);

		for (const param of params) {
			if (typeof param !== "string") {
				this.enterPattern(param, param => {
					this.scope.renames.set(param, null);
					this.scope.definitions.add(param);
				});
			} else if (param) {
				this.scope.renames.set(param, null);
				this.scope.definitions.add(param);
			}
		}

		fn();
		this.scope = oldScope;
	}

	detectStrictMode(statements) {
		const isStrict =
			statements.length >= 1 &&
			statements[0].type === "ExpressionStatement" &&
			statements[0].expression.type === "Literal" &&
			statements[0].expression.value === "use strict";
		if (isStrict) {
			this.scope.isStrict = true;
		}
	}

	enterPattern(pattern, onIdent) {
		if (!pattern) return;
		switch (pattern.type) {
			case "ArrayPattern":
				this.enterArrayPattern(pattern, onIdent);
				break;
			case "AssignmentPattern":
				this.enterAssignmentPattern(pattern, onIdent);
				break;
			case "Identifier":
				this.enterIdentifier(pattern, onIdent);
				break;
			case "ObjectPattern":
				this.enterObjectPattern(pattern, onIdent);
				break;
			case "RestElement":
				this.enterRestElement(pattern, onIdent);
				break;
		}
	}

	enterIdentifier(pattern, onIdent) {
		onIdent(pattern.name, pattern);
	}

	enterObjectPattern(pattern, onIdent) {
		for (
			let propIndex = 0, len = pattern.properties.length;
			propIndex < len;
			propIndex++
		) {
			const prop = pattern.properties[propIndex];
			this.enterPattern(prop.value, onIdent);
		}
	}

	enterArrayPattern(pattern, onIdent) {
		for (
			let elementIndex = 0, len = pattern.elements.length;
			elementIndex < len;
			elementIndex++
		) {
			const element = pattern.elements[elementIndex];
			this.enterPattern(element, onIdent);
		}
	}

	enterRestElement(pattern, onIdent) {
		this.enterPattern(pattern.argument, onIdent);
	}

	enterAssignmentPattern(pattern, onIdent) {
		this.enterPattern(pattern.left, onIdent);
	}

	evaluateExpression(expression) {
		try {
			const hook = this.hooks.evaluate.get(expression.type);
			if (hook !== undefined) {
				const result = hook.call(expression);
				if (result !== undefined) {
					if (result) {
						result.setExpression(expression);
					}
					return result;
				}
			}
		} catch (e) {
			console.warn(e);
			// ignore error
		}
		return new BasicEvaluatedExpression()
			.setRange(expression.range)
			.setExpression(expression);
	}

	parseString(expression) {
		switch (expression.type) {
			case "BinaryExpression":
				if (expression.operator === "+") {
					return (
						this.parseString(expression.left) +
						this.parseString(expression.right)
					);
				}
				break;
			case "Literal":
				return expression.value + "";
		}
		throw new Error(
			expression.type + " is not supported as parameter for require"
		);
	}

	parseCalculatedString(expression) {
		switch (expression.type) {
			case "BinaryExpression":
				if (expression.operator === "+") {
					const left = this.parseCalculatedString(expression.left);
					const right = this.parseCalculatedString(expression.right);
					if (left.code) {
						return {
							range: left.range,
							value: left.value,
							code: true,
							conditional: false
						};
					} else if (right.code) {
						return {
							range: [
								left.range[0],
								right.range ? right.range[1] : left.range[1]
							],
							value: left.value + right.value,
							code: true,
							conditional: false
						};
					} else {
						return {
							range: [left.range[0], right.range[1]],
							value: left.value + right.value,
							code: false,
							conditional: false
						};
					}
				}
				break;
			case "ConditionalExpression": {
				const consequent = this.parseCalculatedString(expression.consequent);
				const alternate = this.parseCalculatedString(expression.alternate);
				const items = [];
				if (consequent.conditional) {
					items.push(...consequent.conditional);
				} else if (!consequent.code) {
					items.push(consequent);
				} else {
					break;
				}
				if (alternate.conditional) {
					items.push(...alternate.conditional);
				} else if (!alternate.code) {
					items.push(alternate);
				} else {
					break;
				}
				return {
					range: undefined,
					value: "",
					code: true,
					conditional: items
				};
			}
			case "Literal":
				return {
					range: expression.range,
					value: expression.value + "",
					code: false,
					conditional: false
				};
		}
		return {
			range: undefined,
			value: "",
			code: true,
			conditional: false
		};
	}

	parse(source, initialState) {
		let ast;
		let comments;
		if (typeof source === "object" && source !== null) {
			ast = source;
			comments = source.comments;
		} else {
			comments = [];
			ast = Parser.parse(source, {
				sourceType: this.sourceType,
				onComment: comments
			});
		}

		const oldScope = this.scope;
		const oldState = this.state;
		const oldComments = this.comments;
		this.scope = {
			topLevelScope: true,
			inTry: false,
			inShorthand: false,
			isStrict: false,
			definitions: new StackedSetMap(),
			renames: new StackedSetMap()
		};
		const state = (this.state = initialState || {});
		this.comments = comments;
		if (this.hooks.program.call(ast, comments) === undefined) {
			this.detectStrictMode(ast.body);
			this.prewalkStatements(ast.body);
			this.walkStatements(ast.body);
		}
		this.scope = oldScope;
		this.state = oldState;
		this.comments = oldComments;
		return state;
	}

	evaluate(source) {
		const ast = Parser.parse("(" + source + ")", {
			sourceType: this.sourceType,
			locations: false
		});
		if (ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement") {
			throw new Error("evaluate: Source is not a expression");
		}
		return this.evaluateExpression(ast.body[0].expression);
	}

	getComments(range) {
		return this.comments.filter(
			comment => comment.range[0] >= range[0] && comment.range[1] <= range[1]
		);
	}

	parseCommentOptions(range) {
		const comments = this.getComments(range);
		if (comments.length === 0) {
			return EMPTY_COMMENT_OPTIONS;
		}
		let options = {};
		let errors = [];
		for (const comment of comments) {
			const { value } = comment;
			if (value && webpackCommentRegExp.test(value)) {
				// try compile only if webpack options comment is present
				try {
					const val = vm.runInNewContext(`(function(){return {${value}};})()`);
					Object.assign(options, val);
				} catch (e) {
					e.comment = comment;
					errors.push(e);
				}
			}
		}
		return { options, errors };
	}

	getNameForExpression(expression) {
		let expr = expression;
		const exprName = [];
		while (
			expr.type === "MemberExpression" &&
			expr.property.type === (expr.computed ? "Literal" : "Identifier")
		) {
			exprName.push(expr.computed ? expr.property.value : expr.property.name);
			expr = expr.object;
		}
		let free;
		if (expr.type === "Identifier") {
			free = !this.scope.definitions.has(expr.name);
			exprName.push(this.scope.renames.get(expr.name) || expr.name);
		} else if (
			expr.type === "ThisExpression" &&
			this.scope.renames.get("this")
		) {
			free = true;
			exprName.push(this.scope.renames.get("this"));
		} else if (expr.type === "ThisExpression") {
			free = this.scope.topLevelScope;
			exprName.push("this");
		} else {
			return null;
		}
		let prefix = "";
		for (let i = exprName.length - 1; i >= 2; i--) {
			prefix += exprName[i] + ".";
		}
		if (exprName.length > 1) {
			prefix += exprName[1];
		}
		const name = prefix ? prefix + "." + exprName[0] : exprName[0];
		const nameGeneral = prefix;
		return {
			name,
			nameGeneral,
			free
		};
	}

	static parse(code, options) {
		const type = options ? options.sourceType : "module";
		const parserOptions = Object.assign(
			Object.create(null),
			defaultParserOptions,
			options
		);

		if (type === "auto") {
			parserOptions.sourceType = "module";
		}

		let ast;
		let error;
		let threw = false;
		try {
			ast = acorn.parse(code, parserOptions);
		} catch (e) {
			error = e;
			threw = true;
		}

		if (threw && type === "auto") {
			parserOptions.sourceType = "script";
			if (Array.isArray(parserOptions.onComment)) {
				parserOptions.onComment.length = 0;
			}
			try {
				ast = acorn.parse(code, parserOptions);
				threw = false;
			} catch (e) {
				threw = true;
			}
		}

		if (threw) {
			throw error;
		}

		return ast;
	}
}

// TODO remove in webpack 5
Object.defineProperty(Parser.prototype, "getCommentOptions", {
	configurable: false,
	value: util.deprecate(
		/**
		 * @deprecated
		 * @param {TODO} range Range
		 * @returns {void}
		 * @this {Parser}
		 */
		function(range) {
			return this.parseCommentOptions(range).options;
		},
		"Parser.getCommentOptions: Use Parser.parseCommentOptions(range) instead"
	)
});

module.exports = Parser;
