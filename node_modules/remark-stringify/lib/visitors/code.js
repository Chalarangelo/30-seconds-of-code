'use strict';

var streak = require('longest-streak');
var repeat = require('repeat-string');
var pad = require('../util/pad');

module.exports = code;

/* Stringify code.
 * Creates indented code when:
 *
 * - No language tag exists;
 * - Not in `fences: true` mode;
 * - A non-empty value exists.
 *
 * Otherwise, GFM fenced code is created:
 *
 *     ```js
 *     foo();
 *     ```
 *
 * When in ``fence: `~` `` mode, uses tildes as fences:
 *
 *     ~~~js
 *     foo();
 *     ~~~
 *
 * Knows about internal fences:
 *
 *     ````markdown
 *     ```javascript
 *     foo();
 *     ```
 *     ````
 */
function code(node, parent) {
  var self = this;
  var value = node.value;
  var options = self.options;
  var marker = options.fence;
  var language = self.encode(node.lang || '', node);
  var fence;

  /* Without (needed) fences. */
  if (!language && !options.fences && value) {
    /* Throw when pedantic, in a list item which
     * isn’t compiled using a tab. */
    if (
      parent &&
      parent.type === 'listItem' &&
      options.listItemIndent !== 'tab' &&
      options.pedantic
    ) {
      self.file.fail('Cannot indent code properly. See http://git.io/vgFvT', node.position);
    }

    return pad(value, 1);
  }

  fence = repeat(marker, Math.max(streak(value, marker) + 1, 3));

  return fence + language + '\n' + value + '\n' + fence;
}
