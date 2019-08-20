'use strict'

module.exports = locate

var protocols = ['https://', 'http://', 'mailto:']

function locate(value, fromIndex) {
  var length = protocols.length
  var index = -1
  var min = -1
  var position

  if (!this.options.gfm) {
    return -1
  }

  while (++index < length) {
    position = value.indexOf(protocols[index], fromIndex)

    if (position !== -1 && (position < min || min === -1)) {
      min = position
    }
  }

  return min
}
