'use strict'

var transport = require('../../../spdy-transport')
var constants = require('./').constants
var base = transport.protocol.base
var utils = base.utils

var assert = require('assert')
var util = require('util')
var Buffer = require('buffer').Buffer
var WriteBuffer = require('wbuf')

var debug = require('debug')('spdy:framer')

function Framer (options) {
  base.Framer.call(this, options)
}
util.inherits(Framer, base.Framer)
module.exports = Framer

Framer.create = function create (options) {
  return new Framer(options)
}

Framer.prototype.setMaxFrameSize = function setMaxFrameSize (size) {
  // http2-only
}

Framer.prototype.headersToDict = function headersToDict (headers,
  preprocess,
  callback) {
  function stringify (value) {
    if (value !== undefined) {
      if (Array.isArray(value)) {
        return value.join('\x00')
      } else if (typeof value === 'string') {
        return value
      } else {
        return value.toString()
      }
    } else {
      return ''
    }
  }

  // Lower case of all headers keys
  var loweredHeaders = {}
  Object.keys(headers || {}).map(function (key) {
    loweredHeaders[key.toLowerCase()] = headers[key]
  })

  // Allow outer code to add custom headers or remove something
  if (preprocess) { preprocess(loweredHeaders) }

  // Transform object into kv pairs
  var size = this.version === 2 ? 2 : 4
  var len = size
  var pairs = Object.keys(loweredHeaders).filter(function (key) {
    var lkey = key.toLowerCase()

    // Will be in `:host`
    if (lkey === 'host' && this.version >= 3) {
      return false
    }

    return lkey !== 'connection' && lkey !== 'keep-alive' &&
           lkey !== 'proxy-connection' && lkey !== 'transfer-encoding'
  }, this).map(function (key) {
    var klen = Buffer.byteLength(key)
    var value = stringify(loweredHeaders[key])
    var vlen = Buffer.byteLength(value)

    len += size * 2 + klen + vlen
    return [klen, key, vlen, value]
  })

  var block = new WriteBuffer()
  block.reserve(len)

  if (this.version === 2) {
    block.writeUInt16BE(pairs.length)
  } else {
    block.writeUInt32BE(pairs.length)
  }

  pairs.forEach(function (pair) {
    // Write key length
    if (this.version === 2) {
      block.writeUInt16BE(pair[0])
    } else {
      block.writeUInt32BE(pair[0])
    }

    // Write key
    block.write(pair[1])

    // Write value length
    if (this.version === 2) {
      block.writeUInt16BE(pair[2])
    } else {
      block.writeUInt32BE(pair[2])
    }
    // Write value
    block.write(pair[3])
  }, this)

  assert(this.compress !== null, 'Framer version not initialized')
  this.compress.write(block.render(), callback)
}

Framer.prototype._frame = function _frame (frame, body, callback) {
  if (!this.version) {
    this.on('version', function () {
      this._frame(frame, body, callback)
    })
    return
  }

  debug('id=%d type=%s', frame.id, frame.type)

  var buffer = new WriteBuffer()

  buffer.writeUInt16BE(0x8000 | this.version)
  buffer.writeUInt16BE(constants.frameType[frame.type])
  buffer.writeUInt8(frame.flags)
  var len = buffer.skip(3)

  body(buffer)

  var frameSize = buffer.size - constants.FRAME_HEADER_SIZE
  len.writeUInt24BE(frameSize)

  var chunks = buffer.render()
  var toWrite = {
    stream: frame.id,
    priority: false,
    chunks: chunks,
    callback: callback
  }

  this._resetTimeout()
  this.schedule(toWrite)

  return chunks
}

Framer.prototype._synFrame = function _synFrame (frame, callback) {
  var self = this

  if (!frame.path) {
    throw new Error('`path` is required frame argument')
  }

  function preprocess (headers) {
    var method = frame.method || base.constants.DEFAULT_METHOD
    var version = frame.version || 'HTTP/1.1'
    var scheme = frame.scheme || 'https'
    var host = frame.host ||
               (frame.headers && frame.headers.host) ||
               base.constants.DEFAULT_HOST

    if (self.version === 2) {
      headers.method = method
      headers.version = version
      headers.url = frame.path
      headers.scheme = scheme
      headers.host = host
      if (frame.status) {
        headers.status = frame.status
      }
    } else {
      headers[':method'] = method
      headers[':version'] = version
      headers[':path'] = frame.path
      headers[':scheme'] = scheme
      headers[':host'] = host
      if (frame.status) { headers[':status'] = frame.status }
    }
  }

  this.headersToDict(frame.headers, preprocess, function (err, chunks) {
    if (err) {
      if (callback) {
        return callback(err)
      } else {
        return self.emit('error', err)
      }
    }

    self._frame({
      type: 'SYN_STREAM',
      id: frame.id,
      flags: frame.fin ? constants.flags.FLAG_FIN : 0
    }, function (buf) {
      buf.reserve(10)

      buf.writeUInt32BE(frame.id & 0x7fffffff)
      buf.writeUInt32BE(frame.associated & 0x7fffffff)

      var weight = (frame.priority && frame.priority.weight) ||
                   constants.DEFAULT_WEIGHT

      // We only have 3 bits for priority in SPDY, try to fit it into this
      var priority = utils.weightToPriority(weight)
      buf.writeUInt8(priority << 5)

      // CREDENTIALS slot
      buf.writeUInt8(0)

      for (var i = 0; i < chunks.length; i++) {
        buf.copyFrom(chunks[i])
      }
    }, callback)
  })
}

Framer.prototype.requestFrame = function requestFrame (frame, callback) {
  this._synFrame({
    id: frame.id,
    fin: frame.fin,
    associated: 0,
    method: frame.method,
    version: frame.version,
    scheme: frame.scheme,
    host: frame.host,
    path: frame.path,
    priority: frame.priority,
    headers: frame.headers
  }, callback)
}

Framer.prototype.responseFrame = function responseFrame (frame, callback) {
  var self = this

  var reason = frame.reason
  if (!reason) {
    reason = constants.statusReason[frame.status]
  }

  function preprocess (headers) {
    if (self.version === 2) {
      headers.status = frame.status + ' ' + reason
      headers.version = 'HTTP/1.1'
    } else {
      headers[':status'] = frame.status + ' ' + reason
      headers[':version'] = 'HTTP/1.1'
    }
  }

  this.headersToDict(frame.headers, preprocess, function (err, chunks) {
    if (err) {
      if (callback) {
        return callback(err)
      } else {
        return self.emit('error', err)
      }
    }

    self._frame({
      type: 'SYN_REPLY',
      id: frame.id,
      flags: 0
    }, function (buf) {
      buf.reserve(self.version === 2 ? 6 : 4)

      buf.writeUInt32BE(frame.id & 0x7fffffff)

      // Unused data
      if (self.version === 2) {
        buf.writeUInt16BE(0)
      }

      for (var i = 0; i < chunks.length; i++) {
        buf.copyFrom(chunks[i])
      }
    }, callback)
  })
}

Framer.prototype.pushFrame = function pushFrame (frame, callback) {
  var self = this

  this._checkPush(function (err) {
    if (err) { return callback(err) }

    self._synFrame({
      id: frame.promisedId,
      associated: frame.id,
      method: frame.method,
      status: frame.status || 200,
      version: frame.version,
      scheme: frame.scheme,
      host: frame.host,
      path: frame.path,
      priority: frame.priority,

      // Merge everything together, there is no difference in SPDY protocol
      headers: Object.assign(Object.assign({}, frame.headers), frame.response)
    }, callback)
  })
}

Framer.prototype.headersFrame = function headersFrame (frame, callback) {
  var self = this

  this.headersToDict(frame.headers, null, function (err, chunks) {
    if (err) {
      if (callback) { return callback(err) } else {
        return self.emit('error', err)
      }
    }

    self._frame({
      type: 'HEADERS',
      id: frame.id,
      priority: false,
      flags: 0
    }, function (buf) {
      buf.reserve(4 + (self.version === 2 ? 2 : 0))
      buf.writeUInt32BE(frame.id & 0x7fffffff)

      // Unused data
      if (self.version === 2) { buf.writeUInt16BE(0) }

      for (var i = 0; i < chunks.length; i++) {
        buf.copyFrom(chunks[i])
      }
    }, callback)
  })
}

Framer.prototype.dataFrame = function dataFrame (frame, callback) {
  if (!this.version) {
    return this.on('version', function () {
      this.dataFrame(frame, callback)
    })
  }

  debug('id=%d type=DATA', frame.id)

  var buffer = new WriteBuffer()
  buffer.reserve(8 + frame.data.length)

  buffer.writeUInt32BE(frame.id & 0x7fffffff)
  buffer.writeUInt8(frame.fin ? 0x01 : 0x0)
  buffer.writeUInt24BE(frame.data.length)
  buffer.copyFrom(frame.data)

  var chunks = buffer.render()
  var toWrite = {
    stream: frame.id,
    priority: frame.priority,
    chunks: chunks,
    callback: callback
  }

  var self = this
  this._resetTimeout()

  var bypass = this.version < 3.1
  this.window.send.update(-frame.data.length, bypass ? undefined : function () {
    self._resetTimeout()
    self.schedule(toWrite)
  })

  if (bypass) {
    this._resetTimeout()
    this.schedule(toWrite)
  }
}

Framer.prototype.pingFrame = function pingFrame (frame, callback) {
  this._frame({
    type: 'PING',
    id: 0,
    flags: 0
  }, function (buf, callback) {
    buf.reserve(4)

    var opaque = frame.opaque
    buf.writeUInt32BE(opaque.readUInt32BE(opaque.length - 4, true))
  }, callback)
}

Framer.prototype.rstFrame = function rstFrame (frame, callback) {
  this._frame({
    type: 'RST_STREAM',
    id: frame.id,
    flags: 0
  }, function (buf) {
    buf.reserve(8)

    // Stream ID
    buf.writeUInt32BE(frame.id & 0x7fffffff)
    // Status Code
    buf.writeUInt32BE(constants.error[frame.code])

    // Extra debugging information
    if (frame.extra) {
      buf.write(frame.extra)
    }
  }, callback)
}

Framer.prototype.prefaceFrame = function prefaceFrame () {
}

Framer.prototype.settingsFrame = function settingsFrame (options, callback) {
  var self = this

  var key = this.version + '/' + JSON.stringify(options)

  var settings = Framer.settingsCache[key]
  if (settings) {
    debug('cached settings')
    this._resetTimeout()
    this.schedule({
      stream: 0,
      priority: false,
      chunks: settings,
      callback: callback
    })
    return
  }

  var params = []
  for (var i = 0; i < constants.settingsIndex.length; i++) {
    var name = constants.settingsIndex[i]
    if (!name) { continue }

    // value: Infinity
    if (!isFinite(options[name])) {
      continue
    }

    if (options[name] !== undefined) {
      params.push({ key: i, value: options[name] })
    }
  }

  var frame = this._frame({
    type: 'SETTINGS',
    id: 0,
    flags: 0
  }, function (buf) {
    buf.reserve(4 + 8 * params.length)

    // Count of entries
    buf.writeUInt32BE(params.length)

    params.forEach(function (param) {
      var flag = constants.settings.FLAG_SETTINGS_PERSIST_VALUE << 24

      if (self.version === 2) {
        buf.writeUInt32LE(flag | param.key)
      } else { buf.writeUInt32BE(flag | param.key) }
      buf.writeUInt32BE(param.value & 0x7fffffff)
    })
  }, callback)

  Framer.settingsCache[key] = frame
}
Framer.settingsCache = {}

Framer.prototype.ackSettingsFrame = function ackSettingsFrame (callback) {
  if (callback) {
    process.nextTick(callback)
  }
}

Framer.prototype.windowUpdateFrame = function windowUpdateFrame (frame,
  callback) {
  this._frame({
    type: 'WINDOW_UPDATE',
    id: frame.id,
    flags: 0
  }, function (buf) {
    buf.reserve(8)

    // ID
    buf.writeUInt32BE(frame.id & 0x7fffffff)

    // Delta
    buf.writeInt32BE(frame.delta)
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
    // Status
    buf.writeUInt32BE(constants.goaway[frame.code])
  }, callback)
}

Framer.prototype.priorityFrame = function priorityFrame (frame, callback) {
  // No such thing in SPDY
  if (callback) {
    process.nextTick(callback)
  }
}

Framer.prototype.xForwardedFor = function xForwardedFor (frame, callback) {
  this._frame({
    type: 'X_FORWARDED_FOR',
    id: 0,
    flags: 0
  }, function (buf) {
    buf.writeUInt32BE(Buffer.byteLength(frame.host))
    buf.write(frame.host)
  }, callback)
}
