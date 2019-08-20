var util   = require('util'),
    net    = require('net'),
    tls    = require('tls'),
    url    = require('url'),
    driver = require('websocket-driver'),
    API    = require('./api'),
    Event  = require('./api/event');

var DEFAULT_PORTS    = {'http:': 80, 'https:': 443, 'ws:':80, 'wss:': 443},
    SECURE_PROTOCOLS = ['https:', 'wss:'];

var Client = function(_url, protocols, options) {
  options = options || {};

  this.url     = _url;
  this._driver = driver.client(this.url, {maxLength: options.maxLength, protocols: protocols});

  ['open', 'error'].forEach(function(event) {
    this._driver.on(event, function() {
      self.headers    = self._driver.headers;
      self.statusCode = self._driver.statusCode;
    });
  }, this);

  var proxy     = options.proxy || {},
      endpoint  = url.parse(proxy.origin || this.url),
      port      = endpoint.port || DEFAULT_PORTS[endpoint.protocol],
      secure    = SECURE_PROTOCOLS.indexOf(endpoint.protocol) >= 0,
      onConnect = function() { self._onConnect() },
      originTLS = options.tls || {},
      socketTLS = proxy.origin ? (proxy.tls || {}) : originTLS,
      self      = this;

  originTLS.ca = originTLS.ca || options.ca;

  this._stream = secure
               ? tls.connect(port, endpoint.hostname, socketTLS, onConnect)
               : net.connect(port, endpoint.hostname, onConnect);

  if (proxy.origin) this._configureProxy(proxy, originTLS);

  API.call(this, options);
};
util.inherits(Client, API);

Client.prototype._onConnect = function() {
  var worker = this._proxy || this._driver;
  worker.start();
};

Client.prototype._configureProxy = function(proxy, originTLS) {
  var uri    = url.parse(this.url),
      secure = SECURE_PROTOCOLS.indexOf(uri.protocol) >= 0,
      self   = this,
      name;

  this._proxy = this._driver.proxy(proxy.origin);

  if (proxy.headers) {
    for (name in proxy.headers) this._proxy.setHeader(name, proxy.headers[name]);
  }

  this._proxy.pipe(this._stream, {end: false});
  this._stream.pipe(this._proxy);

  this._proxy.on('connect', function() {
    if (secure) {
      var options = {socket: self._stream, servername: uri.hostname};
      for (name in originTLS) options[name] = originTLS[name];
      self._stream = tls.connect(options);
      self._configureStream();
    }
    self._driver.io.pipe(self._stream);
    self._stream.pipe(self._driver.io);
    self._driver.start();
  });

  this._proxy.on('error', function(error) {
    self._driver.emit('error', error);
  });
};

module.exports = Client;
