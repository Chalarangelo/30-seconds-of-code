/**
 * @fileoverview Validate JSX maximum depth
 * @author Chris<wfsr@foxmail.com>
 */

'use strict';

const has = require('has');
const variableUtil = require('../util/variable');
const jsxUtil = require('../util/jsx');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate JSX maximum depth',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-max-depth')
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'integer',
            minimum: 0
          }
        },
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const MESSAGE = 'Expected the depth of nested jsx elements to be <= {{needed}}, but found {{found}}.';
    const DEFAULT_DEPTH = 2;

    const option = context.options[0] || {};
    const maxDepth = has(option, 'max') ? option.max : DEFAULT_DEPTH;

    function isExpression(node) {
      return node.type === 'JSXExpressionContainer';
    }

    function hasJSX(node) {
      return jsxUtil.isJSX(node) || isExpression(node) && jsxUtil.isJSX(node.expression);
    }

    function isLeaf(node) {
      const children = node.children;

      return !children.length || !children.some(hasJSX);
    }

    function getDepth(node) {
      let count = 0;

      while (jsxUtil.isJSX(node.parent) || isExpression(node.parent)) {
        node = node.parent;
        if (jsxUtil.isJSX(node)) {
          count++;
        }
      }

      return count;
    }


    function report(node, depth) {
      context.report({
        node,
        message: MESSAGE,
        data: {
          found: depth,
          needed: maxDepth
        }
      });
    }

    function findJSXElementOrFragment(variables, name) {
      function find(refs) {
        let i = refs.length;

        while (--i >= 0) {
          if (has(refs[i], 'writeExpr')) {
            const writeExpr = refs[i].writeExpr;

            return jsxUtil.isJSX(writeExpr) &&
              writeExpr ||
              (writeExpr && writeExpr.type === 'Identifier') &&
              findJSXElementOrFragment(variables, writeExpr.name);
          }
        }

        return null;
      }

      const variable = variableUtil.getVariable(variables, name);
      return variable && variable.references && find(variable.references);
    }

    function checkDescendant(baseDepth, children) {
      baseDepth++;
      (children || []).forEach((node) => {
        if (!hasJSX(node)) {
          return;
        }

        if (baseDepth > maxDepth) {
          report(node, baseDepth);
        } else if (!isLeaf(node)) {
          checkDescendant(baseDepth, node.children);
        }
      });
    }

    function handleJSX(node) {
      if (!isLeaf(node)) {
        return;
      }

      const depth = getDepth(node);
      if (depth > maxDepth) {
        report(node, depth);
      }
    }

    return {
      JSXElement: handleJSX,
      JSXFragment: handleJSX,

      JSXExpressionContainer(node) {
        if (node.expression.type !== 'Identifier') {
          return;
        }

        const variables = variableUtil.variablesInScope(context);
        const element = findJSXElementOrFragment(variables, node.expression.name);

        if (element) {
          const baseDepth = getDepth(node);
          checkDescendant(baseDepth, element.children);
        }
      }
    };
  }
};
