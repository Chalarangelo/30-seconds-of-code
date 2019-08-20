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

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var GraphQLCompilerContext = require("./GraphQLCompilerContext");

var GraphQLIRTransformer = require("./GraphQLIRTransformer");

var IMap = require("immutable").Map;

var getIdentifierForSelection = require("./getIdentifierForSelection");

var invariant = require("fbjs/lib/invariant");

/**
 * A transform that removes redundant fields and fragment spreads. Redundancy is
 * defined in this context as any selection that is guaranteed to already be
 * fetched by an ancestor selection. This can occur in two cases:
 *
 * 1. Simple duplicates at the same level of the document can always be skipped:
 *
 * ```
 * fragment Foo on FooType {
 *   id
 *   id
 *   ...Bar
 *   ...Bar
 * }
 * ```
 *
 * Becomes
 *
 * ```
 * fragment Foo on FooType {
 *   id
 *   ...Bar
 * }
 * ```
 *
 * 2. Inline fragments and conditions introduce the possibility for duplication
 * at different levels of the tree. Whenever a selection is fetched in a parent,
 * it is redundant to also fetch it in a child:
 *
 * ```
 * fragment Foo on FooType {
 *   id
 *   ... on OtherType {
 *     id # 1
 *   }
 *   ... on FooType @include(if: $cond) {
 *     id # 2
 *   }
 * }
 * ```
 *
 * Becomes:
 *
 * ```
 * fragment Foo on FooType {
 *   id
 * }
 * ```
 *
 * In this example:
 * - 1 can be skipped because `id` is already fetched by the parent. Even
 *   though the type is different (FooType/OtherType), the inline fragment
 *   cannot match without the outer fragment matching so the outer `id` is
 *   guaranteed to already be fetched.
 * - 2 can be skipped for similar reasons: it doesn't matter if the condition
 *   holds, `id` is already fetched by the parent regardless.
 *
 * This transform also handles more complicated cases in which selections are
 * nested:
 *
 * ```
 * fragment Foo on FooType {
 *   a {
 *     bb
 *   }
 *   ... on OtherType {
 *     a {
 *       bb # 1
 *       cc
 *     }
 *   }
 *  }
 * ```
 *
 * Becomes
 *
 * ```
 * fragment Foo on FooType {
 *   a {
 *     bb
 *   }
 *   ... on OtherType {
 *     a {
 *       cc
 *     }
 *   }
 *  }
 * ```
 *
 * 1 can be skipped because it is already fetched at the outer level.
 */
function skipRedundantNodesTransform(context) {
  return GraphQLIRTransformer.transform(context, {
    Root: visitNode,
    Fragment: visitNode
  });
}

function visitNode(node) {
  return transformNode(node, new IMap()).node;
}
/**
 * The most straightforward approach would be two passes: one to record the
 * structure of the document, one to prune duplicates. This implementation uses
 * a single pass. Selections are sorted with fields first, "conditionals"
 * (inline fragments & conditions) last. This means that all fields that are
 * guaranteed to be fetched are encountered prior to any duplicates that may be
 * fetched within a conditional.
 *
 * Because selections fetched within a conditional are not guaranteed to be
 * fetched in the parent, a fork of the selection map is created when entering a
 * conditional. The sort ensures that guaranteed fields have already been seen
 * prior to the clone.
 */


function transformNode(node, selectionMap) {
  var selections = [];
  sortSelections(node.selections).forEach(function (selection) {
    var identifier = getIdentifierForSelection(selection);

    switch (selection.kind) {
      case 'ScalarField':
      case 'FragmentSpread':
        {
          if (!selectionMap.has(identifier)) {
            selections.push(selection);
            selectionMap = selectionMap.set(identifier, null);
          }

          break;
        }

      case 'Defer':
      case 'Stream':
      case 'MatchBranch':
      case 'MatchField':
      case 'LinkedField':
        {
          var transformed = transformNode(selection, selectionMap.get(identifier) || new IMap());

          if (transformed.node) {
            selections.push(transformed.node);
            selectionMap = selectionMap.set(identifier, transformed.selectionMap);
          }

          break;
        }

      case 'InlineFragment':
      case 'Condition':
        {
          // Fork the selection map to prevent conditional selections from
          // affecting the outer "guaranteed" selections.
          var _transformed = transformNode(selection, selectionMap.get(identifier) || selectionMap);

          if (_transformed.node) {
            selections.push(_transformed.node);
            selectionMap = selectionMap.set(identifier, _transformed.selectionMap);
          }

          break;
        }

      default:
        selection;
        !false ? process.env.NODE_ENV !== "production" ? invariant(false, 'SkipRedundantNodesTransform: Unexpected node kind `%s`.', selection.kind) : invariant(false) : void 0;
    }
  });
  var nextNode = selections.length ? (0, _objectSpread2["default"])({}, node, {
    selections: selections
  }) : null;
  return {
    selectionMap: selectionMap,
    node: nextNode
  };
}
/**
 * Sort inline fragments and conditions after other selections.
 */


function sortSelections(selections) {
  return (0, _toConsumableArray2["default"])(selections).sort(function (a, b) {
    return a.kind === 'InlineFragment' || a.kind === 'Condition' ? 1 : b.kind === 'InlineFragment' || b.kind === 'Condition' ? -1 : 0;
  });
}

module.exports = {
  transform: skipRedundantNodesTransform
};