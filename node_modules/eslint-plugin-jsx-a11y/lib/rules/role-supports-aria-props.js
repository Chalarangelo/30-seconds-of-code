"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ariaQuery = require("aria-query");

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

var _getImplicitRole = _interopRequireDefault(require("../util/getImplicitRole"));

/**
 * @fileoverview Enforce that elements with explicit or implicit roles defined contain only
 * `aria-*` properties supported by that `role`.
 * @author Ethan Cohen
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = function errorMessage(attr, role, tag, isImplicit) {
  if (isImplicit) {
    return "The attribute ".concat(attr, " is not supported by the role ").concat(role, ". This role is implicit on the element ").concat(tag, ".");
  }

  return "The attribute ".concat(attr, " is not supported by the role ").concat(role, ".");
};

var schema = (0, _schemas.generateObjSchema)();
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/role-supports-aria-props.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        // If role is not explicitly defined, then try and get its implicit role.
        var type = (0, _jsxAstUtils.elementType)(node);
        var role = (0, _jsxAstUtils.getProp)(node.attributes, 'role');
        var roleValue = role ? (0, _jsxAstUtils.getLiteralPropValue)(role) : (0, _getImplicitRole["default"])(type, node.attributes);
        var isImplicit = roleValue && role === undefined; // If there is no explicit or implicit role, then assume that the element
        // can handle the global set of aria-* properties.
        // This actually isn't true - should fix in future release.

        if (typeof roleValue !== 'string' || _ariaQuery.roles.get(roleValue) === undefined) {
          return;
        } // Make sure it has no aria-* properties defined outside of its property set.


        var _roles$get = _ariaQuery.roles.get(roleValue),
            propKeyValues = _roles$get.props;

        var propertySet = Object.keys(propKeyValues);
        var invalidAriaPropsForRole = (0, _toConsumableArray2["default"])(_ariaQuery.aria.keys()).filter(function (attribute) {
          return propertySet.indexOf(attribute) === -1;
        });
        node.attributes.forEach(function (prop) {
          // Ignore the attribute if its value is null or undefined.
          if ((0, _jsxAstUtils.getPropValue)(prop) == null) return; // Ignore the attribute if it's a spread.

          if (prop.type === 'JSXSpreadAttribute') return;
          var name = (0, _jsxAstUtils.propName)(prop);

          if (invalidAriaPropsForRole.indexOf(name) > -1) {
            context.report({
              node,
              message: errorMessage(name, roleValue, type, isImplicit)
            });
          }
        });
      }
    };
  }
};