'use strict'

var assert = require('assert')
var http = require('http')
var https = require('https')
var net = require('net')
var util = require('util')
var transport = require('spdy-transport')
var debug = require('debug')('spdy:client')

// Node.js 0.10 and 0.12 support
Object.assign = process.versions.modules >= 46
  ? Object.assign // eslint-disable-next-line
  : util._extend

var EventEmitter = require('events').EventEmitter

var spdy = require('../spdy')

var mode = /^v0\.8\./.test(process.version)
  ? 'rusty'
  : /^v0\.(9|10)\./.test(process.version)
    ? 'old'
    : /^v0\.12\./.test(process.version)
      ? 'normal'
      : 'modern'

var proto = {}

function instantiate (base) {
  function Agent (options) {
    this._init(base, options)
  }
  util.inherits(Agent, base)

  Agent.create = function create (options) {
    return new Agent(options)
  }

  Object.keys(proto).forEach(function (key) {
    Agent.prototype[key] = proto[key]
  })

  return Agent
}

proto._init = function _init (base, options) {
  base.call(this, options)

  var state = {}
  this._spdyState = state

  state.host = options.host
  state.options = options.spdy || {}
  state.secure = this instanceof https.Agent
  state.fallback = false
  state.createSocket = this._getCreateSocket()
  state.socket = null
  state.connection = null

  // No chunked encoding
  this.keepAlive = false

  var self = this
  this._connect(options, function (err, connection) {
    if (err) {
      return self.emit('error', err)
    }

    state.connection = connection
    self.emit('_connect')
  })
}

proto._getCreateSocket = function _getCreateSocket () {
  // Find super's `createSocket` method
  var createSocket
  var cons = this.constructor.super_
  do {
    createSocket = cons.prototype.createSocket

    if (cons.super_ === EventEmitter || !cons.super_) {
      break
    }
    cons = cons.super_
  } while (!createSocket)
  if (!createSocket) {
    createSocket = http.Agent.prototype.createSocket
  }

  assert(createSocket, '.createSocket() method not found')

  return createSocket
}

proto._connect = function _connect (options, callback) {
  var self = this
  var state = this._spdyState

  var protocols = state.options.protocols || [
    'h2',
    'spdy/3.1', 'spdy/3', 'spdy/2',
    'http/1.1', 'http/1.0'
  ]

  // TODO(indutny): reconnect automatically?
  var socket = this.createConnection(Object.assign({
    NPNProtocols: protocols,
    ALPNProtocols: protocols,
    servername: options.servername || options.host
  }, options))
  state.socket = socket

  socket.setNoDelay(true)

  function onError (err) {
    return callback(err)
  }
  socket.on('error', onError)

  socket.on(state.secure ? 'secureConnect' : 'connect', function () {
    socket.removeListener('error', onError)

    var protocol
    if (state.secure) {
      protocol = socket.npnProtocol ||
                 socket.alpnProtocol ||
                 state.options.protocol
    } else {
      protocol = state.options.protocol
    }

    // HTTP server - kill socket and switch to the fallback mode
    if (!protocol || protocol === 'http/1.1' || protocol === 'http/1.0') {
      debug('activating fallback')
      socket.destroy()
      state.fallback = true
      return
    }

    debug('connected protocol=%j', protocol)
    var connection = transport.connection.create(socket, Object.assign({
      protocol: /spdy/.test(protocol) ? 'spdy' : 'http2',
      isServer: false
    }, state.options.connection || {}))

    // Pass connection level errors are passed to the agent.
    connection.on('error', function (err) {
      self.emit('error', err)
    })

    // Set version when we are certain
    if (protocol === 'h2') {
      connection.start(4)
    } else if (protocol === 'spdy/3.1') {
      connection.start(3.1)
    } else if (protocol === 'spdy/3') {
      connection.start(3)
    } else if (protocol === 'spdy/2') {
      connection.start(2)
    } else {
      socket.destroy()
      callback(new Error('Unexpected protocol: ' + protocol))
      return
    }

    if (state.options['x-forwarded-for'] !== undefined) {
      connection.sendXForwardedFor(state.options['x-forwarded-for'])
    }

    callback(null, connection)
  })
}

proto._createSocket = function _createSocket (req, options, callback) {
  var state = this._spdyState
  if (state.fallback) { return state.createSocket(req, options) }

  var handle = spdy.handle.create(null, null, state.socket)

  var socketOptions = {
    handle: handle,
    allowHalfOpen: true
  }

  var socket
  if (state.secure) {
    socket = new spdy.Socket(state.socket, socketOptions)
  } else {
    socket = new net.Socket(socketOptions)
  }

  handle.assignSocket(socket)
  handle.assignClientRequest(req)

  // Create stream only once `req.end()` is called
  var self = this
  handle.once('needStream', function () {
    if (state.connection === null) {
      self.once('_connect', function () {
        handle.setStream(self._createStream(req, handle))
      })
    } else {
      handle.setStream(self._createStream(req, handle))
    }
  })

  // Yes, it is in reverse
  req.on('response', function (res) {
    handle.assignRequest(res)
  })
  handle.assignResponse(req)

  // Handle PUSH
  req.addListener('newListener', spdy.request.onNewListener)

  // For v0.8
  socket.readable = true
  socket.writable = true

  if (callback) {
    return callback(null, socket)
  }

  return socket
}

if (mode === 'modern' || mode === 'normal') {
  proto.createSocket = proto._createSocket
} else {
  proto.createSocket = function createSocket (name, host, port, addr, req) {
    var state = this._spdyState
    if (state.fallback) {
      return state.createSocket(name, host, port, addr, req)
    }

    return this._createSocket(req, {
      host: host,
      port: port
    })
  }
}

proto._createStream = function _createStream (req, handle) {
  var state = this._spdyState

  var self = this
  return state.connection.reserveStream({
    method: req.method,
    path: req.path,
    headers: req._headers,
    host: state.host
  }, function (err, stream) {
    if (err) {
      return self.emit('error', err)
    }

    stream.on('response', function (status, headers) {
      handle.emitResponse(status, headers)
    })
  })
}

// Public APIs

proto.close = function close (callback) {
  var state = this._spdyState

  if (state.connection === null) {
    this.once('_connect', function () {
      this.close(callback)
    })
    return
  }

  state.connection.end(callback)
}

exports.Agent = instantiate(https.Agent)
exports.PlainAgent = instantiate(http.Agent)

exports.create = function create (base, options) {
  if (typeof base === 'object') {
    options = base
    base = null
  }

  if (base) {
    return instantiate(base).create(options)
  }

  if (options.spdy && options.spdy.plain) {
    return exports.PlainAgent.create(options)
  } else { return exports.Agent.create(options) }
}
