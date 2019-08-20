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

var Profiler = require("./GraphQLCompilerProfiler");

var _require = require("./DefaultHandleKey"),
    DEFAULT_HANDLE_KEY = _require.DEFAULT_HANDLE_KEY;

var _require2 = require("./GraphQLSchemaUtils"),
    getNullableType = _require2.getNullableType,
    getTypeFromAST = _require2.getTypeFromAST,
    isExecutableDefinitionAST = _require2.isExecutableDefinitionAST;

var _require3 = require("./RelayCompilerError"),
    createCombinedError = _require3.createCombinedError,
    createCompilerError = _require3.createCompilerError,
    createUserError = _require3.createUserError,
    eachWithErrors = _require3.eachWithErrors;

var _require4 = require("./getFieldDefinition"),
    getFieldDefinitionLegacy = _require4.getFieldDefinitionLegacy;

var _require5 = require("graphql"),
    assertCompositeType = _require5.assertCompositeType,
    assertInputType = _require5.assertInputType,
    assertOutputType = _require5.assertOutputType,
    extendSchema = _require5.extendSchema,
    getNamedType = _require5.getNamedType,
    GraphQLEnumType = _require5.GraphQLEnumType,
    GraphQLID = _require5.GraphQLID,
    GraphQLInputObjectType = _require5.GraphQLInputObjectType,
    GraphQLList = _require5.GraphQLList,
    GraphQLNonNull = _require5.GraphQLNonNull,
    GraphQLScalarType = _require5.GraphQLScalarType,
    isLeafType = _require5.isLeafType,
    isTypeSubTypeOf = _require5.isTypeSubTypeOf,
    parseGraphQL = _require5.parse,
    parseType = _require5.parseType,
    Source = _require5.Source;

var ARGUMENT_DEFINITIONS = 'argumentDefinitions';
var ARGUMENTS = 'arguments';
/**
 * @internal
 *
 * This directive is not intended for use by developers directly. To set a field
 * handle in product code use a compiler plugin.
 */

var CLIENT_FIELD = '__clientField';
var CLIENT_FIELD_HANDLE = 'handle';
var CLIENT_FIELD_KEY = 'key';
var CLIENT_FIELD_FILTERS = 'filters';
var INCLUDE = 'include';
var SKIP = 'skip';
var IF = 'if';
/**
 * Transforms GraphQL text into Relay Compiler's internal, strongly-typed
 * intermediate representation (IR).
 */

function parse(schema, text, filename) {
  var ast = parseGraphQL(new Source(text, filename)); // TODO T24511737 figure out if this is dangerous

  schema = extendSchema(schema, ast, {
    assumeValid: true
  });
  var parser = new RelayParser(schema, ast.definitions);
  return parser.transform();
}
/**
 * Transforms untyped GraphQL parse trees (ASTs) into Relay Compiler's
 * internal, strongly-typed intermediate representation (IR).
 */


function transform(schema, definitions) {
  return Profiler.run('RelayParser.transform', function () {
    var parser = new RelayParser(schema, definitions);
    return parser.transform();
  });
}
/**
 * @private
 */


var RelayParser =
/*#__PURE__*/
function () {
  function RelayParser(schema, definitions) {
    var _this = this;

    this._definitions = new Map(); // leaving this configurable to make it easy to experiment w changing later

    this._getFieldDefinition = getFieldDefinitionLegacy;
    this._schema = schema;
    var duplicated = new Set();
    definitions.forEach(function (def) {
      if (isExecutableDefinitionAST(def)) {
        var name = getName(def);

        if (_this._definitions.has(name)) {
          duplicated.add(name);
          return;
        }

        _this._definitions.set(name, def);
      }
    });

    if (duplicated.size) {
      throw new Error('RelayParser: Encountered duplicate defintitions for one or more ' + 'documents: each document must have a unique name. Duplicated documents:\n' + Array.from(duplicated, function (name) {
        return "- ".concat(name);
      }).join('\n'));
    }
  }

  var _proto = RelayParser.prototype;

  _proto.transform = function transform() {
    var _this2 = this;

    var errors;
    var nodes = [];
    var entries = new Map(); // Construct a mapping of name to definition ast + variable definitions.
    // This allows the subsequent AST -> IR tranformation to reference the
    // defined arguments of referenced fragments.

    errors = eachWithErrors(this._definitions, function (_ref2) {
      var name = _ref2[0],
          definition = _ref2[1];

      var variableDefinitions = _this2._buildArgumentDefinitions(definition);

      entries.set(name, {
        definition: definition,
        variableDefinitions: variableDefinitions
      });
    }); // Convert the ASTs to IR.

    if (errors == null) {
      errors = eachWithErrors(entries.values(), function (_ref3) {
        var definition = _ref3.definition,
            variableDefinitions = _ref3.variableDefinitions;
        var node = parseDefinition(_this2._schema, _this2._getFieldDefinition, entries, definition, variableDefinitions);
        nodes.push(node);
      });
    }

    if (errors != null && errors.length !== 0) {
      throw createCombinedError(errors, 'RelayParser');
    }

    return nodes;
  };
  /**
   * Constructs a mapping of variable names to definitions for the given
   * operation/fragment definition.
   */


  _proto._buildArgumentDefinitions = function _buildArgumentDefinitions(definition) {
    switch (definition.kind) {
      case 'OperationDefinition':
        return this._buildOperationArgumentDefinitions(definition);

      case 'FragmentDefinition':
        return this._buildFragmentArgumentDefinitions(definition);

      default:
        definition;
        throw createCompilerError("Unexpected ast kind '".concat(definition.kind, "'."), [definition]);
    }
  };
  /**
   * Constructs a mapping of variable names to definitions using the
   * variables defined in `@argumentDefinitions`.
   */


  _proto._buildFragmentArgumentDefinitions = function _buildFragmentArgumentDefinitions(fragment) {
    var _this3 = this;

    var variableDirectives = (fragment.directives || []).filter(function (directive) {
      return getName(directive) === ARGUMENT_DEFINITIONS;
    });

    if (!variableDirectives.length) {
      return new Map();
    }

    if (variableDirectives.length !== 1) {
      throw createUserError("Directive @".concat(ARGUMENT_DEFINITIONS, " may be defined at most once per ") + 'fragment.', null, variableDirectives);
    }

    var variableDirective = variableDirectives[0]; // $FlowIssue: refining directly on `variableDirective.arguments` doesn't
    // work, below accesses all report arguments could still be null/undefined.

    var args = variableDirective.arguments;

    if (variableDirective == null || !Array.isArray(args)) {
      return new Map();
    }

    if (!args.length) {
      throw createUserError("Directive @".concat(ARGUMENT_DEFINITIONS, " requires arguments: remove the ") + 'directive to skip defining local variables for this fragment.', null, [variableDirective]);
    }

    var variables = new Map();
    args.forEach(function (arg) {
      var argName = getName(arg);
      var previousVariable = variables.get(argName);

      if (previousVariable != null) {
        throw createUserError("Duplicate definition for variable '$".concat(argName, "'."), null, [previousVariable.ast, arg]);
      }

      var value = transformLiteralValue(arg.value, arg);

      if (Array.isArray(value) || typeof value !== 'object' || value === null || typeof value.type !== 'string') {
        throw createUserError("Expected definition for variable '$".concat(argName, "' to be an object ") + "with the shape: '{type: string, defaultValue?: mixed, nonNull?: " + "boolean, list?: boolean}'.", null, [arg.value]);
      }

      var unknownKeys = Object.keys(value).filter(function (key) {
        return key !== 'type' && key !== 'defaultValue' && key !== 'nonNull' && key !== 'list';
      });

      if (unknownKeys.length !== 0) {
        var unknownKeysString = "'" + unknownKeys.join("', '") + "'";
        throw createUserError("Expected definition for variable '$".concat(argName, "' to be an object ") + "with the following shape: '{type: string, defaultValue?: mixed, " + "nonNull?: boolean, list?: boolean}', got unknown key(s) " + "".concat(unknownKeysString, "."), null, [arg]);
      }

      var typeAST = parseType(String(value.type));
      var type = assertInputType(getTypeFromAST(_this3._schema, typeAST));
      variables.set(argName, {
        ast: arg,
        defaultValue: value.defaultValue != null ? value.defaultValue : null,
        defined: true,
        name: argName,
        type: type
      });
    });
    return variables;
  };
  /**
   * Constructs a mapping of variable names to definitions using the
   * standard GraphQL syntax for variable definitions.
   */


  _proto._buildOperationArgumentDefinitions = function _buildOperationArgumentDefinitions(operation) {
    var _this4 = this;

    var variableDefinitions = new Map();
    (operation.variableDefinitions || []).forEach(function (def) {
      var name = getName(def.variable);
      var type = assertInputType(getTypeFromAST(_this4._schema, def.type));
      var defaultValue = def.defaultValue ? transformLiteralValue(def.defaultValue, def) : null;
      var previousDefinition = variableDefinitions.get(name);

      if (previousDefinition != null) {
        throw createUserError("Duplicate definition for variable '$".concat(name, "'."), null, [previousDefinition.ast, def]);
      }

      variableDefinitions.set(name, {
        ast: def,
        defaultValue: defaultValue,
        defined: true,
        name: name,
        type: type
      });
    });
    return variableDefinitions;
  };

  return RelayParser;
}();
/**
 * @private
 */


function parseDefinition(schema, getFieldDefinition, entries, definition, variableDefinitions) {
  var parser = new GraphQLDefinitionParser(schema, getFieldDefinition, entries, definition, variableDefinitions);
  return parser.transform();
}
/**
 * @private
 */


var GraphQLDefinitionParser =
/*#__PURE__*/
function () {
  function GraphQLDefinitionParser(schema, getFieldDefinition, entries, definition, variableDefinitions) {
    this._definition = definition;
    this._entries = entries;
    this._getFieldDefinition = getFieldDefinition;
    this._schema = schema;
    this._variableDefinitions = variableDefinitions;
    this._unknownVariables = new Map();
  }

  var _proto2 = GraphQLDefinitionParser.prototype;

  _proto2.transform = function transform() {
    var definition = this._definition;

    switch (definition.kind) {
      case 'OperationDefinition':
        return this._transformOperation(definition);

      case 'FragmentDefinition':
        return this._transformFragment(definition);

      default:
        definition;
        throw createCompilerError("Unsupported definition type ".concat(definition.kind), [definition]);
    }
  };

  _proto2._getErrorContext = function _getErrorContext() {
    var message = "document `".concat(getName(this._definition), "`");

    if (this._definition.loc && this._definition.loc.source) {
      message += " file: `".concat(this._definition.loc.source.name, "`");
    }

    return message;
  };

  _proto2._recordAndVerifyVariableReference = function _recordAndVerifyVariableReference(variable, name, usedAsType) {
    // Special case for variables used in @arguments where we currently
    // aren't guaranteed to be able to resolve the type.
    if (usedAsType == null) {
      if (!this._variableDefinitions.has(name) && !this._unknownVariables.has(name)) {
        this._unknownVariables.set(name, {
          ast: variable,
          type: null
        });
      }

      return;
    }

    var variableDefinition = this._variableDefinitions.get(name);

    if (variableDefinition != null) {
      // If the variable is defined, all usages must be compatible
      var effectiveType = variableDefinition.type;

      if (variableDefinition.defaultValue != null) {
        // If a default value is defined then it is guaranteed to be used
        // at runtime such that the effective type of the variable is non-null
        effectiveType = new GraphQLNonNull(getNullableType(effectiveType));
      }

      if (!isTypeSubTypeOf(this._schema, effectiveType, usedAsType)) {
        throw createUserError("Variable '$".concat(name, "' was defined as type '").concat(String(variableDefinition.type), "' but used in a location expecting the type '").concat(String(usedAsType), "'"), null, [variableDefinition.ast, variable]);
      }
    } else {
      var previous = this._unknownVariables.get(name);

      if (!previous || !previous.type) {
        // No previous usage, current type is strongest
        this._unknownVariables.set(name, {
          ast: variable,
          type: usedAsType
        });
      } else {
        var previousType = previous.type,
            previousVariable = previous.ast;

        if (!(isTypeSubTypeOf(this._schema, usedAsType, previousType) || isTypeSubTypeOf(this._schema, previousType, usedAsType))) {
          throw createUserError("Variable '$".concat(name, "' was used in locations expecting the conflicting types '").concat(String(previousType), "' and '").concat(String(usedAsType), "'. Source: ").concat(this._getErrorContext()), null, [previousVariable, variable]);
        } // If the new used type has stronger requirements, use that type as reference,
        // otherwise keep referencing the previous type


        if (isTypeSubTypeOf(this._schema, usedAsType, previousType)) {
          this._unknownVariables.set(name, {
            ast: variable,
            type: usedAsType
          });
        }
      }
    }
  };

  _proto2._transformFragment = function _transformFragment(fragment) {
    var directives = this._transformDirectives((fragment.directives || []).filter(function (directive) {
      return getName(directive) !== ARGUMENT_DEFINITIONS;
    }));

    var type = assertCompositeType(getTypeFromAST(this._schema, fragment.typeCondition));

    var selections = this._transformSelections(fragment.selectionSet, type);

    var argumentDefinitions = (0, _toConsumableArray2["default"])(buildArgumentDefinitions(this._variableDefinitions));
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = this._unknownVariables[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _step.value,
            name = _step$value[0],
            variableReference = _step$value[1];
        argumentDefinitions.push({
          kind: 'RootArgumentDefinition',
          loc: buildLocation(variableReference.ast.loc),
          metadata: null,
          name: name,
          // $FlowFixMe - could be null
          type: variableReference.type
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
      kind: 'Fragment',
      directives: directives,
      loc: buildLocation(fragment.loc),
      metadata: null,
      name: getName(fragment),
      selections: selections,
      type: type,
      argumentDefinitions: argumentDefinitions
    };
  };

  _proto2._transformOperation = function _transformOperation(definition) {
    var name = getName(definition);

    var directives = this._transformDirectives(definition.directives || []);

    var type;
    var operation;

    switch (definition.operation) {
      case 'query':
        operation = 'query';
        type = assertCompositeType(this._schema.getQueryType());
        break;

      case 'mutation':
        operation = 'mutation';
        type = assertCompositeType(this._schema.getMutationType());
        break;

      case 'subscription':
        operation = 'subscription';
        type = assertCompositeType(this._schema.getSubscriptionType());
        break;

      default:
        definition.operation;
        throw createCompilerError("Unknown ast kind '".concat(definition.operation, "'. Source: ").concat(this._getErrorContext(), "."), null, [definition]);
    }

    if (!definition.selectionSet) {
      throw createUserError("Expected operation to have selections. Source: ".concat(this._getErrorContext()), null, [definition]);
    }

    var selections = this._transformSelections(definition.selectionSet, type);

    var argumentDefinitions = buildArgumentDefinitions(this._variableDefinitions);

    if (this._unknownVariables.size !== 0) {
      throw createUserError("Query '".concat(name, "' references undefined variables."), null, Array.from(this._unknownVariables.values(), function (variableReference) {
        return variableReference.ast;
      }));
    }

    return {
      kind: 'Root',
      operation: operation,
      loc: buildLocation(definition.loc),
      metadata: null,
      name: name,
      argumentDefinitions: argumentDefinitions,
      directives: directives,
      selections: selections,
      type: type
    };
  };

  _proto2._transformSelections = function _transformSelections(selectionSet, parentType) {
    var _this5 = this;

    return selectionSet.selections.map(function (selection) {
      var node;

      if (selection.kind === 'Field') {
        node = _this5._transformField(selection, parentType);
      } else if (selection.kind === 'FragmentSpread') {
        node = _this5._transformFragmentSpread(selection, parentType);
      } else if (selection.kind === 'InlineFragment') {
        node = _this5._transformInlineFragment(selection, parentType);
      } else {
        selection.kind;
        throw createCompilerError("Unknown ast kind '".concat(selection.kind, "'. Source: ").concat(_this5._getErrorContext(), "."), [selection]);
      }

      var _this5$_splitConditio = _this5._splitConditions(node.directives),
          conditions = _this5$_splitConditio[0],
          directives = _this5$_splitConditio[1];

      var conditionalNodes = applyConditions(conditions, // $FlowFixMe(>=0.28.0)
      [(0, _objectSpread2["default"])({}, node, {
        directives: directives
      })]);

      if (conditionalNodes.length !== 1) {
        throw createCompilerError("Expected exactly one condition node. Source: ".concat(_this5._getErrorContext()), null, selection.directives);
      }

      return conditionalNodes[0];
    });
  };

  _proto2._transformInlineFragment = function _transformInlineFragment(fragment, parentType) {
    var typeCondition = assertCompositeType(fragment.typeCondition ? getTypeFromAST(this._schema, fragment.typeCondition) : parentType);

    var directives = this._transformDirectives(fragment.directives || []);

    var selections = this._transformSelections(fragment.selectionSet, typeCondition);

    return {
      kind: 'InlineFragment',
      directives: directives,
      loc: buildLocation(fragment.loc),
      metadata: null,
      selections: selections,
      typeCondition: typeCondition
    };
  };

  _proto2._transformFragmentSpread = function _transformFragmentSpread(fragmentSpread, parentType) {
    var _this6 = this;

    var fragmentName = getName(fragmentSpread);

    var _partitionArray = partitionArray(fragmentSpread.directives || [], function (directive) {
      return getName(directive) !== ARGUMENTS;
    }),
        otherDirectives = _partitionArray[0],
        argumentDirectives = _partitionArray[1];

    if (argumentDirectives.length > 1) {
      throw createUserError("Directive @".concat(ARGUMENTS, " may be used at most once per a fragment spread. ") + "Source: ".concat(this._getErrorContext()), null, argumentDirectives);
    }

    var fragmentDefinition = this._entries.get(fragmentName);

    var fragmentArgumentDefinitions = fragmentDefinition === null || fragmentDefinition === void 0 ? void 0 : fragmentDefinition.variableDefinitions;
    var args;

    if (argumentDirectives.length) {
      args = (argumentDirectives[0].arguments || []).map(function (arg) {
        var _ref;

        var argName = getName(arg);
        var argValue = arg.value;
        var argumentDefinition = fragmentArgumentDefinitions != null ? fragmentArgumentDefinitions.get(argName) : null;
        var argumentType = (_ref = argumentDefinition === null || argumentDefinition === void 0 ? void 0 : argumentDefinition.type) !== null && _ref !== void 0 ? _ref : null;

        if (argValue.kind === 'Variable') {
          // TODO: check the type of the variable and use the type
          return {
            kind: 'Argument',
            loc: buildLocation(arg.loc),
            metadata: null,
            name: argName,
            value: _this6._transformVariable(argValue, null),
            type: null
          };
        } else {
          if (argumentType == null) {
            var _this$_entries$get;

            throw createUserError("Literal @".concat(ARGUMENTS, " values are only supported when the ") + "argument is defined with @".concat(ARGUMENT_DEFINITIONS, ". Check ") + "the definition of fragment '".concat(fragmentName, "'."), null, [arg.value, (_this$_entries$get = _this6._entries.get(fragmentName)) === null || _this$_entries$get === void 0 ? void 0 : _this$_entries$get.definition].filter(Boolean));
          }

          var _value = _this6._transformValue(argValue, argumentType);

          return {
            kind: 'Argument',
            loc: buildLocation(arg.loc),
            metadata: null,
            name: argName,
            value: _value,
            type: argumentType
          };
        }
      });
    }

    var directives = this._transformDirectives(otherDirectives);

    return {
      kind: 'FragmentSpread',
      args: args || [],
      metadata: null,
      loc: buildLocation(fragmentSpread.loc),
      name: fragmentName,
      directives: directives
    };
  };

  _proto2._transformField = function _transformField(field, parentType) {
    var name = getName(field);

    var fieldDef = this._getFieldDefinition(this._schema, parentType, name, field);

    if (fieldDef == null) {
      throw createUserError("Unknown field '".concat(name, "' on type '").concat(String(parentType), "'. Source: ").concat(this._getErrorContext()), null, [field]);
    }

    var alias = field.alias ? field.alias.value : null;

    var args = this._transformArguments(field.arguments || [], fieldDef.args);

    var _partitionArray2 = partitionArray(field.directives || [], function (directive) {
      return getName(directive) !== CLIENT_FIELD;
    }),
        otherDirectives = _partitionArray2[0],
        clientFieldDirectives = _partitionArray2[1];

    var directives = this._transformDirectives(otherDirectives);

    var type = assertOutputType(fieldDef.type);

    var handles = this._transformHandle(name, args, clientFieldDirectives);

    if (isLeafType(getNamedType(type))) {
      if (field.selectionSet && field.selectionSet.selections && field.selectionSet.selections.length) {
        throw createUserError("Expected no selections for scalar field '".concat(name, "'. Source: ").concat(this._getErrorContext()), null, [field]);
      }

      return {
        kind: 'ScalarField',
        alias: alias,
        args: args,
        directives: directives,
        handles: handles,
        loc: buildLocation(field.loc),
        metadata: null,
        name: name,
        type: assertScalarFieldType(type)
      };
    } else {
      var selections = field.selectionSet ? this._transformSelections(field.selectionSet, type) : null;

      if (selections == null || selections.length === 0) {
        throw createUserError("Expected at least one selection for non-scalar field '".concat(name, "' on type '").concat(String(type), "'. Source: ").concat(this._getErrorContext(), "."), null, [field]);
      }

      return {
        kind: 'LinkedField',
        alias: alias,
        args: args,
        directives: directives,
        handles: handles,
        loc: buildLocation(field.loc),
        metadata: null,
        name: name,
        selections: selections,
        type: type
      };
    }
  };

  _proto2._transformHandle = function _transformHandle(fieldName, fieldArgs, clientFieldDirectives) {
    var _this7 = this;

    var handles;
    clientFieldDirectives.forEach(function (clientFieldDirective) {
      var handleArgument = (clientFieldDirective.arguments || []).find(function (arg) {
        return getName(arg) === CLIENT_FIELD_HANDLE;
      });

      if (handleArgument) {
        var name = null;
        var key = DEFAULT_HANDLE_KEY;
        var filters = null;
        var maybeHandle = transformLiteralValue(handleArgument.value, handleArgument);

        if (typeof maybeHandle !== 'string') {
          throw createUserError("Expected a string literal argument for the @".concat(CLIENT_FIELD, " directive. ") + "Source: ".concat(_this7._getErrorContext()), null, [handleArgument.value]);
        }

        name = maybeHandle;
        var keyArgument = (clientFieldDirective.arguments || []).find(function (arg) {
          return getName(arg) === CLIENT_FIELD_KEY;
        });

        if (keyArgument) {
          var maybeKey = transformLiteralValue(keyArgument.value, keyArgument);

          if (typeof maybeKey !== 'string') {
            throw createUserError("Expected a string literal argument for the @".concat(CLIENT_FIELD, " directive. ") + "Source: ".concat(_this7._getErrorContext()), null, [keyArgument.value]);
          }

          key = maybeKey;
        }

        var filtersArgument = (clientFieldDirective.arguments || []).find(function (arg) {
          return getName(arg) === CLIENT_FIELD_FILTERS;
        });

        if (filtersArgument) {
          var maybeFilters = transformLiteralValue(filtersArgument.value, filtersArgument);

          if (!(Array.isArray(maybeFilters) && maybeFilters.every(function (filter) {
            return typeof filter === 'string' && fieldArgs.some(function (fieldArg) {
              return fieldArg.name === filter;
            });
          }))) {
            throw createUserError("Expected an array of argument names on field '".concat(fieldName, "'. ") + "Source: ".concat(_this7._getErrorContext()), null, [filtersArgument.value]);
          } // $FlowFixMe


          filters = maybeFilters;
        }

        handles = handles || [];
        handles.push({
          name: name,
          key: key,
          filters: filters
        });
      }
    });
    return handles;
  };

  _proto2._transformDirectives = function _transformDirectives(directives) {
    var _this8 = this;

    return directives.map(function (directive) {
      var name = getName(directive);

      var directiveDef = _this8._schema.getDirective(name);

      if (directiveDef == null) {
        throw createUserError("Unknown directive '".concat(name, "'. Source: ").concat(_this8._getErrorContext()), null, [directive]);
      }

      var args = _this8._transformArguments(directive.arguments || [], directiveDef.args);

      return {
        kind: 'Directive',
        loc: buildLocation(directive.loc),
        metadata: null,
        name: name,
        args: args
      };
    });
  };

  _proto2._transformArguments = function _transformArguments(args, argumentDefinitions) {
    var _this9 = this;

    return args.map(function (arg) {
      var argName = getName(arg);
      var argDef = argumentDefinitions.find(function (def) {
        return def.name === argName;
      });

      if (argDef == null) {
        throw createUserError("Unknown argument '".concat(argName, "'. Source: ").concat(_this9._getErrorContext()), null, [arg]);
      }

      var value = _this9._transformValue(arg.value, argDef.type);

      return {
        kind: 'Argument',
        loc: buildLocation(arg.loc),
        metadata: null,
        name: argName,
        value: value,
        type: argDef.type
      };
    });
  };

  _proto2._splitConditions = function _splitConditions(mixedDirectives) {
    var _this10 = this;

    var _partitionArray3 = partitionArray(mixedDirectives, function (directive) {
      return directive.name === INCLUDE || directive.name === SKIP;
    }),
        conditionDirectives = _partitionArray3[0],
        otherDirectives = _partitionArray3[1];

    var conditions = conditionDirectives.map(function (directive) {
      var passingValue = directive.name === INCLUDE;
      var arg = directive.args[0];

      if (arg == null || arg.name !== IF) {
        throw createUserError("Expected an 'if' argument to @".concat(directive.name, ". Source: ").concat(_this10._getErrorContext()), [directive.loc]);
      }

      if (!(arg.value.kind === 'Variable' || arg.value.kind === 'Literal')) {
        throw createUserError("Expected the 'if' argument to @".concat(directive.name, " to be a variable or literal. Source: ").concat(_this10._getErrorContext()), [directive.loc]);
      }

      return {
        kind: 'Condition',
        condition: arg.value,
        loc: directive.loc,
        metadata: null,
        passingValue: passingValue,
        selections: []
      };
    });
    var sortedConditions = conditions.sort(function (a, b) {
      if (a.condition.kind === 'Variable' && b.condition.kind === 'Variable') {
        return a.condition.variableName < b.condition.variableName ? -1 : a.condition.variableName > b.condition.variableName ? 1 : 0;
      } else {
        // sort literals earlier, variables later
        return a.condition.kind === 'Variable' ? 1 : b.condition.kind === 'Variable' ? -1 : 0;
      }
    });
    return [sortedConditions, otherDirectives];
  };

  _proto2._transformVariable = function _transformVariable(ast, usedAsType) {
    var variableName = getName(ast);

    this._recordAndVerifyVariableReference(ast, variableName, usedAsType);

    return {
      kind: 'Variable',
      loc: buildLocation(ast.loc),
      metadata: null,
      variableName: variableName,
      type: usedAsType
    };
  };
  /**
   * Transforms and validates argument values according to the expected
   * type.
   */


  _proto2._transformValue = function _transformValue(ast, type) {
    if (ast.kind === 'Variable') {
      // Special case variables since there is no value to parse
      return this._transformVariable(ast, type);
    } else if (ast.kind === 'NullValue') {
      // Special case null literals since there is no value to parse
      if (type instanceof GraphQLNonNull) {
        throw createUserError("Expected a value matching type '".concat(String(type), "'."), null, [ast]);
      }

      return {
        kind: 'Literal',
        loc: buildLocation(ast.loc),
        metadata: null,
        value: null
      };
    } else {
      return this._transformNonNullLiteral(ast, type);
    }
  };
  /**
   * Transforms and validates non-null literal (non-variable) values
   * according to the expected type.
   */


  _proto2._transformNonNullLiteral = function _transformNonNullLiteral(ast, type) {
    var _this11 = this;

    // Transform the value based on the type without a non-null wrapper.
    // Note that error messages should still use the original `type`
    // since that accurately describes to the user what the expected
    // type is (using nullableType would suggest that `null` is legal
    // even when it may not be, for example).
    var nullableType = getNullableType(type);

    if (nullableType instanceof GraphQLList) {
      if (ast.kind !== 'ListValue') {
        // Parse singular (non-list) values flowing into a list type
        // as scalars, ie without wrapping them in an array.
        return this._transformValue(ast, nullableType.ofType);
      }

      var itemType = assertInputType(nullableType.ofType);
      var literalList = [];
      var items = [];
      var areAllItemsScalar = true;
      ast.values.forEach(function (item) {
        var itemValue = _this11._transformValue(item, itemType);

        if (itemValue.kind === 'Literal') {
          literalList.push(itemValue.value);
        }

        items.push(itemValue);
        areAllItemsScalar = areAllItemsScalar && itemValue.kind === 'Literal';
      });

      if (areAllItemsScalar) {
        return {
          kind: 'Literal',
          loc: buildLocation(ast.loc),
          metadata: null,
          value: literalList
        };
      } else {
        return {
          kind: 'ListValue',
          loc: buildLocation(ast.loc),
          metadata: null,
          items: items
        };
      }
    } else if (nullableType instanceof GraphQLInputObjectType) {
      var objectType = nullableType;

      if (ast.kind !== 'ObjectValue') {
        throw createUserError("Expected a value matching type '".concat(String(type), "'."), null, [ast]);
      }

      var literalObject = {};
      var fields = [];
      var areAllFieldsScalar = true;
      ast.fields.forEach(function (field) {
        var fieldName = getName(field);
        var fieldConfig = objectType.getFields()[fieldName];

        if (fieldConfig == null) {
          throw createUserError("Uknown field '".concat(fieldName, "' on type '").concat(String(type), "'."), null, [field]);
        }

        var fieldType = assertInputType(fieldConfig.type);

        var fieldValue = _this11._transformValue(field.value, fieldType);

        if (fieldValue.kind === 'Literal') {
          literalObject[field.name.value] = fieldValue.value;
        }

        fields.push({
          kind: 'ObjectFieldValue',
          loc: buildLocation(field.loc),
          metadata: null,
          name: fieldName,
          value: fieldValue
        });
        areAllFieldsScalar = areAllFieldsScalar && fieldValue.kind === 'Literal';
      });

      if (areAllFieldsScalar) {
        return {
          kind: 'Literal',
          loc: buildLocation(ast.loc),
          metadata: null,
          value: literalObject
        };
      } else {
        return {
          kind: 'ObjectValue',
          loc: buildLocation(ast.loc),
          metadata: null,
          fields: fields
        };
      }
    } else if (nullableType === GraphQLID) {
      // GraphQLID's parseLiteral() always returns the string value. However
      // the int/string distinction may be important at runtime, so this
      // transform parses int/string literals into the corresponding JS types.
      if (ast.kind === 'IntValue') {
        return {
          kind: 'Literal',
          loc: buildLocation(ast.loc),
          metadata: null,
          value: parseInt(ast.value, 10)
        };
      } else if (ast.kind === 'StringValue') {
        return {
          kind: 'Literal',
          loc: buildLocation(ast.loc),
          metadata: null,
          value: ast.value
        };
      } else {
        throw createUserError("Invalid value, expected a value matching type '".concat(String(type), "'."), null, [ast]);
      }
    } else if (nullableType instanceof GraphQLScalarType || nullableType instanceof GraphQLEnumType) {
      var _value2 = nullableType.parseLiteral(ast);

      if (_value2 == null) {
        // parseLiteral() should return a non-null JavaScript value
        // if the ast value is valid for the type.
        throw createUserError("Expected a value matching type '".concat(String(type), "'."), null, [ast]);
      }

      return {
        kind: 'Literal',
        loc: buildLocation(ast.loc),
        metadata: null,
        value: _value2
      };
    } else {
      nullableType;
      throw createCompilerError("Unsupported type '".concat(String(type), "' for input value, expected a GraphQLList, ") + 'GraphQLInputObjectType, GraphQLEnumType, or GraphQLScalarType.', null, [ast]);
    }
  };

  return GraphQLDefinitionParser;
}();
/**
 * @private
 */


function transformLiteralValue(ast, context) {
  switch (ast.kind) {
    case 'IntValue':
      return parseInt(ast.value, 10);

    case 'FloatValue':
      return parseFloat(ast.value);

    case 'StringValue':
      return ast.value;

    case 'BooleanValue':
      // Note: duplicated because Flow does not understand fall-through cases
      return ast.value;

    case 'EnumValue':
      // Note: duplicated because Flow does not understand fall-through cases
      return ast.value;

    case 'ListValue':
      return ast.values.map(function (item) {
        return transformLiteralValue(item, context);
      });

    case 'NullValue':
      return null;

    case 'ObjectValue':
      {
        var objectValue = {};
        ast.fields.forEach(function (field) {
          var fieldName = getName(field);
          var value = transformLiteralValue(field.value, context);
          objectValue[fieldName] = value;
        });
        return objectValue;
      }

    case 'Variable':
      throw createUserError('Unexpected variable where a literal (static) value is required.', null, [ast, context]);

    default:
      ast.kind;
      throw createCompilerError("Unknown ast kind '".concat(ast.kind, "'."), [ast]);
  }
}
/**
 * @private
 */


function buildArgumentDefinitions(variables) {
  return Array.from(variables.values(), function (_ref4) {
    var ast = _ref4.ast,
        name = _ref4.name,
        type = _ref4.type,
        defaultValue = _ref4.defaultValue;
    return {
      kind: 'LocalArgumentDefinition',
      loc: buildLocation(ast.loc),
      metadata: null,
      name: name,
      type: type,
      defaultValue: defaultValue
    };
  });
}
/**
 * @private
 */


function buildLocation(loc) {
  if (loc == null) {
    return {
      kind: 'Unknown'
    };
  }

  return {
    kind: 'Source',
    start: loc.start,
    end: loc.end,
    source: loc.source
  };
}
/**
 * @private
 */


function isScalarFieldType(type) {
  var namedType = getNamedType(type);
  return namedType instanceof GraphQLScalarType || namedType instanceof GraphQLEnumType;
}
/**
 * @private
 */


function assertScalarFieldType(type) {
  if (!isScalarFieldType(type)) {
    throw createUserError("Expected a scalar field type, got type '".concat(String(type), "'."));
  }

  return type;
}
/**
 * @private
 */


function applyConditions(conditions, selections) {
  var nextSelections = selections;
  conditions.forEach(function (condition) {
    nextSelections = [(0, _objectSpread2["default"])({}, condition, {
      selections: nextSelections
    })];
  });
  return nextSelections;
}
/**
 * @private
 */


function getName(ast) {
  var _ast$name;

  var name = (_ast$name = ast.name) === null || _ast$name === void 0 ? void 0 : _ast$name.value;

  if (typeof name !== 'string') {
    throw createCompilerError("Expected ast node to have a 'name'.", null, [ast]);
  }

  return name;
}
/**
 * Partitions an array given a predicate. All elements satisfying the predicate
 * are part of the first returned array, and all elements that don't are in the
 * second.
 *
 * @private
 */


function partitionArray(array, predicate) {
  var first = [];
  var second = [];

  for (var i = 0; i < array.length; i++) {
    var item = array[i];

    if (predicate(item)) {
      first.push(item);
    } else {
      second.push(item);
    }
  }

  return [first, second];
}

module.exports = {
  parse: parse,
  transform: transform
};