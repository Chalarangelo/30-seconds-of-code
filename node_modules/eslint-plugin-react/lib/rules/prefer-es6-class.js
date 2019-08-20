/**
 * @fileoverview Enforce ES5 or ES6 class for React Components
 * @author Dan Hamilton
 */

'use strict';

const Components = require('../util/Components');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Enforce ES5 or ES6 class for React Components',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('prefer-es6-class')
    },

    schema: [{
      enum: ['always', 'never']
    }]
  },

  create: Components.detect((context, components, utils) => {
    const configuration = context.options[0] || 'always';

    return {
      ObjectExpression(node) {
        if (utils.isES5Component(node) && configuration === 'always') {
          context.report({
            node,
            message: 'Component should use es6 class instead of createClass'
          });
        }
      },
      ClassDeclaration(node) {
        if (utils.isES6Component(node) && configuration === 'never') {
          context.report({
            node,
            message: 'Component should use createClass instead of es6 class'
          });
        }
      }
    };
  })
};
