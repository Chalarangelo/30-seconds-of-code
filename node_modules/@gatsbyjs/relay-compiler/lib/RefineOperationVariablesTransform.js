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

var inferRootArgumentDefinitions = require("./inferRootArgumentDefinitions");

var _require = require("./RelayCompilerError"),
    createCombinedError = _require.createCombinedError,
    createUserError = _require.createUserError,
    eachWithErrors = _require.eachWithErrors;

/**
 * Refines the argument definitions for operations to remove unused arguments
 * due to statically pruned conditional branches (e.g. because of overriding
 * a variable used in `@include()` to be false) and checks that all variables
 * referenced in each operation are defined. Reports aggregated errors for all
 * operations.
 */
function stripUnusedVariablesTransform(context) {
  var contextWithUsedArguments = inferRootArgumentDefinitions(context);
  var nextContext = context;
  var errors = eachWithErrors(context.documents(), function (node) {
    if (node.kind !== 'Root') {
      return;
    }

    var nodeWithUsedArguments = contextWithUsedArguments.getRoot(node.name);
    var definedArguments = argumentDefinitionsToMap(node.argumentDefinitions);
    var usedArguments = argumentDefinitionsToMap(nodeWithUsedArguments.argumentDefinitions); // All used arguments must be defined

    var undefinedVariables = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = usedArguments.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var argDef = _step.value;

        if (!definedArguments.has(argDef.name)) {
          undefinedVariables.push(argDef);
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

    if (undefinedVariables.length !== 0) {
      throw createUserError("Operation '".concat(node.name, "' references undefined variable(s):\n").concat(undefinedVariables.map(function (argDef) {
        return "- $".concat(argDef.name, ": ").concat(String(argDef.type));
      }).join('\n'), "."), undefinedVariables.map(function (argDef) {
        return argDef.loc;
      }));
    } // Remove unused argument definitions


    nextContext = nextContext.replace((0, _objectSpread2["default"])({}, node, {
      argumentDefinitions: node.argumentDefinitions.filter(function (argDef) {
        return usedArguments.has(argDef.name);
      })
    }));
  });

  if (errors != null && errors.length !== 0) {
    throw createCombinedError(errors);
  }

  return nextContext;
}

function argumentDefinitionsToMap(argDefs) {
  var map = new Map();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = argDefs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var argDef = _step2.value;
      map.set(argDef.name, argDef);
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

  return map;
}

module.exports = {
  transform: stripUnusedVariablesTransform
};