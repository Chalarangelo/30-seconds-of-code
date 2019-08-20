'use strict'

// Characters.
var NULL = '\0'
var AMP = '&'
var SP = ' '
var TB = '\t'
var GR = '`'
var DQ = '"'
var SQ = "'"
var EQ = '='
var LT = '<'
var GT = '>'
var SO = '/'
var LF = '\n'
var CR = '\r'
var FF = '\f'

var whitespace = [SP, TB, LF, CR, FF]
// https://html.spec.whatwg.org/#attribute-name-state
var name = whitespace.concat(AMP, SO, GT, EQ)
// https://html.spec.whatwg.org/#attribute-value-(unquoted)-state
var unquoted = whitespace.concat(AMP, GT)
var unquotedSafe = unquoted.concat(NULL, DQ, SQ, LT, EQ, GR)
// https://html.spec.whatwg.org/#attribute-value-(single-quoted)-state
var singleQuoted = [AMP, SQ]
// https://html.spec.whatwg.org/#attribute-value-(double-quoted)-state
var doubleQuoted = [AMP, DQ]

// Maps of subsets. Each value is a matrix of tuples.
// The first value causes parse errors, the second is valid.
// Of both values, the first value is unsafe, and the second is safe.
module.exports = {
  name: [
    [name, name.concat(DQ, SQ, GR)],
    [name.concat(NULL, DQ, SQ, LT), name.concat(NULL, DQ, SQ, LT, GR)]
  ],
  unquoted: [[unquoted, unquotedSafe], [unquotedSafe, unquotedSafe]],
  single: [
    [singleQuoted, singleQuoted.concat(DQ, GR)],
    [singleQuoted.concat(NULL), singleQuoted.concat(NULL, DQ, GR)]
  ],
  double: [
    [doubleQuoted, doubleQuoted.concat(SQ, GR)],
    [doubleQuoted.concat(NULL), doubleQuoted.concat(NULL, SQ, GR)]
  ]
}
