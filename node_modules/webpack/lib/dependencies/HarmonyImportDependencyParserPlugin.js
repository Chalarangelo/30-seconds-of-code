/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const { SyncBailHook } = require("tapable");
const HarmonyImportSideEffectDependency = require("./HarmonyImportSideEffectDependency");
const HarmonyImportSpecifierDependency = require("./HarmonyImportSpecifierDependency");
const HarmonyAcceptImportDependency = require("./HarmonyAcceptImportDependency");
const HarmonyAcceptDependency = require("./HarmonyAcceptDependency");
const ConstDependency = require("./ConstDependency");

module.exports = class HarmonyImportDependencyParserPlugin {
	constructor(moduleOptions) {
		this.strictExportPresence = moduleOptions.strictExportPresence;
		this.strictThisContextOnImports = moduleOptions.strictThisContextOnImports;
	}

	apply(parser) {
		parser.hooks.import.tap(
			"HarmonyImportDependencyParserPlugin",
			(statement, source) => {
				parser.state.lastHarmonyImportOrder =
					(parser.state.lastHarmonyImportOrder || 0) + 1;
				const clearDep = new ConstDependency("", statement.range);
				clearDep.loc = statement.loc;
				parser.state.module.addDependency(clearDep);
				const sideEffectDep = new HarmonyImportSideEffectDependency(
					source,
					parser.state.module,
					parser.state.lastHarmonyImportOrder,
					parser.state.harmonyParserScope
				);
				sideEffectDep.loc = statement.loc;
				parser.state.module.addDependency(sideEffectDep);
				return true;
			}
		);
		parser.hooks.importSpecifier.tap(
			"HarmonyImportDependencyParserPlugin",
			(statement, source, id, name) => {
				parser.scope.definitions.delete(name);
				parser.scope.renames.set(name, "imported var");
				if (!parser.state.harmonySpecifier) {
					parser.state.harmonySpecifier = new Map();
				}
				parser.state.harmonySpecifier.set(name, {
					source,
					id,
					sourceOrder: parser.state.lastHarmonyImportOrder
				});
				return true;
			}
		);
		parser.hooks.expression
			.for("imported var")
			.tap("HarmonyImportDependencyParserPlugin", expr => {
				const name = expr.name;
				const settings = parser.state.harmonySpecifier.get(name);
				const dep = new HarmonyImportSpecifierDependency(
					settings.source,
					parser.state.module,
					settings.sourceOrder,
					parser.state.harmonyParserScope,
					settings.id,
					name,
					expr.range,
					this.strictExportPresence
				);
				dep.shorthand = parser.scope.inShorthand;
				dep.directImport = true;
				dep.loc = expr.loc;
				parser.state.module.addDependency(dep);
				return true;
			});
		parser.hooks.expressionAnyMember
			.for("imported var")
			.tap("HarmonyImportDependencyParserPlugin", expr => {
				const name = expr.object.name;
				const settings = parser.state.harmonySpecifier.get(name);
				if (settings.id !== null) return false;
				const dep = new HarmonyImportSpecifierDependency(
					settings.source,
					parser.state.module,
					settings.sourceOrder,
					parser.state.harmonyParserScope,
					expr.property.name || expr.property.value,
					name,
					expr.range,
					this.strictExportPresence
				);
				dep.shorthand = parser.scope.inShorthand;
				dep.directImport = false;
				dep.loc = expr.loc;
				parser.state.module.addDependency(dep);
				return true;
			});
		if (this.strictThisContextOnImports) {
			// only in case when we strictly follow the spec we need a special case here
			parser.hooks.callAnyMember
				.for("imported var")
				.tap("HarmonyImportDependencyParserPlugin", expr => {
					if (expr.callee.type !== "MemberExpression") return;
					if (expr.callee.object.type !== "Identifier") return;
					const name = expr.callee.object.name;
					const settings = parser.state.harmonySpecifier.get(name);
					if (settings.id !== null) return false;
					const dep = new HarmonyImportSpecifierDependency(
						settings.source,
						parser.state.module,
						settings.sourceOrder,
						parser.state.harmonyParserScope,
						expr.callee.property.name || expr.callee.property.value,
						name,
						expr.callee.range,
						this.strictExportPresence
					);
					dep.shorthand = parser.scope.inShorthand;
					dep.directImport = false;
					dep.namespaceObjectAsContext = true;
					dep.loc = expr.callee.loc;
					parser.state.module.addDependency(dep);
					if (expr.arguments) parser.walkExpressions(expr.arguments);
					return true;
				});
		}
		parser.hooks.call
			.for("imported var")
			.tap("HarmonyImportDependencyParserPlugin", expr => {
				const args = expr.arguments;
				const fullExpr = expr;
				expr = expr.callee;
				if (expr.type !== "Identifier") return;
				const name = expr.name;
				const settings = parser.state.harmonySpecifier.get(name);
				const dep = new HarmonyImportSpecifierDependency(
					settings.source,
					parser.state.module,
					settings.sourceOrder,
					parser.state.harmonyParserScope,
					settings.id,
					name,
					expr.range,
					this.strictExportPresence
				);
				dep.directImport = true;
				dep.callArgs = args;
				dep.call = fullExpr;
				dep.loc = expr.loc;
				parser.state.module.addDependency(dep);
				if (args) parser.walkExpressions(args);
				return true;
			});
		// TODO webpack 5: refactor this, no custom hooks
		if (!parser.hooks.hotAcceptCallback) {
			parser.hooks.hotAcceptCallback = new SyncBailHook([
				"expression",
				"requests"
			]);
		}
		if (!parser.hooks.hotAcceptWithoutCallback) {
			parser.hooks.hotAcceptWithoutCallback = new SyncBailHook([
				"expression",
				"requests"
			]);
		}
		parser.hooks.hotAcceptCallback.tap(
			"HarmonyImportDependencyParserPlugin",
			(expr, requests) => {
				const harmonyParserScope = parser.state.harmonyParserScope;
				if (!harmonyParserScope) {
					// This is not a harmony module, skip it
					return;
				}
				const dependencies = requests.map(request => {
					const dep = new HarmonyAcceptImportDependency(
						request,
						parser.state.module,
						harmonyParserScope
					);
					dep.loc = expr.loc;
					parser.state.module.addDependency(dep);
					return dep;
				});
				if (dependencies.length > 0) {
					const dep = new HarmonyAcceptDependency(
						expr.range,
						dependencies,
						true
					);
					dep.loc = expr.loc;
					parser.state.module.addDependency(dep);
				}
			}
		);
		parser.hooks.hotAcceptWithoutCallback.tap(
			"HarmonyImportDependencyParserPlugin",
			(expr, requests) => {
				const dependencies = requests.map(request => {
					const dep = new HarmonyAcceptImportDependency(
						request,
						parser.state.module,
						parser.state.harmonyParserScope
					);
					dep.loc = expr.loc;
					parser.state.module.addDependency(dep);
					return dep;
				});
				if (dependencies.length > 0) {
					const dep = new HarmonyAcceptDependency(
						expr.range,
						dependencies,
						false
					);
					dep.loc = expr.loc;
					parser.state.module.addDependency(dep);
				}
			}
		);
	}
};
