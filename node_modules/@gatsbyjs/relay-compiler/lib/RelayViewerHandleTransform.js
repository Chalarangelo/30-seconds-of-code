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

var _require = require("graphql"),
    GraphQLObjectType = _require.GraphQLObjectType;

var _require2 = require("relay-runtime"),
    DEFAULT_HANDLE_KEY = _require2.DEFAULT_HANDLE_KEY;

var getRawType = SchemaUtils.getRawType;
var ID = 'id';
var VIEWER_HANDLE = 'viewer';
var VIEWER_TYPE = 'Viewer';
/**
 * A transform that adds a "viewer" handle to all fields whose type is `Viewer`.
 */

function relayViewerHandleTransform(context) {
  var viewerType = context.serverSchema.getType(VIEWER_TYPE);

  if (viewerType == null || !(viewerType instanceof GraphQLObjectType) || viewerType.getFields()[ID] != null) {
    return context;
  }

  return IRTransformer.transform(context, {
    LinkedField: visitLinkedOrMatchField,
    MatchField: visitLinkedOrMatchField
  });
}

function visitLinkedOrMatchField(field) {
  var transformedNode = this.traverse(field);

  if (getRawType(field.type).name !== VIEWER_TYPE) {
    return transformedNode;
  }

  var handles = transformedNode.handles;
  var viewerHandle = {
    name: VIEWER_HANDLE,
    key: DEFAULT_HANDLE_KEY,
    filters: null
  };

  if (handles && !handles.find(function (handle) {
    return handle.name === VIEWER_HANDLE;
  })) {
    handles = (0, _toConsumableArray2["default"])(handles).concat([viewerHandle]);
  } else if (!handles) {
    handles = [viewerHandle];
  }

  return handles !== transformedNode.handles ? (0, _objectSpread2["default"])({}, transformedNode, {
    handles: handles
  }) : transformedNode;
}

module.exports = {
  transform: relayViewerHandleTransform
};