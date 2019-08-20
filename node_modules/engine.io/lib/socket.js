/**
 * Module dependencies.
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');
var debug = require('debug')('engine:socket');

/**
 * Module exports.
 */

module.exports = Socket;

/**
 * Client class (abstract).
 *
 * @api private
 */

function Socket (id, server, transport, req) {
  this.id = id;
  this.server = server;
  this.upgrading = false;
  this.upgraded = false;
  this.readyState = 'opening';
  this.writeBuffer = [];
  this.packetsFn = [];
  this.sentCallbackFn = [];
  this.cleanupFn = [];
  this.request = req;

  // Cache IP since it might not be in the req later
  if (req.websocket && req.websocket._socket) {
    this.remoteAddress = req.websocket._socket.remoteAddress;
  } else {
    this.remoteAddress = req.connection.remoteAddress;
  }

  this.checkIntervalTimer = null;
  this.upgradeTimeoutTimer = null;
  this.pingTimeoutTimer = null;

  this.setTransport(transport);
  this.onOpen();
}

/**
 * Inherits from EventEmitter.
 */

util.inherits(Socket, EventEmitter);

/**
 * Called upon transport considered open.
 *
 * @api private
 */

Socket.prototype.onOpen = function () {
  this.readyState = 'open';

  // sends an `open` packet
  this.transport.sid = this.id;
  this.sendPacket('open', JSON.stringify({
    sid: this.id,
    upgrades: this.getAvailableUpgrades(),
    pingInterval: this.server.pingInterval,
    pingTimeout: this.server.pingTimeout
  }));

  if (this.server.initialPacket) {
    this.sendPacket('message', this.server.initialPacket);
  }

  this.emit('open');
  this.setPingTimeout();
};

/**
 * Called upon transport packet.
 *
 * @param {Object} packet
 * @api private
 */

Socket.prototype.onPacket = function (packet) {
  if ('open' === this.readyState) {
    // export packet event
    debug('packet');
    this.emit('packet', packet);

    // Reset ping timeout on any packet, incoming data is a good sign of
    // other side's liveness
    this.setPingTimeout();

    switch (packet.type) {
      case 'ping':
        debug('got ping');
        this.sendPacket('pong');
        this.emit('heartbeat');
        break;

      case 'error':
        this.onClose('parse error');
        break;

      case 'message':
        this.emit('data', packet.data);
        this.emit('message', packet.data);
        break;
    }
  } else {
    debug('packet received with closed socket');
  }
};

/**
 * Called upon transport error.
 *
 * @param {Error} error object
 * @api private
 */

Socket.prototype.onError = function (err) {
  debug('transport error');
  this.onClose('transport error', err);
};

/**
 * Sets and resets ping timeout timer based on client pings.
 *
 * @api private
 */

Socket.prototype.setPingTimeout = function () {
  var self = this;
  clearTimeout(self.pingTimeoutTimer);
  self.pingTimeoutTimer = setTimeout(function () {
    self.onClose('ping timeout');
  }, self.server.pingInterval + self.server.pingTimeout);
};

/**
 * Attaches handlers for the given transport.
 *
 * @param {Transport} transport
 * @api private
 */

Socket.prototype.setTransport = function (transport) {
  var onError = this.onError.bind(this);
  var onPacket = this.onPacket.bind(this);
  var flush = this.flush.bind(this);
  var onClose = this.onClose.bind(this, 'transport close');

  this.transport = transport;
  this.transport.once('error', onError);
  this.transport.on('packet', onPacket);
  this.transport.on('drain', flush);
  this.transport.once('close', onClose);
  // this function will manage packet events (also message callbacks)
  this.setupSendCallback();

  this.cleanupFn.push(function () {
    transport.removeListener('error', onError);
    transport.removeListener('packet', onPacket);
    transport.removeListener('drain', flush);
    transport.removeListener('close', onClose);
  });
};

/**
 * Upgrades socket to the given transport
 *
 * @param {Transport} transport
 * @api private
 */

Socket.prototype.maybeUpgrade = function (transport) {
  debug('might upgrade socket transport from "%s" to "%s"'
    , this.transport.name, transport.name);

  this.upgrading = true;

  var self = this;

  // set transport upgrade timer
  self.upgradeTimeoutTimer = setTimeout(function () {
    debug('client did not complete upgrade - closing transport');
    cleanup();
    if ('open' === transport.readyState) {
      transport.close();
    }
  }, this.server.upgradeTimeout);

  function onPacket (packet) {
    if ('ping' === packet.type && 'probe' === packet.data) {
      transport.send([{ type: 'pong', data: 'probe' }]);
      self.emit('upgrading', transport);
      clearInterval(self.checkIntervalTimer);
      self.checkIntervalTimer = setInterval(check, 100);
    } else if ('upgrade' === packet.type && self.readyState !== 'closed') {
      debug('got upgrade packet - upgrading');
      cleanup();
      self.transport.discard();
      self.upgraded = true;
      self.clearTransport();
      self.setTransport(transport);
      self.emit('upgrade', transport);
      self.setPingTimeout();
      self.flush();
      if (self.readyState === 'closing') {
        transport.close(function () {
          self.onClose('forced close');
        });
      }
    } else {
      cleanup();
      transport.close();
    }
  }

  // we force a polling cycle to ensure a fast upgrade
  function check () {
    if ('polling' === self.transport.name && self.transport.writable) {
      debug('writing a noop packet to polling for fast upgrade');
      self.transport.send([{ type: 'noop' }]);
    }
  }

  function cleanup () {
    self.upgrading = false;

    clearInterval(self.checkIntervalTimer);
    self.checkIntervalTimer = null;

    clearTimeout(self.upgradeTimeoutTimer);
    self.upgradeTimeoutTimer = null;

    transport.removeListener('packet', onPacket);
    transport.removeListener('close', onTransportClose);
    transport.removeListener('error', onError);
    self.removeListener('close', onClose);
  }

  function onError (err) {
    debug('client did not complete upgrade - %s', err);
    cleanup();
    transport.close();
    transport = null;
  }

  function onTransportClose () {
    onError('transport closed');
  }

  function onClose () {
    onError('socket closed');
  }

  transport.on('packet', onPacket);
  transport.once('close', onTransportClose);
  transport.once('error', onError);

  self.once('close', onClose);
};

/**
 * Clears listeners and timers associated with current transport.
 *
 * @api private
 */

Socket.prototype.clearTransport = function () {
  var cleanup;

  var toCleanUp = this.cleanupFn.length;

  for (var i = 0; i < toCleanUp; i++) {
    cleanup = this.cleanupFn.shift();
    cleanup();
  }

  // silence further transport errors and prevent uncaught exceptions
  this.transport.on('error', function () {
    debug('error triggered by discarded transport');
  });

  // ensure transport won't stay open
  this.transport.close();

  clearTimeout(this.pingTimeoutTimer);
};

/**
 * Called upon transport considered closed.
 * Possible reasons: `ping timeout`, `client error`, `parse error`,
 * `transport error`, `server close`, `transport close`
 */

Socket.prototype.onClose = function (reason, description) {
  if ('closed' !== this.readyState) {
    this.readyState = 'closed';
    clearTimeout(this.pingTimeoutTimer);
    clearInterval(this.checkIntervalTimer);
    this.checkIntervalTimer = null;
    clearTimeout(this.upgradeTimeoutTimer);
    var self = this;
    // clean writeBuffer in next tick, so developers can still
    // grab the writeBuffer on 'close' event
    process.nextTick(function () {
      self.writeBuffer = [];
    });
    this.packetsFn = [];
    this.sentCallbackFn = [];
    this.clearTransport();
    this.emit('close', reason, description);
  }
};

/**
 * Setup and manage send callback
 *
 * @api private
 */

Socket.prototype.setupSendCallback = function () {
  var self = this;
  this.transport.on('drain', onDrain);

  this.cleanupFn.push(function () {
    self.transport.removeListener('drain', onDrain);
  });

  // the message was sent successfully, execute the callback
  function onDrain () {
    if (self.sentCallbackFn.length > 0) {
      var seqFn = self.sentCallbackFn.splice(0, 1)[0];
      if ('function' === typeof seqFn) {
        debug('executing send callback');
        seqFn(self.transport);
      } else if (Array.isArray(seqFn)) {
        debug('executing batch send callback');
        for (var l = seqFn.length, i = 0; i < l; i++) {
          if ('function' === typeof seqFn[i]) {
            seqFn[i](self.transport);
          }
        }
      }
    }
  }
};

/**
 * Sends a message packet.
 *
 * @param {String} message
 * @param {Object} options
 * @param {Function} callback
 * @return {Socket} for chaining
 * @api public
 */

Socket.prototype.send =
Socket.prototype.write = function (data, options, callback) {
  this.sendPacket('message', data, options, callback);
  return this;
};

/**
 * Sends a packet.
 *
 * @param {String} packet type
 * @param {String} optional, data
 * @param {Object} options
 * @api private
 */

Socket.prototype.sendPacket = function (type, data, options, callback) {
  if ('function' === typeof options) {
    callback = options;
    options = null;
  }

  options = options || {};
  options.compress = false !== options.compress;

  if ('closing' !== this.readyState && 'closed' !== this.readyState) {
    debug('sending packet "%s" (%s)', type, data);

    var packet = {
      type: type,
      options: options
    };
    if (data) packet.data = data;

    // exports packetCreate event
    this.emit('packetCreate', packet);

    this.writeBuffer.push(packet);

    // add send callback to object, if defined
    if (callback) this.packetsFn.push(callback);

    this.flush();
  }
};

/**
 * Attempts to flush the packets buffer.
 *
 * @api private
 */

Socket.prototype.flush = function () {
  if ('closed' !== this.readyState &&
                this.transport.writable &&
                this.writeBuffer.length) {
    debug('flushing buffer to transport');
    this.emit('flush', this.writeBuffer);
    this.server.emit('flush', this, this.writeBuffer);
    var wbuf = this.writeBuffer;
    this.writeBuffer = [];
    if (!this.transport.supportsFraming) {
      this.sentCallbackFn.push(this.packetsFn);
    } else {
      this.sentCallbackFn.push.apply(this.sentCallbackFn, this.packetsFn);
    }
    this.packetsFn = [];
    this.transport.send(wbuf);
    this.emit('drain');
    this.server.emit('drain', this);
  }
};

/**
 * Get available upgrades for this socket.
 *
 * @api private
 */

Socket.prototype.getAvailableUpgrades = function () {
  var availableUpgrades = [];
  var allUpgrades = this.server.upgrades(this.transport.name);
  for (var i = 0, l = allUpgrades.length; i < l; ++i) {
    var upg = allUpgrades[i];
    if (this.server.transports.indexOf(upg) !== -1) {
      availableUpgrades.push(upg);
    }
  }
  return availableUpgrades;
};

/**
 * Closes the socket and underlying transport.
 *
 * @param {Boolean} optional, discard
 * @return {Socket} for chaining
 * @api public
 */

Socket.prototype.close = function (discard) {
  if ('open' !== this.readyState) return;

  this.readyState = 'closing';

  if (this.writeBuffer.length) {
    this.once('drain', this.closeTransport.bind(this, discard));
    return;
  }

  this.closeTransport(discard);
};

/**
 * Closes the underlying transport.
 *
 * @param {Boolean} discard
 * @api private
 */

Socket.prototype.closeTransport = function (discard) {
  if (discard) this.transport.discard();
  this.transport.close(this.onClose.bind(this, 'forced close'));
};
