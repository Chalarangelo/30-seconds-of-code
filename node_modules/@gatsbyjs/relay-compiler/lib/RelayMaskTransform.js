/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * All rights reserved.
 *
 * 
 * @format
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var CompilerContext = require("./GraphQLCompilerContext");

var IRTransformer = require("./GraphQLIRTransformer");

var invariant = require("fbjs/lib/invariant");

var _require = require("graphql"),
    isTypeSubTypeOf = _require.isTypeSubTypeOf,
    GraphQLSchema = _require.GraphQLSchema;

/**
 * A transform that inlines fragment spreads with the @relay(mask: false)
 * directive.
 */
function relayMaskTransform(context) {
  return IRTransformer.transform(context, {
    FragmentSpread: visitFragmentSpread,
    Fragment: visitFragment
  }, function () {
    return {
      reachableArguments: []
    };
  });
}

function visitFragment(fragment, state) {
  var result = this.traverse(fragment, state);

  if (state.reachableArguments.length === 0) {
    return result;
  }

  var schema = this.getContext().serverSchema;
  var joinedArgumentDefinitions = joinFragmentArgumentDefinitions(schema, fragment, state.reachableArguments);
  return (0, _objectSpread2["default"])({}, result, {
    argumentDefinitions: joinedArgumentDefinitions
  });
}

function visitFragmentSpread(fragmentSpread, state) {
  if (!isUnmaskedSpread(fragmentSpread)) {
    return fragmentSpread;
  }

  !(fragmentSpread.args.length === 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RelayMaskTransform: Cannot unmask fragment spread `%s` with ' + 'arguments. Use the `ApplyFragmentArgumentTransform` before flattening', fragmentSpread.name) : invariant(false) : void 0;
  var context = this.getContext();
  var fragment = context.getFragment(fragmentSpread.name);
  var result = {
    kind: 'InlineFragment',
    directives: fragmentSpread.directives,
    loc: {
      kind: 'Derived',
      source: fragmentSpread.loc
    },
    metadata: fragmentSpread.metadata,
    selections: fragment.selections,
    typeCondition: fragment.type
  };
  !!fragment.argumentDefinitions.find(function (argDef) {
    return argDef.kind === 'LocalArgumentDefinition';
  }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RelayMaskTransform: Cannot unmask fragment spread `%s` because it has local ' + 'argument definition.', fragmentSpread.name) : invariant(false) : void 0; // Note: defer validating arguments to the containing fragment in order
  // to list all invalid variables/arguments instead of only one.

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = fragment.argumentDefinitions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var argDef = _step.value;
      state.reachableArguments.push({
        argDef: argDef,
        source: fragmentSpread.name
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

  return this.traverse(result, state);
}
/**
 * @private
 */


function isUnmaskedSpread(spread) {
  return Boolean(spread.metadata && spread.metadata.mask === false);
}
/**
 * @private
 *
 * Attempts to join the argument definitions for a root fragment
 * and any unmasked fragment spreads reachable from that root fragment,
 * returning a combined list of arguments or throwing if the same
 * variable(s) are used in incompatible ways in different fragments.
 */


function joinFragmentArgumentDefinitions(schema, fragment, reachableArguments) {
  var joinedArgumentDefinitions = new Map();
  fragment.argumentDefinitions.forEach(function (prevArgDef) {
    joinedArgumentDefinitions.set(prevArgDef.name, prevArgDef);
  });
  var errors = [];
  reachableArguments.forEach(function (nextArg) {
    var nextArgDef = nextArg.argDef,
        source = nextArg.source;
    var prevArgDef = joinedArgumentDefinitions.get(nextArgDef.name);

    if (prevArgDef) {
      var joinedArgDef = joinArgumentDefinition(schema, prevArgDef, nextArgDef);

      if (joinedArgDef === null) {
        errors.push("Variable `$".concat(nextArgDef.name, "` in `").concat(source, "`"));
      } else {
        joinedArgumentDefinitions.set(joinedArgDef.name, joinedArgDef);
      }
    } else {
      joinedArgumentDefinitions.set(nextArgDef.name, nextArgDef);
    }
  });

  if (errors.length) {
    throw new Error('RelayMaskTransform: Cannot unmask one or more fragments in ' + "`".concat(fragment.name, "`, the following variables are referenced more ") + 'than once with incompatible kinds/types:\n' + errors.map(function (msg) {
      return "* ".concat(msg);
    }).join('\n'));
  }

  return Array.from(joinedArgumentDefinitions.values());
}
/**
 * @private
 *
 * Attempts to join two argument definitions, returning a single argument
 * definition that is compatible with both of the inputs:
 * - If the kind, name, or defaultValue is different then the arguments
 *   cannot be joined, indicated by returning null.
 * - If either of next/prev is a subtype of the other, return the one
 *   that is the subtype: a more narrow type can flow into a more general
 *   type but not the inverse.
 * - Otherwise there is no subtyping relation between prev/next, so return
 *   null to indicate they cannot be joined.
 */


function joinArgumentDefinition(schema, prevArgDef, nextArgDef) {
  if (prevArgDef.kind !== nextArgDef.kind || prevArgDef.name !== nextArgDef.name || // Only LocalArgumentDefinition defines defaultValue
  prevArgDef.defaultValue !== nextArgDef.defaultValue) {
    return null;
  } else if (isTypeSubTypeOf(schema, nextArgDef.type, prevArgDef.type)) {
    // prevArgDef is less strict than nextArgDef
    return nextArgDef;
  } else if (isTypeSubTypeOf(schema, prevArgDef.type, nextArgDef.type)) {
    return prevArgDef;
  } else {
    return null;
  }
}

module.exports = {
  transform: relayMaskTransform
};