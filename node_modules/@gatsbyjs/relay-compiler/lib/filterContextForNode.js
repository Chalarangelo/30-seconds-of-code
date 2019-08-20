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

var _require = require("./GraphQLIRVisitor"),
    visit = _require.visit;

/**
 * Returns a GraphQLCompilerContext containing only the documents referenced
 * by and including the provided node.
 */
function filterContextForNode(node, context) {
  var queue = [node];
  var filteredContext = new GraphQLCompilerContext(context.serverSchema, context.clientSchema).add(node);

  var visitFragmentSpread = function visitFragmentSpread(fragmentSpread) {
    var name = fragmentSpread.name;

    if (!filteredContext.get(name)) {
      var fragment = context.getFragment(name);
      filteredContext = filteredContext.add(fragment);
      queue.push(fragment);
    }
  };

  var visitorConfig = {
    FragmentSpread: function FragmentSpread(fragmentSpread) {
      visitFragmentSpread(fragmentSpread);
    }
  };

  while (queue.length) {
    visit(queue.pop(), visitorConfig);
  }

  return filteredContext;
}

module.exports = filterContextForNode;