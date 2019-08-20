/**
 * @fileoverview Restrict usage of specified node imports.
 * @author Guy Ellis
 */
"use strict";

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const DEFAULT_MESSAGE_TEMPLATE = "'{{importSource}}' import is restricted from being used.";
const CUSTOM_MESSAGE_TEMPLATE = "'{{importSource}}' import is restricted from being used. {{customMessage}}";

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
                    },
                    importNames: {
                        type: "array",
                        items: {
                            type: "string"
                        }
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
            description: "disallow specified modules when loaded by `import`",
            category: "ECMAScript 6",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-restricted-imports"
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

        const restrictedPathMessages = restrictedPaths.reduce((memo, importSource) => {
            if (typeof importSource === "string") {
                memo[importSource] = { message: null };
            } else {
                memo[importSource.name] = {
                    message: importSource.message,
                    importNames: importSource.importNames
                };
            }
            return memo;
        }, {});

        // if no imports are restricted we don"t need to check
        if (Object.keys(restrictedPaths).length === 0 && restrictedPatterns.length === 0) {
            return {};
        }

        const restrictedPatternsMatcher = ignore().add(restrictedPatterns);

        /**
         * Checks to see if "*" is being used to import everything.
         * @param {Set.<string>} importNames - Set of import names that are being imported
         * @returns {boolean} whether everything is imported or not
         */
        function isEverythingImported(importNames) {
            return importNames.has("*");
        }

        /**
         * Report a restricted path.
         * @param {node} node representing the restricted path reference
         * @returns {void}
         * @private
         */
        function reportPath(node) {
            const importSource = node.source.value.trim();
            const customMessage = restrictedPathMessages[importSource] && restrictedPathMessages[importSource].message;
            const message = customMessage
                ? CUSTOM_MESSAGE_TEMPLATE
                : DEFAULT_MESSAGE_TEMPLATE;

            context.report({
                node,
                message,
                data: {
                    importSource,
                    customMessage
                }
            });
        }

        /**
         * Report a restricted path specifically for patterns.
         * @param {node} node - representing the restricted path reference
         * @returns {void}
         * @private
         */
        function reportPathForPatterns(node) {
            const importSource = node.source.value.trim();

            context.report({
                node,
                message: "'{{importSource}}' import is restricted from being used by a pattern.",
                data: {
                    importSource
                }
            });
        }

        /**
         * Report a restricted path specifically when using the '*' import.
         * @param {string} importSource - path of the import
         * @param {node} node - representing the restricted path reference
         * @returns {void}
         * @private
         */
        function reportPathForEverythingImported(importSource, node) {
            const importNames = restrictedPathMessages[importSource].importNames;

            context.report({
                node,
                message: "* import is invalid because '{{importNames}}' from '{{importSource}}' is restricted.",
                data: {
                    importSource,
                    importNames
                }
            });
        }

        /**
         * Check if the given importSource is restricted because '*' is being imported.
         * @param {string} importSource - path of the import
         * @param {Set.<string>} importNames - Set of import names that are being imported
         * @returns {boolean} whether the path is restricted
         * @private
         */
        function isRestrictedForEverythingImported(importSource, importNames) {
            return Object.prototype.hasOwnProperty.call(restrictedPathMessages, importSource) &&
                restrictedPathMessages[importSource].importNames &&
                isEverythingImported(importNames);
        }

        /**
         * Check if the given importNames are restricted given a list of restrictedImportNames.
         * @param {Set.<string>} importNames - Set of import names that are being imported
         * @param {string[]} restrictedImportNames - array of import names that are restricted for this import
         * @returns {boolean} whether the objectName is restricted
         * @private
         */
        function isRestrictedObject(importNames, restrictedImportNames) {
            return restrictedImportNames.some(restrictedObjectName => (
                importNames.has(restrictedObjectName)
            ));
        }

        /**
         * Check if the given importSource is a restricted path.
         * @param {string} importSource - path of the import
         * @param {Set.<string>} importNames - Set of import names that are being imported
         * @returns {boolean} whether the variable is a restricted path or not
         * @private
         */
        function isRestrictedPath(importSource, importNames) {
            let isRestricted = false;

            if (Object.prototype.hasOwnProperty.call(restrictedPathMessages, importSource)) {
                if (restrictedPathMessages[importSource].importNames) {
                    isRestricted = isRestrictedObject(importNames, restrictedPathMessages[importSource].importNames);
                } else {
                    isRestricted = true;
                }
            }

            return isRestricted;
        }

        /**
         * Check if the given importSource is restricted by a pattern.
         * @param {string} importSource - path of the import
         * @returns {boolean} whether the variable is a restricted pattern or not
         * @private
         */
        function isRestrictedPattern(importSource) {
            return restrictedPatterns.length > 0 && restrictedPatternsMatcher.ignores(importSource);
        }

        /**
         * Checks a node to see if any problems should be reported.
         * @param {ASTNode} node The node to check.
         * @returns {void}
         * @private
         */
        function checkNode(node) {
            const importSource = node.source.value.trim();
            const importNames = node.specifiers ? node.specifiers.reduce((set, specifier) => {
                if (specifier.type === "ImportDefaultSpecifier") {
                    set.add("default");
                } else if (specifier.type === "ImportNamespaceSpecifier") {
                    set.add("*");
                } else if (specifier.imported) {
                    set.add(specifier.imported.name);
                } else if (specifier.local) {
                    set.add(specifier.local.name);
                }
                return set;
            }, new Set()) : new Set();

            if (isRestrictedForEverythingImported(importSource, importNames)) {
                reportPathForEverythingImported(importSource, node);
            }

            if (isRestrictedPath(importSource, importNames)) {
                reportPath(node);
            }
            if (isRestrictedPattern(importSource)) {
                reportPathForPatterns(node);
            }
        }

        return {
            ImportDeclaration: checkNode,
            ExportNamedDeclaration(node) {
                if (node.source) {
                    checkNode(node);
                }
            },
            ExportAllDeclaration: checkNode
        };
    }
};
