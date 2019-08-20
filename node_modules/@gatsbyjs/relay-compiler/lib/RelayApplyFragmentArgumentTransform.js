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

var RelayCompilerScope = require("./RelayCompilerScope");

var getIdentifierForArgumentValue = require("./getIdentifierForArgumentValue");

var murmurHash = require("./murmurHash");

var _require = require("./RelayCompilerError"),
    createCompilerError = _require.createCompilerError,
    createNonRecoverableUserError = _require.createNonRecoverableUserError;

var getFragmentScope = RelayCompilerScope.getFragmentScope,
    getRootScope = RelayCompilerScope.getRootScope;
/**
 * A tranform that converts a set of documents containing fragments/fragment
 * spreads *with* arguments to one where all arguments have been inlined. This
 * is effectively static currying of functions. Nodes are changed as follows:
 * - Fragment spreads with arguments are replaced with references to an inlined
 *   version of the referenced fragment.
 * - Fragments with argument definitions are cloned once per unique set of
 *   arguments, with the name changed to original name + hash and all nested
 *   variable references changed to the value of that variable given its
 *   arguments.
 * - Field & directive argument variables are replaced with the value of those
 *   variables in context.
 * - All nodes are cloned with updated children.
 *
 * The transform also handles statically passing/failing Condition nodes:
 * - Literal Conditions with a passing value are elided and their selections
 *   inlined in their parent.
 * - Literal Conditions with a failing value are removed.
 * - Nodes that would become empty as a result of the above are removed.
 *
 * Note that unreferenced fragments are not added to the output.
 */

function relayApplyFragmentArgumentTransform(context) {
  var fragments = new Map();
  var nextContext = IRTransformer.transform(context, {
    Root: function Root(node) {
      var scope = getRootScope(node.argumentDefinitions);
      return transformNode(context, fragments, scope, node, [node]);
    },
    // Fragments are included below where referenced.
    // Unreferenced fragments are not included.
    Fragment: function Fragment() {
      return null;
    }
  });
  return Array.from(fragments.values()).reduce(function (ctx, fragment) {
    return fragment ? ctx.add(fragment) : ctx;
  }, nextContext);
}

function transformNode(context, fragments, scope, node, errorContext) {
  var selections = transformSelections(context, fragments, scope, node.selections, errorContext);

  if (!selections) {
    return null;
  }

  if (node.hasOwnProperty('directives')) {
    var directives = transformDirectives(scope, node.directives, errorContext); // $FlowIssue: this is a valid `Node`:

    return (0, _objectSpread2["default"])({}, node, {
      directives: directives,
      selections: selections
    });
  }

  return (0, _objectSpread2["default"])({}, node, {
    selections: selections
  });
}

function transformFragmentSpread(context, fragments, scope, spread, errorContext) {
  var directives = transformDirectives(scope, spread.directives, errorContext);
  var appliedFragment = transformFragment(context, fragments, scope, spread, spread.args, (0, _toConsumableArray2["default"])(errorContext).concat([spread]));

  if (!appliedFragment) {
    return null;
  }

  var transformed = (0, _objectSpread2["default"])({}, spread, {
    kind: 'FragmentSpread',
    args: [],
    directives: directives,
    name: appliedFragment.name
  });
  return transformed;
}

function transformField(context, fragments, scope, field, errorContext) {
  var args = transformArguments(scope, field.args, errorContext);
  var directives = transformDirectives(scope, field.directives, errorContext);

  if (field.kind === 'LinkedField' || field.kind === 'MatchField') {
    var selections = transformSelections(context, fragments, scope, field.selections, errorContext);

    if (!selections) {
      return null;
    } // $FlowFixMe(>=0.28.0)


    return (0, _objectSpread2["default"])({}, field, {
      args: args,
      directives: directives,
      selections: selections
    });
  } else {
    return (0, _objectSpread2["default"])({}, field, {
      args: args,
      directives: directives
    });
  }
}

function transformCondition(context, fragments, scope, node, errorContext) {
  var condition = transformValue(scope, node.condition, errorContext);

  if (!(condition.kind === 'Literal' || condition.kind === 'Variable')) {
    // This transform does whole-program optimization, errors in
    // a single document could break invariants and/or cause
    // additional spurious errors.
    throw createNonRecoverableUserError('A non-scalar value was applied to an @include or @skip directive, ' + 'the `if` argument value must be a ' + 'variable or a literal Boolean.', [condition.loc]);
  }

  if (condition.kind === 'Literal' && condition.value !== node.passingValue) {
    // Dead code, no need to traverse further.
    return null;
  }

  var selections = transformSelections(context, fragments, scope, node.selections, errorContext);

  if (!selections) {
    return null;
  }

  if (condition.kind === 'Literal' && condition.value === node.passingValue) {
    // Always passes, return inlined selections
    return selections;
  }

  return [(0, _objectSpread2["default"])({}, node, {
    condition: condition,
    selections: selections
  })];
}

function transformSelections(context, fragments, scope, selections, errorContext) {
  var nextSelections = null;
  selections.forEach(function (selection) {
    var nextSelection;

    if (selection.kind === 'InlineFragment' || selection.kind === 'MatchBranch') {
      nextSelection = transformNode(context, fragments, scope, selection, errorContext);
    } else if (selection.kind === 'FragmentSpread') {
      nextSelection = transformFragmentSpread(context, fragments, scope, selection, errorContext);
    } else if (selection.kind === 'Condition') {
      var conditionSelections = transformCondition(context, fragments, scope, selection, errorContext);

      if (conditionSelections) {
        var _nextSelections;

        nextSelections = nextSelections || [];

        (_nextSelections = nextSelections).push.apply(_nextSelections, (0, _toConsumableArray2["default"])(conditionSelections));
      }
    } else if (selection.kind === 'LinkedField' || selection.kind === 'ScalarField' || selection.kind === 'MatchField') {
      nextSelection = transformField(context, fragments, scope, selection, errorContext);
    } else if (selection.kind === 'Defer' || selection.kind === 'Stream') {
      throw createCompilerError('RelayApplyFragmentArgumentTransform: Expected to be applied before processing @defer/@stream.', [selection.loc]);
    } else {
      selection;
      throw createCompilerError("RelayApplyFragmentArgumentTransform: Unsupported kind '".concat(selection.kind, "'."), [selection.loc]);
    }

    if (nextSelection) {
      nextSelections = nextSelections || [];
      nextSelections.push(nextSelection);
    }
  });
  return nextSelections;
}

function transformDirectives(scope, directives, errorContext) {
  return directives.map(function (directive) {
    var args = transformArguments(scope, directive.args, errorContext);
    return (0, _objectSpread2["default"])({}, directive, {
      args: args
    });
  });
}

function transformArguments(scope, args, errorContext) {
  return args.map(function (arg) {
    var value = transformValue(scope, arg.value, errorContext);
    return value === arg.value ? arg : (0, _objectSpread2["default"])({}, arg, {
      value: value
    });
  });
}

function transformValue(scope, value, errorContext) {
  if (value.kind === 'Variable') {
    var scopeValue = scope[value.variableName];

    if (scopeValue == null) {
      // This transform does whole-program optimization, errors in
      // a single document could break invariants and/or cause
      // additional spurious errors.
      throw createNonRecoverableUserError("Variable '$".concat(value.variableName, "' is not in scope."), [value.loc]);
    }

    return scopeValue;
  } else if (value.kind === 'ListValue') {
    return (0, _objectSpread2["default"])({}, value, {
      items: value.items.map(function (item) {
        return transformValue(scope, item, errorContext);
      })
    });
  } else if (value.kind === 'ObjectValue') {
    return (0, _objectSpread2["default"])({}, value, {
      fields: value.fields.map(function (field) {
        return (0, _objectSpread2["default"])({}, field, {
          value: transformValue(scope, field.value, errorContext)
        });
      })
    });
  }

  return value;
}
/**
 * Apply arguments to a fragment, creating a new fragment (with the given name)
 * with all values recursively applied.
 */


function transformFragment(context, fragments, parentScope, spread, args, errorContext) {
  var fragment = context.getFragment(spread.name);
  var argumentsHash = hashArguments(args, parentScope, errorContext);
  var fragmentName = argumentsHash ? "".concat(fragment.name, "_").concat(argumentsHash) : fragment.name;
  var appliedFragment = fragments.get(fragmentName);

  if (appliedFragment) {
    return appliedFragment;
  }

  var fragmentScope = getFragmentScope(fragment.argumentDefinitions, args, parentScope, spread);

  if (fragments.get(fragmentName) === null) {
    // This transform does whole-program optimization, errors in
    // a single document could break invariants and/or cause
    // additional spurious errors.
    throw createNonRecoverableUserError("Found a circular reference from fragment '".concat(fragment.name, "'."), errorContext.map(function (node) {
      return node.loc;
    }));
  }

  fragments.set(fragmentName, null); // to detect circular references

  var transformedFragment = null;
  var selections = transformSelections(context, fragments, fragmentScope, fragment.selections, errorContext);

  if (selections) {
    transformedFragment = (0, _objectSpread2["default"])({}, fragment, {
      selections: selections,
      name: fragmentName,
      argumentDefinitions: []
    });
  }

  fragments.set(fragmentName, transformedFragment);
  return transformedFragment;
}

function hashArguments(args, scope, errorContext) {
  if (!args.length) {
    return null;
  }

  var sortedArgs = (0, _toConsumableArray2["default"])(args).sort(function (a, b) {
    return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
  });
  var printedArgs = JSON.stringify(sortedArgs.map(function (arg) {
    var value;

    if (arg.value.kind === 'Variable') {
      value = scope[arg.value.variableName];

      if (value == null) {
        // This transform does whole-program optimization, errors in
        // a single document could break invariants and/or cause
        // additional spurious errors.
        throw createNonRecoverableUserError("Variable '$".concat(arg.value.variableName, "' is not in scope."), [arg.value.loc]);
      }
    } else {
      value = arg.value;
    }

    return {
      name: arg.name,
      value: getIdentifierForArgumentValue(value)
    };
  }));
  return murmurHash(printedArgs);
}

module.exports = {
  transform: relayApplyFragmentArgumentTransform
};