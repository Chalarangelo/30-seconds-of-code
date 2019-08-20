'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utilities = require('../utilities');

var schema = [{
  enum: ['always', 'never'],
  type: 'string'
}];

var create = function create(context) {
  var never = (context.options[0] || 'never') === 'never';

  return {
    GenericTypeAnnotation(node) {
      var types = node.typeParameters;

      // Promise<foo>
      // ^^^^^^^^^^^^ GenericTypeAnnotation (with typeParameters)
      //         ^^^  GenericTypeAnnotation (without typeParameters)
      if (!types) {
        return;
      }

      var spaceBefore = types.start - node.id.end;

      if (never && spaceBefore) {
        context.report({
          data: { name: node.id.name },
          fix: _utilities.spacingFixers.stripSpacesAfter(node.id, spaceBefore),
          message: 'There must be no space before "{{name}}" generic type annotation bracket',
          node
        });
      }

      if (!never && !spaceBefore) {
        context.report({
          data: { name: node.id.name },
          fix: _utilities.spacingFixers.addSpaceAfter(node.id),
          message: 'There must be a space before "{{name}}" generic type annotation bracket',
          node
        });
      }

      if (!never && spaceBefore > 1) {
        context.report({
          data: { name: node.id.name },
          fix: _utilities.spacingFixers.stripSpacesAfter(node.id, spaceBefore - 1),
          message: 'There must be one space before "{{name}}" generic type annotation bracket',
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