'use strict'

var Parser = require('parse5/lib/parser')
var pos = require('unist-util-position')
var fromParse5 = require('hast-util-from-parse5')
var toParse5 = require('hast-util-to-parse5')
var voids = require('html-void-elements')
var ns = require('web-namespaces')
var zwitch = require('zwitch')
var xtend = require('xtend')

module.exports = wrap

var IN_TEMPLATE_MODE = 'IN_TEMPLATE_MODE'
var DATA_MODE = 'DATA_STATE'
var CHARACTER_TOKEN = 'CHARACTER_TOKEN'
var START_TAG_TOKEN = 'START_TAG_TOKEN'
var END_TAG_TOKEN = 'END_TAG_TOKEN'
var COMMENT_TOKEN = 'COMMENT_TOKEN'
var DOCTYPE_TOKEN = 'DOCTYPE_TOKEN'

var parseOptions = {
  sourceCodeLocationInfo: true,
  scriptingEnabled: false
}

function wrap(tree, file) {
  var parser = new Parser(parseOptions)
  var one = zwitch('type')
  var tokenizer
  var preprocessor
  var posTracker
  var locationTracker
  var result

  one.handlers.root = root
  one.handlers.element = element
  one.handlers.text = text
  one.handlers.comment = comment
  one.handlers.doctype = doctype
  one.handlers.raw = raw
  one.unknown = unknown

  result = fromParse5(documentMode(tree) ? document() : fragment(), file)

  /* Unpack if possible and when not given a `root`. */
  if (tree.type !== 'root' && result.children.length === 1) {
    return result.children[0]
  }

  return result

  function fragment() {
    var context
    var mock
    var doc

    context = {
      nodeName: 'template',
      tagName: 'template',
      attrs: [],
      namespaceURI: ns.html,
      childNodes: []
    }

    mock = {
      nodeName: 'documentmock',
      tagName: 'documentmock',
      attrs: [],
      namespaceURI: ns.html,
      childNodes: []
    }

    doc = {
      nodeName: '#document-fragment',
      childNodes: []
    }

    parser._bootstrap(mock, context)
    parser._pushTmplInsertionMode(IN_TEMPLATE_MODE)
    parser._initTokenizerForFragmentParsing()
    parser._insertFakeRootElement()
    parser._resetInsertionMode()
    parser._findFormInFragmentContext()

    tokenizer = parser.tokenizer
    preprocessor = tokenizer.preprocessor
    locationTracker = tokenizer.__mixins[0]
    posTracker = locationTracker.posTracker

    one(tree)

    parser._adoptNodes(mock.childNodes[0], doc)

    return doc
  }

  function document() {
    var doc = parser.treeAdapter.createDocument()

    parser._bootstrap(doc, null)
    tokenizer = parser.tokenizer
    preprocessor = tokenizer.preprocessor
    locationTracker = tokenizer.__mixins[0]
    posTracker = locationTracker.posTracker

    one(tree)

    return doc
  }

  function all(nodes) {
    var length = 0
    var index = -1

    /* istanbul ignore else - invalid nodes, see rehypejs/rehype-raw#7. */
    if (nodes) {
      length = nodes.length
    }

    while (++index < length) {
      one(nodes[index])
    }
  }

  function root(node) {
    all(node.children)
  }

  function element(node) {
    var empty = voids.indexOf(node.tagName) !== -1

    parser._processToken(startTag(node), ns.html)

    all(node.children)

    if (!empty) {
      parser._processToken(endTag(node))

      // Put the parser back in data mode: some elements, like
      // textareas and iframes, change the state.
      // See syntax-tree/hast-util-raw/issues/7.
      // See https://github.com/inikulin/parse5/blob/2528196/packages/parse5/lib/tokenizer/index.js#L222
      tokenizer.state = DATA_MODE
    }
  }

  function text(node) {
    parser._processToken({
      type: CHARACTER_TOKEN,
      chars: node.value,
      location: createParse5Location(node)
    })
  }

  function doctype(node) {
    var p5 = toParse5(node)

    parser._processToken({
      type: DOCTYPE_TOKEN,
      name: p5.name,
      forceQuirks: false,
      publicId: p5.publicId,
      systemId: p5.systemId,
      location: createParse5Location(node)
    })
  }

  function comment(node) {
    parser._processToken({
      type: COMMENT_TOKEN,
      data: node.value,
      location: createParse5Location(node)
    })
  }

  function raw(node) {
    var start = pos.start(node)
    var token

    // Reset preprocessor:
    // https://github.com/inikulin/parse5/blob/0491902/packages/parse5/lib/tokenizer/preprocessor.js
    preprocessor.html = null
    preprocessor.endOfChunkHit = false
    preprocessor.lastChunkWritten = false
    preprocessor.lastCharPos = -1
    preprocessor.pos = -1

    // Reset preprocessor mixin:
    // https://github.com/inikulin/parse5/blob/0491902/packages/parse5/lib/extensions/position-tracking/preprocessor-mixin.js
    posTracker.droppedBufferSize = 0
    posTracker.line = start.line
    posTracker.col = 1
    posTracker.offset = 0
    posTracker.lineStartPos = -start.column + 1
    posTracker.droppedBufferSize = start.offset

    // Reset location tracker:
    // https://github.com/inikulin/parse5/blob/0491902/packages/parse5/lib/extensions/location-info/tokenizer-mixin.js
    locationTracker.currentAttrLocation = null
    locationTracker.ctLoc = createParse5Location(node)

    // See the code for `parse` and `parseFragment`:
    // https://github.com/inikulin/parse5/blob/0491902/packages/parse5/lib/parser/index.js#L371
    tokenizer.write(node.value)
    parser._runParsingLoop(null)

    // Process final characters if they’re still there after hibernating.
    // Similar to:
    // https://github.com/inikulin/parse5/blob/3bfa7d9/packages/parse5/lib/extensions/location-info/tokenizer-mixin.js#L95
    token = tokenizer.currentCharacterToken

    if (token) {
      token.location.endLine = posTracker.line
      token.location.endCol = posTracker.col + 1
      token.location.endOffset = posTracker.offset + 1
      parser._processToken(token)
    }

    // Reset tokenizer:
    // https://github.com/inikulin/parse5/blob/8b0048e/packages/parse5/lib/tokenizer/index.js#L215
    tokenizer.currentToken = null
    tokenizer.currentCharacterToken = null
    tokenizer.currentAttr = null
  }
}

function startTag(node) {
  var location = createParse5Location(node)

  location.startTag = xtend(location)

  return {
    type: START_TAG_TOKEN,
    tagName: node.tagName,
    selfClosing: false,
    attrs: attributes(node),
    location: location
  }
}

function attributes(node) {
  return toParse5({
    tagName: node.tagName,
    type: 'element',
    properties: node.properties
  }).attrs
}

function endTag(node) {
  var location = createParse5Location(node)

  location.endTag = xtend(location)

  return {
    type: END_TAG_TOKEN,
    tagName: node.tagName,
    attrs: [],
    location: location
  }
}

function unknown(node) {
  throw new Error('Cannot compile `' + node.type + '` node')
}

function documentMode(node) {
  var head = node.type === 'root' ? node.children[0] : node

  return head && (head.type === 'doctype' || head.tagName === 'html')
}

function createParse5Location(node) {
  var start = pos.start(node)
  var end = pos.end(node)

  return {
    startLine: start.line,
    startCol: start.column,
    startOffset: start.offset,
    endLine: end.line,
    endCol: end.column,
    endOffset: end.offset
  }
}
