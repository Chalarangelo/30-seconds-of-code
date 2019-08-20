/**
 * @fileoverview Enforce the state initialization style to be either in a constructor or with a class property
 * @author Kanitkorn Sujautra
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
      description: 'State initialization in an ES6 class component should be in a constructor',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('state-in-constructor')
    },
    schema: [{
      enum: ['always', 'never']
    }]
  },

  create: Components.detect((context, components, utils) => {
    const option = context.options[0] || 'always';
    return {
      ClassProperty(node) {
        if (
          option === 'always' &&
          !node.static &&
          node.key.name === 'state' &&
          utils.getParentES6Component()
        ) {
          context.report({
            node,
            message: 'State initialization should be in a constructor'
          });
        }
      },
      AssignmentExpression(node) {
        if (
          option === 'never' &&
          utils.isStateMemberExpression(node.left) &&
          utils.inConstructor() &&
          utils.getParentES6Component()
        ) {
          context.report({
            node,
            message: 'State initialization should be in a class property'
          });
        }
      }
    };
  })
};
