/**
 * @fileoverview Rule to flag when using javascript: urls
 * @author Ilya Volodin
 */
/* jshint scripturl: true */
/* eslint no-script-url: 0 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow `javascript:` urls",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-script-url"
        },

        schema: []
    },

    create(context) {

        return {

            Literal(node) {
                if (node.value && typeof node.value === "string") {
                    const value = node.value.toLowerCase();

                    if (value.indexOf("javascript:") === 0) {
                        context.report({ node, message: "Script URL is a form of eval." });
                    }
                }
            }
        };

    }
};
