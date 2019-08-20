'use strict'

var assert = require('assert')
var thing = require('handle-thing')
var httpDeceiver = require('http-deceiver')
var util = require('util')

function Handle (options, stream, socket) {
  var state = {}
  this._spdyState = state

  state.options = options || {}

  state.stream = stream
  state.socket = null
  state.rawSocket = socket || stream.connection.socket
  state.deceiver = null
  state.ending = false

  var self = this
  thing.call(this, stream, {
    getPeerName: function () {
      return self._getPeerName()
    },
    close: function (callback) {
      return self._closeCallback(callback)
    }
  })

  if (!state.stream) {
    this.on('stream', function (stream) {
      state.stream = stream
    })
  }
}
util.inherits(Handle, thing)
module.exports = Handle

Handle.create = function create (options, stream, socket) {
  return new Handle(options, stream, socket)
}

Handle.prototype._getPeerName = function _getPeerName () {
  var state = this._spdyState

  if (state.rawSocket._getpeername) {
    return state.rawSocket._getpeername()
  }

  return null
}

Handle.prototype._closeCallback = function _closeCallback (callback) {
  var state = this._spdyState
  var stream = state.stream

  if (state.ending) {
    // The .end() method of the stream may be called by us or by the
    // .shutdown() method in our super-class. If the latter has already been
    // called, then calling the .end() method below will have no effect, with
    // the result that the callback will never get executed, leading to an ever
    // so subtle memory leak.
    if (stream._writableState.finished) {
      // NOTE: it is important to call `setImmediate` instead of `nextTick`,
      // since this is how regular `handle.close()` works in node.js core.
      //
      // Using `nextTick` will lead to `net.Socket` emitting `close` before
      // `end` on UV_EOF. This results in aborted request without `end` event.
      setImmediate(callback)
    } else if (stream._writableState.ending) {
      stream.once('finish', function () {
        callback(null)
      })
    } else {
      stream.end(callback)
    }
  } else {
    stream.abort(callback)
  }

  // Only a single end is allowed
  state.ending = false
}

Handle.prototype.getStream = function getStream (callback) {
  var state = this._spdyState

  if (!callback) {
    assert(state.stream)
    return state.stream
  }

  if (state.stream) {
    process.nextTick(function () {
      callback(state.stream)
    })
    return
  }

  this.on('stream', callback)
}

Handle.prototype.assignSocket = function assignSocket (socket, options) {
  var state = this._spdyState

  state.socket = socket
  state.deceiver = httpDeceiver.create(socket, options)

  function onStreamError (err) {
    state.socket.emit('error', err)
  }

  this.getStream(function (stream) {
    stream.on('error', onStreamError)
  })
}

Handle.prototype.assignClientRequest = function assignClientRequest (req) {
  var state = this._spdyState
  var oldEnd = req.end
  var oldSend = req._send

  // Catch the headers before request will be sent
  var self = this

  // For old nodes
  if (thing.mode !== 'modern') {
    req.end = function end () {
      this.end = oldEnd

      this._send('')

      return this.end.apply(this, arguments)
    }
  }

  req._send = function send (data) {
    this._headerSent = true

    // for v0.10 and below, otherwise it will set `hot = false` and include
    // headers in first write
    this._header = 'ignore me'

    // To prevent exception
    this.connection = state.socket

    // It is very important to leave this here, otherwise it will be executed
    // on a next tick, after `_send` will perform write
    self.getStream(function (stream) {
      if (!stream.connection._isGoaway(stream.id)) {
        stream.send()
      }
    })

    // We are ready to create stream
    self.emit('needStream')

    // Ensure that the connection is still ok to use
    if (state.stream && state.stream.connection._isGoaway(state.stream.id)) {
      return
    }

    req._send = oldSend

    // Ignore empty writes
    if (req.method === 'GET' && data.length === 0) {
      return
    }

    return req._send.apply(this, arguments)
  }

  // No chunked encoding
  req.useChunkedEncodingByDefault = false

  req.on('finish', function () {
    req.socket.end()
  })
}

Handle.prototype.assignRequest = function assignRequest (req) {
  // Emit trailing headers
  this.getStream(function (stream) {
    stream.on('headers', function (headers) {
      req.emit('trailers', headers)
    })
  })
}

Handle.prototype.assignResponse = function assignResponse (res) {
  var self = this

  res.addTrailers = function addTrailers (headers) {
    self.getStream(function (stream) {
      stream.sendHeaders(headers)
    })
  }
}

Handle.prototype._transformHeaders = function _transformHeaders (kind, headers) {
  var state = this._spdyState

  var res = {}
  var keys = Object.keys(headers)

  if (kind === 'request' && state.options['x-forwarded-for']) {
    var xforwarded = state.stream.connection.getXForwardedFor()
    if (xforwarded !== null) {
      res['x-forwarded-for'] = xforwarded
    }
  }

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i]
    var value = headers[key]

    if (key === ':authority') {
      res.host = value
    }
    if (/^:/.test(key)) {
      continue
    }

    res[key] = value
  }
  return res
}

Handle.prototype.emitRequest = function emitRequest () {
  var state = this._spdyState
  var stream = state.stream

  state.deceiver.emitRequest({
    method: stream.method,
    path: stream.path,
    headers: this._transformHeaders('request', stream.headers)
  })
}

Handle.prototype.emitResponse = function emitResponse (status, headers) {
  var state = this._spdyState

  state.deceiver.emitResponse({
    status: status,
    headers: this._transformHeaders('response', headers)
  })
}
