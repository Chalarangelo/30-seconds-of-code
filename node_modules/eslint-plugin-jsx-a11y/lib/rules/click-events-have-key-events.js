"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var _arrayIncludes = _interopRequireDefault(require("array-includes"));

var _schemas = require("../util/schemas");

var _isHiddenFromScreenReader = _interopRequireDefault(require("../util/isHiddenFromScreenReader"));

var _isInteractiveElement = _interopRequireDefault(require("../util/isInteractiveElement"));

var _isPresentationRole = _interopRequireDefault(require("../util/isPresentationRole"));

/**
 * @fileoverview Enforce a clickable non-interactive element has at least 1 keyboard event listener.
 * @author Ethan Cohen
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = 'Visible, non-interactive elements with click handlers must have at least one keyboard listener.';
var schema = (0, _schemas.generateObjSchema)();
var domElements = (0, _toConsumableArray2["default"])(_ariaQuery.dom.keys());
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/click-events-have-key-events.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var props = node.attributes;

        if ((0, _jsxAstUtils.getProp)(props, 'onclick') === undefined) {
          return;
        }

        var type = (0, _jsxAstUtils.elementType)(node);
        var requiredProps = ['onkeydown', 'onkeyup', 'onkeypress'];

        if (!(0, _arrayIncludes["default"])(domElements, type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
          return;
        }

        if ((0, _isHiddenFromScreenReader["default"])(type, props) || (0, _isPresentationRole["default"])(type, props)) {
          return;
        }

        if ((0, _isInteractiveElement["default"])(type, props)) {
          return;
        }

        if ((0, _jsxAstUtils.hasAnyProp)(props, requiredProps)) {
          return;
        } // Visible, non-interactive elements with click handlers require one keyboard event listener.


        context.report({
          node,
          message: errorMessage
        });
      }
    };
  }
};