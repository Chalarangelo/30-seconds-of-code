/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const RequireEnsureDependenciesBlock = require("./RequireEnsureDependenciesBlock");
const RequireEnsureItemDependency = require("./RequireEnsureItemDependency");
const getFunctionExpression = require("./getFunctionExpression");

module.exports = class RequireEnsureDependenciesBlockParserPlugin {
	apply(parser) {
		parser.hooks.call
			.for("require.ensure")
			.tap("RequireEnsureDependenciesBlockParserPlugin", expr => {
				let chunkName = null;
				let chunkNameRange = null;
				let errorExpressionArg = null;
				let errorExpression = null;
				switch (expr.arguments.length) {
					case 4: {
						const chunkNameExpr = parser.evaluateExpression(expr.arguments[3]);
						if (!chunkNameExpr.isString()) return;
						chunkNameRange = chunkNameExpr.range;
						chunkName = chunkNameExpr.string;
					}
					// falls through
					case 3: {
						errorExpressionArg = expr.arguments[2];
						errorExpression = getFunctionExpression(errorExpressionArg);

						if (!errorExpression && !chunkName) {
							const chunkNameExpr = parser.evaluateExpression(
								expr.arguments[2]
							);
							if (!chunkNameExpr.isString()) return;
							chunkNameRange = chunkNameExpr.range;
							chunkName = chunkNameExpr.string;
						}
					}
					// falls through
					case 2: {
						const dependenciesExpr = parser.evaluateExpression(
							expr.arguments[0]
						);
						const dependenciesItems = dependenciesExpr.isArray()
							? dependenciesExpr.items
							: [dependenciesExpr];
						const successExpressionArg = expr.arguments[1];
						const successExpression = getFunctionExpression(
							successExpressionArg
						);

						if (successExpression) {
							parser.walkExpressions(successExpression.expressions);
						}
						if (errorExpression) {
							parser.walkExpressions(errorExpression.expressions);
						}

						const dep = new RequireEnsureDependenciesBlock(
							expr,
							successExpression ? successExpression.fn : successExpressionArg,
							errorExpression ? errorExpression.fn : errorExpressionArg,
							chunkName,
							chunkNameRange,
							parser.state.module,
							expr.loc
						);
						const old = parser.state.current;
						parser.state.current = dep;
						try {
							let failed = false;
							parser.inScope([], () => {
								for (const ee of dependenciesItems) {
									if (ee.isString()) {
										const edep = new RequireEnsureItemDependency(ee.string);
										edep.loc = dep.loc;
										dep.addDependency(edep);
									} else {
										failed = true;
									}
								}
							});
							if (failed) {
								return;
							}
							if (successExpression) {
								if (successExpression.fn.body.type === "BlockStatement") {
									parser.walkStatement(successExpression.fn.body);
								} else {
									parser.walkExpression(successExpression.fn.body);
								}
							}
							old.addBlock(dep);
						} finally {
							parser.state.current = old;
						}
						if (!successExpression) {
							parser.walkExpression(successExpressionArg);
						}
						if (errorExpression) {
							if (errorExpression.fn.body.type === "BlockStatement") {
								parser.walkStatement(errorExpression.fn.body);
							} else {
								parser.walkExpression(errorExpression.fn.body);
							}
						} else if (errorExpressionArg) {
							parser.walkExpression(errorExpressionArg);
						}
						return true;
					}
				}
			});
	}
};
