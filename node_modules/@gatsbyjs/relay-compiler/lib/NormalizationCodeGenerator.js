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
  if (node.kind !== 'Root' && node.kind !== 'SplitOperation') {
    throw createCompilerError("NormalizationCodeGenerator: Unsupported AST kind '".concat(node.kind, "'."), [node.loc]);
  }

  return IRVisitor.visit(node, NormalizationCodeGenVisitor);
}

var NormalizationCodeGenVisitor = {
  leave: {
    Root: function Root(node) {
      return {
        kind: 'Operation',
        name: node.name,
        argumentDefinitions: node.argumentDefinitions,
        selections: flattenArray(node.selections)
      };
    },
    Request: function Request(node) {
      throw createCompilerError('NormalizationCodeGenerator: unexpected Request node.');
    },
    Fragment: function Fragment(node) {
      throw createCompilerError('NormalizationCodeGenerator: unexpected Fragment node.');
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
        throw createCompilerError("NormalizationCodeGenerator: Expected 'Condition' with static " + 'value to be pruned or inlined', [node.condition.loc]);
      }

      return {
        kind: 'Condition',
        passingValue: node.passingValue,
        condition: node.condition.variableName,
        selections: flattenArray(node.selections)
      };
    },
    Defer: function Defer(node, key, parent, ancestors) {
      var _node$if2;

      if (!(node["if"] == null || node["if"].kind === 'Variable' || node["if"].kind === 'Literal' && node["if"].value === true)) {
        var _ref, _node$if;

        throw createCompilerError('NormalizationCodeGenerator: Expected @defer `if` condition to be ' + 'a variable, unspecified, or the literal `true`.', [(_ref = (_node$if = node["if"]) === null || _node$if === void 0 ? void 0 : _node$if.loc) !== null && _ref !== void 0 ? _ref : node.loc]);
      }

      return {
        "if": ((_node$if2 = node["if"]) === null || _node$if2 === void 0 ? void 0 : _node$if2.kind) === 'Variable' ? node["if"].variableName : null,
        kind: 'Defer',
        label: node.label,
        metadata: node.metadata,
        selections: flattenArray(node.selections)
      };
    },
    FragmentSpread: function FragmentSpread(node) {
      // TODO(T37646905) enable this invariant after splitting the
      // RelayCodeGenerator-test and running the InlineFragmentsTransform on
      // normalization ASTs.
      //
      //   throw new Error(
      //     'NormalizationCodeGenerator: unexpected FragmentSpread node.',
      //   );
      return [];
    },
    InlineFragment: function InlineFragment(node) {
      return {
        kind: 'InlineFragment',
        type: node.typeCondition.toString(),
        selections: flattenArray(node.selections)
      };
    },
    LinkedField: function LinkedField(node) {
      // Note: it is important that the arguments of this field be sorted to
      // ensure stable generation of storage keys for equivalent arguments
      // which may have originally appeared in different orders across an app.
      var handles = node.handles && node.handles.map(function (handle) {
        return {
          kind: 'LinkedHandle',
          alias: node.alias,
          name: node.name,
          args: valuesOrNull(sortByName(node.args)),
          handle: handle.name,
          key: handle.key,
          filters: handle.filters
        };
      }) || [];
      var type = getRawType(node.type);
      var field = {
        kind: 'LinkedField',
        alias: node.alias,
        name: node.name,
        storageKey: null,
        args: valuesOrNull(sortByName(node.args)),
        concreteType: !isAbstractType(type) ? type.toString() : null,
        plural: isPlural(node.type),
        selections: flattenArray(node.selections)
      }; // Precompute storageKey if possible

      var storageKey = getStaticStorageKey(field, node.metadata);

      if (storageKey) {
        field = (0, _objectSpread2["default"])({}, field, {
          storageKey: storageKey
        });
      }

      return [field].concat(handles);
    },
    MatchField: function MatchField(node, key, parent, ancestors) {
      var selections = flattenArray(node.selections);
      var matchesByType = {};
      selections.forEach(function (selection) {
        var _regExpMatch$;

        if (selection.kind === 'ScalarField' && selection.name === '__typename') {
          // The RelayGenerateTypename transform will add a __typename selection
          // to the selections of the match field.
          return;
        }

        if (selection.kind !== 'MatchBranch') {
          throw createCompilerError("NormalizationCodeGenerator: Expected selection for MatchField '".concat(node.name, "' to be a 'MatchBranch', got '").concat(selection.kind, "'."), [selection.loc]);
        }

        if (matchesByType.hasOwnProperty(selection.type)) {
          throw createCompilerError('NormalizationCodeGenerator: Each @match type can appear at-most ' + "once. Type '".concat(String(selection.type), "' was duplicated."), selection.type, [selection.loc]);
        }

        var fragmentName = selection.name;
        var regExpMatch = fragmentName.match(/^([a-zA-Z][a-zA-Z0-9]*)(?:_([a-zA-Z][_a-zA-Z0-9]*))?$/);

        if (!regExpMatch) {
          throw createCompilerError('NormalizationCodeGenerator: @match fragments should be named ' + "'FragmentName_propName', got '".concat(fragmentName, "'."), [selection.loc]);
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
      var handles = node.handles && node.handles.map(function (handle) {
        return {
          kind: 'ScalarHandle',
          alias: node.alias,
          name: node.name,
          args: valuesOrNull(sortByName(node.args)),
          handle: handle.name,
          key: handle.key,
          filters: handle.filters
        };
      }) || [];
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

      return [field].concat(handles);
    },
    SplitOperation: function SplitOperation(node, key, parent) {
      return {
        kind: 'SplitOperation',
        name: node.name,
        metadata: node.metadata,
        selections: flattenArray(node.selections)
      };
    },
    Stream: function Stream(node, key, parent, ancestors) {
      var _node$if4;

      if (!(node["if"] == null || node["if"].kind === 'Variable' || node["if"].kind === 'Literal' && node["if"].value === true)) {
        var _ref2, _node$if3;

        throw createCompilerError('NormalizationCodeGenerator: Expected @stream `if` condition to be ' + 'a variable, unspecified, or the literal `true`.', [(_ref2 = (_node$if3 = node["if"]) === null || _node$if3 === void 0 ? void 0 : _node$if3.loc) !== null && _ref2 !== void 0 ? _ref2 : node.loc]);
      }

      return {
        "if": ((_node$if4 = node["if"]) === null || _node$if4 === void 0 ? void 0 : _node$if4.kind) === 'Variable' ? node["if"].variableName : null,
        kind: 'Stream',
        label: node.label,
        metadata: node.metadata,
        selections: flattenArray(node.selections)
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
        throw createUserError('RelayCodeGenerator: Complex argument values (Lists or ' + 'InputObjects with nested variables) are not supported.', [node.value.loc]);
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

function flattenArray(array) {
  return array ? Array.prototype.concat.apply([], array) : [];
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