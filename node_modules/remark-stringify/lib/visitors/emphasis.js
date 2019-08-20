'use strict';

module.exports = emphasis;

/* Stringify an `emphasis`.
 *
 * The marker used is configurable through `emphasis`, which
 * defaults to an underscore (`'_'`) but also accepts an
 * asterisk (`'*'`):
 *
 *     *foo*
 */
function emphasis(node) {
  var marker = this.options.emphasis;
  return marker + this.all(node).join('') + marker;
}
