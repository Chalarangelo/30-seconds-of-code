/**
 * @fileoverview Rule to flag octal escape sequences in string literals.
 * @author Ian Christian Myers
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow octal escape sequences in string literals",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-octal-escape"
        },

        schema: []
    },

    create(context) {

        return {

            Literal(node) {
                if (typeof node.value !== "string") {
                    return;
                }

                const match = node.raw.match(/^([^\\]|\\[^0-7])*\\([0-3][0-7]{1,2}|[4-7][0-7]|[0-7])/u);

                if (match) {
                    const octalDigit = match[2];

                    // \0 is actually not considered an octal
                    if (match[2] !== "0" || typeof match[3] !== "undefined") {
                        context.report({ node, message: "Don't use octal: '\\{{octalDigit}}'. Use '\\u....' instead.", data: { octalDigit } });
                    }
                }
            }

        };

    }
};
