/**
 * @fileoverview Rule to check for ambiguous div operator in regexes
 * @author Matt DuVall <http://www.mattduvall.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow division operators explicitly at the beginning of regular expressions",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-div-regex"
        },

        schema: [],

        messages: {
            unexpected: "A regular expression literal can be confused with '/='."
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        return {

            Literal(node) {
                const token = sourceCode.getFirstToken(node);

                if (token.type === "RegularExpression" && token.value[1] === "=") {
                    context.report({ node, messageId: "unexpected" });
                }
            }
        };

    }
};
