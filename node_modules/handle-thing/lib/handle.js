var assert = require('assert')
var util = require('util')

var EventEmitter = require('events').EventEmitter
var Buffer = require('buffer').Buffer

var Queue = require('./queue')

// Node.js version
var mode = 'modern'

function Handle (stream, options) {
  EventEmitter.call(this)

  this._stream = stream
  this._flowing = false
  this._reading = false
  this._options = options || {}

  this.onread = null

  // Pending requests
  this.pending = new Queue()
}
util.inherits(Handle, EventEmitter)
module.exports = Handle

Handle.mode = mode

Handle.create = function create (stream, options) {
  return new Handle(stream, options)
}

Handle.prototype._queueReq = function _queueReq (type, req) {
  return this.pending.append(type, req)
}

Handle.prototype._pendingList = function _pendingList () {
  var list = []
  while (!this.pending.isEmpty()) { list.push(this.pending.first().dequeue()) }
  return list
}

Handle.prototype.setStream = function setStream (stream) {
  assert(this._stream === null, 'Can\'t set stream two times')
  this._stream = stream

  this.emit('stream', stream)
}

Handle.prototype.readStart = function readStart () {
  this._reading = true

  if (!this._stream) {
    this.once('stream', this.readStart)
    return 0
  }

  if (!this._flowing) {
    this._flowing = true
    this._flow()
  }

  this._stream.resume()
  return 0
}

Handle.prototype.readStop = function readStop () {
  this._reading = false

  if (!this._stream) {
    this.once('stream', this.readStop)
    return 0
  }
  this._stream.pause()
  return 0
}

var uv = process.binding('uv')

Handle.prototype._flow = function flow () {
  var self = this
  this._stream.on('data', function (chunk) {
    self.onread(chunk.length, chunk)
  })

  this._stream.on('end', function () {
    self.onread(uv.UV_EOF, Buffer.alloc(0))
  })

  this._stream.on('close', function () {
    setImmediate(function () {
      if (self._reading) {
        self.onread(uv.UV_ECONNRESET, Buffer.alloc(0))
      }
    })
  })
}

Handle.prototype._close = function _close () {
  var list = this._pendingList()

  var self = this
  setImmediate(function () {
    for (var i = 0; i < list.length; i++) {
      var req = list[i]
      req.oncomplete(uv.UV_ECANCELED, self, req)
    }
  })

  this.readStop()
}

Handle.prototype.shutdown = function shutdown (req) {
  var wrap = this._queueReq('shutdown', req)

  if (!this._stream) {
    this.once('stream', function () {
      this._shutdown(wrap)
    })
    return 0
  }

  return this._shutdown(wrap)
}

Handle.prototype._shutdown = function _shutdown (wrap) {
  var self = this
  this._stream.end(function () {
    var req = wrap.dequeue()
    if (!req) { return }

    req.oncomplete(0, self, req)
  })
  return 0
}

Handle.prototype.close = function close (callback) {
  this._close()

  if (!this._stream) {
    this.once('stream', function () {
      this.close(callback)
    })
    return 0
  }

  if (this._options.close) {
    this._options.close(callback)
  } else {
    process.nextTick(callback)
  }

  return 0
}

Handle.prototype.writeEnc = function writeEnc (req, data, enc) {
  var wrap = this._queueReq('write', req)

  if (!this._stream) {
    this.once('stream', function () {
      this._writeEnc(wrap, req, data, enc)
    })

    return 0
  }

  return this._writeEnc(wrap, req, data, enc)
}

Handle.prototype._writeEnc = function _writeEnc (wrap, req, data, enc) {
  var self = this

  req.async = true
  req.bytes = data.length

  if (wrap.isEmpty()) {
    return 0
  }

  this._stream.write(data, enc, function () {
    var req = wrap.dequeue()
    if (!req) { return }
    req.oncomplete(0, self, req)
  })

  return 0
}

/**
 * @param {WriteWrap} req
 * @param {string[]} chunks
 * @param {Boolean} allBuffers
 */
Handle.prototype.writev = function _writev (req, chunks, allBuffers) {
  while (chunks.length > 0) {
    this._stream.write(chunks.shift(), chunks.shift())
  }
  return 0
}

Handle.prototype.writeBuffer = function writeBuffer (req, data) {
  return this.writeEnc(req, data, null)
}

Handle.prototype.writeAsciiString = function writeAsciiString (req, data) {
  return this.writeEnc(req, data, 'ascii')
}

Handle.prototype.writeUtf8String = function writeUtf8String (req, data) {
  return this.writeEnc(req, data, 'utf8')
}

Handle.prototype.writeUcs2String = function writeUcs2String (req, data) {
  return this.writeEnc(req, data, 'ucs2')
}

Handle.prototype.writeBinaryString = function writeBinaryString (req, data) {
  return this.writeEnc(req, data, 'binary')
}

Handle.prototype.writeLatin1String = function writeLatin1String (req, data) {
  return this.writeEnc(req, data, 'binary')
}

// v0.8
Handle.prototype.getsockname = function getsockname () {
  if (this._options.getPeerName) {
    return this._options.getPeerName()
  }
  return null
}

Handle.prototype.getpeername = function getpeername (out) {
  var res = this.getsockname()
  if (!res) { return -1 }

  Object.keys(res).forEach(function (key) {
    out[key] = res[key]
  })

  return 0
}
