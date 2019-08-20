'use strict'

var util = require('util')
var transport = require('../spdy-transport')

var debug = {
  server: require('debug')('spdy:connection:server'),
  client: require('debug')('spdy:connection:client')
}
var EventEmitter = require('events').EventEmitter

var Stream = transport.Stream

function Connection (socket, options) {
  EventEmitter.call(this)

  var state = {}
  this._spdyState = state

  // NOTE: There's a big trick here. Connection is used as a `this` argument
  // to the wrapped `connection` event listener.
  // socket end doesn't necessarly mean connection drop
  this.httpAllowHalfOpen = true

  state.timeout = new transport.utils.Timeout(this)

  // Protocol info
  state.protocol = transport.protocol[options.protocol]
  state.version = null
  state.constants = state.protocol.constants
  state.pair = null
  state.isServer = options.isServer

  // Root of priority tree (i.e. stream id = 0)
  state.priorityRoot = new transport.Priority({
    defaultWeight: state.constants.DEFAULT_WEIGHT,
    maxCount: transport.protocol.base.constants.MAX_PRIORITY_STREAMS
  })

  // Defaults
  state.maxStreams = options.maxStreams ||
                     state.constants.MAX_CONCURRENT_STREAMS

  state.autoSpdy31 = options.protocol.name !== 'h2' && options.autoSpdy31
  state.acceptPush = options.acceptPush === undefined
    ? !state.isServer
    : options.acceptPush

  if (options.maxChunk === false) { state.maxChunk = Infinity } else if (options.maxChunk === undefined) { state.maxChunk = transport.protocol.base.constants.DEFAULT_MAX_CHUNK } else {
    state.maxChunk = options.maxChunk
  }

  // Connection-level flow control
  var windowSize = options.windowSize || 1 << 20
  state.window = new transport.Window({
    id: 0,
    isServer: state.isServer,
    recv: {
      size: state.constants.DEFAULT_WINDOW,
      max: state.constants.MAX_INITIAL_WINDOW_SIZE
    },
    send: {
      size: state.constants.DEFAULT_WINDOW,
      max: state.constants.MAX_INITIAL_WINDOW_SIZE
    }
  })

  // It starts with DEFAULT_WINDOW, update must be sent to change it on client
  state.window.recv.setMax(windowSize)

  // Boilerplate for Stream constructor
  state.streamWindow = new transport.Window({
    id: -1,
    isServer: state.isServer,
    recv: {
      size: windowSize,
      max: state.constants.MAX_INITIAL_WINDOW_SIZE
    },
    send: {
      size: state.constants.DEFAULT_WINDOW,
      max: state.constants.MAX_INITIAL_WINDOW_SIZE
    }
  })

  // Various state info
  state.pool = state.protocol.compressionPool.create(options.headerCompression)
  state.counters = {
    push: 0,
    stream: 0
  }

  // Init streams list
  state.stream = {
    map: {},
    count: 0,
    nextId: state.isServer ? 2 : 1,
    lastId: {
      both: 0,
      received: 0
    }
  }
  state.ping = {
    nextId: state.isServer ? 2 : 1,
    map: {}
  }
  state.goaway = false

  // Debug
  state.debug = state.isServer ? debug.server : debug.client

  // X-Forwarded feature
  state.xForward = null

  // Create parser and hole for framer
  state.parser = state.protocol.parser.create({
    // NOTE: needed to distinguish ping from ping ACK in SPDY
    isServer: state.isServer,
    window: state.window
  })
  state.framer = state.protocol.framer.create({
    window: state.window,
    timeout: state.timeout
  })

  // SPDY has PUSH enabled on servers
  if (state.protocol.name === 'spdy') {
    state.framer.enablePush(state.isServer)
  }

  if (!state.isServer) { state.parser.skipPreface() }

  this.socket = socket

  this._init()
}
util.inherits(Connection, EventEmitter)
exports.Connection = Connection

Connection.create = function create (socket, options) {
  return new Connection(socket, options)
}

Connection.prototype._init = function init () {
  var self = this
  var state = this._spdyState
  var pool = state.pool

  // Initialize session window
  state.window.recv.on('drain', function () {
    self._onSessionWindowDrain()
  })

  // Initialize parser
  state.parser.on('data', function (frame) {
    self._handleFrame(frame)
  })
  state.parser.once('version', function (version) {
    self._onVersion(version)
  })

  // Propagate parser errors
  state.parser.on('error', function (err) {
    self._onParserError(err)
  })

  // Propagate framer errors
  state.framer.on('error', function (err) {
    self.emit('error', err)
  })

  this.socket.pipe(state.parser)
  state.framer.pipe(this.socket)

  // Allow high-level api to catch socket errors
  this.socket.on('error', function onSocketError (e) {
    self.emit('error', e)
  })

  this.socket.once('close', function onclose (hadError) {
    var err
    if (hadError) {
      err = new Error('socket hang up')
      err.code = 'ECONNRESET'
    }

    self.destroyStreams(err)
    self.emit('close')

    if (state.pair) {
      pool.put(state.pair)
    }

    state.framer.resume()
  })

  // Reset timeout on close
  this.once('close', function () {
    self.setTimeout(0)
  })

  function _onWindowOverflow () {
    self._onWindowOverflow()
  }

  state.window.recv.on('overflow', _onWindowOverflow)
  state.window.send.on('overflow', _onWindowOverflow)

  // Do not allow half-open connections
  this.socket.allowHalfOpen = false
}

Connection.prototype._onVersion = function _onVersion (version) {
  var state = this._spdyState
  var prev = state.version
  var parser = state.parser
  var framer = state.framer
  var pool = state.pool

  state.version = version
  state.debug('id=0 version=%d', version)

  // Ignore transition to 3.1
  if (!prev) {
    state.pair = pool.get(version)
    parser.setCompression(state.pair)
    framer.setCompression(state.pair)
  }
  framer.setVersion(version)

  if (!state.isServer) {
    framer.prefaceFrame()
    if (state.xForward !== null) {
      framer.xForwardedFor({ host: state.xForward })
    }
  }

  // Send preface+settings frame (once)
  framer.settingsFrame({
    max_header_list_size: state.constants.DEFAULT_MAX_HEADER_LIST_SIZE,
    max_concurrent_streams: state.maxStreams,
    enable_push: state.acceptPush ? 1 : 0,
    initial_window_size: state.window.recv.max
  })

  // Update session window
  if (state.version >= 3.1 || (state.isServer && state.autoSpdy31)) { this._onSessionWindowDrain() }

  this.emit('version', version)
}

Connection.prototype._onParserError = function _onParserError (err) {
  var state = this._spdyState

  // Prevent further errors
  state.parser.kill()

  // Send GOAWAY
  if (err instanceof transport.protocol.base.utils.ProtocolError) {
    this._goaway({
      lastId: state.stream.lastId.both,
      code: err.code,
      extra: err.message,
      send: true
    })
  }

  this.emit('error', err)
}

Connection.prototype._handleFrame = function _handleFrame (frame) {
  var state = this._spdyState

  state.debug('id=0 frame', frame)
  state.timeout.reset()

  // For testing purposes
  this.emit('frame', frame)

  var stream

  // Session window update
  if (frame.type === 'WINDOW_UPDATE' && frame.id === 0) {
    if (state.version < 3.1 && state.autoSpdy31) {
      state.debug('id=0 switch version to 3.1')
      state.version = 3.1
      this.emit('version', 3.1)
    }
    state.window.send.update(frame.delta)
    return
  }

  if (state.isServer && frame.type === 'PUSH_PROMISE') {
    state.debug('id=0 server PUSH_PROMISE')
    this._goaway({
      lastId: state.stream.lastId.both,
      code: 'PROTOCOL_ERROR',
      send: true
    })
    return
  }

  if (!stream && frame.id !== undefined) {
    // Load created one
    stream = state.stream.map[frame.id]

    // Fail if not found
    if (!stream &&
        frame.type !== 'HEADERS' &&
        frame.type !== 'PRIORITY' &&
        frame.type !== 'RST') {
      // Other side should destroy the stream upon receiving GOAWAY
      if (this._isGoaway(frame.id)) { return }

      state.debug('id=0 stream=%d not found', frame.id)
      state.framer.rstFrame({ id: frame.id, code: 'INVALID_STREAM' })
      return
    }
  }

  // Create new stream
  if (!stream && frame.type === 'HEADERS') {
    this._handleHeaders(frame)
    return
  }

  if (stream) {
    stream._handleFrame(frame)
  } else if (frame.type === 'SETTINGS') {
    this._handleSettings(frame.settings)
  } else if (frame.type === 'ACK_SETTINGS') {
    // TODO(indutny): handle it one day
  } else if (frame.type === 'PING') {
    this._handlePing(frame)
  } else if (frame.type === 'GOAWAY') {
    this._handleGoaway(frame)
  } else if (frame.type === 'X_FORWARDED_FOR') {
    // Set X-Forwarded-For only once
    if (state.xForward === null) {
      state.xForward = frame.host
    }
  } else if (frame.type === 'PRIORITY') {
    // TODO(indutny): handle this
  } else {
    state.debug('id=0 unknown frame type: %s', frame.type)
  }
}

Connection.prototype._onWindowOverflow = function _onWindowOverflow () {
  var state = this._spdyState
  state.debug('id=0 window overflow')
  this._goaway({
    lastId: state.stream.lastId.both,
    code: 'FLOW_CONTROL_ERROR',
    send: true
  })
}

Connection.prototype._isGoaway = function _isGoaway (id) {
  var state = this._spdyState
  if (state.goaway !== false && state.goaway < id) { return true }
  return false
}

Connection.prototype._getId = function _getId () {
  var state = this._spdyState

  var id = state.stream.nextId
  state.stream.nextId += 2
  return id
}

Connection.prototype._createStream = function _createStream (uri) {
  var state = this._spdyState
  var id = uri.id
  if (id === undefined) { id = this._getId() }

  var isGoaway = this._isGoaway(id)

  if (uri.push && !state.acceptPush) {
    state.debug('id=0 push disabled promisedId=%d', id)

    // Fatal error
    this._goaway({
      lastId: state.stream.lastId.both,
      code: 'PROTOCOL_ERROR',
      send: true
    })
    isGoaway = true
  }

  var stream = new Stream(this, {
    id: id,
    request: uri.request !== false,
    method: uri.method,
    path: uri.path,
    host: uri.host,
    priority: uri.priority,
    headers: uri.headers,
    parent: uri.parent,
    readable: !isGoaway && uri.readable,
    writable: !isGoaway && uri.writable
  })
  var self = this

  // Just an empty stream for API consistency
  if (isGoaway) {
    return stream
  }

  state.stream.lastId.both = Math.max(state.stream.lastId.both, id)

  state.debug('id=0 add stream=%d', stream.id)
  state.stream.map[stream.id] = stream
  state.stream.count++
  state.counters.stream++
  if (stream.parent !== null) {
    state.counters.push++
  }

  stream.once('close', function () {
    self._removeStream(stream)
  })

  return stream
}

Connection.prototype._handleHeaders = function _handleHeaders (frame) {
  var state = this._spdyState

  // Must be HEADERS frame after stream close
  if (frame.id <= state.stream.lastId.received) { return }

  // Someone is using our ids!
  if ((frame.id + state.stream.nextId) % 2 === 0) {
    state.framer.rstFrame({ id: frame.id, code: 'PROTOCOL_ERROR' })
    return
  }

  var stream = this._createStream({
    id: frame.id,
    request: false,
    method: frame.headers[':method'],
    path: frame.headers[':path'],
    host: frame.headers[':authority'],
    priority: frame.priority,
    headers: frame.headers,
    writable: frame.writable
  })

  // GOAWAY
  if (this._isGoaway(stream.id)) {
    return
  }

  state.stream.lastId.received = Math.max(
    state.stream.lastId.received,
    stream.id
  )

  // TODO(indutny) handle stream limit
  if (!this.emit('stream', stream)) {
    // No listeners was set - abort the stream
    stream.abort()
    return
  }

  // Create fake frame to simulate end of the data
  if (frame.fin) {
    stream._handleFrame({ type: 'FIN', fin: true })
  }

  return stream
}

Connection.prototype._onSessionWindowDrain = function _onSessionWindowDrain () {
  var state = this._spdyState
  if (state.version < 3.1 && !(state.isServer && state.autoSpdy31)) {
    return
  }

  var delta = state.window.recv.getDelta()
  if (delta === 0) {
    return
  }

  state.debug('id=0 session window drain, update by %d', delta)

  state.framer.windowUpdateFrame({
    id: 0,
    delta: delta
  })
  state.window.recv.update(delta)
}

Connection.prototype.start = function start (version) {
  this._spdyState.parser.setVersion(version)
}

// Mostly for testing
Connection.prototype.getVersion = function getVersion () {
  return this._spdyState.version
}

Connection.prototype._handleSettings = function _handleSettings (settings) {
  var state = this._spdyState

  state.framer.ackSettingsFrame()

  this._setDefaultWindow(settings)
  if (settings.max_frame_size) { state.framer.setMaxFrameSize(settings.max_frame_size) }

  // TODO(indutny): handle max_header_list_size
  if (settings.header_table_size) {
    try {
      state.pair.compress.updateTableSize(settings.header_table_size)
    } catch (e) {
      this._goaway({
        lastId: 0,
        code: 'PROTOCOL_ERROR',
        send: true
      })
      return
    }
  }

  // HTTP2 clients needs to enable PUSH streams explicitly
  if (state.protocol.name !== 'spdy') {
    if (settings.enable_push === undefined) {
      state.framer.enablePush(state.isServer)
    } else {
      state.framer.enablePush(settings.enable_push === 1)
    }
  }

  // TODO(indutny): handle max_concurrent_streams
}

Connection.prototype._setDefaultWindow = function _setDefaultWindow (settings) {
  if (settings.initial_window_size === undefined) {
    return
  }

  var state = this._spdyState

  // Update defaults
  var window = state.streamWindow
  window.send.setMax(settings.initial_window_size)

  // Update existing streams
  Object.keys(state.stream.map).forEach(function (id) {
    var stream = state.stream.map[id]
    var window = stream._spdyState.window

    window.send.updateMax(settings.initial_window_size)
  })
}

Connection.prototype._handlePing = function handlePing (frame) {
  var self = this
  var state = this._spdyState

  // Handle incoming PING
  if (!frame.ack) {
    state.framer.pingFrame({
      opaque: frame.opaque,
      ack: true
    })

    self.emit('ping', frame.opaque)
    return
  }

  // Handle reply PING
  var hex = frame.opaque.toString('hex')
  if (!state.ping.map[hex]) {
    return
  }
  var ping = state.ping.map[hex]
  delete state.ping.map[hex]

  if (ping.cb) {
    ping.cb(null)
  }
}

Connection.prototype._handleGoaway = function handleGoaway (frame) {
  this._goaway({
    lastId: frame.lastId,
    code: frame.code,
    send: false
  })
}

Connection.prototype.ping = function ping (callback) {
  var state = this._spdyState

  // HTTP2 is using 8-byte opaque
  var opaque = Buffer.alloc(state.constants.PING_OPAQUE_SIZE)
  opaque.fill(0)
  opaque.writeUInt32BE(state.ping.nextId, opaque.length - 4)
  state.ping.nextId += 2

  state.ping.map[opaque.toString('hex')] = { cb: callback }
  state.framer.pingFrame({
    opaque: opaque,
    ack: false
  })
}

Connection.prototype.getCounter = function getCounter (name) {
  return this._spdyState.counters[name]
}

Connection.prototype.reserveStream = function reserveStream (uri, callback) {
  var stream = this._createStream(uri)

  // GOAWAY
  if (this._isGoaway(stream.id)) {
    var err = new Error('Can\'t send request after GOAWAY')
    process.nextTick(function () {
      if (callback) { callback(err) } else {
        stream.emit('error', err)
      }
    })
    return stream
  }

  if (callback) {
    process.nextTick(function () {
      callback(null, stream)
    })
  }

  return stream
}

Connection.prototype.request = function request (uri, callback) {
  var stream = this.reserveStream(uri, function (err) {
    if (err) {
      if (callback) {
        callback(err)
      } else {
        stream.emit('error', err)
      }
      return
    }

    if (stream._wasSent()) {
      if (callback) {
        callback(null, stream)
      }
      return
    }

    stream.send(function (err) {
      if (err) {
        if (callback) { return callback(err) } else { return stream.emit('error', err) }
      }

      if (callback) {
        callback(null, stream)
      }
    })
  })

  return stream
}

Connection.prototype._removeStream = function _removeStream (stream) {
  var state = this._spdyState

  state.debug('id=0 remove stream=%d', stream.id)
  delete state.stream.map[stream.id]
  state.stream.count--

  if (state.stream.count === 0) {
    this.emit('_streamDrain')
  }
}

Connection.prototype._goaway = function _goaway (params) {
  var state = this._spdyState
  var self = this

  state.goaway = params.lastId
  state.debug('id=0 goaway from=%d', state.goaway)

  Object.keys(state.stream.map).forEach(function (id) {
    var stream = state.stream.map[id]

    // Abort every stream started after GOAWAY
    if (stream.id <= params.lastId) {
      return
    }

    stream.abort()
    stream.emit('error', new Error('New stream after GOAWAY'))
  })

  function finish () {
    // Destroy socket if there are no streams
    if (state.stream.count === 0 || params.code !== 'OK') {
      // No further frames should be processed
      state.parser.kill()

      process.nextTick(function () {
        var err = new Error('Fatal error: ' + params.code)
        self._onStreamDrain(err)
      })
      return
    }

    self.on('_streamDrain', self._onStreamDrain)
  }

  if (params.send) {
    // Make sure that GOAWAY frame is sent before dumping framer
    state.framer.goawayFrame({
      lastId: params.lastId,
      code: params.code,
      extra: params.extra
    }, finish)
  } else {
    finish()
  }
}

Connection.prototype._onStreamDrain = function _onStreamDrain (error) {
  var state = this._spdyState

  state.debug('id=0 _onStreamDrain')

  state.framer.dump()
  state.framer.unpipe(this.socket)
  state.framer.resume()

  if (this.socket.destroySoon) {
    this.socket.destroySoon()
  }
  this.emit('close', error)
}

Connection.prototype.end = function end (callback) {
  var state = this._spdyState

  if (callback) {
    this.once('close', callback)
  }
  this._goaway({
    lastId: state.stream.lastId.both,
    code: 'OK',
    send: true
  })
}

Connection.prototype.destroyStreams = function destroyStreams (err) {
  var state = this._spdyState
  Object.keys(state.stream.map).forEach(function (id) {
    var stream = state.stream.map[id]

    stream.destroy()
    if (err) {
      stream.emit('error', err)
    }
  })
}

Connection.prototype.isServer = function isServer () {
  return this._spdyState.isServer
}

Connection.prototype.getXForwardedFor = function getXForwardFor () {
  return this._spdyState.xForward
}

Connection.prototype.sendXForwardedFor = function sendXForwardedFor (host) {
  var state = this._spdyState
  if (state.version !== null) {
    state.framer.xForwardedFor({ host: host })
  } else {
    state.xForward = host
  }
}

Connection.prototype.pushPromise = function pushPromise (parent, uri, callback) {
  var state = this._spdyState

  var stream = this._createStream({
    request: false,
    parent: parent,
    method: uri.method,
    path: uri.path,
    host: uri.host,
    priority: uri.priority,
    headers: uri.headers,
    readable: false
  })

  var err

  // TODO(indutny): deduplicate this logic somehow
  if (this._isGoaway(stream.id)) {
    err = new Error('Can\'t send PUSH_PROMISE after GOAWAY')

    process.nextTick(function () {
      if (callback) {
        callback(err)
      } else {
        stream.emit('error', err)
      }
    })
    return stream
  }

  if (uri.push && !state.acceptPush) {
    err = new Error(
      'Can\'t send PUSH_PROMISE, other side won\'t accept it')
    process.nextTick(function () {
      if (callback) { callback(err) } else {
        stream.emit('error', err)
      }
    })
    return stream
  }

  stream._sendPush(uri.status, uri.response, function (err) {
    if (!callback) {
      if (err) {
        stream.emit('error', err)
      }
      return
    }

    if (err) { return callback(err) }
    callback(null, stream)
  })

  return stream
}

Connection.prototype.setTimeout = function setTimeout (delay, callback) {
  var state = this._spdyState

  state.timeout.set(delay, callback)
}
