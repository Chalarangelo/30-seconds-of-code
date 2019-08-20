'use strict';

var copy = require('../util/copy-identifier-encoding');
var label = require('../util/label');

module.exports = linkReference;

function linkReference(node) {
  var self = this;
  var type = node.referenceType;
  var exit = self.enterLinkReference(self, node);
  var value = self.all(node).join('');

  exit();

  if (type === 'shortcut' || type === 'collapsed') {
    value = copy(value, node.identifier);
  }

  return '[' + value + ']' + label(node);
}
