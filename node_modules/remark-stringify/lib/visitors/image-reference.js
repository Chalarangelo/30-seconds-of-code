'use strict';

var label = require('../util/label');

module.exports = imageReference;

function imageReference(node) {
  return '![' + (this.encode(node.alt, node) || '') + ']' + label(node);
}
