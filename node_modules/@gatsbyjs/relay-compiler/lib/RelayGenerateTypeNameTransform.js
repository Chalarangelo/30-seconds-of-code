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

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var CompilerContext = require("./GraphQLCompilerContext");

var IRTransformer = require("./GraphQLIRTransformer");

var SchemaUtils = require("./GraphQLSchemaUtils");

var _require = require("./RelayTransformUtils"),
    hasUnaliasedSelection = _require.hasUnaliasedSelection;

var _require2 = require("graphql"),
    assertLeafType = _require2.assertLeafType;

var isAbstractType = SchemaUtils.isAbstractType;
var TYPENAME_KEY = '__typename';
var STRING_TYPE = 'String';

/**
 * A transform that adds `__typename` field on any `LinkedField` of a union or
 * interface type where there is no unaliased `__typename` selection.
 */
function relayGenerateTypeNameTransform(context) {
  var stringType = assertLeafType(context.serverSchema.getType(STRING_TYPE));
  var typenameField = {
    kind: 'ScalarField',
    alias: null,
    args: [],
    directives: [],
    handles: null,
    loc: {
      kind: 'Generated'
    },
    metadata: null,
    name: TYPENAME_KEY,
    type: stringType
  };
  var state = {
    typenameField: typenameField
  };
  return IRTransformer.transform(context, {
    LinkedField: visitLinkedOrMatchField,
    MatchField: visitLinkedOrMatchField
  }, function () {
    return state;
  });
}

function visitLinkedOrMatchField(field, state) {
  var transformedNode = this.traverse(field, state);

  if (isAbstractType(transformedNode.type) && !hasUnaliasedSelection(transformedNode, TYPENAME_KEY)) {
    return (0, _objectSpread2["default"])({}, transformedNode, {
      selections: [state.typenameField].concat((0, _toConsumableArray2["default"])(transformedNode.selections))
    });
  }

  return transformedNode;
}

module.exports = {
  transform: relayGenerateTypeNameTransform
};