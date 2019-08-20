/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const ConstDependency = require("./dependencies/ConstDependency");
const NullFactory = require("./NullFactory");
const ParserHelpers = require("./ParserHelpers");

const getQuery = request => {
	const i = request.indexOf("?");
	return i !== -1 ? request.substr(i) : "";
};

const collectDeclaration = (declarations, pattern) => {
	const stack = [pattern];
	while (stack.length > 0) {
		const node = stack.pop();
		switch (node.type) {
			case "Identifier":
				declarations.add(node.name);
				break;
			case "ArrayPattern":
				for (const element of node.elements) {
					if (element) {
						stack.push(element);
					}
				}
				break;
			case "AssignmentPattern":
				stack.push(node.left);
				break;
			case "ObjectPattern":
				for (const property of node.properties) {
					stack.push(property.value);
				}
				break;
			case "RestElement":
				stack.push(node.argument);
				break;
		}
	}
};

const getHoistedDeclarations = (branch, includeFunctionDeclarations) => {
	const declarations = new Set();
	const stack = [branch];
	while (stack.length > 0) {
		const node = stack.pop();
		// Some node could be `null` or `undefined`.
		if (!node) continue;
		switch (node.type) {
			// Walk through control statements to look for hoisted declarations.
			// Some branches are skipped since they do not allow declarations.
			case "BlockStatement":
				for (const stmt of node.body) {
					stack.push(stmt);
				}
				break;
			case "IfStatement":
				stack.push(node.consequent);
				stack.push(node.alternate);
				break;
			case "ForStatement":
				stack.push(node.init);
				stack.push(node.body);
				break;
			case "ForInStatement":
			case "ForOfStatement":
				stack.push(node.left);
				stack.push(node.body);
				break;
			case "DoWhileStatement":
			case "WhileStatement":
			case "LabeledStatement":
				stack.push(node.body);
				break;
			case "SwitchStatement":
				for (const cs of node.cases) {
					for (const consequent of cs.consequent) {
						stack.push(consequent);
					}
				}
				break;
			case "TryStatement":
				stack.push(node.block);
				if (node.handler) {
					stack.push(node.handler.body);
				}
				stack.push(node.finalizer);
				break;
			case "FunctionDeclaration":
				if (includeFunctionDeclarations) {
					collectDeclaration(declarations, node.id);
				}
				break;
			case "VariableDeclaration":
				if (node.kind === "var") {
					for (const decl of node.declarations) {
						collectDeclaration(declarations, decl.id);
					}
				}
				break;
		}
	}
	return Array.from(declarations);
};

class ConstPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap(
			"ConstPlugin",
			(compilation, { normalModuleFactory }) => {
				compilation.dependencyFactories.set(ConstDependency, new NullFactory());
				compilation.dependencyTemplates.set(
					ConstDependency,
					new ConstDependency.Template()
				);

				const handler = parser => {
					parser.hooks.statementIf.tap("ConstPlugin", statement => {
						const param = parser.evaluateExpression(statement.test);
						const bool = param.asBool();
						if (typeof bool === "boolean") {
							if (statement.test.type !== "Literal") {
								const dep = new ConstDependency(`${bool}`, param.range);
								dep.loc = statement.loc;
								parser.state.current.addDependency(dep);
							}
							const branchToRemove = bool
								? statement.alternate
								: statement.consequent;
							if (branchToRemove) {
								// Before removing the dead branch, the hoisted declarations
								// must be collected.
								//
								// Given the following code:
								//
								//     if (true) f() else g()
								//     if (false) {
								//       function f() {}
								//       const g = function g() {}
								//       if (someTest) {
								//         let a = 1
								//         var x, {y, z} = obj
								//       }
								//     } else {
								//       …
								//     }
								//
								// the generated code is:
								//
								//     if (true) f() else {}
								//     if (false) {
								//       var f, x, y, z;   (in loose mode)
								//       var x, y, z;      (in strict mode)
								//     } else {
								//       …
								//     }
								//
								// NOTE: When code runs in strict mode, `var` declarations
								// are hoisted but `function` declarations don't.
								//
								let declarations;
								if (parser.scope.isStrict) {
									// If the code runs in strict mode, variable declarations
									// using `var` must be hoisted.
									declarations = getHoistedDeclarations(branchToRemove, false);
								} else {
									// Otherwise, collect all hoisted declaration.
									declarations = getHoistedDeclarations(branchToRemove, true);
								}
								let replacement;
								if (declarations.length > 0) {
									replacement = `{ var ${declarations.join(", ")}; }`;
								} else {
									replacement = "{}";
								}
								const dep = new ConstDependency(
									replacement,
									branchToRemove.range
								);
								dep.loc = branchToRemove.loc;
								parser.state.current.addDependency(dep);
							}
							return bool;
						}
					});
					parser.hooks.expressionConditionalOperator.tap(
						"ConstPlugin",
						expression => {
							const param = parser.evaluateExpression(expression.test);
							const bool = param.asBool();
							if (typeof bool === "boolean") {
								if (expression.test.type !== "Literal") {
									const dep = new ConstDependency(` ${bool}`, param.range);
									dep.loc = expression.loc;
									parser.state.current.addDependency(dep);
								}
								// Expressions do not hoist.
								// It is safe to remove the dead branch.
								//
								// Given the following code:
								//
								//   false ? someExpression() : otherExpression();
								//
								// the generated code is:
								//
								//   false ? undefined : otherExpression();
								//
								const branchToRemove = bool
									? expression.alternate
									: expression.consequent;
								const dep = new ConstDependency(
									"undefined",
									branchToRemove.range
								);
								dep.loc = branchToRemove.loc;
								parser.state.current.addDependency(dep);
								return bool;
							}
						}
					);
					parser.hooks.expressionLogicalOperator.tap(
						"ConstPlugin",
						expression => {
							if (
								expression.operator === "&&" ||
								expression.operator === "||"
							) {
								const param = parser.evaluateExpression(expression.left);
								const bool = param.asBool();
								if (typeof bool === "boolean") {
									// Expressions do not hoist.
									// It is safe to remove the dead branch.
									//
									// ------------------------------------------
									//
									// Given the following code:
									//
									//   falsyExpression() && someExpression();
									//
									// the generated code is:
									//
									//   falsyExpression() && false;
									//
									// ------------------------------------------
									//
									// Given the following code:
									//
									//   truthyExpression() && someExpression();
									//
									// the generated code is:
									//
									//   true && someExpression();
									//
									// ------------------------------------------
									//
									// Given the following code:
									//
									//   truthyExpression() || someExpression();
									//
									// the generated code is:
									//
									//   truthyExpression() || false;
									//
									// ------------------------------------------
									//
									// Given the following code:
									//
									//   falsyExpression() || someExpression();
									//
									// the generated code is:
									//
									//   false && someExpression();
									//
									const keepRight =
										(expression.operator === "&&" && bool) ||
										(expression.operator === "||" && !bool);

									if (param.isBoolean() || keepRight) {
										// for case like
										//
										//   return'development'===process.env.NODE_ENV&&'foo'
										//
										// we need a space before the bool to prevent result like
										//
										//   returnfalse&&'foo'
										//
										const dep = new ConstDependency(` ${bool}`, param.range);
										dep.loc = expression.loc;
										parser.state.current.addDependency(dep);
									} else {
										parser.walkExpression(expression.left);
									}
									if (!keepRight) {
										const dep = new ConstDependency(
											"false",
											expression.right.range
										);
										dep.loc = expression.loc;
										parser.state.current.addDependency(dep);
									}
									return keepRight;
								}
							}
						}
					);
					parser.hooks.evaluateIdentifier
						.for("__resourceQuery")
						.tap("ConstPlugin", expr => {
							if (!parser.state.module) return;
							return ParserHelpers.evaluateToString(
								getQuery(parser.state.module.resource)
							)(expr);
						});
					parser.hooks.expression
						.for("__resourceQuery")
						.tap("ConstPlugin", () => {
							if (!parser.state.module) return;
							parser.state.current.addVariable(
								"__resourceQuery",
								JSON.stringify(getQuery(parser.state.module.resource))
							);
							return true;
						});
				};

				normalModuleFactory.hooks.parser
					.for("javascript/auto")
					.tap("ConstPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/dynamic")
					.tap("ConstPlugin", handler);
				normalModuleFactory.hooks.parser
					.for("javascript/esm")
					.tap("ConstPlugin", handler);
			}
		);
	}
}

module.exports = ConstPlugin;
