'use strict'

var transport = exports

// Exports utils
transport.utils = require('./spdy-transport/utils')

// Export parser&framer
transport.protocol = {}
transport.protocol.base = require('./spdy-transport/protocol/base')
transport.protocol.spdy = require('./spdy-transport/protocol/spdy')
transport.protocol.http2 = require('./spdy-transport/protocol/http2')

// Window
transport.Window = require('./spdy-transport/window')

// Priority Tree
transport.Priority = require('./spdy-transport/priority')

// Export Connection and Stream
transport.Stream = require('./spdy-transport/stream').Stream
transport.Connection = require('./spdy-transport/connection').Connection

// Just for `transport.connection.create()`
transport.connection = transport.Connection
