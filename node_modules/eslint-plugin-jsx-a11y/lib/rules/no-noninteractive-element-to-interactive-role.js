"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var _arrayIncludes = _interopRequireDefault(require("array-includes"));

var _has = _interopRequireDefault(require("has"));

var _getExplicitRole = _interopRequireDefault(require("../util/getExplicitRole"));

var _isNonInteractiveElement = _interopRequireDefault(require("../util/isNonInteractiveElement"));

var _isInteractiveRole = _interopRequireDefault(require("../util/isInteractiveRole"));

/**
 * @fileoverview Disallow inherently non-interactive elements to be assigned
 * interactive roles.
 * @author Jesse Beach
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = 'Non-interactive elements should not be assigned interactive roles.';
var domElements = (0, _toConsumableArray2["default"])(_ariaQuery.dom.keys());
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-noninteractive-element-to-interactive-role.md'
    },
    schema: [{
      type: 'object',
      additionalProperties: {
        type: 'array',
        items: {
          type: 'string'
        },
        uniqueItems: true
      }
    }]
  },
  create: function create(context) {
    var options = context.options;
    return {
      JSXAttribute: function JSXAttribute(attribute) {
        var attributeName = (0, _jsxAstUtils.propName)(attribute); // $FlowFixMe: [TODO] Mark propName as a JSXIdentifier, not a string.

        if (attributeName !== 'role') {
          return;
        }

        var node = attribute.parent;
        var attributes = node.attributes;
        var type = (0, _jsxAstUtils.elementType)(node);
        var role = (0, _getExplicitRole["default"])(type, node.attributes);

        if (!(0, _arrayIncludes["default"])(domElements, type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
          return;
        } // Allow overrides from rule configuration for specific elements and
        // roles.


        var allowedRoles = options[0] || {};

        if ((0, _has["default"])(allowedRoles, type) && (0, _arrayIncludes["default"])(allowedRoles[type], role)) {
          return;
        }

        if ((0, _isNonInteractiveElement["default"])(type, attributes) && (0, _isInteractiveRole["default"])(type, attributes)) {
          context.report({
            node: attribute,
            message: errorMessage
          });
        }
      }
    };
  }
};