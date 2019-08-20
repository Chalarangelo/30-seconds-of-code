'use strict';

module.exports = text;

/* Stringify text.
 * Supports named entities in `settings.encode: true` mode:
 *
 *     AT&amp;T
 *
 * Supports numbered entities in `settings.encode: numbers`
 * mode:
 *
 *     AT&#x26;T
 */
function text(node, parent) {
  return this.encode(this.escape(node.value, node, parent), node);
}
