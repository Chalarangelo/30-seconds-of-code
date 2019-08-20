"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

module.exports = function (_ref) {
  var t = _ref.types;

  var flipExpressions = require("babel-helper-flip-expressions")(t);
  var toMultipleSequenceExpressions = require("babel-helper-to-multiple-sequence-expressions")(t);
  var ifStatement = require("./if-statement")(t);
  var conditionalExpression = require("./conditional-expression")(t);
  var logicalExpression = require("./logical-expression")(t);
  var assignmentExpression = require("./assignment-expression")(t);

  var VOID_0 = t.unaryExpression("void", t.numericLiteral(0), true);
  var condExprSeen = Symbol("condExprSeen");
  var seqExprSeen = Symbol("seqExprSeen");
  var shouldRevisit = Symbol("shouldRevisit");

  return {
    name: "minify-simplify",
    visitor: {
      Statement: {
        exit(path) {
          if (path.node[shouldRevisit]) {
            delete path.node[shouldRevisit];
            path.visit();
          }
        }
      },

      // CallExpression(path) {
      // const { node } = path;

      /* (function() {})() -> !function() {}()
        There is a bug in babel in printing this. Disabling for now.
        if (t.isFunctionExpression(node.callee) &&
            (t.isExpressionStatement(parent) ||
             (t.isSequenceExpression(parent) && parent.expressions[0] === node))
        ) {
          path.replaceWith(
            t.callExpression(
              t.unaryExpression("!", node.callee, true),
              node.arguments
            )
          );
          return;
        }*/
      // },

      UnaryExpression: {
        enter: [
        // Demorgans.
        function (path) {
          var node = path.node;


          if (node.operator !== "!" || flipExpressions.hasSeen(node)) {
            return;
          }

          var expr = node.argument;

          // We need to make sure that the return type will always be boolean.
          if (!(t.isLogicalExpression(expr) || t.isConditionalExpression(expr) || t.isBinaryExpression(expr))) {
            return;
          }
          if (t.isBinaryExpression(expr) && t.COMPARISON_BINARY_OPERATORS.indexOf(expr.operator) === -1) {
            return;
          }

          if (flipExpressions.shouldFlip(expr, 1)) {
            var newNode = flipExpressions.flip(expr);
            path.replaceWith(newNode);
          }
        },

        // !(a, b, c) -> a, b, !c
        function (path) {
          var node = path.node;


          if (node.operator !== "!") {
            return;
          }

          if (!t.isSequenceExpression(node.argument)) {
            return;
          }

          var seq = node.argument.expressions;
          var expr = seq[seq.length - 1];
          seq[seq.length - 1] = t.unaryExpression("!", expr, true);
          path.replaceWith(node.argument);
        },

        // !(a ? b : c) -> a ? !b : !c
        function (path) {
          var node = path.node;


          if (node.operator !== "!") {
            return;
          }

          if (!t.isConditional(node.argument)) {
            return;
          }

          var cond = node.argument;
          cond.alternate = t.unaryExpression("!", cond.alternate, true);
          cond.consequent = t.unaryExpression("!", cond.consequent, true);
          path.replaceWith(node.argument);
        }]
      },

      LogicalExpression: {
        exit: logicalExpression.simplifyPatterns
      },

      AssignmentExpression: assignmentExpression.simplify,

      ConditionalExpression: {
        enter: [
        // !foo ? 'foo' : 'bar' -> foo ? 'bar' : 'foo'
        // foo !== 'lol' ? 'foo' : 'bar' -> foo === 'lol' ? 'bar' : 'foo'
        function flipIfOrConditional(path) {
          var node = path.node;

          if (!path.get("test").isLogicalExpression()) {
            flipNegation(node);
            return;
          }

          if (flipExpressions.shouldFlip(node.test)) {
            node.test = flipExpressions.flip(node.test);
            var _ref2 = [node.consequent, node.alternate];
            node.alternate = _ref2[0];
            node.consequent = _ref2[1];
          }
        }, conditionalExpression.simplifyPatterns],

        exit: [
        // a ? x = foo : b ? x = bar : x = baz;
        // x = a ? foo : b ? bar : baz;
        function (topPath) {
          if (!topPath.parentPath.isExpressionStatement() && !topPath.parentPath.isSequenceExpression()) {
            return;
          }

          var mutations = [];
          var firstLeft = null;
          var operator = null;
          function visit(path) {
            if (path.isConditionalExpression()) {
              var _bail = visit(path.get("consequent"));
              if (_bail) {
                return true;
              }
              _bail = visit(path.get("alternate"));
              return _bail;
            }

            if (operator == null) {
              operator = path.node.operator;
            } else if (path.node.operator !== operator) {
              return true;
            }

            if (!path.isAssignmentExpression() || !(path.get("left").isIdentifier() || path.get("left").isMemberExpression())) {
              return true;
            }

            var left = path.get("left").node;
            if (firstLeft == null) {
              firstLeft = left;
            } else if (!t.isNodesEquivalent(left, firstLeft)) {
              return true;
            }

            mutations.push(function () {
              return path.replaceWith(path.get("right").node);
            });
          }

          var bail = visit(topPath);
          if (bail) {
            return;
          }

          mutations.forEach(function (f) {
            return f();
          });
          topPath.replaceWith(t.assignmentExpression(operator, firstLeft, topPath.node));
        },

        // bar ? void 0 : void 0
        // (bar, void 0)
        // TODO: turn this into general equiv check
        function (path) {
          var node = path.node;

          if (isVoid0(node.consequent) && isVoid0(node.alternate)) {
            path.replaceWith(t.sequenceExpression([path.node.test, VOID_0]));
          }
        },

        // bar ? void 0 : foo ? void 0 : <etc>
        // bar || foo : void 0
        // TODO: turn this into general equiv check
        function (path) {
          var node = path.node;


          if (node[condExprSeen] || !isVoid0(node.consequent)) {
            return;
          }

          node[condExprSeen] = true;

          var tests = [node.test];
          var mutations = [];
          var alt = void 0;

          var _loop = function _loop(next) {
            next.node[condExprSeen] = true;
            alt = next.node.alternate;

            if (isVoid0(next.node.consequent)) {
              tests.push(next.node.test);
              mutations.push(function () {
                return next.remove();
              });
            } else {
              alt = next.node;
              return "break";
            }
          };

          for (var next = path.get("alternate"); next.isConditionalExpression(); next = next.get("alternate")) {
            var _ret = _loop(next);

            if (_ret === "break") break;
          }

          if (tests.length === 1) {
            return;
          }

          var test = tests.reduce(function (expr, curTest) {
            return t.logicalExpression("||", expr, curTest);
          });

          path.replaceWith(t.conditionalExpression(test, VOID_0, alt));
        }]
      },

      // concat
      VariableDeclaration: {
        enter: [
        // Put vars with no init at the top.
        function (path) {
          var node = path.node;


          if (node.declarations.length < 2) {
            return;
          }

          var inits = [];
          var empty = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = node.declarations[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var decl = _step.value;

              if (!decl.init) {
                empty.push(decl);
              } else {
                inits.push(decl);
              }
            }

            // This is based on exprimintation but there is a significant
            // imrpovement when we place empty vars at the top in smaller
            // files. Whereas it hurts in larger files.
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

          if (this.fitsInSlidingWindow) {
            node.declarations = empty.concat(inits);
          } else {
            node.declarations = inits.concat(empty);
          }
        }]
      },

      Function: {
        exit(path) {
          earlyReturnTransform(path);

          if (!path.node[shouldRevisit]) {
            return;
          }

          delete path.node[shouldRevisit];
          path.visit();
        }
      },

      For: {
        enter: earlyContinueTransform,
        exit: earlyContinueTransform
      },

      ForStatement: {
        // Merge previous expressions in the init part of the for.
        enter(path) {
          var node = path.node;

          if (!path.inList || node.init && !t.isExpression(node.init)) {
            return;
          }

          var prev = path.getSibling(path.key - 1);
          var consumed = false;
          if (prev.isVariableDeclaration()) {
            var referencedOutsideLoop = false;

            // we don't care if vars are referenced outside the loop as they are fn scope
            if (prev.node.kind === "let" || prev.node.kind === "const") {
              var ids = Object.keys(prev.getBindingIdentifiers());

              idloop: for (var i = 0; i < ids.length; i++) {
                var binding = prev.scope.bindings[ids[i]];
                // TODO
                // Temporary Fix
                // if there is no binding, we assume it is referenced outside
                // and deopt to avoid bugs
                if (!binding) {
                  referencedOutsideLoop = true;
                  break idloop;
                }
                var refs = binding.referencePaths;
                for (var j = 0; j < refs.length; j++) {
                  if (!isAncestor(path, refs[j])) {
                    referencedOutsideLoop = true;
                    break idloop;
                  }
                }
              }
            }

            if (!node.init && !referencedOutsideLoop) {
              node.init = prev.node;
              consumed = true;
            }
          } else if (prev.isExpressionStatement()) {
            var expr = prev.node.expression;
            if (node.init) {
              if (t.isSequenceExpression(expr)) {
                expr.expressions.push(node.init);
                node.init = expr;
              } else {
                node.init = t.sequenceExpression([expr, node.init]);
              }
            } else {
              node.init = expr;
            }
            consumed = true;
          }
          if (consumed) {
            prev.remove();
          }
        },

        exit(path) {
          var node = path.node;

          if (!node.test) {
            return;
          }

          if (!path.get("body").isBlockStatement()) {
            var bodyNode = path.get("body").node;
            if (!t.isIfStatement(bodyNode)) {
              return;
            }

            if (t.isBreakStatement(bodyNode.consequent, { label: null })) {
              node.test = t.logicalExpression("&&", node.test, t.unaryExpression("!", bodyNode.test, true));
              node.body = bodyNode.alternate || t.emptyStatement();
              return;
            }

            if (t.isBreakStatement(bodyNode.alternate, { label: null })) {
              node.test = t.logicalExpression("&&", node.test, bodyNode.test);
              node.body = bodyNode.consequent || t.emptyStatement();
              return;
            }

            return;
          }

          var statements = node.body.body;
          var exprs = [];
          var ifStatement = null;
          var breakAt = null;
          var i = 0;
          for (var statement; statement = statements[i]; i++) {
            if (t.isIfStatement(statement)) {
              if (t.isBreakStatement(statement.consequent, { label: null })) {
                ifStatement = statement;
                breakAt = "consequent";
              } else if (t.isBreakStatement(statement.alternate, { label: null })) {
                ifStatement = statement;
                breakAt = "alternate";
              }
              break;
            }

            // A statement appears before the break statement then bail.
            if (!t.isExpressionStatement(statement)) {
              return;
            }

            exprs.push(statement.expression);
          }

          if (!ifStatement) {
            return;
          }

          var rest = [];

          if (breakAt === "consequent") {
            if (t.isBlockStatement(ifStatement.alternate)) {
              rest.push.apply(rest, _toConsumableArray(ifStatement.alternate.body));
            } else if (ifStatement.alternate) {
              rest.push(ifStatement.alternate);
            }
          } else {
            if (t.isBlockStatement(ifStatement.consequent)) {
              rest.push.apply(rest, _toConsumableArray(ifStatement.consequent.body));
            } else if (ifStatement.consequent) {
              rest.push(ifStatement.consequent);
            }
          }

          rest.push.apply(rest, _toConsumableArray(statements.slice(i + 1)));

          var test = breakAt === "consequent" ? t.unaryExpression("!", ifStatement.test, true) : ifStatement.test;
          var expr = void 0;
          if (exprs.length === 1) {
            expr = t.sequenceExpression([exprs[0], test]);
          } else if (exprs.length) {
            exprs.push(test);
            expr = t.sequenceExpression(exprs);
          } else {
            expr = test;
          }

          node.test = t.logicalExpression("&&", node.test, expr);
          if (rest.length === 1) {
            node.body = rest[0];
          } else if (rest.length) {
            node.body = t.blockStatement(rest);
          } else {
            node.body = t.emptyStatement();
          }
        }
      },

      Program(path) {
        // An approximation of the resultant gzipped code after minification
        this.fitsInSlidingWindow = path.getSource().length / 10 < 33000;

        var node = path.node;

        var statements = toMultipleSequenceExpressions(node.body);
        if (!statements.length) {
          return;
        }
        node.body = statements;
      },

      BlockStatement: {
        enter(path) {
          var node = path.node,
              parent = path.parent;


          var top = [];
          var bottom = [];

          for (var i = 0; i < node.body.length; i++) {
            var bodyNode = node.body[i];
            if (t.isFunctionDeclaration(bodyNode)) {
              top.push(bodyNode);
            } else {
              bottom.push(bodyNode);
            }
          }

          var statements = top.concat(toMultipleSequenceExpressions(bottom));

          if (!statements.length) {
            return;
          }

          if (statements.length > 1 || needsBlock(node, parent) || node.directives) {
            node.body = statements;
            return;
          }

          if (statements.length) {
            path.replaceWith(statements[0]);
            return;
          }
        },

        exit(path) {
          var node = path.node,
              parent = path.parent;


          if (t.isArrowFunctionExpression(parent) && node.body.length === 1 && t.isReturnStatement(node.body[0]) && node.body[0].argument !== null) {
            path.replaceWith(node.body[0].argument);
            return;
          }

          if (needsBlock(node, parent)) {
            return;
          }

          if (node.body.length === 1) {
            path.get("body")[0].inList = false;
            path.replaceWith(node.body[0]);
            return;
          }

          if (node.body.length === 0) {
            path.replaceWith(t.emptyStatement());
            return;
          }

          // Check if oppurtinties to merge statements are available.
          var statements = node.body;
          if (!statements.length) {
            return;
          }

          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = statements[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var statement = _step2.value;

              if (!t.isExpressionStatement(statement)) {
                return;
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

          path.visit();
        }
      },

      ThrowStatement: createPrevExpressionEater("throw"),

      // Try to merge previous statements into a sequence
      ReturnStatement: {
        enter: [createPrevExpressionEater("return"),

        // Remove return if last statement with no argument.
        // Replace return with `void` argument with argument.
        function (path) {
          var node = path.node;


          if (!path.parentPath.parentPath.isFunction() || path.getSibling(path.key + 1).node) {
            return;
          }

          if (!node.argument) {
            path.remove();
            return;
          }

          if (t.isUnaryExpression(node.argument, { operator: "void" })) {
            path.replaceWith(node.argument.argument);
          }
        }]
      },

      // turn blocked ifs into single statements
      IfStatement: {
        exit: [ifStatement.mergeNestedIfs, ifStatement.simplify, ifStatement.switchConsequent, ifStatement.conditionalReturnToGuards, createPrevExpressionEater("if")]
      },

      WhileStatement(path) {
        var node = path.node;

        path.replaceWith(t.forStatement(null, node.test, null, node.body));
      },

      ForInStatement: createPrevExpressionEater("for-in"),

      // Flatten sequence expressions.
      SequenceExpression: {
        exit(path) {
          if (path.node[seqExprSeen]) {
            return;
          }

          function flatten(node) {
            node[seqExprSeen] = true;
            var ret = [];
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
              for (var _iterator3 = node.expressions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var n = _step3.value;

                if (t.isSequenceExpression(n)) {
                  ret.push.apply(ret, _toConsumableArray(flatten(n)));
                } else {
                  ret.push(n);
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

            return ret;
          }

          path.node.expressions = flatten(path.node);
        }
      },

      SwitchCase(path) {
        var node = path.node;


        if (!node.consequent.length) {
          return;
        }

        node.consequent = toMultipleSequenceExpressions(node.consequent);
      },

      SwitchStatement: {
        exit: [
        // Convert switch statements with all returns in their cases
        // to return conditional.
        function (path) {
          var node = path.node;

          // Need to be careful of side-effects.

          if (!t.isIdentifier(node.discriminant)) {
            return;
          }

          if (!node.cases.length) {
            return;
          }

          var consTestPairs = [];
          var fallThru = [];
          var defaultRet = void 0;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = node.cases[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              var switchCase = _step4.value;

              if (switchCase.consequent.length > 1) {
                return;
              }

              var cons = switchCase.consequent[0];

              // default case
              if (!switchCase.test) {
                if (!t.isReturnStatement(cons)) {
                  return;
                }
                defaultRet = cons;
                continue;
              }

              if (!switchCase.consequent.length) {
                fallThru.push(switchCase.test);
                continue;
              }

              // TODO: can we void it?
              if (!t.isReturnStatement(cons)) {
                return;
              }

              var test = t.binaryExpression("===", node.discriminant, switchCase.test);

              if (fallThru.length && !defaultRet) {
                test = fallThru.reduceRight(function (right, test) {
                  return t.logicalExpression("||", t.binaryExpression("===", node.discriminant, test), right);
                }, test);
              }
              fallThru = [];

              consTestPairs.push([test, cons.argument || VOID_0]);
            }

            // Bail if we have any remaining fallthrough
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

          if (fallThru.length) {
            return;
          }

          // We need the default to be there to make sure there is an oppurtinity
          // not to return.
          if (!defaultRet) {
            if (path.inList) {
              var nextPath = path.getSibling(path.key + 1);
              if (nextPath.isReturnStatement()) {
                defaultRet = nextPath.node;
                nextPath.remove();
              } else if (!nextPath.node && path.parentPath.parentPath.isFunction()) {
                // If this is the last statement in a function we just fake a void return.
                defaultRet = t.returnStatement(VOID_0);
              } else {
                return;
              }
            } else {
              return;
            }
          }

          var cond = consTestPairs.reduceRight(function (alt, _ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                test = _ref4[0],
                cons = _ref4[1];

            return t.conditionalExpression(test, cons, alt);
          }, defaultRet.argument || VOID_0);

          path.replaceWith(t.returnStatement(cond));

          // Maybe now we can merge with some previous switch statement.
          if (path.inList) {
            var prev = path.getSibling(path.key - 1);
            if (prev.isSwitchStatement()) {
              prev.visit();
            }
          }
        },

        // Convert switches into conditionals.
        function (path) {
          var node = path.node;

          // Need to be careful of side-effects.

          if (!t.isIdentifier(node.discriminant)) {
            return;
          }

          if (!node.cases.length) {
            return;
          }

          var exprTestPairs = [];
          var fallThru = [];
          var defaultExpr = void 0;
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (var _iterator5 = node.cases[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
              var switchCase = _step5.value;

              if (!switchCase.test) {
                if (switchCase.consequent.length !== 1) {
                  return;
                }
                if (!t.isExpressionStatement(switchCase.consequent[0])) {
                  return;
                }
                defaultExpr = switchCase.consequent[0].expression;
                continue;
              }

              if (!switchCase.consequent.length) {
                fallThru.push(switchCase.test);
                continue;
              }

              var _switchCase$consequen = _slicedToArray(switchCase.consequent, 2),
                  cons = _switchCase$consequen[0],
                  breakStatement = _switchCase$consequen[1];

              if (switchCase === node.cases[node.cases.length - 1]) {
                if (breakStatement && !t.isBreakStatement(breakStatement)) {
                  return;
                }
              } else if (!t.isBreakStatement(breakStatement)) {
                return;
              }

              if (!t.isExpressionStatement(cons) || switchCase.consequent.length > 2) {
                return;
              }

              var test = t.binaryExpression("===", node.discriminant, switchCase.test);
              if (fallThru.length && !defaultExpr) {
                test = fallThru.reduceRight(function (right, test) {
                  return t.logicalExpression("||", t.binaryExpression("===", node.discriminant, test), right);
                }, test);
              }
              fallThru = [];

              exprTestPairs.push([test, cons.expression]);
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

          if (fallThru.length) {
            return;
          }

          var cond = exprTestPairs.reduceRight(function (alt, _ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
                test = _ref6[0],
                cons = _ref6[1];

            return t.conditionalExpression(test, cons, alt);
          }, defaultExpr || VOID_0);

          path.replaceWith(cond);
        }, function (path) {
          var node = path.node;


          if (!node.cases.length) {
            return;
          }

          var lastCase = path.get("cases")[node.cases.length - 1];
          if (!lastCase.node.consequent.length) {
            return;
          }

          var potentialBreak = lastCase.get("consequent")[lastCase.node.consequent.length - 1];
          if (t.isBreakStatement(potentialBreak) && potentialBreak.node.label === null) {
            potentialBreak.remove();
          }
        }, createPrevExpressionEater("switch")]
      }
    }
  };

  function flipNegation(node) {
    if (!node.consequent || !node.alternate) {
      return;
    }

    var test = node.test;
    var flip = false;

    if (t.isBinaryExpression(test)) {
      if (test.operator === "!==") {
        test.operator = "===";
        flip = true;
      }

      if (test.operator === "!=") {
        test.operator = "==";
        flip = true;
      }
    }

    if (t.isUnaryExpression(test, { operator: "!" })) {
      node.test = test.argument;
      flip = true;
    }

    if (flip) {
      var consequent = node.consequent;
      node.consequent = node.alternate;
      node.alternate = consequent;
    }
  }

  function needsBlock(node, parent) {
    return t.isFunction(parent) && node === parent.body || t.isTryStatement(parent) || t.isCatchClause(parent) || t.isSwitchStatement(parent) || isSingleBlockScopeDeclaration(node) && (t.isIfStatement(parent) || t.isLoop(parent));
  }

  function isSingleBlockScopeDeclaration(block) {
    return t.isBlockStatement(block) && block.body.length === 1 && (t.isVariableDeclaration(block.body[0], { kind: "let" }) || t.isVariableDeclaration(block.body[0], { kind: "const" }) || t.isFunctionDeclaration(block.body[0]));
  }

  function isVoid0(expr) {
    return expr === VOID_0 || t.isUnaryExpression(expr, { operator: "void" }) && t.isNumericLiteral(expr.argument, { value: 0 });
  }

  function earlyReturnTransform(path) {
    var node = path.node;


    if (!t.isBlockStatement(node.body)) {
      return;
    }

    for (var i = node.body.body.length; i >= 0; i--) {
      var statement = node.body.body[i];
      if (t.isIfStatement(statement) && !statement.alternate && t.isReturnStatement(statement.consequent) && !statement.consequent.argument) {
        genericEarlyExitTransform(path.get("body").get("body")[i]);
      }
    }
  }

  function earlyContinueTransform(path) {
    var node = path.node;


    if (!t.isBlockStatement(node.body)) {
      return;
    }

    for (var i = node.body.body.length; i >= 0; i--) {
      var statement = node.body.body[i];
      if (t.isIfStatement(statement) && !statement.alternate && t.isContinueStatement(statement.consequent) && !statement.consequent.label) {
        genericEarlyExitTransform(path.get("body").get("body")[i]);
      }
    }

    // We may have reduced the body to a single statement.
    if (node.body.body.length === 1 && !needsBlock(node.body, node)) {
      path.get("body").replaceWith(node.body.body[0]);
    }
  }

  function genericEarlyExitTransform(path) {
    var node = path.node;


    var statements = path.parentPath.get(path.listKey).slice(path.key + 1).filter(function (stmt) {
      return !stmt.isFunctionDeclaration();
    });

    // deopt for any block scoped bindings
    // issue#399
    var deopt = !statements.every(function (stmt) {
      if (!(stmt.isVariableDeclaration({ kind: "let" }) || stmt.isVariableDeclaration({ kind: "const" }))) {
        return true;
      }
      var ids = Object.keys(stmt.getBindingIdentifiers());
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (var _iterator6 = ids[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
          var id = _step6.value;

          var binding = path.scope.getBinding(id);

          // TODO
          // Temporary Fix
          // if there is no binding, we assume it is referenced outside
          // and deopt to avoid bugs
          if (!binding) {
            return false;
          }

          var refs = [].concat(_toConsumableArray(binding.referencePaths), _toConsumableArray(binding.constantViolations));
          var _iteratorNormalCompletion7 = true;
          var _didIteratorError7 = false;
          var _iteratorError7 = undefined;

          try {
            for (var _iterator7 = refs[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
              var ref = _step7.value;

              if (!ref.isIdentifier()) return false;
              var fnParent = ref.getFunctionParent();

              // TODO
              // Usage of scopes and bindings in simplify plugin results in
              // undefined bindings because scope changes are not updated in the
              // scope tree. So, we deopt whenever we encounter one such issue
              // and not perform the transformation
              if (!fnParent) {
                return false;
              }
              if (fnParent.scope !== path.scope) return false;
            }
          } catch (err) {
            _didIteratorError7 = true;
            _iteratorError7 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion7 && _iterator7.return) {
                _iterator7.return();
              }
            } finally {
              if (_didIteratorError7) {
                throw _iteratorError7;
              }
            }
          }
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

      return true;
    });

    if (deopt) {
      path.visit();
      return false;
    }

    if (!statements.length) {
      path.replaceWith(t.expressionStatement(node.test));
      return;
    }

    var test = node.test;
    if (t.isBinaryExpression(test) && test.operator === "!==") {
      test.operator = "===";
    } else if (t.isBinaryExpression(test) && test.operator === "!=") {
      test.operator = "==";
    } else if (t.isUnaryExpression(test, { operator: "!" })) {
      node.test = test.argument;
    } else {
      node.test = t.unaryExpression("!", node.test, true);
    }

    path.get("consequent").replaceWith(t.blockStatement(statements.map(function (stmt) {
      return t.clone(stmt.node);
    })));

    var l = statements.length;
    while (l-- > 0) {
      if (!statements[l].isFunctionDeclaration()) {
        path.getSibling(path.key + 1).remove();
      }
    }

    // this should take care of removing the block
    path.visit();
  }

  function createPrevExpressionEater(keyword) {
    var key = void 0;
    switch (keyword) {
      case "switch":
        key = "discriminant";
        break;
      case "throw":
      case "return":
        key = "argument";
        break;
      case "if":
        key = "test";
        break;
      case "for-in":
        key = "right";
        break;
    }

    return function (path) {
      if (!path.inList) {
        return;
      }

      var node = path.node;

      var prev = path.getSibling(path.key - 1);
      if (!prev.isExpressionStatement()) {
        return;
      }

      var seq = prev.node.expression;
      if (node[key]) {
        if (t.isSequenceExpression(seq)) {
          seq.expressions.push(node[key]);
        } else {
          seq = t.sequenceExpression([seq, node[key]]);
        }
      } else {
        if (t.isSequenceExpression(seq)) {
          var lastExpr = seq.expressions[seq.expressions.length - 1];
          seq.expressions[seq.expressions.length - 1] = t.unaryExpression("void", lastExpr, true);
        } else {
          seq = t.unaryExpression("void", seq, true);
        }
      }

      if (seq) {
        node[key] = seq;
        prev.remove();

        // Since we were able to merge some stuff it's possible that this has opened
        // oppurtinties for other transforms to happen.
        // TODO: Look into changing the traversal order from bottom to up to avoid
        // having to revisit things.
        if (path.parentPath.parent) {
          path.parentPath.parent[shouldRevisit] = true;
        }
      }
    };
  }

  // path1 -> path2
  // is path1 an ancestor of path2
  function isAncestor(path1, path2) {
    return !!path2.findParent(function (parent) {
      return parent === path1;
    });
  }
};