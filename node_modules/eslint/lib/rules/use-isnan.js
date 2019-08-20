/**
 * @fileoverview Rule to flag comparisons to the value NaN
 * @author James Allardice
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "require calls to `isNaN()` when checking for `NaN`",
            category: "Possible Errors",
            recommended: true,
            url: "https://eslint.org/docs/rules/use-isnan"
        },

        schema: [],
        messages: {
            useIsNaN: "Use the isNaN function to compare with NaN."
        }
    },

    create(context) {

        return {
            BinaryExpression(node) {
                if (/^(?:[<>]|[!=]=)=?$/u.test(node.operator) && (node.left.name === "NaN" || node.right.name === "NaN")) {
                    context.report({ node, messageId: "useIsNaN" });
                }
            }
        };

    }
};
