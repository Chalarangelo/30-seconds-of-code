"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var _arrayIncludes = _interopRequireDefault(require("array-includes"));

var _schemas = require("../util/schemas");

var _isDisabledElement = _interopRequireDefault(require("../util/isDisabledElement"));

var _isHiddenFromScreenReader = _interopRequireDefault(require("../util/isHiddenFromScreenReader"));

var _isInteractiveElement = _interopRequireDefault(require("../util/isInteractiveElement"));

var _isInteractiveRole = _interopRequireDefault(require("../util/isInteractiveRole"));

var _isNonInteractiveElement = _interopRequireDefault(require("../util/isNonInteractiveElement"));

var _isNonInteractiveRole = _interopRequireDefault(require("../util/isNonInteractiveRole"));

var _isPresentationRole = _interopRequireDefault(require("../util/isPresentationRole"));

var _getTabIndex = _interopRequireDefault(require("../util/getTabIndex"));

/**
 * @fileoverview Enforce that elements with onClick handlers must be tabbable.
 * @author Ethan Cohen
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var schema = (0, _schemas.generateObjSchema)({
  tabbable: (0, _schemas.enumArraySchema)((0, _toConsumableArray2["default"])(_ariaQuery.roles.keys()).filter(function (name) {
    return !_ariaQuery.roles.get(name)["abstract"];
  }).filter(function (name) {
    return _ariaQuery.roles.get(name).superClass.some(function (klasses) {
      return (0, _arrayIncludes["default"])(klasses, 'widget');
    });
  }))
});
var domElements = (0, _toConsumableArray2["default"])(_ariaQuery.dom.keys());
var interactiveProps = [].concat((0, _toConsumableArray2["default"])(_jsxAstUtils.eventHandlersByType.mouse), (0, _toConsumableArray2["default"])(_jsxAstUtils.eventHandlersByType.keyboard));
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/interactive-supports-focus.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var tabbable = context.options && context.options[0] && context.options[0].tabbable || [];
        var attributes = node.attributes;
        var type = (0, _jsxAstUtils.elementType)(node);
        var hasInteractiveProps = (0, _jsxAstUtils.hasAnyProp)(attributes, interactiveProps);
        var hasTabindex = (0, _getTabIndex["default"])((0, _jsxAstUtils.getProp)(attributes, 'tabIndex')) !== undefined;

        if (!(0, _arrayIncludes["default"])(domElements, type)) {
          // Do not test higher level JSX components, as we do not know what
          // low-level DOM element this maps to.
          return;
        }

        if (!hasInteractiveProps || (0, _isDisabledElement["default"])(attributes) || (0, _isHiddenFromScreenReader["default"])(type, attributes) || (0, _isPresentationRole["default"])(type, attributes)) {
          // Presentation is an intentional signal from the author that this
          // element is not meant to be perceivable. For example, a click screen
          // to close a dialog .
          return;
        }

        if (hasInteractiveProps && (0, _isInteractiveRole["default"])(type, attributes) && !(0, _isInteractiveElement["default"])(type, attributes) && !(0, _isNonInteractiveElement["default"])(type, attributes) && !(0, _isNonInteractiveRole["default"])(type, attributes) && !hasTabindex) {
          var role = (0, _jsxAstUtils.getLiteralPropValue)((0, _jsxAstUtils.getProp)(attributes, 'role'));

          if ((0, _arrayIncludes["default"])(tabbable, role)) {
            // Always tabbable, tabIndex = 0
            context.report({
              node,
              message: "Elements with the '".concat(role, "' interactive role must be tabbable.")
            });
          } else {
            // Focusable, tabIndex = -1 or 0
            context.report({
              node,
              message: "Elements with the '".concat(role, "' interactive role must be focusable.")
            });
          }
        }
      }
    };
  }
};