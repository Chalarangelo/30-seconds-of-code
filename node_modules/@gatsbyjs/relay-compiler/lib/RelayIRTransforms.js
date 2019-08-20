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

var RefineOperationVariablesTransform = require("./RefineOperationVariablesTransform");

var RelayApplyFragmentArgumentTransform = require("./RelayApplyFragmentArgumentTransform");

var RelayConnectionTransform = require("./RelayConnectionTransform");

var RelayDeferStreamTransform = require("./RelayDeferStreamTransform");

var RelayFieldHandleTransform = require("./RelayFieldHandleTransform");

var RelayGenerateIDFieldTransform = require("./RelayGenerateIDFieldTransform");

var RelayGenerateTypeNameTransform = require("./RelayGenerateTypeNameTransform");

var RelayMaskTransform = require("./RelayMaskTransform");

var RelayMatchTransform = require("./RelayMatchTransform");

var RelayRefetchableFragmentTransform = require("./RelayRefetchableFragmentTransform");

var RelayRelayDirectiveTransform = require("./RelayRelayDirectiveTransform");

var RelaySkipHandleFieldTransform = require("./RelaySkipHandleFieldTransform");

var RelaySplitMatchTransform = require("./RelaySplitMatchTransform");

var RelayViewerHandleTransform = require("./RelayViewerHandleTransform");

var SkipClientFieldTransform = require("./SkipClientFieldTransform");

var SkipRedundantNodesTransform = require("./SkipRedundantNodesTransform");

var SkipUnreachableNodeTransform = require("./SkipUnreachableNodeTransform");

// Transforms applied to the code used to process a query response.
var relaySchemaExtensions = [RelayConnectionTransform.SCHEMA_EXTENSION, RelayMatchTransform.SCHEMA_EXTENSION, RelayRelayDirectiveTransform.SCHEMA_EXTENSION, RelayRefetchableFragmentTransform.SCHEMA_EXTENSION]; // Transforms applied to both operations and fragments for both reading and
// writing from the store.

var relayCommonTransforms = [RelayConnectionTransform.transform, RelayViewerHandleTransform.transform, RelayRelayDirectiveTransform.transform, RelayMaskTransform.transform, RelayMatchTransform.transform, RelayRefetchableFragmentTransform.transform]; // Transforms applied to fragments used for reading data from a store

var relayFragmentTransforms = [RelayFieldHandleTransform.transform, FlattenTransform.transformWithOptions({
  flattenAbstractTypes: true
}), SkipRedundantNodesTransform.transform]; // Transforms applied to queries/mutations/subscriptions that are used for
// fetching data from the server and parsing those responses.

var relayQueryTransforms = [RelayApplyFragmentArgumentTransform.transform, SkipClientFieldTransform.transform, SkipUnreachableNodeTransform.transform, RelayGenerateIDFieldTransform.transform]; // Transforms applied to the code used to process a query response.

var relayCodegenTransforms = [RelaySplitMatchTransform.transform, RelayDeferStreamTransform.transform, InlineFragmentsTransform.transform, FlattenTransform.transformWithOptions({
  flattenAbstractTypes: true
}), SkipRedundantNodesTransform.transform, RelayGenerateTypeNameTransform.transform, FilterDirectivesTransform.transform]; // Transforms applied before printing the query sent to the server.

var relayPrintTransforms = [FlattenTransform.transformWithOptions({}), RelayGenerateTypeNameTransform.transform, RelaySkipHandleFieldTransform.transform, FilterDirectivesTransform.transform, RefineOperationVariablesTransform.transform];
module.exports = {
  commonTransforms: relayCommonTransforms,
  codegenTransforms: relayCodegenTransforms,
  fragmentTransforms: relayFragmentTransforms,
  printTransforms: relayPrintTransforms,
  queryTransforms: relayQueryTransforms,
  schemaExtensions: relaySchemaExtensions
};