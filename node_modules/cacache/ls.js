'use strict'

var index = require('./lib/entry-index')

module.exports = index.ls
module.exports.stream = index.lsStream
