'use strict';

module.exports = label;

/* Stringify a reference label.
 * Because link references are easily, mistakingly,
 * created (for example, `[foo]`), reference nodes have
 * an extra property depicting how it looked in the
 * original document, so stringification can cause minimal
 * changes. */
function label(node) {
  var type = node.referenceType;
  var value = type === 'full' ? node.identifier : '';

  return type === 'shortcut' ? value : '[' + value + ']';
}
