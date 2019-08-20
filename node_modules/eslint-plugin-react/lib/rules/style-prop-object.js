/**
 * @fileoverview Enforce style prop value is an object
 * @author David Petersen
 */

'use strict';

const variableUtil = require('../util/variable');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce style prop value is an object',
      category: '',
      recommended: false,
      url: docsUrl('style-prop-object')
    },
    schema: []
  },

  create(context) {
    /**
     * @param {ASTNode} expression An Identifier node
     */
    function isNonNullaryLiteral(expression) {
      return expression.type === 'Literal' && expression.value !== null;
    }

    /**
     * @param {object} node A Identifier node
     */
    function checkIdentifiers(node) {
      const variable = variableUtil.variablesInScope(context).find(item => item.name === node.name);

      if (!variable || !variable.defs[0] || !variable.defs[0].node.init) {
        return;
      }

      if (isNonNullaryLiteral(variable.defs[0].node.init)) {
        context.report({
          node,
          message: 'Style prop value must be an object'
        });
      }
    }

    return {
      CallExpression(node) {
        if (
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          node.callee.property.name === 'createElement' &&
          node.arguments.length > 1
        ) {
          if (node.arguments[1].type === 'ObjectExpression') {
            const style = node.arguments[1].properties.find(property => property.key && property.key.name === 'style' && !property.computed);
            if (style) {
              if (style.value.type === 'Identifier') {
                checkIdentifiers(style.value);
              } else if (isNonNullaryLiteral(style.value)) {
                context.report({
                  node: style.value,
                  message: 'Style prop value must be an object'
                });
              }
            }
          }
        }
      },

      JSXAttribute(node) {
        if (!node.value || node.name.name !== 'style') {
          return;
        }

        if (node.value.type !== 'JSXExpressionContainer' || isNonNullaryLiteral(node.value.expression)) {
          context.report({
            node,
            message: 'Style prop value must be an object'
          });
        } else if (node.value.expression.type === 'Identifier') {
          checkIdentifiers(node.value.expression);
        }
      }
    };
  }
};
