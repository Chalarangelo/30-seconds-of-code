'use strict'

var transport = require('../../../spdy-transport')
var base = transport.protocol.base

exports.PREFACE_SIZE = 24
exports.PREFACE = 'PRI * HTTP/2.0\r\n\r\nSM\r\n\r\n'
exports.PREFACE_BUFFER = Buffer.from(exports.PREFACE)

exports.PING_OPAQUE_SIZE = 8

exports.FRAME_HEADER_SIZE = 9
exports.INITIAL_MAX_FRAME_SIZE = 16384
exports.ABSOLUTE_MAX_FRAME_SIZE = 16777215
exports.HEADER_TABLE_SIZE = 4096
exports.DEFAULT_MAX_HEADER_LIST_SIZE = 80 * 1024 // as in http_parser
exports.MAX_INITIAL_WINDOW_SIZE = 2147483647

exports.DEFAULT_WEIGHT = 16

exports.MAX_CONCURRENT_STREAMS = Infinity

exports.frameType = {
  DATA: 0,
  HEADERS: 1,
  PRIORITY: 2,
  RST_STREAM: 3,
  SETTINGS: 4,
  PUSH_PROMISE: 5,
  PING: 6,
  GOAWAY: 7,
  WINDOW_UPDATE: 8,
  CONTINUATION: 9,

  // Custom
  X_FORWARDED_FOR: 0xde
}

exports.flags = {
  ACK: 0x01, // SETTINGS-only
  END_STREAM: 0x01,
  END_HEADERS: 0x04,
  PADDED: 0x08,
  PRIORITY: 0x20
}

exports.settings = {
  SETTINGS_HEADER_TABLE_SIZE: 0x01,
  SETTINGS_ENABLE_PUSH: 0x02,
  SETTINGS_MAX_CONCURRENT_STREAMS: 0x03,
  SETTINGS_INITIAL_WINDOW_SIZE: 0x04,
  SETTINGS_MAX_FRAME_SIZE: 0x05,
  SETTINGS_MAX_HEADER_LIST_SIZE: 0x06
}

exports.settingsIndex = [
  null,
  'header_table_size',
  'enable_push',
  'max_concurrent_streams',
  'initial_window_size',
  'max_frame_size',
  'max_header_list_size'
]

exports.error = {
  OK: 0,
  NO_ERROR: 0,

  PROTOCOL_ERROR: 1,
  INTERNAL_ERROR: 2,
  FLOW_CONTROL_ERROR: 3,
  SETTINGS_TIMEOUT: 4,

  STREAM_CLOSED: 5,
  INVALID_STREAM: 5,

  FRAME_SIZE_ERROR: 6,
  REFUSED_STREAM: 7,
  CANCEL: 8,
  COMPRESSION_ERROR: 9,
  CONNECT_ERROR: 10,
  ENHANCE_YOUR_CALM: 11,
  INADEQUATE_SECURITY: 12,
  HTTP_1_1_REQUIRED: 13
}
exports.errorByCode = base.utils.reverse(exports.error)

exports.DEFAULT_WINDOW = 64 * 1024 - 1

exports.goaway = exports.error
exports.goawayByCode = Object.assign({}, exports.errorByCode)
exports.goawayByCode[0] = 'OK'
