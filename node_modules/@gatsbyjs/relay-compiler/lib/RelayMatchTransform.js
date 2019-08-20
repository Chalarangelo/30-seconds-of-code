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

var CompilerContext = require("./GraphQLCompilerContext");

var IRTransformer = require("./GraphQLIRTransformer");

var getLiteralArgumentValues = require("./getLiteralArgumentValues");

var getNormalizationOperationName = require("./getNormalizationOperationName");

var _require = require("./GraphQLSchemaUtils"),
    getRawType = _require.getRawType;

var _require2 = require("./RelayCompilerError"),
    createUserError = _require2.createUserError;

var _require3 = require("graphql"),
    GraphQLObjectType = _require3.GraphQLObjectType,
    GraphQLScalarType = _require3.GraphQLScalarType,
    GraphQLInterfaceType = _require3.GraphQLInterfaceType,
    GraphQLUnionType = _require3.GraphQLUnionType,
    GraphQLList = _require3.GraphQLList,
    GraphQLString = _require3.GraphQLString,
    getNullableType = _require3.getNullableType;

var SUPPORTED_ARGUMENT_NAME = 'supported';
var JS_FIELD_TYPE = 'JSDependency';
var JS_FIELD_ARG = 'module';
var JS_FIELD_NAME = 'js';
var SCHEMA_EXTENSION = "\n  directive @match on FIELD\n\n  directive @module(\n    name: String!\n  ) on FRAGMENT_SPREAD\n";
/**
 * This transform rewrites LinkedField nodes with @match and rewrites them
 * into MatchField nodes with a `supported` argument and MatchBranch selections.
 */

function relayMatchTransform(context) {
  return IRTransformer.transform(context, {
    // $FlowFixMe this transform intentionally changes the AST node type
    LinkedField: visitLinkedField,
    InlineFragment: visitInlineFragment
  }, function (node) {
    return node.type;
  });
}

function visitInlineFragment(node, state) {
  return this.traverse(node, node.typeCondition);
}

function visitLinkedField(node, parentType) {
  var _transformedNode$alia;

  var transformedNode = this.traverse(node, node.type);
  var matchDirective = transformedNode.directives.find(function (directive) {
    return directive.name === 'match';
  });

  if (matchDirective == null) {
    return transformedNode;
  }

  var rawType = getRawType(parentType);

  if (!(rawType instanceof GraphQLInterfaceType || rawType instanceof GraphQLObjectType)) {
    throw createUserError('@match may only be used on fields whose parent type is an interface ' + "or object, field '".concat(node.name, "' has invalid type '").concat(String(parentType), "'"), [node.loc]);
  }

  var context = this.getContext();
  var schema = context.serverSchema;
  var jsModuleType = schema.getType(JS_FIELD_TYPE);

  if (jsModuleType == null || !(jsModuleType instanceof GraphQLScalarType)) {
    throw new Error("RelayMatchTransform: Expected schema to define a scalar '".concat(JS_FIELD_TYPE, "' type."));
  }

  var currentField = rawType.getFields()[transformedNode.name];
  var supportedArg = currentField.args.find(function (_ref2) {
    var name = _ref2.name;
    return SUPPORTED_ARGUMENT_NAME;
  });
  var supportedArgType = supportedArg != null ? getNullableType(supportedArg.type) : null;
  var supportedArgOfType = supportedArgType != null && supportedArgType instanceof GraphQLList ? supportedArgType.ofType : null;

  if (supportedArg == null || supportedArgType == null || supportedArgOfType == null || getNullableType(supportedArgOfType) !== GraphQLString) {
    throw new Error('RelayMatchTransform: @match used on an incompatible ' + "field '".concat(transformedNode.name, "'. @match may only ") + "be used with fields that can accept '".concat(SUPPORTED_ARGUMENT_NAME, "' ") + "argument with type '[String!]!'.");
  }

  var unionType = transformedNode.type;

  if (!(unionType instanceof GraphQLUnionType)) {
    throw new Error('RelayMatchTransform: You are trying to apply @match ' + "directive to a field '".concat(transformedNode.name, "' that has unsupported ") + "output type. '".concat(transformedNode.name, "' output type should be union ") + 'type of object types.');
  }

  var seenTypes = new Map();
  var typeToSelectionMap = {};
  var selections = [];
  transformedNode.selections.forEach(function (matchSelection) {
    var _ref, _moduleDirective$args;

    if (matchSelection.kind !== 'FragmentSpread') {
      throw new Error('RelayMatchTransform: all selections in a @match field should be ' + "fragment spreads, got '".concat(matchSelection.kind, "'."));
    }

    var fragment = context.getFragment(matchSelection.name);

    if (!(fragment.type instanceof GraphQLObjectType)) {
      throw new Error('RelayMatchTransform: all fragment spreads in a @match field should ' + 'be for fragments on an object type. Union or interface type ' + "'".concat(fragment.type.name, "' for '...").concat(fragment.name, "' is not supported."));
    }

    var matchedType = fragment.type;

    if (seenTypes.has(matchedType)) {
      throw new Error('RelayMatchTransform: Each "match" type has to appear at-most once. ' + "Type '".concat(matchedType.name, "' was matched in both ") + "'...".concat(matchSelection.name, "' and '...").concat(seenTypes.get(matchedType) || '(unknown)', "'."));
    }

    seenTypes.set(matchedType, matchSelection.name);
    var belongsToUnion = unionType.getTypes().includes(matchedType);

    if (!belongsToUnion) {
      throw new Error("RelayMatchTransform: Unsupported type '".concat(matchedType.toString(), "' in ") + 'the list of matches in the @match. Type ' + "\"".concat(matchedType.toString(), "\" does not belong to the union ") + "\"".concat(unionType.toString(), "\"."));
    }

    var jsField = matchedType.getFields()[JS_FIELD_NAME];
    var jsFieldArg = jsField ? jsField.args.find(function (arg) {
      return arg.name === JS_FIELD_ARG;
    }) : null;

    if (jsField == null || jsFieldArg == null || getNullableType(jsFieldArg.type) !== GraphQLString || jsField.type.name !== jsModuleType.name // object identity fails in tests
    ) {
        throw new Error("RelayMatchTransform: expcted type '".concat(matchedType.name, "' to have a '").concat(JS_FIELD_NAME, "(").concat(JS_FIELD_ARG, ": String!): ").concat(JS_FIELD_TYPE, "' field ."));
      }

    var moduleDirective = matchSelection.directives.find(function (directive) {
      return directive.name === 'module';
    });

    if (moduleDirective == null || matchSelection.directives.length !== 1) {
      throw new Error('RelayMatchTransform: Fragment spreads in a @match field must have a ' + "'@module' directive and no other directives, got invalid directives " + "on fragment spread '...".concat(matchSelection.name, "'"));
    }

    var moduleDirectiveArgs = getLiteralArgumentValues(moduleDirective.args);
    typeToSelectionMap[String(matchedType)] = {
      component: moduleDirectiveArgs.name,
      fragment: matchSelection.name
    };
    var normalizationName = getNormalizationOperationName(matchSelection.name) + '.graphql';
    var moduleField = {
      alias: '__match_component',
      args: [{
        kind: 'Argument',
        name: JS_FIELD_ARG,
        type: jsFieldArg.type,
        value: {
          kind: 'Literal',
          loc: (_ref = (_moduleDirective$args = moduleDirective.args[0]) === null || _moduleDirective$args === void 0 ? void 0 : _moduleDirective$args.loc) !== null && _ref !== void 0 ? _ref : moduleDirective.loc,
          metadata: {},
          value: moduleDirectiveArgs.name
        },
        loc: moduleDirective.loc,
        metadata: {}
      }],
      directives: [],
      handles: null,
      kind: 'ScalarField',
      loc: moduleDirective.loc,
      metadata: {
        storageKey: '__match_component'
      },
      name: JS_FIELD_NAME,
      type: jsModuleType
    };
    var fragmentField = {
      alias: '__match_fragment',
      args: [{
        kind: 'Argument',
        name: JS_FIELD_ARG,
        type: jsFieldArg.type,
        value: {
          kind: 'Literal',
          loc: matchSelection.loc,
          metadata: {},
          value: normalizationName
        },
        loc: matchSelection.loc,
        metadata: {}
      }],
      directives: [],
      handles: null,
      kind: 'ScalarField',
      loc: matchSelection.loc,
      metadata: {
        storageKey: '__match_fragment'
      },
      name: JS_FIELD_NAME,
      type: jsModuleType
    };
    selections.push({
      kind: 'MatchBranch',
      loc: matchSelection.loc,
      module: moduleDirectiveArgs.name,
      name: matchSelection.name,
      selections: [{
        args: [],
        directives: [],
        kind: 'FragmentSpread',
        loc: matchSelection.loc,
        metadata: {},
        name: matchSelection.name
      }, {
        directives: [],
        kind: 'InlineFragment',
        loc: matchSelection.loc,
        metadata: {},
        selections: [moduleField, fragmentField],
        typeCondition: matchedType
      }],
      type: matchedType
    });
  });
  var stableArgs = [];
  Object.keys(typeToSelectionMap).sort().forEach(function (typeName) {
    var _typeToSelectionMap$t = typeToSelectionMap[typeName],
        component = _typeToSelectionMap$t.component,
        fragment = _typeToSelectionMap$t.fragment;
    stableArgs.push("".concat(fragment, ":").concat(component));
  });
  var storageKey = ((_transformedNode$alia = transformedNode.alias) !== null && _transformedNode$alia !== void 0 ? _transformedNode$alia : transformedNode.name) + "(".concat(stableArgs.join(','), ")");
  var matchField = {
    kind: 'MatchField',
    alias: transformedNode.alias,
    args: [{
      kind: 'Argument',
      name: SUPPORTED_ARGUMENT_NAME,
      type: supportedArg.type,
      value: {
        kind: 'Literal',
        loc: node.loc,
        metadata: {},
        value: Array.from(seenTypes.keys()).map(function (type) {
          return type.name;
        })
      },
      loc: node.loc,
      metadata: {}
    }],
    directives: [],
    handles: null,
    loc: node.loc,
    metadata: {
      storageKey: storageKey
    },
    name: transformedNode.name,
    type: unionType,
    selections: selections
  }; // $FlowFixMe intentionally changing the result type in this transform

  return matchField;
}

module.exports = {
  SCHEMA_EXTENSION: SCHEMA_EXTENSION,
  transform: relayMatchTransform
};