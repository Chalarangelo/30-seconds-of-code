'use strict'

var after = require('./siblings').after

module.exports = first

/* Get the first child in `parent`. */
function first(parent, includeWhiteSpace) {
  return after(parent, -1, includeWhiteSpace)
}
