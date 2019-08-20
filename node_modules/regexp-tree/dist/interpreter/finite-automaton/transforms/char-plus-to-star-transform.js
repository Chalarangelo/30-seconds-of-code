/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

/**
 * A regexp-tree plugin to replace `a+` to `aa*`, since NFA/DFA
 * handles Kleene-closure `a*`, and `a+` is just a syntactic sugar.
 */

module.exports = {
  Repetition: function Repetition(path) {
    var node = path.node,
        parent = path.parent;


    if (node.quantifier.kind !== '+') {
      return;
    }

    if (parent.type === 'Alternative') {
      path.getParent().insertChildAt(node.expression, path.index);
    } else {
      path.replace({
        type: 'Alternative',
        expressions: [node.expression, node]
      });
    }

    // Change quantifier.
    node.quantifier.kind = '*';
  }
};