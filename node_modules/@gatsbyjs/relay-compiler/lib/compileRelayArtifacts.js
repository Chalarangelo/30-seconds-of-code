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

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var Printer = require("./GraphQLIRPrinter");

var Profiler = require("./GraphQLCompilerProfiler");

var RelayCodeGenerator = require("./RelayCodeGenerator");

var filterContextForNode = require("./filterContextForNode");

/**
 * Transforms the provided compiler context
 *
 * compileRelayArtifacts generates artifacts for Relay's runtime as a result of
 * applying a series of transforms. Each kind of artifact is dependent on
 * transforms being applied in the following order:
 *
 *   - Fragment Readers: commonTransforms, fragmentTransforms
 *   - Operation Writers: commonTransforms, queryTransforms, codegenTransforms
 *   - GraphQL Text: commonTransforms, queryTransforms, printTransforms
 *
 * The order of the transforms applied for each artifact below is important.
 * CompilerContext will memoize applying each transform, so while
 * `commonTransforms` appears in each artifacts' application, it will not result
 * in repeated work as long as the order remains consistent across each context.
 */
function compileRelayArtifacts(context, transforms, reporter) {
  return Profiler.run('GraphQLCompiler.compile', function () {
    // The fragment is used for reading data from the normalized store.
    var fragmentContext = context.applyTransforms((0, _toConsumableArray2["default"])(transforms.commonTransforms).concat((0, _toConsumableArray2["default"])(transforms.fragmentTransforms)), reporter); // The unflattened query is used for printing, since flattening creates an
    // invalid query.

    var printContext = context.applyTransforms((0, _toConsumableArray2["default"])(transforms.commonTransforms).concat((0, _toConsumableArray2["default"])(transforms.queryTransforms), (0, _toConsumableArray2["default"])(transforms.printTransforms)), reporter); // The flattened query is used for codegen in order to reduce the number of
    // duplicate fields that must be processed during response normalization.

    var codeGenContext = context.applyTransforms((0, _toConsumableArray2["default"])(transforms.commonTransforms).concat((0, _toConsumableArray2["default"])(transforms.queryTransforms), (0, _toConsumableArray2["default"])(transforms.codegenTransforms)), reporter);
    var results = []; // Add everything from codeGenContext, these are the operations as well as
    // SplitOperations from @match.

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = codeGenContext.documents()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var node = _step.value;

        if (node.kind === 'Root') {
          var fragNode = fragmentContext.getRoot(node.name);
          results.push(RelayCodeGenerator.generate({
            kind: 'Request',
            fragment: {
              kind: 'Fragment',
              argumentDefinitions: fragNode.argumentDefinitions,
              directives: fragNode.directives,
              loc: {
                kind: 'Derived',
                source: node.loc
              },
              metadata: null,
              name: fragNode.name,
              selections: fragNode.selections,
              type: fragNode.type
            },
            id: null,
            loc: node.loc,
            metadata: node.metadata || {},
            name: fragNode.name,
            root: node,
            text: printOperation(printContext, fragNode.name)
          }));
        } else {
          results.push(RelayCodeGenerator.generate(node));
        }
      } // Add all the Fragments from the fragmentContext for the reader ASTs.

    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = fragmentContext.documents()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var _node = _step2.value;

        if (_node.kind === 'Fragment') {
          results.push(RelayCodeGenerator.generate(_node));
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return results;
  });
}

function printOperation(printContext, name) {
  var printableRoot = printContext.getRoot(name);
  return filterContextForNode(printableRoot, printContext).documents().map(Printer.print).join('\n');
}

module.exports = compileRelayArtifacts;