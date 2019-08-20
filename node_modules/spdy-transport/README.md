# spdy-transport

[![Build Status](https://travis-ci.org/spdy-http2/spdy-transport.svg?branch=master)](http://travis-ci.org/spdy-http2/spdy-transport)
[![NPM version](https://badge.fury.io/js/spdy-transport.svg)](http://badge.fury.io/js/spdy-transport)
[![dependencies Status](https://david-dm.org/spdy-http2/spdy-transport/status.svg?style=flat-square)](https://david-dm.org/spdy-http2/spdy-transport)
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)
[![Waffle](https://img.shields.io/badge/track-waffle-blue.svg?style=flat-square)](https://waffle.io/spdy-http2/node-spdy)

> SPDY/HTTP2 generic transport implementation.

## Usage

```javascript
var transport = require('spdy-transport');

// NOTE: socket is some stream or net.Socket instance, may be an argument
// of `net.createServer`'s connection handler.

var server = transport.connection.create(socket, {
  protocol: 'http2',
  isServer: true
});

server.on('stream', function(stream) {
  console.log(stream.method, stream.path, stream.headers);
  stream.respond(200, {
    header: 'value'
  });

  stream.on('readable', function() {
    var chunk = stream.read();
    if (!chunk)
      return;

    console.log(chunk);
  });

  stream.on('end', function() {
    console.log('end');
  });

  // And other node.js Stream APIs
  // ...
});
```

## LICENSE

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

[0]: http://json.org/
[1]: http://github.com/indutny/bud-backend
[2]: https://github.com/nodejs/io.js
[3]: https://github.com/libuv/libuv
[4]: http://openssl.org/
