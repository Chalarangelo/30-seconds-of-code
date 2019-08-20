/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */
'use strict';

var invariant = require("fbjs/lib/invariant");

var _require = require("./GraphQLIRPrinter"),
    printArguments = _require.printArguments,
    printDirectives = _require.printDirectives;

/**
 * Generates an identifier that is unique to a given selection: the alias for
 * fields, the type for inline fragments, and a summary of the condition
 * variable and passing value for conditions.
 */
function getIdentifierForSelection(node) {
  if (node.kind === 'LinkedField' || node.kind === 'ScalarField') {
    return node.directives.length === 0 ? node.alias || node.name : (node.alias || node.name) + printDirectives(node.directives);
  } else if (node.kind === 'FragmentSpread') {
    return node.args.length === 0 ? '...' + node.name : '...' + node.name + printArguments(node.args);
  } else if (node.kind === 'MatchField') {
    var _node$metadata;

    var storageKey = (_node$metadata = node.metadata) === null || _node$metadata === void 0 ? void 0 : _node$metadata.storageKey;
    !(typeof storageKey === 'string') ? process.env.NODE_ENV !== "production" ? invariant(false, 'getIdentifierForSelection: Expected MatchField `%s` to have a precomputed storageKey.', node.name) : invariant(false) : void 0;
    return 'M:' + storageKey;
  } else if (node.kind === 'MatchBranch') {
    return 'B:' + node.name + '$' + node.module;
  } else if (node.kind === 'Defer') {
    return 'D:' + node.label;
  } else if (node.kind === 'Stream') {
    return 'S:' + node.label;
  } else if (node.kind === 'InlineFragment') {
    return 'I:' + node.typeCondition.name;
  } else if (node.kind === 'Condition') {
    return 'C:' + (node.condition.kind === 'Variable' ? '$' + node.condition.variableName : String(node.condition.value)) + String(node.passingValue);
  } else {
    !false ? process.env.NODE_ENV !== "production" ? invariant(false, 'getIdentifierForSelection: Unexpected kind `%s`.', node.kind) : invariant(false) : void 0;
  }
}

module.exports = getIdentifierForSelection;