"use strict";

var h = require("./helpers");
var PatternMatch = require("./pattern-match");

module.exports = function (t) {
  var OP_AND = function OP_AND(input) {
    return input === "&&";
  };
  var OP_OR = function OP_OR(input) {
    return input === "||";
  };

  function simplifyPatterns(path) {
    // cache of path.evaluate()
    var evaluateMemo = new Map();

    var TRUTHY = function TRUTHY(input) {
      // !NaN and !undefined are truthy
      // separate check here as they are considered impure by babel
      if (input.isUnaryExpression() && input.get("argument").isIdentifier()) {
        if (input.node.argument.name === "NaN" || input.node.argument.name === "undefined") {
          return true;
        }
      }
      var evalResult = input.evaluate();
      evaluateMemo.set(input, evalResult);
      return evalResult.confident && input.isPure() && evalResult.value;
    };

    var FALSY = function FALSY(input) {
      // NaN and undefined are falsy
      // separate check here as they are considered impure by babel
      if (input.isIdentifier()) {
        if (input.node.name === "NaN" || input.node.name === "undefined") {
          return true;
        }
      }
      var evalResult = input.evaluate();
      evaluateMemo.set(input, evalResult);
      return evalResult.confident && input.isPure() && !evalResult.value;
    };

    var _h$typeSymbols = h.typeSymbols(t),
        EX = _h$typeSymbols.Expression;

    // Convention:
    // [left, operator, right, handler(leftNode, rightNode)]


    var matcher = new PatternMatch([[TRUTHY, OP_AND, EX, function (l, r) {
      return r;
    }], [FALSY, OP_AND, EX, function (l) {
      return l;
    }], [TRUTHY, OP_OR, EX, function (l) {
      return l;
    }], [FALSY, OP_OR, EX, function (l, r) {
      return r;
    }]]);

    var left = path.get("left");
    var right = path.get("right");
    var operator = path.node.operator;

    var result = matcher.match([left, operator, right], h.isPatternMatchesPath(t));

    if (result.match) {
      // here we are sure that left.evaluate is always confident becuase
      // it satisfied one of TRUTHY/FALSY paths
      var value = void 0;
      if (evaluateMemo.has(left)) {
        value = evaluateMemo.get(left).value;
      } else {
        value = left.evaluate().value;
      }
      path.replaceWith(result.value(t.valueToNode(value), right.node));
    }
  }

  return {
    simplifyPatterns
  };
};