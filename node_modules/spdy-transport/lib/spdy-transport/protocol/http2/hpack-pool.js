'use strict'

var constants = require('./').constants

var hpack = require('hpack.js')

function Pool () {
}
module.exports = Pool

Pool.create = function create () {
  return new Pool()
}

Pool.prototype.get = function get (version) {
  var options = {
    table: {
      maxSize: constants.HEADER_TABLE_SIZE
    }
  }

  var compress = hpack.compressor.create(options)
  var decompress = hpack.decompressor.create(options)

  return {
    version: version,

    compress: compress,
    decompress: decompress
  }
}

Pool.prototype.put = function put () {
}
