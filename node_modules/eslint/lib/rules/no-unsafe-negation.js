/**
 * @fileoverview Rule to disallow negating the left operand of relational operators
 * @author Toru Nagashima
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require("../util/ast-utils");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Checks whether the given operator is a relational operator or not.
 *
 * @param {string} op - The operator type to check.
 * @returns {boolean} `true` if the operator is a relational operator.
 */
function isRelationalOperator(op) {
    return op === "in" || op === "instanceof";
}

/**
 * Checks whether the given node is a logical negation expression or not.
 *
 * @param {ASTNode} node - The node to check.
 * @returns {boolean} `true` if the node is a logical negation expression.
 */
function isNegation(node) {
    return node.type === "UnaryExpression" && node.operator === "!";
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "disallow negating the left operand of relational operators",
            category: "Possible Errors",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-unsafe-negation"
        },

        schema: [],
        fixable: "code",
        messages: {
            unexpected: "Unexpected negating the left operand of '{{operator}}' operator."
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        return {
            BinaryExpression(node) {
                if (isRelationalOperator(node.operator) &&
                    isNegation(node.left) &&
                    !astUtils.isParenthesised(sourceCode, node.left)
                ) {
                    context.report({
                        node,
                        loc: node.left.loc,
                        messageId: "unexpected",
                        data: { operator: node.operator },

                        fix(fixer) {
                            const negationToken = sourceCode.getFirstToken(node.left);
                            const fixRange = [negationToken.range[1], node.range[1]];
                            const text = sourceCode.text.slice(fixRange[0], fixRange[1]);

                            return fixer.replaceTextRange(fixRange, `(${text})`);
                        }
                    });
                }
            }
        };
    }
};
