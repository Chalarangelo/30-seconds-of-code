/**
 * @fileoverview Rule to flag usage of __iterator__ property
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
            description: "disallow the use of the `__iterator__` property",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-iterator"
        },

        schema: []
    },

    create(context) {

        return {

            MemberExpression(node) {

                if (node.property &&
                        (node.property.type === "Identifier" && node.property.name === "__iterator__" && !node.computed) ||
                        (node.property.type === "Literal" && node.property.value === "__iterator__")) {
                    context.report({ node, message: "Reserved name '__iterator__'." });
                }
            }
        };

    }
};
