'use strict'

var is = require('unist-util-is')
var element = require('hast-util-is-element')
var whiteSpaceLeft = require('./util/white-space-left')
var after = require('./util/siblings').after
var omission = require('./omission')

var optionGroup = 'optgroup'
var options = ['option'].concat(optionGroup)
var dataListItem = ['dt', 'dd']
var listItem = 'li'
var menuContent = ['menuitem', 'hr', 'menu']
var ruby = ['rp', 'rt']
var tableContainer = ['tbody', 'tfoot']
var tableRow = 'tr'
var tableCell = ['td', 'th']

var confusingParagraphParent = [
  'a',
  'audio',
  'del',
  'ins',
  'map',
  'noscript',
  'video'
]

var clearParagraphSibling = [
  'address',
  'article',
  'aside',
  'blockquote',
  'details',
  'div',
  'dl',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hgroup',
  'hr',
  'main',
  'menu',
  'nav',
  'ol',
  'p',
  'pre',
  'section',
  'table',
  'ul'
]

module.exports = omission({
  html: html,
  head: headOrColgroupOrCaption,
  body: body,
  p: p,
  li: li,
  dt: dt,
  dd: dd,
  rt: rubyElement,
  rp: rubyElement,
  optgroup: optgroup,
  option: option,
  menuitem: menuitem,
  colgroup: headOrColgroupOrCaption,
  caption: headOrColgroupOrCaption,
  thead: thead,
  tbody: tbody,
  tfoot: tfoot,
  tr: tr,
  td: cells,
  th: cells
})

/* Macro for `</head>`, `</colgroup>`, and `</caption>`. */
function headOrColgroupOrCaption(node, index, parent) {
  var next = after(parent, index, true)
  return !next || (!is('comment', next) && !whiteSpaceLeft(next))
}

/* Whether to omit `</html>`. */
function html(node, index, parent) {
  var next = after(parent, index)
  return !next || !is('comment', next)
}

/* Whether to omit `</body>`. */
function body(node, index, parent) {
  var next = after(parent, index)
  return !next || !is('comment', next)
}

/* Whether to omit `</p>`. */
function p(node, index, parent) {
  var next = after(parent, index)
  return next
    ? element(next, clearParagraphSibling)
    : !parent || !element(parent, confusingParagraphParent)
}

/* Whether to omit `</li>`. */
function li(node, index, parent) {
  var next = after(parent, index)
  return !next || element(next, listItem)
}

/* Whether to omit `</dt>`. */
function dt(node, index, parent) {
  var next = after(parent, index)
  return next && element(next, dataListItem)
}

/* Whether to omit `</dd>`. */
function dd(node, index, parent) {
  var next = after(parent, index)
  return !next || element(next, dataListItem)
}

/* Whether to omit `</rt>` or `</rp>`. */
function rubyElement(node, index, parent) {
  var next = after(parent, index)
  return !next || element(next, ruby)
}

/* Whether to omit `</optgroup>`. */
function optgroup(node, index, parent) {
  var next = after(parent, index)
  return !next || element(next, optionGroup)
}

/* Whether to omit `</option>`. */
function option(node, index, parent) {
  var next = after(parent, index)
  return !next || element(next, options)
}

/* Whether to omit `</menuitem>`. */
function menuitem(node, index, parent) {
  var next = after(parent, index)
  return !next || element(next, menuContent)
}

/* Whether to omit `</thead>`. */
function thead(node, index, parent) {
  var next = after(parent, index)
  return next && element(next, tableContainer)
}

/* Whether to omit `</tbody>`. */
function tbody(node, index, parent) {
  var next = after(parent, index)
  return !next || element(next, tableContainer)
}

/* Whether to omit `</tfoot>`. */
function tfoot(node, index, parent) {
  return !after(parent, index)
}

/* Whether to omit `</tr>`. */
function tr(node, index, parent) {
  var next = after(parent, index)
  return !next || element(next, tableRow)
}

/* Whether to omit `</td>` or `</th>`. */
function cells(node, index, parent) {
  var next = after(parent, index)
  return !next || element(next, tableCell)
}
