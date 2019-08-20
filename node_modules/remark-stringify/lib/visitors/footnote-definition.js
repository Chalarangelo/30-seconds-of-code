'use strict';

var repeat = require('repeat-string');

module.exports = footnoteDefinition;

function footnoteDefinition(node) {
  var id = node.identifier.toLowerCase();
  var content = this.all(node).join('\n\n' + repeat(' ', 4));

  return '[^' + id + ']: ' + content;
}
