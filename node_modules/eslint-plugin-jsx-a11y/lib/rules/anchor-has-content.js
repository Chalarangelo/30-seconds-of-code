"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

var _hasAccessibleChild = _interopRequireDefault(require("../util/hasAccessibleChild"));

/**
 * @fileoverview Enforce anchor elements to contain accessible content.
 * @author Lisa Ring & Niklas Holmberg
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = 'Anchors must have content and the content must be accessible by a screen reader.';
var schema = (0, _schemas.generateObjSchema)({
  components: _schemas.arraySchema
});
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/anchor-has-content.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var options = context.options[0] || {};
        var componentOptions = options.components || [];
        var typeCheck = ['a'].concat(componentOptions);
        var nodeType = (0, _jsxAstUtils.elementType)(node); // Only check anchor elements and custom types.

        if (typeCheck.indexOf(nodeType) === -1) {
          return;
        }

        if ((0, _hasAccessibleChild["default"])(node.parent)) {
          return;
        }

        context.report({
          node,
          message: errorMessage
        });
      }
    };
  }
};