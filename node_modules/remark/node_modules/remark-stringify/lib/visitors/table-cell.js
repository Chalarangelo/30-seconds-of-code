'use strict'

module.exports = tableCell

function tableCell(node) {
  return this.all(node).join('')
}
