"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

/**
 * @fileoverview Enforce that elements that do not support ARIA roles,
 *  states and properties do not have those attributes.
 * @author Ethan Cohen
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = function errorMessage(invalidProp) {
  return "This element does not support ARIA roles, states and properties. Try removing the prop '".concat(invalidProp, "'.");
};

var schema = (0, _schemas.generateObjSchema)();
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/aria-unsupported-elements.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var nodeType = (0, _jsxAstUtils.elementType)(node);
        var nodeAttrs = _ariaQuery.dom.get(nodeType) || {};
        var _nodeAttrs$reserved = nodeAttrs.reserved,
            isReservedNodeType = _nodeAttrs$reserved === void 0 ? false : _nodeAttrs$reserved; // If it's not reserved, then it can have aria-* roles, states, and properties

        if (isReservedNodeType === false) {
          return;
        }

        var invalidAttributes = (0, _toConsumableArray2["default"])(_ariaQuery.aria.keys()).concat('role');
        node.attributes.forEach(function (prop) {
          if (prop.type === 'JSXSpreadAttribute') {
            return;
          }

          var name = (0, _jsxAstUtils.propName)(prop).toLowerCase();

          if (invalidAttributes.indexOf(name) > -1) {
            context.report({
              node,
              message: errorMessage(name)
            });
          }
        });
      }
    };
  }
};