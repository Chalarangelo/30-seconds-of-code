"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _jsxAstUtils = require("jsx-ast-utils");

var _schemas = require("../util/schemas");

var _hasAccessibleChild = _interopRequireDefault(require("../util/hasAccessibleChild"));

var _isPresentationRole = _interopRequireDefault(require("../util/isPresentationRole"));

/**
 * @fileoverview Enforce all elements that require alternative text have it.
 * @author Ethan Cohen
 */
// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------
var DEFAULT_ELEMENTS = ['img', 'object', 'area', 'input[type="image"]'];
var schema = (0, _schemas.generateObjSchema)({
  elements: _schemas.arraySchema,
  img: _schemas.arraySchema,
  object: _schemas.arraySchema,
  area: _schemas.arraySchema,
  'input[type="image"]': _schemas.arraySchema
});
var ruleByElement = {
  img(context, node) {
    var nodeType = (0, _jsxAstUtils.elementType)(node);
    var altProp = (0, _jsxAstUtils.getProp)(node.attributes, 'alt'); // Missing alt prop error.

    if (altProp === undefined) {
      if ((0, _isPresentationRole["default"])(nodeType, node.attributes)) {
        context.report({
          node,
          message: 'Prefer alt="" over a presentational role. First rule of aria is to not use aria if it can be achieved via native HTML.'
        });
        return;
      }

      context.report({
        node,
        message: "".concat(nodeType, " elements must have an alt prop, either with meaningful text, or an empty string for decorative images.")
      });
      return;
    } // Check if alt prop is undefined.


    var altValue = (0, _jsxAstUtils.getPropValue)(altProp);
    var isNullValued = altProp.value === null; // <img alt />

    if (altValue && !isNullValued || altValue === '') {
      return;
    } // Undefined alt prop error.


    context.report({
      node,
      message: "Invalid alt value for ".concat(nodeType, ". Use alt=\"\" for presentational images.")
    });
  },

  object(context, node) {
    var ariaLabelProp = (0, _jsxAstUtils.getProp)(node.attributes, 'aria-label');
    var arialLabelledByProp = (0, _jsxAstUtils.getProp)(node.attributes, 'aria-labelledby');
    var hasLabel = ariaLabelProp !== undefined || arialLabelledByProp !== undefined;
    var titleProp = (0, _jsxAstUtils.getLiteralPropValue)((0, _jsxAstUtils.getProp)(node.attributes, 'title'));
    var hasTitleAttr = !!titleProp;

    if (hasLabel || hasTitleAttr || (0, _hasAccessibleChild["default"])(node.parent)) {
      return;
    }

    context.report({
      node,
      message: 'Embedded <object> elements must have alternative text by providing inner text, aria-label or aria-labelledby props.'
    });
  },

  area(context, node) {
    var ariaLabelPropValue = (0, _jsxAstUtils.getPropValue)((0, _jsxAstUtils.getProp)(node.attributes, 'aria-label'));
    var arialLabelledByPropValue = (0, _jsxAstUtils.getPropValue)((0, _jsxAstUtils.getProp)(node.attributes, 'aria-labelledby'));
    var hasLabel = ariaLabelPropValue !== undefined || arialLabelledByPropValue !== undefined;

    if (hasLabel) {
      return;
    }

    var altProp = (0, _jsxAstUtils.getProp)(node.attributes, 'alt');

    if (altProp === undefined) {
      context.report({
        node,
        message: 'Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.'
      });
      return;
    }

    var altValue = (0, _jsxAstUtils.getPropValue)(altProp);
    var isNullValued = altProp.value === null; // <area alt />

    if (altValue && !isNullValued || altValue === '') {
      return;
    }

    context.report({
      node,
      message: 'Each area of an image map must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.'
    });
  },

  'input[type="image"]': function inputImage(context, node) {
    // Only test input[type="image"]
    var nodeType = (0, _jsxAstUtils.elementType)(node);

    if (nodeType === 'input') {
      var typePropValue = (0, _jsxAstUtils.getPropValue)((0, _jsxAstUtils.getProp)(node.attributes, 'type'));

      if (typePropValue !== 'image') {
        return;
      }
    }

    var ariaLabelPropValue = (0, _jsxAstUtils.getPropValue)((0, _jsxAstUtils.getProp)(node.attributes, 'aria-label'));
    var arialLabelledByPropValue = (0, _jsxAstUtils.getPropValue)((0, _jsxAstUtils.getProp)(node.attributes, 'aria-labelledby'));
    var hasLabel = ariaLabelPropValue !== undefined || arialLabelledByPropValue !== undefined;

    if (hasLabel) {
      return;
    }

    var altProp = (0, _jsxAstUtils.getProp)(node.attributes, 'alt');

    if (altProp === undefined) {
      context.report({
        node,
        message: '<input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.'
      });
      return;
    }

    var altValue = (0, _jsxAstUtils.getPropValue)(altProp);
    var isNullValued = altProp.value === null; // <area alt />

    if (altValue && !isNullValued || altValue === '') {
      return;
    }

    context.report({
      node,
      message: '<input> elements with type="image" must have a text alternative through the `alt`, `aria-label`, or `aria-labelledby` prop.'
    });
  }
};
module.exports = {
  meta: {
    docs: {
      url: 'https://github.com/evcohen/eslint-plugin-jsx-a11y/tree/master/docs/rules/alt-text.md'
    },
    schema: [schema]
  },
  create: function create(context) {
    var _ref;

    var options = context.options[0] || {}; // Elements to validate for alt text.

    var elementOptions = options.elements || DEFAULT_ELEMENTS; // Get custom components for just the elements that will be tested.

    var customComponents = elementOptions.map(function (element) {
      return options[element];
    }).reduce(function (components, customComponentsForElement) {
      return components.concat(customComponentsForElement || []);
    }, []);
    var typesToValidate = new Set((_ref = []).concat.apply(_ref, [customComponents].concat((0, _toConsumableArray2["default"])(elementOptions))).map(function (type) {
      if (type === 'input[type="image"]') {
        return 'input';
      }

      return type;
    }));
    return {
      JSXOpeningElement: function JSXOpeningElement(node) {
        var nodeType = (0, _jsxAstUtils.elementType)(node);

        if (!typesToValidate.has(nodeType)) {
          return;
        }

        var DOMElement = nodeType;

        if (DOMElement === 'input') {
          DOMElement = 'input[type="image"]';
        } // Map nodeType to the DOM element if we are running this on a custom component.


        if (elementOptions.indexOf(DOMElement) === -1) {
          DOMElement = elementOptions.find(function (element) {
            var customComponentsForElement = options[element] || [];
            return customComponentsForElement.indexOf(nodeType) > -1;
          });
        }

        ruleByElement[DOMElement](context, node);
      }
    };
  }
};