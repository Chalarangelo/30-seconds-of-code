"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var EVAL_SCOPE_MARKER = Symbol("evalInScope");

module.exports = {
  EVAL_SCOPE_MARKER,
  getEvalScopes,
  markEvalScopes,
  isMarked,
  hasEval
};

function getEvalScopes(path) {
  var evalScopes = new Set();

  function add(scope) {
    var evalScope = scope;
    do {
      evalScopes.add(evalScope);
    } while (evalScope = evalScope.parent);
  }

  path.traverse({
    CallExpression(evalPath) {
      var callee = evalPath.get("callee");

      if (callee.isIdentifier() && callee.node.name === "eval" && !callee.scope.getBinding("eval")) {
        add(callee.scope);
      }
    }
  });

  return evalScopes;
}

function markEvalScopes(path) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EVAL_SCOPE_MARKER;

  var evalScopes = getEvalScopes(path);
  [].concat(_toConsumableArray(evalScopes)).forEach(function (scope) {
    scope[key] = true;
  });
}

function isMarked(scope) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EVAL_SCOPE_MARKER;

  return Object.prototype.hasOwnProperty.call(scope, key);
}

function hasEval(scope) {
  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : EVAL_SCOPE_MARKER;

  if (!isMarked(scope, key)) {
    markEvalScopes(scope, key);
  }
  return scope[key];
}