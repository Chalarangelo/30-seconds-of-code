'use strict'

var markdownTable = require('markdown-table')

module.exports = table

var space = ' '
var verticalBar = '|'

// Stringify table.
//
// Creates a fenced table by default, but not in `looseTable: true` mode:
//
// ```markdown
//  Foo | Bar
// :-: | ---
// Baz | Qux
//
// NOTE: Be careful with `looseTable: true` mode, as a loose table inside an
// indented code block on GitHub renders as an actual table!
//
// Creates a spaced table by default, but not in `spacedTable: false`:
//
// ```markdown
// |Foo|Bar|
// |:-:|---|
// |Baz|Qux|
// ```
function table(node) {
  var self = this
  var options = self.options
  var loose = options.looseTable
  var spaced = options.spacedTable
  var pad = options.paddedTable
  var stringLength = options.stringLength
  var rows = node.children
  var index = rows.length
  var exit = self.enterTable()
  var result = []
  var start
  var end

  while (index--) {
    result[index] = self.all(rows[index])
  }

  exit()

  if (loose) {
    start = ''
    end = ''
  } else if (spaced) {
    start = verticalBar + space
    end = space + verticalBar
  } else {
    start = verticalBar
    end = verticalBar
  }

  return markdownTable(result, {
    align: node.align,
    pad: pad,
    start: start,
    end: end,
    stringLength: stringLength,
    delimiter: spaced ? space + verticalBar + space : verticalBar
  })
}
