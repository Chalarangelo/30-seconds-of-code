'use strict'

var html = require('property-information/html')
var svg = require('property-information/svg')
var find = require('property-information/find')
var ns = require('web-namespaces')
var s = require('hastscript/svg')
var h = require('hastscript')
var xtend = require('xtend')
var count = require('ccount')

module.exports = wrapper

var own = {}.hasOwnProperty

/* Handlers. */
var map = {
  '#document': root,
  '#document-fragment': root,
  '#text': text,
  '#comment': comment,
  '#documentType': doctype
}

/* Wrapper to normalise options. */
function wrapper(ast, options) {
  var settings = options || {}
  var file

  if (settings.messages) {
    file = settings
    settings = {}
  } else {
    file = settings.file
  }

  return transform(ast, {
    schema: settings.space === 'svg' ? svg : html,
    file: file,
    verbose: settings.verbose,
    location: false
  })
}

/* Transform a node. */
function transform(ast, config) {
  var schema = config.schema
  var fn = own.call(map, ast.nodeName) ? map[ast.nodeName] : element
  var children
  var node
  var pos

  if (fn === element) {
    config.schema = ast.namespaceURI === ns.svg ? svg : html
  }

  if (ast.childNodes) {
    children = nodes(ast.childNodes, config)
  }

  node = fn(ast, children, config)

  if (ast.sourceCodeLocation && config.file) {
    pos = location(node, ast.sourceCodeLocation, config)

    if (pos) {
      config.location = true
      node.position = pos
    }
  }

  config.schema = schema

  return node
}

/* Transform children. */
function nodes(children, config) {
  var length = children.length
  var index = -1
  var result = []

  while (++index < length) {
    result[index] = transform(children[index], config)
  }

  return result
}

/* Transform a document.
 * Stores `ast.quirksMode` in `node.data.quirksMode`. */
function root(ast, children, config) {
  var node = {type: 'root', children: children, data: {}}
  var doc

  node.data.quirksMode = ast.mode === 'quirks' || ast.mode === 'limited-quirks'

  if (config.file && config.location) {
    doc = String(config.file)

    node.position = {
      start: {line: 1, column: 1, offset: 0},
      end: {
        line: count(doc, '\n') + 1,
        column: doc.length - doc.lastIndexOf('\n'),
        offset: doc.length
      }
    }
  }

  return node
}

/* Transform a doctype. */
function doctype(ast) {
  return {
    type: 'doctype',
    name: ast.name || '',
    public: ast.publicId || null,
    system: ast.systemId || null
  }
}

/* Transform a text. */
function text(ast) {
  return {type: 'text', value: ast.value}
}

/* Transform a comment. */
function comment(ast) {
  return {type: 'comment', value: ast.data}
}

/* Transform an element. */
function element(ast, children, config) {
  var fn = config.schema.space === 'svg' ? s : h
  var name = ast.tagName
  var attributes = ast.attrs
  var length = attributes.length
  var props = {}
  var index = -1
  var attribute
  var prop
  var node
  var pos
  var start
  var end

  while (++index < length) {
    attribute = attributes[index]
    prop = (attribute.prefix ? attribute.prefix + ':' : '') + attribute.name
    props[prop] = attribute.value
  }

  node = fn(name, props, children)

  if (name === 'template' && 'content' in ast) {
    pos = ast.sourceCodeLocation
    start = pos && pos.startTag && position(pos.startTag).end
    end = pos && pos.endTag && position(pos.endTag).start

    node.content = transform(ast.content, config)

    if ((start || end) && config.file) {
      node.content.position = {start: start, end: end}
    }
  }

  return node
}

/* Create clean positional information. */
function location(node, location, config) {
  var schema = config.schema
  var verbose = config.verbose
  var pos = position(location)
  var reference
  var attributes
  var attribute
  var props
  var prop

  if (node.type === 'element') {
    reference = node.children[node.children.length - 1]

    /* Unclosed with children (upstream: https://github.com/inikulin/parse5/issues/109) */
    if (
      !location.endTag &&
      reference &&
      reference.position &&
      reference.position.end
    ) {
      pos.end = xtend(reference.position.end)
    }

    if (verbose) {
      attributes = location.attrs
      props = {}

      for (attribute in attributes) {
        prop = find(schema, attribute).property
        props[prop] = position(attributes[attribute])
      }

      node.data = {
        position: {
          opening: position(location.startTag),
          closing: location.endTag ? position(location.endTag) : null,
          properties: props
        }
      }
    }
  }

  return pos
}

function position(loc) {
  var start = point({
    line: loc.startLine,
    column: loc.startCol,
    offset: loc.startOffset
  })
  var end = point({
    line: loc.endLine,
    column: loc.endCol,
    offset: loc.endOffset
  })
  return start || end ? {start: start, end: end} : null
}

function point(point) {
  return point.line && point.column ? point : null
}
