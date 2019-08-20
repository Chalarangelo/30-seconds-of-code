/**
 * @fileoverview Forbid "button" element without an explicit "type" attribute
 * @author Filipp Riabchun
 */

'use strict';

const getProp = require('jsx-ast-utils/getProp');
const getLiteralPropValue = require('jsx-ast-utils/getLiteralPropValue');
const docsUrl = require('../util/docsUrl');
const pragmaUtil = require('../util/pragma');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

function isCreateElement(node, context) {
  const pragma = pragmaUtil.getFromContext(context);
  return node.callee &&
    node.callee.type === 'MemberExpression' &&
    node.callee.property.name === 'createElement' &&
    node.callee.object &&
    node.callee.object.name === pragma &&
    node.arguments.length > 0;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

const optionDefaults = {
  button: true,
  submit: true,
  reset: true
};

module.exports = {
  meta: {
    docs: {
      description: 'Forbid "button" element without an explicit "type" attribute',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('button-has-type')
    },
    schema: [{
      type: 'object',
      properties: {
        button: {
          default: optionDefaults.button,
          type: 'boolean'
        },
        submit: {
          default: optionDefaults.submit,
          type: 'boolean'
        },
        reset: {
          default: optionDefaults.reset,
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = Object.assign({}, optionDefaults, context.options[0]);

    function reportMissing(node) {
      context.report({
        node,
        message: 'Missing an explicit type attribute for button'
      });
    }

    function checkValue(node, value, quoteFn) {
      const q = quoteFn || (x => `"${x}"`);
      if (!(value in configuration)) {
        context.report({
          node,
          message: `${q(value)} is an invalid value for button type attribute`
        });
      } else if (!configuration[value]) {
        context.report({
          node,
          message: `${q(value)} is a forbidden value for button type attribute`
        });
      }
    }

    return {
      JSXElement(node) {
        if (node.openingElement.name.name !== 'button') {
          return;
        }

        const typeProp = getProp(node.openingElement.attributes, 'type');

        if (!typeProp) {
          reportMissing(node);
          return;
        }

        const propValue = getLiteralPropValue(typeProp);
        if (!propValue && typeProp.value && typeProp.value.expression) {
          checkValue(node, typeProp.value.expression.name, x => `\`${x}\``);
        } else {
          checkValue(node, propValue);
        }
      },
      CallExpression(node) {
        if (!isCreateElement(node, context)) {
          return;
        }

        if (node.arguments[0].type !== 'Literal' || node.arguments[0].value !== 'button') {
          return;
        }

        if (!node.arguments[1] || node.arguments[1].type !== 'ObjectExpression') {
          reportMissing(node);
          return;
        }

        const props = node.arguments[1].properties;
        const typeProp = props.find(prop => prop.key && prop.key.name === 'type');

        if (!typeProp || typeProp.value.type !== 'Literal') {
          reportMissing(node);
          return;
        }

        checkValue(node, typeProp.value.value);
      }
    };
  }
};
