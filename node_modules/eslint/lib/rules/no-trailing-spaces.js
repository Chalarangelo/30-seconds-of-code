/**
 * @fileoverview Disallow trailing spaces at the end of lines.
 * @author Nodeca Team <https://github.com/nodeca>
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
            description: "disallow trailing whitespace at the end of lines",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-trailing-spaces"
        },

        fixable: "whitespace",

        schema: [
            {
                type: "object",
                properties: {
                    skipBlankLines: {
                        type: "boolean",
                        default: false
                    },
                    ignoreComments: {
                        type: "boolean",
                        default: false
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        const BLANK_CLASS = "[ \t\u00a0\u2000-\u200b\u3000]",
            SKIP_BLANK = `^${BLANK_CLASS}*$`,
            NONBLANK = `${BLANK_CLASS}+$`;

        const options = context.options[0] || {},
            skipBlankLines = options.skipBlankLines || false,
            ignoreComments = options.ignoreComments || false;

        /**
         * Report the error message
         * @param {ASTNode} node node to report
         * @param {int[]} location range information
         * @param {int[]} fixRange Range based on the whole program
         * @returns {void}
         */
        function report(node, location, fixRange) {

            /*
             * Passing node is a bit dirty, because message data will contain big
             * text in `source`. But... who cares :) ?
             * One more kludge will not make worse the bloody wizardry of this
             * plugin.
             */
            context.report({
                node,
                loc: location,
                message: "Trailing spaces not allowed.",
                fix(fixer) {
                    return fixer.removeRange(fixRange);
                }
            });
        }

        /**
         * Given a list of comment nodes, return the line numbers for those comments.
         * @param {Array} comments An array of comment nodes.
         * @returns {number[]} An array of line numbers containing comments.
         */
        function getCommentLineNumbers(comments) {
            const lines = new Set();

            comments.forEach(comment => {
                for (let i = comment.loc.start.line; i <= comment.loc.end.line; i++) {
                    lines.add(i);
                }
            });

            return lines;
        }

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {

            Program: function checkTrailingSpaces(node) {

                /*
                 * Let's hack. Since Espree does not return whitespace nodes,
                 * fetch the source code and do matching via regexps.
                 */

                const re = new RegExp(NONBLANK, "u"),
                    skipMatch = new RegExp(SKIP_BLANK, "u"),
                    lines = sourceCode.lines,
                    linebreaks = sourceCode.getText().match(astUtils.createGlobalLinebreakMatcher()),
                    comments = sourceCode.getAllComments(),
                    commentLineNumbers = getCommentLineNumbers(comments);

                let totalLength = 0,
                    fixRange = [];

                for (let i = 0, ii = lines.length; i < ii; i++) {
                    const matches = re.exec(lines[i]);

                    /*
                     * Always add linebreak length to line length to accommodate for line break (\n or \r\n)
                     * Because during the fix time they also reserve one spot in the array.
                     * Usually linebreak length is 2 for \r\n (CRLF) and 1 for \n (LF)
                     */
                    const linebreakLength = linebreaks && linebreaks[i] ? linebreaks[i].length : 1;
                    const lineLength = lines[i].length + linebreakLength;

                    if (matches) {
                        const location = {
                            line: i + 1,
                            column: matches.index
                        };

                        const rangeStart = totalLength + location.column;
                        const rangeEnd = totalLength + lineLength - linebreakLength;
                        const containingNode = sourceCode.getNodeByRangeIndex(rangeStart);

                        if (containingNode && containingNode.type === "TemplateElement" &&
                          rangeStart > containingNode.parent.range[0] &&
                          rangeEnd < containingNode.parent.range[1]) {
                            totalLength += lineLength;
                            continue;
                        }

                        /*
                         * If the line has only whitespace, and skipBlankLines
                         * is true, don't report it
                         */
                        if (skipBlankLines && skipMatch.test(lines[i])) {
                            totalLength += lineLength;
                            continue;
                        }

                        fixRange = [rangeStart, rangeEnd];

                        if (!ignoreComments || !commentLineNumbers.has(location.line)) {
                            report(node, location, fixRange);
                        }
                    }

                    totalLength += lineLength;
                }
            }

        };
    }
};
