'use strict';

module.exports = footnote;

function footnote(node) {
  return '[^' + this.all(node).join('') + ']';
}
