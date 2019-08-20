'use strict'

var unherit = require('unherit')
var xtend = require('xtend')
var Compiler = require('./lib/compiler.js')

module.exports = stringify
stringify.Compiler = Compiler

function stringify(options) {
  var Local = unherit(Compiler)
  Local.prototype.options = xtend(
    Local.prototype.options,
    this.data('settings'),
    options
  )
  this.Compiler = Local
}
