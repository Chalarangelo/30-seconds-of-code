/**
 * @fileoverview Configuration applied when a user configuration extends from
 * eslint:recommended.
 * @author Nicholas C. Zakas
 */

"use strict";

const builtInRules = require("../lib/built-in-rules-index");

module.exports = {
    rules: Object.assign({}, ...Object.keys(builtInRules).map(ruleId => ({
        [ruleId]: builtInRules[ruleId].meta.docs.recommended ? "error" : "off"
    })))
};
