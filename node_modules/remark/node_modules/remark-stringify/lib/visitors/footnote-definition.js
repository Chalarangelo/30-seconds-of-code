'use strict'

var repeat = require('repeat-string')

var lineFeed = '\n'
var space = ' '
var colon = ':'
var leftSquareBracket = '['
var rightSquareBracket = ']'
var caret = '^'

var tabSize = 4
var blank = lineFeed + lineFeed
var indent = repeat(space, tabSize)

module.exports = footnoteDefinition

function footnoteDefinition(node) {
  var content = this.all(node).join(blank + indent)

  return (
    leftSquareBracket +
    caret +
    (node.label || node.identifier) +
    rightSquareBracket +
    colon +
    space +
    content
  )
}
