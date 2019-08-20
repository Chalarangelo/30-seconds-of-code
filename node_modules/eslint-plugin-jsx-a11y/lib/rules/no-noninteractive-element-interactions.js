"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var _arrayIncludes = _interopRequireDefault(require("array-includes"));

var _has = _interopRequireDefault(require("has"));

var _schemas = require("../util/schemas");

var _isAbstractRole = _interopRequireDefault(require("../util/isAbstractRole"));

var _isHiddenFromScreenReader = _interopRequireDefault(require("../util/isHiddenFromScreenReader"));

var _isInteractiveElement = _interopRequireDefault(require("../util/isInteractiveElement"));

var _isInteractiveRole = _interopRequireDefault(require("../util/isInteractiveRole"));

var _isNonInteractiveElement = _interopRequireDefault(require("../util/isNonInteractiveElement"));

var _isNonInteractiveRole = _interopRequireDefault(require("../util/isNonInteractiveRole"));

var _isPresentationRole = _interopRequireDefault(require("../util/isPresentationRole"));

/**
 * @fileoverview Enforce non-interactive elements have no interactive handlers.
 * @author Jese Beach
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = 'Non-interactive elements should not be assigned mouse or keyboard event listeners.';
var domElements = (0, _toConsumableArray2["default"])(_ariaQuery.dom.keys());
var defaultInteractiveProps = [].concat((0, _toConsumableArray2["default"])(_jsxAstUtils.eventHandlersByType.focus), (0, _toConsumableArray2["default"])(_jsxAstUtils.eventHandlersByType.image), (0, _toConsumableArray2["default"])(_jsxAstUtils.eventHandlersByType.keyboard), (0, _toConsumableArray2["default"])(_jsxAstUtils.eventHandlersByType.mouse));
var schema = (0, _schemas.generateObjSchema)({
  handlers: _schemas.arraySchema
});
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-noninteractive-element-interactions.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    var options = context.options;
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var attributes = node.attributes;
        var type = (0, _jsxAstUtils.elementType)(node);
        var config = options[0] || {};
        var interactiveProps = config.handlers || defaultInteractiveProps; // Allow overrides from rule configuration for specific elements and roles.

        if ((0, _has["default"])(config, type)) {
          attributes = attributes.filter(function (attr) {
            return attr.type !== 'JSXSpreadAttribute' && !(0, _arrayIncludes["default"])(config[type], (0, _jsxAstUtils.propName)(attr));
          });
        }

        var hasInteractiveProps = interactiveProps.some(function (prop) {
          return (0, _jsxAstUtils.hasProp)(attributes, prop) && (0, _jsxAstUtils.getPropValue)((0, _jsxAstUtils.getProp)(attributes, prop)) != null;
        });

        if (!(0, _arrayIncludes["default"])(domElements, type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
          return;
        }

        if (!hasInteractiveProps || (0, _isHiddenFromScreenReader["default"])(type, attributes) || (0, _isPresentationRole["default"])(type, attributes)) {
          // Presentation is an intentional signal from the author that this
          // element is not meant to be perceivable. For example, a click screen
          // to close a dialog .
          return;
        }

        if ((0, _isInteractiveElement["default"])(type, attributes) || (0, _isInteractiveRole["default"])(type, attributes) || !(0, _isNonInteractiveElement["default"])(type, attributes) && !(0, _isNonInteractiveRole["default"])(type, attributes) || (0, _isAbstractRole["default"])(type, attributes)) {
          // This rule has no opinion about abtract roles.
          return;
        } // Visible, non-interactive elements should not have an interactive handler.


        context.report({
          node,
          message: errorMessage
        });
      }
    };
  }
};