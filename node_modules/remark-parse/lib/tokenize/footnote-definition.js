'use strict'

var whitespace = require('is-whitespace-character')
var normalize = require('../util/normalize')

module.exports = footnoteDefinition
footnoteDefinition.notInList = true
footnoteDefinition.notInBlock = true

var backslash = '\\'
var lineFeed = '\n'
var tab = '\t'
var space = ' '
var leftSquareBracket = '['
var rightSquareBracket = ']'
var caret = '^'
var colon = ':'

var EXPRESSION_INITIAL_TAB = /^( {4}|\t)?/gm

function footnoteDefinition(eat, value, silent) {
  var self = this
  var offsets = self.offset
  var index
  var length
  var subvalue
  var now
  var currentLine
  var content
  var queue
  var subqueue
  var character
  var identifier
  var add
  var exit

  if (!self.options.footnotes) {
    return
  }

  index = 0
  length = value.length
  subvalue = ''
  now = eat.now()
  currentLine = now.line

  while (index < length) {
    character = value.charAt(index)

    if (!whitespace(character)) {
      break
    }

    subvalue += character
    index++
  }

  if (
    value.charAt(index) !== leftSquareBracket ||
    value.charAt(index + 1) !== caret
  ) {
    return
  }

  subvalue += leftSquareBracket + caret
  index = subvalue.length
  queue = ''

  while (index < length) {
    character = value.charAt(index)

    if (character === rightSquareBracket) {
      break
    } else if (character === backslash) {
      queue += character
      index++
      character = value.charAt(index)
    }

    queue += character
    index++
  }

  if (
    !queue ||
    value.charAt(index) !== rightSquareBracket ||
    value.charAt(index + 1) !== colon
  ) {
    return
  }

  if (silent) {
    return true
  }

  identifier = queue
  subvalue += queue + rightSquareBracket + colon
  index = subvalue.length

  while (index < length) {
    character = value.charAt(index)

    if (character !== tab && character !== space) {
      break
    }

    subvalue += character
    index++
  }

  now.column += subvalue.length
  now.offset += subvalue.length
  queue = ''
  content = ''
  subqueue = ''

  while (index < length) {
    character = value.charAt(index)

    if (character === lineFeed) {
      subqueue = character
      index++

      while (index < length) {
        character = value.charAt(index)

        if (character !== lineFeed) {
          break
        }

        subqueue += character
        index++
      }

      queue += subqueue
      subqueue = ''

      while (index < length) {
        character = value.charAt(index)

        if (character !== space) {
          break
        }

        subqueue += character
        index++
      }

      if (subqueue.length === 0) {
        break
      }

      queue += subqueue
    }

    if (queue) {
      content += queue
      queue = ''
    }

    content += character
    index++
  }

  subvalue += content

  content = content.replace(EXPRESSION_INITIAL_TAB, function(line) {
    offsets[currentLine] = (offsets[currentLine] || 0) + line.length
    currentLine++

    return ''
  })

  add = eat(subvalue)

  exit = self.enterBlock()
  content = self.tokenizeBlock(content, now)
  exit()

  return add({
    type: 'footnoteDefinition',
    identifier: normalize(identifier),
    label: identifier,
    children: content
  })
}
