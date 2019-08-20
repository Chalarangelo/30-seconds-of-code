"use strict";

module.exports = function (t) {
  return function toMultipleSequenceExpressions(statements) {
    var retStatements = [];
    var bailed = void 0;
    do {
      var res = convert(statements);
      bailed = res.bailed;
      var seq = res.seq,
          bailedAtIndex = res.bailedAtIndex;

      if (seq) {
        retStatements.push(t.expressionStatement(seq));
      }
      if (bailed && statements[bailedAtIndex]) {
        retStatements.push(statements[bailedAtIndex]);
      }
      if (bailed) {
        statements = statements.slice(bailedAtIndex + 1);
        if (!statements.length) {
          bailed = false;
        }
      }
    } while (bailed);

    return retStatements;

    function convert(nodes) {
      var exprs = [];

      var _loop = function _loop(i) {
        var bail = function bail() {
          var seq = void 0;
          if (exprs.length === 1) {
            seq = exprs[0];
          } else if (exprs.length) {
            seq = t.sequenceExpression(exprs);
          }

          return {
            seq,
            bailed: true,
            bailedAtIndex: i
          };
        };

        var node = nodes[i];
        if (t.isExpression(node)) {
          exprs.push(node);
        } else if (t.isExpressionStatement(node)) {
          if (node.expression) exprs.push(node.expression);
        } else if (t.isIfStatement(node)) {
          var consequent = void 0;
          if (node.consequent) {
            var _res = convert([node.consequent]);
            if (_res.bailed) {
              return {
                v: bail()
              };
            }
            consequent = _res.seq;
          }
          var alternate = void 0;
          if (node.alternate) {
            var _res2 = convert([node.alternate]);
            if (_res2.bailed) {
              return {
                v: bail()
              };
            }
            alternate = _res2.seq;
          }

          if (!alternate && !consequent) {
            exprs.push(node.test);
          } else if (!alternate) {
            exprs.push(t.logicalExpression("&&", node.test, consequent));
          } else if (!consequent) {
            exprs.push(t.logicalExpression("||", node.test, alternate));
          } else {
            exprs.push(t.conditionalExpression(node.test, consequent, alternate));
          }
        } else if (t.isBlockStatement(node)) {
          var _res3 = convert(node.body);
          if (_res3.bailed) {
            return {
              v: bail()
            };
          }
          if (_res3.seq) {
            exprs.push(_res3.seq);
          }
        } else {
          return {
            v: bail()
          };
        }
      };

      for (var i = 0; i < nodes.length; i++) {
        var _ret = _loop(i);

        if (typeof _ret === "object") return _ret.v;
      }

      var seq = void 0;
      if (exprs.length === 1) {
        seq = exprs[0];
      } else if (exprs.length) {
        seq = t.sequenceExpression(exprs);
      }

      /* eslint-disable no-self-assign */
      seq = seq;
      return { seq };
    }
  };
};