'use strict'

var repeat = require('repeat-string')
var vfileLocation = require('vfile-location')
var position = require('unist-util-position')
var toString = require('nlcst-to-string')

module.exports = toNLCST

var ignore = ['table', 'tableRow', 'tableCell']

var source = ['inlineCode']

var newline = '\n'

// Transform `tree` into `nlcst`.
function toNLCST(tree, file, Parser, options) {
  var settings = options || {}
  var parser

  // Warn for invalid parameters.
  if (!tree || !tree.type) {
    throw new Error('mdast-util-to-nlcst expected node')
  }

  if (!file || !file.messages) {
    throw new Error('mdast-util-to-nlcst expected file')
  }

  // Construct parser.
  if (!Parser) {
    throw new Error('mdast-util-to-nlcst expected parser')
  }

  if (
    !tree.position ||
    !tree.position.start ||
    !tree.position.start.column ||
    !tree.position.start.line
  ) {
    throw new Error('mdast-util-to-nlcst expected position on nodes')
  }

  parser = 'parse' in Parser ? Parser : new Parser()

  // Transform mdast into NLCST tokens, and pass these into `parser.parse` to
  // insert sentences, paragraphs where needed.
  return parser.parse(
    one(
      {
        doc: String(file),
        location: vfileLocation(file),
        parser: parser,
        ignore: ignore.concat(settings.ignore || []),
        source: source.concat(settings.source || [])
      },
      tree
    )
  )
}

// Convert `node` into NLCST.
function one(config, node) {
  var offset = config.location.toOffset
  var parser = config.parser
  var doc = config.doc
  var type = node.type
  var start = offset(position.start(node))
  var end = offset(position.end(node))

  if (config.ignore.indexOf(type) === -1) {
    if (config.source.indexOf(type) !== -1) {
      return patch(
        config,
        [parser.tokenizeSource(doc.slice(start, end))],
        start
      )
    }

    if (node.children) {
      return all(config, node)
    }

    if (type === 'image' || type === 'imageReference') {
      return patch(config, parser.tokenize(node.alt), start + 2)
    }

    if (type === 'text' || type === 'escape') {
      return patch(config, parser.tokenize(node.value), start)
    }

    if (node.type === 'break') {
      return patch(config, [parser.tokenizeWhiteSpace('\n')], start)
    }
  }

  return null
}

// Convert all nodes in `parent` (mdast) into NLCST.
function all(config, parent) {
  var children = parent.children
  var length = children && children.length
  var index = -1
  var result = []
  var child
  var node
  var pos
  var prevEndLine
  var prevOffset
  var endLine

  while (++index < length) {
    node = children[index]
    pos = node.position
    endLine = position.start(node).line

    if (prevEndLine && endLine !== prevEndLine) {
      child = config.parser.tokenizeWhiteSpace(
        repeat(newline, endLine - prevEndLine)
      )
      patch(config, [child], prevOffset)

      if (child.value.length < 2) {
        child.value = repeat(newline, 2)
      }

      result.push(child)
    }

    child = one(config, node)

    if (child) {
      result = result.concat(child)
    }

    pos = position.end(node)
    prevEndLine = pos.line
    prevOffset = pos.offset
  }

  return result
}

// Patch a position on each node in `nodes`.
// `offset` is the offset in `file` this run of content starts at.
function patch(config, nodes, offset) {
  var position = config.location.toPosition
  var length = nodes.length
  var index = -1
  var start = offset
  var children
  var node
  var end

  while (++index < length) {
    node = nodes[index]
    children = node.children

    if (children) {
      patch(config, children, start)
    }

    end = start + toString(node).length

    node.position = {start: position(start), end: position(end)}

    start = end
  }

  return nodes
}
