"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

var _mayContainChildComponent = _interopRequireDefault(require("../util/mayContainChildComponent"));

var _mayHaveAccessibleLabel = _interopRequireDefault(require("../util/mayHaveAccessibleLabel"));

/**
 * @fileoverview Enforce label tags have an associated control.
 * @author Jesse Beach
 *
 * 
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var errorMessage = 'A form label must be associated with a control.';
var schema = (0, _schemas.generateObjSchema)({
  labelComponents: _schemas.arraySchema,
  labelAttributes: _schemas.arraySchema,
  controlComponents: _schemas.arraySchema,
  assert: {
    description: 'Assert that the label has htmlFor, a nested label, both or either',
    type: 'string',
    "enum": ['htmlFor', 'nesting', 'both', 'either']
  },
  depth: {
    description: 'JSX tree depth limit to check for accessible label',
    type: 'integer',
    minimum: 0
  }
});

var validateId = function validateId(node) {
  var htmlForAttr = (0, _jsxAstUtils.getProp)(node.attributes, 'htmlFor');
  var htmlForValue = (0, _jsxAstUtils.getPropValue)(htmlForAttr);
  return htmlForAttr !== false && !!htmlForValue;
};

module.exports = {
  meta: {
    docs: {},
    schema: [schema]
  },
  create: function create(context) {
    var options = context.options[0] || {};
    var labelComponents = options.labelComponents || [];
    var assertType = options.assert || 'either';
    var componentNames = ['label'].concat(labelComponents);

    var rule = function rule(node) {
      if (componentNames.indexOf((0, _jsxAstUtils.elementType)(node.openingElement)) === -1) {
        return;
      }

      var controlComponents = ['input', 'select', 'textarea'].concat(options.controlComponents || []); // Prevent crazy recursion.

      var recursionDepth = Math.min(options.depth === undefined ? 2 : options.depth, 25);
      var hasLabelId = validateId(node.openingElement); // Check for multiple control components.

      var hasNestedControl = controlComponents.some(function (name) {
        return (0, _mayContainChildComponent["default"])(node, name, recursionDepth);
      });
      var hasAccessibleLabel = (0, _mayHaveAccessibleLabel["default"])(node, recursionDepth, options.labelAttributes);

      if (hasAccessibleLabel) {
        switch (assertType) {
          case 'htmlFor':
            if (hasLabelId) {
              return;
            }

            break;

          case 'nesting':
            if (hasNestedControl) {
              return;
            }

            break;

          case 'both':
            if (hasLabelId && hasNestedControl) {
              return;
            }

            break;

          case 'either':
            if (hasLabelId || hasNestedControl) {
              return;
            }

            break;

          default:
            break;
        }
      } // htmlFor case


      context.report({
        node: node.openingElement,
        message: errorMessage
      });
    }; // Create visitor selectors.


    return {
      JSXElement: rule
    };
  }
};