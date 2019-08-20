'use strict';

/**
 * https://github.com/TrySound/postcss-value-parser/blob/fc679a7e17877841ff9fe455722280b65abd4f28/lib/unit.js
 * parse node -> number and unit
 */

const minus = '-'.charCodeAt(0);
const plus = '+'.charCodeAt(0);
const dot = '.'.charCodeAt(0);

module.exports = function unit(value) {
  let pos = 0;
  const length = value.length;
  let dotted = false;
  let containsNumber = false;
  let code;
  let number = '';

  while (pos < length) {
    code = value.charCodeAt(pos);

    if (code >= 48 && code <= 57) {
      number += value[pos];
      containsNumber = true;
    } else if (code === dot) {
      if (dotted) {
        break;
      }
      dotted = true;
      number += value[pos];
    } else if (code === plus || code === minus) {
      if (pos !== 0) {
        break;
      }
      number += value[pos];
    } else {
      break;
    }

    pos += 1;
  }

  return containsNumber ? {
    number,
    unit: value.slice(pos),
  } : false;
};
