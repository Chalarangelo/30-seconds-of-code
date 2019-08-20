'use strict'

var whitespace = require('is-whitespace-character')

module.exports = newline

var lineFeed = '\n'

function newline(eat, value, silent) {
  var character = value.charAt(0)
  var length
  var subvalue
  var queue
  var index

  if (character !== lineFeed) {
    return
  }

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true
  }

  index = 1
  length = value.length
  subvalue = character
  queue = ''

  while (index < length) {
    character = value.charAt(index)

    if (!whitespace(character)) {
      break
    }

    queue += character

    if (character === lineFeed) {
      subvalue += queue
      queue = ''
    }

    index++
  }

  eat(subvalue)
}
