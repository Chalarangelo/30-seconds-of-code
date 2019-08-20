'use strict';

function tryParseInt(input) {
  const output = parseInt(input, 10);

  if (Number.isNaN(output)) {
    return null;
  }

  return output;
}

module.exports = tryParseInt;
