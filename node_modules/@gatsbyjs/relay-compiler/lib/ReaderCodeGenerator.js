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

var CodeMarker = require("./CodeMarker");

var IRVisitor = require("./GraphQLIRVisitor");

var SchemaUtils = require("./GraphQLSchemaUtils");

var _require = require("./RelayCompilerError"),
    createCompilerError = _require.createCompilerError,
    createUserError = _require.createUserError;

var _require2 = require("graphql"),
    GraphQLList = _require2.GraphQLList;

var _require3 = require("relay-runtime"),
    getStorageKey = _require3.getStorageKey,
    stableCopy = _require3.stableCopy;

var getRawType = SchemaUtils.getRawType,
    isAbstractType = SchemaUtils.isAbstractType,
    getNullableType = SchemaUtils.getNullableType;
/**
 * @public
 *
 * Converts a GraphQLIR node into a plain JS object representation that can be
 * used at runtime.
 */

function generate(node) {
  return IRVisitor.visit(node, ReaderCodeGenVisitor);
}

var ReaderCodeGenVisitor = {
  leave: {
    Request: function Request(node) {
      throw createCompilerError('ReaderCodeGenerator: unexpeted Request node.');
    },
    Fragment: function Fragment(node) {
      var metadata = null;

      if (node.metadata != null) {
        var _node$metadata = node.metadata,
            mask = _node$metadata.mask,
            plural = _node$metadata.plural,
            connection = _node$metadata.connection,
            refetch = _node$metadata.refetch;

        if (Array.isArray(connection)) {
          var _metadata;

          metadata = (_metadata = metadata) !== null && _metadata !== void 0 ? _metadata : {};
          metadata.connection = connection;
        }

        if (typeof mask === 'boolean') {
          var _metadata2;

          metadata = (_metadata2 = metadata) !== null && _metadata2 !== void 0 ? _metadata2 : {};
          metadata.mask = mask;
        }

        if (typeof plural === 'boolean') {
          var _metadata3;

          metadata = (_metadata3 = metadata) !== null && _metadata3 !== void 0 ? _metadata3 : {};
          metadata.plural = plural;
        }

        if (typeof refetch === 'object') {
          var _metadata4;

          metadata = (_metadata4 = metadata) !== null && _metadata4 !== void 0 ? _metadata4 : {};
          metadata.refetch = {
            connection: refetch.connection,
            operation: CodeMarker.moduleDependency(refetch.operation + '.graphql'),
            fragmentPathInResult: refetch.fragmentPathInResult
          };
        }
      }

      return {
        kind: 'Fragment',
        name: node.name,
        type: node.type.toString(),
        metadata: metadata,
        argumentDefinitions: node.argumentDefinitions,
        selections: node.selections
      };
    },
    LocalArgumentDefinition: function LocalArgumentDefinition(node) {
      return {
        kind: 'LocalArgument',
        name: node.name,
        type: node.type.toString(),
        defaultValue: node.defaultValue
      };
    },
    RootArgumentDefinition: function RootArgumentDefinition(node) {
      return {
        kind: 'RootArgument',
        name: node.name,
        type: node.type ? node.type.toString() : null
      };
    },
    Condition: function Condition(node, key, parent, ancestors) {
      if (node.condition.kind !== 'Variable') {
        throw createCompilerError("ReaderCodeGenerator: Expected 'Condition' with static value to be " + 'pruned or inlined', [node.condition.loc]);
      }

      return {
        kind: 'Condition',
        passingValue: node.passingValue,
        condition: node.condition.variableName,
        selections: node.selections
      };
    },
    FragmentSpread: function FragmentSpread(node) {
      return {
        kind: 'FragmentSpread',
        name: node.name,
        args: valuesOrNull(sortByName(node.args))
      };
    },
    InlineFragment: function InlineFragment(node) {
      return {
        kind: 'InlineFragment',
        type: node.typeCondition.toString(),
        selections: node.selections
      };
    },
    LinkedField: function LinkedField(node) {
      // Note: it is important that the arguments of this field be sorted to
      // ensure stable generation of storage keys for equivalent arguments
      // which may have originally appeared in different orders across an app.
      // TODO(T37646905) enable this invariant after splitting the
      // RelayCodeGenerator-test and running the RelayFieldHandleTransform on
      // Reader ASTs.
      //
      //   invariant(
      //     node.handles == null,
      //     'ReaderCodeGenerator: unexpected handles',
      //   );
      var type = getRawType(node.type);
      var field = {
        kind: 'LinkedField',
        alias: node.alias,
        name: node.name,
        storageKey: null,
        args: valuesOrNull(sortByName(node.args)),
        concreteType: !isAbstractType(type) ? type.toString() : null,
        plural: isPlural(node.type),
        selections: node.selections
      }; // Precompute storageKey if possible

      var storageKey = getStaticStorageKey(field, node.metadata);

      if (storageKey) {
        field = (0, _objectSpread2["default"])({}, field, {
          storageKey: storageKey
        });
      }

      return field;
    },
    MatchField: function MatchField(node, key, parent, ancestors) {
      var matchesByType = {};
      node.selections.forEach(function (selection) {
        var _regExpMatch$;

        if (selection.kind === 'ScalarField' && selection.name === '__typename') {
          // The RelayGenerateTypename transform will add a __typename selection
          // to the selections of the match field.
          return;
        }

        if (selection.kind !== 'MatchBranch') {
          throw createCompilerError("ReaderCodeGenerator: Expected selection for MatchField '".concat(node.name, "' to be a 'MatchBranch', got '").concat(selection.kind, "'."), [selection.loc]);
        }

        if (matchesByType.hasOwnProperty(selection.type)) {
          throw createCompilerError('ReaderCodeGenerator: Each @match type can appear at-most once. ' + "Type '".concat(String(selection.type), "' was duplicated."), selection.type, [selection.loc]);
        }

        var fragmentName = selection.name;
        var regExpMatch = fragmentName.match(/^([a-zA-Z][a-zA-Z0-9]*)(?:_([a-zA-Z][_a-zA-Z0-9]*))?$/);

        if (!regExpMatch) {
          throw createCompilerError('ReaderCodeGenerator: @match fragments should be named ' + "'FragmentName_propName', got '".concat(fragmentName, "'."), [selection.loc]);
        }

        var fragmentPropName = (_regExpMatch$ = regExpMatch[2]) !== null && _regExpMatch$ !== void 0 ? _regExpMatch$ : 'matchData';
        matchesByType[selection.type] = {
          fragmentPropName: fragmentPropName,
          fragmentName: fragmentName
        };
      });
      var field = {
        kind: 'MatchField',
        alias: node.alias,
        name: node.name,
        storageKey: null,
        args: valuesOrNull(sortByName(node.args)),
        matchesByType: matchesByType
      }; // Precompute storageKey if possible

      var storageKey = getStaticStorageKey(field, node.metadata);

      if (storageKey) {
        field = (0, _objectSpread2["default"])({}, field, {
          storageKey: storageKey
        });
      }

      return field;
    },
    ScalarField: function ScalarField(node) {
      // Note: it is important that the arguments of this field be sorted to
      // ensure stable generation of storage keys for equivalent arguments
      // which may have originally appeared in different orders across an app.
      // TODO(T37646905) enable this invariant after splitting the
      // RelayCodeGenerator-test and running the RelayFieldHandleTransform on
      // Reader ASTs.
      //
      //   invariant(
      //     node.handles == null,
      //     'ReaderCodeGenerator: unexpected handles',
      var field = {
        kind: 'ScalarField',
        alias: node.alias,
        name: node.name,
        args: valuesOrNull(sortByName(node.args)),
        storageKey: null
      }; // Precompute storageKey if possible

      var storageKey = getStaticStorageKey(field, node.metadata);

      if (storageKey) {
        field = (0, _objectSpread2["default"])({}, field, {
          storageKey: storageKey
        });
      }

      return field;
    },
    SplitOperation: function SplitOperation(node, key, parent) {
      return {
        kind: 'SplitOperation',
        name: node.name,
        metadata: null,
        selections: node.selections
      };
    },
    Variable: function Variable(node, key, parent) {
      return {
        kind: 'Variable',
        name: parent.name,
        variableName: node.variableName,
        type: parent.type ? parent.type.toString() : null
      };
    },
    Literal: function Literal(node, key, parent) {
      return {
        kind: 'Literal',
        name: parent.name,
        value: stableCopy(node.value),
        type: parent.type ? parent.type.toString() : null
      };
    },
    Argument: function Argument(node, key, parent, ancestors) {
      if (!['Variable', 'Literal'].includes(node.value.kind)) {
        var valueString = JSON.stringify(node.value, null, 2);
        throw createUserError('ReaderCodeGenerator: Complex argument values (Lists or ' + 'InputObjects with nested variables) are not supported.', [node.value.loc]);
      }

      return node.value.value !== null ? node.value : null;
    }
  }
};

function isPlural(type) {
  return getNullableType(type) instanceof GraphQLList;
}

function valuesOrNull(array) {
  return !array || array.length === 0 ? null : array;
}

function sortByName(array) {
  return array instanceof Array ? array.slice().sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  }) : array;
}
/**
 * Pre-computes storage key if possible and advantageous. Storage keys are
 * generated for fields with supplied arguments that are all statically known
 * (ie. literals, no variables) at build time.
 */


function getStaticStorageKey(field, metadata) {
  var metadataStorageKey = metadata === null || metadata === void 0 ? void 0 : metadata.storageKey;

  if (typeof metadataStorageKey === 'string') {
    return metadataStorageKey;
  }

  if (!field.args || field.args.length === 0 || field.args.some(function (arg) {
    return arg.kind !== 'Literal';
  })) {
    return null;
  }

  return getStorageKey(field, {});
}

module.exports = {
  generate: generate
};