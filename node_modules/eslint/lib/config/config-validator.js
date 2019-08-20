/**
 * @fileoverview Validates configs.
 * @author Brandon Mills
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const path = require("path"),
    ajv = require("../util/ajv"),
    lodash = require("lodash"),
    configSchema = require("../../conf/config-schema.js"),
    util = require("util");

const ruleValidators = new WeakMap();

//------------------------------------------------------------------------------
// Private
//------------------------------------------------------------------------------
let validateSchema;

// Defitions for deprecation warnings.
const deprecationWarningMessages = {
    ESLINT_LEGACY_ECMAFEATURES: "The 'ecmaFeatures' config file property is deprecated, and has no effect.",
    ESLINT_LEGACY_OBJECT_REST_SPREAD: "The 'parserOptions.ecmaFeatures.experimentalObjectRestSpread' option is deprecated. Use 'parserOptions.ecmaVersion' instead."
};
const severityMap = {
    error: 2,
    warn: 1,
    off: 0
};

/**
 * Gets a complete options schema for a rule.
 * @param {{create: Function, schema: (Array|null)}} rule A new-style rule object
 * @returns {Object} JSON Schema for the rule's options.
 */
function getRuleOptionsSchema(rule) {
    const schema = rule.schema || rule.meta && rule.meta.schema;

    // Given a tuple of schemas, insert warning level at the beginning
    if (Array.isArray(schema)) {
        if (schema.length) {
            return {
                type: "array",
                items: schema,
                minItems: 0,
                maxItems: schema.length
            };
        }
        return {
            type: "array",
            minItems: 0,
            maxItems: 0
        };

    }

    // Given a full schema, leave it alone
    return schema || null;
}

/**
 * Validates a rule's severity and returns the severity value. Throws an error if the severity is invalid.
 * @param {options} options The given options for the rule.
 * @returns {number|string} The rule's severity value
 */
function validateRuleSeverity(options) {
    const severity = Array.isArray(options) ? options[0] : options;
    const normSeverity = typeof severity === "string" ? severityMap[severity.toLowerCase()] : severity;

    if (normSeverity === 0 || normSeverity === 1 || normSeverity === 2) {
        return normSeverity;
    }

    throw new Error(`\tSeverity should be one of the following: 0 = off, 1 = warn, 2 = error (you passed '${util.inspect(severity).replace(/'/gu, "\"").replace(/\n/gu, "")}').\n`);

}

/**
 * Validates the non-severity options passed to a rule, based on its schema.
 * @param {{create: Function}} rule The rule to validate
 * @param {Array} localOptions The options for the rule, excluding severity
 * @returns {void}
 */
function validateRuleSchema(rule, localOptions) {
    if (!ruleValidators.has(rule)) {
        const schema = getRuleOptionsSchema(rule);

        if (schema) {
            ruleValidators.set(rule, ajv.compile(schema));
        }
    }

    const validateRule = ruleValidators.get(rule);

    if (validateRule) {
        validateRule(localOptions);
        if (validateRule.errors) {
            throw new Error(validateRule.errors.map(
                error => `\tValue ${JSON.stringify(error.data)} ${error.message}.\n`
            ).join(""));
        }
    }
}

/**
 * Validates a rule's options against its schema.
 * @param {{create: Function}|null} rule The rule that the config is being validated for
 * @param {string} ruleId The rule's unique name.
 * @param {Array|number} options The given options for the rule.
 * @param {string|null} source The name of the configuration source to report in any errors. If null or undefined,
 * no source is prepended to the message.
 * @returns {void}
 */
function validateRuleOptions(rule, ruleId, options, source = null) {
    if (!rule) {
        return;
    }
    try {
        const severity = validateRuleSeverity(options);

        if (severity !== 0) {
            validateRuleSchema(rule, Array.isArray(options) ? options.slice(1) : []);
        }
    } catch (err) {
        const enhancedMessage = `Configuration for rule "${ruleId}" is invalid:\n${err.message}`;

        if (typeof source === "string") {
            throw new Error(`${source}:\n\t${enhancedMessage}`);
        } else {
            throw new Error(enhancedMessage);
        }
    }
}

/**
 * Validates an environment object
 * @param {Object} environment The environment config object to validate.
 * @param {Environments} envContext Env context
 * @param {string} source The name of the configuration source to report in any errors.
 * @returns {void}
 */
function validateEnvironment(environment, envContext, source = null) {

    // not having an environment is ok
    if (!environment) {
        return;
    }

    Object.keys(environment).forEach(env => {
        if (!envContext.get(env)) {
            const message = `${source}:\n\tEnvironment key "${env}" is unknown\n`;

            throw new Error(message);
        }
    });
}

/**
 * Validates a rules config object
 * @param {Object} rulesConfig The rules config object to validate.
 * @param {function(string): {create: Function}} ruleMapper A mapper function from strings to loaded rules
 * @param {string} source The name of the configuration source to report in any errors.
 * @returns {void}
 */
function validateRules(rulesConfig, ruleMapper, source = null) {
    if (!rulesConfig) {
        return;
    }

    Object.keys(rulesConfig).forEach(id => {
        validateRuleOptions(ruleMapper(id), id, rulesConfig[id], source);
    });
}

/**
 * Formats an array of schema validation errors.
 * @param {Array} errors An array of error messages to format.
 * @returns {string} Formatted error message
 */
function formatErrors(errors) {
    return errors.map(error => {
        if (error.keyword === "additionalProperties") {
            const formattedPropertyPath = error.dataPath.length ? `${error.dataPath.slice(1)}.${error.params.additionalProperty}` : error.params.additionalProperty;

            return `Unexpected top-level property "${formattedPropertyPath}"`;
        }
        if (error.keyword === "type") {
            const formattedField = error.dataPath.slice(1);
            const formattedExpectedType = Array.isArray(error.schema) ? error.schema.join("/") : error.schema;
            const formattedValue = JSON.stringify(error.data);

            return `Property "${formattedField}" is the wrong type (expected ${formattedExpectedType} but got \`${formattedValue}\`)`;
        }

        const field = error.dataPath[0] === "." ? error.dataPath.slice(1) : error.dataPath;

        return `"${field}" ${error.message}. Value: ${JSON.stringify(error.data)}`;
    }).map(message => `\t- ${message}.\n`).join("");
}

/**
 * Emits a deprecation warning containing a given filepath. A new deprecation warning is emitted
 * for each unique file path, but repeated invocations with the same file path have no effect.
 * No warnings are emitted if the `--no-deprecation` or `--no-warnings` Node runtime flags are active.
 * @param {string} source The name of the configuration source to report the warning for.
 * @param {string} errorCode The warning message to show.
 * @returns {void}
 */
const emitDeprecationWarning = lodash.memoize((source, errorCode) => {
    const rel = path.relative(process.cwd(), source);
    const message = deprecationWarningMessages[errorCode];

    process.emitWarning(
        `${message} (found in "${rel}")`,
        "DeprecationWarning",
        errorCode
    );
});

/**
 * Validates the top level properties of the config object.
 * @param {Object} config The config object to validate.
 * @param {string} source The name of the configuration source to report in any errors.
 * @returns {void}
 */
function validateConfigSchema(config, source = null) {
    validateSchema = validateSchema || ajv.compile(configSchema);

    if (!validateSchema(config)) {
        throw new Error(`ESLint configuration in ${source} is invalid:\n${formatErrors(validateSchema.errors)}`);
    }

    if (Object.hasOwnProperty.call(config, "ecmaFeatures")) {
        emitDeprecationWarning(source, "ESLINT_LEGACY_ECMAFEATURES");
    }

    if (
        (config.parser || "espree") === "espree" &&
        config.parserOptions &&
        config.parserOptions.ecmaFeatures &&
        config.parserOptions.ecmaFeatures.experimentalObjectRestSpread
    ) {
        emitDeprecationWarning(source, "ESLINT_LEGACY_OBJECT_REST_SPREAD");
    }
}

/**
 * Validates an entire config object.
 * @param {Object} config The config object to validate.
 * @param {function(string): {create: Function}} ruleMapper A mapper function from rule IDs to defined rules
 * @param {Environments} envContext The env context
 * @param {string} source The name of the configuration source to report in any errors.
 * @returns {void}
 */
function validate(config, ruleMapper, envContext, source = null) {
    validateConfigSchema(config, source);
    validateRules(config.rules, ruleMapper, source);
    validateEnvironment(config.env, envContext, source);

    for (const override of config.overrides || []) {
        validateRules(override.rules, ruleMapper, source);
        validateEnvironment(override.env, envContext, source);
    }
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = {
    getRuleOptionsSchema,
    validate,
    validateRuleOptions
};
