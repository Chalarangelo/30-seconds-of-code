/**
 * @fileoverview Rule to flag when return statement contains assignment
 * @author Ilya Volodin
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require("../util/ast-utils");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const SENTINEL_TYPE = /^(?:[a-zA-Z]+?Statement|ArrowFunctionExpression|FunctionExpression|ClassExpression)$/u;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow assignment operators in `return` statements",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-return-assign"
        },

        schema: [
            {
                enum: ["except-parens", "always"]
            }
        ]
    },

    create(context) {
        const always = (context.options[0] || "except-parens") !== "except-parens";
        const sourceCode = context.getSourceCode();

        return {
            AssignmentExpression(node) {
                if (!always && astUtils.isParenthesised(sourceCode, node)) {
                    return;
                }

                let currentChild = node;
                let parent = currentChild.parent;

                // Find ReturnStatement or ArrowFunctionExpression in ancestors.
                while (parent && !SENTINEL_TYPE.test(parent.type)) {
                    currentChild = parent;
                    parent = parent.parent;
                }

                // Reports.
                if (parent && parent.type === "ReturnStatement") {
                    context.report({
                        node: parent,
                        message: "Return statement should not contain assignment."
                    });
                } else if (parent && parent.type === "ArrowFunctionExpression" && parent.body === currentChild) {
                    context.report({
                        node: parent,
                        message: "Arrow function should not return assignment."
                    });
                }
            }
        };
    }
};
