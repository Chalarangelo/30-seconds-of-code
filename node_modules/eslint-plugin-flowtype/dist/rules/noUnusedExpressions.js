'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _noUnusedExpressions = require('eslint/lib/rules/no-unused-expressions');

var _noUnusedExpressions2 = _interopRequireDefault(_noUnusedExpressions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var meta = _noUnusedExpressions2.default.meta; // A wrapper around ESLint's core rule no-unused-expressions, additionally ignores type cast
// expressions.

var create = function create(context) {
  var coreChecks = _noUnusedExpressions2.default.create(context);

  return {
    ExpressionStatement(node) {
      if (node.expression.type !== 'TypeCastExpression') {
        coreChecks.ExpressionStatement(node);
      }
    }
  };
};

exports.default = {
  create,
  meta
};
module.exports = exports['default'];