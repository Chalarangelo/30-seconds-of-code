/**
 * @fileoverview Rule to disallow `parseInt()` in favor of binary, octal, and hexadecimal literals
 * @author Annie Zhang, Henry Zhu
 */

"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Checks to see if a CallExpression's callee node is `parseInt` or
 * `Number.parseInt`.
 * @param {ASTNode} calleeNode The callee node to evaluate.
 * @returns {boolean} True if the callee is `parseInt` or `Number.parseInt`,
 * false otherwise.
 */
function isParseInt(calleeNode) {
    switch (calleeNode.type) {
        case "Identifier":
            return calleeNode.name === "parseInt";
        case "MemberExpression":
            return calleeNode.object.type === "Identifier" &&
                calleeNode.object.name === "Number" &&
                calleeNode.property.type === "Identifier" &&
                calleeNode.property.name === "parseInt";

        // no default
    }

    return false;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow `parseInt()` and `Number.parseInt()` in favor of binary, octal, and hexadecimal literals",
            category: "ECMAScript 6",
            recommended: false,
            url: "https://eslint.org/docs/rules/prefer-numeric-literals"
        },

        schema: [],
        fixable: "code"
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        const radixMap = {
            2: "binary",
            8: "octal",
            16: "hexadecimal"
        };

        const prefixMap = {
            2: "0b",
            8: "0o",
            16: "0x"
        };

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {

            CallExpression(node) {

                // doesn't check parseInt() if it doesn't have a radix argument
                if (node.arguments.length !== 2) {
                    return;
                }

                // only error if the radix is 2, 8, or 16
                const radixName = radixMap[node.arguments[1].value];

                if (isParseInt(node.callee) &&
                    radixName &&
                    node.arguments[0].type === "Literal"
                ) {
                    context.report({
                        node,
                        message: "Use {{radixName}} literals instead of {{functionName}}().",
                        data: {
                            radixName,
                            functionName: sourceCode.getText(node.callee)
                        },
                        fix(fixer) {
                            const newPrefix = prefixMap[node.arguments[1].value];

                            if (+(newPrefix + node.arguments[0].value) !== parseInt(node.arguments[0].value, node.arguments[1].value)) {

                                /*
                                 * If the newly-produced literal would be invalid, (e.g. 0b1234),
                                 * or it would yield an incorrect parseInt result for some other reason, don't make a fix.
                                 */
                                return null;
                            }
                            return fixer.replaceText(node, prefixMap[node.arguments[1].value] + node.arguments[0].value);
                        }
                    });
                }
            }
        };
    }
};
