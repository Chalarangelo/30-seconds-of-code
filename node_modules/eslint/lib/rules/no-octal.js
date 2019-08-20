/**
 * @fileoverview Rule to flag when initializing octal literal
 * @author Ilya Volodin
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow octal literals",
            category: "Best Practices",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-octal"
        },

        schema: []
    },

    create(context) {

        return {

            Literal(node) {
                if (typeof node.value === "number" && /^0[0-7]/u.test(node.raw)) {
                    context.report({ node, message: "Octal literals should not be used." });
                }
            }
        };

    }
};
