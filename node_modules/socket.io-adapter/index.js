
/**
 * Module dependencies.
 */

var Emitter = require('events').EventEmitter;

/**
 * Module exports.
 */

module.exports = Adapter;

/**
 * Memory adapter constructor.
 *
 * @param {Namespace} nsp
 * @api public
 */

function Adapter(nsp){
  this.nsp = nsp;
  this.rooms = {};
  this.sids = {};
  this.encoder = nsp.server.encoder;
}

/**
 * Inherits from `EventEmitter`.
 */

Adapter.prototype.__proto__ = Emitter.prototype;

/**
 * Adds a socket to a room.
 *
 * @param {String} socket id
 * @param {String} room name
 * @param {Function} callback
 * @api public
 */

Adapter.prototype.add = function(id, room, fn){
  return this.addAll(id, [ room ], fn);
};

/**
 * Adds a socket to a list of room.
 *
 * @param {String} socket id
 * @param {String} rooms
 * @param {Function} callback
 * @api public
 */

Adapter.prototype.addAll = function(id, rooms, fn){
  for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i];
    this.sids[id] = this.sids[id] || {};
    this.sids[id][room] = true;
    this.rooms[room] = this.rooms[room] || Room();
    this.rooms[room].add(id);
  }
  if (fn) process.nextTick(fn.bind(null, null));
};

/**
 * Removes a socket from a room.
 *
 * @param {String} socket id
 * @param {String} room name
 * @param {Function} callback
 * @api public
 */

Adapter.prototype.del = function(id, room, fn){
  this.sids[id] = this.sids[id] || {};
  delete this.sids[id][room];
  if (this.rooms.hasOwnProperty(room)) {
    this.rooms[room].del(id);
    if (this.rooms[room].length === 0) delete this.rooms[room];
  }

  if (fn) process.nextTick(fn.bind(null, null));
};

/**
 * Removes a socket from all rooms it's joined.
 *
 * @param {String} socket id
 * @param {Function} callback
 * @api public
 */

Adapter.prototype.delAll = function(id, fn){
  var rooms = this.sids[id];
  if (rooms) {
    for (var room in rooms) {
      if (this.rooms.hasOwnProperty(room)) {
        this.rooms[room].del(id);
        if (this.rooms[room].length === 0) delete this.rooms[room];
      }
    }
  }
  delete this.sids[id];

  if (fn) process.nextTick(fn.bind(null, null));
};

/**
 * Broadcasts a packet.
 *
 * Options:
 *  - `flags` {Object} flags for this packet
 *  - `except` {Array} sids that should be excluded
 *  - `rooms` {Array} list of rooms to broadcast to
 *
 * @param {Object} packet object
 * @api public
 */

Adapter.prototype.broadcast = function(packet, opts){
  var rooms = opts.rooms || [];
  var except = opts.except || [];
  var flags = opts.flags || {};
  var packetOpts = {
    preEncoded: true,
    volatile: flags.volatile,
    compress: flags.compress
  };
  var ids = {};
  var self = this;
  var socket;

  packet.nsp = this.nsp.name;
  this.encoder.encode(packet, function(encodedPackets) {
    if (rooms.length) {
      for (var i = 0; i < rooms.length; i++) {
        var room = self.rooms[rooms[i]];
        if (!room) continue;
        var sockets = room.sockets;
        for (var id in sockets) {
          if (sockets.hasOwnProperty(id)) {
            if (ids[id] || ~except.indexOf(id)) continue;
            socket = self.nsp.connected[id];
            if (socket) {
              socket.packet(encodedPackets, packetOpts);
              ids[id] = true;
            }
          }
        }
      }
    } else {
      for (var id in self.sids) {
        if (self.sids.hasOwnProperty(id)) {
          if (~except.indexOf(id)) continue;
          socket = self.nsp.connected[id];
          if (socket) socket.packet(encodedPackets, packetOpts);
        }
      }
    }
  });
};

/**
 * Gets a list of clients by sid.
 *
 * @param {Array} explicit set of rooms to check.
 * @param {Function} callback
 * @api public
 */

Adapter.prototype.clients = function(rooms, fn){
  if ('function' == typeof rooms){
    fn = rooms;
    rooms = null;
  }

  rooms = rooms || [];

  var ids = {};
  var sids = [];
  var socket;

  if (rooms.length) {
    for (var i = 0; i < rooms.length; i++) {
      var room = this.rooms[rooms[i]];
      if (!room) continue;
      var sockets = room.sockets;
      for (var id in sockets) {
        if (sockets.hasOwnProperty(id)) {
          if (ids[id]) continue;
          socket = this.nsp.connected[id];
          if (socket) {
            sids.push(id);
            ids[id] = true;
          }
        }
      }
    }
  } else {
    for (var id in this.sids) {
      if (this.sids.hasOwnProperty(id)) {
        socket = this.nsp.connected[id];
        if (socket) sids.push(id);
      }
    }
  }

  if (fn) process.nextTick(fn.bind(null, null, sids));
};

/**
 * Gets the list of rooms a given client has joined.
 *
 * @param {String} socket id
 * @param {Function} callback
 * @api public
 */
Adapter.prototype.clientRooms = function(id, fn){
  var rooms = this.sids[id];
  if (fn) process.nextTick(fn.bind(null, null, rooms ? Object.keys(rooms) : null));
};

/**
* Room constructor.
*
* @api private
*/

function Room(){
  if (!(this instanceof Room)) return new Room();
  this.sockets = {};
  this.length = 0;
}

/**
 * Adds a socket to a room.
 *
 * @param {String} socket id
 * @api private
 */

Room.prototype.add = function(id){
  if (!this.sockets.hasOwnProperty(id)) {
    this.sockets[id] = true;
    this.length++;
  }
};

/**
 * Removes a socket from a room.
 *
 * @param {String} socket id
 * @api private
 */

Room.prototype.del = function(id){
  if (this.sockets.hasOwnProperty(id)) {
    delete this.sockets[id];
    this.length--;
  }
};
