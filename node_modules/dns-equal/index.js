'use strict'

var r = /[A-Z]/g

module.exports = function (a, b) {
  a = a.replace(r, replacer)
  b = b.replace(r, replacer)
  return a === b
}

function replacer (m) {
  return m.toLowerCase()
}
