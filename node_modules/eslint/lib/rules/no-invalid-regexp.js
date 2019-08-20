/**
 * @fileoverview Validate strings passed to the RegExp constructor
 * @author Michael Ficarra
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RegExpValidator = require("regexpp").RegExpValidator;
const validator = new RegExpValidator({ ecmaVersion: 2018 });
const validFlags = /[gimuys]/gu;
const undefined1 = void 0;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "disallow invalid regular expression strings in `RegExp` constructors",
            category: "Possible Errors",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-invalid-regexp"
        },

        schema: [{
            type: "object",
            properties: {
                allowConstructorFlags: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                }
            },
            additionalProperties: false
        }]
    },

    create(context) {

        const options = context.options[0];
        let allowedFlags = null;

        if (options && options.allowConstructorFlags) {
            const temp = options.allowConstructorFlags.join("").replace(validFlags, "");

            if (temp) {
                allowedFlags = new RegExp(`[${temp}]`, "giu");
            }
        }

        /**
         * Check if node is a string
         * @param {ASTNode} node node to evaluate
         * @returns {boolean} True if its a string
         * @private
         */
        function isString(node) {
            return node && node.type === "Literal" && typeof node.value === "string";
        }

        /**
         * Check syntax error in a given pattern.
         * @param {string} pattern The RegExp pattern to validate.
         * @param {boolean} uFlag The Unicode flag.
         * @returns {string|null} The syntax error.
         */
        function validateRegExpPattern(pattern, uFlag) {
            try {
                validator.validatePattern(pattern, undefined1, undefined1, uFlag);
                return null;
            } catch (err) {
                return err.message;
            }
        }

        /**
         * Check syntax error in a given flags.
         * @param {string} flags The RegExp flags to validate.
         * @returns {string|null} The syntax error.
         */
        function validateRegExpFlags(flags) {
            try {
                validator.validateFlags(flags);
                return null;
            } catch (err) {
                return `Invalid flags supplied to RegExp constructor '${flags}'`;
            }
        }

        return {
            "CallExpression, NewExpression"(node) {
                if (node.callee.type !== "Identifier" || node.callee.name !== "RegExp" || !isString(node.arguments[0])) {
                    return;
                }
                const pattern = node.arguments[0].value;
                let flags = isString(node.arguments[1]) ? node.arguments[1].value : "";

                if (allowedFlags) {
                    flags = flags.replace(allowedFlags, "");
                }

                // If flags are unknown, check both are errored or not.
                const message = validateRegExpFlags(flags) || (
                    flags
                        ? validateRegExpPattern(pattern, flags.indexOf("u") !== -1)
                        : validateRegExpPattern(pattern, true) && validateRegExpPattern(pattern, false)
                );

                if (message) {
                    context.report({
                        node,
                        message: "{{message}}.",
                        data: { message }
                    });
                }
            }
        };
    }
};
