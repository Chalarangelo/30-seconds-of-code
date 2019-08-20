/**
 * @fileoverview Config to enable all rules.
 * @author Robert Fletcher
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const builtInRules = require("../lib/built-in-rules-index");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const enabledRules = Object.keys(builtInRules).reduce((result, ruleId) => {
    if (!builtInRules[ruleId].meta.deprecated) {
        result[ruleId] = "error";
    }
    return result;
}, {});

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = { rules: enabledRules };
