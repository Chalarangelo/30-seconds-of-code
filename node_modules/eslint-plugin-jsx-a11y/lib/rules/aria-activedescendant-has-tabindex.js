"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

var _getTabIndex = _interopRequireDefault(require("../util/getTabIndex"));

var _isInteractiveElement = _interopRequireDefault(require("../util/isInteractiveElement"));

/**
 * @fileoverview Enforce elements with aria-activedescendant are tabbable.
 * @author Jesse Beach <@jessebeach>
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = 'An element that manages focus with `aria-activedescendant` must be tabbable';
var schema = (0, _schemas.generateObjSchema)();
var domElements = (0, _toConsumableArray2["default"])(_ariaQuery.dom.keys());
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/aria-activedescendant-has-tabindex.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var attributes = node.attributes;

        if ((0, _jsxAstUtils.getProp)(attributes, 'aria-activedescendant') === undefined) {
          return;
        }

        var type = (0, _jsxAstUtils.elementType)(node); // Do not test higher level JSX components, as we do not know what
        // low-level DOM element this maps to.

        if (domElements.indexOf(type) === -1) {
          return;
        }

        var tabIndex = (0, _getTabIndex["default"])((0, _jsxAstUtils.getProp)(attributes, 'tabIndex')); // If this is an interactive element, tabIndex must be either left
        // unspecified allowing the inherent tabIndex to obtain or it must be
        // zero (allowing for positive, even though that is not ideal). It cannot
        // be given a negative value.

        if ((0, _isInteractiveElement["default"])(type, attributes) && (tabIndex === undefined || tabIndex >= 0)) {
          return;
        }

        if (tabIndex >= 0) {
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