"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var some = require("lodash.some");

var _require = require("babel-helper-mark-eval-scopes"),
    markEvalScopes = _require.markEvalScopes,
    hasEval = _require.hasEval;

var removeUseStrict = require("./remove-use-strict");
var evaluate = require("babel-helper-evaluate-path");

function prevSiblings(path) {
  var parentPath = path.parentPath;
  var siblings = [];

  var key = parentPath.key;

  while ((path = parentPath.getSibling(--key)).type) {
    siblings.push(path);
  }
  return siblings;
}

function forEachAncestor(path, callback) {
  while (path = path.parentPath) {
    callback(path);
  }
}

module.exports = function (_ref) {
  var t = _ref.types,
      traverse = _ref.traverse;

  var removeOrVoid = require("babel-helper-remove-or-void")(t);
  var shouldRevisit = Symbol("shouldRevisit");

  // this is used for tracking fn params that can be removed
  // as traversal takes place from left and
  // unused params can be removed only on the right
  var markForRemoval = Symbol("markForRemoval");

  var main = {
    // remove side effectless statement
    ExpressionStatement(path) {
      if (path.get("expression").isPure()) {
        removeOrVoid(path);
      }
    },

    Function: {
      // Let's take all the vars in a function that are not in the top level scope and hoist them
      // with the first var declaration in the top-level scope. This transform in itself may
      // not yield much returns (or even can be marginally harmful to size). However it's great
      // for taking away statements from blocks that can be only expressions which the `simplify`
      // plugin can turn into other things (e.g. if => conditional).
      exit(path) {
        // This hurts gzip size.
        if (!this.optimizeRawSize) {
          return;
        }

        var node = path.node,
            scope = path.scope;

        var seen = new Set();
        var declars = [];
        var mutations = [];

        var _loop = function _loop(name) {
          var binding = scope.bindings[name];
          if (!binding.path.isVariableDeclarator()) {
            return "continue";
          }

          var declarPath = binding.path.parentPath;
          if (seen.has(declarPath)) {
            return "continue";
          }
          seen.add(declarPath);

          if (declarPath.parentPath.isForInStatement()) {
            return "continue";
          }

          if (declarPath.parentPath.parentPath.isFunction()) {
            return "continue";
          }

          if (!declarPath.node || !declarPath.node.declarations) {
            return "continue";
          }

          var assignmentSequence = [];

          var _loop2 = function _loop2(declar) {
            declars.push(declar);
            if (declar.init) {
              assignmentSequence.push(t.assignmentExpression("=", declar.id, declar.init));
              mutations.push(function () {
                declar.init = null;
              });
            }
          };

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = declarPath.node.declarations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var declar = _step2.value;

              _loop2(declar);
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

          if (assignmentSequence.length) {
            mutations.push(function () {
              return declarPath.replaceWith(t.sequenceExpression(assignmentSequence));
            });
          } else {
            mutations.push(function () {
              return removeOrVoid(declarPath);
            });
          }
        };

        for (var name in scope.bindings) {
          var _ret = _loop(name);

          if (_ret === "continue") continue;
        }

        if (declars.length) {
          mutations.forEach(function (f) {
            return f();
          });
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = node.body.body[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var statement = _step.value;

              if (t.isVariableDeclaration(statement)) {
                var _statement$declaratio;

                (_statement$declaratio = statement.declarations).push.apply(_statement$declaratio, declars);
                return;
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

          var varDecl = t.variableDeclaration("var", declars);
          node.body.body.unshift(varDecl);
        }
      }
    },

    // Remove bindings with no references.
    Scope: {
      exit(path) {
        if (path.node[shouldRevisit]) {
          delete path.node[shouldRevisit];
          path.visit();
        }
      },

      enter(path) {
        var _this = this;

        if (path.isProgram()) {
          return;
        }

        if (hasEval(path.scope)) {
          return;
        }

        var scope = path.scope;

        // if the scope is created by a function, we obtain its
        // parameter list

        var canRemoveParams = path.isFunction() && path.node.kind !== "set";
        var paramsList = canRemoveParams ? path.get("params") : [];

        for (var i = paramsList.length - 1; i >= 0; i--) {
          var param = paramsList[i];

          if (param.isIdentifier()) {
            var binding = scope.bindings[param.node.name];
            if (!binding) continue;

            if (binding.referenced) {
              // when the first binding is referenced (right to left)
              // exit without marking anything after this
              break;
            }

            binding[markForRemoval] = true;
            continue;
          } else if (param.isAssignmentPattern()) {
            var left = param.get("left");
            var right = param.get("right");

            if (left.isIdentifier() && right.isPure()) {
              var _binding = scope.bindings[left.node.name];
              if (_binding.referenced) {
                // when the first binding is referenced (right to left)
                // exit without marking anything after this
                break;
              }

              _binding[markForRemoval] = true;
              continue;
            }
          }

          // other patterns - assignment, object have side-effects
          // and cannot be safely removed
          break;
        }

        var _loop3 = function _loop3(name) {
          var binding = scope.bindings[name];

          if (!binding.referenced && binding.kind !== "module") {
            if (binding.kind === "param" && (_this.keepFnArgs || !binding[markForRemoval])) {
              return "continue";
            } else if (binding.path.isVariableDeclarator()) {
              var declaration = binding.path.parentPath;
              var maybeBlockParent = declaration.parentPath;
              if (maybeBlockParent && maybeBlockParent.isForXStatement({
                left: declaration.node
              })) {
                // Can't remove if in a for-in/for-of/for-await statement `for (var x in wat)`.
                return "continue";
              }
            } else if (!scope.isPure(binding.path.node)) {
              // TODO: AssignmentPattern are marked as impure and unused ids aren't removed yet
              return "continue";
            } else if (binding.path.isFunctionExpression() || binding.path.isClassExpression()) {
              // `bar(function foo() {})` foo is not referenced but it's used.
              return "continue";
            } else if (
            // ClassDeclaration has binding in two scopes
            //   1. The scope in which it is declared
            //   2. The class's own scope
            binding.path.isClassDeclaration() && binding.path === scope.path) {
              return "continue";
            }

            var mutations = [];
            var bail = false;
            // Make sure none of the assignments value is used
            binding.constantViolations.forEach(function (p) {
              if (bail || p === binding.path) {
                return;
              }

              if (!p.parentPath.isExpressionStatement()) {
                bail = true;
              }

              if (p.isAssignmentExpression() && !p.get("right").isPure()) {
                mutations.push(function () {
                  return p.replaceWith(p.get("right"));
                });
              } else {
                mutations.push(function () {
                  return removeOrVoid(p);
                });
              }
            });

            if (bail) {
              return "continue";
            }

            if (binding.path.isVariableDeclarator()) {
              if (!binding.path.get("id").isIdentifier()) {
                // deopt for object and array pattern
                return "continue";
              }

              // if declarator has some impure init expression
              // var x = foo();
              // => foo();
              if (binding.path.node.init && !scope.isPure(binding.path.node.init) && binding.path.parentPath.node.declarations) {
                // binding path has more than one declarations
                if (binding.path.parentPath.node.declarations.length !== 1) {
                  return "continue";
                }
                binding.path.parentPath.replaceWith(binding.path.node.init);
              } else {
                updateReferences(binding.path, _this);
                removeOrVoid(binding.path);
              }
            } else {
              updateReferences(binding.path, _this);
              removeOrVoid(binding.path);
            }

            mutations.forEach(function (f) {
              return f();
            });
            scope.removeBinding(name);
          } else if (binding.constant) {
            if (binding.path.isFunctionDeclaration() || binding.path.isVariableDeclarator() && binding.path.get("init").isFunction()) {
              var _ret4 = function () {
                var fun = binding.path.isFunctionDeclaration() ? binding.path : binding.path.get("init");
                var allInside = true;
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                  for (var _iterator3 = binding.referencePaths[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var ref = _step3.value;

                    if (!ref.find(function (p) {
                      return p.node === fun.node;
                    })) {
                      allInside = false;
                      break;
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

                if (allInside) {
                  scope.removeBinding(name);
                  updateReferences(binding.path, _this);
                  removeOrVoid(binding.path);
                  return {
                    v: "continue"
                  };
                }
              }();

              if (typeof _ret4 === "object") return _ret4.v;
            }

            if (binding.references === 1 && binding.kind !== "param" && binding.kind !== "module" && binding.constant) {
              var replacement = binding.path.node;
              var replacementPath = binding.path;
              var isReferencedBefore = false;

              var refPath = binding.referencePaths[0];

              if (t.isVariableDeclarator(replacement)) {
                var _prevSiblings = prevSiblings(replacementPath);
                // traverse ancestors of a reference checking if it's before declaration
                forEachAncestor(refPath, function (ancestor) {
                  if (_prevSiblings.indexOf(ancestor) > -1) {
                    isReferencedBefore = true;
                  }
                });

                // deopt if reference is in different scope than binding
                // since we don't know if it's sync or async execution
                // (i.e. whether value has been assigned to a reference or not)
                if (isReferencedBefore && refPath.scope !== binding.scope) {
                  return "continue";
                }

                // simulate hoisting by replacing value
                // with undefined if declaration is after reference
                replacement = isReferencedBefore ? t.unaryExpression("void", t.numericLiteral(0), true) : replacement.init;

                // Bail out for ArrayPattern and ObjectPattern
                // TODO: maybe a more intelligent approach instead of simply bailing out
                if (!replacementPath.get("id").isIdentifier()) {
                  return "continue";
                }
                replacementPath = replacementPath.get("init");
              }

              if (!replacement) {
                return "continue";
              }

              if (!scope.isPure(replacement, true) && !isReferencedBefore) {
                return "continue";
              }

              var _bail = false;

              if (replacementPath.isIdentifier()) {
                var _binding2 = scope.getBinding(replacement.name);
                // the reference should be in the same scope
                // and the replacement should be a constant - this is to
                // ensure that the duplication of replacement is not affected
                // https://github.com/babel/minify/issues/685
                _bail = !(_binding2 && refPath.scope.getBinding(replacement.name) === _binding2 && _binding2.constantViolations.length === 0);
              } else {
                replacementPath.traverse({
                  Function(path) {
                    path.skip();
                  },

                  ReferencedIdentifier(_ref2) {
                    var node = _ref2.node;

                    if (_bail) {
                      return;
                    }
                    var binding = scope.getBinding(node.name);
                    if (binding && refPath.scope.getBinding(node.name) === binding) {
                      _bail = binding.constantViolations.length > 0;
                    }
                  }
                });
              }

              if (_bail) {
                return "continue";
              }

              var parent = binding.path.parent;
              if (t.isVariableDeclaration(parent)) {
                parent = binding.path.parentPath.parent;
              }

              // 1. Make sure we share the parent with the node. In other words it's lexically defined
              // and not in an if statement or otherwise.
              // 2. If the replacement is an object then we have to make sure we are not in a loop or a function
              // because otherwise we'll be inlining and doing a lot more allocation than we have to
              // which would also could affect correctness in that they are not the same reference.
              var mayLoop = false;
              var sharesRoot = refPath.find(function (_ref3) {
                var node = _ref3.node;

                if (!mayLoop) {
                  mayLoop = t.isWhileStatement(node) || t.isFor(node) || t.isFunction(node);
                }
                return node === parent;
              });

              // Anything that inherits from Object.
              var isObj = function isObj(n) {
                return t.isFunction(n) || t.isObjectExpression(n) || t.isArrayExpression(n);
              };

              var isReplacementObj = isObj(replacement) || some(replacement, isObj);

              if (!sharesRoot || isReplacementObj && mayLoop) {
                return "continue";
              }

              // check if it's safe to replace
              // To solve https://github.com/babel/minify/issues/691
              // Here we bail for property checks using the "in" operator
              // This is because - `in` is a side-effect-free operation but the property
              // could be deleted between the replacementPath and referencePath
              // It is expensive to compute the delete operation and we bail for
              // all the binary "in" operations
              var inExpression = replacementPath.isBinaryExpression({
                operator: "in"
              });

              if (!inExpression) {
                replacementPath.traverse({
                  Function(path) {
                    path.skip();
                  },
                  BinaryExpression(path) {
                    if (path.node.operator === "in") {
                      inExpression = true;
                      path.stop();
                    }
                  }
                });
              }

              if (inExpression) {
                return "continue";
              }

              var replaced = replace(binding.referencePaths[0], {
                binding,
                scope,
                replacement,
                replacementPath
              });

              if (replaced) {
                scope.removeBinding(name);
                if (binding.path.node) {
                  removeOrVoid(binding.path);
                }
              }
            }
          }
        };

        for (var name in scope.bindings) {
          var _ret3 = _loop3(name);

          if (_ret3 === "continue") continue;
        } // end-for-of
      }
    },

    // Remove unreachable code.
    BlockStatement(path) {
      var paths = path.get("body");

      var purge = false;

      for (var i = 0; i < paths.length; i++) {
        var p = paths[i];

        if (!purge && p.isCompletionStatement()) {
          purge = true;
          continue;
        }

        if (purge && !canExistAfterCompletion(p)) {
          removeOrVoid(p);
        }
      }
    },

    // Double check unreachable code and remove return statements that
    // have no semantic meaning
    ReturnStatement(path) {
      var node = path.node;

      if (!path.inList) {
        return;
      }

      // Not last in its block? (See BlockStatement visitor)
      if (path.container.length - 1 !== path.key && !canExistAfterCompletion(path.getSibling(path.key + 1)) && path.parentPath.isBlockStatement()) {
        // This is probably a new oppurtinity by some other transform
        // let's call the block visitor on this again before proceeding.
        path.parentPath.pushContext(path.context);
        path.parentPath.visit();
        path.parentPath.popContext();

        return;
      }

      if (node.argument) {
        return;
      }

      var noNext = true;
      var parentPath = path.parentPath;
      while (parentPath && !parentPath.isFunction() && noNext) {
        // https://github.com/babel/minify/issues/265
        if (hasLoopParent(parentPath)) {
          noNext = false;
          break;
        }

        var nextPath = parentPath.getSibling(parentPath.key + 1);
        if (nextPath.node) {
          if (nextPath.isReturnStatement()) {
            nextPath.pushContext(path.context);
            nextPath.visit();
            nextPath.popContext();
            if (parentPath.getSibling(parentPath.key + 1).node) {
              noNext = false;
              break;
            }
          } else {
            noNext = false;
            break;
          }
        }

        parentPath = parentPath.parentPath;
      }

      if (noNext) {
        removeOrVoid(path);
      }
    },

    ConditionalExpression(path) {
      var node = path.node;

      var evaluateTest = path.get("test").evaluateTruthy();
      if (evaluateTest === true) {
        path.replaceWith(node.consequent);
      } else if (evaluateTest === false) {
        path.replaceWith(node.alternate);
      }
    },

    SwitchStatement: {
      exit(path) {
        var evaluated = evaluate(path.get("discriminant"), { tdz: this.tdz });

        if (!evaluated.confident) return;

        var discriminant = evaluated.value;
        var cases = path.get("cases");

        var matchingCaseIndex = -1;
        var defaultCaseIndex = -1;

        for (var i = 0; i < cases.length; i++) {
          var test = cases[i].get("test");

          // handle default case
          if (test.node === null) {
            defaultCaseIndex = i;
            continue;
          }

          var testResult = evaluate(test, { tdz: this.tdz });

          // if we are not able to deternine a test during
          // compile time, we terminate immediately
          if (!testResult.confident) return;

          if (testResult.value === discriminant) {
            matchingCaseIndex = i;
            break;
          }
        }

        var result = void 0;

        if (matchingCaseIndex === -1) {
          if (defaultCaseIndex === -1) {
            path.skip();
            path.replaceWithMultiple(extractVars(path));
            return;
          } else {
            result = getStatementsUntilBreak(defaultCaseIndex);
          }
        } else {
          result = getStatementsUntilBreak(matchingCaseIndex);
        }

        if (result.bail) return;

        // we extract vars from the entire switch statement
        // and there will be duplicates which
        // will be again removed by DCE
        replaceSwitch([].concat(_toConsumableArray(extractVars(path)), _toConsumableArray(result.statements)));

        function getStatementsUntilBreak(start) {
          var result = {
            bail: false,
            statements: []
          };

          for (var _i = start; _i < cases.length; _i++) {
            var consequent = cases[_i].get("consequent");

            for (var j = 0; j < consequent.length; j++) {
              var _isBreaking = isBreaking(consequent[j], path);
              if (_isBreaking.bail) {
                result.bail = true;
                return result;
              }
              if (_isBreaking.break) {
                // compute no more
                // exit out of the loop
                return result;
              } else {
                result.statements.push(consequent[j].node);
              }
            }
          }

          return result;
        }

        function replaceSwitch(statements) {
          var isBlockRequired = false;

          for (var _i2 = 0; _i2 < statements.length; _i2++) {
            if (t.isVariableDeclaration(statements[_i2], { kind: "let" })) {
              isBlockRequired = true;
              break;
            }
            if (t.isVariableDeclaration(statements[_i2], { kind: "const" })) {
              isBlockRequired = true;
              break;
            }
          }

          if (isBlockRequired) {
            path.replaceWith(t.BlockStatement(statements));
          } else {
            path.replaceWithMultiple(statements);
          }
        }
      }
    },

    WhileStatement(path) {
      var test = path.get("test");
      var result = evaluate(test, { tdz: this.tdz });
      if (result.confident && test.isPure() && !result.value) {
        path.remove();
      }
    },

    ForStatement(path) {
      var test = path.get("test");
      if (!test.isPure()) return;

      var result = evaluate(test, { tdz: this.tdz });
      if (result.confident) {
        if (result.value) {
          test.remove();
        } else {
          path.remove();
        }
      }
    },

    DoWhileStatement(path) {
      var test = path.get("test");
      var result = evaluate(test, { tdz: this.tdz });
      if (result.confident && test.isPure() && !result.value) {
        var body = path.get("body");

        if (body.isBlockStatement()) {
          var stmts = body.get("body");
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = stmts[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var stmt = _step4.value;

              var _isBreaking = isBreaking(stmt, path);
              if (_isBreaking.bail || _isBreaking.break) return;
              var _isContinuing = isContinuing(stmt, path);
              if (_isContinuing.bail || isContinuing.continue) return;
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4.return) {
                _iterator4.return();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }

          path.replaceWith(body.node);
        } else if (body.isBreakStatement()) {
          var _isBreaking2 = isBreaking(body, path);
          if (_isBreaking2.bail) return;
          if (_isBreaking2.break) path.remove();
        } else if (body.isContinueStatement()) {
          return;
        } else {
          path.replaceWith(body.node);
        }
      }
    },

    // Join assignment and definition when in sequence.
    // var x; x = 1; -> var x = 1;
    AssignmentExpression(path) {
      if (!path.get("left").isIdentifier() || !path.parentPath.isExpressionStatement()) {
        return;
      }

      var prev = path.parentPath.getSibling(path.parentPath.key - 1);
      if (!(prev && prev.isVariableDeclaration())) {
        return;
      }

      var declars = prev.node.declarations;
      if (declars.length !== 1 || declars[0].init || declars[0].id.name !== path.get("left").node.name) {
        return;
      }
      declars[0].init = path.node.right;
      removeOrVoid(path);
    },

    // Remove named function expression name. While this is dangerous as it changes
    // `function.name` all minifiers do it and hence became a standard.
    FunctionExpression(path) {
      if (!this.keepFnName) {
        removeUnreferencedId(path);
      }
    },

    // remove class names
    ClassExpression(path) {
      if (!this.keepClassName) {
        removeUnreferencedId(path);
      }
    },

    // Put the `var` in the left if feasible.
    ForInStatement(path) {
      var left = path.get("left");
      if (!left.isIdentifier()) {
        return;
      }

      var binding = path.scope.getBinding(left.node.name);
      if (!binding) {
        return;
      }

      if (binding.scope.getFunctionParent() !== path.scope.getFunctionParent()) {
        return;
      }

      if (!binding.path.isVariableDeclarator()) {
        return;
      }

      if (binding.path.parentPath.parentPath.isForInStatement({
        left: binding.path.parent
      })) {
        return;
      }

      // If it has company then it's probably more efficient to keep.
      if (binding.path.parent.declarations.length > 1) {
        return;
      }

      // meh
      if (binding.path.node.init) {
        return;
      }

      removeOrVoid(binding.path);
      path.node.left = t.variableDeclaration("var", [t.variableDeclarator(left.node)]);
      binding.path = path.get("left").get("declarations")[0];
    }
  };

  return {
    name: "minify-dead-code-elimination",
    visitor: {
      Function: {
        exit(path) {
          /**
           * Use exit handler to traverse in a dfs post-order fashion
           * to remove use strict
           */
          var body = path.get("body");
          if (body.isBlockStatement()) {
            removeUseStrict(body);
          }
        }
      },
      IfStatement: {
        exit(path, _ref4) {
          var _ref4$opts = _ref4.opts;
          _ref4$opts = _ref4$opts === undefined ? {} : _ref4$opts;
          var _ref4$opts$tdz = _ref4$opts.tdz,
              tdz = _ref4$opts$tdz === undefined ? false : _ref4$opts$tdz;

          var consequent = path.get("consequent");
          var alternate = path.get("alternate");
          var test = path.get("test");

          var evalResult = evaluate(test, { tdz });
          var isPure = test.isPure();

          var replacements = [];
          if (evalResult.confident && !isPure && test.isSequenceExpression()) {
            replacements.push(t.expressionStatement(extractSequenceImpure(test)));
          }

          // we can check if a test will be truthy 100% and if so then we can inline
          // the consequent and completely ignore the alternate
          //
          //   if (true) { foo; } -> { foo; }
          //   if ("foo") { foo; } -> { foo; }
          //
          if (evalResult.confident && evalResult.value) {
            path.replaceWithMultiple([].concat(replacements, _toConsumableArray(toStatements(consequent)), _toConsumableArray(extractVars(alternate))));
            return;
          }

          // we can check if a test will be falsy 100% and if so we can inline the
          // alternate if there is one and completely remove the consequent
          //
          //   if ("") { bar; } else { foo; } -> { foo; }
          //   if ("") { bar; } ->
          //
          if (evalResult.confident && !evalResult.value) {
            if (alternate.node) {
              path.replaceWithMultiple([].concat(replacements, _toConsumableArray(toStatements(alternate)), _toConsumableArray(extractVars(consequent))));
              return;
            } else {
              path.replaceWithMultiple([].concat(replacements, _toConsumableArray(extractVars(consequent))));
            }
          }

          // remove alternate blocks that are empty
          //
          //   if (foo) { foo; } else {} -> if (foo) { foo; }
          //
          if (alternate.isBlockStatement() && !alternate.node.body.length) {
            alternate.remove();
            // For if-statements babel-traverse replaces with an empty block
            path.node.alternate = null;
          }

          // if the consequent block is empty turn alternate blocks into a consequent
          // and flip the test
          //
          //   if (foo) {} else { bar; } -> if (!foo) { bar; }
          //
          if (consequent.isBlockStatement() && !consequent.node.body.length && alternate.isBlockStatement() && alternate.node.body.length) {
            consequent.replaceWith(alternate.node);
            alternate.remove();
            // For if-statements babel-traverse replaces with an empty block
            path.node.alternate = null;
            test.replaceWith(t.unaryExpression("!", test.node, true));
          }
        }
      },

      EmptyStatement(path) {
        if (path.parentPath.isBlockStatement() || path.parentPath.isProgram()) {
          path.remove();
        }
      },

      Program: {
        exit(path) {
          var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
              _ref5$opts = _ref5.opts;

          _ref5$opts = _ref5$opts === undefined ? {} : _ref5$opts;
          var _ref5$opts$optimizeRa = _ref5$opts.optimizeRawSize,
              optimizeRawSize = _ref5$opts$optimizeRa === undefined ? false : _ref5$opts$optimizeRa,
              _ref5$opts$keepFnName = _ref5$opts.keepFnName,
              keepFnName = _ref5$opts$keepFnName === undefined ? false : _ref5$opts$keepFnName,
              _ref5$opts$keepClassN = _ref5$opts.keepClassName,
              keepClassName = _ref5$opts$keepClassN === undefined ? false : _ref5$opts$keepClassN,
              _ref5$opts$keepFnArgs = _ref5$opts.keepFnArgs,
              keepFnArgs = _ref5$opts$keepFnArgs === undefined ? false : _ref5$opts$keepFnArgs,
              _ref5$opts$tdz = _ref5$opts.tdz,
              tdz = _ref5$opts$tdz === undefined ? false : _ref5$opts$tdz;

          (traverse.clearCache || traverse.cache.clear)();
          path.scope.crawl();

          markEvalScopes(path);

          // We need to run this plugin in isolation.
          path.traverse(main, {
            functionToBindings: new Map(),
            optimizeRawSize,
            keepFnName,
            keepClassName,
            keepFnArgs,
            tdz
          });
        }
      }
    }
  };

  function toStatements(path) {
    var node = path.node;

    if (path.isBlockStatement()) {
      var hasBlockScoped = false;

      for (var i = 0; i < node.body.length; i++) {
        var bodyNode = node.body[i];
        if (t.isBlockScoped(bodyNode)) {
          hasBlockScoped = true;
        }
      }

      if (!hasBlockScoped) {
        return node.body;
      }
    }
    return [node];
  }

  // Extracts vars from a path
  // Useful for removing blocks or paths that can contain
  // variable declarations inside them
  // Note:
  // drops are inits
  // extractVars({ var x = 5, y = x }) => var x, y;
  function extractVars(path) {
    var declarators = [];

    if (path.isVariableDeclaration({ kind: "var" })) {
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = path.node.declarations[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var decl = _step5.value;

          var bindingIds = Object.keys(t.getBindingIdentifiers(decl.id));

          declarators.push.apply(declarators, _toConsumableArray(bindingIds.map(function (name) {
            return t.variableDeclarator(t.identifier(name));
          })));
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    } else {
      path.traverse({
        VariableDeclaration(varPath) {
          if (!varPath.isVariableDeclaration({ kind: "var" })) return;
          if (!isSameFunctionScope(varPath, path)) return;

          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (var _iterator6 = varPath.node.declarations[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
              var _decl = _step6.value;

              var _bindingIds = Object.keys(t.getBindingIdentifiers(_decl.id));
              declarators.push.apply(declarators, _toConsumableArray(_bindingIds.map(function (name) {
                return t.variableDeclarator(t.identifier(name));
              })));
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6.return) {
                _iterator6.return();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }
        }
      });
    }

    if (declarators.length <= 0) return [];

    return [t.variableDeclaration("var", declarators)];
  }

  function replace(path, options) {
    var replacement = options.replacement,
        replacementPath = options.replacementPath,
        scope = options.scope,
        binding = options.binding;

    // Same name, different binding.

    if (scope.getBinding(path.node.name) !== binding) {
      return;
    }

    // We don't want to move code around to different scopes because:
    // 1. Original bindings that is referenced could be shadowed
    // 2. Moving defintions to potentially hot code is bad
    if (scope !== path.scope) {
      if (t.isClass(replacement) || t.isFunction(replacement)) {
        return;
      }

      var bail = false;
      traverse(replacement, {
        Function(path) {
          if (bail) {
            return;
          }
          bail = true;
          path.stop();
        }
      }, scope);

      if (bail) {
        return;
      }
    }

    // Avoid recursion.
    if (path.find(function (_ref6) {
      var node = _ref6.node;
      return node === replacement;
    })) {
      return;
    }

    // https://github.com/babel/minify/issues/611
    // this is valid only for FunctionDeclaration where we convert
    // function declaration to expression in the next step
    if (replacementPath.isFunctionDeclaration()) {
      var fnName = replacementPath.get("id").node.name;
      for (var name in replacementPath.scope.bindings) {
        if (name === fnName) {
          return;
        }
      }
    }

    // https://github.com/babel/minify/issues/130
    if (!t.isExpression(replacement)) {
      t.toExpression(replacement);
    }

    // We don't remove fn name here, we let the FnExpr & ClassExpr visitors
    // check its references and remove unreferenced ones
    // if (t.isFunction(replacement)) {
    //   replacement.id = null;
    // }

    path.replaceWith(replacement);
    return true;
  }

  function updateReferences(fnToDeletePath) {
    if (!fnToDeletePath.isFunction()) {
      return;
    }

    fnToDeletePath.traverse({
      ReferencedIdentifier(path) {
        var node = path.node,
            scope = path.scope;

        var binding = scope.getBinding(node.name);

        if (!binding || !binding.path.isFunction() || binding.scope === scope || !binding.constant) {
          return;
        }

        var index = binding.referencePaths.indexOf(path);
        if (index === -1) {
          return;
        }
        binding.references--;
        binding.referencePaths.splice(index, 1);
        if (binding.references === 0) {
          binding.referenced = false;
        }

        if (binding.references <= 1 && binding.scope.path.node) {
          binding.scope.path.node[shouldRevisit] = true;
        }
      }
    });
  }

  function removeUnreferencedId(path) {
    var id = path.get("id").node;
    if (!id) {
      return;
    }

    var node = path.node,
        scope = path.scope;

    var binding = scope.getBinding(id.name);

    // Check if shadowed or is not referenced.
    if (binding && (binding.path.node !== node || !binding.referenced)) {
      node.id = null;
    }
  }

  // path1 -> path2
  // is path1 an ancestor of path2
  function isAncestor(path1, path2) {
    return !!path2.findParent(function (parent) {
      return parent === path1;
    });
  }

  function isSameFunctionScope(path1, path2) {
    return path1.scope.getFunctionParent() === path2.scope.getFunctionParent();
  }

  function isBreaking(stmt, path) {
    return isControlTransfer(stmt, path, "break");
  }

  function isContinuing(stmt, path) {
    return isControlTransfer(stmt, path, "continue");
  }

  // tells if a "stmt" is a break/continue statement
  function isControlTransfer(stmt, path) {
    var control = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "break";
    var _break$continue = {
      break: "BreakStatement",
      continue: "ContinueStatement"
    },
        type = _break$continue[control];

    if (!type) {
      throw new Error("Can only handle break and continue statements");
    }
    var checker = `is${type}`;

    if (stmt[checker]()) {
      return _isControlTransfer(stmt, path);
    }

    var isTransferred = false;
    var result = {
      [control]: false,
      bail: false
    };

    stmt.traverse({
      [type](cPath) {
        // if we already detected a break/continue statement,
        if (isTransferred) return;

        result = _isControlTransfer(cPath, path);

        if (result.bail || result[control]) {
          isTransferred = true;
        }
      }
    });

    return result;

    function _isControlTransfer(cPath, path) {
      var label = cPath.get("label");

      if (label.node !== null) {
        // labels are fn scoped and not accessible by inner functions
        // path is the switch statement
        if (!isSameFunctionScope(path, cPath)) {
          // we don't have to worry about this break statement
          return {
            break: false,
            bail: false
          };
        }

        // here we handle the break labels
        // if they are outside switch, we bail out
        // if they are within the case, we keep them
        var labelPath = void 0;
        if (path.scope.getLabel) {
          labelPath = getLabel(label.node.name, path);
        } else {
          labelPath = path.scope.getBinding(label.node.name).path;
        }
        var _isAncestor = isAncestor(labelPath, path);

        return {
          bail: _isAncestor,
          [control]: _isAncestor
        };
      }

      // set the flag that it is indeed breaking
      var isCTransfer = true;

      // this flag is to capture
      // switch(0) { case 0: while(1) if (x) break; }
      var possibleRunTimeControlTransfer = false;

      // and compute if it's breaking the correct thing
      var parent = cPath.parentPath;

      while (parent !== stmt.parentPath) {
        // loops and nested switch cases
        if (parent.isLoop() || parent.isSwitchCase()) {
          // invalidate all the possible runtime breaks captured
          // while (1) { if (x) break; }
          possibleRunTimeControlTransfer = false;

          // and set that it's not breaking our switch statement
          isCTransfer = false;
          break;
        }
        //
        // this is a special case and depends on
        // the fact that SwitchStatement is handled in the
        // exit hook of the traverse
        //
        // switch (0) {
        //   case 0: if (x) break;
        // }
        //
        // here `x` is runtime only.
        // in this case, we need to bail out. So we depend on exit hook
        // of switch so that, it would have visited the IfStatement first
        // before the SwitchStatement and would have removed the
        // IfStatement if it was a compile time determined
        //
        if (parent.isIfStatement()) {
          possibleRunTimeControlTransfer = true;
        }
        parent = parent.parentPath;
      }

      return {
        [control]: possibleRunTimeControlTransfer || isCTransfer,
        bail: possibleRunTimeControlTransfer
      };
    }
  }

  // things that are hoisted
  function canExistAfterCompletion(path) {
    return path.isFunctionDeclaration() || path.isVariableDeclaration({ kind: "var" });
  }

  function getLabel(name, _path) {
    var label = void 0,
        path = _path;
    do {
      label = path.scope.getLabel(name);
      if (label) {
        return label;
      }
    } while (path = path.parentPath);
    return null;
  }

  function hasLoopParent(path) {
    var parent = path;
    do {
      if (parent.isLoop()) {
        return true;
      }
    } while (parent = parent.parentPath);
    return false;
  }

  function extractSequenceImpure(seq) {
    var expressions = seq.get("expressions");
    var result = [];
    for (var i = 0; i < expressions.length; i++) {
      if (!expressions[i].isPure()) {
        result.push(expressions[i].node);
      }
    }
    return t.sequenceExpression(result);
  }
};