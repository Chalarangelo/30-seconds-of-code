'use strict'

// NOTE: Mostly copy paste from node
exports.writeHead = function writeHead (statusCode, reason, obj) {
  var headers

  if (typeof reason === 'string') {
    // writeHead(statusCode, reasonPhrase[, headers])
    this.statusMessage = reason
  } else {
    // writeHead(statusCode[, headers])
    this.statusMessage =
      this.statusMessage || 'unknown'
    obj = reason
  }
  this.statusCode = statusCode

  if (this._headers) {
    // Slow-case: when progressive API and header fields are passed.
    if (obj) {
      var keys = Object.keys(obj)
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i]
        if (k) this.setHeader(k, obj[k])
      }
    }
    // only progressive api is used
    headers = this._renderHeaders()
  } else {
    // only writeHead() called
    headers = obj
  }

  if (statusCode === 204 || statusCode === 304 ||
      (statusCode >= 100 && statusCode <= 199)) {
    // RFC 2616, 10.2.5:
    // The 204 response MUST NOT include a message-body, and thus is always
    // terminated by the first empty line after the header fields.
    // RFC 2616, 10.3.5:
    // The 304 response MUST NOT contain a message-body, and thus is always
    // terminated by the first empty line after the header fields.
    // RFC 2616, 10.1 Informational 1xx:
    // This class of status code indicates a provisional response,
    // consisting only of the Status-Line and optional headers, and is
    // terminated by an empty line.
    this._hasBody = false
  }

  // don't keep alive connections where the client expects 100 Continue
  // but we sent a final status; they may put extra bytes on the wire.
  if (this._expect_continue && !this._sent100) {
    this.shouldKeepAlive = false
  }

  // Implicit headers sent!
  this._header = true
  this._headerSent = true

  if (this.socket._handle) { this.socket._handle._spdyState.stream.respond(this.statusCode, headers) }
}

exports.end = function end (data, encoding, callback) {
  if (!this._headerSent) {
    this.writeHead(this.statusCode)
  }

  if (!this.socket._handle) {
    return
  }

  // Compatibility with Node.js core
  this.finished = true

  var self = this
  var handle = this.socket._handle
  handle._spdyState.ending = true
  this.socket.end(data, encoding, function () {
    self.constructor.prototype.end.call(self, '', 'utf8', callback)
  })
}

exports.push = function push (path, headers, callback) {
  var frame = {
    path: path,
    method: headers.method ? headers.method.toString() : 'GET',
    status: headers.status ? parseInt(headers.status, 10) : 200,
    host: this._req.headers.host,
    headers: headers.request,
    response: headers.response
  }

  var stream = this.spdyStream
  return stream.pushPromise(frame, callback)
}

exports.writeContinue = function writeContinue (callback) {
  if (this.socket._handle) {
    this.socket._handle._spdyState.stream.respond(100, {}, callback)
  }
}
