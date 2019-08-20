'use strict';

var repeat = require('repeat-string');

module.exports = pad;

var INDENT = 4;

/* Pad `value` with `level * INDENT` spaces.  Respects
 * lines. Ignores empty lines. */
function pad(value, level) {
  var index;
  var padding;

  value = value.split('\n');

  index = value.length;
  padding = repeat(' ', level * INDENT);

  while (index--) {
    if (value[index].length !== 0) {
      value[index] = padding + value[index];
    }
  }

  return value.join('\n');
}
