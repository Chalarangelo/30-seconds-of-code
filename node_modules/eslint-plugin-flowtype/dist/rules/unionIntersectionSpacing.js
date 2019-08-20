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
  var sourceCode = context.getSourceCode();

  var always = (context.options[0] || 'always') === 'always';

  var check = function check(node) {
    node.types.forEach(function (type, index) {
      if (index + 1 === node.types.length) {
        return;
      }

      var separator = (0, _utilities.getTokenAfterParens)(sourceCode, type);
      var endOfType = sourceCode.getTokenBefore(separator);
      var nextType = sourceCode.getTokenAfter(separator);

      var spaceBefore = separator.start - endOfType.end;
      var spaceAfter = nextType.start - separator.end;

      var data = { type: node.type === 'UnionTypeAnnotation' ? 'union' : 'intersection' };

      if (always) {
        if (!spaceBefore) {
          context.report({
            data,
            fix: _utilities.spacingFixers.addSpaceAfter(endOfType),
            message: 'There must be a space before {{type}} type annotation separator',
            node
          });
        }

        if (!spaceAfter) {
          context.report({
            data,
            fix: _utilities.spacingFixers.addSpaceAfter(separator),
            message: 'There must be a space after {{type}} type annotation separator',
            node
          });
        }
      } else {
        if (spaceBefore) {
          context.report({
            data,
            fix: _utilities.spacingFixers.stripSpacesAfter(endOfType, spaceBefore),
            message: 'There must be no space before {{type}} type annotation separator',
            node
          });
        }

        if (spaceAfter) {
          context.report({
            data,
            fix: _utilities.spacingFixers.stripSpacesAfter(separator, spaceAfter),
            message: 'There must be no space after {{type}} type annotation separator',
            node
          });
        }
      }
    });
  };

  return {
    IntersectionTypeAnnotation: check,
    UnionTypeAnnotation: check
  };
};

exports.default = {
  create,
  schema
};
module.exports = exports['default'];