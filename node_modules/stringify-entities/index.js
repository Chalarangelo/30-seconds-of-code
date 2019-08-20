'use strict'

var entities = require('character-entities-html4')
var legacy = require('character-entities-legacy')
var hexadecimal = require('is-hexadecimal')
var alphanumerical = require('is-alphanumerical')
var dangerous = require('./dangerous.json')

/* Expose. */
module.exports = encode
encode.escape = escape

var own = {}.hasOwnProperty

/* List of enforced escapes. */
var escapes = ['"', "'", '<', '>', '&', '`']

/* Map of characters to names. */
var characters = construct()

/* Default escapes. */
var defaultEscapes = toExpression(escapes)

/* Surrogate pairs. */
var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g

/* Non-ASCII characters. */
// eslint-disable-next-line no-control-regex, unicorn/no-hex-escape
var bmp = /[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g

/* Encode special characters in `value`. */
function encode(value, options) {
  var settings = options || {}
  var subset = settings.subset
  var set = subset ? toExpression(subset) : defaultEscapes
  var escapeOnly = settings.escapeOnly
  var omit = settings.omitOptionalSemicolons

  value = value.replace(set, function(char, pos, val) {
    return one(char, val.charAt(pos + 1), settings)
  })

  if (subset || escapeOnly) {
    return value
  }

  return value
    .replace(surrogatePair, replaceSurrogatePair)
    .replace(bmp, replaceBmp)

  function replaceSurrogatePair(pair, pos, val) {
    return toHexReference(
      (pair.charCodeAt(0) - 0xd800) * 0x400 +
        pair.charCodeAt(1) -
        0xdc00 +
        0x10000,
      val.charAt(pos + 2),
      omit
    )
  }

  function replaceBmp(char, pos, val) {
    return one(char, val.charAt(pos + 1), settings)
  }
}

/* Shortcut to escape special characters in HTML. */
function escape(value) {
  return encode(value, {
    escapeOnly: true,
    useNamedReferences: true
  })
}

/* Encode `char` according to `options`. */
function one(char, next, options) {
  var shortest = options.useShortestReferences
  var omit = options.omitOptionalSemicolons
  var named
  var numeric

  if ((shortest || options.useNamedReferences) && own.call(characters, char)) {
    named = toNamed(characters[char], next, omit, options.attribute)
  }

  if (shortest || !named) {
    numeric = toHexReference(char.charCodeAt(0), next, omit)
  }

  if (named && (!shortest || named.length < numeric.length)) {
    return named
  }

  return numeric
}

/* Transform `code` into an entity. */
function toNamed(name, next, omit, attribute) {
  var value = '&' + name

  if (
    omit &&
    own.call(legacy, name) &&
    dangerous.indexOf(name) === -1 &&
    (!attribute || (next && next !== '=' && !alphanumerical(next)))
  ) {
    return value
  }

  return value + ';'
}

/* Transform `code` into a hexadecimal character reference. */
function toHexReference(code, next, omit) {
  var value = '&#x' + code.toString(16).toUpperCase()
  return omit && next && !hexadecimal(next) ? value : value + ';'
}

/* Create an expression for `characters`. */
function toExpression(characters) {
  return new RegExp('[' + characters.join('') + ']', 'g')
}

/* Construct the map. */
function construct() {
  var chars = {}
  var name

  for (name in entities) {
    chars[entities[name]] = name
  }

  return chars
}
