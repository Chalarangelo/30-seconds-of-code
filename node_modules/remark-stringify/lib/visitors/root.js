'use strict';

module.exports = root;

/* Stringify a root.
 * Adds a final newline to ensure valid POSIX files. */
function root(node) {
  return this.block(node) + '\n';
}
