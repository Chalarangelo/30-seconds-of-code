
/**
 * Module dependencies.
 */

var Transport = require('../transport');
var parser = require('engine.io-parser');
var util = require('util');
var debug = require('debug')('engine:ws');

/**
 * Export the constructor.
 */

module.exports = WebSocket;

/**
 * WebSocket transport
 *
 * @param {http.IncomingMessage}
 * @api public
 */

function WebSocket (req) {
  Transport.call(this, req);
  var self = this;
  this.socket = req.websocket;
  this.socket.on('message', this.onData.bind(this));
  this.socket.once('close', this.onClose.bind(this));
  this.socket.on('error', this.onError.bind(this));
  this.socket.on('headers', onHeaders);
  this.writable = true;
  this.perMessageDeflate = null;

  function onHeaders (headers) {
    self.emit('headers', headers);
  }
}

/**
 * Inherits from Transport.
 */

util.inherits(WebSocket, Transport);

/**
 * Transport name
 *
 * @api public
 */

WebSocket.prototype.name = 'websocket';

/**
 * Advertise upgrade support.
 *
 * @api public
 */

WebSocket.prototype.handlesUpgrades = true;

/**
 * Advertise framing support.
 *
 * @api public
 */

WebSocket.prototype.supportsFraming = true;

/**
 * Processes the incoming data.
 *
 * @param {String} encoded packet
 * @api private
 */

WebSocket.prototype.onData = function (data) {
  debug('received "%s"', data);
  Transport.prototype.onData.call(this, data);
};

/**
 * Writes a packet payload.
 *
 * @param {Array} packets
 * @api private
 */

WebSocket.prototype.send = function (packets) {
  var self = this;

  for (var i = 0; i < packets.length; i++) {
    var packet = packets[i];
    parser.encodePacket(packet, self.supportsBinary, send);
  }

  function send (data) {
    debug('writing "%s"', data);

    // always creates a new object since ws modifies it
    var opts = {};
    if (packet.options) {
      opts.compress = packet.options.compress;
    }

    if (self.perMessageDeflate) {
      var len = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
      if (len < self.perMessageDeflate.threshold) {
        opts.compress = false;
      }
    }

    self.writable = false;
    self.socket.send(data, opts, onEnd);
  }

  function onEnd (err) {
    if (err) return self.onError('write error', err.stack);
    self.writable = true;
    self.emit('drain');
  }
};

/**
 * Closes the transport.
 *
 * @api private
 */

WebSocket.prototype.doClose = function (fn) {
  debug('closing');
  this.socket.close();
  fn && fn();
};
