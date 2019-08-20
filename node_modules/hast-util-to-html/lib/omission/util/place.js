'use strict'

module.exports = place

/* Get the position of `node` in `parent`. */
function place(parent, child) {
  return parent && parent.children && parent.children.indexOf(child)
}
