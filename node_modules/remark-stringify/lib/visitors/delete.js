'use strict';

module.exports = strikethrough;

function strikethrough(node) {
  return '~~' + this.all(node).join('') + '~~';
}
