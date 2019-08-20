/**
 * @fileoverview Rule to disallow a duplicate case label.
 * @author Dieter Oberkofler
 * @author Burak Yigit Kaya
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "disallow duplicate case labels",
            category: "Possible Errors",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-duplicate-case"
        },

        schema: [],

        messages: {
            unexpected: "Duplicate case label."
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        return {
            SwitchStatement(node) {
                const mapping = {};

                node.cases.forEach(switchCase => {
                    const key = sourceCode.getText(switchCase.test);

                    if (mapping[key]) {
                        context.report({ node: switchCase, messageId: "unexpected" });
                    } else {
                        mapping[key] = switchCase;
                    }
                });
            }
        };
    }
};
