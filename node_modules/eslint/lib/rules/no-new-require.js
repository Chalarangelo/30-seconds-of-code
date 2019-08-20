/**
 * @fileoverview Rule to disallow use of new operator with the `require` function
 * @author Wil Moore III
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow `new` operators with calls to `require`",
            category: "Node.js and CommonJS",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-new-require"
        },

        schema: []
    },

    create(context) {

        return {

            NewExpression(node) {
                if (node.callee.type === "Identifier" && node.callee.name === "require") {
                    context.report({ node, message: "Unexpected use of new with require." });
                }
            }
        };

    }
};
