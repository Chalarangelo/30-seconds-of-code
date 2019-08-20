'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utilities = require('../utilities');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = [];

var create = (0, _utilities.iterateFunctionNodes)(function (context) {
  return function (functionNode) {
    _lodash2.default.forEach(functionNode.params, function (identifierNode) {
      var nodeType = _lodash2.default.get(identifierNode, 'type');
      var isAssignmentPattern = nodeType === 'AssignmentPattern';
      var hasTypeAnnotation = Boolean(_lodash2.default.get(identifierNode, 'typeAnnotation'));
      var leftAnnotated = Boolean(_lodash2.default.get(identifierNode, 'left.typeAnnotation'));

      if (isAssignmentPattern && hasTypeAnnotation && !leftAnnotated) {
        context.report({
          data: {
            name: (0, _utilities.quoteName)((0, _utilities.getParameterName)(identifierNode, context))
          },
          message: '{{name}}parameter type annotation must be placed on left-hand side of assignment.',
          node: identifierNode
        });
      }
    });
  };
});

exports.default = {
  create,
  meta: {
    deprecated: true
  },
  schema
};
module.exports = exports['default'];