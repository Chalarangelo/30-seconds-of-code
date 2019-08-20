# SPDY Server for node.js

[![Build Status](https://travis-ci.org/spdy-http2/node-spdy.svg?branch=master)](http://travis-ci.org/spdy-http2/node-spdy)
[![NPM version](https://badge.fury.io/js/spdy.svg)](http://badge.fury.io/js/spdy)
[![dependencies Status](https://david-dm.org/spdy-http2/node-spdy/status.svg?style=flat-square)](https://david-dm.org/spdy-http2/node-spdy)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)
[![Waffle](https://img.shields.io/badge/track-waffle-blue.svg?style=flat-square)](https://waffle.io/spdy-http2/node-spdy)

With this module you can create [HTTP2][0] / [SPDY][1] servers
in node.js with natural http module interface and fallback to regular https
(for browsers that don't support neither HTTP2, nor SPDY yet).

This module named `spdy` but it [provides](https://github.com/indutny/node-spdy/issues/269#issuecomment-239014184) support for both http/2 (h2) and spdy (2,3,3.1). Also, `spdy` is compatible with Express.

## Usage

### Examples

Server:
```javascript
var spdy = require('spdy'),
    fs = require('fs');

var options = {
  // Private key
  key: fs.readFileSync(__dirname + '/keys/spdy-key.pem'),

  // Fullchain file or cert file (prefer the former)
  cert: fs.readFileSync(__dirname + '/keys/spdy-fullchain.pem'),

  // **optional** SPDY-specific options
  spdy: {
    protocols: [ 'h2', 'spdy/3.1', ..., 'http/1.1' ],
    plain: false,

    // **optional**
    // Parse first incoming X_FORWARDED_FOR frame and put it to the
    // headers of every request.
    // NOTE: Use with care! This should not be used without some proxy that
    // will *always* send X_FORWARDED_FOR
    'x-forwarded-for': true,

    connection: {
      windowSize: 1024 * 1024, // Server's window size

      // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
      autoSpdy31: false
    }
  }
};

var server = spdy.createServer(options, function(req, res) {
  res.writeHead(200);
  res.end('hello world!');
});

server.listen(3000);
```

Client:
```javascript
var spdy = require('spdy');
var https = require('https');

var agent = spdy.createAgent({
  host: 'www.google.com',
  port: 443,

  // Optional SPDY options
  spdy: {
    plain: false,
    ssl: true,

    // **optional** send X_FORWARDED_FOR
    'x-forwarded-for': '127.0.0.1'
  }
});

https.get({
  host: 'www.google.com',
  agent: agent
}, function(response) {
  console.log('yikes');
  // Here it goes like with any other node.js HTTP request
  // ...
  // And once we're done - we may close TCP connection to server
  // NOTE: All non-closed requests will die!
  agent.close();
}).end();
```

Please note that if you use a custom agent, by default all connection-level
errors will result in an uncaught exception. To handle these errors subscribe
to the `error` event and re-emit the captured error:

```javascript
var agent = spdy.createAgent({
  host: 'www.google.com',
  port: 443
}).once('error', function (err) {
  this.emit(err);
});
```

#### Push streams

It is possible to initiate [PUSH_PROMISE][5] to send content to clients _before_
the client requests it.

```javascript
spdy.createServer(options, function(req, res) {
  var stream = res.push('/main.js', {
    status: 200, // optional
    method: 'GET', // optional
    request: {
      accept: '*/*'
    },
    response: {
      'content-type': 'application/javascript'
    }
  });
  stream.on('error', function() {
  });
  stream.end('alert("hello from push stream!");');

  res.end('<script src="/main.js"></script>');
}).listen(3000);
```

[PUSH_PROMISE][5] may be sent using the `push()` method on the current response
object.  The signature of the `push()` method is:

`.push('/some/relative/url', { request: {...}, response: {...} }, callback)`

Second argument contains headers for both PUSH_PROMISE and emulated response.
`callback` will receive two arguments: `err` (if any error is happened) and a
[Duplex][4] stream as the second argument.

Client usage:
```javascript
var agent = spdy.createAgent({ /* ... */ });
var req = http.get({
  host: 'www.google.com',
  agent: agent
}, function(response) {
});
req.on('push', function(stream) {
  stream.on('error', function(err) {
    // Handle error
  });
  // Read data from stream
});
```

NOTE: You're responsible for the `stream` object once given it in `.push()`
callback or `push` event. Hence ignoring `error` event on it will result in
uncaught exception and crash your program.

#### Trailing headers

Server usage:
```javascript
function (req, res) {
  // Send trailing headers to client
  res.addTrailers({ header1: 'value1', header2: 'value2' });

  // On client's trailing headers
  req.on('trailers', function(headers) {
    // ...
  });
}
```

Client usage:
```javascript
var req = http.request({ agent: spdyAgent, /* ... */ }).function (res) {
  // On server's trailing headers
  res.on('trailers', function(headers) {
    // ...
  });
});
req.write('stuff');
req.addTrailers({ /* ... */ });
req.end();
```

#### Options

All options supported by [tls][2] work with node-spdy.

Additional options may be passed via `spdy` sub-object:

* `plain` - if defined, server will ignore NPN and ALPN data and choose whether
  to use spdy or plain http by looking at first data packet.
* `ssl` - if `false` and `options.plain` is `true`, `http.Server` will be used
  as a `base` class for created server.
* `maxChunk` - if set and non-falsy, limits number of bytes sent in one DATA
  chunk. Setting it to non-zero value is recommended if you care about
  interleaving of outgoing data from multiple different streams.
  (defaults to 8192)
* `protocols` - list of NPN/ALPN protocols to use (default is:
  `['h2','spdy/3.1', 'spdy/3', 'spdy/2','http/1.1', 'http/1.0']`)
* `protocol` - use specific protocol if no NPN/ALPN ex In addition,
* `maxStreams` - set "[maximum concurrent streams][3]" protocol option

### API

API is compatible with `http` and `https` module, but you can use another
function as base class for SPDYServer.

```javascript
spdy.createServer(
  [base class constructor, i.e. https.Server],
  { /* keys and options */ }, // <- the only one required argument
  [request listener]
).listen([port], [host], [callback]);
```

Request listener will receive two arguments: `request` and `response`. They're
both instances of `http`'s `IncomingMessage` and `OutgoingMessage`. But three
custom properties are added to both of them: `isSpdy`, `spdyVersion`. `isSpdy`
is `true` when the request was processed using HTTP2/SPDY protocols, it is
`false` in case of HTTP/1.1 fallback. `spdyVersion` is either of: `2`, `3`,
`3.1`, or `4` (for HTTP2).


#### Contributors

* [Fedor Indutny](https://github.com/indutny)
* [Chris Strom](https://github.com/eee-c)
* [François de Metz](https://github.com/francois2metz)
* [Ilya Grigorik](https://github.com/igrigorik)
* [Roberto Peon](https://github.com/grmocg)
* [Tatsuhiro Tsujikawa](https://github.com/tatsuhiro-t)
* [Jesse Cravens](https://github.com/jessecravens)

#### LICENSE

This software is licensed under the MIT License.

Copyright Fedor Indutny, 2015.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.

[0]: https://http2.github.io/
[1]: http://www.chromium.org/spdy
[2]: http://nodejs.org/docs/latest/api/tls.html#tls.createServer
[3]: https://httpwg.github.io/specs/rfc7540.html#SETTINGS_MAX_CONCURRENT_STREAMS
[4]: https://iojs.org/api/stream.html#stream_class_stream_duplex
[5]: https://httpwg.github.io/specs/rfc7540.html#PUSH_PROMISE
