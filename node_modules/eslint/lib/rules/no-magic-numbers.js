/**
 * @fileoverview Rule to flag statements that use magic numbers (adapted from https://github.com/danielstjules/buddy.js)
 * @author Vincent Lemeunier
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow magic numbers",
            category: "Best Practices",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-magic-numbers"
        },

        schema: [{
            type: "object",
            properties: {
                detectObjects: {
                    type: "boolean",
                    default: false
                },
                enforceConst: {
                    type: "boolean",
                    default: false
                },
                ignore: {
                    type: "array",
                    items: {
                        type: "number"
                    },
                    uniqueItems: true
                },
                ignoreArrayIndexes: {
                    type: "boolean",
                    default: false
                }
            },
            additionalProperties: false
        }],

        messages: {
            useConst: "Number constants declarations must use 'const'.",
            noMagic: "No magic number: {{raw}}."
        }
    },

    create(context) {
        const config = context.options[0] || {},
            detectObjects = !!config.detectObjects,
            enforceConst = !!config.enforceConst,
            ignore = config.ignore || [],
            ignoreArrayIndexes = !!config.ignoreArrayIndexes;

        /**
         * Returns whether the node is number literal
         * @param {Node} node - the node literal being evaluated
         * @returns {boolean} true if the node is a number literal
         */
        function isNumber(node) {
            return typeof node.value === "number";
        }

        /**
         * Returns whether the number should be ignored
         * @param {number} num - the number
         * @returns {boolean} true if the number should be ignored
         */
        function shouldIgnoreNumber(num) {
            return ignore.indexOf(num) !== -1;
        }

        /**
         * Returns whether the number should be ignored when used as a radix within parseInt() or Number.parseInt()
         * @param {ASTNode} parent - the non-"UnaryExpression" parent
         * @param {ASTNode} node - the node literal being evaluated
         * @returns {boolean} true if the number should be ignored
         */
        function shouldIgnoreParseInt(parent, node) {
            return parent.type === "CallExpression" && node === parent.arguments[1] &&
                (parent.callee.name === "parseInt" ||
                parent.callee.type === "MemberExpression" &&
                parent.callee.object.name === "Number" &&
                parent.callee.property.name === "parseInt");
        }

        /**
         * Returns whether the number should be ignored when used to define a JSX prop
         * @param {ASTNode} parent - the non-"UnaryExpression" parent
         * @returns {boolean} true if the number should be ignored
         */
        function shouldIgnoreJSXNumbers(parent) {
            return parent.type.indexOf("JSX") === 0;
        }

        /**
         * Returns whether the number should be ignored when used as an array index with enabled 'ignoreArrayIndexes' option.
         * @param {ASTNode} parent - the non-"UnaryExpression" parent.
         * @returns {boolean} true if the number should be ignored
         */
        function shouldIgnoreArrayIndexes(parent) {
            return parent.type === "MemberExpression" && ignoreArrayIndexes;
        }

        return {
            Literal(node) {
                const okTypes = detectObjects ? [] : ["ObjectExpression", "Property", "AssignmentExpression"];

                if (!isNumber(node)) {
                    return;
                }

                let fullNumberNode;
                let parent;
                let value;
                let raw;

                // For negative magic numbers: update the value and parent node
                if (node.parent.type === "UnaryExpression" && node.parent.operator === "-") {
                    fullNumberNode = node.parent;
                    parent = fullNumberNode.parent;
                    value = -node.value;
                    raw = `-${node.raw}`;
                } else {
                    fullNumberNode = node;
                    parent = node.parent;
                    value = node.value;
                    raw = node.raw;
                }

                if (shouldIgnoreNumber(value) ||
                    shouldIgnoreParseInt(parent, fullNumberNode) ||
                    shouldIgnoreArrayIndexes(parent) ||
                    shouldIgnoreJSXNumbers(parent)) {
                    return;
                }

                if (parent.type === "VariableDeclarator") {
                    if (enforceConst && parent.parent.kind !== "const") {
                        context.report({
                            node: fullNumberNode,
                            messageId: "useConst"
                        });
                    }
                } else if (
                    okTypes.indexOf(parent.type) === -1 ||
                    (parent.type === "AssignmentExpression" && parent.left.type === "Identifier")
                ) {
                    context.report({
                        node: fullNumberNode,
                        messageId: "noMagic",
                        data: {
                            raw
                        }
                    });
                }
            }
        };
    }
};
