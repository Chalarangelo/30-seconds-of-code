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

var IRTransformer = require("./GraphQLIRTransformer");

var RelayParser = require("./RelayParser");

var SchemaUtils = require("./GraphQLSchemaUtils");

var getLiteralArgumentValues = require("./getLiteralArgumentValues");

var _require = require("./RelayCompilerError"),
    createCompilerError = _require.createCompilerError,
    createUserError = _require.createUserError;

var _require2 = require("./RelayConnectionConstants"),
    AFTER = _require2.AFTER,
    BEFORE = _require2.BEFORE,
    FIRST = _require2.FIRST,
    KEY = _require2.KEY,
    LAST = _require2.LAST;

var _require3 = require("graphql"),
    assertCompositeType = _require3.assertCompositeType,
    GraphQLInterfaceType = _require3.GraphQLInterfaceType,
    GraphQLList = _require3.GraphQLList,
    GraphQLObjectType = _require3.GraphQLObjectType,
    GraphQLScalarType = _require3.GraphQLScalarType,
    GraphQLUnionType = _require3.GraphQLUnionType,
    parse = _require3.parse;

var _require4 = require("relay-runtime"),
    ConnectionInterface = _require4.ConnectionInterface;

var CONNECTION = 'connection';
var HANDLER = 'handler';
/**
 * @public
 *
 * Transforms fields with the `@connection` directive:
 * - Verifies that the field type is connection-like.
 * - Adds a `handle` property to the field, either the user-provided `handle`
 *   argument or the default value "connection".
 * - Inserts a sub-fragment on the field to ensure that standard connection
 *   fields are fetched (e.g. cursors, node ids, page info).
 */

function relayConnectionTransform(context) {
  return IRTransformer.transform(context, {
    Fragment: visitFragmentOrRoot,
    LinkedField: visitLinkedOrMatchField,
    MatchField: visitLinkedOrMatchField,
    Root: visitFragmentOrRoot
  }, function (node) {
    return {
      path: [],
      connectionMetadata: [],
      definitionName: node.name
    };
  });
}

var SCHEMA_EXTENSION = 'directive @connection(key: String!, filters: [String], handler: String) on FIELD';
/**
 * @internal
 */

function visitFragmentOrRoot(node, options) {
  var transformedNode = this.traverse(node, options);
  var connectionMetadata = options.connectionMetadata;

  if (connectionMetadata.length) {
    return (0, _objectSpread2["default"])({}, transformedNode, {
      metadata: (0, _objectSpread2["default"])({}, transformedNode.metadata, {
        connection: connectionMetadata
      })
    });
  }

  return transformedNode;
}
/**
 * @internal
 */


function visitLinkedOrMatchField(field, options) {
  var _handler;

  var isPlural = SchemaUtils.getNullableType(field.type) instanceof GraphQLList;
  options.path.push(isPlural ? null : field.alias || field.name);
  var transformedField = this.traverse(field, options);
  var connectionDirective = field.directives.find(function (directive) {
    return directive.name === CONNECTION;
  });

  if (!connectionDirective) {
    options.path.pop();
    return transformedField;
  }

  var definitionName = options.definitionName;
  validateConnectionSelection(definitionName, transformedField);
  validateConnectionType(definitionName, transformedField);
  var pathHasPlural = options.path.includes(null);
  var firstArg = findArg(transformedField, FIRST);
  var lastArg = findArg(transformedField, LAST);
  var direction = null;
  var countArg = null;
  var cursorArg = null;

  if (firstArg && !lastArg) {
    direction = 'forward';
    countArg = firstArg;
    cursorArg = findArg(transformedField, AFTER);
  } else if (lastArg && !firstArg) {
    direction = 'backward';
    countArg = lastArg;
    cursorArg = findArg(transformedField, BEFORE);
  } else if (lastArg && firstArg) {
    direction = 'bidirectional'; // TODO(T26511885) Maybe add connection metadata to this case
  }

  var countVariable = countArg && countArg.value.kind === 'Variable' ? countArg.value.variableName : null;
  var cursorVariable = cursorArg && cursorArg.value.kind === 'Variable' ? cursorArg.value.variableName : null;
  options.connectionMetadata.push({
    count: countVariable,
    cursor: cursorVariable,
    direction: direction,
    path: pathHasPlural ? null : (0, _toConsumableArray2["default"])(options.path)
  });
  options.path.pop();

  var _getLiteralArgumentVa = getLiteralArgumentValues(connectionDirective.args),
      handler = _getLiteralArgumentVa.handler,
      key = _getLiteralArgumentVa.key,
      filters = _getLiteralArgumentVa.filters;

  if (handler != null && typeof handler !== 'string') {
    var _ref, _handleArg$value;

    var handleArg = connectionDirective.args.find(function (arg) {
      return arg.name === 'key';
    });
    throw createUserError("Expected the ".concat(HANDLER, " argument to ") + "@".concat(CONNECTION, " to be a string literal for field ").concat(field.name, "."), [(_ref = handleArg === null || handleArg === void 0 ? void 0 : (_handleArg$value = handleArg.value) === null || _handleArg$value === void 0 ? void 0 : _handleArg$value.loc) !== null && _ref !== void 0 ? _ref : connectionDirective.loc]);
  }

  if (typeof key !== 'string') {
    var _ref2, _keyArg$value;

    var keyArg = connectionDirective.args.find(function (arg) {
      return arg.name === 'key';
    });
    throw createUserError("Expected the ".concat(KEY, " argument to ") + "@".concat(CONNECTION, " to be a string literal for field ").concat(field.name, "."), [(_ref2 = keyArg === null || keyArg === void 0 ? void 0 : (_keyArg$value = keyArg.value) === null || _keyArg$value === void 0 ? void 0 : _keyArg$value.loc) !== null && _ref2 !== void 0 ? _ref2 : connectionDirective.loc]);
  }

  var postfix = field.alias || field.name;

  if (!key.endsWith('_' + postfix)) {
    var _ref3, _keyArg$value2;

    var _keyArg = connectionDirective.args.find(function (arg) {
      return arg.name === 'key';
    });

    throw createUserError("Expected the ".concat(KEY, " argument to ") + "@".concat(CONNECTION, " to be of form <SomeName>_").concat(postfix, ", got '").concat(key, "'. ") + 'For detailed explanation, check out ' + 'https://facebook.github.io/relay/docs/en/pagination-container.html#connection', [(_ref3 = _keyArg === null || _keyArg === void 0 ? void 0 : (_keyArg$value2 = _keyArg.value) === null || _keyArg$value2 === void 0 ? void 0 : _keyArg$value2.loc) !== null && _ref3 !== void 0 ? _ref3 : connectionDirective.loc]);
  }

  var generateFilters = function generateFilters() {
    var filteredVariableArgs = field.args.filter(function (arg) {
      return !ConnectionInterface.isConnectionCall({
        name: arg.name,
        value: null
      });
    }).map(function (arg) {
      return arg.name;
    });
    return filteredVariableArgs.length === 0 ? null : filteredVariableArgs;
  };

  var handle = {
    name: (_handler = handler) !== null && _handler !== void 0 ? _handler : CONNECTION,
    key: key,
    filters: filters || generateFilters()
  };

  if (direction !== null) {
    var fragment = generateConnectionFragment(this.getContext(), transformedField.loc, transformedField.type, direction);
    transformedField = (0, _objectSpread2["default"])({}, transformedField, {
      selections: transformedField.selections.concat(fragment)
    });
  }

  return (0, _objectSpread2["default"])({}, transformedField, {
    directives: transformedField.directives.filter(function (directive) {
      return directive.name !== CONNECTION;
    }),
    handles: transformedField.handles ? (0, _toConsumableArray2["default"])(transformedField.handles).concat([handle]) : [handle]
  });
}
/**
 * @internal
 *
 * Generates a fragment on the given type that fetches the minimal connection
 * fields in order to merge different pagination results together at runtime.
 */


function generateConnectionFragment(context, loc, type, direction) {
  var _ConnectionInterface$ = ConnectionInterface.get(),
      CURSOR = _ConnectionInterface$.CURSOR,
      EDGES = _ConnectionInterface$.EDGES,
      END_CURSOR = _ConnectionInterface$.END_CURSOR,
      HAS_NEXT_PAGE = _ConnectionInterface$.HAS_NEXT_PAGE,
      HAS_PREV_PAGE = _ConnectionInterface$.HAS_PREV_PAGE,
      NODE = _ConnectionInterface$.NODE,
      PAGE_INFO = _ConnectionInterface$.PAGE_INFO,
      START_CURSOR = _ConnectionInterface$.START_CURSOR;

  var compositeType = assertCompositeType(SchemaUtils.getNullableType(type));
  var pageInfo = PAGE_INFO;

  if (direction === 'forward') {
    pageInfo += "{\n      ".concat(END_CURSOR, "\n      ").concat(HAS_NEXT_PAGE, "\n    }");
  } else if (direction === 'backward') {
    pageInfo += "{\n      ".concat(HAS_PREV_PAGE, "\n      ").concat(START_CURSOR, "\n    }");
  } else {
    pageInfo += "{\n      ".concat(END_CURSOR, "\n      ").concat(HAS_NEXT_PAGE, "\n      ").concat(HAS_PREV_PAGE, "\n      ").concat(START_CURSOR, "\n    }");
  }

  var fragmentString = "fragment ConnectionFragment on ".concat(String(compositeType), " {\n      ").concat(EDGES, " {\n        ").concat(CURSOR, "\n        ").concat(NODE, " {\n          __typename # rely on GenerateRequisiteFieldTransform to add \"id\"\n        }\n      }\n      ").concat(pageInfo, "\n    }");
  var ast = parse(fragmentString);
  var fragmentAST = ast.definitions[0];

  if (fragmentAST == null || fragmentAST.kind !== 'FragmentDefinition') {
    throw createCompilerError('RelayConnectionTransform: Expected a fragment definition AST.', null, [fragmentAST].filter(Boolean));
  }

  var fragment = RelayParser.transform(context.clientSchema, [fragmentAST])[0];

  if (fragment == null || fragment.kind !== 'Fragment') {
    throw createCompilerError('RelayConnectionTransform: Expected a connection fragment.', [fragment === null || fragment === void 0 ? void 0 : fragment.loc].filter(Boolean));
  }

  return {
    directives: [],
    kind: 'InlineFragment',
    loc: {
      kind: 'Derived',
      source: loc
    },
    metadata: null,
    selections: fragment.selections,
    typeCondition: compositeType
  };
}

function findArg(field, argName) {
  return field.args && field.args.find(function (arg) {
    return arg.name === argName;
  });
}
/**
 * @internal
 *
 * Validates that the selection is a valid connection:
 * - Specifies a first or last argument to prevent accidental, unconstrained
 *   data access.
 * - Has an `edges` selection, otherwise there is nothing to paginate.
 *
 * TODO: This implementation requires the edges field to be a direct selection
 * and not contained within an inline fragment or fragment spread. It's
 * technically possible to remove this restriction if this pattern becomes
 * common/necessary.
 */


function validateConnectionSelection(definitionName, field) {
  var _ConnectionInterface$2 = ConnectionInterface.get(),
      EDGES = _ConnectionInterface$2.EDGES;

  if (!findArg(field, FIRST) && !findArg(field, LAST)) {
    throw createUserError("Expected field `".concat(field.name, ": ") + "".concat(String(field.type), "` to have a ").concat(FIRST, " or ").concat(LAST, " argument in ") + "document `".concat(definitionName, "`."), [field.loc]);
  }

  if (!field.selections.some(function (selection) {
    return selection.kind === 'LinkedField' && selection.name === EDGES;
  })) {
    throw createUserError("Expected field `".concat(field.name, ": ") + "".concat(String(field.type), "` to have a ").concat(EDGES, " selection in document ") + "`".concat(definitionName, "`."), [field.loc]);
  }
}
/**
 * @internal
 *
 * Validates that the type satisfies the Connection specification:
 * - The type has an edges field, and edges have scalar `cursor` and object
 *   `node` fields.
 * - The type has a page info field which is an object with the correct
 *   subfields.
 */


function validateConnectionType(definitionName, field) {
  var type = field.type;

  var _ConnectionInterface$3 = ConnectionInterface.get(),
      CURSOR = _ConnectionInterface$3.CURSOR,
      EDGES = _ConnectionInterface$3.EDGES,
      END_CURSOR = _ConnectionInterface$3.END_CURSOR,
      HAS_NEXT_PAGE = _ConnectionInterface$3.HAS_NEXT_PAGE,
      HAS_PREV_PAGE = _ConnectionInterface$3.HAS_PREV_PAGE,
      NODE = _ConnectionInterface$3.NODE,
      PAGE_INFO = _ConnectionInterface$3.PAGE_INFO,
      START_CURSOR = _ConnectionInterface$3.START_CURSOR;

  var typeWithFields = SchemaUtils.assertTypeWithFields(SchemaUtils.getNullableType(type));
  var typeFields = typeWithFields.getFields();
  var edges = typeFields[EDGES];

  if (edges == null) {
    throw createUserError("Expected type '".concat(String(type), "' to have an '").concat(EDGES, "' field in document '").concat(definitionName, "'."), [field.loc]);
  }

  var edgesType = SchemaUtils.getNullableType(edges.type);

  if (!(edgesType instanceof GraphQLList)) {
    throw createUserError("Expected '".concat(EDGES, "' field on type '").concat(String(type), "' to be a list type in document '").concat(definitionName, "'."), [field.loc]);
  }

  var edgeType = SchemaUtils.getNullableType(edgesType.ofType);

  if (!(edgeType instanceof GraphQLObjectType)) {
    throw createUserError("Expected '".concat(EDGES, "' field on type '").concat(String(type), "' to be a list of objects in document '").concat(definitionName, "'."), [field.loc]);
  }

  var node = edgeType.getFields()[NODE];

  if (node == null) {
    throw createUserError("Expected type '".concat(String(type), "' to have have a '").concat(EDGES, " { ").concat(NODE, " }' field in in document '").concat(definitionName, "'."), [field.loc]);
  }

  var nodeType = SchemaUtils.getNullableType(node.type);

  if (!(nodeType instanceof GraphQLInterfaceType || nodeType instanceof GraphQLUnionType || nodeType instanceof GraphQLObjectType)) {
    throw createUserError("Expected type '".concat(String(type), "' to have a '").concat(EDGES, " { ").concat(NODE, " }' field for which the type is an interface, object, or union in document '").concat(definitionName, "'."), [field.loc]);
  }

  var cursor = edgeType.getFields()[CURSOR];

  if (cursor == null || !(SchemaUtils.getNullableType(cursor.type) instanceof GraphQLScalarType)) {
    throw createUserError("Expected type '".concat(String(type), "' to have a '").concat(EDGES, " { ").concat(CURSOR, " }' scalar field in document '").concat(definitionName, "'."), [field.loc]);
  }

  var pageInfo = typeFields[PAGE_INFO];

  if (pageInfo == null) {
    throw createUserError("Expected type '".concat(String(type), "' to have a '").concat(EDGES, " { ").concat(PAGE_INFO, " }' field in document '").concat(definitionName, "'."), [field.loc]);
  }

  var pageInfoType = SchemaUtils.getNullableType(pageInfo.type);

  if (!(pageInfoType instanceof GraphQLObjectType)) {
    throw createUserError("Expected type '".concat(String(type), "' to have a '").concat(EDGES, " { ").concat(PAGE_INFO, " }' field with object type in document '").concat(definitionName, "'."), [field.loc]);
  }

  [END_CURSOR, HAS_NEXT_PAGE, HAS_PREV_PAGE, START_CURSOR].forEach(function (fieldName) {
    var pageInfoField = pageInfoType.getFields()[fieldName];

    if (pageInfoField == null || !(SchemaUtils.getNullableType(pageInfoField.type) instanceof GraphQLScalarType)) {
      throw createUserError("Expected type '".concat(String(pageInfo.type), "' to have a '").concat(fieldName, "' scalar field in document '").concat(definitionName, "'."), [field.loc]);
    }
  });
}

module.exports = {
  CONNECTION: CONNECTION,
  SCHEMA_EXTENSION: SCHEMA_EXTENSION,
  transform: relayConnectionTransform
};