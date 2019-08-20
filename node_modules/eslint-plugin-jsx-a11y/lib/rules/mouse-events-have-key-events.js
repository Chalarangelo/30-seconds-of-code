"use strict";

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

/**
 * @fileoverview Enforce onmouseover/onmouseout are
 *  accompanied by onfocus/onblur.
 * @author Ethan Cohen
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var mouseOverErrorMessage = 'onMouseOver must be accompanied by onFocus for accessibility.';
var mouseOutErrorMessage = 'onMouseOut must be accompanied by onBlur for accessibility.';
var schema = (0, _schemas.generateObjSchema)();
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/mouse-events-have-key-events.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var attributes = node.attributes; // Check onmouseover / onfocus pairing.

        var onMouseOver = (0, _jsxAstUtils.getProp)(attributes, 'onMouseOver');
        var onMouseOverValue = (0, _jsxAstUtils.getPropValue)(onMouseOver);

        if (onMouseOver && onMouseOverValue != null) {
          var hasOnFocus = (0, _jsxAstUtils.getProp)(attributes, 'onFocus');
          var onFocusValue = (0, _jsxAstUtils.getPropValue)(hasOnFocus);

          if (hasOnFocus === false || onFocusValue === null || onFocusValue === undefined) {
            context.report({
              node,
              message: mouseOverErrorMessage
            });
          }
        } // Checkout onmouseout / onblur pairing


        var onMouseOut = (0, _jsxAstUtils.getProp)(attributes, 'onMouseOut');
        var onMouseOutValue = (0, _jsxAstUtils.getPropValue)(onMouseOut);

        if (onMouseOut && onMouseOutValue != null) {
          var hasOnBlur = (0, _jsxAstUtils.getProp)(attributes, 'onBlur');
          var onBlurValue = (0, _jsxAstUtils.getPropValue)(hasOnBlur);

          if (hasOnBlur === false || onBlurValue === null || onBlurValue === undefined) {
            context.report({
              node,
              message: mouseOutErrorMessage
            });
          }
        }
      }
    };
  }
};