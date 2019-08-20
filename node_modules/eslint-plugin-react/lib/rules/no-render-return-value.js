/**
 * @fileoverview Prevent usage of the return value of React.render
 * @author Dustan Kasten
 */

'use strict';

const versionUtil = require('../util/version');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of the return value of React.render',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('no-render-return-value')
    },
    schema: []
  },

  create(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    let calleeObjectName = /^ReactDOM$/;
    if (versionUtil.testReactVersion(context, '15.0.0')) {
      calleeObjectName = /^ReactDOM$/;
    } else if (versionUtil.testReactVersion(context, '0.14.0')) {
      calleeObjectName = /^React(DOM)?$/;
    } else if (versionUtil.testReactVersion(context, '0.13.0')) {
      calleeObjectName = /^React$/;
    }

    return {

      CallExpression(node) {
        const callee = node.callee;
        const parent = node.parent;
        if (callee.type !== 'MemberExpression') {
          return;
        }

        if (
          callee.object.type !== 'Identifier' ||
          !calleeObjectName.test(callee.object.name) ||
          callee.property.name !== 'render'
        ) {
          return;
        }

        if (
          parent.type === 'VariableDeclarator' ||
          parent.type === 'Property' ||
          parent.type === 'ReturnStatement' ||
          parent.type === 'ArrowFunctionExpression'
        ) {
          context.report({
            node: callee,
            message: `Do not depend on the return value from ${callee.object.name}.render`
          });
        }
      }
    };
  }
};
