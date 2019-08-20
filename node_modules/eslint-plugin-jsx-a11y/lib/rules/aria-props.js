"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

var _getSuggestion = _interopRequireDefault(require("../util/getSuggestion"));

/**
 * @fileoverview Enforce all aria-* properties are valid.
 * @author Ethan Cohen
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var ariaAttributes = (0, _toConsumableArray2["default"])(_ariaQuery.aria.keys());

var errorMessage = function errorMessage(name) {
  var suggestions = (0, _getSuggestion["default"])(name, ariaAttributes);
  var message = "".concat(name, ": This attribute is an invalid ARIA attribute.");

  if (suggestions.length > 0) {
    return "".concat(message, " Did you mean to use ").concat(suggestions, "?");
  }

  return message;
};

var schema = (0, _schemas.generateObjSchema)();
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/aria-props.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXAttribute: function JSXAttribute(attribute) {
        var name = (0, _jsxAstUtils.propName)(attribute);
        var normalizedName = name.toLowerCase(); // `aria` needs to be prefix of property.

        if (normalizedName.indexOf('aria-') !== 0) {
          return;
        }

        var isValid = ariaAttributes.indexOf(normalizedName) > -1;

        if (isValid === false) {
          context.report({
            node: attribute,
            message: errorMessage(name)
          });
        }
      }
    };
  }
};