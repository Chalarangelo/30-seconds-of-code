'use strict'

var toString = require('nlcst-to-string')
var modifyChildren = require('unist-util-modify-children')
var expressions = require('../expressions')

module.exports = modifyChildren(mergeInitialDigitSentences)

// Initial lowercase letter.
var digit = expressions.digitStart

// Merge a sentence into its previous sentence, when the sentence starts with a
// lower case letter.
function mergeInitialDigitSentences(child, index, parent) {
  var children = child.children
  var siblings = parent.children
  var prev = siblings[index - 1]
  var head = children[0]

  if (prev && head && head.type === 'WordNode' && digit.test(toString(head))) {
    prev.children = prev.children.concat(children)
    siblings.splice(index, 1)

    // Update position.
    if (prev.position && child.position) {
      prev.position.end = child.position.end
    }

    // Next, iterate over the node *now* at the current position.
    return index
  }
}
