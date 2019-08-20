/**
 * @fileoverview Rule to require braces in arrow function body.
 * @author Alberto Rodríguez
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
        type: "suggestion",

        docs: {
            description: "require braces around arrow function bodies",
            category: "ECMAScript 6",
            recommended: false,
            url: "https://eslint.org/docs/rules/arrow-body-style"
        },

        schema: {
            anyOf: [
                {
                    type: "array",
                    items: [
                        {
                            enum: ["always", "never"]
                        }
                    ],
                    minItems: 0,
                    maxItems: 1
                },
                {
                    type: "array",
                    items: [
                        {
                            enum: ["as-needed"]
                        },
                        {
                            type: "object",
                            properties: {
                                requireReturnForObjectLiteral: { type: "boolean" }
                            },
                            additionalProperties: false
                        }
                    ],
                    minItems: 0,
                    maxItems: 2
                }
            ]
        },

        fixable: "code",

        messages: {
            unexpectedOtherBlock: "Unexpected block statement surrounding arrow body.",
            unexpectedEmptyBlock: "Unexpected block statement surrounding arrow body; put a value of `undefined` immediately after the `=>`.",
            unexpectedObjectBlock: "Unexpected block statement surrounding arrow body; parenthesize the returned value and move it immediately after the `=>`.",
            unexpectedSingleBlock: "Unexpected block statement surrounding arrow body; move the returned value immediately after the `=>`.",
            expectedBlock: "Expected block statement surrounding arrow body."
        }
    },

    create(context) {
        const options = context.options;
        const always = options[0] === "always";
        const asNeeded = !options[0] || options[0] === "as-needed";
        const never = options[0] === "never";
        const requireReturnForObjectLiteral = options[1] && options[1].requireReturnForObjectLiteral;
        const sourceCode = context.getSourceCode();

        /**
         * Checks whether the given node has ASI problem or not.
         * @param {Token} token The token to check.
         * @returns {boolean} `true` if it changes semantics if `;` or `}` followed by the token are removed.
         */
        function hasASIProblem(token) {
            return token && token.type === "Punctuator" && /^[([/`+-]/u.test(token.value);
        }

        /**
         * Gets the closing parenthesis which is the pair of the given opening parenthesis.
         * @param {Token} token The opening parenthesis token to get.
         * @returns {Token} The found closing parenthesis token.
         */
        function findClosingParen(token) {
            let node = sourceCode.getNodeByRangeIndex(token.range[1]);

            while (!astUtils.isParenthesised(sourceCode, node)) {
                node = node.parent;
            }
            return sourceCode.getTokenAfter(node);
        }

        /**
         * Determines whether a arrow function body needs braces
         * @param {ASTNode} node The arrow function node.
         * @returns {void}
         */
        function validate(node) {
            const arrowBody = node.body;

            if (arrowBody.type === "BlockStatement") {
                const blockBody = arrowBody.body;

                if (blockBody.length !== 1 && !never) {
                    return;
                }

                if (asNeeded && requireReturnForObjectLiteral && blockBody[0].type === "ReturnStatement" &&
                    blockBody[0].argument && blockBody[0].argument.type === "ObjectExpression") {
                    return;
                }

                if (never || asNeeded && blockBody[0].type === "ReturnStatement") {
                    let messageId;

                    if (blockBody.length === 0) {
                        messageId = "unexpectedEmptyBlock";
                    } else if (blockBody.length > 1) {
                        messageId = "unexpectedOtherBlock";
                    } else if (blockBody[0].argument === null) {
                        messageId = "unexpectedSingleBlock";
                    } else if (astUtils.isOpeningBraceToken(sourceCode.getFirstToken(blockBody[0], { skip: 1 }))) {
                        messageId = "unexpectedObjectBlock";
                    } else {
                        messageId = "unexpectedSingleBlock";
                    }

                    context.report({
                        node,
                        loc: arrowBody.loc.start,
                        messageId,
                        fix(fixer) {
                            const fixes = [];

                            if (blockBody.length !== 1 ||
                                blockBody[0].type !== "ReturnStatement" ||
                                !blockBody[0].argument ||
                                hasASIProblem(sourceCode.getTokenAfter(arrowBody))
                            ) {
                                return fixes;
                            }

                            const openingBrace = sourceCode.getFirstToken(arrowBody);
                            const closingBrace = sourceCode.getLastToken(arrowBody);
                            const firstValueToken = sourceCode.getFirstToken(blockBody[0], 1);
                            const lastValueToken = sourceCode.getLastToken(blockBody[0]);
                            const commentsExist =
                                sourceCode.commentsExistBetween(openingBrace, firstValueToken) ||
                                sourceCode.commentsExistBetween(lastValueToken, closingBrace);

                            /*
                             * Remove tokens around the return value.
                             * If comments don't exist, remove extra spaces as well.
                             */
                            if (commentsExist) {
                                fixes.push(
                                    fixer.remove(openingBrace),
                                    fixer.remove(closingBrace),
                                    fixer.remove(sourceCode.getTokenAfter(openingBrace)) // return keyword
                                );
                            } else {
                                fixes.push(
                                    fixer.removeRange([openingBrace.range[0], firstValueToken.range[0]]),
                                    fixer.removeRange([lastValueToken.range[1], closingBrace.range[1]])
                                );
                            }

                            /*
                             * If the first token of the reutrn value is `{`,
                             * enclose the return value by parentheses to avoid syntax error.
                             */
                            if (astUtils.isOpeningBraceToken(firstValueToken)) {
                                fixes.push(
                                    fixer.insertTextBefore(firstValueToken, "("),
                                    fixer.insertTextAfter(lastValueToken, ")")
                                );
                            }

                            /*
                             * If the last token of the return statement is semicolon, remove it.
                             * Non-block arrow body is an expression, not a statement.
                             */
                            if (astUtils.isSemicolonToken(lastValueToken)) {
                                fixes.push(fixer.remove(lastValueToken));
                            }

                            return fixes;
                        }
                    });
                }
            } else {
                if (always || (asNeeded && requireReturnForObjectLiteral && arrowBody.type === "ObjectExpression")) {
                    context.report({
                        node,
                        loc: arrowBody.loc.start,
                        messageId: "expectedBlock",
                        fix(fixer) {
                            const fixes = [];
                            const arrowToken = sourceCode.getTokenBefore(arrowBody, astUtils.isArrowToken);
                            const firstBodyToken = sourceCode.getTokenAfter(arrowToken);
                            const lastBodyToken = sourceCode.getLastToken(node);
                            const isParenthesisedObjectLiteral =
                                astUtils.isOpeningParenToken(firstBodyToken) &&
                                astUtils.isOpeningBraceToken(sourceCode.getTokenAfter(firstBodyToken));

                            // Wrap the value by a block and a return statement.
                            fixes.push(
                                fixer.insertTextBefore(firstBodyToken, "{return "),
                                fixer.insertTextAfter(lastBodyToken, "}")
                            );

                            // If the value is object literal, remove parentheses which were forced by syntax.
                            if (isParenthesisedObjectLiteral) {
                                fixes.push(
                                    fixer.remove(firstBodyToken),
                                    fixer.remove(findClosingParen(firstBodyToken))
                                );
                            }

                            return fixes;
                        }
                    });
                }
            }
        }

        return {
            "ArrowFunctionExpression:exit": validate
        };
    }
};
