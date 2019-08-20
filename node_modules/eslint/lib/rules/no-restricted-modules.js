/**
 * @fileoverview Restrict usage of specified node modules.
 * @author Christian Schulz
 */
"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const DEFAULT_MESSAGE_TEMPLATE = "'{{moduleName}}' module is restricted from being used.";
const CUSTOM_MESSAGE_TEMPLATE = "'{{moduleName}}' module is restricted from being used. {{customMessage}}";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const ignore = require("ignore");

const arrayOfStrings = {
    type: "array",
    items: { type: "string" },
    uniqueItems: true
};

const arrayOfStringsOrObjects = {
    type: "array",
    items: {
        anyOf: [
            { type: "string" },
            {
                type: "object",
                properties: {
                    name: { type: "string" },
                    message: {
                        type: "string",
                        minLength: 1
                    }
                },
                additionalProperties: false,
                required: ["name"]
            }
        ]
    },
    uniqueItems: true
};

module.exports = {
    meta: {
        type: "suggestion",

        docs: {
            description: "disallow specified modules when loaded by `require`",
            category: "Node.js and CommonJS",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-restricted-modules"
        },

        schema: {
            anyOf: [
                arrayOfStringsOrObjects,
                {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            paths: arrayOfStringsOrObjects,
                            patterns: arrayOfStrings
                        },
                        additionalProperties: false
                    },
                    additionalItems: false
                }
            ]
        }
    },

    create(context) {
        const options = Array.isArray(context.options) ? context.options : [];
        const isPathAndPatternsObject =
            typeof options[0] === "object" &&
            (Object.prototype.hasOwnProperty.call(options[0], "paths") || Object.prototype.hasOwnProperty.call(options[0], "patterns"));

        const restrictedPaths = (isPathAndPatternsObject ? options[0].paths : context.options) || [];
        const restrictedPatterns = (isPathAndPatternsObject ? options[0].patterns : []) || [];

        const restrictedPathMessages = restrictedPaths.reduce((memo, importName) => {
            if (typeof importName === "string") {
                memo[importName] = null;
            } else {
                memo[importName.name] = importName.message;
            }
            return memo;
        }, {});

        // if no imports are restricted we don"t need to check
        if (Object.keys(restrictedPaths).length === 0 && restrictedPatterns.length === 0) {
            return {};
        }

        const ig = ignore().add(restrictedPatterns);


        /**
         * Function to check if a node is a string literal.
         * @param {ASTNode} node The node to check.
         * @returns {boolean} If the node is a string literal.
         */
        function isString(node) {
            return node && node.type === "Literal" && typeof node.value === "string";
        }

        /**
         * Function to check if a node is a require call.
         * @param {ASTNode} node The node to check.
         * @returns {boolean} If the node is a require call.
         */
        function isRequireCall(node) {
            return node.callee.type === "Identifier" && node.callee.name === "require";
        }

        /**
         * Report a restricted path.
         * @param {node} node representing the restricted path reference
         * @returns {void}
         * @private
         */
        function reportPath(node) {
            const moduleName = node.arguments[0].value.trim();
            const customMessage = restrictedPathMessages[moduleName];
            const message = customMessage
                ? CUSTOM_MESSAGE_TEMPLATE
                : DEFAULT_MESSAGE_TEMPLATE;

            context.report({
                node,
                message,
                data: {
                    moduleName,
                    customMessage
                }
            });
        }

        /**
         * Check if the given name is a restricted path name
         * @param {string} name name of a variable
         * @returns {boolean} whether the variable is a restricted path or not
         * @private
         */
        function isRestrictedPath(name) {
            return Object.prototype.hasOwnProperty.call(restrictedPathMessages, name);
        }

        return {
            CallExpression(node) {
                if (isRequireCall(node)) {

                    // node has arguments and first argument is string
                    if (node.arguments.length && isString(node.arguments[0])) {
                        const moduleName = node.arguments[0].value.trim();

                        // check if argument value is in restricted modules array
                        if (isRestrictedPath(moduleName)) {
                            reportPath(node);
                        }

                        if (restrictedPatterns.length > 0 && ig.ignores(moduleName)) {
                            context.report({
                                node,
                                message: "'{{moduleName}}' module is restricted from being used by a pattern.",
                                data: { moduleName }
                            });
                        }
                    }
                }
            }
        };
    }
};
