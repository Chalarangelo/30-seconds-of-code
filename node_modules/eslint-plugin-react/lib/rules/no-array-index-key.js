/**
 * @fileoverview Prevent usage of Array index in keys
 * @author Joe Lencioni
 */

'use strict';

const has = require('has');
const astUtil = require('../util/ast');
const docsUrl = require('../util/docsUrl');
const pragma = require('../util/pragma');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent usage of Array index in keys',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('no-array-index-key')
    },

    schema: []
  },

  create(context) {
    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------
    const indexParamNames = [];
    const iteratorFunctionsToIndexParamPosition = {
      every: 1,
      filter: 1,
      find: 1,
      findIndex: 1,
      forEach: 1,
      map: 1,
      reduce: 2,
      reduceRight: 2,
      some: 1
    };
    const ERROR_MESSAGE = 'Do not use Array index in keys';

    function isArrayIndex(node) {
      return node.type === 'Identifier' &&
        indexParamNames.indexOf(node.name) !== -1;
    }

    function isUsingReactChildren(node) {
      const callee = node.callee;
      if (
        !callee ||
        !callee.property ||
        !callee.object
      ) {
        return null;
      }

      const isReactChildMethod = ['map', 'forEach'].indexOf(callee.property.name) > -1;
      if (!isReactChildMethod) {
        return null;
      }

      const obj = callee.object;
      if (obj && obj.name === 'Children') {
        return true;
      }
      if (obj && obj.object && obj.object.name === pragma.getFromContext(context)) {
        return true;
      }

      return false;
    }

    function getMapIndexParamName(node) {
      const callee = node.callee;
      if (callee.type !== 'MemberExpression') {
        return null;
      }
      if (callee.property.type !== 'Identifier') {
        return null;
      }
      if (!has(iteratorFunctionsToIndexParamPosition, callee.property.name)) {
        return null;
      }

      const callbackArg = isUsingReactChildren(node) ?
        node.arguments[1] :
        node.arguments[0];

      if (!callbackArg) {
        return null;
      }

      if (!astUtil.isFunctionLikeExpression(callbackArg)) {
        return null;
      }

      const params = callbackArg.params;

      const indexParamPosition = iteratorFunctionsToIndexParamPosition[callee.property.name];
      if (params.length < indexParamPosition + 1) {
        return null;
      }

      return params[indexParamPosition].name;
    }

    function getIdentifiersFromBinaryExpression(side) {
      if (side.type === 'Identifier') {
        return side;
      }

      if (side.type === 'BinaryExpression') {
        // recurse
        const left = getIdentifiersFromBinaryExpression(side.left);
        const right = getIdentifiersFromBinaryExpression(side.right);
        return [].concat(left, right).filter(Boolean);
      }

      return null;
    }

    function checkPropValue(node) {
      if (isArrayIndex(node)) {
        // key={bar}
        context.report({
          node,
          message: ERROR_MESSAGE
        });
        return;
      }

      if (node.type === 'TemplateLiteral') {
        // key={`foo-${bar}`}
        node.expressions.filter(isArrayIndex).forEach(() => {
          context.report({node, message: ERROR_MESSAGE});
        });

        return;
      }

      if (node.type === 'BinaryExpression') {
        // key={'foo' + bar}
        const identifiers = getIdentifiersFromBinaryExpression(node);

        identifiers.filter(isArrayIndex).forEach(() => {
          context.report({node, message: ERROR_MESSAGE});
        });
      }
    }

    return {
      CallExpression(node) {
        if (
          node.callee &&
          node.callee.type === 'MemberExpression' &&
          ['createElement', 'cloneElement'].indexOf(node.callee.property.name) !== -1 &&
          node.arguments.length > 1
        ) {
          // React.createElement
          if (!indexParamNames.length) {
            return;
          }

          const props = node.arguments[1];

          if (props.type !== 'ObjectExpression') {
            return;
          }

          props.properties.forEach((prop) => {
            if (!prop.key || prop.key.name !== 'key') {
              // { ...foo }
              // { foo: bar }
              return;
            }

            checkPropValue(prop.value);
          });

          return;
        }

        const mapIndexParamName = getMapIndexParamName(node);
        if (!mapIndexParamName) {
          return;
        }

        indexParamNames.push(mapIndexParamName);
      },

      JSXAttribute(node) {
        if (node.name.name !== 'key') {
          // foo={bar}
          return;
        }

        if (!indexParamNames.length) {
          // Not inside a call expression that we think has an index param.
          return;
        }

        const value = node.value;
        if (!value || value.type !== 'JSXExpressionContainer') {
          // key='foo' or just simply 'key'
          return;
        }

        checkPropValue(value.expression);
      },

      'CallExpression:exit': function (node) {
        const mapIndexParamName = getMapIndexParamName(node);
        if (!mapIndexParamName) {
          return;
        }

        indexParamNames.pop();
      }
    };
  }
};
