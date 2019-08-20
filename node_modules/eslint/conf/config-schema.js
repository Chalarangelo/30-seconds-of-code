/**
 * @fileoverview Defines a schema for configs.
 * @author Sylvan Mably
 */

"use strict";

const baseConfigProperties = {
    env: { type: "object" },
    globals: { type: "object" },
    parser: { type: ["string", "null"] },
    parserOptions: { type: "object" },
    plugins: { type: "array" },
    rules: { type: "object" },
    settings: { type: "object" },

    ecmaFeatures: { type: "object" } // deprecated; logs a warning when used
};

const overrideProperties = Object.assign(
    {},
    baseConfigProperties,
    {
        files: {
            oneOf: [
                { type: "string" },
                {
                    type: "array",
                    items: { type: "string" },
                    minItems: 1
                }
            ]
        },
        excludedFiles: {
            oneOf: [
                { type: "string" },
                {
                    type: "array",
                    items: { type: "string" }
                }
            ]
        }
    }
);

const topLevelConfigProperties = Object.assign(
    {},
    baseConfigProperties,
    {
        extends: { type: ["string", "array"] },
        root: { type: "boolean" },
        overrides: {
            type: "array",
            items: {
                type: "object",
                properties: overrideProperties,
                required: ["files"],
                additionalProperties: false
            }
        }
    }
);

const configSchema = {
    type: "object",
    properties: topLevelConfigProperties,
    additionalProperties: false
};

module.exports = configSchema;
