'use strict'

var util = require('util')
var net = require('net')

function Socket (parent, options) {
  net.Socket.call(this, options)

  var state = {}

  this._spdyState = state

  state.parent = parent

  this.servername = parent.servername
  this.npnProtocol = parent.npnProtocol
  this.alpnProtocol = parent.alpnProtocol
  this.authorized = parent.authorized
  this.authorizationError = parent.authorizationError
  this.encrypted = true
  this.allowHalfOpen = true
}

util.inherits(Socket, net.Socket)

module.exports = Socket

var methods = [
  'renegotiate', 'setMaxSendFragment', 'getTLSTicket', 'setServername',
  'setSession', 'getPeerCertificate', 'getSession', 'isSessionReused',
  'getCipher', 'getEphemeralKeyInfo'
]

methods.forEach(function (method) {
  Socket.prototype[method] = function methodWrap () {
    var parent = this._spdyState.parent
    return parent[method].apply(parent, arguments)
  }
})
