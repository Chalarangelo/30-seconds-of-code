'use strict'

var zlibpool = exports
var zlib = require('zlib')

var transport = require('../../../spdy-transport')

// TODO(indutny): think about it, why has it always been Z_SYNC_FLUSH here.
// It should be possible to manually flush stuff after the write instead
function createDeflate (version, compression) {
  var deflate = zlib.createDeflate({
    dictionary: transport.protocol.spdy.dictionary[version],
    flush: zlib.Z_SYNC_FLUSH,
    windowBits: 11,
    level: compression ? zlib.Z_DEFAULT_COMPRESSION : zlib.Z_NO_COMPRESSION
  })

  // For node.js v0.8
  deflate._flush = zlib.Z_SYNC_FLUSH

  return deflate
}

function createInflate (version) {
  var inflate = zlib.createInflate({
    dictionary: transport.protocol.spdy.dictionary[version],
    flush: zlib.Z_SYNC_FLUSH
  })

  // For node.js v0.8
  inflate._flush = zlib.Z_SYNC_FLUSH

  return inflate
}

function Pool (compression) {
  this.compression = compression
  this.pool = {
    2: [],
    3: [],
    3.1: []
  }
}

zlibpool.create = function create (compression) {
  return new Pool(compression)
}

Pool.prototype.get = function get (version) {
  if (this.pool[version].length > 0) {
    return this.pool[version].pop()
  } else {
    var id = version

    return {
      version: version,
      compress: createDeflate(id, this.compression),
      decompress: createInflate(id)
    }
  }
}

Pool.prototype.put = function put (pair) {
  this.pool[pair.version].push(pair)
}
