var original = require('original')
  , parse = require('url').parse
  , events = require('events')
  , https = require('https')
  , http = require('http')
  , util = require('util');

function isPlainObject(obj) {
  return Object.getPrototypeOf(obj) === Object.prototype;
}

/**
 * Creates a new EventSource object
 *
 * @param {String} url the URL to which to connect
 * @param {Object} eventSourceInitDict extra init params. See README for details.
 * @api public
 **/
function EventSource(url, eventSourceInitDict) {
  var readyState = EventSource.CONNECTING;
  Object.defineProperty(this, 'readyState', {
    get: function () {
      return readyState;
    }
  });

  Object.defineProperty(this, 'url', {
    get: function () {
      return url;
    }
  });

  var self = this;
  self.reconnectInterval = 1000;
  var connectPending = false;

  function onConnectionClosed() {
    if (connectPending || readyState === EventSource.CLOSED) return;
    connectPending = true;
    readyState = EventSource.CONNECTING;
    _emit('error', new Event('error'));

    // The url may have been changed by a temporary
    // redirect. If that's the case, revert it now.
    if (reconnectUrl) {
      url = reconnectUrl;
      reconnectUrl = null;
    }
    setTimeout(function () {
      if (readyState !== EventSource.CONNECTING) {
        return;
      }
      connect();
    }, self.reconnectInterval);
  }

  var req;
  var lastEventId = '';
  if (eventSourceInitDict && eventSourceInitDict.headers && isPlainObject(eventSourceInitDict.headers) && eventSourceInitDict.headers['Last-Event-ID']) {
    lastEventId = eventSourceInitDict.headers['Last-Event-ID'];
    delete eventSourceInitDict.headers['Last-Event-ID'];
  }

  var discardTrailingNewline = false
    , data = ''
    , eventName = '';

  var reconnectUrl = null;

  function connect() {
    connectPending = false;

    var options = parse(url);
    var isSecure = options.protocol == 'https:';
    options.headers = { 'Cache-Control': 'no-cache', 'Accept': 'text/event-stream' };
    if (lastEventId) options.headers['Last-Event-ID'] = lastEventId;
    if (eventSourceInitDict && eventSourceInitDict.headers && isPlainObject(eventSourceInitDict.headers)) {
      for (var i in eventSourceInitDict.headers) {
        var header = eventSourceInitDict.headers[i];
        if (header) {
          options.headers[i] = header;
        }
      }
    }

    options.rejectUnauthorized = !(eventSourceInitDict && eventSourceInitDict.rejectUnauthorized == false);

    req = (isSecure ? https : http).request(options, function (res) {
      // Handle HTTP redirects
      if (res.statusCode == 301 || res.statusCode == 307) {
        if (!res.headers.location) {
          // Server sent redirect response without Location header.
          _emit('error', new Event('error', {status: res.statusCode}));
          return;
        }
        if (res.statusCode == 307) reconnectUrl = url;
        url = res.headers.location;
        process.nextTick(connect);
        return;
      }

      if (res.statusCode !== 200) {
        _emit('error', new Event('error', {status: res.statusCode}));
        return self.close();
      }

      readyState = EventSource.OPEN;
      res.on('close', onConnectionClosed);
      res.on('end', onConnectionClosed);
      _emit('open', new Event('open'));

      // text/event-stream parser adapted from webkit's
      // Source/WebCore/page/EventSource.cpp
      var buf = '';
      res.on('data', function (chunk) {
        buf += chunk;

        var pos = 0
          , length = buf.length;
        while (pos < length) {
          if (discardTrailingNewline) {
            if (buf[pos] === '\n') {
              ++pos;
            }
            discardTrailingNewline = false;
          }

          var lineLength = -1
            , fieldLength = -1
            , c;

          for (var i = pos; lineLength < 0 && i < length; ++i) {
            c = buf[i];
            if (c === ':') {
              if (fieldLength < 0) {
                fieldLength = i - pos;
              }
            } else if (c === '\r') {
              discardTrailingNewline = true;
              lineLength = i - pos;
            } else if (c === '\n') {
              lineLength = i - pos;
            }
          }

          if (lineLength < 0) {
            break;
          }

          parseEventStreamLine(buf, pos, fieldLength, lineLength);

          pos += lineLength + 1;
        }

        if (pos === length) {
          buf = '';
        } else if (pos > 0) {
          buf = buf.slice(pos);
        }
      });
    });

    req.on('error', onConnectionClosed);
    req.setNoDelay(true);
    req.end();
  }

  connect();

  function _emit() {
    if (self.listeners(arguments[0]).length > 0) {
      self.emit.apply(self, arguments);
    }
  }

  this.close = function () {
    if (readyState == EventSource.CLOSED) return;
    readyState = EventSource.CLOSED;
    req.abort();
  };

  function parseEventStreamLine(buf, pos, fieldLength, lineLength) {
    if (lineLength === 0) {
      if (data.length > 0) {
        var type = eventName || 'message';
        _emit(type, new MessageEvent(type, {
          data: data.slice(0, -1), // remove trailing newline
          lastEventId: lastEventId,
          origin: original(url)
        }));
        data = '';
      }
      eventName = void 0;
    } else if (fieldLength > 0) {
      var noValue = fieldLength < 0
        , step = 0
        , field = buf.slice(pos, pos + (noValue ? lineLength : fieldLength));

      if (noValue) {
        step = lineLength;
      } else if (buf[pos + fieldLength + 1] !== ' ') {
        step = fieldLength + 1;
      } else {
        step = fieldLength + 2;
      }
      pos += step;
      var valueLength = lineLength - step
        , value = buf.slice(pos, pos + valueLength);

      if (field === 'data') {
        data += value + '\n';
      } else if (field === 'event') {
        eventName = value;
      } else if (field === 'id') {
        lastEventId = value;
      } else if (field === 'retry') {
        var retry = parseInt(value, 10);
        if (!Number.isNaN(retry)) {
          self.reconnectInterval = retry;
        }
      }
    }
  }
}

module.exports = EventSource;

util.inherits(EventSource, events.EventEmitter);
EventSource.prototype.constructor = EventSource; // make stacktraces readable

['open', 'error', 'message'].forEach(function (method) {
  Object.defineProperty(EventSource.prototype, 'on' + method, {
    /**
     * Returns the current listener
     *
     * @return {Mixed} the set function or undefined
     * @api private
     */
    get: function get() {
      var listener = this.listeners(method)[0];
      return listener ? (listener._listener ? listener._listener : listener) : undefined;
    },

    /**
     * Start listening for events
     *
     * @param {Function} listener the listener
     * @return {Mixed} the set function or undefined
     * @api private
     */
    set: function set(listener) {
      this.removeAllListeners(method);
      this.addEventListener(method, listener);
    }
  });
});

/**
 * Ready states
 */
Object.defineProperty(EventSource, 'CONNECTING', { enumerable: true, value: 0});
Object.defineProperty(EventSource, 'OPEN', { enumerable: true, value: 1});
Object.defineProperty(EventSource, 'CLOSED', { enumerable: true, value: 2});

/**
 * Emulates the W3C Browser based WebSocket interface using addEventListener.
 *
 * @param {String} method Listen for an event
 * @param {Function} listener callback
 * @see https://developer.mozilla.org/en/DOM/element.addEventListener
 * @see http://dev.w3.org/html5/websockets/#the-websocket-interface
 * @api public
 */
EventSource.prototype.addEventListener = function addEventListener(method, listener) {
  if (typeof listener === 'function') {
    // store a reference so we can return the original function again
    listener._listener = listener;
    this.on(method, listener);
  }
};

/**
 * W3C Event
 *
 * @see http://www.w3.org/TR/DOM-Level-3-Events/#interface-Event
 * @api private
 */
function Event(type, optionalProperties) {
  Object.defineProperty(this, 'type', { writable: false, value: type, enumerable: true });
  if (optionalProperties) {
    for (var f in optionalProperties) {
      if (optionalProperties.hasOwnProperty(f)) {
        Object.defineProperty(this, f, { writable: false, value: optionalProperties[f], enumerable: true });
      }
    }
  }
}

/**
 * W3C MessageEvent
 *
 * @see http://www.w3.org/TR/webmessaging/#event-definitions
 * @api private
 */
function MessageEvent(type, eventInitDict) {
  Object.defineProperty(this, 'type', { writable: false, value: type, enumerable: true });
  for (var f in eventInitDict) {
    if (eventInitDict.hasOwnProperty(f)) {
      Object.defineProperty(this, f, { writable: false, value: eventInitDict[f], enumerable: true });
    }
  }
}
