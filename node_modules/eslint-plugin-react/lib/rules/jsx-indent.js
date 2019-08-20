/**
 * @fileoverview Validate JSX indentation
 * @author Yannick Croissant

 * This rule has been ported and modified from eslint and nodeca.
 * @author Vitaly Puzrin
 * @author Gyandeep Singh
 * @copyright 2015 Vitaly Puzrin. All rights reserved.
 * @copyright 2015 Gyandeep Singh. All rights reserved.
 Copyright (C) 2014 by Vitaly Puzrin

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the 'Software'), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 */

'use strict';

const astUtil = require('../util/ast');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description: 'Validate JSX indentation',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-indent')
    },
    fixable: 'whitespace',
    schema: [{
      oneOf: [{
        enum: ['tab']
      }, {
        type: 'integer'
      }]
    }, {
      type: 'object',
      properties: {
        checkAttributes: {
          type: 'boolean'
        },
        indentLogicalExpressions: {
          type: 'boolean'
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const MESSAGE = 'Expected indentation of {{needed}} {{type}} {{characters}} but found {{gotten}}.';

    const extraColumnStart = 0;
    let indentType = 'space';
    let indentSize = 4;

    if (context.options.length) {
      if (context.options[0] === 'tab') {
        indentSize = 1;
        indentType = 'tab';
      } else if (typeof context.options[0] === 'number') {
        indentSize = context.options[0];
        indentType = 'space';
      }
    }

    const indentChar = indentType === 'space' ? ' ' : '\t';
    const options = context.options[1] || {};
    const checkAttributes = options.checkAttributes || false;
    const indentLogicalExpressions = options.indentLogicalExpressions || false;

    /**
     * Responsible for fixing the indentation issue fix
     * @param {ASTNode} node Node violating the indent rule
     * @param {Number} needed Expected indentation character count
     * @returns {Function} function to be executed by the fixer
     * @private
     */
    function getFixerFunction(node, needed) {
      return function (fixer) {
        const indent = Array(needed + 1).join(indentChar);
        return fixer.replaceTextRange(
          [node.range[0] - node.loc.start.column, node.range[0]],
          indent
        );
      };
    }

    /**
     * Reports a given indent violation and properly pluralizes the message
     * @param {ASTNode} node Node violating the indent rule
     * @param {Number} needed Expected indentation character count
     * @param {Number} gotten Indentation character count in the actual node/code
     * @param {Object} [loc] Error line and column location
     */
    function report(node, needed, gotten, loc) {
      const msgContext = {
        needed,
        type: indentType,
        characters: needed === 1 ? 'character' : 'characters',
        gotten
      };

      if (loc) {
        context.report({
          node,
          loc,
          message: MESSAGE,
          data: msgContext,
          fix: getFixerFunction(node, needed)
        });
      } else {
        context.report({
          node,
          message: MESSAGE,
          data: msgContext,
          fix: getFixerFunction(node, needed)
        });
      }
    }

    /**
     * Get node indent
     * @param {ASTNode} node Node to examine
     * @param {Boolean} [byLastLine] get indent of node's last line
     * @param {Boolean} [excludeCommas] skip comma on start of line
     * @return {Number} Indent
     */
    function getNodeIndent(node, byLastLine, excludeCommas) {
      byLastLine = byLastLine || false;
      excludeCommas = excludeCommas || false;

      let src = context.getSourceCode().getText(node, node.loc.start.column + extraColumnStart);
      const lines = src.split('\n');
      if (byLastLine) {
        src = lines[lines.length - 1];
      } else {
        src = lines[0];
      }

      const skip = excludeCommas ? ',' : '';

      let regExp;
      if (indentType === 'space') {
        regExp = new RegExp(`^[ ${skip}]+`);
      } else {
        regExp = new RegExp(`^[\t${skip}]+`);
      }

      const indent = regExp.exec(src);
      return indent ? indent[0].length : 0;
    }

    /**
     * Check if the node is the right member of a logical expression
     * @param {ASTNode} node The node to check
     * @return {Boolean} true if its the case, false if not
     */
    function isRightInLogicalExp(node) {
      return (
        node.parent &&
        node.parent.parent &&
        node.parent.parent.type === 'LogicalExpression' &&
        node.parent.parent.right === node.parent &&
        !indentLogicalExpressions
      );
    }

    /**
     * Check if the node is the alternate member of a conditional expression
     * @param {ASTNode} node The node to check
     * @return {Boolean} true if its the case, false if not
     */
    function isAlternateInConditionalExp(node) {
      return (
        node.parent &&
        node.parent.parent &&
        node.parent.parent.type === 'ConditionalExpression' &&
        node.parent.parent.alternate === node.parent &&
        context.getSourceCode().getTokenBefore(node).value !== '('
      );
    }

    /**
     * Check indent for nodes list
     * @param {ASTNode} node The node to check
     * @param {Number} indent needed indent
     * @param {Boolean} [excludeCommas] skip comma on start of line
     */
    function checkNodesIndent(node, indent, excludeCommas) {
      const nodeIndent = getNodeIndent(node, false, excludeCommas);
      const isCorrectRightInLogicalExp = isRightInLogicalExp(node) && (nodeIndent - indent) === indentSize;
      const isCorrectAlternateInCondExp = isAlternateInConditionalExp(node) && (nodeIndent - indent) === 0;
      if (
        nodeIndent !== indent &&
        astUtil.isNodeFirstInLine(context, node) &&
        !isCorrectRightInLogicalExp &&
        !isCorrectAlternateInCondExp
      ) {
        report(node, indent, nodeIndent);
      }
    }

    function handleOpeningElement(node) {
      const sourceCode = context.getSourceCode();
      let prevToken = sourceCode.getTokenBefore(node);
      if (!prevToken) {
        return;
      }
      // Use the parent in a list or an array
      if (prevToken.type === 'JSXText' || prevToken.type === 'Punctuator' && prevToken.value === ',') {
        prevToken = sourceCode.getNodeByRangeIndex(prevToken.range[0]);
        prevToken = prevToken.type === 'Literal' || prevToken.type === 'JSXText' ? prevToken.parent : prevToken;
      // Use the first non-punctuator token in a conditional expression
      } else if (prevToken.type === 'Punctuator' && prevToken.value === ':') {
        do {
          prevToken = sourceCode.getTokenBefore(prevToken);
        } while (prevToken.type === 'Punctuator' && prevToken.value !== '/');
        prevToken = sourceCode.getNodeByRangeIndex(prevToken.range[0]);
        while (prevToken.parent && prevToken.parent.type !== 'ConditionalExpression') {
          prevToken = prevToken.parent;
        }
      }
      prevToken = prevToken.type === 'JSXExpressionContainer' ? prevToken.expression : prevToken;
      const parentElementIndent = getNodeIndent(prevToken);
      const indent = (
        prevToken.loc.start.line === node.loc.start.line ||
        isRightInLogicalExp(node) ||
        isAlternateInConditionalExp(node)
      ) ? 0 : indentSize;
      checkNodesIndent(node, parentElementIndent + indent);
    }

    function handleClosingElement(node) {
      if (!node.parent) {
        return;
      }
      const peerElementIndent = getNodeIndent(node.parent.openingElement || node.parent.openingFragment);
      checkNodesIndent(node, peerElementIndent);
    }

    function handleAttribute(node) {
      if (!checkAttributes || (!node.value || node.value.type !== 'JSXExpressionContainer')) {
        return;
      }
      const nameIndent = getNodeIndent(node.name);
      const lastToken = context.getSourceCode().getLastToken(node.value);
      const firstInLine = astUtil.getFirstNodeInLine(context, lastToken);
      const indent = node.name.loc.start.line === firstInLine.loc.start.line ? 0 : nameIndent;
      checkNodesIndent(firstInLine, indent);
    }

    return {
      JSXOpeningElement: handleOpeningElement,
      JSXOpeningFragment: handleOpeningElement,
      JSXClosingElement: handleClosingElement,
      JSXClosingFragment: handleClosingElement,
      JSXAttribute: handleAttribute,
      JSXExpressionContainer(node) {
        if (!node.parent) {
          return;
        }
        const parentNodeIndent = getNodeIndent(node.parent);
        checkNodesIndent(node, parentNodeIndent + indentSize);
      }
    };
  }
};
