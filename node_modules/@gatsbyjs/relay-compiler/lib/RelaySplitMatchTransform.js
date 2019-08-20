/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict-local
 * @format
 */
'use strict';

var CompilerContext = require("./GraphQLCompilerContext");

var IRTransformer = require("./GraphQLIRTransformer");

var getNormalizationOperationName = require("./getNormalizationOperationName");

/**
 * This transform finds MatchBranch nodes and adds a SplitOperation root
 * node to the context for each of them.
 */
function relaySplitMatchTransform(context) {
  var splitOperations = new Map();
  var transformedContext = IRTransformer.transform(context, {
    MatchBranch: visitMatchBranch
  }, function () {
    return splitOperations;
  });
  return transformedContext.addAll(Array.from(splitOperations.values()));
}

function visitMatchBranch(node, state) {
  var transformedNode = this.traverse(node, state);
  var splitOperation = {
    kind: 'SplitOperation',
    name: getNormalizationOperationName(transformedNode.name),
    selections: transformedNode.selections,
    loc: {
      kind: 'Derived',
      source: node.loc
    },
    metadata: {
      derivedFrom: transformedNode.name
    },
    type: transformedNode.type
  };
  state.set(node.name, splitOperation);
  return transformedNode;
}

module.exports = {
  transform: relaySplitMatchTransform
};