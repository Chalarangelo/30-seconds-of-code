/**
 * @fileoverview Enforce shorthand or standard form for React fragments.
 * @author Alex Zherdev
 */

'use strict';

const elementType = require('jsx-ast-utils/elementType');
const pragmaUtil = require('../util/pragma');
const variableUtil = require('../util/variable');
const versionUtil = require('../util/version');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function replaceNode(source, node, text) {
  return `${source.slice(0, node.range[0])}${text}${source.slice(node.range[1])}`;
}

module.exports = {
  meta: {
    docs: {
      description: 'Enforce shorthand or standard form for React fragments',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-fragments')
    },
    fixable: 'code',

    schema: [{
      enum: ['syntax', 'element']
    }]
  },

  create(context) {
    const configuration = context.options[0] || 'syntax';
    const reactPragma = pragmaUtil.getFromContext(context);
    const fragmentPragma = pragmaUtil.getFragmentFromContext(context);
    const openFragShort = '<>';
    const closeFragShort = '</>';
    const openFragLong = `<${reactPragma}.${fragmentPragma}>`;
    const closeFragLong = `</${reactPragma}.${fragmentPragma}>`;

    function reportOnReactVersion(node) {
      if (!versionUtil.testReactVersion(context, '16.2.0')) {
        context.report({
          node,
          message: 'Fragments are only supported starting from React v16.2. ' +
            'Please disable the `react/jsx-fragments` rule in ESLint settings or upgrade your version of React.'
        });
        return true;
      }

      return false;
    }

    function getFixerToLong(jsxFragment) {
      const sourceCode = context.getSourceCode();
      return function (fixer) {
        let source = sourceCode.getText();
        source = replaceNode(source, jsxFragment.closingFragment, closeFragLong);
        source = replaceNode(source, jsxFragment.openingFragment, openFragLong);
        const lengthDiff = openFragLong.length - sourceCode.getText(jsxFragment.openingFragment).length +
          closeFragLong.length - sourceCode.getText(jsxFragment.closingFragment).length;
        const range = jsxFragment.range;
        return fixer.replaceTextRange(range, source.slice(range[0], range[1] + lengthDiff));
      };
    }

    function getFixerToShort(jsxElement) {
      const sourceCode = context.getSourceCode();
      return function (fixer) {
        let source = sourceCode.getText();
        let lengthDiff;
        if (jsxElement.closingElement) {
          source = replaceNode(source, jsxElement.closingElement, closeFragShort);
          source = replaceNode(source, jsxElement.openingElement, openFragShort);
          lengthDiff = sourceCode.getText(jsxElement.openingElement).length - openFragShort.length +
            sourceCode.getText(jsxElement.closingElement).length - closeFragShort.length;
        } else {
          source = replaceNode(source, jsxElement.openingElement, `${openFragShort}${closeFragShort}`);
          lengthDiff = sourceCode.getText(jsxElement.openingElement).length - openFragShort.length -
            closeFragShort.length;
        }

        const range = jsxElement.range;
        return fixer.replaceTextRange(range, source.slice(range[0], range[1] - lengthDiff));
      };
    }

    function refersToReactFragment(name) {
      const variableInit = variableUtil.findVariableByName(context, name);
      if (!variableInit) {
        return false;
      }

      // const { Fragment } = React;
      if (variableInit.type === 'Identifier' && variableInit.name === reactPragma) {
        return true;
      }

      // const Fragment = React.Fragment;
      if (
        variableInit.type === 'MemberExpression' &&
        variableInit.object.type === 'Identifier' &&
        variableInit.object.name === reactPragma &&
        variableInit.property.type === 'Identifier' &&
        variableInit.property.name === fragmentPragma
      ) {
        return true;
      }

      // const { Fragment } = require('react');
      if (
        variableInit.callee &&
        variableInit.callee.name === 'require' &&
        variableInit.arguments &&
        variableInit.arguments[0] &&
        variableInit.arguments[0].value === 'react'
      ) {
        return true;
      }

      return false;
    }

    const jsxElements = [];
    const fragmentNames = new Set([`${reactPragma}.${fragmentPragma}`]);

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXElement(node) {
        jsxElements.push(node);
      },

      JSXFragment(node) {
        if (reportOnReactVersion(node)) {
          return;
        }

        if (configuration === 'element') {
          context.report({
            node,
            message: `Prefer ${reactPragma}.${fragmentPragma} over fragment shorthand`,
            fix: getFixerToLong(node)
          });
        }
      },

      ImportDeclaration(node) {
        if (node.source && node.source.value === 'react') {
          node.specifiers.forEach((spec) => {
            if (spec.imported && spec.imported.name === fragmentPragma) {
              if (spec.local) {
                fragmentNames.add(spec.local.name);
              }
            }
          });
        }
      },

      'Program:exit': function () {
        jsxElements.forEach((node) => {
          const openingEl = node.openingElement;
          const elName = elementType(openingEl);

          if (fragmentNames.has(elName) || refersToReactFragment(elName)) {
            if (reportOnReactVersion(node)) {
              return;
            }

            const attrs = openingEl.attributes;
            if (configuration === 'syntax' && !(attrs && attrs.length > 0)) {
              context.report({
                node,
                message: `Prefer fragment shorthand over ${reactPragma}.${fragmentPragma}`,
                fix: getFixerToShort(node)
              });
            }
          }
        });
      }
    };
  }
};
