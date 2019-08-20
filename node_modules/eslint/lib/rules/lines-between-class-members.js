/**
 * @fileoverview Rule to check empty newline between class members
 * @author 薛定谔的猫<hh_2013@foxmail.com>
 */
"use strict";

const astUtils = require("../util/ast-utils");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "layout",

        docs: {
            description: "require or disallow an empty line between class members",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://eslint.org/docs/rules/lines-between-class-members"
        },

        fixable: "whitespace",

        schema: [
            {
                enum: ["always", "never"]
            },
            {
                type: "object",
                properties: {
                    exceptAfterSingleLine: {
                        type: "boolean",
                        default: false
                    }
                },
                additionalProperties: false
            }
        ],
        messages: {
            never: "Unexpected blank line between class members.",
            always: "Expected blank line between class members."
        }
    },

    create(context) {

        const options = [];

        options[0] = context.options[0] || "always";
        options[1] = context.options[1] || { exceptAfterSingleLine: false };

        const sourceCode = context.getSourceCode();

        /**
         * Checks if there is padding between two tokens
         * @param {Token} first The first token
         * @param {Token} second The second token
         * @returns {boolean} True if there is at least a line between the tokens
         */
        function isPaddingBetweenTokens(first, second) {
            const comments = sourceCode.getCommentsBefore(second);
            const len = comments.length;

            // If there is no comments
            if (len === 0) {
                const linesBetweenFstAndSnd = second.loc.start.line - first.loc.end.line - 1;

                return linesBetweenFstAndSnd >= 1;
            }


            // If there are comments
            let sumOfCommentLines = 0; // the numbers of lines of comments
            let prevCommentLineNum = -1; // line number of the end of the previous comment

            for (let i = 0; i < len; i++) {
                const commentLinesOfThisComment = comments[i].loc.end.line - comments[i].loc.start.line + 1;

                sumOfCommentLines += commentLinesOfThisComment;

                /*
                 * If this comment and the previous comment are in the same line,
                 * the count of comment lines is duplicated. So decrement sumOfCommentLines.
                 */
                if (prevCommentLineNum === comments[i].loc.start.line) {
                    sumOfCommentLines -= 1;
                }

                prevCommentLineNum = comments[i].loc.end.line;
            }

            /*
             * If the first block and the first comment are in the same line,
             * the count of comment lines is duplicated. So decrement sumOfCommentLines.
             */
            if (first.loc.end.line === comments[0].loc.start.line) {
                sumOfCommentLines -= 1;
            }

            /*
             * If the last comment and the second block are in the same line,
             * the count of comment lines is duplicated. So decrement sumOfCommentLines.
             */
            if (comments[len - 1].loc.end.line === second.loc.start.line) {
                sumOfCommentLines -= 1;
            }

            const linesBetweenFstAndSnd = second.loc.start.line - first.loc.end.line - 1;

            return linesBetweenFstAndSnd - sumOfCommentLines >= 1;
        }

        return {
            ClassBody(node) {
                const body = node.body;

                for (let i = 0; i < body.length - 1; i++) {
                    const curFirst = sourceCode.getFirstToken(body[i]);
                    const curLast = sourceCode.getLastToken(body[i]);
                    const nextFirst = sourceCode.getFirstToken(body[i + 1]);
                    const isPadded = isPaddingBetweenTokens(curLast, nextFirst);
                    const isMulti = !astUtils.isTokenOnSameLine(curFirst, curLast);
                    const skip = !isMulti && options[1].exceptAfterSingleLine;


                    if ((options[0] === "always" && !skip && !isPadded) ||
                        (options[0] === "never" && isPadded)) {
                        context.report({
                            node: body[i + 1],
                            messageId: isPadded ? "never" : "always",
                            fix(fixer) {
                                return isPadded
                                    ? fixer.replaceTextRange([curLast.range[1], nextFirst.range[0]], "\n")
                                    : fixer.insertTextAfter(curLast, "\n");
                            }
                        });
                    }
                }
            }
        };
    }
};
