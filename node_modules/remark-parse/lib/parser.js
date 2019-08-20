'use strict'

var xtend = require('xtend')
var toggle = require('state-toggle')
var vfileLocation = require('vfile-location')
var unescape = require('./unescape')
var decode = require('./decode')
var tokenizer = require('./tokenizer')

module.exports = Parser

function Parser(doc, file) {
  this.file = file
  this.offset = {}
  this.options = xtend(this.options)
  this.setOptions({})

  this.inList = false
  this.inBlock = false
  this.inLink = false
  this.atStart = true

  this.toOffset = vfileLocation(file).toOffset
  this.unescape = unescape(this, 'escape')
  this.decode = decode(this)
}

var proto = Parser.prototype

// Expose core.
proto.setOptions = require('./set-options')
proto.parse = require('./parse')

// Expose `defaults`.
proto.options = require('./defaults')

// Enter and exit helpers.
proto.exitStart = toggle('atStart', true)
proto.enterList = toggle('inList', false)
proto.enterLink = toggle('inLink', false)
proto.enterBlock = toggle('inBlock', false)

// Nodes that can interupt a paragraph:
//
// ```markdown
// A paragraph, followed by a thematic break.
// ___
// ```
//
// In the above example, the thematic break “interupts” the paragraph.
proto.interruptParagraph = [
  ['thematicBreak'],
  ['atxHeading'],
  ['fencedCode'],
  ['blockquote'],
  ['html'],
  ['setextHeading', {commonmark: false}],
  ['definition', {commonmark: false}],
  ['footnote', {commonmark: false}]
]

// Nodes that can interupt a list:
//
// ```markdown
// - One
// ___
// ```
//
// In the above example, the thematic break “interupts” the list.
proto.interruptList = [
  ['atxHeading', {pedantic: false}],
  ['fencedCode', {pedantic: false}],
  ['thematicBreak', {pedantic: false}],
  ['definition', {commonmark: false}],
  ['footnote', {commonmark: false}]
]

// Nodes that can interupt a blockquote:
//
// ```markdown
// > A paragraph.
// ___
// ```
//
// In the above example, the thematic break “interupts” the blockquote.
proto.interruptBlockquote = [
  ['indentedCode', {commonmark: true}],
  ['fencedCode', {commonmark: true}],
  ['atxHeading', {commonmark: true}],
  ['setextHeading', {commonmark: true}],
  ['thematicBreak', {commonmark: true}],
  ['html', {commonmark: true}],
  ['list', {commonmark: true}],
  ['definition', {commonmark: false}],
  ['footnote', {commonmark: false}]
]

// Handlers.
proto.blockTokenizers = {
  newline: require('./tokenize/newline'),
  indentedCode: require('./tokenize/code-indented'),
  fencedCode: require('./tokenize/code-fenced'),
  blockquote: require('./tokenize/blockquote'),
  atxHeading: require('./tokenize/heading-atx'),
  thematicBreak: require('./tokenize/thematic-break'),
  list: require('./tokenize/list'),
  setextHeading: require('./tokenize/heading-setext'),
  html: require('./tokenize/html-block'),
  footnote: require('./tokenize/footnote-definition'),
  definition: require('./tokenize/definition'),
  table: require('./tokenize/table'),
  paragraph: require('./tokenize/paragraph')
}

proto.inlineTokenizers = {
  escape: require('./tokenize/escape'),
  autoLink: require('./tokenize/auto-link'),
  url: require('./tokenize/url'),
  html: require('./tokenize/html-inline'),
  link: require('./tokenize/link'),
  reference: require('./tokenize/reference'),
  strong: require('./tokenize/strong'),
  emphasis: require('./tokenize/emphasis'),
  deletion: require('./tokenize/delete'),
  code: require('./tokenize/code-inline'),
  break: require('./tokenize/break'),
  text: require('./tokenize/text')
}

// Expose precedence.
proto.blockMethods = keys(proto.blockTokenizers)
proto.inlineMethods = keys(proto.inlineTokenizers)

// Tokenizers.
proto.tokenizeBlock = tokenizer('block')
proto.tokenizeInline = tokenizer('inline')
proto.tokenizeFactory = tokenizer

// Get all keys in `value`.
function keys(value) {
  var result = []
  var key

  for (key in value) {
    result.push(key)
  }

  return result
}
