/**
 * @fileoverview Enforce curly braces or disallow unnecessary curly brace in JSX
 * @author Jacky Ho
 * @author Simon Lydell
 */

'use strict';

const docsUrl = require('../util/docsUrl');
const jsxUtil = require('../util/jsx');

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const OPTION_ALWAYS = 'always';
const OPTION_NEVER = 'never';
const OPTION_IGNORE = 'ignore';

const OPTION_VALUES = [
  OPTION_ALWAYS,
  OPTION_NEVER,
  OPTION_IGNORE
];
const DEFAULT_CONFIG = {props: OPTION_NEVER, children: OPTION_NEVER};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        'Disallow unnecessary JSX expressions when literals alone are sufficient ' +
          'or enfore JSX expressions on literals in JSX children or attributes',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-curly-brace-presence')
    },
    fixable: 'code',

    schema: [
      {
        oneOf: [
          {
            type: 'object',
            properties: {
              props: {enum: OPTION_VALUES},
              children: {enum: OPTION_VALUES}
            },
            additionalProperties: false
          },
          {
            enum: OPTION_VALUES
          }
        ]
      }
    ]
  },

  create(context) {
    const ruleOptions = context.options[0];
    const userConfig = typeof ruleOptions === 'string' ?
      {props: ruleOptions, children: ruleOptions} :
      Object.assign({}, DEFAULT_CONFIG, ruleOptions);

    function containsLineTerminators(rawStringValue) {
      return /[\n\r\u2028\u2029]/.test(rawStringValue);
    }

    function containsBackslash(rawStringValue) {
      return rawStringValue.includes('\\');
    }

    function containsHTMLEntity(rawStringValue) {
      return /&[A-Za-z\d#]+;/.test(rawStringValue);
    }

    function containsDisallowedJSXTextChars(rawStringValue) {
      return /[{<>}]/.test(rawStringValue);
    }

    function containsQuoteCharacters(value) {
      return /['"]/.test(value);
    }

    function escapeDoubleQuotes(rawStringValue) {
      return rawStringValue.replace(/\\"/g, '"').replace(/"/g, '\\"');
    }

    function escapeBackslashes(rawStringValue) {
      return rawStringValue.replace(/\\/g, '\\\\');
    }

    function needToEscapeCharacterForJSX(raw) {
      return (
        containsBackslash(raw) ||
        containsHTMLEntity(raw) ||
        containsDisallowedJSXTextChars(raw)
      );
    }

    function containsWhitespaceExpression(child) {
      if (child.type === 'JSXExpressionContainer') {
        const value = child.expression.value;
        return value ? !(/\S/.test(value)) : false;
      }
      return false;
    }

    /**
     * Report and fix an unnecessary curly brace violation on a node
     * @param {ASTNode} JSXExpressionNode - The AST node with an unnecessary JSX expression
     */
    function reportUnnecessaryCurly(JSXExpressionNode) {
      context.report({
        node: JSXExpressionNode,
        message: 'Curly braces are unnecessary here.',
        fix(fixer) {
          const expression = JSXExpressionNode.expression;
          const expressionType = expression.type;
          const parentType = JSXExpressionNode.parent.type;

          let textToReplace;
          if (parentType === 'JSXAttribute') {
            textToReplace = `"${expressionType === 'TemplateLiteral' ?
              expression.quasis[0].value.raw :
              expression.raw.substring(1, expression.raw.length - 1)
            }"`;
          } else {
            textToReplace = expressionType === 'TemplateLiteral' ?
              expression.quasis[0].value.cooked : expression.value;
          }

          return fixer.replaceText(JSXExpressionNode, textToReplace);
        }
      });
    }

    function reportMissingCurly(literalNode) {
      context.report({
        node: literalNode,
        message: 'Need to wrap this literal in a JSX expression.',
        fix(fixer) {
          // If a HTML entity name is found, bail out because it can be fixed
          // by either using the real character or the unicode equivalent.
          // If it contains any line terminator character, bail out as well.
          if (
            containsHTMLEntity(literalNode.raw) ||
            containsLineTerminators(literalNode.raw)
          ) {
            return null;
          }

          const expression = literalNode.parent.type === 'JSXAttribute' ?
            `{"${escapeDoubleQuotes(escapeBackslashes(
              literalNode.raw.substring(1, literalNode.raw.length - 1)
            ))}"}` :
            `{${JSON.stringify(literalNode.value)}}`;

          return fixer.replaceText(literalNode, expression);
        }
      });
    }

    // Bail out if there is any character that needs to be escaped in JSX
    // because escaping decreases readiblity and the original code may be more
    // readible anyway or intentional for other specific reasons
    function lintUnnecessaryCurly(JSXExpressionNode) {
      const expression = JSXExpressionNode.expression;
      const expressionType = expression.type;

      if (
        (expressionType === 'Literal' || expressionType === 'JSXText') &&
          typeof expression.value === 'string' &&
          !needToEscapeCharacterForJSX(expression.raw) && (
          jsxUtil.isJSX(JSXExpressionNode.parent) ||
          !containsQuoteCharacters(expression.value)
        )
      ) {
        reportUnnecessaryCurly(JSXExpressionNode);
      } else if (
        expressionType === 'TemplateLiteral' &&
          expression.expressions.length === 0 &&
          expression.quasis[0].value.raw.indexOf('\n') === -1 &&
          !needToEscapeCharacterForJSX(expression.quasis[0].value.raw) && (
          jsxUtil.isJSX(JSXExpressionNode.parent) ||
          !containsQuoteCharacters(expression.quasis[0].value.cooked)
        )
      ) {
        reportUnnecessaryCurly(JSXExpressionNode);
      }
    }

    function areRuleConditionsSatisfied(parent, config, ruleCondition) {
      return (
        parent.type === 'JSXAttribute' &&
          typeof config.props === 'string' &&
          config.props === ruleCondition
      ) || (
        jsxUtil.isJSX(parent) &&
          typeof config.children === 'string' &&
          config.children === ruleCondition
      );
    }

    function shouldCheckForUnnecessaryCurly(parent, config) {
      // If there are more than one JSX child, there is no need to check for
      // unnecessary curly braces.
      if (jsxUtil.isJSX(parent) && parent.children.length !== 1) {
        return false;
      }

      if (
        parent.children &&
        parent.children.length === 1 &&
        containsWhitespaceExpression(parent.children[0])
      ) {
        return false;
      }

      return areRuleConditionsSatisfied(parent, config, OPTION_NEVER);
    }

    function shouldCheckForMissingCurly(parent, config) {
      if (
        parent.children &&
        parent.children.length === 1 &&
        containsWhitespaceExpression(parent.children[0])
      ) {
        return false;
      }

      return areRuleConditionsSatisfied(parent, config, OPTION_ALWAYS);
    }

    // --------------------------------------------------------------------------
    // Public
    // --------------------------------------------------------------------------

    return {
      JSXExpressionContainer: (node) => {
        if (shouldCheckForUnnecessaryCurly(node.parent, userConfig)) {
          lintUnnecessaryCurly(node);
        }
      },

      'Literal, JSXText': (node) => {
        if (shouldCheckForMissingCurly(node.parent, userConfig)) {
          reportMissingCurly(node);
        }
      }
    };
  }
};
