'use strict'

module.exports = inlineCode

var collapse = require('collapse-white-space')
var u = require('unist-builder')

function inlineCode(h, node) {
  return h(node, 'code', [u('text', collapse(node.value))])
}
