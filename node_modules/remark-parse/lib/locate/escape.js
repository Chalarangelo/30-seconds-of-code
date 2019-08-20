'use strict'

module.exports = locate

function locate(value, fromIndex) {
  return value.indexOf('\\', fromIndex)
}
