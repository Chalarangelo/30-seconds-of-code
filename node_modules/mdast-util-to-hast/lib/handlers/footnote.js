'use strict'

module.exports = footnote

var footnoteReference = require('./footnote-reference')

function footnote(h, node) {
  var identifiers = []
  var identifier = 1
  var footnotes = h.footnotes
  var length = footnotes.length
  var index = -1

  while (++index < length) {
    identifiers[index] = footnotes[index].identifier
  }

  while (identifiers.indexOf(String(identifier)) !== -1) {
    identifier++
  }

  identifier = String(identifier)

  footnotes.push({
    type: 'footnoteDefinition',
    identifier: identifier,
    children: [{type: 'paragraph', children: node.children}],
    position: node.position
  })

  return footnoteReference(h, {
    type: 'footnoteReference',
    identifier: identifier,
    position: node.position
  })
}
