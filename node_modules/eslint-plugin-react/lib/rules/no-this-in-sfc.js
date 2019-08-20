/**
 * @fileoverview Report "this" being used in stateless functional components.
 */

'use strict';

const Components = require('../util/Components');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const ERROR_MESSAGE = 'Stateless functional components should not use this';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Report "this" being used in stateless components',
      category: 'Possible Errors',
      recommended: false,
      url: docsUrl('no-this-in-sfc')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => ({
    MemberExpression(node) {
      if (node.object.type === 'ThisExpression') {
        const component = components.get(utils.getParentStatelessComponent());
        if (!component || component.node && component.node.parent && component.node.parent.type === 'Property') {
          return;
        }
        context.report({
          node,
          message: ERROR_MESSAGE
        });
      }
    }
  }))
};
