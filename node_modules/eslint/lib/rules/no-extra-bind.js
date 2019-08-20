/**
 * @fileoverview Rule to flag unnecessary bind calls
 * @author Bence Dányi <bence@danyi.me>
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const astUtils = require("../util/ast-utils");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const SIDE_EFFECT_FREE_NODE_TYPES = new Set(["Literal", "Identifier", "ThisExpression", "FunctionExpression"]);

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow unnecessary calls to `.bind()`",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-extra-bind"
        },

        schema: [],
        fixable: "code",

        messages: {
            unexpected: "The function binding is unnecessary."
        }
    },

    create(context) {
        let scopeInfo = null;

        /**
         * Checks if a node is free of side effects.
         *
         * This check is stricter than it needs to be, in order to keep the implementation simple.
         *
         * @param {ASTNode} node A node to check.
         * @returns {boolean} True if the node is known to be side-effect free, false otherwise.
         */
        function isSideEffectFree(node) {
            return SIDE_EFFECT_FREE_NODE_TYPES.has(node.type);
        }

        /**
         * Reports a given function node.
         *
         * @param {ASTNode} node - A node to report. This is a FunctionExpression or
         *      an ArrowFunctionExpression.
         * @returns {void}
         */
        function report(node) {
            context.report({
                node: node.parent.parent,
                messageId: "unexpected",
                loc: node.parent.property.loc.start,
                fix(fixer) {
                    if (node.parent.parent.arguments.length && !isSideEffectFree(node.parent.parent.arguments[0])) {
                        return null;
                    }

                    const firstTokenToRemove = context.getSourceCode()
                        .getFirstTokenBetween(node.parent.object, node.parent.property, astUtils.isNotClosingParenToken);

                    return fixer.removeRange([firstTokenToRemove.range[0], node.parent.parent.range[1]]);
                }
            });
        }

        /**
         * Checks whether or not a given function node is the callee of `.bind()`
         * method.
         *
         * e.g. `(function() {}.bind(foo))`
         *
         * @param {ASTNode} node - A node to report. This is a FunctionExpression or
         *      an ArrowFunctionExpression.
         * @returns {boolean} `true` if the node is the callee of `.bind()` method.
         */
        function isCalleeOfBindMethod(node) {
            const parent = node.parent;
            const grandparent = parent.parent;

            return (
                grandparent &&
                grandparent.type === "CallExpression" &&
                grandparent.callee === parent &&
                grandparent.arguments.length === 1 &&
                parent.type === "MemberExpression" &&
                parent.object === node &&
                astUtils.getStaticPropertyName(parent) === "bind"
            );
        }

        /**
         * Adds a scope information object to the stack.
         *
         * @param {ASTNode} node - A node to add. This node is a FunctionExpression
         *      or a FunctionDeclaration node.
         * @returns {void}
         */
        function enterFunction(node) {
            scopeInfo = {
                isBound: isCalleeOfBindMethod(node),
                thisFound: false,
                upper: scopeInfo
            };
        }

        /**
         * Removes the scope information object from the top of the stack.
         * At the same time, this reports the function node if the function has
         * `.bind()` and the `this` keywords found.
         *
         * @param {ASTNode} node - A node to remove. This node is a
         *      FunctionExpression or a FunctionDeclaration node.
         * @returns {void}
         */
        function exitFunction(node) {
            if (scopeInfo.isBound && !scopeInfo.thisFound) {
                report(node);
            }

            scopeInfo = scopeInfo.upper;
        }

        /**
         * Reports a given arrow function if the function is callee of `.bind()`
         * method.
         *
         * @param {ASTNode} node - A node to report. This node is an
         *      ArrowFunctionExpression.
         * @returns {void}
         */
        function exitArrowFunction(node) {
            if (isCalleeOfBindMethod(node)) {
                report(node);
            }
        }

        /**
         * Set the mark as the `this` keyword was found in this scope.
         *
         * @returns {void}
         */
        function markAsThisFound() {
            if (scopeInfo) {
                scopeInfo.thisFound = true;
            }
        }

        return {
            "ArrowFunctionExpression:exit": exitArrowFunction,
            FunctionDeclaration: enterFunction,
            "FunctionDeclaration:exit": exitFunction,
            FunctionExpression: enterFunction,
            "FunctionExpression:exit": exitFunction,
            ThisExpression: markAsThisFound
        };
    }
};
