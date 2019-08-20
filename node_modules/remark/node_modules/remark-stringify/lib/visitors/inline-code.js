'use strict'

var streak = require('longest-streak')
var repeat = require('repeat-string')

module.exports = inlineCode

var space = ' '
var graveAccent = '`'

// Stringify inline code.
//
// Knows about internal ticks (`\``), and ensures one more tick is used to
// enclose the inline code:
//
// ````markdown
// ```foo ``bar`` baz```
// ````
//
// Even knows about inital and final ticks:
//
// ``markdown
// `` `foo ``
// `` foo` ``
// ```
function inlineCode(node) {
  var value = node.value
  var ticks = repeat(graveAccent, streak(value, graveAccent) + 1)
  var start = ticks
  var end = ticks

  if (value.charAt(0) === graveAccent) {
    start += space
  }

  if (value.charAt(value.length - 1) === graveAccent) {
    end = space + end
  }

  return start + value + end
}
