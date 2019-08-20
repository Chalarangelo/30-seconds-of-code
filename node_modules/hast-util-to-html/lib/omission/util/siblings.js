'use strict'

var whiteSpace = require('hast-util-whitespace')

exports.before = siblings(-1)
exports.after = siblings(1)

/* Factory to check siblings in a direction. */
function siblings(increment) {
  return sibling

  /* Find applicable siblings in a direction.   */
  function sibling(parent, index, includeWhiteSpace) {
    var siblings = parent && parent.children
    var next

    index += increment
    next = siblings && siblings[index]

    if (!includeWhiteSpace) {
      while (next && whiteSpace(next)) {
        index += increment
        next = siblings[index]
      }
    }

    return next
  }
}
