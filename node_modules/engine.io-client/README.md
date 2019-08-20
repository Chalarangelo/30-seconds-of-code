
# Engine.IO client

[![Build Status](https://travis-ci.org/socketio/engine.io-client.svg?branch=master)](http://travis-ci.org/socketio/engine.io-client)
[![NPM version](https://badge.fury.io/js/engine.io-client.svg)](http://badge.fury.io/js/engine.io-client)

This is the client for [Engine.IO](http://github.com/socketio/engine.io),
the implementation of transport-based cross-browser/cross-device
bi-directional communication layer for [Socket.IO](http://github.com/socketio/socket.io).

## How to use

### Standalone

You can find an `engine.io.js` file in this repository, which is a
standalone build you can use as follows:

```html
<script src="/path/to/engine.io.js"></script>
<script>
  // eio = Socket
  var socket = eio('ws://localhost');
  socket.on('open', function(){
    socket.on('message', function(data){});
    socket.on('close', function(){});
  });
</script>
```

### With browserify

Engine.IO is a commonjs module, which means you can include it by using
`require` on the browser and package using [browserify](http://browserify.org/):

1. install the client package

    ```bash
    $ npm install engine.io-client
    ```

1. write your app code

    ```js
    var socket = require('engine.io-client')('ws://localhost');
    socket.on('open', function(){
      socket.on('message', function(data){});
      socket.on('close', function(){});
    });
    ```

1. build your app bundle

    ```bash
    $ browserify app.js > bundle.js
    ```

1. include on your page

    ```html
    <script src="/path/to/bundle.js"></script>
    ```

### Sending and receiving binary

```html
<script src="/path/to/engine.io.js"></script>
<script>
  var socket = new eio.Socket('ws://localhost/');
  socket.binaryType = 'blob';
  socket.on('open', function () {
    socket.send(new Int8Array(5));
    socket.on('message', function(blob){});
    socket.on('close', function(){ });
  });
</script>
```

### Node.JS

Add `engine.io-client` to your `package.json` and then:

```js
var socket = require('engine.io-client')('ws://localhost');
socket.on('open', function(){
  socket.on('message', function(data){});
  socket.on('close', function(){});
});
```

### Node.js with certificates
```js
var opts = {
  key: fs.readFileSync('test/fixtures/client.key'),
  cert: fs.readFileSync('test/fixtures/client.crt'),
  ca: fs.readFileSync('test/fixtures/ca.crt')
};

var socket = require('engine.io-client')('ws://localhost', opts);
socket.on('open', function(){
  socket.on('message', function(data){});
  socket.on('close', function(){});
});
```

### Node.js with extraHeaders
```js
var opts = {
  extraHeaders: {
    'X-Custom-Header-For-My-Project': 'my-secret-access-token',
    'Cookie': 'user_session=NI2JlCKF90aE0sJZD9ZzujtdsUqNYSBYxzlTsvdSUe35ZzdtVRGqYFr0kdGxbfc5gUOkR9RGp20GVKza; path=/; expires=Tue, 07-Apr-2015 18:18:08 GMT; secure; HttpOnly'
  }
};

var socket = require('engine.io-client')('ws://localhost', opts);
socket.on('open', function(){
  socket.on('message', function(data){});
  socket.on('close', function(){});
});
```

## Features

- Lightweight
- Runs on browser and node.js seamlessly
- Transports are independent of `Engine`
  - Easy to debug
  - Easy to unit test
- Runs inside HTML5 WebWorker
- Can send and receive binary data
  - Receives as ArrayBuffer or Blob when in browser, and Buffer or ArrayBuffer
    in Node
  - When XHR2 or WebSockets are used, binary is emitted directly. Otherwise
    binary is encoded into base64 strings, and decoded when binary types are
    supported.
  - With browsers that don't support ArrayBuffer, an object { base64: true,
    data: dataAsBase64String } is emitted on the `message` event.

## API

### Socket

The client class. Mixes in [Emitter](http://github.com/component/emitter).
Exposed as `eio` in the browser standalone build.

#### Properties

- `protocol` _(Number)_: protocol revision number
- `binaryType` _(String)_ : can be set to 'arraybuffer' or 'blob' in browsers,
  and `buffer` or `arraybuffer` in Node. Blob is only used in browser if it's
  supported.

#### Events

- `open`
  - Fired upon successful connection.
- `message`
  - Fired when data is received from the server.
  - **Arguments**
    - `String` | `ArrayBuffer`: utf-8 encoded data or ArrayBuffer containing
      binary data
- `close`
  - Fired upon disconnection. In compliance with the WebSocket API spec, this event may be
    fired even if the `open` event does not occur (i.e. due to connection error or `close()`).
- `error`
  - Fired when an error occurs.
- `flush`
  - Fired upon completing a buffer flush
- `drain`
  - Fired after `drain` event of transport if writeBuffer is empty
- `upgradeError`
  - Fired if an error occurs with a transport we're trying to upgrade to.
- `upgrade`
  - Fired upon upgrade success, after the new transport is set
- `ping`
  - Fired upon _flushing_ a ping packet (ie: actual packet write out)
- `pong`
  - Fired upon receiving a pong packet.

#### Methods

- **constructor**
    - Initializes the client
    - **Parameters**
      - `String` uri
      - `Object`: optional, options object
    - **Options**
      - `agent` (`http.Agent`): `http.Agent` to use, defaults to `false` (NodeJS only)
      - `upgrade` (`Boolean`): defaults to true, whether the client should try
      to upgrade the transport from long-polling to something better.
      - `forceJSONP` (`Boolean`): forces JSONP for polling transport.
      - `jsonp` (`Boolean`): determines whether to use JSONP when
        necessary for polling. If disabled (by settings to false) an error will
        be emitted (saying "No transports available") if no other transports
        are available. If another transport is available for opening a
        connection (e.g. WebSocket) that transport
        will be used instead.
      - `forceBase64` (`Boolean`): forces base 64 encoding for polling transport even when XHR2 responseType is available and WebSocket even if the used standard supports binary.
      - `enablesXDR` (`Boolean`): enables XDomainRequest for IE8 to avoid loading bar flashing with click sound. default to `false` because XDomainRequest has a flaw of not sending cookie.
      - `timestampRequests` (`Boolean`): whether to add the timestamp with each
        transport request. Note: polling requests are always stamped unless this
        option is explicitly set to `false` (`false`)
      - `timestampParam` (`String`): timestamp parameter (`t`)
      - `policyPort` (`Number`): port the policy server listens on (`843`)
      - `path` (`String`): path to connect to, default is `/engine.io`
      - `transports` (`Array`): a list of transports to try (in order).
      Defaults to `['polling', 'websocket']`. `Engine`
      always attempts to connect directly with the first one, provided the
      feature detection test for it passes.
      - `transportOptions` (`Object`): hash of options, indexed by transport name, overriding the common options for the given transport
      - `rememberUpgrade` (`Boolean`): defaults to false.
        If true and if the previous websocket connection to the server succeeded,
        the connection attempt will bypass the normal upgrade process and will initially
        try websocket. A connection attempt following a transport error will use the
        normal upgrade process. It is recommended you turn this on only when using
        SSL/TLS connections, or if you know that your network does not block websockets.
      - `pfx` (`String`|`Buffer`): Certificate, Private key and CA certificates to use for SSL. Can be used in Node.js client environment to manually specify certificate information.
      - `key` (`String`): Private key to use for SSL. Can be used in Node.js client environment to manually specify certificate information.
      - `passphrase` (`String`): A string of passphrase for the private key or pfx. Can be used in Node.js client environment to manually specify certificate information.
      - `cert` (`String`): Public x509 certificate to use. Can be used in Node.js client environment to manually specify certificate information.
      - `ca` (`String`|`Array`): An authority certificate or array of authority certificates to check the remote host against.. Can be used in Node.js client environment to manually specify certificate information.
      - `ciphers` (`String`): A string describing the ciphers to use or exclude. Consult the [cipher format list](http://www.openssl.org/docs/apps/ciphers.html#CIPHER_LIST_FORMAT) for details on the format. Can be used in Node.js client environment to manually specify certificate information.
      - `rejectUnauthorized` (`Boolean`): If true, the server certificate is verified against the list of supplied CAs. An 'error' event is emitted if verification fails. Verification happens at the connection level, before the HTTP request is sent. Can be used in Node.js client environment to manually specify certificate information.
      - `perMessageDeflate` (`Object|Boolean`): parameters of the WebSocket permessage-deflate extension
        (see [ws module](https://github.com/einaros/ws) api docs). Set to `false` to disable. (`true`)
        - `threshold` (`Number`): data is compressed only if the byte size is above this value. This option is ignored on the browser. (`1024`)
      - `extraHeaders` (`Object`): Headers that will be passed for each request to the server (via xhr-polling and via websockets). These values then can be used during handshake or for special proxies. Can only be used in Node.js client environment.
      - `onlyBinaryUpgrades` (`Boolean`): whether transport upgrades should be restricted to transports supporting binary data (`false`)
      - `forceNode` (`Boolean`): Uses NodeJS implementation for websockets - even if there is a native Browser-Websocket available, which is preferred by default over the NodeJS implementation. (This is useful when using hybrid platforms like nw.js or electron) (`false`, NodeJS only)
      - `localAddress` (`String`): the local IP address to connect to
    - **Polling-only options**
      - `requestTimeout` (`Number`): Timeout for xhr-polling requests in milliseconds (`0`)
    - **Websocket-only options**
      - `protocols` (`Array`): a list of subprotocols (see [MDN reference](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#Subprotocols))
- `send`
    - Sends a message to the server
    - **Parameters**
      - `String` | `ArrayBuffer` | `ArrayBufferView` | `Blob`: data to send
      - `Object`: optional, options object
      - `Function`: optional, callback upon `drain`
    - **Options**
      - `compress` (`Boolean`): whether to compress sending data. This option is ignored and forced to be `true` on the browser. (`true`)
- `close`
    - Disconnects the client.

### Transport

The transport class. Private. _Inherits from EventEmitter_.

#### Events

- `poll`: emitted by polling transports upon starting a new request
- `pollComplete`: emitted by polling transports upon completing a request
- `drain`: emitted by polling transports upon a buffer drain

## Tests

`engine.io-client` is used to test
[engine](http://github.com/socketio/engine.io). Running the `engine.io`
test suite ensures the client works and vice-versa.

Browser tests are run using [zuul](https://github.com/defunctzombie/zuul). You can
run the tests locally using the following command.

```
./node_modules/.bin/zuul --local 8080 -- test/index.js
```

Additionally, `engine.io-client` has a standalone test suite you can run
with `make test` which will run node.js and browser tests. You must have zuul setup with
a saucelabs account.

## Support

The support channels for `engine.io-client` are the same as `socket.io`:
  - irc.freenode.net **#socket.io**
  - [Google Groups](http://groups.google.com/group/socket_io)
  - [Website](http://socket.io)

## Development

To contribute patches, run tests or benchmarks, make sure to clone the
repository:

```bash
git clone git://github.com/socketio/engine.io-client.git
```

Then:

```bash
cd engine.io-client
npm install
```

See the `Tests` section above for how to run tests before submitting any patches.

## License

MIT - Copyright (c) 2014 Automattic, Inc.
