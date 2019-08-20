'use strict'

module.exports = markdownTable

var dotRe = /\./
var lastDotRe = /\.[^.]*$/

// Characters.
var space = ' '
var lineFeed = '\n'
var dash = '-'
var dot = '.'
var colon = ':'
var lowercaseC = 'c'
var lowercaseL = 'l'
var lowercaseR = 'r'
var verticalBar = '|'

var minCellSize = 3

// Create a table from a matrix of strings.
function markdownTable(table, options) {
  var settings = options || {}
  var delimiter = settings.delimiter
  var start = settings.start
  var end = settings.end
  var alignment = settings.align
  var calculateStringLength = settings.stringLength || lengthNoop
  var cellCount = 0
  var rowIndex = -1
  var rowLength = table.length
  var sizes = []
  var align
  var rule
  var rows
  var row
  var cells
  var index
  var position
  var size
  var value
  var spacing
  var before
  var after

  alignment = alignment ? alignment.concat() : []

  if (delimiter === null || delimiter === undefined) {
    delimiter = space + verticalBar + space
  }

  if (start === null || start === undefined) {
    start = verticalBar + space
  }

  if (end === null || end === undefined) {
    end = space + verticalBar
  }

  while (++rowIndex < rowLength) {
    row = table[rowIndex]

    index = -1

    if (row.length > cellCount) {
      cellCount = row.length
    }

    while (++index < cellCount) {
      position = row[index] ? dotindex(row[index]) : null

      if (!sizes[index]) {
        sizes[index] = minCellSize
      }

      if (position > sizes[index]) {
        sizes[index] = position
      }
    }
  }

  if (typeof alignment === 'string') {
    alignment = pad(cellCount, alignment).split('')
  }

  // Make sure only valid alignments are used.
  index = -1

  while (++index < cellCount) {
    align = alignment[index]

    if (typeof align === 'string') {
      align = align.charAt(0).toLowerCase()
    }

    if (
      align !== lowercaseL &&
      align !== lowercaseR &&
      align !== lowercaseC &&
      align !== dot
    ) {
      align = ''
    }

    alignment[index] = align
  }

  rowIndex = -1
  rows = []

  while (++rowIndex < rowLength) {
    row = table[rowIndex]

    index = -1
    cells = []

    while (++index < cellCount) {
      value = row[index]

      value = stringify(value)

      if (alignment[index] === dot) {
        position = dotindex(value)

        size =
          sizes[index] +
          (dotRe.test(value) ? 0 : 1) -
          (calculateStringLength(value) - position)

        cells[index] = value + pad(size - 1)
      } else {
        cells[index] = value
      }
    }

    rows[rowIndex] = cells
  }

  sizes = []
  rowIndex = -1

  while (++rowIndex < rowLength) {
    cells = rows[rowIndex]

    index = -1

    while (++index < cellCount) {
      value = cells[index]

      if (!sizes[index]) {
        sizes[index] = minCellSize
      }

      size = calculateStringLength(value)

      if (size > sizes[index]) {
        sizes[index] = size
      }
    }
  }

  rowIndex = -1

  while (++rowIndex < rowLength) {
    cells = rows[rowIndex]

    index = -1

    if (settings.pad !== false) {
      while (++index < cellCount) {
        value = cells[index]

        position = sizes[index] - (calculateStringLength(value) || 0)
        spacing = pad(position)

        if (alignment[index] === lowercaseR || alignment[index] === dot) {
          value = spacing + value
        } else if (alignment[index] === lowercaseC) {
          position /= 2

          if (position % 1 === 0) {
            before = position
            after = position
          } else {
            before = position + 0.5
            after = position - 0.5
          }

          value = pad(before) + value + pad(after)
        } else {
          value += spacing
        }

        cells[index] = value
      }
    }

    rows[rowIndex] = cells.join(delimiter)
  }

  if (settings.rule !== false) {
    index = -1
    rule = []

    while (++index < cellCount) {
      // When `pad` is false, make the rule the same size as the first row.
      if (settings.pad === false) {
        value = table[0][index]
        spacing = calculateStringLength(stringify(value))
        spacing = spacing > minCellSize ? spacing : minCellSize
      } else {
        spacing = sizes[index]
      }

      align = alignment[index]

      // When `align` is left, don't add colons.
      value = align === lowercaseR || align === '' ? dash : colon
      value += pad(spacing - 2, dash)
      value += align !== lowercaseL && align !== '' ? colon : dash

      rule[index] = value
    }

    rows.splice(1, 0, rule.join(delimiter))
  }

  return start + rows.join(end + lineFeed + start) + end
}

function stringify(value) {
  return value === null || value === undefined ? '' : String(value)
}

// Get the length of `value`.
function lengthNoop(value) {
  return String(value).length
}

// Get a string consisting of `length` `character`s.
function pad(length, character) {
  return new Array(length + 1).join(character || space)
}

// Get the position of the last dot in `value`.
function dotindex(value) {
  var match = lastDotRe.exec(value)

  return match ? match.index + 1 : value.length
}
