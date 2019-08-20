"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var COLLAPSERS = [require("./object-collapser"), require("./array-collapser"), require("./array-property-collapser"), require("./set-collapser")].map(function (Collapser) {
  return new Collapser();
});

function getFunctionParent(path, scopeParent) {
  var parent = path.findParent(function (p) {
    return p.isFunction();
  });
  // don"t traverse higher than the function the var is defined in.
  return parent === scopeParent ? null : parent;
}

function getFunctionReferences(path, scopeParent) {
  var references = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Set();

  for (var func = getFunctionParent(path, scopeParent); func; func = getFunctionParent(func, scopeParent)) {
    var id = func.node.id;
    var binding = id && func.scope.getBinding(id.name);

    if (!binding) {
      continue;
    }

    binding.referencePaths.forEach(function (path) {
      if (!references.has(path)) {
        references.add(path);
        getFunctionReferences(path, scopeParent, references);
      }
    });
  }
  return references;
}

function getIdAndFunctionReferences(name, parent) {
  // Returns false if there's an error. Otherwise returns a list of references.
  var binding = parent.scope.getBinding(name);
  if (!binding) {
    return false;
  }

  var references = binding.referencePaths.reduce(function (references, ref) {
    references.add(ref);
    getFunctionReferences(ref, parent, references);
    return references;
  }, new Set());

  return Array.from(references);
}

function validateTopLevel(path) {
  // Ensures the structure is of the form (roughly):
  // {
  //   ...
  //   var foo = expr;
  //   ...
  // }
  // returns null if not of this form
  // otherwise returns [foo as string, ?rval, index of the variable declaration]

  var declarations = path.get("declarations");
  if (declarations.length !== 1) {
    return;
  }

  var declaration = declarations[0];
  var id = declaration.get("id"),
      init = declaration.get("init");
  if (!id.isIdentifier()) {
    return;
  }

  var parent = path.parentPath;
  if (!parent.isBlockParent() || !parent.isScopable()) {
    return;
  }

  var body = parent.get("body");
  if (!Array.isArray(body)) {
    return;
  }
  var startIndex = body.indexOf(path);
  if (startIndex === -1) {
    return;
  }

  return [id.node.name, init, startIndex];
}

function collectExpressions(path, isExprTypeValid) {
  // input: ExprStatement => 'a | SequenceExpression
  // SequenceExpression => 'a list
  // Validates 'a is of the right type
  // returns null if found inconsistency, else returns Array<"a>
  if (path.isExpressionStatement()) {
    var exprs = collectExpressions(path.get("expression"), isExprTypeValid);
    return exprs !== null ? exprs : null;
  }

  if (path.isSequenceExpression()) {
    var _exprs = path.get("expressions").map(function (p) {
      return collectExpressions(p, isExprTypeValid);
    });
    if (_exprs.some(function (e) {
      return e === null;
    })) {
      return null;
    } else {
      return _exprs.reduce(function (s, n) {
        return s.concat(n);
      }, []); // === Array.flatten
    }
  }

  if (isExprTypeValid(path)) {
    return [path];
  }

  return null;
}

function getContiguousStatementsAndExpressions(body, start, end, isExprTypeValid, checkExpr) {
  var statements = [];
  var allExprs = [];
  for (var i = start; i < end; i++) {
    var exprs = collectExpressions(body[i], isExprTypeValid);
    if (exprs === null || !exprs.every(function (e) {
      return checkExpr(e);
    })) {
      break;
    }
    statements.push(body[i]);
    allExprs = allExprs.concat(exprs);
  }
  return [statements, allExprs];
}

function getReferenceChecker(references) {
  // returns a function s.t. given an expr, returns true iff expr is an ancestor of a reference
  return function (expr) {
    return references.some(function (r) {
      return r === expr || r.isDescendant(expr);
    });
  };
}

function tryUseCollapser(t, collapser, varDecl, topLevel, checkReference) {
  // Returns true iff successfully used the collapser. Otherwise returns undefined.
  var _topLevel = _slicedToArray(topLevel, 3),
      name = _topLevel[0],
      init = _topLevel[1],
      startIndex = _topLevel[2];

  if (!collapser.isInitTypeValid(init)) {
    return;
  }

  var body = varDecl.parentPath.get("body");

  var _getContiguousStateme = getContiguousStatementsAndExpressions(body, startIndex + 1, body.length, collapser.isExpressionTypeValid, collapser.getExpressionChecker(name, checkReference)),
      _getContiguousStateme2 = _slicedToArray(_getContiguousStateme, 2),
      statements = _getContiguousStateme2[0],
      exprs = _getContiguousStateme2[1];

  if (statements.length === 0) {
    return;
  }

  var assignments = exprs.map(function (e) {
    return collapser.extractAssignment(e);
  });
  var oldInit = init.node;
  var newInit = t.cloneDeep(oldInit);
  if (!assignments.every(function (assignment) {
    return collapser.addSuccessfully(t, assignment, newInit);
  })) {
    return;
  }

  // some collapses may increase the size
  if (!collapser.isSizeSmaller({
    newInit,
    oldInit,
    varDecl,
    assignments,
    statements
  })) {
    return;
  }

  init.replaceWith(newInit);
  statements.forEach(function (s) {
    return s.remove();
  });
  return true;
}

module.exports = function (_ref) {
  var t = _ref.types;

  return {
    name: "transform-inline-consecutive-adds",
    visitor: {
      VariableDeclaration(varDecl) {
        var topLevel = validateTopLevel(varDecl);
        if (!topLevel) {
          return;
        }

        var _topLevel2 = _slicedToArray(topLevel, 1),
            name = _topLevel2[0];

        var references = getIdAndFunctionReferences(name, varDecl.parentPath);
        if (references === false) {
          return;
        }
        var checkReference = getReferenceChecker(references);

        if (COLLAPSERS.some(function (c) {
          return tryUseCollapser(t, c, varDecl, topLevel, checkReference);
        })) {
          return;
        }
      }
    }
  };
};