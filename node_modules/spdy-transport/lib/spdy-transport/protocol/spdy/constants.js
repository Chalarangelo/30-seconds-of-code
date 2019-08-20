'use strict'

var transport = require('../../../spdy-transport')
var base = transport.protocol.base

exports.FRAME_HEADER_SIZE = 8

exports.PING_OPAQUE_SIZE = 4

exports.MAX_CONCURRENT_STREAMS = Infinity
exports.DEFAULT_MAX_HEADER_LIST_SIZE = Infinity

exports.DEFAULT_WEIGHT = 16

exports.frameType = {
  SYN_STREAM: 1,
  SYN_REPLY: 2,
  RST_STREAM: 3,
  SETTINGS: 4,
  PING: 6,
  GOAWAY: 7,
  HEADERS: 8,
  WINDOW_UPDATE: 9,

  // Custom
  X_FORWARDED_FOR: 0xf000
}

exports.flags = {
  FLAG_FIN: 0x01,
  FLAG_COMPRESSED: 0x02,
  FLAG_UNIDIRECTIONAL: 0x02
}

exports.error = {
  PROTOCOL_ERROR: 1,
  INVALID_STREAM: 2,
  REFUSED_STREAM: 3,
  UNSUPPORTED_VERSION: 4,
  CANCEL: 5,
  INTERNAL_ERROR: 6,
  FLOW_CONTROL_ERROR: 7,
  STREAM_IN_USE: 8,
  // STREAM_ALREADY_CLOSED: 9
  STREAM_CLOSED: 9,
  INVALID_CREDENTIALS: 10,
  FRAME_TOO_LARGE: 11
}
exports.errorByCode = base.utils.reverse(exports.error)

exports.settings = {
  FLAG_SETTINGS_PERSIST_VALUE: 1,
  FLAG_SETTINGS_PERSISTED: 2,

  SETTINGS_UPLOAD_BANDWIDTH: 1,
  SETTINGS_DOWNLOAD_BANDWIDTH: 2,
  SETTINGS_ROUND_TRIP_TIME: 3,
  SETTINGS_MAX_CONCURRENT_STREAMS: 4,
  SETTINGS_CURRENT_CWND: 5,
  SETTINGS_DOWNLOAD_RETRANS_RATE: 6,
  SETTINGS_INITIAL_WINDOW_SIZE: 7,
  SETTINGS_CLIENT_CERTIFICATE_VECTOR_SIZE: 8
}

exports.settingsIndex = [
  null,

  'upload_bandwidth',
  'download_bandwidth',
  'round_trip_time',
  'max_concurrent_streams',
  'current_cwnd',
  'download_retrans_rate',
  'initial_window_size',
  'client_certificate_vector_size'
]

exports.DEFAULT_WINDOW = 64 * 1024
exports.MAX_INITIAL_WINDOW_SIZE = 2147483647

exports.goaway = {
  OK: 0,
  PROTOCOL_ERROR: 1,
  INTERNAL_ERROR: 2
}
exports.goawayByCode = base.utils.reverse(exports.goaway)

exports.statusReason = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing', // RFC 2518, obsoleted by RFC 4918
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  207: 'Multi-Status', // RFC 4918
  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Moved Temporarily',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect', // RFC 7238
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Time-out',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Large',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I\'m a teapot', // RFC 2324
  422: 'Unprocessable Entity', // RFC 4918
  423: 'Locked', // RFC 4918
  424: 'Failed Dependency', // RFC 4918
  425: 'Unordered Collection', // RFC 4918
  426: 'Upgrade Required', // RFC 2817
  428: 'Precondition Required', // RFC 6585
  429: 'Too Many Requests', // RFC 6585
  431: 'Request Header Fields Too Large', // RFC 6585
  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Time-out',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates', // RFC 2295
  507: 'Insufficient Storage', // RFC 4918
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended', // RFC 2774
  511: 'Network Authentication Required' // RFC 6585
}
