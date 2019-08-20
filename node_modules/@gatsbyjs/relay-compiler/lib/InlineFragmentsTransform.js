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

var GraphQLCompilerContext = require("./GraphQLCompilerContext");

var GraphQLIRTransformer = require("./GraphQLIRTransformer");

var invariant = require("fbjs/lib/invariant");

/**
 * A transform that inlines all fragments and removes them.
 */
function inlineFragmentsTransform(context) {
  return GraphQLIRTransformer.transform(context, {
    Fragment: visitFragment,
    FragmentSpread: visitFragmentSpread
  });
}

function visitFragment(fragment) {
  return null;
}

function visitFragmentSpread(fragmentSpread) {
  !(fragmentSpread.args.length === 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'InlineFragmentsTransform: Cannot flatten fragment spread `%s` with ' + 'arguments. Use the `ApplyFragmentArgumentTransform` before flattening', fragmentSpread.name) : invariant(false) : void 0;
  var fragment = this.getContext().getFragment(fragmentSpread.name);
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
  return this.traverse(result);
}

module.exports = {
  transform: inlineFragmentsTransform
};