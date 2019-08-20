'use strict'

module.exports = toString

// Get the text content of a node.  If the node itself does not expose
// plain-text fields, `toString` will recursivly try its children.
function toString(node) {
  return (
    valueOf(node) ||
    (node.children && node.children.map(toString).join('')) ||
    ''
  )
}

// Get the value of `node`.  Checks, `value`, `alt`, and `title`, in that order.
function valueOf(node) {
  return (
    (node && node.value ? node.value : node.alt ? node.alt : node.title) || ''
  )
}
