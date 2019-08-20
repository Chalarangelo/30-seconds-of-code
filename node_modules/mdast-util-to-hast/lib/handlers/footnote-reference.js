'use strict'

module.exports = footnoteReference

var u = require('unist-builder')

function footnoteReference(h, node) {
  var identifier = node.identifier

  return h(node.position, 'sup', {id: 'fnref-' + identifier}, [
    h(node, 'a', {href: '#fn-' + identifier, className: ['footnote-ref']}, [
      u('text', identifier)
    ])
  ])
}
