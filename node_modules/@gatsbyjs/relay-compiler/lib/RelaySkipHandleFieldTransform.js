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

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var CompilerContext = require("./GraphQLCompilerContext");

var IRTransformer = require("./GraphQLIRTransformer");

/**
 * A transform that removes field `handles`. Intended for use when e.g.
 * printing queries to send to a GraphQL server.
 */
function relaySkipHandleFieldTransform(context) {
  return IRTransformer.transform(context, {
    LinkedField: visitField,
    MatchField: visitField,
    ScalarField: visitField
  });
}

function visitField(field) {
  var transformedNode = this.traverse(field);

  if (transformedNode.handles) {
    return (0, _objectSpread2["default"])({}, transformedNode, {
      handles: null
    });
  }

  return transformedNode;
}

module.exports = {
  transform: relaySkipHandleFieldTransform
};