"use strict";

var evaluate = require("babel-helper-evaluate-path");

function isPureAndUndefined(rval) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      tdz = _ref.tdz,
      _ref$scope = _ref.scope,
      scope = _ref$scope === undefined ? { hasBinding: function hasBinding() {
      return false;
    } } : _ref$scope;

  if (rval.isIdentifier() && rval.node.name === "undefined") {
    // deopt right away if undefined is a local binding
    if (scope.hasBinding(rval.node.name, true /* no globals */)) {
      return false;
    }
    return true;
  }

  if (!rval.isPure()) {
    return false;
  }
  var evaluation = evaluate(rval, { tdz });
  return evaluation.confident === true && evaluation.value === undefined;
}

function getLoopParent(path, scopeParent) {
  var parent = path.findParent(function (p) {
    return p.isLoop() || p === scopeParent;
  });
  // don't traverse higher than the function the var is defined in.
  return parent === scopeParent ? null : parent;
}

function getFunctionParent(path, scopeParent) {
  var parent = path.findParent(function (p) {
    return p.isFunction();
  });
  // don't traverse higher than the function the var is defined in.
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

function hasViolation(declarator, scope, start) {
  var binding = scope.getBinding(declarator.node.id.name);
  if (!binding) {
    return true;
  }

  var scopeParent = declarator.getFunctionParent();

  var violation = binding.constantViolations.some(function (v) {
    // https://github.com/babel/minify/issues/630
    if (!v.node) {
      return false;
    }
    // return 'true' if we cannot guarantee the violation references
    // the initialized identifier after
    var violationStart = v.node.start;
    if (violationStart === undefined || violationStart < start) {
      return true;
    }

    var references = getFunctionReferences(v, scopeParent);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = references[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var ref = _step.value;

        if (ref.node.start === undefined || ref.node.start < start) {
          return true;
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

    for (var loop = getLoopParent(declarator, scopeParent); loop; loop = getLoopParent(loop, scopeParent)) {
      if (loop.node.end === undefined || loop.node.end > violationStart) {
        return true;
      }
    }
  });

  return violation;
}

module.exports = function () {
  return {
    name: "transform-remove-undefined",
    visitor: {
      SequenceExpression(path, _ref2) {
        var _ref2$opts = _ref2.opts;
        _ref2$opts = _ref2$opts === undefined ? {} : _ref2$opts;
        var tdz = _ref2$opts.tdz;

        var expressions = path.get("expressions");

        for (var i = 0; i < expressions.length; i++) {
          var expr = expressions[i];
          if (!isPureAndUndefined(expr, { tdz, scope: path.scope })) continue;

          // last value
          if (i === expressions.length - 1) {
            if (path.parentPath.isExpressionStatement()) {
              expr.remove();
            }
          } else {
            expr.remove();
          }
        }
      },

      ReturnStatement(path, _ref3) {
        var _ref3$opts = _ref3.opts;
        _ref3$opts = _ref3$opts === undefined ? {} : _ref3$opts;
        var tdz = _ref3$opts.tdz;

        if (path.node.argument !== null) {
          if (isPureAndUndefined(path.get("argument"), {
            tdz,
            scope: path.scope
          })) {
            path.node.argument = null;
          }
        }
      },

      VariableDeclaration(path, _ref4) {
        var _ref4$opts = _ref4.opts;
        _ref4$opts = _ref4$opts === undefined ? {} : _ref4$opts;
        var tdz = _ref4$opts.tdz;

        switch (path.node.kind) {
          case "const":
            break;
          case "let":
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = path.get("declarations")[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var declarator = _step2.value;

                if (isPureAndUndefined(declarator.get("init"), { tdz })) {
                  declarator.node.init = null;
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

            break;
          case "var":
            var start = path.node.start;
            if (start === undefined) {
              // This is common for plugin-generated nodes
              break;
            }
            var scope = path.scope;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = path.get("declarations")[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var _declarator = _step3.value;

                if (isPureAndUndefined(_declarator.get("init")) && !hasViolation(_declarator, scope, start)) {
                  _declarator.node.init = null;
                }
              }
            } catch (err) {
              _didIteratorError3 = true;
              _iteratorError3 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                  _iterator3.return();
                }
              } finally {
                if (_didIteratorError3) {
                  throw _iteratorError3;
                }
              }
            }

            break;
        }
      }
    }
  };
};