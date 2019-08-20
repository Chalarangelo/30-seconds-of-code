/**
 * @fileoverview enforce a maximum file length
 * @author Alberto Rodríguez
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const lodash = require("lodash");
const astUtils = require("../util/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "enforce a maximum number of lines per file",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://eslint.org/docs/rules/max-lines"
        },

        schema: [
            {
                oneOf: [
                    {
                        type: "integer",
                        minimum: 0
                    },
                    {
                        type: "object",
                        properties: {
                            max: {
                                type: "integer",
                                minimum: 0
                            },
                            skipComments: {
                                type: "boolean"
                            },
                            skipBlankLines: {
                                type: "boolean"
                            }
                        },
                        additionalProperties: false
                    }
                ]
            }
        ],
        messages: {
            exceed: "File must be at most {{max}} lines long. It's {{actual}} lines long."
        }
    },

    create(context) {
        const option = context.options[0];
        let max = 300;

        if (typeof option === "object" && Object.prototype.hasOwnProperty.call(option, "max")) {
            max = option.max;
        } else if (typeof option === "number") {
            max = option;
        }

        const skipComments = option && option.skipComments;
        const skipBlankLines = option && option.skipBlankLines;

        const sourceCode = context.getSourceCode();

        /**
         * Returns whether or not a token is a comment node type
         * @param {Token} token The token to check
         * @returns {boolean} True if the token is a comment node
         */
        function isCommentNodeType(token) {
            return token && (token.type === "Block" || token.type === "Line");
        }

        /**
         * Returns the line numbers of a comment that don't have any code on the same line
         * @param {Node} comment The comment node to check
         * @returns {number[]} The line numbers
         */
        function getLinesWithoutCode(comment) {
            let start = comment.loc.start.line;
            let end = comment.loc.end.line;

            let token;

            token = comment;
            do {
                token = sourceCode.getTokenBefore(token, { includeComments: true });
            } while (isCommentNodeType(token));

            if (token && astUtils.isTokenOnSameLine(token, comment)) {
                start += 1;
            }

            token = comment;
            do {
                token = sourceCode.getTokenAfter(token, { includeComments: true });
            } while (isCommentNodeType(token));

            if (token && astUtils.isTokenOnSameLine(comment, token)) {
                end -= 1;
            }

            if (start <= end) {
                return lodash.range(start, end + 1);
            }
            return [];
        }

        return {
            "Program:exit"() {
                let lines = sourceCode.lines.map((text, i) => ({ lineNumber: i + 1, text }));

                if (skipBlankLines) {
                    lines = lines.filter(l => l.text.trim() !== "");
                }

                if (skipComments) {
                    const comments = sourceCode.getAllComments();

                    const commentLines = lodash.flatten(comments.map(comment => getLinesWithoutCode(comment)));

                    lines = lines.filter(l => !lodash.includes(commentLines, l.lineNumber));
                }

                if (lines.length > max) {
                    context.report({
                        loc: { line: 1, column: 0 },
                        messageId: "exceed",
                        data: {
                            max,
                            actual: lines.length
                        }
                    });
                }
            }
        };
    }
};
