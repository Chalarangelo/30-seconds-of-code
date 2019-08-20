'use strict';

var util = require('util');
var EventEmitter = require('events').EventEmitter;

function Hose(socket, options, filter) {
  EventEmitter.call(this);

  if (typeof options === 'function') {
    filter = options;
    options = {};
  }

  this.socket = socket;
  this.options = options;
  this.filter = filter;

  this.buffer = null;

  var self = this;
  this.listeners = {
    error: function(err) {
      return self.onError(err);
    },
    data: function(chunk) {
      return self.onData(chunk);
    },
    end: function() {
      return self.onEnd();
    }
  };

  this.socket.on('error', this.listeners.error);
  this.socket.on('data', this.listeners.data);
  this.socket.on('end', this.listeners.end);
}
util.inherits(Hose, EventEmitter);
module.exports = Hose;

Hose.create = function create(socket, options, filter) {
  return new Hose(socket, options, filter);
};

Hose.prototype.detach = function detach() {
  // Stop the flow
  this.socket.pause();

  this.socket.removeListener('error', this.listeners.error);
  this.socket.removeListener('data', this.listeners.data);
  this.socket.removeListener('end', this.listeners.end);
};

Hose.prototype.reemit = function reemit() {
  var buffer = this.buffer;
  this.buffer = null;

  // Modern age
  if (this.socket.unshift) {
    this.socket.unshift(buffer);
    if (this.socket.listeners('data').length > 0)
      this.socket.resume();
    return;
  }

  // Rusty node v0.8
  if (this.socket.ondata)
    this.socket.ondata(buffer, 0, buffer.length);
  this.socket.emit('data', buffer);
  this.socket.resume();
};

Hose.prototype.onError = function onError(err) {
  this.detach();
  this.emit('error', err);
};

Hose.prototype.onData = function onData(chunk) {
  if (this.buffer)
    this.buffer = Buffer.concat([ this.buffer, chunk ]);
  else
    this.buffer = chunk;

  var self = this;
  this.filter(this.buffer, function(err, protocol) {
    if (err)
      return self.onError(err);

    // No protocol selected yet
    if (!protocol)
      return;

    self.detach();
    self.emit('select', protocol, self.socket);
    self.reemit();
  });
};

Hose.prototype.onEnd = function onEnd() {
  this.detach();
  this.emit('error', new Error('Not enough data to recognize protocol'));
};
