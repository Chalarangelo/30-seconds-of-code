/**
 * @fileoverview enforce consistent line breaks inside function parentheses
 * @author Teddy Katz
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require("../util/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "layout",

        docs: {
            description: "enforce consistent line breaks inside function parentheses",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://eslint.org/docs/rules/function-paren-newline"
        },

        fixable: "whitespace",

        schema: [
            {
                oneOf: [
                    {
                        enum: ["always", "never", "consistent", "multiline"]
                    },
                    {
                        type: "object",
                        properties: {
                            minItems: {
                                type: "integer",
                                minimum: 0
                            }
                        },
                        additionalProperties: false
                    }
                ]
            }
        ],

        messages: {
            expectedBefore: "Expected newline before ')'.",
            expectedAfter: "Expected newline after '('.",
            unexpectedBefore: "Unexpected newline before '('.",
            unexpectedAfter: "Unexpected newline after ')'."
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        const rawOption = context.options[0] || "multiline";
        const multilineOption = rawOption === "multiline";
        const consistentOption = rawOption === "consistent";
        let minItems;

        if (typeof rawOption === "object") {
            minItems = rawOption.minItems;
        } else if (rawOption === "always") {
            minItems = 0;
        } else if (rawOption === "never") {
            minItems = Infinity;
        } else {
            minItems = null;
        }

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------

        /**
         * Determines whether there should be newlines inside function parens
         * @param {ASTNode[]} elements The arguments or parameters in the list
         * @param {boolean} hasLeftNewline `true` if the left paren has a newline in the current code.
         * @returns {boolean} `true` if there should be newlines inside the function parens
         */
        function shouldHaveNewlines(elements, hasLeftNewline) {
            if (multilineOption) {
                return elements.some((element, index) => index !== elements.length - 1 && element.loc.end.line !== elements[index + 1].loc.start.line);
            }
            if (consistentOption) {
                return hasLeftNewline;
            }
            return elements.length >= minItems;
        }

        /**
         * Validates a list of arguments or parameters
         * @param {Object} parens An object with keys `leftParen` for the left paren token, and `rightParen` for the right paren token
         * @param {ASTNode[]} elements The arguments or parameters in the list
         * @returns {void}
         */
        function validateParens(parens, elements) {
            const leftParen = parens.leftParen;
            const rightParen = parens.rightParen;
            const tokenAfterLeftParen = sourceCode.getTokenAfter(leftParen);
            const tokenBeforeRightParen = sourceCode.getTokenBefore(rightParen);
            const hasLeftNewline = !astUtils.isTokenOnSameLine(leftParen, tokenAfterLeftParen);
            const hasRightNewline = !astUtils.isTokenOnSameLine(tokenBeforeRightParen, rightParen);
            const needsNewlines = shouldHaveNewlines(elements, hasLeftNewline);

            if (hasLeftNewline && !needsNewlines) {
                context.report({
                    node: leftParen,
                    messageId: "unexpectedAfter",
                    fix(fixer) {
                        return sourceCode.getText().slice(leftParen.range[1], tokenAfterLeftParen.range[0]).trim()

                            // If there is a comment between the ( and the first element, don't do a fix.
                            ? null
                            : fixer.removeRange([leftParen.range[1], tokenAfterLeftParen.range[0]]);
                    }
                });
            } else if (!hasLeftNewline && needsNewlines) {
                context.report({
                    node: leftParen,
                    messageId: "expectedAfter",
                    fix: fixer => fixer.insertTextAfter(leftParen, "\n")
                });
            }

            if (hasRightNewline && !needsNewlines) {
                context.report({
                    node: rightParen,
                    messageId: "unexpectedBefore",
                    fix(fixer) {
                        return sourceCode.getText().slice(tokenBeforeRightParen.range[1], rightParen.range[0]).trim()

                            // If there is a comment between the last element and the ), don't do a fix.
                            ? null
                            : fixer.removeRange([tokenBeforeRightParen.range[1], rightParen.range[0]]);
                    }
                });
            } else if (!hasRightNewline && needsNewlines) {
                context.report({
                    node: rightParen,
                    messageId: "expectedBefore",
                    fix: fixer => fixer.insertTextBefore(rightParen, "\n")
                });
            }
        }

        /**
         * Gets the left paren and right paren tokens of a node.
         * @param {ASTNode} node The node with parens
         * @returns {Object} An object with keys `leftParen` for the left paren token, and `rightParen` for the right paren token.
         * Can also return `null` if an expression has no parens (e.g. a NewExpression with no arguments, or an ArrowFunctionExpression
         * with a single parameter)
         */
        function getParenTokens(node) {
            switch (node.type) {
                case "NewExpression":
                    if (!node.arguments.length && !(
                        astUtils.isOpeningParenToken(sourceCode.getLastToken(node, { skip: 1 })) &&
                        astUtils.isClosingParenToken(sourceCode.getLastToken(node))
                    )) {

                        // If the NewExpression does not have parens (e.g. `new Foo`), return null.
                        return null;
                    }

                    // falls through

                case "CallExpression":
                    return {
                        leftParen: sourceCode.getTokenAfter(node.callee, astUtils.isOpeningParenToken),
                        rightParen: sourceCode.getLastToken(node)
                    };

                case "FunctionDeclaration":
                case "FunctionExpression": {
                    const leftParen = sourceCode.getFirstToken(node, astUtils.isOpeningParenToken);
                    const rightParen = node.params.length
                        ? sourceCode.getTokenAfter(node.params[node.params.length - 1], astUtils.isClosingParenToken)
                        : sourceCode.getTokenAfter(leftParen);

                    return { leftParen, rightParen };
                }

                case "ArrowFunctionExpression": {
                    const firstToken = sourceCode.getFirstToken(node);

                    if (!astUtils.isOpeningParenToken(firstToken)) {

                        // If the ArrowFunctionExpression has a single param without parens, return null.
                        return null;
                    }

                    return {
                        leftParen: firstToken,
                        rightParen: sourceCode.getTokenBefore(node.body, astUtils.isClosingParenToken)
                    };
                }

                default:
                    throw new TypeError(`unexpected node with type ${node.type}`);
            }
        }

        /**
         * Validates the parentheses for a node
         * @param {ASTNode} node The node with parens
         * @returns {void}
         */
        function validateNode(node) {
            const parens = getParenTokens(node);

            if (parens) {
                validateParens(parens, astUtils.isFunction(node) ? node.params : node.arguments);
            }
        }

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            ArrowFunctionExpression: validateNode,
            CallExpression: validateNode,
            FunctionDeclaration: validateNode,
            FunctionExpression: validateNode,
            NewExpression: validateNode
        };
    }
};
