"use strict";

const EVAL_SCOPE_MARKER = Symbol("evalInScope");

module.exports = {
  EVAL_SCOPE_MARKER,
  getEvalScopes,
  markEvalScopes,
  isMarked,
  hasEval
};

function getEvalScopes(path) {
  const evalScopes = new Set();

  function add(scope) {
    let evalScope = scope;
    do {
      evalScopes.add(evalScope);
    } while ((evalScope = evalScope.parent));
  }

  path.traverse({
    CallExpression(evalPath) {
      const callee = evalPath.get("callee");

      if (
        callee.isIdentifier() &&
        callee.node.name === "eval" &&
        !callee.scope.getBinding("eval")
      ) {
        add(callee.scope);
      }
    }
  });

  return evalScopes;
}

function markEvalScopes(path, key = EVAL_SCOPE_MARKER) {
  const evalScopes = getEvalScopes(path);
  [...evalScopes].forEach(scope => {
    scope[key] = true;
  });
}

function isMarked(scope, key = EVAL_SCOPE_MARKER) {
  return Object.prototype.hasOwnProperty.call(scope, key);
}

function hasEval(scope, key = EVAL_SCOPE_MARKER) {
  if (!isMarked(scope, key)) {
    markEvalScopes(scope, key);
  }
  return scope[key];
}
