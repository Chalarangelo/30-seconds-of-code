/**
 * @fileoverview Rule to disallow use of void operator.
 * @author Mike Sidorov
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow `void` operators",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-void"
        },

        schema: []
    },

    create(context) {

        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {
            UnaryExpression(node) {
                if (node.operator === "void") {
                    context.report({ node, message: "Expected 'undefined' and instead saw 'void'." });
                }
            }
        };

    }
};
