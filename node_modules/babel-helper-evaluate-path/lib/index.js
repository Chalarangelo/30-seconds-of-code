"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

module.exports = function evaluate(path) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$tdz = _ref.tdz,
      tdz = _ref$tdz === undefined ? false : _ref$tdz;

  if (!tdz) {
    return baseEvaluate(path);
  }

  if (path.isReferencedIdentifier()) {
    return evaluateIdentifier(path);
  }

  var state = {
    confident: true
  };

  // prepare
  path.traverse({
    Scope(scopePath) {
      scopePath.skip();
    },
    ReferencedIdentifier(idPath) {
      var binding = idPath.scope.getBinding(idPath.node.name);
      // don't deopt globals
      // let babel take care of it
      if (!binding) return;

      var evalResult = evaluateIdentifier(idPath);
      if (!evalResult.confident) {
        state.confident = evalResult.confident;
        state.deoptPath = evalResult.deoptPath;
      }
    }
  });

  if (!state.confident) {
    return state;
  }

  return baseEvaluate(path);
};

function baseEvaluate(path) {
  try {
    return path.evaluate();
  } catch (e) {
    return {
      confident: false,
      error: e
    };
  }
}

// Original Source:
// https://github.com/babel/babel/blob/master/packages/babel-traverse/src/path/evaluation.js
// modified for Babel-minify use
function evaluateIdentifier(path) {
  if (!path.isReferencedIdentifier()) {
    throw new Error(`Expected ReferencedIdentifier. Got ${path.type}`);
  }

  var node = path.node;


  var binding = path.scope.getBinding(node.name);

  if (!binding) {
    return deopt(path);
  }

  if (binding.constantViolations.length > 0) {
    return deopt(binding.path);
  }

  // referenced in a different scope - deopt
  if (shouldDeoptBasedOnScope(binding, path)) {
    return deopt(path);
  }

  // let/var/const referenced before init
  // or "var" referenced in an outer scope
  var flowEvalResult = evaluateBasedOnControlFlow(binding, path);

  if (flowEvalResult.confident) {
    return flowEvalResult;
  }

  if (flowEvalResult.shouldDeopt) {
    return deopt(path);
  }

  return path.evaluate();
}

// check if referenced in a different fn scope
// we can't determine if this function is called sync or async
// if the binding is in program scope
// all it's references inside a different function should be deopted
function shouldDeoptBasedOnScope(binding, refPath) {
  if (binding.scope.path.isProgram() && refPath.scope !== binding.scope) {
    return true;
  }
  return false;
}

function evaluateBasedOnControlFlow(binding, refPath) {
  if (binding.kind === "var") {
    // early-exit
    var declaration = binding.path.parentPath;
    if (declaration.parentPath.isIfStatement() || declaration.parentPath.isLoop() || declaration.parentPath.isSwitchCase()) {
      return { shouldDeopt: true };
    }

    var blockParent = binding.path.scope.getBlockParent().path;
    var fnParent = binding.path.getFunctionParent();

    if (blockParent === fnParent) {
      if (!fnParent.isProgram()) blockParent = blockParent.get("body");
    }

    // detect Usage Outside Init Scope
    if (!blockParent.get("body").some(function (stmt) {
      return stmt.isAncestor(refPath);
    })) {
      return { shouldDeopt: true };
    }

    // Detect usage before init
    var stmts = fnParent.isProgram() ? fnParent.get("body") : fnParent.get("body").get("body");

    var compareResult = compareBindingAndReference({
      binding,
      refPath,
      stmts
    });

    if (compareResult.reference && compareResult.binding) {
      if (compareResult.reference.scope === "current" && compareResult.reference.idx < compareResult.binding.idx) {
        return { confident: true, value: void 0 };
      }

      return { shouldDeopt: true };
    }
  } else if (binding.kind === "let" || binding.kind === "const") {
    // binding.path is the declarator
    var declarator = binding.path;
    var _declaration = declarator.parentPath;

    if (_declaration.parentPath.isIfStatement() || _declaration.parentPath.isLoop() || _declaration.parentPath.isSwitchCase()) {
      return { shouldDeopt: true };
    }

    var scopePath = declarator.scope.path;
    if (scopePath.isFunction() || scopePath.isCatchClause()) {
      scopePath = scopePath.get("body");
    }

    // Detect Usage before Init
    var _stmts = scopePath.get("body");

    var _compareResult = compareBindingAndReference({
      binding,
      refPath,
      stmts: _stmts
    });

    if (_compareResult.reference && _compareResult.binding) {
      if (_compareResult.reference.scope === "current" && _compareResult.reference.idx < _compareResult.binding.idx) {
        throw new Error(`ReferenceError: Used ${refPath.node.name}: ` + `${binding.kind} binding before declaration`);
      }
      if (_compareResult.reference.scope === "other") {
        return { shouldDeopt: true };
      }
    }
  }

  return { confident: false, shouldDeopt: false };
}

function compareBindingAndReference(_ref2) {
  var binding = _ref2.binding,
      refPath = _ref2.refPath,
      stmts = _ref2.stmts;

  var state = {
    binding: null,
    reference: null
  };

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = stmts.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _ref3 = _step.value;

      var _ref4 = _slicedToArray(_ref3, 2);

      var idx = _ref4[0];
      var stmt = _ref4[1];

      if (stmt.isAncestor(binding.path)) {
        state.binding = { idx };
      }
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = binding.referencePaths[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var ref = _step2.value;

          if (ref === refPath && stmt.isAncestor(ref)) {
            state.reference = {
              idx,
              scope: binding.path.scope === ref.scope ? "current" : "other"
            };
            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return state;
}

function deopt(deoptPath) {
  return {
    confident: false,
    deoptPath
  };
}