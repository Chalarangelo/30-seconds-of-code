'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = [{
  enum: ['bool', 'boolean'],
  type: 'string'
}];

var create = function create(context) {
  var longForm = (context.options[0] || 'boolean') === 'boolean';

  return {
    BooleanTypeAnnotation(node) {
      var diff = node.end - node.start;

      if (longForm && diff === 4) {
        context.report({
          fix(fixer) {
            return fixer.replaceText(node, 'boolean');
          },
          message: 'Use "boolean", not "bool"',
          node
        });
      }

      if (!longForm && diff !== 4) {
        context.report({
          fix(fixer) {
            return fixer.replaceText(node, 'bool');
          },
          message: 'Use "bool", not "boolean"',
          node
        });
      }
    }
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];