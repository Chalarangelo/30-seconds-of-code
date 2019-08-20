'use strict';

var returner = require('./returner');

module.exports = enter;

/* Shortcut and collapsed link references need no escaping
 * and encoding during the processing of child nodes (it
 * must be implied from identifier).
 *
 * This toggler turns encoding and escaping off for shortcut
 * and collapsed references.
 *
 * Implies `enterLink`.
 */
function enter(compiler, node) {
  var encode = compiler.encode;
  var escape = compiler.escape;
  var exit = compiler.enterLink();

  if (
    node.referenceType !== 'shortcut' &&
    node.referenceType !== 'collapsed'
  ) {
    return exit;
  }

  compiler.escape = returner;
  compiler.encode = returner;

  return function () {
    compiler.encode = encode;
    compiler.escape = escape;
    exit();
  };
}
