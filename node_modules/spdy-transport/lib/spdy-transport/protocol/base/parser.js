'use strict'

var transport = require('../../../spdy-transport')

var util = require('util')
var utils = require('./').utils
var OffsetBuffer = require('obuf')
var Transform = require('readable-stream').Transform

function Parser (options) {
  Transform.call(this, {
    readableObjectMode: true
  })

  this.buffer = new OffsetBuffer()
  this.partial = false
  this.waiting = 0

  this.window = options.window

  this.version = null
  this.decompress = null
  this.dead = false
}
module.exports = Parser
util.inherits(Parser, Transform)

Parser.prototype.error = utils.error

Parser.prototype.kill = function kill () {
  this.dead = true
}

Parser.prototype._transform = function transform (data, encoding, cb) {
  if (!this.dead) { this.buffer.push(data) }

  this._consume(cb)
}

Parser.prototype._consume = function _consume (cb) {
  var self = this

  function next (err, frame) {
    if (err) {
      return cb(err)
    }

    if (Array.isArray(frame)) {
      for (var i = 0; i < frame.length; i++) {
        self.push(frame[i])
      }
    } else if (frame) {
      self.push(frame)
    }

    // Consume more packets
    if (!sync) {
      return self._consume(cb)
    }

    process.nextTick(function () {
      self._consume(cb)
    })
  }

  if (this.dead) {
    return cb()
  }

  if (this.buffer.size < this.waiting) {
    // No data at all
    if (this.buffer.size === 0) {
      return cb()
    }

    // Partial DATA frame or something that we can process partially
    if (this.partial) {
      var partial = this.buffer.clone(this.buffer.size)
      this.buffer.skip(partial.size)
      this.waiting -= partial.size

      this.executePartial(partial, next)
      return
    }

    // We shall not do anything until we get all expected data
    return cb()
  }

  var sync = true

  var content = this.buffer.clone(this.waiting)
  this.buffer.skip(this.waiting)

  this.execute(content, next)
  sync = false
}

Parser.prototype.setVersion = function setVersion (version) {
  this.version = version
  this.emit('version', version)
}

Parser.prototype.setCompression = function setCompresion (pair) {
  this.decompress = new transport.utils.LockStream(pair.decompress)
}
