'use strict'

var text = require('./text')

module.exports = raw

/* Stringify `raw`. */
function raw(ctx, node) {
  return ctx.dangerous ? node.value : text(ctx, node)
}
