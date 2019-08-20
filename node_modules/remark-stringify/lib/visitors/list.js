'use strict';

module.exports = list;

/* Which method to use based on `list.ordered`. */
var ORDERED_MAP = {
  true: 'visitOrderedItems',
  false: 'visitUnorderedItems'
};

function list(node) {
  return this[ORDERED_MAP[node.ordered]](node);
}
