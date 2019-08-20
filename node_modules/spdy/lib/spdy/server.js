'use strict'

var assert = require('assert')
var https = require('https')
var http = require('http')
var tls = require('tls')
var net = require('net')
var util = require('util')
var selectHose = require('select-hose')
var transport = require('spdy-transport')
var debug = require('debug')('spdy:server')
var EventEmitter = require('events').EventEmitter

// Node.js 0.8, 0.10 and 0.12 support
Object.assign = process.versions.modules >= 46
  ? Object.assign // eslint-disable-next-line
  : util._extend

var spdy = require('../spdy')

var proto = {}

function instantiate (base) {
  function Server (options, handler) {
    this._init(base, options, handler)
  }
  util.inherits(Server, base)

  Server.create = function create (options, handler) {
    return new Server(options, handler)
  }

  Object.keys(proto).forEach(function (key) {
    Server.prototype[key] = proto[key]
  })

  return Server
}

proto._init = function _init (base, options, handler) {
  var state = {}
  this._spdyState = state

  state.options = options.spdy || {}

  var protocols = state.options.protocols || [
    'h2',
    'spdy/3.1', 'spdy/3', 'spdy/2',
    'http/1.1', 'http/1.0'
  ]

  var actualOptions = Object.assign({
    NPNProtocols: protocols,

    // Future-proof
    ALPNProtocols: protocols
  }, options)

  state.secure = this instanceof tls.Server

  if (state.secure) {
    base.call(this, actualOptions)
  } else {
    base.call(this)
  }

  // Support HEADERS+FIN
  this.httpAllowHalfOpen = true

  var event = state.secure ? 'secureConnection' : 'connection'

  state.listeners = this.listeners(event).slice()
  assert(state.listeners.length > 0, 'Server does not have default listeners')
  this.removeAllListeners(event)

  if (state.options.plain) {
    this.on(event, this._onPlainConnection)
  } else { this.on(event, this._onConnection) }

  if (handler) {
    this.on('request', handler)
  }

  debug('server init secure=%d', state.secure)
}

proto._onConnection = function _onConnection (socket) {
  var state = this._spdyState

  var protocol
  if (state.secure) {
    protocol = socket.npnProtocol || socket.alpnProtocol
  }

  this._handleConnection(socket, protocol)
}

proto._handleConnection = function _handleConnection (socket, protocol) {
  var state = this._spdyState

  if (!protocol) {
    protocol = state.options.protocol
  }

  debug('incoming socket protocol=%j', protocol)

  // No way we can do anything with the socket
  if (!protocol || protocol === 'http/1.1' || protocol === 'http/1.0') {
    debug('to default handler it goes')
    return this._invokeDefault(socket)
  }

  socket.setNoDelay(true)

  var connection = transport.connection.create(socket, Object.assign({
    protocol: /spdy/.test(protocol) ? 'spdy' : 'http2',
    isServer: true
  }, state.options.connection || {}))

  // Set version when we are certain
  if (protocol === 'http2') { connection.start(4) } else if (protocol === 'spdy/3.1') {
    connection.start(3.1)
  } else if (protocol === 'spdy/3') { connection.start(3) } else if (protocol === 'spdy/2') {
    connection.start(2)
  }

  connection.on('error', function () {
    socket.destroy()
  })

  var self = this
  connection.on('stream', function (stream) {
    self._onStream(stream)
  })
}

// HTTP2 preface
var PREFACE = 'PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n'
var PREFACE_BUFFER = Buffer.from(PREFACE)

function hoseFilter (data, callback) {
  if (data.length < 1) {
    return callback(null, null)
  }

  // SPDY!
  if (data[0] === 0x80) { return callback(null, 'spdy') }

  var avail = Math.min(data.length, PREFACE_BUFFER.length)
  for (var i = 0; i < avail; i++) {
    if (data[i] !== PREFACE_BUFFER[i]) { return callback(null, 'http/1.1') }
  }

  // Not enough bytes to be sure about HTTP2
  if (avail !== PREFACE_BUFFER.length) { return callback(null, null) }

  return callback(null, 'h2')
}

proto._onPlainConnection = function _onPlainConnection (socket) {
  var hose = selectHose.create(socket, {}, hoseFilter)

  var self = this
  hose.on('select', function (protocol, socket) {
    self._handleConnection(socket, protocol)
  })

  hose.on('error', function (err) {
    debug('hose error %j', err.message)
    socket.destroy()
  })
}

proto._invokeDefault = function _invokeDefault (socket) {
  var state = this._spdyState

  for (var i = 0; i < state.listeners.length; i++) { state.listeners[i].call(this, socket) }
}

proto._onStream = function _onStream (stream) {
  var state = this._spdyState

  var handle = spdy.handle.create(this._spdyState.options, stream)

  var socketOptions = {
    handle: handle,
    allowHalfOpen: true
  }

  var socket
  if (state.secure) {
    socket = new spdy.Socket(stream.connection.socket, socketOptions)
  } else {
    socket = new net.Socket(socketOptions)
  }

  // This is needed because the `error` listener, added by the default
  // `connection` listener, no longer has bound arguments. It relies instead
  // on the `server` property of the socket. See https://github.com/nodejs/node/pull/11926
  // for more details.
  // This is only done for Node.js >= 4 in order to not break compatibility
  // with older versions of the platform.
  if (process.versions.modules >= 46) { socket.server = this }

  handle.assignSocket(socket)

  // For v0.8
  socket.readable = true
  socket.writable = true

  this._invokeDefault(socket)

  // For v0.8, 0.10 and 0.12
  if (process.versions.modules < 46) {
    // eslint-disable-next-line
    this.listenerCount = EventEmitter.listenerCount.bind(this)
  }

  // Add lazy `checkContinue` listener, otherwise `res.writeContinue` will be
  // called before the response object was patched by us.
  if (stream.headers.expect !== undefined &&
      /100-continue/i.test(stream.headers.expect) &&
      this.listenerCount('checkContinue') === 0) {
    this.once('checkContinue', function (req, res) {
      res.writeContinue()

      this.emit('request', req, res)
    })
  }

  handle.emitRequest()
}

proto.emit = function emit (event, req, res) {
  if (event !== 'request' && event !== 'checkContinue') {
    return EventEmitter.prototype.emit.apply(this, arguments)
  }

  if (!(req.socket._handle instanceof spdy.handle)) {
    debug('not spdy req/res')
    req.isSpdy = false
    req.spdyVersion = 1
    res.isSpdy = false
    res.spdyVersion = 1
    return EventEmitter.prototype.emit.apply(this, arguments)
  }

  var handle = req.connection._handle

  req.isSpdy = true
  req.spdyVersion = handle.getStream().connection.getVersion()
  res.isSpdy = true
  res.spdyVersion = req.spdyVersion
  req.spdyStream = handle.getStream()

  debug('override req/res')
  res.writeHead = spdy.response.writeHead
  res.end = spdy.response.end
  res.push = spdy.response.push
  res.writeContinue = spdy.response.writeContinue
  res.spdyStream = handle.getStream()

  res._req = req

  handle.assignRequest(req)
  handle.assignResponse(res)

  return EventEmitter.prototype.emit.apply(this, arguments)
}

exports.Server = instantiate(https.Server)
exports.PlainServer = instantiate(http.Server)

exports.create = function create (base, options, handler) {
  if (typeof base === 'object') {
    handler = options
    options = base
    base = null
  }

  if (base) {
    return instantiate(base).create(options, handler)
  }

  if (options.spdy && options.spdy.plain) { return exports.PlainServer.create(options, handler) } else {
    return exports.Server.create(options, handler)
  }
}
