/**
 * @fileoverview Prevent missing parentheses around multilines JSX
 * @author Yannick Croissant
 */

'use strict';

const has = require('has');
const docsUrl = require('../util/docsUrl');
const jsxUtil = require('../util/jsx');

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const DEFAULTS = {
  declaration: 'parens',
  assignment: 'parens',
  return: 'parens',
  arrow: 'parens',
  condition: 'ignore',
  logical: 'ignore',
  prop: 'ignore'
};

const MISSING_PARENS = 'Missing parentheses around multilines JSX';
const PARENS_NEW_LINES = 'Parentheses around JSX should be on separate lines';

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent missing parentheses around multilines JSX',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-wrap-multilines')
    },
    fixable: 'code',

    schema: [{
      type: 'object',
      // true/false are for backwards compatibility
      properties: {
        declaration: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        assignment: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        return: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        arrow: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        condition: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        logical: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        },
        prop: {
          enum: [true, false, 'ignore', 'parens', 'parens-new-line']
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    function getOption(type) {
      const userOptions = context.options[0] || {};
      if (has(userOptions, type)) {
        return userOptions[type];
      }
      return DEFAULTS[type];
    }

    function isEnabled(type) {
      const option = getOption(type);
      return option && option !== 'ignore';
    }

    function isParenthesised(node) {
      const sourceCode = context.getSourceCode();
      const previousToken = sourceCode.getTokenBefore(node);
      const nextToken = sourceCode.getTokenAfter(node);

      return previousToken && nextToken &&
        previousToken.value === '(' && previousToken.range[1] <= node.range[0] &&
        nextToken.value === ')' && nextToken.range[0] >= node.range[1];
    }

    function needsOpeningNewLine(node) {
      const previousToken = context.getSourceCode().getTokenBefore(node);

      if (!isParenthesised(node)) {
        return false;
      }

      if (previousToken.loc.end.line === node.loc.start.line) {
        return true;
      }

      return false;
    }

    function needsClosingNewLine(node) {
      const nextToken = context.getSourceCode().getTokenAfter(node);

      if (!isParenthesised(node)) {
        return false;
      }

      if (node.loc.end.line === nextToken.loc.end.line) {
        return true;
      }

      return false;
    }

    function isMultilines(node) {
      return node.loc.start.line !== node.loc.end.line;
    }

    function report(node, message, fix) {
      context.report({
        node,
        message,
        fix
      });
    }

    function trimTokenBeforeNewline(node, tokenBefore) {
      // if the token before the jsx is a bracket or curly brace
      // we don't want a space between the opening parentheses and the multiline jsx
      const isBracket = tokenBefore.value === '{' || tokenBefore.value === '[';
      return `${tokenBefore.value.trim()}${isBracket ? '' : ' '}`;
    }

    function check(node, type) {
      if (!node || !jsxUtil.isJSX(node)) {
        return;
      }

      const sourceCode = context.getSourceCode();
      const option = getOption(type);

      if ((option === true || option === 'parens') && !isParenthesised(node) && isMultilines(node)) {
        report(node, MISSING_PARENS, fixer => fixer.replaceText(node, `(${sourceCode.getText(node)})`));
      }

      if (option === 'parens-new-line' && isMultilines(node)) {
        if (!isParenthesised(node)) {
          const tokenBefore = sourceCode.getTokenBefore(node, {includeComments: true});
          const tokenAfter = sourceCode.getTokenAfter(node, {includeComments: true});
          if (tokenBefore.loc.end.line < node.loc.start.line) {
            // Strip newline after operator if parens newline is specified
            report(
              node,
              MISSING_PARENS,
              fixer => fixer.replaceTextRange(
                [tokenBefore.range[0], tokenAfter ? tokenAfter.range[0] : node.range[1]],
                `${trimTokenBeforeNewline(node, tokenBefore)}(\n${sourceCode.getText(node)}\n)`
              )
            );
          } else {
            report(node, MISSING_PARENS, fixer => fixer.replaceText(node, `(\n${sourceCode.getText(node)}\n)`));
          }
        } else {
          const needsOpening = needsOpeningNewLine(node);
          const needsClosing = needsClosingNewLine(node);
          if (needsOpening || needsClosing) {
            report(node, PARENS_NEW_LINES, (fixer) => {
              const text = sourceCode.getText(node);
              let fixed = text;
              if (needsOpening) {
                fixed = `\n${fixed}`;
              }
              if (needsClosing) {
                fixed = `${fixed}\n`;
              }
              return fixer.replaceText(node, fixed);
            });
          }
        }
      }
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {

      VariableDeclarator(node) {
        const type = 'declaration';
        if (!isEnabled(type)) {
          return;
        }
        if (!isEnabled('condition') && node.init && node.init.type === 'ConditionalExpression') {
          check(node.init.consequent, type);
          check(node.init.alternate, type);
          return;
        }
        check(node.init, type);
      },

      AssignmentExpression(node) {
        const type = 'assignment';
        if (!isEnabled(type)) {
          return;
        }
        if (!isEnabled('condition') && node.right.type === 'ConditionalExpression') {
          check(node.right.consequent, type);
          check(node.right.alternate, type);
          return;
        }
        check(node.right, type);
      },

      ReturnStatement(node) {
        const type = 'return';
        if (isEnabled(type)) {
          check(node.argument, type);
        }
      },

      'ArrowFunctionExpression:exit': function (node) {
        const arrowBody = node.body;
        const type = 'arrow';

        if (isEnabled(type) && arrowBody.type !== 'BlockStatement') {
          check(arrowBody, type);
        }
      },

      ConditionalExpression(node) {
        const type = 'condition';
        if (isEnabled(type)) {
          check(node.consequent, type);
          check(node.alternate, type);
        }
      },

      LogicalExpression(node) {
        const type = 'logical';
        if (isEnabled(type)) {
          check(node.right, type);
        }
      },

      JSXAttribute(node) {
        const type = 'prop';
        if (isEnabled(type) && node.value && node.value.type === 'JSXExpressionContainer') {
          check(node.value.expression, type);
        }
      }
    };
  }
};
