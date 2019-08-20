'use strict';

function defaultTo(value, def) {
  return value == null ? def : value;
}

module.exports = defaultTo;
