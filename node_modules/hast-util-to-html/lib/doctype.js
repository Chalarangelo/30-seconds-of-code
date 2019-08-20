'use strict'

module.exports = doctype

/* Stringify a doctype `node`. */
function doctype(ctx, node) {
  var sep = ctx.tightDoctype ? '' : ' '
  var name = node.name
  var pub = node.public
  var sys = node.system
  var val = ['<!doctype']

  if (name) {
    val.push(sep, name)

    if (pub != null) {
      val.push(' public', sep, smart(pub))
    } else if (sys != null) {
      val.push(' system')
    }

    if (sys != null) {
      val.push(sep, smart(sys))
    }
  }

  return val.join('') + '>'
}

function smart(value) {
  var quote = value.indexOf('"') === -1 ? '"' : "'"
  return quote + value + quote
}
