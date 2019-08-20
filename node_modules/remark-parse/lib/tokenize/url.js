'use strict'

var decode = require('parse-entities')
var whitespace = require('is-whitespace-character')
var locate = require('../locate/url')

module.exports = url
url.locator = locate
url.notInLink = true

var quotationMark = '"'
var apostrophe = "'"
var leftParenthesis = '('
var rightParenthesis = ')'
var comma = ','
var dot = '.'
var colon = ':'
var semicolon = ';'
var lessThan = '<'
var atSign = '@'
var leftSquareBracket = '['
var rightSquareBracket = ']'

var http = 'http://'
var https = 'https://'
var mailto = 'mailto:'

var protocols = [http, https, mailto]

var protocolsLength = protocols.length

function url(eat, value, silent) {
  var self = this
  var subvalue
  var content
  var character
  var index
  var position
  var protocol
  var match
  var length
  var queue
  var parenCount
  var nextCharacter
  var tokenizers
  var exit

  if (!self.options.gfm) {
    return
  }

  subvalue = ''
  index = -1

  while (++index < protocolsLength) {
    protocol = protocols[index]
    match = value.slice(0, protocol.length)

    if (match.toLowerCase() === protocol) {
      subvalue = match
      break
    }
  }

  if (!subvalue) {
    return
  }

  index = subvalue.length
  length = value.length
  queue = ''
  parenCount = 0

  while (index < length) {
    character = value.charAt(index)

    if (whitespace(character) || character === lessThan) {
      break
    }

    if (
      character === dot ||
      character === comma ||
      character === colon ||
      character === semicolon ||
      character === quotationMark ||
      character === apostrophe ||
      character === rightParenthesis ||
      character === rightSquareBracket
    ) {
      nextCharacter = value.charAt(index + 1)

      if (!nextCharacter || whitespace(nextCharacter)) {
        break
      }
    }

    if (character === leftParenthesis || character === leftSquareBracket) {
      parenCount++
    }

    if (character === rightParenthesis || character === rightSquareBracket) {
      parenCount--

      if (parenCount < 0) {
        break
      }
    }

    queue += character
    index++
  }

  if (!queue) {
    return
  }

  subvalue += queue
  content = subvalue

  if (protocol === mailto) {
    position = queue.indexOf(atSign)

    if (position === -1 || position === length - 1) {
      return
    }

    content = content.substr(mailto.length)
  }

  /* istanbul ignore if - never used (yet) */
  if (silent) {
    return true
  }

  exit = self.enterLink()

  // Temporarily remove all tokenizers except text in url.
  tokenizers = self.inlineTokenizers
  self.inlineTokenizers = {text: tokenizers.text}

  content = self.tokenizeInline(content, eat.now())

  self.inlineTokenizers = tokenizers
  exit()

  return eat(subvalue)({
    type: 'link',
    title: null,
    url: decode(subvalue, {nonTerminated: false}),
    children: content
  })
}
