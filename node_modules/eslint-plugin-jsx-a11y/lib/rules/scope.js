"use strict";

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

/**
 * @fileoverview Enforce scope prop is only used on <th> elements.
 * @author Ethan Cohen
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = 'The scope prop can only be used on <th> elements.';
var schema = (0, _schemas.generateObjSchema)();
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/scope.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXAttribute: function JSXAttribute(node) {
        var name = (0, _jsxAstUtils.propName)(node);

        if (name && name.toUpperCase() !== 'SCOPE') {
          return;
        }

        var parent = node.parent;
        var tagName = (0, _jsxAstUtils.elementType)(parent); // Do not test higher level JSX components, as we do not know what
        // low-level DOM element this maps to.

        if (!_ariaQuery.dom.has(tagName)) {
          return;
        }

        if (tagName && tagName.toUpperCase() === 'TH') {
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