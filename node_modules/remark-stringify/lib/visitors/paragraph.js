'use strict';

module.exports = paragraph;

function paragraph(node) {
  return this.all(node).join('');
}
