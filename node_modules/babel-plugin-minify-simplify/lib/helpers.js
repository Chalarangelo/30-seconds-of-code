"use strict";

var VOID_0 = function VOID_0(t) {
  return t.unaryExpression("void", t.numericLiteral(0), true);
};

// Types as Symbols - for comparing types
var types = {};
// This is a test key which is used to avoid Object.keys check
// Object.keys() check is really expensive
// https://gist.github.com/vigneshshanmugam/c766550ecd02292dcdfbf0bf013b9d3d
var testKey = "Expression";

var typeSymbols = function typeSymbols(t) {
  // don't recompute
  if (types[testKey] !== undefined) {
    return types;
  }
  t.TYPES.forEach(function (type) {
    types[type] = Symbol.for(type);
  });
  return types;
};

var isNodeOfType = function isNodeOfType(t, node, typeSymbol) {
  return typeof typeSymbol !== "symbol" ? false : t["is" + Symbol.keyFor(typeSymbol)](node);
};

var isPatternMatchesPath = function isPatternMatchesPath(t) {
  return function _isPatternMatchesPath(patternValue, inputPath) {
    if (Array.isArray(patternValue)) {
      for (var i = 0; i < patternValue.length; i++) {
        if (_isPatternMatchesPath(patternValue[i], inputPath)) {
          return true;
        }
      }
      return false;
    }
    if (typeof patternValue === "function") {
      return patternValue(inputPath);
    }
    if (isNodeOfType(t, inputPath.node, patternValue)) return true;
    var evalResult = inputPath.evaluate();
    if (!evalResult.confident || !inputPath.isPure()) return false;
    return evalResult.value === patternValue;
  };
};

module.exports = {
  VOID_0,
  // Types as Symbols
  typeSymbols,
  // This is required for resolving type aliases
  isNodeOfType,
  isPatternMatchesPath
};