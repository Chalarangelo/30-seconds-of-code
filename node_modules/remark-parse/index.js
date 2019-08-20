'use strict'

var unherit = require('unherit')
var xtend = require('xtend')
var Parser = require('./lib/parser.js')

module.exports = parse
parse.Parser = Parser

function parse(options) {
  var settings = this.data('settings')
  var Local = unherit(Parser)

  Local.prototype.options = xtend(Local.prototype.options, settings, options)

  this.Parser = Local
}
