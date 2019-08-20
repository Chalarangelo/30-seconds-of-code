/**
 * @fileoverview Rule to enforce spacing around embedded expressions of template strings
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

const OPEN_PAREN = /\$\{$/u;
const CLOSE_PAREN = /^\}/u;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "layout",

        docs: {
            description: "require or disallow spacing around embedded expressions of template strings",
            category: "ECMAScript 6",
            recommended: false,
            url: "https://eslint.org/docs/rules/template-curly-spacing"
        },

        fixable: "whitespace",

        schema: [
            { enum: ["always", "never"] }
        ],
        messages: {
            expectedBefore: "Expected space(s) before '}'.",
            expectedAfter: "Expected space(s) after '${'.",
            unexpectedBefore: "Unexpected space(s) before '}'.",
            unexpectedAfter: "Unexpected space(s) after '${'."
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();
        const always = context.options[0] === "always";
        const prefix = always ? "expected" : "unexpected";

        /**
         * Checks spacing before `}` of a given token.
         * @param {Token} token - A token to check. This is a Template token.
         * @returns {void}
         */
        function checkSpacingBefore(token) {
            const prevToken = sourceCode.getTokenBefore(token);

            if (prevToken &&
                CLOSE_PAREN.test(token.value) &&
                astUtils.isTokenOnSameLine(prevToken, token) &&
                sourceCode.isSpaceBetweenTokens(prevToken, token) !== always
            ) {
                context.report({
                    loc: token.loc.start,
                    messageId: `${prefix}Before`,
                    fix(fixer) {
                        if (always) {
                            return fixer.insertTextBefore(token, " ");
                        }
                        return fixer.removeRange([
                            prevToken.range[1],
                            token.range[0]
                        ]);
                    }
                });
            }
        }

        /**
         * Checks spacing after `${` of a given token.
         * @param {Token} token - A token to check. This is a Template token.
         * @returns {void}
         */
        function checkSpacingAfter(token) {
            const nextToken = sourceCode.getTokenAfter(token);

            if (nextToken &&
                OPEN_PAREN.test(token.value) &&
                astUtils.isTokenOnSameLine(token, nextToken) &&
                sourceCode.isSpaceBetweenTokens(token, nextToken) !== always
            ) {
                context.report({
                    loc: {
                        line: token.loc.end.line,
                        column: token.loc.end.column - 2
                    },
                    messageId: `${prefix}After`,
                    fix(fixer) {
                        if (always) {
                            return fixer.insertTextAfter(token, " ");
                        }
                        return fixer.removeRange([
                            token.range[1],
                            nextToken.range[0]
                        ]);
                    }
                });
            }
        }

        return {
            TemplateElement(node) {
                const token = sourceCode.getFirstToken(node);

                checkSpacingBefore(token);
                checkSpacingAfter(token);
            }
        };
    }
};
