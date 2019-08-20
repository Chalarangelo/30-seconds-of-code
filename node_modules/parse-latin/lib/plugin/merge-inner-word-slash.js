'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')

module.exports = modifyChildren(mergeInnerWordSlash)

var slash = '/'

// Merge words joined by certain punctuation marks.
function mergeInnerWordSlash(child, index, parent) {
  var siblings = parent.children
  var prev
  var next
  var prevValue
  var nextValue
  var queue
  var tail
  var count

  prev = siblings[index - 1]
  next = siblings[index + 1]

  if (
    prev &&
    prev.type === 'WordNode' &&
    (child.type === 'SymbolNode' || child.type === 'PunctuationNode') &&
    toString(child) === slash
  ) {
    prevValue = toString(prev)
    tail = child
    queue = [child]
    count = 1

    if (next && next.type === 'WordNode') {
      nextValue = toString(next)
      tail = next
      queue = queue.concat(next.children)
      count++
    }

    if (prevValue.length < 3 && (!nextValue || nextValue.length < 3)) {
      // Add all found tokens to `prev`s children.
      prev.children = prev.children.concat(queue)

      siblings.splice(index, count)

      // Update position.
      if (prev.position && tail.position) {
        prev.position.end = tail.position.end
      }

      // Next, iterate over the node *now* at the current position.
      return index
    }
  }
}
