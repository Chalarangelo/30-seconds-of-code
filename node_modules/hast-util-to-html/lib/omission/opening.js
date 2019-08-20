'use strict'

var is = require('unist-util-is')
var element = require('hast-util-is-element')
var before = require('./util/siblings').before
var first = require('./util/first')
var place = require('./util/place')
var whiteSpaceLeft = require('./util/white-space-left')
var closing = require('./closing')
var omission = require('./omission')

var own = {}.hasOwnProperty

var uniqueHeadMetadata = ['title', 'base']
var meta = ['meta', 'link', 'script', 'style', 'template']
var tableContainers = ['thead', 'tbody']
var tableRow = 'tr'

module.exports = omission({
  html: html,
  head: head,
  body: body,
  colgroup: colgroup,
  tbody: tbody
})

/* Whether to omit `<html>`. */
function html(node) {
  var head = first(node)
  return !head || !is('comment', head)
}

/* Whether to omit `<head>`. */
function head(node) {
  var children = node.children
  var length = children.length
  var map = {}
  var index = -1
  var child
  var name

  while (++index < length) {
    child = children[index]
    name = child.tagName

    if (element(child, uniqueHeadMetadata)) {
      if (own.call(map, name)) {
        return false
      }

      map[name] = true
    }
  }

  return Boolean(length)
}

/* Whether to omit `<body>`. */
function body(node) {
  var head = first(node, true)

  return (
    !head ||
    (!is('comment', head) && !whiteSpaceLeft(head) && !element(head, meta))
  )
}

/* Whether to omit `<colgroup>`.
 * The spec describes some logic for the opening tag,
 * but it’s easier to implement in the closing tag, to
 * the same effect, so we handle it there instead. */
function colgroup(node, index, parent) {
  var prev = before(parent, index)
  var head = first(node, true)

  /* Previous colgroup was already omitted. */
  if (element(prev, 'colgroup') && closing(prev, place(parent, prev), parent)) {
    return false
  }

  return head && element(head, 'col')
}

/* Whether to omit `<tbody>`. */
function tbody(node, index, parent) {
  var prev = before(parent, index)
  var head = first(node)

  /* Previous table section was already omitted. */
  if (
    element(prev, tableContainers) &&
    closing(prev, place(parent, prev), parent)
  ) {
    return false
  }

  return head && element(head, tableRow)
}
