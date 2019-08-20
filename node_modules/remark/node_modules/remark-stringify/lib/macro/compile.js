'use strict'

var compact = require('mdast-util-compact')

module.exports = compile

// Stringify the given tree.
function compile() {
  return this.visit(compact(this.tree, this.options.commonmark))
}
