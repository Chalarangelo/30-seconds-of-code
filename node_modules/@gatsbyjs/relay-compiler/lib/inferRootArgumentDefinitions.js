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

var GraphQLCompilerContext = require("./GraphQLCompilerContext");

var GraphQLIRVisitor = require("./GraphQLIRVisitor");

var _require = require("./RelayCompilerError"),
    createCompilerError = _require.createCompilerError;

var _require2 = require("graphql"),
    GraphQLNonNull = _require2.GraphQLNonNull,
    GraphQLBoolean = _require2.GraphQLBoolean;

/**
 * Returns a transformed version of the input context where each document's
 * argument definitions are updated to accurately describe the root variables
 * used (or reachable) from that document:
 * - Fragment argument definitions are updated to include local argument
 *   definitions and any root variables that are referenced
 *   by the fragment (or any fragments it transitively spreads).
 * - Root argument definitions are updated to reflect the variables
 *   referenced locally and all root variables referenced by any
 *   fragments it (transitively) spreads.
 */
function inferRootArgumentDefinitions(context) {
  // This transform does two main tasks:
  // - Determine the set of root variables referenced locally in each
  //   fragment. Note that RootArgumentDefinitions in the fragment's
  //   argumentDefinitions can contain spurious entries for legacy
  //   reasons. Instead of using those the fragment is traversed
  //   to reanalyze variable usage.
  // - Determine the set of root variables that are transitively referenced
  //   by each fragment, ie the union of all root variables used in the
  //   fragment and any fragments it transitively spreads.
  // Cache fragments as they are transformed to avoid duplicate processing.
  // Because @argument values don't matter (only variable names/types),
  // each reachable fragment only has to be checked once.
  var transformed = new Map();
  var nextContext = new GraphQLCompilerContext(context.serverSchema, context.clientSchema);
  return nextContext.addAll(Array.from(context.documents(), function (node) {
    switch (node.kind) {
      case 'Fragment':
        {
          var argumentDefinitions = transformFragmentArguments(context, transformed, node);
          return (0, _objectSpread2["default"])({}, node, {
            argumentDefinitions: Array.from(argumentDefinitions.values())
          });
        }

      case 'Root':
        {
          return transformRoot(context, transformed, node);
        }

      case 'SplitOperation':
        {
          return node;
        }

      default:
        {
          node;
          throw createCompilerError("inferRootArgumentDefinitions: Unsupported kind '".concat(node.kind, "'."));
        }
    }
  }));
}

function transformRoot(context, transformed, root) {
  // Ignore argument definitions, determine what root variables are
  // transitively referenced
  var argumentDefinitions = new Map();
  var localArgumentDefinitions = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = root.argumentDefinitions.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _step.value,
          name = _step$value[0],
          argDef = _step$value[1];

      if (argDef.kind === 'LocalArgumentDefinition') {
        localArgumentDefinitions.set(name, argDef);
      }
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

  visit(context, transformed, argumentDefinitions, root);
  return (0, _objectSpread2["default"])({}, root, {
    argumentDefinitions: Array.from(argumentDefinitions.values(), function (argDef) {
      var _ref, _ref2;

      if (argDef.kind !== 'RootArgumentDefinition') {
        throw createCompilerError("inferRootArgumentDefinitions: Expected inferred variable '$".concat(argDef.name, "' to be a root variables."), [argDef.loc]);
      }

      var localDefinition = localArgumentDefinitions.get(argDef.name);
      return {
        defaultValue: (_ref = localDefinition === null || localDefinition === void 0 ? void 0 : localDefinition.defaultValue) !== null && _ref !== void 0 ? _ref : null,
        kind: 'LocalArgumentDefinition',
        loc: argDef.loc,
        metadata: null,
        name: argDef.name,
        type: (_ref2 = localDefinition === null || localDefinition === void 0 ? void 0 : localDefinition.type) !== null && _ref2 !== void 0 ? _ref2 : argDef.type
      };
    })
  });
}

function transformFragmentArguments(context, transformed, fragment) {
  var name = fragment.name;
  var transformedArguments = transformed.get(name);

  if (transformedArguments != null) {
    return transformedArguments;
  } // Start with only the explicitly defined local arguments, recover the
  // correct set of root variables excluding invalid @arguments values.


  var argumentDefinitions = new Map();
  fragment.argumentDefinitions.forEach(function (argDef) {
    if (argDef.kind === 'LocalArgumentDefinition') {
      argumentDefinitions.set(argDef.name, argDef);
    }
  }); // Break cycles by initially caching a version that only has local
  // arguments. If the current fragment is reached again, it won't have
  // any root variables to add to its parents. The traversal below will
  // find any root variables and update the cached version of the
  // fragment.

  transformed.set(name, argumentDefinitions);
  visit(context, transformed, argumentDefinitions, fragment);
  transformed.set(name, argumentDefinitions);
  return argumentDefinitions;
}

function visit(context, transformed, argumentDefinitions, node) {
  GraphQLIRVisitor.visit(node, {
    FragmentSpread: function FragmentSpread(fragmentSpread) {
      var fragment;

      try {
        fragment = context.getFragment(fragmentSpread.name);
      } catch (_unused) {
        // Handle cases where a compat fragment references a classic fragment
        // that is not accessible to Relay compiler
        // TODO: disallow unknown fragment references
        // throw createCompilerError(
        //   `Document '${node.name}' referenced unknown fragment '${
        //     fragmentSpread.name
        //   }'.`,
        //   [fragmentSpread.loc],
        // );
        return false;
      }

      var referencedFragmentArguments = transformFragmentArguments(context, transformed, fragment); // Detect root variables being passed as the value of @arguments;
      // recover the expected type from the corresponding argument definitions.

      fragmentSpread.args.forEach(function (arg) {
        var argDef = referencedFragmentArguments.get(arg.name);

        if (argDef != null && arg.value.kind === 'Variable' && !argumentDefinitions.has(arg.value.variableName)) {
          argumentDefinitions.set(arg.value.variableName, {
            kind: 'RootArgumentDefinition',
            loc: {
              kind: 'Derived',
              source: arg.loc
            },
            metadata: null,
            name: arg.value.variableName,
            type: argDef.type
          });
        }
      }); // Merge any root variables referenced by the spread fragment
      // into this (parent) fragment's arguments.

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = referencedFragmentArguments.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var argDef = _step2.value;

          if (argDef.kind === 'RootArgumentDefinition' && !argumentDefinitions.has(argDef.name)) {
            argumentDefinitions.set(argDef.name, argDef);
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

      return false;
    },
    Argument: function Argument(argument) {
      if (argument.value.kind !== 'Variable') {
        return false;
      }

      var variable = argument.value;

      if (argument.type == null && variable.type == null) {
        return;
      }

      if (!argumentDefinitions.has(variable.variableName)) {
        // root variable
        argumentDefinitions.set(variable.variableName, {
          kind: 'RootArgumentDefinition',
          loc: {
            kind: 'Derived',
            source: argument.loc
          },
          metadata: null,
          name: variable.variableName,
          type: variable.type || argument.type
        });
      }

      return false;
    },
    Condition: function Condition(condition) {
      var _variable$type;

      if (condition.condition.kind !== 'Variable') {
        return;
      }

      var variable = condition.condition;
      var type = (_variable$type = variable.type) !== null && _variable$type !== void 0 ? _variable$type : new GraphQLNonNull(GraphQLBoolean);

      if (!argumentDefinitions.has(variable.variableName)) {
        // root variable
        argumentDefinitions.set(variable.variableName, {
          kind: 'RootArgumentDefinition',
          loc: {
            kind: 'Derived',
            source: condition.loc
          },
          metadata: null,
          name: variable.variableName,
          type: type
        });
      }
    }
  });
}

module.exports = inferRootArgumentDefinitions;