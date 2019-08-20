'use strict'

module.exports = footnoteReference

var leftSquareBracket = '['
var rightSquareBracket = ']'
var caret = '^'

function footnoteReference(node) {
  return (
    leftSquareBracket +
    caret +
    (node.label || node.identifier) +
    rightSquareBracket
  )
}
