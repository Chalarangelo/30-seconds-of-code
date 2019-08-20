'use strict';

var uri = require('../util/enclose-uri');
var title = require('../util/enclose-title');

module.exports = definition;

/* Stringify an URL definition.
 *
 * Is smart about enclosing `url` (see `encloseURI()`) and
 * `title` (see `encloseTitle()`).
 *
 *    [foo]: <foo at bar dot com> 'An "example" e-mail'
 */
function definition(node) {
  var content = uri(node.url);

  if (node.title) {
    content += ' ' + title(node.title);
  }

  return '[' + node.identifier + ']: ' + content;
}
