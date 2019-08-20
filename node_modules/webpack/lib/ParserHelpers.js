/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";
const path = require("path");

const BasicEvaluatedExpression = require("./BasicEvaluatedExpression");
const ConstDependency = require("./dependencies/ConstDependency");
const UnsupportedFeatureWarning = require("./UnsupportedFeatureWarning");

const ParserHelpers = exports;

ParserHelpers.addParsedVariableToModule = (parser, name, expression) => {
	if (!parser.state.current.addVariable) return false;
	var deps = [];
	parser.parse(expression, {
		current: {
			addDependency: dep => {
				dep.userRequest = name;
				deps.push(dep);
			}
		},
		module: parser.state.module
	});
	parser.state.current.addVariable(name, expression, deps);
	return true;
};

ParserHelpers.requireFileAsExpression = (context, pathToModule) => {
	var moduleJsPath = path.relative(context, pathToModule);
	if (!/^[A-Z]:/i.test(moduleJsPath)) {
		moduleJsPath = "./" + moduleJsPath.replace(/\\/g, "/");
	}
	return "require(" + JSON.stringify(moduleJsPath) + ")";
};

ParserHelpers.toConstantDependency = (parser, value) => {
	return function constDependency(expr) {
		var dep = new ConstDependency(value, expr.range, false);
		dep.loc = expr.loc;
		parser.state.current.addDependency(dep);
		return true;
	};
};

ParserHelpers.toConstantDependencyWithWebpackRequire = (parser, value) => {
	return function constDependencyWithWebpackRequire(expr) {
		var dep = new ConstDependency(value, expr.range, true);
		dep.loc = expr.loc;
		parser.state.current.addDependency(dep);
		return true;
	};
};

ParserHelpers.evaluateToString = value => {
	return function stringExpression(expr) {
		return new BasicEvaluatedExpression().setString(value).setRange(expr.range);
	};
};

ParserHelpers.evaluateToBoolean = value => {
	return function booleanExpression(expr) {
		return new BasicEvaluatedExpression()
			.setBoolean(value)
			.setRange(expr.range);
	};
};

ParserHelpers.evaluateToIdentifier = (identifier, truthy) => {
	return function identifierExpression(expr) {
		let evex = new BasicEvaluatedExpression()
			.setIdentifier(identifier)
			.setRange(expr.range);
		if (truthy === true) {
			evex = evex.setTruthy();
		} else if (truthy === false) {
			evex = evex.setFalsy();
		}
		return evex;
	};
};

ParserHelpers.expressionIsUnsupported = (parser, message) => {
	return function unsupportedExpression(expr) {
		var dep = new ConstDependency("(void 0)", expr.range, false);
		dep.loc = expr.loc;
		parser.state.current.addDependency(dep);
		if (!parser.state.module) return;
		parser.state.module.warnings.push(
			new UnsupportedFeatureWarning(parser.state.module, message, expr.loc)
		);
		return true;
	};
};

ParserHelpers.skipTraversal = function skipTraversal() {
	return true;
};

ParserHelpers.approve = function approve() {
	return true;
};
