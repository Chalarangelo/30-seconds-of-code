'use strict'

var whitespace = require('is-whitespace-character')
var locate = require('../locate/code-inline')

module.exports = inlineCode
inlineCode.locator = locate

var graveAccent = '`'

function inlineCode(eat, value, silent) {
  var length = value.length
  var index = 0
  var queue = ''
  var tickQueue = ''
  var contentQueue
  var subqueue
  var count
  var openingCount
  var subvalue
  var character
  var found
  var next

  while (index < length) {
    if (value.charAt(index) !== graveAccent) {
      break
    }

    queue += graveAccent
    index++
  }

  if (!queue) {
    return
  }

  subvalue = queue
  openingCount = index
  queue = ''
  next = value.charAt(index)
  count = 0

  while (index < length) {
    character = next
    next = value.charAt(index + 1)

    if (character === graveAccent) {
      count++
      tickQueue += character
    } else {
      count = 0
      queue += character
    }

    if (count && next !== graveAccent) {
      if (count === openingCount) {
        subvalue += queue + tickQueue
        found = true
        break
      }

      queue += tickQueue
      tickQueue = ''
    }

    index++
  }

  if (!found) {
    if (openingCount % 2 !== 0) {
      return
    }

    queue = ''
  }

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true
  }

  contentQueue = ''
  subqueue = ''
  length = queue.length
  index = -1

  while (++index < length) {
    character = queue.charAt(index)

    if (whitespace(character)) {
      subqueue += character
      continue
    }

    if (subqueue) {
      if (contentQueue) {
        contentQueue += subqueue
      }

      subqueue = ''
    }

    contentQueue += character
  }

  return eat(subvalue)({type: 'inlineCode', value: contentQueue})
}
