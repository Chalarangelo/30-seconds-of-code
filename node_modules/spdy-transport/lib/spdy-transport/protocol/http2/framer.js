'use strict'

var transport = require('../../../spdy-transport')
var base = transport.protocol.base
var constants = require('./').constants

var assert = require('assert')
var util = require('util')
var WriteBuffer = require('wbuf')
var OffsetBuffer = require('obuf')
var debug = require('debug')('spdy:framer')
var debugExtra = require('debug')('spdy:framer:extra')

function Framer (options) {
  base.Framer.call(this, options)

  this.maxFrameSize = constants.INITIAL_MAX_FRAME_SIZE
}
util.inherits(Framer, base.Framer)
module.exports = Framer

Framer.create = function create (options) {
  return new Framer(options)
}

Framer.prototype.setMaxFrameSize = function setMaxFrameSize (size) {
  this.maxFrameSize = size
}

Framer.prototype._frame = function _frame (frame, body, callback) {
  debug('id=%d type=%s', frame.id, frame.type)

  var buffer = new WriteBuffer()

  buffer.reserve(constants.FRAME_HEADER_SIZE)
  var len = buffer.skip(3)
  buffer.writeUInt8(constants.frameType[frame.type])
  buffer.writeUInt8(frame.flags)
  buffer.writeUInt32BE(frame.id & 0x7fffffff)

  body(buffer)

  var frameSize = buffer.size - constants.FRAME_HEADER_SIZE
  len.writeUInt24BE(frameSize)

  var chunks = buffer.render()
  var toWrite = {
    stream: frame.id,
    priority: frame.priority === undefined ? false : frame.priority,
    chunks: chunks,
    callback: callback
  }

  if (this.window && frame.type === 'DATA') {
    var self = this
    this._resetTimeout()
    this.window.send.update(-frameSize, function () {
      self._resetTimeout()
      self.schedule(toWrite)
    })
  } else {
    this._resetTimeout()
    this.schedule(toWrite)
  }

  return chunks
}

Framer.prototype._split = function _split (frame) {
  var buf = new OffsetBuffer()
  for (var i = 0; i < frame.chunks.length; i++) { buf.push(frame.chunks[i]) }

  var frames = []
  while (!buf.isEmpty()) {
    // First frame may have reserved bytes in it
    var size = this.maxFrameSize
    if (frames.length === 0) {
      size -= frame.reserve
    }
    size = Math.min(size, buf.size)

    var frameBuf = buf.clone(size)
    buf.skip(size)

    frames.push({
      size: frameBuf.size,
      chunks: frameBuf.toChunks()
    })
  }

  return frames
}

Framer.prototype._continuationFrame = function _continuationFrame (frame,
  body,
  callback) {
  var frames = this._split(frame)

  frames.forEach(function (subFrame, i) {
    var isFirst = i === 0
    var isLast = i === frames.length - 1

    var flags = isLast ? constants.flags.END_HEADERS : 0

    // PRIORITY and friends
    if (isFirst) {
      flags |= frame.flags
    }

    this._frame({
      id: frame.id,
      priority: false,
      type: isFirst ? frame.type : 'CONTINUATION',
      flags: flags
    }, function (buf) {
      // Fill those reserved bytes
      if (isFirst && body) { body(buf) }

      buf.reserve(subFrame.size)
      for (var i = 0; i < subFrame.chunks.length; i++) { buf.copyFrom(subFrame.chunks[i]) }
    }, isLast ? callback : null)
  }, this)

  if (frames.length === 0) {
    this._frame({
      id: frame.id,
      priority: false,
      type: frame.type,
      flags: frame.flags | constants.flags.END_HEADERS
    }, function (buf) {
      if (body) { body(buf) }
    }, callback)
  }
}

Framer.prototype._compressHeaders = function _compressHeaders (headers,
  pairs,
  callback) {
  Object.keys(headers || {}).forEach(function (name) {
    var lowName = name.toLowerCase()

    // Not allowed in HTTP2
    switch (lowName) {
      case 'host':
      case 'connection':
      case 'keep-alive':
      case 'proxy-connection':
      case 'transfer-encoding':
      case 'upgrade':
        return
    }

    // Should be in `pairs`
    if (/^:/.test(lowName)) {
      return
    }

    // Do not compress, or index Cookie field (for security reasons)
    var neverIndex = lowName === 'cookie' || lowName === 'set-cookie'

    var value = headers[name]
    if (Array.isArray(value)) {
      for (var i = 0; i < value.length; i++) {
        pairs.push({
          name: lowName,
          value: value[i] + '',
          neverIndex: neverIndex,
          huffman: !neverIndex
        })
      }
    } else {
      pairs.push({
        name: lowName,
        value: value + '',
        neverIndex: neverIndex,
        huffman: !neverIndex
      })
    }
  })

  assert(this.compress !== null, 'Framer version not initialized')
  debugExtra('compressing headers=%j', pairs)
  this.compress.write([ pairs ], callback)
}

Framer.prototype._isDefaultPriority = function _isDefaultPriority (priority) {
  if (!priority) { return true }

  return !priority.parent &&
         priority.weight === constants.DEFAULT &&
         !priority.exclusive
}

Framer.prototype._defaultHeaders = function _defaultHeaders (frame, pairs) {
  if (!frame.path) {
    throw new Error('`path` is required frame argument')
  }

  pairs.push({
    name: ':method',
    value: frame.method || base.constants.DEFAULT_METHOD
  })
  pairs.push({ name: ':path', value: frame.path })
  pairs.push({ name: ':scheme', value: frame.scheme || 'https' })
  pairs.push({
    name: ':authority',
    value: frame.host ||
           (frame.headers && frame.headers.host) ||
           base.constants.DEFAULT_HOST
  })
}

Framer.prototype._headersFrame = function _headersFrame (kind, frame, callback) {
  var pairs = []

  if (kind === 'request') {
    this._defaultHeaders(frame, pairs)
  } else if (kind === 'response') {
    pairs.push({ name: ':status', value: (frame.status || 200) + '' })
  }

  var self = this
  this._compressHeaders(frame.headers, pairs, function (err, chunks) {
    if (err) {
      if (callback) {
        return callback(err)
      } else {
        return self.emit('error', err)
      }
    }

    var reserve = 0

    // If priority info is present, and the values are not default ones
    // reserve space for the priority info and add PRIORITY flag
    var priority = frame.priority
    if (!self._isDefaultPriority(priority)) { reserve = 5 }

    var flags = reserve === 0 ? 0 : constants.flags.PRIORITY

    // Mostly for testing
    if (frame.fin) {
      flags |= constants.flags.END_STREAM
    }

    self._continuationFrame({
      id: frame.id,
      type: 'HEADERS',
      flags: flags,
      reserve: reserve,
      chunks: chunks
    }, function (buf) {
      if (reserve === 0) {
        return
      }

      buf.writeUInt32BE(((priority.exclusive ? 0x80000000 : 0) |
                         priority.parent) >>> 0)
      buf.writeUInt8((priority.weight | 0) - 1)
    }, callback)
  })
}

Framer.prototype.requestFrame = function requestFrame (frame, callback) {
  return this._headersFrame('request', frame, callback)
}

Framer.prototype.responseFrame = function responseFrame (frame, callback) {
  return this._headersFrame('response', frame, callback)
}

Framer.prototype.headersFrame = function headersFrame (frame, callback) {
  return this._headersFrame('headers', frame, callback)
}

Framer.prototype.pushFrame = function pushFrame (frame, callback) {
  var self = this

  function compress (headers, pairs, callback) {
    self._compressHeaders(headers, pairs, function (err, chunks) {
      if (err) {
        if (callback) {
          return callback(err)
        } else {
          return self.emit('error', err)
        }
      }

      callback(chunks)
    })
  }

  function sendPromise (chunks) {
    self._continuationFrame({
      id: frame.id,
      type: 'PUSH_PROMISE',
      reserve: 4,
      chunks: chunks
    }, function (buf) {
      buf.writeUInt32BE(frame.promisedId)
    })
  }

  function sendResponse (chunks, callback) {
    var priority = frame.priority
    var isDefaultPriority = self._isDefaultPriority(priority)
    var flags = isDefaultPriority ? 0 : constants.flags.PRIORITY

    // Mostly for testing
    if (frame.fin) {
      flags |= constants.flags.END_STREAM
    }

    self._continuationFrame({
      id: frame.promisedId,
      type: 'HEADERS',
      flags: flags,
      reserve: isDefaultPriority ? 0 : 5,
      chunks: chunks
    }, function (buf) {
      if (isDefaultPriority) {
        return
      }

      buf.writeUInt32BE((priority.exclusive ? 0x80000000 : 0) |
                        priority.parent)
      buf.writeUInt8((priority.weight | 0) - 1)
    }, callback)
  }

  this._checkPush(function (err) {
    if (err) {
      return callback(err)
    }

    var pairs = {
      promise: [],
      response: []
    }

    self._defaultHeaders(frame, pairs.promise)
    pairs.response.push({ name: ':status', value: (frame.status || 200) + '' })

    compress(frame.headers, pairs.promise, function (promiseChunks) {
      sendPromise(promiseChunks)
      if (frame.response === false) {
        return callback(null)
      }
      compress(frame.response, pairs.response, function (responseChunks) {
        sendResponse(responseChunks, callback)
      })
    })
  })
}

Framer.prototype.priorityFrame = function priorityFrame (frame, callback) {
  this._frame({
    id: frame.id,
    priority: false,
    type: 'PRIORITY',
    flags: 0
  }, function (buf) {
    var priority = frame.priority
    buf.writeUInt32BE((priority.exclusive ? 0x80000000 : 0) |
                      priority.parent)
    buf.writeUInt8((priority.weight | 0) - 1)
  }, callback)
}

Framer.prototype.dataFrame = function dataFrame (frame, callback) {
  var frames = this._split({
    reserve: 0,
    chunks: [ frame.data ]
  })

  var fin = frame.fin ? constants.flags.END_STREAM : 0

  var self = this
  frames.forEach(function (subFrame, i) {
    var isLast = i === frames.length - 1
    var flags = 0
    if (isLast) {
      flags |= fin
    }

    self._frame({
      id: frame.id,
      priority: frame.priority,
      type: 'DATA',
      flags: flags
    }, function (buf) {
      buf.reserve(subFrame.size)
      for (var i = 0; i < subFrame.chunks.length; i++) { buf.copyFrom(subFrame.chunks[i]) }
    }, isLast ? callback : null)
  })

  // Empty DATA
  if (frames.length === 0) {
    this._frame({
      id: frame.id,
      priority: frame.priority,
      type: 'DATA',
      flags: fin
    }, function (buf) {
      // No-op
    }, callback)
  }
}

Framer.prototype.pingFrame = function pingFrame (frame, callback) {
  this._frame({
    id: 0,
    type: 'PING',
    flags: frame.ack ? constants.flags.ACK : 0
  }, function (buf) {
    buf.copyFrom(frame.opaque)
  }, callback)
}

Framer.prototype.rstFrame = function rstFrame (frame, callback) {
  this._frame({
    id: frame.id,
    type: 'RST_STREAM',
    flags: 0
  }, function (buf) {
    buf.writeUInt32BE(constants.error[frame.code])
  }, callback)
}

Framer.prototype.prefaceFrame = function prefaceFrame (callback) {
  debug('preface')
  this._resetTimeout()
  this.schedule({
    stream: 0,
    priority: false,
    chunks: [ constants.PREFACE_BUFFER ],
    callback: callback
  })
}

Framer.prototype.settingsFrame = function settingsFrame (options, callback) {
  var key = JSON.stringify(options)

  var settings = Framer.settingsCache[key]
  if (settings) {
    debug('cached settings')
    this._resetTimeout()
    this.schedule({
      id: 0,
      priority: false,
      chunks: settings,
      callback: callback
    })
    return
  }

  var params = []
  for (var i = 0; i < constants.settingsIndex.length; i++) {
    var name = constants.settingsIndex[i]
    if (!name) {
      continue
    }

    // value: Infinity
    if (!isFinite(options[name])) {
      continue
    }

    if (options[name] !== undefined) {
      params.push({ key: i, value: options[name] })
    }
  }

  var bodySize = params.length * 6

  var chunks = this._frame({
    id: 0,
    type: 'SETTINGS',
    flags: 0
  }, function (buffer) {
    buffer.reserve(bodySize)
    for (var i = 0; i < params.length; i++) {
      var param = params[i]

      buffer.writeUInt16BE(param.key)
      buffer.writeUInt32BE(param.value)
    }
  }, callback)

  Framer.settingsCache[key] = chunks
}
Framer.settingsCache = {}

Framer.prototype.ackSettingsFrame = function ackSettingsFrame (callback) {
  /* var chunks = */ this._frame({
    id: 0,
    type: 'SETTINGS',
    flags: constants.flags.ACK
  }, function (buffer) {
    // No-op
  }, callback)
}

Framer.prototype.windowUpdateFrame = function windowUpdateFrame (frame,
  callback) {
  this._frame({
    id: frame.id,
    type: 'WINDOW_UPDATE',
    flags: 0
  }, function (buffer) {
    buffer.reserve(4)
    buffer.writeInt32BE(frame.delta)
  }, callback)
}

Framer.prototype.goawayFrame = function goawayFrame (frame, callback) {
  this._frame({
    type: 'GOAWAY',
    id: 0,
    flags: 0
  }, function (buf) {
    buf.reserve(8)

    // Last-good-stream-ID
    buf.writeUInt32BE(frame.lastId & 0x7fffffff)
    // Code
    buf.writeUInt32BE(constants.goaway[frame.code])

    // Extra debugging information
    if (frame.extra) { buf.write(frame.extra) }
  }, callback)
}

Framer.prototype.xForwardedFor = function xForwardedFor (frame, callback) {
  this._frame({
    type: 'X_FORWARDED_FOR',
    id: 0,
    flags: 0
  }, function (buf) {
    buf.write(frame.host)
  }, callback)
}
