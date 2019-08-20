'use strict';

var uri = require('../util/enclose-uri');
var title = require('../util/enclose-title');

module.exports = image;

/* Stringify an image.
 *
 * Is smart about enclosing `url` (see `encloseURI()`) and
 * `title` (see `encloseTitle()`).
 *
 *    ![foo](</fav icon.png> 'My "favourite" icon')
 *
 * Supports named entities in `url`, `alt`, and `title`
 * when in `settings.encode` mode.
 */
function image(node) {
  var self = this;
  var content = uri(self.encode(node.url || '', node));
  var exit = self.enterLink();
  var alt = self.encode(self.escape(node.alt || '', node));

  exit();

  if (node.title) {
    content += ' ' + title(self.encode(node.title, node));
  }

  return '![' + alt + '](' + content + ')';
}
