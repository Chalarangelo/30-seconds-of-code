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

var FilterDirectivesTransform = require("./FilterDirectivesTransform");

var FlattenTransform = require("./FlattenTransform");

var InlineFragmentsTransform = require("./InlineFragmentsTransform");

var SkipClientFieldTransform = require("./SkipClientFieldTransform");

var SkipRedundantNodesTransform = require("./SkipRedundantNodesTransform");

var SkipUnreachableNodeTransform = require("./SkipUnreachableNodeTransform");

// Transforms applied to fragments used for reading data from a store
var FRAGMENT_TRANSFORMS = [FlattenTransform.transformWithOptions({
  flattenAbstractTypes: true
}), SkipRedundantNodesTransform.transform]; // Transforms applied to queries/mutations/subscriptions that are used for
// fetching data from the server and parsing those responses.

var QUERY_TRANSFORMS = [SkipClientFieldTransform.transform, SkipUnreachableNodeTransform.transform]; // Transforms applied to the code used to process a query response.

var CODEGEN_TRANSFORMS = [InlineFragmentsTransform.transform, FlattenTransform.transformWithOptions({
  flattenAbstractTypes: true
}), SkipRedundantNodesTransform.transform, FilterDirectivesTransform.transform];
module.exports = {
  codegenTransforms: CODEGEN_TRANSFORMS,
  fragmentTransforms: FRAGMENT_TRANSFORMS,
  queryTransforms: QUERY_TRANSFORMS
};