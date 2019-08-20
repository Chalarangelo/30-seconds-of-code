/**
 * @fileoverview Defines a storage for rules.
 * @author Nicholas C. Zakas
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const lodash = require("lodash");
const ruleReplacements = require("../conf/replacements").rules;
const builtInRules = require("./built-in-rules-index");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Creates a stub rule that gets used when a rule with a given ID is not found.
 * @param {string} ruleId The ID of the missing rule
 * @returns {{create: function(RuleContext): Object}} A rule that reports an error at the first location
 * in the program. The report has the message `Definition for rule '${ruleId}' was not found` if the rule is unknown,
 * or `Rule '${ruleId}' was removed and replaced by: ${replacements.join(", ")}` if the rule is known to have been
 * replaced.
 */
const createMissingRule = lodash.memoize(ruleId => {
    const message = Object.prototype.hasOwnProperty.call(ruleReplacements, ruleId)
        ? `Rule '${ruleId}' was removed and replaced by: ${ruleReplacements[ruleId].join(", ")}`
        : `Definition for rule '${ruleId}' was not found`;

    return {
        create: context => ({
            Program() {
                context.report({
                    loc: { line: 1, column: 0 },
                    message
                });
            }
        })
    };
});

/**
 * Normalizes a rule module to the new-style API
 * @param {(Function|{create: Function})} rule A rule object, which can either be a function
 * ("old-style") or an object with a `create` method ("new-style")
 * @returns {{create: Function}} A new-style rule.
 */
function normalizeRule(rule) {
    return typeof rule === "function" ? Object.assign({ create: rule }, rule) : rule;
}

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

class Rules {
    constructor() {
        this._rules = Object.create(null);
        Object.keys(builtInRules).forEach(ruleId => {
            this.define(ruleId, builtInRules[ruleId]);
        });
    }

    /**
     * Registers a rule module for rule id in storage.
     * @param {string} ruleId Rule id (file name).
     * @param {Function} ruleModule Rule handler.
     * @returns {void}
     */
    define(ruleId, ruleModule) {
        this._rules[ruleId] = normalizeRule(ruleModule);
    }

    /**
     * Access rule handler by id (file name).
     * @param {string} ruleId Rule id (file name).
     * @returns {{create: Function, schema: JsonSchema[]}}
     * A rule. This is normalized to always have the new-style shape with a `create` method.
     */
    get(ruleId) {
        if (!Object.prototype.hasOwnProperty.call(this._rules, ruleId)) {
            return createMissingRule(ruleId);
        }
        if (typeof this._rules[ruleId] === "string") {
            return normalizeRule(require(this._rules[ruleId]));
        }
        return this._rules[ruleId];

    }

    /**
     * Get an object with all currently loaded rules
     * @returns {Map} All loaded rules
     */
    getAllLoadedRules() {
        const allRules = new Map();

        Object.keys(this._rules).forEach(name => {
            const rule = this.get(name);

            allRules.set(name, rule);
        });
        return allRules;
    }
}

module.exports = Rules;
