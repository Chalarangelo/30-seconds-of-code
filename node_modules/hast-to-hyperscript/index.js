'use strict'

var html = require('property-information/html')
var svg = require('property-information/svg')
var find = require('property-information/find')
var spaces = require('space-separated-tokens')
var commas = require('comma-separated-tokens')
var style = require('style-to-object')
var ns = require('web-namespaces')
var is = require('unist-util-is')

var dashes = /-([a-z])/g

module.exports = wrapper

function wrapper(h, node, options) {
  var settings = options || {}
  var prefix
  var r
  var v

  if (typeof h !== 'function') {
    throw new Error('h is not a function')
  }

  if (typeof settings === 'string' || typeof settings === 'boolean') {
    prefix = settings
    settings = {}
  } else {
    prefix = settings.prefix
  }

  r = react(h)
  v = vdom(h)

  if (prefix === null || prefix === undefined) {
    prefix = r === true || v === true ? 'h-' : false
  }

  if (is('root', node)) {
    if (node.children.length === 1 && is('element', node.children[0])) {
      node = node.children[0]
    } else {
      node = {
        type: 'element',
        tagName: 'div',
        properties: {},
        children: node.children
      }
    }
  } else if (!is('element', node)) {
    throw new Error(
      'Expected root or element, not `' + ((node && node.type) || node) + '`'
    )
  }

  return toH(h, node, {
    schema: settings.space === 'svg' ? svg : html,
    prefix: prefix,
    key: 0,
    react: r,
    vdom: v,
    hyperscript: hyperscript(h)
  })
}

// Transform a HAST node through a hyperscript interface
// to *anything*!
function toH(h, node, ctx) {
  var parentSchema = ctx.schema
  var schema = parentSchema
  var name = node.tagName
  var properties
  var attributes
  var children
  var property
  var elements
  var length
  var index
  var value
  var result

  if (parentSchema.space === 'html' && name.toLowerCase() === 'svg') {
    schema = svg
    ctx.schema = schema
  }

  if (ctx.vdom === true && schema.space === 'html') {
    name = name.toUpperCase()
  }

  properties = node.properties
  attributes = {}

  for (property in properties) {
    addAttribute(attributes, property, properties[property], ctx)
  }

  if (
    typeof attributes.style === 'string' &&
    (ctx.vdom === true || ctx.react === true)
  ) {
    // VDOM and React accept `style` as object.
    attributes.style = parseStyle(attributes.style, name)
  }

  if (ctx.prefix) {
    ctx.key++
    attributes.key = ctx.prefix + ctx.key
  }

  if (ctx.vdom && schema.space !== 'html') {
    attributes.namespace = ns[schema.space]
  }

  elements = []
  children = node.children
  length = children ? children.length : 0
  index = -1

  while (++index < length) {
    value = children[index]

    if (is('element', value)) {
      elements.push(toH(h, value, ctx))
    } else if (is('text', value)) {
      elements.push(value.value)
    }
  }

  // Ensure no React warnings are triggered for
  // void elements having children passed in.
  result =
    elements.length === 0 ? h(name, attributes) : h(name, attributes, elements)

  // Restore parent schema.
  ctx.schema = parentSchema

  return result
}

function addAttribute(props, prop, value, ctx) {
  var schema = ctx.schema
  var info = find(schema, prop)
  var subprop

  // Ignore nully, `false`, `NaN`, and falsey known booleans.
  if (
    value === null ||
    value === undefined ||
    value === false ||
    value !== value ||
    (info.boolean && !value)
  ) {
    return
  }

  if (value !== null && typeof value === 'object' && 'length' in value) {
    // Accept `array`.  Most props are space-separater.
    value = (info.commaSeparated ? commas : spaces).stringify(value)
  }

  // Treat `true` and truthy known booleans.
  if (info.boolean && ctx.hyperscript === true) {
    value = ''
  }

  if (!info.mustUseProperty) {
    if (ctx.vdom === true) {
      subprop = 'attributes'
    } else if (ctx.hyperscript === true) {
      subprop = 'attrs'
    }
  }

  if (subprop) {
    if (props[subprop] === undefined) {
      props[subprop] = {}
    }

    props[subprop][info.attribute] = value
  } else {
    props[ctx.react && info.space ? info.property : info.attribute] = value
  }
}

// Check if `h` is `react.createElement`.
function react(h) {
  var node = h && h('div')
  return Boolean(
    node && ('_owner' in node || '_store' in node) && node.key === null
  )
}

// Check if `h` is `hyperscript`.
function hyperscript(h) {
  return Boolean(h && h.context && h.cleanup)
}

// Check if `h` is `virtual-dom/h`.
function vdom(h) {
  return h && h('div').type === 'VirtualNode'
}

function parseStyle(value, tagName) {
  var result = {}

  try {
    style(value, iterator)
  } catch (err) {
    err.message = tagName + '[style]' + err.message.slice('undefined'.length)
    throw err
  }

  return result

  function iterator(name, value) {
    result[styleCase(name)] = value
  }
}

function styleCase(val) {
  if (val.slice(0, 4) === '-ms-') {
    val = 'ms-' + val.slice(4)
  }

  return val.replace(dashes, styleReplacer)
}

function styleReplacer($0, $1) {
  return $1.toUpperCase()
}
