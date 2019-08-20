/**
 * @fileoverview Rule to require parens in arrow function arguments.
 * @author Jxck
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
            description: "require parentheses around arrow function arguments",
            category: "ECMAScript 6",
            recommended: false,
            url: "https://eslint.org/docs/rules/arrow-parens"
        },

        fixable: "code",

        schema: [
            {
                enum: ["always", "as-needed"]
            },
            {
                type: "object",
                properties: {
                    requireForBlockBody: {
                        type: "boolean",
                        default: false
                    }
                },
                additionalProperties: false
            }
        ],

        messages: {
            unexpectedParens: "Unexpected parentheses around single function argument.",
            expectedParens: "Expected parentheses around arrow function argument.",

            unexpectedParensInline: "Unexpected parentheses around single function argument having a body with no curly braces.",
            expectedParensBlock: "Expected parentheses around arrow function argument having a body with curly braces."
        }
    },

    create(context) {
        const asNeeded = context.options[0] === "as-needed";
        const requireForBlockBody = asNeeded && context.options[1] && context.options[1].requireForBlockBody === true;

        const sourceCode = context.getSourceCode();

        /**
         * Determines whether a arrow function argument end with `)`
         * @param {ASTNode} node The arrow function node.
         * @returns {void}
         */
        function parens(node) {
            const isAsync = node.async;
            const firstTokenOfParam = sourceCode.getFirstToken(node, isAsync ? 1 : 0);

            /**
             * Remove the parenthesis around a parameter
             * @param {Fixer} fixer Fixer
             * @returns {string} fixed parameter
             */
            function fixParamsWithParenthesis(fixer) {
                const paramToken = sourceCode.getTokenAfter(firstTokenOfParam);

                /*
                 * ES8 allows Trailing commas in function parameter lists and calls
                 * https://github.com/eslint/eslint/issues/8834
                 */
                const closingParenToken = sourceCode.getTokenAfter(paramToken, astUtils.isClosingParenToken);
                const asyncToken = isAsync ? sourceCode.getTokenBefore(firstTokenOfParam) : null;
                const shouldAddSpaceForAsync = asyncToken && (asyncToken.range[1] === firstTokenOfParam.range[0]);

                return fixer.replaceTextRange([
                    firstTokenOfParam.range[0],
                    closingParenToken.range[1]
                ], `${shouldAddSpaceForAsync ? " " : ""}${paramToken.value}`);
            }

            // "as-needed", { "requireForBlockBody": true }: x => x
            if (
                requireForBlockBody &&
                node.params.length === 1 &&
                node.params[0].type === "Identifier" &&
                !node.params[0].typeAnnotation &&
                node.body.type !== "BlockStatement" &&
                !node.returnType
            ) {
                if (astUtils.isOpeningParenToken(firstTokenOfParam)) {
                    context.report({
                        node,
                        messageId: "unexpectedParensInline",
                        fix: fixParamsWithParenthesis
                    });
                }
                return;
            }

            if (
                requireForBlockBody &&
                node.body.type === "BlockStatement"
            ) {
                if (!astUtils.isOpeningParenToken(firstTokenOfParam)) {
                    context.report({
                        node,
                        messageId: "expectedParensBlock",
                        fix(fixer) {
                            return fixer.replaceText(firstTokenOfParam, `(${firstTokenOfParam.value})`);
                        }
                    });
                }
                return;
            }

            // "as-needed": x => x
            if (asNeeded &&
                node.params.length === 1 &&
                node.params[0].type === "Identifier" &&
                !node.params[0].typeAnnotation &&
                !node.returnType
            ) {
                if (astUtils.isOpeningParenToken(firstTokenOfParam)) {
                    context.report({
                        node,
                        messageId: "unexpectedParens",
                        fix: fixParamsWithParenthesis
                    });
                }
                return;
            }

            if (firstTokenOfParam.type === "Identifier") {
                const after = sourceCode.getTokenAfter(firstTokenOfParam);

                // (x) => x
                if (after.value !== ")") {
                    context.report({
                        node,
                        messageId: "expectedParens",
                        fix(fixer) {
                            return fixer.replaceText(firstTokenOfParam, `(${firstTokenOfParam.value})`);
                        }
                    });
                }
            }
        }

        return {
            ArrowFunctionExpression: parens
        };
    }
};
