/**
 * @fileoverview Rule to flag when using constructor without parentheses
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

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "layout",

        docs: {
            description: "require parentheses when invoking a constructor with no arguments",
            category: "Stylistic Issues",
            recommended: false,
            url: "https://eslint.org/docs/rules/new-parens"
        },

        fixable: "code",
        schema: [],
        messages: {
            missing: "Missing '()' invoking a constructor."
        }
    },

    create(context) {
        const sourceCode = context.getSourceCode();

        return {
            NewExpression(node) {
                if (node.arguments.length !== 0) {
                    return; // shortcut: if there are arguments, there have to be parens
                }

                const lastToken = sourceCode.getLastToken(node);
                const hasLastParen = lastToken && astUtils.isClosingParenToken(lastToken);
                const hasParens = hasLastParen && astUtils.isOpeningParenToken(sourceCode.getTokenBefore(lastToken));

                if (!hasParens) {
                    context.report({
                        node,
                        messageId: "missing",
                        fix: fixer => fixer.insertTextAfter(node, "()")
                    });
                }
            }
        };
    }
};
