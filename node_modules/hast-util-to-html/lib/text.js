'use strict'

var xtend = require('xtend')
var entities = require('stringify-entities')

module.exports = text

/* Stringify `text`. */
function text(ctx, node, index, parent) {
  var value = node.value

  return isLiteral(parent)
    ? value
    : entities(value, xtend(ctx.entities, {subset: ['<', '&']}))
}

/* Check if content of `node` should be escaped. */
function isLiteral(node) {
  return node && (node.tagName === 'script' || node.tagName === 'style')
}
