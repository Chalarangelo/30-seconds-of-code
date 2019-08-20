'use strict'

module.exports = text

var u = require('unist-builder')
var trimLines = require('trim-lines')

function text(h, node) {
  return h.augment(node, u('text', trimLines(node.value)))
}
