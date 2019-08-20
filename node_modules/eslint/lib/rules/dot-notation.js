/**
 * @fileoverview Rule to warn about using dot notation instead of square bracket notation when possible.
 * @author Josh Perez
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require("../util/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const validIdentifier = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/u;
const keywords = require("../util/keywords");

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "enforce dot notation whenever possible",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/dot-notation"
        },

        schema: [
            {
                type: "object",
                properties: {
                    allowKeywords: {
                        type: "boolean",
                        default: true
                    },
                    allowPattern: {
                        type: "string",
                        default: ""
                    }
                },
                additionalProperties: false
            }
        ],

        fixable: "code",

        messages: {
            useDot: "[{{key}}] is better written in dot notation.",
            useBrackets: ".{{key}} is a syntax error."
        }
    },

    create(context) {
        const options = context.options[0] || {};
        const allowKeywords = options.allowKeywords === void 0 || options.allowKeywords;
        const sourceCode = context.getSourceCode();

        let allowPattern;

        if (options.allowPattern) {
            allowPattern = new RegExp(options.allowPattern); // eslint-disable-line require-unicode-regexp
        }

        /**
         * Check if the property is valid dot notation
         * @param {ASTNode} node The dot notation node
         * @param {string} value Value which is to be checked
         * @returns {void}
         */
        function checkComputedProperty(node, value) {
            if (
                validIdentifier.test(value) &&
                (allowKeywords || keywords.indexOf(String(value)) === -1) &&
                !(allowPattern && allowPattern.test(value))
            ) {
                const formattedValue = node.property.type === "Literal" ? JSON.stringify(value) : `\`${value}\``;

                context.report({
                    node: node.property,
                    messageId: "useDot",
                    data: {
                        key: formattedValue
                    },
                    fix(fixer) {
                        const leftBracket = sourceCode.getTokenAfter(node.object, astUtils.isOpeningBracketToken);
                        const rightBracket = sourceCode.getLastToken(node);

                        if (sourceCode.getFirstTokenBetween(leftBracket, rightBracket, { includeComments: true, filter: astUtils.isCommentToken })) {

                            // Don't perform any fixes if there are comments inside the brackets.
                            return null;
                        }

                        const tokenAfterProperty = sourceCode.getTokenAfter(rightBracket);
                        const needsSpaceAfterProperty = tokenAfterProperty &&
                            rightBracket.range[1] === tokenAfterProperty.range[0] &&
                            !astUtils.canTokensBeAdjacent(String(value), tokenAfterProperty);

                        const textBeforeDot = astUtils.isDecimalInteger(node.object) ? " " : "";
                        const textAfterProperty = needsSpaceAfterProperty ? " " : "";

                        return fixer.replaceTextRange(
                            [leftBracket.range[0], rightBracket.range[1]],
                            `${textBeforeDot}.${value}${textAfterProperty}`
                        );
                    }
                });
            }
        }

        return {
            MemberExpression(node) {
                if (
                    node.computed &&
                    node.property.type === "Literal"
                ) {
                    checkComputedProperty(node, node.property.value);
                }
                if (
                    node.computed &&
                    node.property.type === "TemplateLiteral" &&
                    node.property.expressions.length === 0
                ) {
                    checkComputedProperty(node, node.property.quasis[0].value.cooked);
                }
                if (
                    !allowKeywords &&
                    !node.computed &&
                    keywords.indexOf(String(node.property.name)) !== -1
                ) {
                    context.report({
                        node: node.property,
                        messageId: "useBrackets",
                        data: {
                            key: node.property.name
                        },
                        fix(fixer) {
                            const dot = sourceCode.getTokenBefore(node.property);
                            const textAfterDot = sourceCode.text.slice(dot.range[1], node.property.range[0]);

                            if (textAfterDot.trim()) {

                                // Don't perform any fixes if there are comments between the dot and the property name.
                                return null;
                            }

                            if (node.object.type === "Identifier" && node.object.name === "let") {

                                /*
                                 * A statement that starts with `let[` is parsed as a destructuring variable declaration, not
                                 * a MemberExpression.
                                 */
                                return null;
                            }

                            return fixer.replaceTextRange(
                                [dot.range[0], node.property.range[1]],
                                `[${textAfterDot}"${node.property.name}"]`
                            );
                        }
                    });
                }
            }
        };
    }
};
