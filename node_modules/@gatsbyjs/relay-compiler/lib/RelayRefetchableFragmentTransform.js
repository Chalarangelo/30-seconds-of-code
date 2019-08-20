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

var GraphQLCompilerContext = require("./GraphQLCompilerContext");

var GraphQLIRVisitor = require("./GraphQLIRVisitor");

var getLiteralArgumentValues = require("./getLiteralArgumentValues");

var inferRootArgumentDefinitions = require("./inferRootArgumentDefinitions");

var isEquivalentType = require("./isEquivalentType");

var nullthrows = require("nullthrows");

var _require = require("./RelayCompilerError"),
    createCombinedError = _require.createCombinedError,
    createCompilerError = _require.createCompilerError,
    createUserError = _require.createUserError,
    eachWithErrors = _require.eachWithErrors;

var _require2 = require("graphql"),
    getNullableType = _require2.getNullableType,
    GraphQLID = _require2.GraphQLID,
    GraphQLInterfaceType = _require2.GraphQLInterfaceType,
    GraphQLList = _require2.GraphQLList,
    GraphQLNonNull = _require2.GraphQLNonNull,
    GraphQLObjectType = _require2.GraphQLObjectType,
    GraphQLSchema = _require2.GraphQLSchema;

var VIEWER_TYPE_NAME = 'Viewer';
var VIEWER_FIELD_NAME = 'viewer';
var NODE_TYPE_NAME = 'Node';
var NODE_FIELD_NAME = 'node';
var SCHEMA_EXTENSION = "\n  directive @refetchable(\n    queryName: String!\n  ) on FRAGMENT_DEFINITION\n";
/**
 * This transform synthesizes "refetch" queries for fragments that
 * are trivially refetchable. This is comprised of three main stages:
 *
 * 1. Validating that fragments marked with @refetchable qualify for
 *    refetch query generation; mainly this means that the fragment
 *    type is able to be refetched in some canonical way.
 * 2. Determining the variable definitions to use for each generated
 *    query. GraphQL does not have a notion of fragment-local variables
 *    at all, and although Relay adds this concept developers are still
 *    allowed to reference global variables. This necessitates a
 *    visiting all reachable fragments for each @refetchable fragment,
 *    and finding the union of all global variables expceted to be defined.
 * 3. Building the refetch queries, a straightforward copying transform from
 *    Fragment to Root IR nodes.
 */

function relayRefetchableFragmentTransform(context) {
  var schema = context.serverSchema;
  var queryType = schema.getQueryType();

  if (queryType == null) {
    throw createUserError('Expected the schema to define a query type.');
  }

  var refetchOperations = buildRefetchMap(context);
  var nextContext = context;
  var errors = eachWithErrors(refetchOperations, function (_ref2) {
    var refetchName = _ref2[0],
        fragment = _ref2[1];
    // Build a refetch operation according to the fragment's type:
    // the logic here is purely name-based, the actual transform
    // functions provide detailed validation as well as case-specific
    // error messages.
    var refetchDescriptor;

    if (isEquivalentType(fragment.type, queryType)) {
      refetchDescriptor = buildRefetchOperationOnQueryType(schema, fragment, refetchName);
    } else if (String(fragment.type) === VIEWER_TYPE_NAME) {
      // Validate that the schema conforms to the informal Viewer spec
      // and build the refetch query accordingly.
      refetchDescriptor = buildRefetchOperationOnViewerType(schema, fragment, refetchName);
    } else if (String(fragment.type) === NODE_TYPE_NAME || fragment.type instanceof GraphQLObjectType && fragment.type.getInterfaces().some(function (interfaceType) {
      return String(interfaceType) === NODE_TYPE_NAME;
    })) {
      // Validate that the schema conforms to the Object Identity (Node) spec
      // and build the refetch query accordingly.
      refetchDescriptor = buildRefetchOperationOnNodeType(schema, fragment, refetchName);
    } else {
      throw createUserError("Invalid use of @refetchable on fragment '".concat(fragment.name, "', only fragments on the Query type, Viewer type, Node type, or types implementing Node are supported."), [fragment.loc]);
    }

    if (refetchDescriptor != null) {
      var _connectionMetadata;

      var _refetchDescriptor = refetchDescriptor,
          path = _refetchDescriptor.path,
          node = _refetchDescriptor.node;
      var connectionMetadata = extractConnectionMetadata(fragment);
      nextContext = nextContext.replace((0, _objectSpread2["default"])({}, fragment, {
        metadata: (0, _objectSpread2["default"])({}, fragment.metadata || {}, {
          refetch: {
            connection: (_connectionMetadata = connectionMetadata) !== null && _connectionMetadata !== void 0 ? _connectionMetadata : null,
            operation: refetchName,
            fragmentPathInResult: path
          }
        })
      }));
      nextContext = nextContext.add((0, _objectSpread2["default"])({}, node, {
        metadata: (0, _objectSpread2["default"])({}, node.metadata || {}, {
          derivedFrom: fragment.name
        })
      }));
    }
  });

  if (errors != null && errors.length) {
    throw createCombinedError(errors, 'RelayRefetchableFragmentTransform');
  }

  return nextContext;
}
/**
 * Walk the documents of a compiler context and create a mapping of
 * refetch operation names to the source fragment from which the refetch
 * operation should be derived.
 */


function buildRefetchMap(context) {
  var refetchOperations = new Map();
  var errors = eachWithErrors(context.documents(), function (node) {
    if (node.kind !== 'Fragment') {
      return;
    }

    var refetchName = getRefetchQueryName(node);

    if (refetchName === null) {
      return;
    }

    var previousOperation = refetchOperations.get(refetchName);

    if (previousOperation != null) {
      throw createUserError("Duplicate definition for @refetchable operation '".concat(refetchName, "' from fragments '").concat(node.name, "' and '").concat(previousOperation.name, "'"), [node.loc, previousOperation.loc]);
    }

    refetchOperations.set(refetchName, node);
  });

  if (errors != null && errors.length !== 0) {
    throw createCombinedError(errors, 'RelayRefetchableFragmentTransform');
  }

  var transformed = inferRootArgumentDefinitions(context);
  return new Map(Array.from(refetchOperations.entries(), function (_ref3) {
    var name = _ref3[0],
        fragment = _ref3[1];
    return [name, transformed.getFragment(fragment.name)];
  }));
}
/**
 * Validate that any @connection usage is valid for refetching:
 * - Variables are used for both the "count" and "cursor" arguments
 *   (after/first or before/last)
 * - Exactly one connection
 * - Has a stable path to the connection data
 *
 * Returns connection metadata to add to the transformed fragment or undefined
 * if there is no connection.
 */


function extractConnectionMetadata(fragment) {
  var fields = [];
  var connectionField = null;
  var path = null;
  GraphQLIRVisitor.visit(fragment, {
    LinkedField: {
      enter: function enter(field) {
        fields.push(field);

        if (field.handles && field.handles.some(function (handle) {
          return handle.name === 'connection';
        }) || field.directives.some(function (directive) {
          return directive.name === 'connection';
        })) {
          // Disallow multiple @connections
          if (connectionField != null) {
            throw createUserError("Invalid use of @refetchable with @connection in fragment '".concat(fragment.name, "', at most once @connection can appear in a refetchable fragment."), [field.loc]);
          } // Disallow connections within plurals


          var pluralOnPath = fields.find(function (pathField) {
            return getNullableType(pathField.type) instanceof GraphQLList;
          });

          if (pluralOnPath) {
            throw createUserError("Invalid use of @refetchable with @connection in fragment '".concat(fragment.name, "', refetchable connections cannot appear inside plural fields."), [field.loc, pluralOnPath.loc]);
          }

          connectionField = field;
          path = fields.map(function (pathField) {
            var _pathField$alias;

            return (_pathField$alias = pathField.alias) !== null && _pathField$alias !== void 0 ? _pathField$alias : pathField.name;
          });
        }
      }
    },
    leave: function leave() {
      fields.pop();
    }
  });

  if (connectionField == null || path == null) {
    return;
  } // Validate arguments: if either of before/last appear they must both appear
  // and use variables (not scalar values)


  var backward = null;
  var before = findArgument(connectionField, 'before');
  var last = findArgument(connectionField, 'last');

  if (before || last) {
    if (!before || !last || before.value.kind !== 'Variable' || last.value.kind !== 'Variable') {
      throw createUserError("Invalid use of @refetchable with @connection in fragment '".concat(fragment.name, "', refetchable connections must use variables for the before and last arguments."), [connectionField.loc, before && before.value.kind !== 'Variable' ? before.value.loc : null, last && last.value.kind !== 'Variable' ? last.value.loc : null].filter(Boolean));
    }

    backward = {
      count: last.value.variableName,
      cursor: before.value.variableName
    };
  } // Validate arguments: if either of after/first appear they must both appear
  // and use variables (not scalar values)


  var forward = null;
  var after = findArgument(connectionField, 'after');
  var first = findArgument(connectionField, 'first');

  if (after || first) {
    if (!after || !first || after.value.kind !== 'Variable' || first.value.kind !== 'Variable') {
      throw createUserError("Invalid use of @refetchable with @connection in fragment '".concat(fragment.name, "', refetchable connections must use variables for the after and first arguments."), [connectionField.loc, after && after.value.kind !== 'Variable' ? after.value.loc : null, first && first.value.kind !== 'Variable' ? first.value.loc : null].filter(Boolean));
    }

    forward = {
      count: first.value.variableName,
      cursor: after.value.variableName
    };
  }

  return {
    forward: forward,
    backward: backward,
    path: path
  };
}

function buildOperationArgumentDefinitions(argumentDefinitions) {
  return argumentDefinitions.map(function (argDef) {
    if (argDef.kind === 'LocalArgumentDefinition') {
      return argDef;
    } else {
      return {
        kind: 'LocalArgumentDefinition',
        name: argDef.name,
        type: argDef.type,
        defaultValue: null,
        loc: argDef.loc,
        metadata: null
      };
    }
  });
}

function buildFragmentSpread(fragment) {
  var args = [];
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = fragment.argumentDefinitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var argDef = _step.value;

      if (argDef.kind !== 'LocalArgumentDefinition') {
        continue;
      }

      args.push({
        kind: 'Argument',
        loc: {
          kind: 'Derived',
          source: argDef.loc
        },
        metadata: null,
        name: argDef.name,
        type: argDef.type,
        value: {
          kind: 'Variable',
          loc: {
            kind: 'Derived',
            source: argDef.loc
          },
          metadata: null,
          variableName: argDef.name,
          type: argDef.type
        }
      });
    }
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

  return {
    args: args,
    directives: [],
    kind: 'FragmentSpread',
    loc: {
      kind: 'Derived',
      source: fragment.loc
    },
    metadata: null,
    name: fragment.name
  };
}

function buildRefetchOperationOnQueryType(schema, fragment, queryName) {
  var queryType = nullthrows(schema.getQueryType());
  return {
    path: [],
    node: {
      argumentDefinitions: buildOperationArgumentDefinitions(fragment.argumentDefinitions),
      directives: [],
      kind: 'Root',
      loc: {
        kind: 'Derived',
        source: fragment.loc
      },
      metadata: null,
      name: queryName,
      operation: 'query',
      selections: [buildFragmentSpread(fragment)],
      type: queryType
    }
  };
}

function buildRefetchOperationOnViewerType(schema, fragment, queryName) {
  // Handle fragments on viewer
  var queryType = nullthrows(schema.getQueryType());
  var viewerType = schema.getType(VIEWER_TYPE_NAME);
  var viewerField = queryType.getFields()[VIEWER_FIELD_NAME];

  if (!(viewerType instanceof GraphQLObjectType && viewerField != null && viewerField.type instanceof GraphQLObjectType && isEquivalentType(viewerField.type, viewerType) && viewerField.args.length === 0 && isEquivalentType(fragment.type, viewerType))) {
    throw createUserError("Invalid use of @refetchable on fragment '".concat(fragment.name, "', check that your schema defines a 'Viewer' object type and has a 'viewer: Viewer' field on the query type."), [fragment.loc]);
  }

  return {
    path: [VIEWER_FIELD_NAME],
    node: {
      argumentDefinitions: buildOperationArgumentDefinitions(fragment.argumentDefinitions),
      directives: [],
      kind: 'Root',
      loc: {
        kind: 'Derived',
        source: fragment.loc
      },
      metadata: null,
      name: queryName,
      operation: 'query',
      selections: [{
        alias: null,
        args: [],
        directives: [],
        handles: null,
        kind: 'LinkedField',
        loc: {
          kind: 'Derived',
          source: fragment.loc
        },
        metadata: null,
        name: VIEWER_FIELD_NAME,
        selections: [buildFragmentSpread(fragment)],
        type: viewerType
      }],
      type: queryType
    }
  };
}

function buildRefetchOperationOnNodeType(schema, fragment, queryName) {
  var queryType = nullthrows(schema.getQueryType());
  var nodeType = schema.getType(NODE_TYPE_NAME);
  var nodeField = queryType.getFields()[NODE_FIELD_NAME];

  if (!(nodeType instanceof GraphQLInterfaceType && nodeField != null && nodeField.type instanceof GraphQLInterfaceType && isEquivalentType(nodeField.type, nodeType) && nodeField.args.length === 1 && nodeField.args[0].name === 'id' && isEquivalentType(getNullableType(nodeField.args[0].type), GraphQLID) && ( // the fragment must be on Node or on a type that implements Node
  fragment.type instanceof GraphQLInterfaceType && isEquivalentType(fragment.type, nodeType) || fragment.type instanceof GraphQLObjectType && fragment.type.getInterfaces().some(function (interfaceType) {
    return isEquivalentType(interfaceType, nodeType);
  })))) {
    throw createUserError("Invalid use of @refetchable on fragment '".concat(fragment.name, "', check that your schema defines a 'Node { id: ID }' interface and has a 'node(id: ID): Node' field on the query type (the id argument may also be non-null)."), [fragment.loc]);
  }

  var argumentDefinitions = buildOperationArgumentDefinitions(fragment.argumentDefinitions);
  var idArgument = argumentDefinitions.find(function (argDef) {
    return argDef.name === 'id';
  });

  if (idArgument != null) {
    throw createUserError("Invalid use of @refetchable on fragment '".concat(fragment.name, "', this fragment already has an '$id' variable in scope."), [idArgument.loc]);
  }

  var idSelection = fragment.selections.find(function (selection) {
    return selection.kind === 'ScalarField' && selection.name === 'id' && selection.alias == null && isEquivalentType(getNullableType(selection.type), GraphQLID);
  });

  if (idSelection == null) {
    throw createUserError("Invalid use of @refetchable on fragment '".concat(fragment.name, "', refetchable fragments on Node (or types implementing Node) must fetch the 'id' field without an alias."), [fragment.loc]);
  }

  var idArgType = new GraphQLNonNull(GraphQLID);
  var argumentDefinitionsWithId = (0, _toConsumableArray2["default"])(argumentDefinitions).concat([{
    defaultValue: null,
    kind: 'LocalArgumentDefinition',
    loc: {
      kind: 'Derived',
      source: fragment.loc
    },
    metadata: null,
    name: 'id',
    type: idArgType
  }]);
  return {
    path: [NODE_FIELD_NAME],
    node: {
      argumentDefinitions: argumentDefinitionsWithId,
      directives: [],
      kind: 'Root',
      loc: {
        kind: 'Derived',
        source: fragment.loc
      },
      metadata: null,
      name: queryName,
      operation: 'query',
      selections: [{
        alias: null,
        args: [{
          kind: 'Argument',
          loc: {
            kind: 'Derived',
            source: fragment.loc
          },
          metadata: null,
          name: 'id',
          type: idArgType,
          value: {
            kind: 'Variable',
            loc: {
              kind: 'Derived',
              source: fragment.loc
            },
            metadata: null,
            variableName: 'id',
            type: idArgType
          }
        }],
        directives: [],
        handles: null,
        kind: 'LinkedField',
        loc: {
          kind: 'Derived',
          source: fragment.loc
        },
        metadata: null,
        name: NODE_FIELD_NAME,
        selections: [buildFragmentSpread(fragment)],
        type: nodeType
      }],
      type: queryType
    }
  };
}

function getRefetchQueryName(fragment) {
  var refetchableDirective = fragment.directives.find(function (directive) {
    return directive.name === 'refetchable';
  });

  if (refetchableDirective == null) {
    return null;
  }

  var refetchArguments = getLiteralArgumentValues(refetchableDirective.args);
  var queryName = refetchArguments.queryName;

  if (typeof queryName !== 'string') {
    var _ref;

    var queryNameArg = refetchableDirective.args.find(function (arg) {
      return arg.name === 'queryName';
    });
    throw createCompilerError("Expected the 'name' argument of @refetchable to be a string, got '".concat(String(queryName), "'."), [(_ref = queryNameArg === null || queryNameArg === void 0 ? void 0 : queryNameArg.loc) !== null && _ref !== void 0 ? _ref : refetchableDirective.loc]);
  }

  return queryName;
}

function findArgument(field, argumentName) {
  var _field$args$find;

  return (_field$args$find = field.args.find(function (arg) {
    return arg.name === argumentName;
  })) !== null && _field$args$find !== void 0 ? _field$args$find : null;
}

module.exports = {
  SCHEMA_EXTENSION: SCHEMA_EXTENSION,
  transform: relayRefetchableFragmentTransform
};