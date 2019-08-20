/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 * 
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var GraphQLCompilerContext = require("./GraphQLCompilerContext");

var GraphQLIRTransformer = require("./GraphQLIRTransformer");

var GraphQLSchemaUtils = require("./GraphQLSchemaUtils");

var areEqual = require("./areEqualOSS");

var getIdentifierForSelection = require("./getIdentifierForSelection");

var _require = require("./RelayCompilerError"),
    createUserError = _require.createUserError,
    createCompilerError = _require.createCompilerError;

var getRawType = GraphQLSchemaUtils.getRawType,
    isAbstractType = GraphQLSchemaUtils.isAbstractType;

/**
 * Transform that flattens inline fragments, fragment spreads, and conditionals.
 *
 * Inline fragments are inlined (replaced with their selections) when:
 * - The fragment type matches the type of its parent.
 * - The fragment has an abstract type and the `flattenAbstractTypes` option has
 *   been set.
 * - The 'flattenInlineFragments' option has been set.
 */
function flattenTransformImpl(context, options) {
  var state = {
    flattenAbstractTypes: !!(options && options.flattenAbstractTypes),
    flattenInlineFragments: !!(options && options.flattenInlineFragments),
    parentType: null
  };
  return GraphQLIRTransformer.transform(context, {
    Root: flattenSelections,
    Fragment: flattenSelections,
    Condition: flattenSelections,
    InlineFragment: flattenSelections,
    LinkedField: flattenSelections,
    MatchField: flattenSelections
  }, function () {
    return state;
  });
}
/**
 * @private
 */


function flattenSelections(node, state) {
  // Determine the current type.
  var parentType = state.parentType;
  var type = node.kind === 'Condition' || node.kind === 'Defer' || node.kind === 'Stream' ? parentType : node.kind === 'InlineFragment' ? node.typeCondition : node.type;

  if (type == null) {
    throw createCompilerError('FlattenTransform: Expected a parent type.', [node.loc]);
  } // Flatten the selections in this node, creating a new node with flattened
  // selections if possible, then deeply traverse the flattened node, while
  // keeping track of the parent type.


  var nextSelections = new Map();
  var hasFlattened = flattenSelectionsInto(nextSelections, node, state, type);
  var flattenedNode = hasFlattened ? (0, _objectSpread2["default"])({}, node, {
    selections: Array.from(nextSelections.values())
  }) : node;
  state.parentType = type;
  var deeplyFlattenedNode = this.traverse(flattenedNode, state);
  state.parentType = parentType;
  return deeplyFlattenedNode;
}
/**
 * @private
 */


function flattenSelectionsInto(flattenedSelections, node, state, type) {
  var hasFlattened = false;
  node.selections.forEach(function (selection) {
    if (selection.kind === 'InlineFragment' && shouldFlattenInlineFragment(selection, state, type)) {
      hasFlattened = true;
      flattenSelectionsInto(flattenedSelections, selection, state, type);
      return;
    }

    var nodeIdentifier = getIdentifierForSelection(selection);
    var flattenedSelection = flattenedSelections.get(nodeIdentifier); // If this selection hasn't been seen before, keep track of it.

    if (!flattenedSelection) {
      flattenedSelections.set(nodeIdentifier, selection);
      return;
    } // Otherwise a similar selection exists which should be merged.


    hasFlattened = true;

    if (flattenedSelection.kind === 'InlineFragment') {
      if (selection.kind !== 'InlineFragment') {
        throw createCompilerError("FlattenTransform: Expected an InlineFragment, got a '".concat(selection.kind, "'"), [selection.loc]);
      }

      flattenedSelections.set(nodeIdentifier, (0, _objectSpread2["default"])({}, flattenedSelection, {
        selections: mergeSelections(flattenedSelection, selection, state, selection.typeCondition)
      }));
    } else if (flattenedSelection.kind === 'Condition') {
      if (selection.kind !== 'Condition') {
        throw createCompilerError("FlattenTransform: Expected a Condition, got a '".concat(selection.kind, "'"), [selection.loc]);
      }

      flattenedSelections.set(nodeIdentifier, (0, _objectSpread2["default"])({}, flattenedSelection, {
        selections: mergeSelections(flattenedSelection, selection, state, type)
      }));
    } else if (flattenedSelection.kind === 'FragmentSpread') {// Ignore duplicate fragment spreads.
    } else if (flattenedSelection.kind === 'MatchField' || flattenedSelection.kind === 'MatchBranch') {// Ignore duplicate matches that select the same fragments and
      // modules (encoded in the identifier)
      // Also ignore incremental data placeholders
    } else if (flattenedSelection.kind === 'Defer') {
      if (selection.kind !== 'Defer') {
        throw createCompilerError("FlattenTransform: Expected a Defer, got a '".concat(selection.kind, "'"), [selection.loc]);
      }

      flattenedSelections.set(nodeIdentifier, (0, _objectSpread2["default"])({
        kind: 'Defer'
      }, flattenedSelection, {
        selections: mergeSelections(flattenedSelection, selection, state, type)
      }));
    } else if (flattenedSelection.kind === 'Stream') {
      if (selection.kind !== 'Stream') {
        throw createCompilerError("FlattenTransform: Expected a Stream, got a '".concat(selection.kind, "'"), [selection.loc]);
      }

      flattenedSelections.set(nodeIdentifier, (0, _objectSpread2["default"])({
        kind: 'Stream'
      }, flattenedSelection, {
        selections: mergeSelections(flattenedSelection, selection, state, type)
      }));
    } else if (flattenedSelection.kind === 'LinkedField') {
      if (selection.kind !== 'LinkedField') {
        throw createCompilerError("FlattenTransform: Expected a LinkedField, got a '".concat(selection.kind, "'"), [selection.loc]);
      } // Note: arguments are intentionally reversed to avoid rebuilds


      assertUniqueArgsForAlias(selection, flattenedSelection);
      flattenedSelections.set(nodeIdentifier, (0, _objectSpread2["default"])({
        kind: 'LinkedField'
      }, flattenedSelection, {
        handles: mergeHandles(flattenedSelection, selection),
        selections: mergeSelections(flattenedSelection, selection, state, selection.type)
      }));
    } else if (flattenedSelection.kind === 'ScalarField') {
      if (selection.kind !== 'ScalarField') {
        throw createCompilerError("FlattenTransform: Expected a ScalarField, got a '".concat(selection.kind, "'"), [selection.loc]);
      } // Note: arguments are intentionally reversed to avoid rebuilds


      assertUniqueArgsForAlias(selection, flattenedSelection);
      flattenedSelections.set(nodeIdentifier, (0, _objectSpread2["default"])({
        kind: 'ScalarField'
      }, flattenedSelection, {
        // Note: arguments are intentionally reversed to avoid rebuilds
        handles: mergeHandles(selection, flattenedSelection)
      }));
    } else {
      flattenedSelection.kind;
      throw createCompilerError("FlattenTransform: Unknown kind '".concat(flattenedSelection.kind, "'"));
    }
  });
  return hasFlattened;
}
/**
 * @private
 */


function mergeSelections(nodeA, nodeB, state, type) {
  var flattenedSelections = new Map();
  flattenSelectionsInto(flattenedSelections, nodeA, state, type);
  flattenSelectionsInto(flattenedSelections, nodeB, state, type);
  return Array.from(flattenedSelections.values());
}
/**
 * @private
 * TODO(T19327202) This is redundant with OverlappingFieldsCanBeMergedRule once
 * it can be enabled.
 */


function assertUniqueArgsForAlias(field, otherField) {
  if (!areEqualFields(field, otherField)) {
    var _field$alias;

    throw createUserError('Expected all fields on the same parent with ' + "the name or alias '".concat((_field$alias = field.alias) !== null && _field$alias !== void 0 ? _field$alias : field.name, "' to have the same name and arguments."), [field.loc, otherField.loc]);
  }
}
/**
 * @private
 */


function shouldFlattenInlineFragment(fragment, state, type) {
  return state.flattenInlineFragments || fragment.typeCondition.name === getRawType(type).name || state.flattenAbstractTypes && isAbstractType(fragment.typeCondition);
}
/**
 * @private
 *
 * Verify that two fields are equal in all properties other than their
 * selections.
 */


function areEqualFields(thisField, thatField) {
  return thisField.kind === thatField.kind && thisField.name === thatField.name && thisField.alias === thatField.alias && areEqualArgs(thisField.args, thatField.args);
}
/**
 * Verify that two sets of arguments are equivalent - same argument names
 * and values. Notably this ignores the types of arguments and values, which
 * may not always be inferred identically.
 */


function areEqualArgs(thisArgs, thatArgs) {
  return thisArgs.length === thatArgs.length && thisArgs.every(function (thisArg, index) {
    var thatArg = thatArgs[index];
    return thisArg.name === thatArg.name && thisArg.value.kind === thatArg.value.kind && thisArg.value.variableName === thatArg.value.variableName && areEqual(thisArg.value.value, thatArg.value.value);
  });
}
/**
 * @private
 */


function mergeHandles(nodeA, nodeB) {
  if (!nodeA.handles) {
    return nodeB.handles;
  }

  if (!nodeB.handles) {
    return nodeA.handles;
  }

  var uniqueItems = new Map();
  nodeA.handles.concat(nodeB.handles).forEach(function (item) {
    return uniqueItems.set(item.name + item.key, item);
  });
  return Array.from(uniqueItems.values());
}

function transformWithOptions(options) {
  return function flattenTransform(context) {
    return flattenTransformImpl(context, options);
  };
}

module.exports = {
  transformWithOptions: transformWithOptions
};