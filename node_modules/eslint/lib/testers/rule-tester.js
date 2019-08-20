/**
 * @fileoverview Mocha test wrapper
 * @author Ilya Volodin
 */
"use strict";

/* global describe, it */

/*
 * This is a wrapper around mocha to allow for DRY unittests for eslint
 * Format:
 * RuleTester.run("{ruleName}", {
 *      valid: [
 *          "{code}",
 *          { code: "{code}", options: {options}, globals: {globals}, parser: "{parser}", settings: {settings} }
 *      ],
 *      invalid: [
 *          { code: "{code}", errors: {numErrors} },
 *          { code: "{code}", errors: ["{errorMessage}"] },
 *          { code: "{code}", options: {options}, globals: {globals}, parser: "{parser}", settings: {settings}, errors: [{ message: "{errorMessage}", type: "{errorNodeType}"}] }
 *      ]
 *  });
 *
 * Variables:
 * {code} - String that represents the code to be tested
 * {options} - Arguments that are passed to the configurable rules.
 * {globals} - An object representing a list of variables that are
 *             registered as globals
 * {parser} - String representing the parser to use
 * {settings} - An object representing global settings for all rules
 * {numErrors} - If failing case doesn't need to check error message,
 *               this integer will specify how many errors should be
 *               received
 * {errorMessage} - Message that is returned by the rule on failure
 * {errorNodeType} - AST node type that is returned by they rule as
 *                   a cause of the failure.
 */

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const lodash = require("lodash"),
    assert = require("assert"),
    util = require("util"),
    validator = require("../config/config-validator"),
    ajv = require("../util/ajv"),
    Linter = require("../linter"),
    Environments = require("../config/environments"),
    SourceCodeFixer = require("../util/source-code-fixer"),
    interpolate = require("../util/interpolate");

//------------------------------------------------------------------------------
// Private Members
//------------------------------------------------------------------------------

/*
 * testerDefaultConfig must not be modified as it allows to reset the tester to
 * the initial default configuration
 */
const testerDefaultConfig = { rules: {} };
let defaultConfig = { rules: {} };

/*
 * List every parameters possible on a test case that are not related to eslint
 * configuration
 */
const RuleTesterParameters = [
    "code",
    "filename",
    "options",
    "errors",
    "output"
];

const hasOwnProperty = Function.call.bind(Object.hasOwnProperty);

/**
 * Clones a given value deeply.
 * Note: This ignores `parent` property.
 *
 * @param {any} x - A value to clone.
 * @returns {any} A cloned value.
 */
function cloneDeeplyExcludesParent(x) {
    if (typeof x === "object" && x !== null) {
        if (Array.isArray(x)) {
            return x.map(cloneDeeplyExcludesParent);
        }

        const retv = {};

        for (const key in x) {
            if (key !== "parent" && hasOwnProperty(x, key)) {
                retv[key] = cloneDeeplyExcludesParent(x[key]);
            }
        }

        return retv;
    }

    return x;
}

/**
 * Freezes a given value deeply.
 *
 * @param {any} x - A value to freeze.
 * @returns {void}
 */
function freezeDeeply(x) {
    if (typeof x === "object" && x !== null) {
        if (Array.isArray(x)) {
            x.forEach(freezeDeeply);
        } else {
            for (const key in x) {
                if (key !== "parent" && hasOwnProperty(x, key)) {
                    freezeDeeply(x[key]);
                }
            }
        }
        Object.freeze(x);
    }
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

// default separators for testing
const DESCRIBE = Symbol("describe");
const IT = Symbol("it");

/**
 * This is `it` default handler if `it` don't exist.
 * @this {Mocha}
 * @param {string} text - The description of the test case.
 * @param {Function} method - The logic of the test case.
 * @returns {any} Returned value of `method`.
 */
function itDefaultHandler(text, method) {
    try {
        return method.call(this);
    } catch (err) {
        if (err instanceof assert.AssertionError) {
            err.message += ` (${util.inspect(err.actual)} ${err.operator} ${util.inspect(err.expected)})`;
        }
        throw err;
    }
}

/**
 * This is `describe` default handler if `describe` don't exist.
 * @this {Mocha}
 * @param {string} text - The description of the test case.
 * @param {Function} method - The logic of the test case.
 * @returns {any} Returned value of `method`.
 */
function describeDefaultHandler(text, method) {
    return method.call(this);
}

class RuleTester {

    /**
     * Creates a new instance of RuleTester.
     * @param {Object} [testerConfig] Optional, extra configuration for the tester
     * @constructor
     */
    constructor(testerConfig) {

        /**
         * The configuration to use for this tester. Combination of the tester
         * configuration and the default configuration.
         * @type {Object}
         */
        this.testerConfig = lodash.merge(

            // we have to clone because merge uses the first argument for recipient
            lodash.cloneDeep(defaultConfig),
            testerConfig,
            { rules: { "rule-tester/validate-ast": "error" } }
        );

        /**
         * Rule definitions to define before tests.
         * @type {Object}
         */
        this.rules = {};
        this.linter = new Linter();
    }

    /**
     * Set the configuration to use for all future tests
     * @param {Object} config the configuration to use.
     * @returns {void}
     */
    static setDefaultConfig(config) {
        if (typeof config !== "object") {
            throw new TypeError("RuleTester.setDefaultConfig: config must be an object");
        }
        defaultConfig = config;

        // Make sure the rules object exists since it is assumed to exist later
        defaultConfig.rules = defaultConfig.rules || {};
    }

    /**
     * Get the current configuration used for all tests
     * @returns {Object} the current configuration
     */
    static getDefaultConfig() {
        return defaultConfig;
    }

    /**
     * Reset the configuration to the initial configuration of the tester removing
     * any changes made until now.
     * @returns {void}
     */
    static resetDefaultConfig() {
        defaultConfig = lodash.cloneDeep(testerDefaultConfig);
    }


    /*
     * If people use `mocha test.js --watch` command, `describe` and `it` function
     * instances are different for each execution. So `describe` and `it` should get fresh instance
     * always.
     */
    static get describe() {
        return (
            this[DESCRIBE] ||
            (typeof describe === "function" ? describe : describeDefaultHandler)
        );
    }

    static set describe(value) {
        this[DESCRIBE] = value;
    }

    static get it() {
        return (
            this[IT] ||
            (typeof it === "function" ? it : itDefaultHandler)
        );
    }

    static set it(value) {
        this[IT] = value;
    }

    /**
     * Define a rule for one particular run of tests.
     * @param {string} name The name of the rule to define.
     * @param {Function} rule The rule definition.
     * @returns {void}
     */
    defineRule(name, rule) {
        this.rules[name] = rule;
    }

    /**
     * Adds a new rule test to execute.
     * @param {string} ruleName The name of the rule to run.
     * @param {Function} rule The rule to test.
     * @param {Object} test The collection of tests to run.
     * @returns {void}
     */
    run(ruleName, rule, test) {

        const testerConfig = this.testerConfig,
            requiredScenarios = ["valid", "invalid"],
            scenarioErrors = [],
            linter = this.linter;

        if (lodash.isNil(test) || typeof test !== "object") {
            throw new TypeError(`Test Scenarios for rule ${ruleName} : Could not find test scenario object`);
        }

        requiredScenarios.forEach(scenarioType => {
            if (lodash.isNil(test[scenarioType])) {
                scenarioErrors.push(`Could not find any ${scenarioType} test scenarios`);
            }
        });

        if (scenarioErrors.length > 0) {
            throw new Error([
                `Test Scenarios for rule ${ruleName} is invalid:`
            ].concat(scenarioErrors).join("\n"));
        }


        linter.defineRule(ruleName, Object.assign({}, rule, {

            // Create a wrapper rule that freezes the `context` properties.
            create(context) {
                freezeDeeply(context.options);
                freezeDeeply(context.settings);
                freezeDeeply(context.parserOptions);

                return (typeof rule === "function" ? rule : rule.create)(context);
            }
        }));

        linter.defineRules(this.rules);

        const ruleMap = linter.getRules();

        /**
         * Run the rule for the given item
         * @param {string|Object} item Item to run the rule against
         * @returns {Object} Eslint run result
         * @private
         */
        function runRuleForItem(item) {
            let config = lodash.cloneDeep(testerConfig),
                code, filename, beforeAST, afterAST;

            if (typeof item === "string") {
                code = item;
            } else {
                code = item.code;

                /*
                 * Assumes everything on the item is a config except for the
                 * parameters used by this tester
                 */
                const itemConfig = lodash.omit(item, RuleTesterParameters);

                /*
                 * Create the config object from the tester config and this item
                 * specific configurations.
                 */
                config = lodash.merge(
                    config,
                    itemConfig
                );
            }

            if (item.filename) {
                filename = item.filename;
            }

            if (Object.prototype.hasOwnProperty.call(item, "options")) {
                assert(Array.isArray(item.options), "options must be an array");
                config.rules[ruleName] = [1].concat(item.options);
            } else {
                config.rules[ruleName] = 1;
            }

            const schema = validator.getRuleOptionsSchema(rule);

            /*
             * Setup AST getters.
             * The goal is to check whether or not AST was modified when
             * running the rule under test.
             */
            linter.defineRule("rule-tester/validate-ast", () => ({
                Program(node) {
                    beforeAST = cloneDeeplyExcludesParent(node);
                },
                "Program:exit"(node) {
                    afterAST = node;
                }
            }));

            if (schema) {
                ajv.validateSchema(schema);

                if (ajv.errors) {
                    const errors = ajv.errors.map(error => {
                        const field = error.dataPath[0] === "." ? error.dataPath.slice(1) : error.dataPath;

                        return `\t${field}: ${error.message}`;
                    }).join("\n");

                    throw new Error([`Schema for rule ${ruleName} is invalid:`, errors]);
                }
            }

            validator.validate(config, ruleMap.get.bind(ruleMap), new Environments(), "rule-tester");

            return {
                messages: linter.verify(code, config, filename, true),
                beforeAST,
                afterAST: cloneDeeplyExcludesParent(afterAST)
            };
        }

        /**
         * Check if the AST was changed
         * @param {ASTNode} beforeAST AST node before running
         * @param {ASTNode} afterAST AST node after running
         * @returns {void}
         * @private
         */
        function assertASTDidntChange(beforeAST, afterAST) {
            if (!lodash.isEqual(beforeAST, afterAST)) {
                assert.fail("Rule should not modify AST.");
            }
        }

        /**
         * Check if the template is valid or not
         * all valid cases go through this
         * @param {string|Object} item Item to run the rule against
         * @returns {void}
         * @private
         */
        function testValidTemplate(item) {
            const result = runRuleForItem(item);
            const messages = result.messages;

            assert.strictEqual(messages.length, 0, util.format("Should have no errors but had %d: %s",
                messages.length, util.inspect(messages)));

            assertASTDidntChange(result.beforeAST, result.afterAST);
        }

        /**
         * Asserts that the message matches its expected value. If the expected
         * value is a regular expression, it is checked against the actual
         * value.
         * @param {string} actual Actual value
         * @param {string|RegExp} expected Expected value
         * @returns {void}
         * @private
         */
        function assertMessageMatches(actual, expected) {
            if (expected instanceof RegExp) {

                // assert.js doesn't have a built-in RegExp match function
                assert.ok(
                    expected.test(actual),
                    `Expected '${actual}' to match ${expected}`
                );
            } else {
                assert.strictEqual(actual, expected);
            }
        }

        /**
         * Check if the template is invalid or not
         * all invalid cases go through this.
         * @param {string|Object} item Item to run the rule against
         * @returns {void}
         * @private
         */
        function testInvalidTemplate(item) {
            assert.ok(item.errors || item.errors === 0,
                `Did not specify errors for an invalid test of ${ruleName}`);

            const result = runRuleForItem(item);
            const messages = result.messages;


            if (typeof item.errors === "number") {
                assert.strictEqual(messages.length, item.errors, util.format("Should have %d error%s but had %d: %s",
                    item.errors, item.errors === 1 ? "" : "s", messages.length, util.inspect(messages)));
            } else {
                assert.strictEqual(
                    messages.length, item.errors.length,
                    util.format(
                        "Should have %d error%s but had %d: %s",
                        item.errors.length, item.errors.length === 1 ? "" : "s", messages.length, util.inspect(messages)
                    )
                );

                const hasMessageOfThisRule = messages.some(m => m.ruleId === ruleName);

                for (let i = 0, l = item.errors.length; i < l; i++) {
                    const error = item.errors[i];
                    const message = messages[i];

                    assert(!message.fatal, `A fatal parsing error occurred: ${message.message}`);
                    assert(hasMessageOfThisRule, "Error rule name should be the same as the name of the rule being tested");

                    if (typeof error === "string" || error instanceof RegExp) {

                        // Just an error message.
                        assertMessageMatches(message.message, error);
                    } else if (typeof error === "object") {

                        /*
                         * Error object.
                         * This may have a message, messageId, data, node type, line, and/or
                         * column.
                         */
                        if (hasOwnProperty(error, "message")) {
                            assert.ok(!hasOwnProperty(error, "messageId"), "Error should not specify both 'message' and a 'messageId'.");
                            assert.ok(!hasOwnProperty(error, "data"), "Error should not specify both 'data' and 'message'.");
                            assertMessageMatches(message.message, error.message);
                        } else if (hasOwnProperty(error, "messageId")) {
                            assert.ok(
                                hasOwnProperty(rule, "meta") && hasOwnProperty(rule.meta, "messages"),
                                "Error can not use 'messageId' if rule under test doesn't define 'meta.messages'."
                            );
                            if (!hasOwnProperty(rule.meta.messages, error.messageId)) {
                                const friendlyIDList = `[${Object.keys(rule.meta.messages).map(key => `'${key}'`).join(", ")}]`;

                                assert(false, `Invalid messageId '${error.messageId}'. Expected one of ${friendlyIDList}.`);
                            }
                            assert.strictEqual(
                                error.messageId,
                                message.messageId,
                                `messageId '${message.messageId}' does not match expected messageId '${error.messageId}'.`
                            );
                            if (hasOwnProperty(error, "data")) {

                                /*
                                 *  if data was provided, then directly compare the returned message to a synthetic
                                 *  interpolated message using the same message ID and data provided in the test.
                                 *  See https://github.com/eslint/eslint/issues/9890 for context.
                                 */
                                const unformattedOriginalMessage = rule.meta.messages[error.messageId];
                                const rehydratedMessage = interpolate(unformattedOriginalMessage, error.data);

                                assert.strictEqual(
                                    message.message,
                                    rehydratedMessage,
                                    `Hydrated message "${rehydratedMessage}" does not match "${message.message}"`
                                );
                            }
                        }

                        assert.ok(
                            hasOwnProperty(error, "data") ? hasOwnProperty(error, "messageId") : true,
                            "Error must specify 'messageId' if 'data' is used."
                        );

                        if (error.type) {
                            assert.strictEqual(message.nodeType, error.type, `Error type should be ${error.type}, found ${message.nodeType}`);
                        }

                        if (Object.prototype.hasOwnProperty.call(error, "line")) {
                            assert.strictEqual(message.line, error.line, `Error line should be ${error.line}`);
                        }

                        if (Object.prototype.hasOwnProperty.call(error, "column")) {
                            assert.strictEqual(message.column, error.column, `Error column should be ${error.column}`);
                        }

                        if (Object.prototype.hasOwnProperty.call(error, "endLine")) {
                            assert.strictEqual(message.endLine, error.endLine, `Error endLine should be ${error.endLine}`);
                        }

                        if (Object.prototype.hasOwnProperty.call(error, "endColumn")) {
                            assert.strictEqual(message.endColumn, error.endColumn, `Error endColumn should be ${error.endColumn}`);
                        }
                    } else {

                        // Message was an unexpected type
                        assert.fail(`Error should be a string, object, or RegExp, but found (${util.inspect(message)})`);
                    }
                }
            }

            if (Object.prototype.hasOwnProperty.call(item, "output")) {
                if (item.output === null) {
                    assert.strictEqual(
                        messages.filter(message => message.fix).length,
                        0,
                        "Expected no autofixes to be suggested"
                    );
                } else {
                    const fixResult = SourceCodeFixer.applyFixes(item.code, messages);

                    assert.strictEqual(fixResult.output, item.output, "Output is incorrect.");
                }
            }

            assertASTDidntChange(result.beforeAST, result.afterAST);
        }

        /*
         * This creates a mocha test suite and pipes all supplied info through
         * one of the templates above.
         */
        RuleTester.describe(ruleName, () => {
            RuleTester.describe("valid", () => {
                test.valid.forEach(valid => {
                    RuleTester.it(typeof valid === "object" ? valid.code : valid, () => {
                        testValidTemplate(valid);
                    });
                });
            });

            RuleTester.describe("invalid", () => {
                test.invalid.forEach(invalid => {
                    RuleTester.it(invalid.code, () => {
                        testInvalidTemplate(invalid);
                    });
                });
            });
        });
    }
}

RuleTester[DESCRIBE] = RuleTester[IT] = null;

module.exports = RuleTester;
