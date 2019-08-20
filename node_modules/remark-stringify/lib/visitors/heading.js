'use strict';

var repeat = require('repeat-string');

module.exports = heading;

/* Stringify a heading.
 *
 * In `setext: true` mode and when `depth` is smaller than
 * three, creates a setext header:
 *
 *     Foo
 *     ===
 *
 * Otherwise, an ATX header is generated:
 *
 *     ### Foo
 *
 * In `closeAtx: true` mode, the header is closed with
 * hashes:
 *
 *     ### Foo ###
 */
function heading(node) {
  var self = this;
  var depth = node.depth;
  var setext = self.options.setext;
  var closeAtx = self.options.closeAtx;
  var content = self.all(node).join('');
  var prefix;

  if (setext && depth < 3) {
    return content + '\n' + repeat(depth === 1 ? '=' : '-', content.length);
  }

  prefix = repeat('#', node.depth);

  return prefix + ' ' + content + (closeAtx ? ' ' + prefix : '');
}
