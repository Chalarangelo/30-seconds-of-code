var assert = require('assert');
var util = require('util');

var Buffer = require('buffer').Buffer;

// Node.js version
var mode = /^v0\.8\./.test(process.version) ? 'rusty' :
           /^v0\.(9|10)\./.test(process.version) ? 'old' :
           /^v0\.12\./.test(process.version) ? 'normal' :
           'modern';

var HTTPParser;

var methods;
var reverseMethods;

var kOnHeaders;
var kOnHeadersComplete;
var kOnMessageComplete;
var kOnBody;
if (mode === 'normal' || mode === 'modern') {
  HTTPParser = process.binding('http_parser').HTTPParser;
  methods = HTTPParser.methods;

  // v6
  if (!methods)
    methods = process.binding('http_parser').methods;

  reverseMethods = {};

  methods.forEach(function(method, index) {
    reverseMethods[method] = index;
  });

  kOnHeaders = HTTPParser.kOnHeaders | 0;
  kOnHeadersComplete = HTTPParser.kOnHeadersComplete | 0;
  kOnMessageComplete = HTTPParser.kOnMessageComplete | 0;
  kOnBody = HTTPParser.kOnBody | 0;
} else {
  kOnHeaders = 'onHeaders';
  kOnHeadersComplete = 'onHeadersComplete';
  kOnMessageComplete = 'onMessageComplete';
  kOnBody = 'onBody';
}

function Deceiver(socket, options) {
  this.socket = socket;
  this.options = options || {};
  this.isClient = this.options.isClient;
}
module.exports = Deceiver;

Deceiver.create = function create(stream, options) {
  return new Deceiver(stream, options);
};

Deceiver.prototype._toHeaderList = function _toHeaderList(object) {
  var out = [];
  var keys = Object.keys(object);

  for (var i = 0; i < keys.length; i++)
    out.push(keys[i], object[keys[i]]);

  return out;
};

Deceiver.prototype._isUpgrade = function _isUpgrade(request) {
  return request.method === 'CONNECT' ||
         request.headers.upgrade ||
         request.headers.connection &&
            /(^|\W)upgrade(\W|$)/i.test(request.headers.connection);
};

// TODO(indutny): support CONNECT
if (mode === 'modern') {
  /*
  function parserOnHeadersComplete(versionMajor, versionMinor, headers, method,
                                   url, statusCode, statusMessage, upgrade,
                                   shouldKeepAlive) {
   */
  Deceiver.prototype.emitRequest = function emitRequest(request) {
    var parser = this.socket.parser;
    assert(parser, 'No parser present');

    parser.execute = null;

    var self = this;
    var method = reverseMethods[request.method];
    parser.execute = function execute() {
      self._skipExecute(this);
      this[kOnHeadersComplete](1,
                               1,
                               self._toHeaderList(request.headers),
                               method,
                               request.path,
                               0,
                               '',
                               self._isUpgrade(request),
                               true);
      return 0;
    };

    this._emitEmpty();
  };

  Deceiver.prototype.emitResponse = function emitResponse(response) {
    var parser = this.socket.parser;
    assert(parser, 'No parser present');

    parser.execute = null;

    var self = this;
    parser.execute = function execute() {
      self._skipExecute(this);
      this[kOnHeadersComplete](1,
                               1,
                               self._toHeaderList(response.headers),
                               response.path,
                               response.code,
                               response.status,
                               response.reason || '',
                               self._isUpgrade(response),
                               true);
      return 0;
    };

    this._emitEmpty();
  };
} else {
  /*
    `function parserOnHeadersComplete(info) {`

    info = { .versionMajor, .versionMinor, .url, .headers, .method,
             .statusCode, .statusMessage, .upgrade, .shouldKeepAlive }
   */
  Deceiver.prototype.emitRequest = function emitRequest(request) {
    var parser = this.socket.parser;
    assert(parser, 'No parser present');

    var method = request.method;
    if (reverseMethods)
      method = reverseMethods[method];

    var info = {
      versionMajor: 1,
      versionMinor: 1,
      url: request.path,
      headers: this._toHeaderList(request.headers),
      method: method,
      statusCode: 0,
      statusMessage: '',
      upgrade: this._isUpgrade(request),
      shouldKeepAlive: true
    };

    var self = this;
    parser.execute = function execute() {
      self._skipExecute(this);
      this[kOnHeadersComplete](info);
      return 0;
    };

    this._emitEmpty();
  };

  Deceiver.prototype.emitResponse = function emitResponse(response) {
    var parser = this.socket.parser;
    assert(parser, 'No parser present');

    var info = {
      versionMajor: 1,
      versionMinor: 1,
      url: response.path,
      headers: this._toHeaderList(response.headers),
      method: false,
      statusCode: response.status,
      statusMessage: response.reason || '',
      upgrade: this._isUpgrade(response),
      shouldKeepAlive: true
    };

    var self = this;
    parser.execute = function execute() {
      self._skipExecute(this);
      this[kOnHeadersComplete](info);
      return 0;
    };

    this._emitEmpty();
  };
}

Deceiver.prototype._skipExecute = function _skipExecute(parser) {
  var self = this;
  var oldExecute = parser.constructor.prototype.execute;
  var oldFinish = parser.constructor.prototype.finish;

  parser.execute = null;
  parser.finish = null;

  parser.execute = function execute(buffer, start, len) {
    // Parser reuse
    if (this.socket !== self.socket) {
      this.execute = oldExecute;
      this.finish = oldFinish;
      return this.execute(buffer, start, len);
    }

    if (start !== undefined)
      buffer = buffer.slice(start, start + len);
    self.emitBody(buffer);
    return len;
  };

  parser.finish = function finish() {
    // Parser reuse
    if (this.socket !== self.socket) {
      this.execute = oldExecute;
      this.finish = oldFinish;
      return this.finish();
    }

    this.execute = oldExecute;
    this.finish = oldFinish;
    self.emitMessageComplete();
  };
};

Deceiver.prototype.emitBody = function emitBody(buffer) {
  var parser = this.socket.parser;
  assert(parser, 'No parser present');

  parser[kOnBody](buffer, 0, buffer.length);
};

Deceiver.prototype._emitEmpty = function _emitEmpty() {
  // Emit data to force out handling of UPGRADE
  var empty = new Buffer(0);
  if (this.socket.ondata)
    this.socket.ondata(empty, 0, 0);
  else
    this.socket.emit('data', empty);
};

Deceiver.prototype.emitMessageComplete = function emitMessageComplete() {
  var parser = this.socket.parser;
  assert(parser, 'No parser present');

  parser[kOnMessageComplete]();
};
