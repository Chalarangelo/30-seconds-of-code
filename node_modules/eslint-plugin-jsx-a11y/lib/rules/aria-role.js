"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

/**
 * @fileoverview Enforce aria role attribute is valid.
 * @author Ethan Cohen
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = 'Elements with ARIA roles must use a valid, non-abstract ARIA role.';
var schema = (0, _schemas.generateObjSchema)({
  ignoreNonDOM: {
    type: 'boolean',
    "default": false
  }
});
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/aria-role.md'
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
        } // Get prop name


        var name = (0, _jsxAstUtils.propName)(attribute).toUpperCase();

        if (name !== 'ROLE') {
          return;
        }

        var value = (0, _jsxAstUtils.getLiteralPropValue)(attribute); // If value is undefined, then the role attribute will be dropped in the DOM.
        // If value is null, then getLiteralAttributeValue is telling us that the
        // value isn't in the form of a literal.

        if (value === undefined || value === null) {
          return;
        }

        var values = String(value).split(' ');
        var validRoles = (0, _toConsumableArray2["default"])(_ariaQuery.roles.keys()).filter(function (role) {
          return _ariaQuery.roles.get(role)["abstract"] === false;
        });
        var isValid = values.every(function (val) {
          return validRoles.indexOf(val) > -1;
        });

        if (isValid === true) {
          return;
        }

        context.report({
          node: attribute,
          message: errorMessage
        });
      }
    };
  }
};