/**
 * @fileoverview Disallow sparse arrays
 * @author Nicholas C. Zakas
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "disallow sparse arrays",
            category: "Possible Errors",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-sparse-arrays"
        },

        schema: []
    },

    create(context) {


        //--------------------------------------------------------------------------
        // Public
        //--------------------------------------------------------------------------

        return {

            ArrayExpression(node) {

                const emptySpot = node.elements.indexOf(null) > -1;

                if (emptySpot) {
                    context.report({ node, message: "Unexpected comma in middle of array." });
                }
            }

        };

    }
};
