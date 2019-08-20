"use strict";

var REPLACED = Symbol("replaced");
var h = require("./helpers");

module.exports = function (t) {
  function mergeNestedIfs(path) {
    var consequent = path.get("consequent");
    var alternate = path.get("alternate");

    // not nested if
    if (!consequent.isIfStatement()) return;

    // there are no alternate nodes in both the if statements (nested)
    if (alternate.node || consequent.get("alternate").node) return;

    var test = path.get("test");
    test.replaceWith(t.logicalExpression("&&", test.node, consequent.get("test").node));

    consequent.replaceWith(t.clone(consequent.get("consequent").node));
  }

  // No alternate, make into a guarded expression
  function toGuardedExpression(path) {
    var node = path.node;

    if (node.consequent && !node.alternate && node.consequent.type === "ExpressionStatement") {
      var op = "&&";
      if (t.isUnaryExpression(node.test, { operator: "!" })) {
        node.test = node.test.argument;
        op = "||";
      }

      path.replaceWith(t.expressionStatement(t.logicalExpression(op, node.test, node.consequent.expression)));
      return REPLACED;
    }
  }

  // both consequent and alternate are expressions, turn into ternary
  function toTernary(path) {
    var node = path.node;

    if (t.isExpressionStatement(node.consequent) && t.isExpressionStatement(node.alternate)) {
      path.replaceWith(t.conditionalExpression(node.test, node.consequent.expression, node.alternate.expression));
      return REPLACED;
    }
  }

  // consequent and alternate are return -- conditional.
  function toConditional(path) {
    var node = path.node;

    if (t.isReturnStatement(node.consequent) && t.isReturnStatement(node.alternate)) {
      if (!node.consequent.argument && !node.alternate.argument) {
        path.replaceWith(t.expressionStatement(node.test));
        return REPLACED;
      }

      path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.consequent.argument || h.VOID_0(t), node.alternate.argument || h.VOID_0(t))));
      return REPLACED;
    }
  }

  // There is nothing after this If block. And one or both
  // of the consequent and alternate are either expression statment
  // or return statements.
  function toReturn(path) {
    var node = path.node;


    if (!path.getSibling(path.key + 1).node && path.parentPath && path.parentPath.parentPath && path.parentPath.parentPath.isFunction()) {
      // Only the consequent is a return, void the alternate.
      if (t.isReturnStatement(node.consequent) && t.isExpressionStatement(node.alternate)) {
        if (!node.consequent.argument) {
          path.replaceWith(t.expressionStatement(t.logicalExpression("||", node.test, node.alternate.expression)));
          return REPLACED;
        }

        path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.consequent.argument || h.VOID_0(t), t.unaryExpression("void", node.alternate.expression, true))));
        return REPLACED;
      }

      // Only the alternate is a return, void the consequent.
      if (t.isReturnStatement(node.alternate) && t.isExpressionStatement(node.consequent)) {
        if (!node.alternate.argument) {
          path.replaceWith(t.expressionStatement(t.logicalExpression("&&", node.test, node.consequent.expression)));
          return REPLACED;
        }

        path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, t.unaryExpression("void", node.consequent.expression, true), node.alternate.argument || h.VOID_0(t))));
        return REPLACED;
      }

      if (t.isReturnStatement(node.consequent) && !node.alternate) {
        if (!node.consequent.argument) {
          path.replaceWith(t.expressionStatement(node.test));
          return REPLACED;
        }

        // This would only be worth it if the previous statement was an if
        // because then we may merge to create a conditional.
        if (path.getSibling(path.key - 1).isIfStatement()) {
          path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.consequent.argument || h.VOID_0(t), h.VOID_0(t))));
          return REPLACED;
        }
      }

      if (t.isReturnStatement(node.alternate) && !node.consequent) {
        if (!node.alternate.argument) {
          path.replaceWith(t.expressionStatement(node.test));
          return REPLACED;
        }

        // Same as above.
        if (path.getSibling(path.key - 1).isIfStatement()) {
          path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.alternate.argument || h.VOID_0(t), h.VOID_0(t))));
          return REPLACED;
        }
      }
    }

    var next = path.getSibling(path.key + 1);

    // If the next satatement(s) is an if statement and we can simplify that
    // to potentailly be an expression (or a return) then this will make it
    // easier merge.
    if (next.isIfStatement()) {
      next.pushContext(path.context);
      next.visit();
      next.popContext();
      next = path.getSibling(path.key + 1);
    }

    // Some other visitor might have deleted our node. OUR NODE ;_;
    if (!path.node) {
      return;
    }

    // No alternate but the next statement is a return
    // also turn into a return conditional
    if (t.isReturnStatement(node.consequent) && !node.alternate && next.isReturnStatement()) {
      var nextArg = next.node.argument || h.VOID_0(t);
      next.remove();
      path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.consequent.argument || h.VOID_0(t), nextArg)));
      return REPLACED;
    }

    // Next is the last expression, turn into a return while void'ing the exprs
    if (path.parentPath && path.parentPath.parentPath && path.parentPath.parentPath.isFunction() && !path.getSibling(path.key + 2).node && t.isReturnStatement(node.consequent) && !node.alternate && next.isExpressionStatement()) {
      var nextExpr = next.node.expression;
      next.remove();

      if (node.consequent.argument) {
        path.replaceWith(t.returnStatement(t.conditionalExpression(node.test, node.consequent.argument, t.unaryExpression("void", nextExpr, true))));
        return REPLACED;
      }

      path.replaceWith(t.logicalExpression("||", node.test, nextExpr));
      return REPLACED;
    }
  }

  // Remove else for if-return
  function removeUnnecessaryElse(path) {
    var node = path.node;

    var consequent = path.get("consequent");
    var alternate = path.get("alternate");

    if (consequent.node && alternate.node && (consequent.isReturnStatement() || consequent.isBlockStatement() && t.isReturnStatement(consequent.node.body[consequent.node.body.length - 1])) && (
    // don't hoist declarations
    // TODO: validate declarations after fixing scope issues
    alternate.isBlockStatement() ? !alternate.get("body").some(function (stmt) {
      return stmt.isVariableDeclaration({ kind: "let" }) || stmt.isVariableDeclaration({ kind: "const" });
    }) : true)) {
      path.insertAfter(alternate.isBlockStatement() ? alternate.node.body.map(function (el) {
        return t.clone(el);
      }) : t.clone(alternate.node));
      node.alternate = null;
      return REPLACED;
    }
  }

  function runTransforms(path) {
    // ordered
    var transforms = [toGuardedExpression, toTernary, toConditional, toReturn, removeUnnecessaryElse];

    // run each of the replacement till we replace something
    // which is identified by the Symbol(REPLACED) that each of the
    // functions return when they replace something
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = transforms[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var transform = _step.value;

        if (transform(path) === REPLACED) {
          break;
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
  }

  // If the consequent is if and the altenrate is not then
  // switch them out. That way we know we don't have to print
  // a block.x
  function switchConsequent(path) {
    var node = path.node;


    if (!node.alternate) {
      return;
    }

    if (!t.isIfStatement(node.consequent)) {
      return;
    }

    if (t.isIfStatement(node.alternate)) {
      return;
    }

    node.test = t.unaryExpression("!", node.test, true);
    var _ref = [node.consequent, node.alternate];
    node.alternate = _ref[0];
    node.consequent = _ref[1];
  }

  // Make if statements with conditional returns in the body into
  // an if statement that guards the rest of the block.
  function conditionalReturnToGuards(path) {
    var node = path.node;


    if (!path.inList || !path.get("consequent").isBlockStatement() || node.alternate) {
      return;
    }

    var ret = void 0;
    var test = void 0;
    var exprs = [];
    var statements = node.consequent.body;

    for (var i = 0, statement; statement = statements[i]; i++) {
      if (t.isExpressionStatement(statement)) {
        exprs.push(statement.expression);
      } else if (t.isIfStatement(statement)) {
        if (i < statements.length - 1) {
          // This isn't the last statement. Bail.
          return;
        }
        if (statement.alternate) {
          return;
        }
        if (!t.isReturnStatement(statement.consequent)) {
          return;
        }
        ret = statement.consequent;
        test = statement.test;
      } else {
        return;
      }
    }

    if (!test || !ret) {
      return;
    }

    exprs.push(test);

    var expr = exprs.length === 1 ? exprs[0] : t.sequenceExpression(exprs);

    var replacement = t.logicalExpression("&&", node.test, expr);

    path.replaceWith(t.ifStatement(replacement, ret, null));
  }

  return {
    mergeNestedIfs,
    simplify: runTransforms,
    switchConsequent,
    conditionalReturnToGuards
  };
};