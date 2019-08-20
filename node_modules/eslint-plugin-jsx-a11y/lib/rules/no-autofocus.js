"use strict";

var _jsxAstUtils = require("jsx-ast-utils");

var _ariaQuery = require("aria-query");

var _schemas = require("../util/schemas");

/**
 * @fileoverview Enforce autoFocus prop is not used.
 * @author Ethan Cohen <@evcohen>
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = 'The autoFocus prop should not be used, as it can reduce usability and accessibility for users.';
var schema = (0, _schemas.generateObjSchema)({
  ignoreNonDOM: {
    type: 'boolean',
    "default": false
  }
});
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-autofocus.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXAttribute: function JSXAttribute(attribute) {
        // Determine if ignoreNonDOM is set to true
        // If true, then do not run rule.
        var options = context.options[0] || {};
        var ignoreNonDOM = !!options.ignoreNonDOM;

        if (ignoreNonDOM) {
          var type = (0, _jsxAstUtils.elementType)(attribute.parent);

          if (!_ariaQuery.dom.get(type)) {
            return;
          }
        } // Don't normalize, since React only recognizes autoFocus on low-level DOM elements.


        if ((0, _jsxAstUtils.propName)(attribute) === 'autoFocus') {
          context.report({
            node: attribute,
            message: errorMessage
          });
        }
      }
    };
  }
};