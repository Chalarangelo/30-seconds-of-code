
/**
 * Module dependencies.
 */

var qs = require('querystring');
var parse = require('url').parse;
var base64id = require('base64id');
var transports = require('./transports');
var EventEmitter = require('events').EventEmitter;
var Socket = require('./socket');
var util = require('util');
var debug = require('debug')('engine');
var cookieMod = require('cookie');

/**
 * Module exports.
 */

module.exports = Server;

/**
 * Server constructor.
 *
 * @param {Object} options
 * @api public
 */

function Server (opts) {
  if (!(this instanceof Server)) {
    return new Server(opts);
  }

  this.clients = {};
  this.clientsCount = 0;

  opts = opts || {};

  this.wsEngine = opts.wsEngine || process.env.EIO_WS_ENGINE || 'ws';
  this.pingTimeout = opts.pingTimeout || 5000;
  this.pingInterval = opts.pingInterval || 25000;
  this.upgradeTimeout = opts.upgradeTimeout || 10000;
  this.maxHttpBufferSize = opts.maxHttpBufferSize || 10E7;
  this.transports = opts.transports || Object.keys(transports);
  this.allowUpgrades = false !== opts.allowUpgrades;
  this.allowRequest = opts.allowRequest;
  this.cookie = false !== opts.cookie ? (opts.cookie || 'io') : false;
  this.cookiePath = false !== opts.cookiePath ? (opts.cookiePath || '/') : false;
  this.cookieHttpOnly = false !== opts.cookieHttpOnly;
  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || true) : false;
  this.httpCompression = false !== opts.httpCompression ? (opts.httpCompression || {}) : false;
  this.initialPacket = opts.initialPacket;

  var self = this;

  // initialize compression options
  ['perMessageDeflate', 'httpCompression'].forEach(function (type) {
    var compression = self[type];
    if (true === compression) self[type] = compression = {};
    if (compression && null == compression.threshold) {
      compression.threshold = 1024;
    }
  });

  this.init();
}

/**
 * Protocol errors mappings.
 */

Server.errors = {
  UNKNOWN_TRANSPORT: 0,
  UNKNOWN_SID: 1,
  BAD_HANDSHAKE_METHOD: 2,
  BAD_REQUEST: 3,
  FORBIDDEN: 4
};

Server.errorMessages = {
  0: 'Transport unknown',
  1: 'Session ID unknown',
  2: 'Bad handshake method',
  3: 'Bad request',
  4: 'Forbidden'
};

/**
 * Inherits from EventEmitter.
 */

util.inherits(Server, EventEmitter);

/**
 * Initialize websocket server
 *
 * @api private
 */

Server.prototype.init = function () {
  if (!~this.transports.indexOf('websocket')) return;

  if (this.ws) this.ws.close();

  var wsModule;
  switch (this.wsEngine) {
    case 'uws': wsModule = require('uws'); break;
    case 'ws': wsModule = require('ws'); break;
    default: throw new Error('unknown wsEngine');
  }
  this.ws = new wsModule.Server({
    noServer: true,
    clientTracking: false,
    perMessageDeflate: this.perMessageDeflate,
    maxPayload: this.maxHttpBufferSize
  });
};

/**
 * Returns a list of available transports for upgrade given a certain transport.
 *
 * @return {Array}
 * @api public
 */

Server.prototype.upgrades = function (transport) {
  if (!this.allowUpgrades) return [];
  return transports[transport].upgradesTo || [];
};

/**
 * Verifies a request.
 *
 * @param {http.IncomingMessage}
 * @return {Boolean} whether the request is valid
 * @api private
 */

Server.prototype.verify = function (req, upgrade, fn) {
  // transport check
  var transport = req._query.transport;
  if (!~this.transports.indexOf(transport)) {
    debug('unknown transport "%s"', transport);
    return fn(Server.errors.UNKNOWN_TRANSPORT, false);
  }

  // 'Origin' header check
  var isOriginInvalid = checkInvalidHeaderChar(req.headers.origin);
  if (isOriginInvalid) {
    req.headers.origin = null;
    return fn(Server.errors.BAD_REQUEST, false);
  }

  // sid check
  var sid = req._query.sid;
  if (sid) {
    if (!this.clients.hasOwnProperty(sid)) {
      return fn(Server.errors.UNKNOWN_SID, false);
    }
    if (!upgrade && this.clients[sid].transport.name !== transport) {
      debug('bad request: unexpected transport without upgrade');
      return fn(Server.errors.BAD_REQUEST, false);
    }
  } else {
    // handshake is GET only
    if ('GET' !== req.method) return fn(Server.errors.BAD_HANDSHAKE_METHOD, false);
    if (!this.allowRequest) return fn(null, true);
    return this.allowRequest(req, fn);
  }

  fn(null, true);
};

/**
 * Prepares a request by processing the query string.
 *
 * @api private
 */

Server.prototype.prepare = function (req) {
  // try to leverage pre-existing `req._query` (e.g: from connect)
  if (!req._query) {
    req._query = ~req.url.indexOf('?') ? qs.parse(parse(req.url).query) : {};
  }
};

/**
 * Closes all clients.
 *
 * @api public
 */

Server.prototype.close = function () {
  debug('closing all open clients');
  for (var i in this.clients) {
    if (this.clients.hasOwnProperty(i)) {
      this.clients[i].close(true);
    }
  }
  if (this.ws) {
    debug('closing webSocketServer');
    this.ws.close();
    // don't delete this.ws because it can be used again if the http server starts listening again
  }
  return this;
};

/**
 * Handles an Engine.IO HTTP request.
 *
 * @param {http.IncomingMessage} request
 * @param {http.ServerResponse|http.OutgoingMessage} response
 * @api public
 */

Server.prototype.handleRequest = function (req, res) {
  debug('handling "%s" http request "%s"', req.method, req.url);
  this.prepare(req);
  req.res = res;

  var self = this;
  this.verify(req, false, function (err, success) {
    if (!success) {
      sendErrorMessage(req, res, err);
      return;
    }

    if (req._query.sid) {
      debug('setting new request for existing client');
      self.clients[req._query.sid].transport.onRequest(req);
    } else {
      self.handshake(req._query.transport, req);
    }
  });
};

/**
 * Sends an Engine.IO Error Message
 *
 * @param {http.ServerResponse} response
 * @param {code} error code
 * @api private
 */

function sendErrorMessage (req, res, code) {
  var headers = { 'Content-Type': 'application/json' };

  var isForbidden = !Server.errorMessages.hasOwnProperty(code);
  if (isForbidden) {
    res.writeHead(403, headers);
    res.end(JSON.stringify({
      code: Server.errors.FORBIDDEN,
      message: code || Server.errorMessages[Server.errors.FORBIDDEN]
    }));
    return;
  }
  if (req.headers.origin) {
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Access-Control-Allow-Origin'] = req.headers.origin;
  } else {
    headers['Access-Control-Allow-Origin'] = '*';
  }
  if (res !== undefined) {
    res.writeHead(400, headers);
    res.end(JSON.stringify({
      code: code,
      message: Server.errorMessages[code]
    }));
  }
}

/**
 * generate a socket id.
 * Overwrite this method to generate your custom socket id
 *
 * @param {Object} request object
 * @api public
 */

Server.prototype.generateId = function (req) {
  return base64id.generateId();
};

/**
 * Handshakes a new client.
 *
 * @param {String} transport name
 * @param {Object} request object
 * @api private
 */

Server.prototype.handshake = function (transportName, req) {
  var id = this.generateId(req);

  debug('handshaking client "%s"', id);

  try {
    var transport = new transports[transportName](req);
    if ('polling' === transportName) {
      transport.maxHttpBufferSize = this.maxHttpBufferSize;
      transport.httpCompression = this.httpCompression;
    } else if ('websocket' === transportName) {
      transport.perMessageDeflate = this.perMessageDeflate;
    }

    if (req._query && req._query.b64) {
      transport.supportsBinary = false;
    } else {
      transport.supportsBinary = true;
    }
  } catch (e) {
    sendErrorMessage(req, req.res, Server.errors.BAD_REQUEST);
    return;
  }
  var socket = new Socket(id, this, transport, req);
  var self = this;

  if (false !== this.cookie) {
    transport.on('headers', function (headers) {
      headers['Set-Cookie'] = cookieMod.serialize(self.cookie, id,
        {
          path: self.cookiePath,
          httpOnly: self.cookiePath ? self.cookieHttpOnly : false
        });
    });
  }

  transport.onRequest(req);

  this.clients[id] = socket;
  this.clientsCount++;

  socket.once('close', function () {
    delete self.clients[id];
    self.clientsCount--;
  });

  this.emit('connection', socket);
};

/**
 * Handles an Engine.IO HTTP Upgrade.
 *
 * @api public
 */

Server.prototype.handleUpgrade = function (req, socket, upgradeHead) {
  this.prepare(req);

  var self = this;
  this.verify(req, true, function (err, success) {
    if (!success) {
      abortConnection(socket, err);
      return;
    }

    var head = Buffer.from(upgradeHead); // eslint-disable-line node/no-deprecated-api
    upgradeHead = null;

    // delegate to ws
    self.ws.handleUpgrade(req, socket, head, function (conn) {
      self.onWebSocket(req, conn);
    });
  });
};

/**
 * Called upon a ws.io connection.
 *
 * @param {ws.Socket} websocket
 * @api private
 */

Server.prototype.onWebSocket = function (req, socket) {
  socket.on('error', onUpgradeError);

  if (transports[req._query.transport] !== undefined && !transports[req._query.transport].prototype.handlesUpgrades) {
    debug('transport doesnt handle upgraded requests');
    socket.close();
    return;
  }

  // get client id
  var id = req._query.sid;

  // keep a reference to the ws.Socket
  req.websocket = socket;

  if (id) {
    var client = this.clients[id];
    if (!client) {
      debug('upgrade attempt for closed client');
      socket.close();
    } else if (client.upgrading) {
      debug('transport has already been trying to upgrade');
      socket.close();
    } else if (client.upgraded) {
      debug('transport had already been upgraded');
      socket.close();
    } else {
      debug('upgrading existing transport');

      // transport error handling takes over
      socket.removeListener('error', onUpgradeError);

      var transport = new transports[req._query.transport](req);
      if (req._query && req._query.b64) {
        transport.supportsBinary = false;
      } else {
        transport.supportsBinary = true;
      }
      transport.perMessageDeflate = this.perMessageDeflate;
      client.maybeUpgrade(transport);
    }
  } else {
    // transport error handling takes over
    socket.removeListener('error', onUpgradeError);

    this.handshake(req._query.transport, req);
  }

  function onUpgradeError () {
    debug('websocket error before upgrade');
    // socket.close() not needed
  }
};

/**
 * Captures upgrade requests for a http.Server.
 *
 * @param {http.Server} server
 * @param {Object} options
 * @api public
 */

Server.prototype.attach = function (server, options) {
  var self = this;
  options = options || {};
  var path = (options.path || '/engine.io').replace(/\/$/, '');

  var destroyUpgradeTimeout = options.destroyUpgradeTimeout || 1000;

  // normalize path
  path += '/';

  function check (req) {
    if ('OPTIONS' === req.method && false === options.handlePreflightRequest) {
      return false;
    }
    return path === req.url.substr(0, path.length);
  }

  // cache and clean up listeners
  var listeners = server.listeners('request').slice(0);
  server.removeAllListeners('request');
  server.on('close', self.close.bind(self));
  server.on('listening', self.init.bind(self));

  // add request handler
  server.on('request', function (req, res) {
    if (check(req)) {
      debug('intercepting request for path "%s"', path);
      if ('OPTIONS' === req.method && 'function' === typeof options.handlePreflightRequest) {
        options.handlePreflightRequest.call(server, req, res);
      } else {
        self.handleRequest(req, res);
      }
    } else {
      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i].call(server, req, res);
      }
    }
  });

  if (~self.transports.indexOf('websocket')) {
    server.on('upgrade', function (req, socket, head) {
      if (check(req)) {
        self.handleUpgrade(req, socket, head);
      } else if (false !== options.destroyUpgrade) {
        // default node behavior is to disconnect when no handlers
        // but by adding a handler, we prevent that
        // and if no eio thing handles the upgrade
        // then the socket needs to die!
        setTimeout(function () {
          if (socket.writable && socket.bytesWritten <= 0) {
            return socket.end();
          }
        }, destroyUpgradeTimeout);
      }
    });
  }
};

/**
 * Closes the connection
 *
 * @param {net.Socket} socket
 * @param {code} error code
 * @api private
 */

function abortConnection (socket, code) {
  if (socket.writable) {
    var message = Server.errorMessages.hasOwnProperty(code) ? Server.errorMessages[code] : String(code || '');
    var length = Buffer.byteLength(message);
    socket.write(
      'HTTP/1.1 400 Bad Request\r\n' +
      'Connection: close\r\n' +
      'Content-type: text/html\r\n' +
      'Content-Length: ' + length + '\r\n' +
      '\r\n' +
      message
    );
  }
  socket.destroy();
}

/* eslint-disable */

/**
 * From https://github.com/nodejs/node/blob/v8.4.0/lib/_http_common.js#L303-L354
 *
 * True if val contains an invalid field-vchar
 *  field-value    = *( field-content / obs-fold )
 *  field-content  = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 *  field-vchar    = VCHAR / obs-text
 *
 * checkInvalidHeaderChar() is currently designed to be inlinable by v8,
 * so take care when making changes to the implementation so that the source
 * code size does not exceed v8's default max_inlined_source_size setting.
 **/
var validHdrChars = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, // 0 - 15
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 16 - 31
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 32 - 47
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 48 - 63
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 64 - 79
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 80 - 95
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 96 - 111
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, // 112 - 127
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // 128 ...
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1  // ... 255
];

function checkInvalidHeaderChar(val) {
  val += '';
  if (val.length < 1)
    return false;
  if (!validHdrChars[val.charCodeAt(0)])
    return true;
  if (val.length < 2)
    return false;
  if (!validHdrChars[val.charCodeAt(1)])
    return true;
  if (val.length < 3)
    return false;
  if (!validHdrChars[val.charCodeAt(2)])
    return true;
  if (val.length < 4)
    return false;
  if (!validHdrChars[val.charCodeAt(3)])
    return true;
  for (var i = 4; i < val.length; ++i) {
    if (!validHdrChars[val.charCodeAt(i)])
      return true;
  }
  return false;
}
