/**
 * @fileoverview Restrict usage of duplicate imports.
 * @author Simen Bekkhus
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * Returns the name of the module imported or re-exported.
 *
 * @param {ASTNode} node - A node to get.
 * @returns {string} the name of the module, or empty string if no name.
 */
function getValue(node) {
    if (node && node.source && node.source.value) {
        return node.source.value.trim();
    }

    return "";
}

/**
 * Checks if the name of the import or export exists in the given array, and reports if so.
 *
 * @param {RuleContext} context - The ESLint rule context object.
 * @param {ASTNode} node - A node to get.
 * @param {string} value - The name of the imported or exported module.
 * @param {string[]} array - The array containing other imports or exports in the file.
 * @param {string} messageId - A messageId to be reported after the name of the module
 *
 * @returns {void} No return value
 */
function checkAndReport(context, node, value, array, messageId) {
    if (array.indexOf(value) !== -1) {
        context.report({
            node,
            messageId,
            data: {
                module: value
            }
        });
    }
}

/**
 * @callback nodeCallback
 * @param {ASTNode} node - A node to handle.
 */

/**
 * Returns a function handling the imports of a given file
 *
 * @param {RuleContext} context - The ESLint rule context object.
 * @param {boolean} includeExports - Whether or not to check for exports in addition to imports.
 * @param {string[]} importsInFile - The array containing other imports in the file.
 * @param {string[]} exportsInFile - The array containing other exports in the file.
 *
 * @returns {nodeCallback} A function passed to ESLint to handle the statement.
 */
function handleImports(context, includeExports, importsInFile, exportsInFile) {
    return function(node) {
        const value = getValue(node);

        if (value) {
            checkAndReport(context, node, value, importsInFile, "import");

            if (includeExports) {
                checkAndReport(context, node, value, exportsInFile, "importAs");
            }

            importsInFile.push(value);
        }
    };
}

/**
 * Returns a function handling the exports of a given file
 *
 * @param {RuleContext} context - The ESLint rule context object.
 * @param {string[]} importsInFile - The array containing other imports in the file.
 * @param {string[]} exportsInFile - The array containing other exports in the file.
 *
 * @returns {nodeCallback} A function passed to ESLint to handle the statement.
 */
function handleExports(context, importsInFile, exportsInFile) {
    return function(node) {
        const value = getValue(node);

        if (value) {
            checkAndReport(context, node, value, exportsInFile, "export");
            checkAndReport(context, node, value, importsInFile, "exportAs");

            exportsInFile.push(value);
        }
    };
}

module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "disallow duplicate module imports",
            category: "ECMAScript 6",
            recommended: false,
            url: "https://eslint.org/docs/rules/no-duplicate-imports"
        },

        schema: [{
            type: "object",
            properties: {
                includeExports: {
                    type: "boolean",
                    default: false
                }
            },
            additionalProperties: false
        }],
        messages: {
            import: "'{{module}}' import is duplicated.",
            importAs: "'{{module}}' import is duplicated as export.",
            export: "'{{module}}' export is duplicated.",
            exportAs: "'{{module}}' export is duplicated as import."
        }
    },

    create(context) {
        const includeExports = (context.options[0] || {}).includeExports,
            importsInFile = [],
            exportsInFile = [];

        const handlers = {
            ImportDeclaration: handleImports(context, includeExports, importsInFile, exportsInFile)
        };

        if (includeExports) {
            handlers.ExportNamedDeclaration = handleExports(context, importsInFile, exportsInFile);
            handlers.ExportAllDeclaration = handleExports(context, importsInFile, exportsInFile);
        }

        return handlers;
    }
};
