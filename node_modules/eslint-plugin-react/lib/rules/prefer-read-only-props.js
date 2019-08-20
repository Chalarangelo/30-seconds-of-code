/**
 * @fileoverview Require component props to be typed as read-only.
 * @author Luke Zapart
 */

'use strict';

const Components = require('../util/Components');
const docsUrl = require('../util/docsUrl');

function isFlowPropertyType(node) {
  return node.type === 'ObjectTypeProperty';
}

function isCovariant(node) {
  return node.variance && node.variance.kind === 'plus';
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Require read-only props.',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('prefer-read-only-props')
    },
    fixable: 'code',
    schema: []
  },

  create: Components.detect((context, components) => ({
    'Program:exit': function () {
      const list = components.list();

      Object.keys(list).forEach((key) => {
        const component = list[key];

        if (!component.declaredPropTypes) {
          return;
        }

        Object.keys(component.declaredPropTypes).forEach((propName) => {
          const prop = component.declaredPropTypes[propName];

          if (!isFlowPropertyType(prop.node)) {
            return;
          }

          if (!isCovariant(prop.node)) {
            context.report({
              node: prop.node,
              message: 'Prop \'{{propName}}\' should be read-only.',
              data: {
                propName
              },
              fix: (fixer) => {
                if (!prop.node.variance) {
                  // Insert covariance
                  return fixer.insertTextBefore(prop.node, '+');
                }

                // Replace contravariance with covariance
                return fixer.replaceText(prop.node.variance, '+');
              }
            });
          }
        });
      });
    }
  }))
};
