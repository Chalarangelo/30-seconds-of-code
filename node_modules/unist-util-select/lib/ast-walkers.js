'use strict';

var TypeIndex = require('./type-index');

var walkers = exports;


// All walkers accept `opts` arguments (occasionally referred to as
// `searchOpts`) which is an object with the following fields:
//
//   - iterator: function(node, nodeIndex, parent, [props]))
//         function running once for each node being walked over, in order
//
//   - [typeIndex]: boolean=false
//         if true, `props` will have an integer `typeIndex` field which
//         represents a node index among all its sibling of the same type
//
//   - [typeCount]: boolean=false
//         if true, `props` will have an integer `typeCount` field which
//         is equal to number of siblings sharing the same type with this node
//


walkers.topScan = function (node, nodeIndex, parent, opts) {
  if (parent) {
    // We would like to avoid spinning an extra loop through the starting
    // node's siblings just to count its typeIndex.
    throw Error('topScan is supposed to be called from the root node');
  }

  if (!opts.typeIndex && !opts.typeCount) {
    opts.iterator(node, nodeIndex, parent);
  }
  walkers.descendant.apply(this, arguments);
};


walkers.descendant = function (node, nodeIndex, parent, opts) {
  var iterator = opts.iterator;

  opts.iterator = function (node, nodeIndex, parent) {
    iterator.apply(this, arguments);
    walkers.child(node, nodeIndex, node, opts);
  };

  return walkers.child(node, nodeIndex, parent, opts);
};


walkers.child = function (node, nodeIndex, parent, opts) {
  if (!node.children || !node.children.length) {
    return;
  }

  walkIterator(node, opts)
    .each()
    .finally();
};


walkers.adjacentSibling = function (node, nodeIndex, parent, opts) {
  if (!parent) {
    return;
  }

  walkIterator(parent, opts)
    .prefillTypeIndex(0, ++nodeIndex)
    .each(nodeIndex, ++nodeIndex)
    .prefillTypeIndex(nodeIndex)
    .finally();
};


walkers.generalSibling = function (node, nodeIndex, parent, opts) {
  if (!parent) {
    return;
  }

  walkIterator(parent, opts)
    .prefillTypeIndex(0, ++nodeIndex)
    .each(nodeIndex)
    .finally();
};


// Handles typeIndex and typeCount properties for every walker.
function walkIterator (parent, opts) {
  var hasTypeIndex = opts.typeIndex || opts.typeCount;
  var typeIndex = hasTypeIndex ? TypeIndex() : Function.prototype;
  var nodeThunks = [];

  var rangeDefaults = function (iter) {
    return function (start, end) {
      if (start == null || start < 0) {
        start = 0;
      }
      if (end == null || end > parent.children.length) {
        end = parent.children.length;
      }
      return iter.call(this, start, end);
    };
  };

  return {
    prefillTypeIndex: rangeDefaults(function (start, end) {
      if (hasTypeIndex) {
        for (var nodeIndex = start; nodeIndex < end; ++nodeIndex) {
          typeIndex(parent.children[nodeIndex]);
        }
      }
      return this;
    }),

    each: rangeDefaults(function each (start, end) {
      if (start >= end) {
        return this;
      }

      var nodeIndex = start;
      var node = parent.children[nodeIndex];
      var props = {};
      var nodeTypeIndex = typeIndex(node);

      if (opts.typeIndex) {
        props.typeIndex = nodeTypeIndex;
      }

      if (opts.typeCount) {
        nodeThunks.push(function () {
          props.typeCount = typeIndex.count(node);
          pushNode();
        });
      }
      else {
        pushNode();
      }

      return each.call(this, start + 1, end);

      function pushNode () {
        opts.iterator(node, nodeIndex, parent, props);
      }
    }),

    finally: function () {
      nodeThunks.forEach(Function.call.bind(Function.call));
      return this;
    }
  };
}
