'use strict';

var decode = require('parse-entities');

module.exports = length;

/* Returns the length of HTML entity that is a prefix of
 * the given string (excluding the ampersand), 0 if it
 * does not start with an entity. */
function length(value) {
  var prefix;

  /* istanbul ignore if - Currently also tested for at
   * implemention, but we keep it here because that’s
   * proper. */
  if (value.charAt(0) !== '&') {
    return 0;
  }

  prefix = value.split('&', 2).join('&');

  return prefix.length - decode(prefix).length;
}
