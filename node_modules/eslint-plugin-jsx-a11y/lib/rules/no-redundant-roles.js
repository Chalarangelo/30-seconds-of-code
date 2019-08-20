"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsxAstUtils = require("jsx-ast-utils");

var _arrayIncludes = _interopRequireDefault(require("array-includes"));

var _has = _interopRequireDefault(require("has"));

var _getExplicitRole = _interopRequireDefault(require("../util/getExplicitRole"));

var _getImplicitRole = _interopRequireDefault(require("../util/getImplicitRole"));

/**
 * @fileoverview Enforce explicit role property is not the
 * same as implicit/default role property on element.
 * @author Ethan Cohen <@evcohen>
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = function errorMessage(element, implicitRole) {
  return "The element ".concat(element, " has an implicit role of ").concat(implicitRole, ". Defining this explicitly is redundant and should be avoided.");
};

var DEFAULT_ROLE_EXCEPTIONS = {
  nav: ['navigation']
};
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/no-redundant-roles.md'
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
      JSXOpeningElement: function JSXOpeningElement(node) {
        var type = (0, _jsxAstUtils.elementType)(node);
        var implicitRole = (0, _getImplicitRole["default"])(type, node.attributes);
        var explicitRole = (0, _getExplicitRole["default"])(type, node.attributes);

        if (!implicitRole || !explicitRole) {
          return;
        }

        if (implicitRole === explicitRole) {
          var allowedRedundantRoles = options[0] || {};
          var redundantRolesForElement;

          if ((0, _has["default"])(allowedRedundantRoles, type)) {
            redundantRolesForElement = allowedRedundantRoles[type];
          } else {
            redundantRolesForElement = DEFAULT_ROLE_EXCEPTIONS[type] || [];
          }

          if ((0, _arrayIncludes["default"])(redundantRolesForElement, implicitRole)) {
            return;
          }

          context.report({
            node,
            message: errorMessage(type, implicitRole.toLowerCase())
          });
        }
      }
    };
  }
};