
/**
 * Module requirements.
 */

var Transport = require('../transport');
var parser = require('engine.io-parser');
var zlib = require('zlib');
var accepts = require('accepts');
var util = require('util');
var debug = require('debug')('engine:polling');

var compressionMethods = {
  gzip: zlib.createGzip,
  deflate: zlib.createDeflate
};

/**
 * Exports the constructor.
 */

module.exports = Polling;

/**
 * HTTP polling constructor.
 *
 * @api public.
 */

function Polling (req) {
  Transport.call(this, req);

  this.closeTimeout = 30 * 1000;
  this.maxHttpBufferSize = null;
  this.httpCompression = null;
}

/**
 * Inherits from Transport.
 *
 * @api public.
 */

util.inherits(Polling, Transport);

/**
 * Transport name
 *
 * @api public
 */

Polling.prototype.name = 'polling';

/**
 * Overrides onRequest.
 *
 * @param {http.IncomingMessage}
 * @api private
 */

Polling.prototype.onRequest = function (req) {
  var res = req.res;

  if ('GET' === req.method) {
    this.onPollRequest(req, res);
  } else if ('POST' === req.method) {
    this.onDataRequest(req, res);
  } else {
    res.writeHead(500);
    res.end();
  }
};

/**
 * The client sends a request awaiting for us to send data.
 *
 * @api private
 */

Polling.prototype.onPollRequest = function (req, res) {
  if (this.req) {
    debug('request overlap');
    // assert: this.res, '.req and .res should be (un)set together'
    this.onError('overlap from client');
    res.writeHead(500);
    res.end();
    return;
  }

  debug('setting request');

  this.req = req;
  this.res = res;

  var self = this;

  function onClose () {
    self.onError('poll connection closed prematurely');
  }

  function cleanup () {
    req.removeListener('close', onClose);
    self.req = self.res = null;
  }

  req.cleanup = cleanup;
  req.on('close', onClose);

  this.writable = true;
  this.emit('drain');

  // if we're still writable but had a pending close, trigger an empty send
  if (this.writable && this.shouldClose) {
    debug('triggering empty send to append close packet');
    this.send([{ type: 'noop' }]);
  }
};

/**
 * The client sends a request with data.
 *
 * @api private
 */

Polling.prototype.onDataRequest = function (req, res) {
  if (this.dataReq) {
    // assert: this.dataRes, '.dataReq and .dataRes should be (un)set together'
    this.onError('data request overlap from client');
    res.writeHead(500);
    res.end();
    return;
  }

  var isBinary = 'application/octet-stream' === req.headers['content-type'];

  this.dataReq = req;
  this.dataRes = res;

  var chunks = isBinary ? Buffer.concat([]) : '';
  var self = this;

  function cleanup () {
    req.removeListener('data', onData);
    req.removeListener('end', onEnd);
    req.removeListener('close', onClose);
    self.dataReq = self.dataRes = chunks = null;
  }

  function onClose () {
    cleanup();
    self.onError('data request connection closed prematurely');
  }

  function onData (data) {
    var contentLength;
    if (isBinary) {
      chunks = Buffer.concat([chunks, data]);
      contentLength = chunks.length;
    } else {
      chunks += data;
      contentLength = Buffer.byteLength(chunks);
    }

    if (contentLength > self.maxHttpBufferSize) {
      chunks = isBinary ? Buffer.concat([]) : '';
      req.connection.destroy();
    }
  }

  function onEnd () {
    self.onData(chunks);

    var headers = {
      // text/html is required instead of text/plain to avoid an
      // unwanted download dialog on certain user-agents (GH-43)
      'Content-Type': 'text/html',
      'Content-Length': 2
    };

    res.writeHead(200, self.headers(req, headers));
    res.end('ok');
    cleanup();
  }

  req.on('close', onClose);
  if (!isBinary) req.setEncoding('utf8');
  req.on('data', onData);
  req.on('end', onEnd);
};

/**
 * Processes the incoming data payload.
 *
 * @param {String} encoded payload
 * @api private
 */

Polling.prototype.onData = function (data) {
  debug('received "%s"', data);
  var self = this;
  var callback = function (packet) {
    if ('close' === packet.type) {
      debug('got xhr close packet');
      self.onClose();
      return false;
    }

    self.onPacket(packet);
  };

  parser.decodePayload(data, callback);
};

/**
 * Overrides onClose.
 *
 * @api private
 */

Polling.prototype.onClose = function () {
  if (this.writable) {
    // close pending poll request
    this.send([{ type: 'noop' }]);
  }
  Transport.prototype.onClose.call(this);
};

/**
 * Writes a packet payload.
 *
 * @param {Object} packet
 * @api private
 */

Polling.prototype.send = function (packets) {
  this.writable = false;

  if (this.shouldClose) {
    debug('appending close packet to payload');
    packets.push({ type: 'close' });
    this.shouldClose();
    this.shouldClose = null;
  }

  var self = this;
  parser.encodePayload(packets, this.supportsBinary, function (data) {
    var compress = packets.some(function (packet) {
      return packet.options && packet.options.compress;
    });
    self.write(data, { compress: compress });
  });
};

/**
 * Writes data as response to poll request.
 *
 * @param {String} data
 * @param {Object} options
 * @api private
 */

Polling.prototype.write = function (data, options) {
  debug('writing "%s"', data);
  var self = this;
  this.doWrite(data, options, function () {
    self.req.cleanup();
  });
};

/**
 * Performs the write.
 *
 * @api private
 */

Polling.prototype.doWrite = function (data, options, callback) {
  var self = this;

  // explicit UTF-8 is required for pages not served under utf
  var isString = typeof data === 'string';
  var contentType = isString
    ? 'text/plain; charset=UTF-8'
    : 'application/octet-stream';

  var headers = {
    'Content-Type': contentType
  };

  if (!this.httpCompression || !options.compress) {
    respond(data);
    return;
  }

  var len = isString ? Buffer.byteLength(data) : data.length;
  if (len < this.httpCompression.threshold) {
    respond(data);
    return;
  }

  var encoding = accepts(this.req).encodings(['gzip', 'deflate']);
  if (!encoding) {
    respond(data);
    return;
  }

  this.compress(data, encoding, function (err, data) {
    if (err) {
      self.res.writeHead(500);
      self.res.end();
      callback(err);
      return;
    }

    headers['Content-Encoding'] = encoding;
    respond(data);
  });

  function respond (data) {
    headers['Content-Length'] = 'string' === typeof data ? Buffer.byteLength(data) : data.length;
    self.res.writeHead(200, self.headers(self.req, headers));
    self.res.end(data);
    callback();
  }
};

/**
 * Compresses data.
 *
 * @api private
 */

Polling.prototype.compress = function (data, encoding, callback) {
  debug('compressing');

  var buffers = [];
  var nread = 0;

  compressionMethods[encoding](this.httpCompression)
    .on('error', callback)
    .on('data', function (chunk) {
      buffers.push(chunk);
      nread += chunk.length;
    })
    .on('end', function () {
      callback(null, Buffer.concat(buffers, nread));
    })
    .end(data);
};

/**
 * Closes the transport.
 *
 * @api private
 */

Polling.prototype.doClose = function (fn) {
  debug('closing');

  var self = this;
  var closeTimeoutTimer;

  if (this.dataReq) {
    debug('aborting ongoing data request');
    this.dataReq.destroy();
  }

  if (this.writable) {
    debug('transport writable - closing right away');
    this.send([{ type: 'close' }]);
    onClose();
  } else if (this.discarded) {
    debug('transport discarded - closing right away');
    onClose();
  } else {
    debug('transport not writable - buffering orderly close');
    this.shouldClose = onClose;
    closeTimeoutTimer = setTimeout(onClose, this.closeTimeout);
  }

  function onClose () {
    clearTimeout(closeTimeoutTimer);
    fn();
    self.onClose();
  }
};

/**
 * Returns headers for a response.
 *
 * @param {http.IncomingMessage} request
 * @param {Object} extra headers
 * @api private
 */

Polling.prototype.headers = function (req, headers) {
  headers = headers || {};

  // prevent XSS warnings on IE
  // https://github.com/LearnBoost/socket.io/pull/1333
  var ua = req.headers['user-agent'];
  if (ua && (~ua.indexOf(';MSIE') || ~ua.indexOf('Trident/'))) {
    headers['X-XSS-Protection'] = '0';
  }

  this.emit('headers', headers);
  return headers;
};
