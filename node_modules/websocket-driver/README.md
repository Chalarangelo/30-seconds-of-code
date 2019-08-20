# websocket-driver [![Build Status](https://travis-ci.org/faye/websocket-driver-node.svg)](https://travis-ci.org/faye/websocket-driver-node)

This module provides a complete implementation of the WebSocket protocols that
can be hooked up to any I/O stream. It aims to simplify things by decoupling the
protocol details from the I/O layer, such that users only need to implement code
to stream data in and out of it without needing to know anything about how the
protocol actually works. Think of it as a complete WebSocket system with
pluggable I/O.

Due to this design, you get a lot of things for free. In particular, if you hook
this module up to some I/O object, it will do all of this for you:

- Select the correct server-side driver to talk to the client
- Generate and send both server- and client-side handshakes
- Recognize when the handshake phase completes and the WS protocol begins
- Negotiate subprotocol selection based on `Sec-WebSocket-Protocol`
- Negotiate and use extensions via the
  [websocket-extensions](https://github.com/faye/websocket-extensions-node)
  module
- Buffer sent messages until the handshake process is finished
- Deal with proxies that defer delivery of the draft-76 handshake body
- Notify you when the socket is open and closed and when messages arrive
- Recombine fragmented messages
- Dispatch text, binary, ping, pong and close frames
- Manage the socket-closing handshake process
- Automatically reply to ping frames with a matching pong
- Apply masking to messages sent by the client

This library was originally extracted from the [Faye](http://faye.jcoglan.com)
project but now aims to provide simple WebSocket support for any Node-based
project.


## Installation

```
$ npm install websocket-driver
```


## Usage

This module provides protocol drivers that have the same interface on the server
and on the client. A WebSocket driver is an object with two duplex streams
attached; one for incoming/outgoing messages and one for managing the wire
protocol over an I/O stream. The full API is described below.


### Server-side with HTTP

A Node webserver emits a special event for 'upgrade' requests, and this is where
you should handle WebSockets. You first check whether the request is a
WebSocket, and if so you can create a driver and attach the request's I/O stream
to it.

```js
var http = require('http'),
    websocket = require('websocket-driver');

var server = http.createServer();

server.on('upgrade', function(request, socket, body) {
  if (!websocket.isWebSocket(request)) return;

  var driver = websocket.http(request);

  driver.io.write(body);
  socket.pipe(driver.io).pipe(socket);

  driver.messages.on('data', function(message) {
    console.log('Got a message', message);
  });

  driver.start();
});
```

Note the line `driver.io.write(body)` - you must pass the `body` buffer to the
socket driver in order to make certain versions of the protocol work.


### Server-side with TCP

You can also handle WebSocket connections in a bare TCP server, if you're not
using an HTTP server and don't want to implement HTTP parsing yourself.

The driver will emit a `connect` event when a request is received, and at this
point you can detect whether it's a WebSocket and handle it as such. Here's an
example using the Node `net` module:

```js
var net = require('net'),
    websocket = require('websocket-driver');

var server = net.createServer(function(connection) {
  var driver = websocket.server();

  driver.on('connect', function() {
    if (websocket.isWebSocket(driver)) {
      driver.start();
    } else {
      // handle other HTTP requests
    }
  });

  driver.on('close', function() { connection.end() });
  connection.on('error', function() {});

  connection.pipe(driver.io).pipe(connection);

  driver.messages.pipe(driver.messages);
});

server.listen(4180);
```

In the `connect` event, the driver gains several properties to describe the
request, similar to a Node request object, such as `method`, `url` and
`headers`. However you should remember it's not a real request object; you
cannot write data to it, it only tells you what request data we parsed from the
input.

If the request has a body, it will be in the `driver.body` buffer, but only as
much of the body as has been piped into the driver when the `connect` event
fires.


### Client-side

Similarly, to implement a WebSocket client you just need to make a driver by
passing in a URL. After this you use the driver API as described below to
process incoming data and send outgoing data.


```js
var net = require('net'),
    websocket = require('websocket-driver');

var driver = websocket.client('ws://www.example.com/socket'),
    tcp = net.connect(80, 'www.example.com');

tcp.pipe(driver.io).pipe(tcp);

tcp.on('connect', function() {
  driver.start();
});

driver.messages.on('data', function(message) {
  console.log('Got a message', message);
});
```

Client drivers have two additional properties for reading the HTTP data that was
sent back by the server:

- `driver.statusCode` - the integer value of the HTTP status code
- `driver.headers` - an object containing the response headers


### HTTP Proxies

The client driver supports connections via HTTP proxies using the `CONNECT`
method. Instead of sending the WebSocket handshake immediately, it will send a
`CONNECT` request, wait for a `200` response, and then proceed as normal.

To use this feature, call `driver.proxy(url)` where `url` is the origin of the
proxy, including a username and password if required. This produces a duplex
stream that you should pipe in and out of your TCP connection to the proxy
server. When the proxy emits `connect`, you can then pipe `driver.io` to your
TCP stream and call `driver.start()`.

```js
var net = require('net'),
    websocket = require('websocket-driver');

var driver = websocket.client('ws://www.example.com/socket'),
    proxy  = driver.proxy('http://username:password@proxy.example.com'),
    tcp    = net.connect(80, 'proxy.example.com');

tcp.pipe(proxy).pipe(tcp, { end: false });

tcp.on('connect', function() {
  proxy.start();
});

proxy.on('connect', function() {
  driver.io.pipe(tcp).pipe(driver.io);
  driver.start();
});

driver.messages.on('data', function(message) {
  console.log('Got a message', message);
});
```

The proxy's `connect` event is also where you should perform a TLS handshake on
your TCP stream, if you are connecting to a `wss:` endpoint.

In the event that proxy connection fails, `proxy` will emit an `error`. You can
inspect the proxy's response via `proxy.statusCode` and `proxy.headers`.

```js
proxy.on('error', function(error) {
  console.error(error.message);
  console.log(proxy.statusCode);
  console.log(proxy.headers);
});
```

Before calling `proxy.start()` you can set custom headers using
`proxy.setHeader()`:

```js
proxy.setHeader('User-Agent', 'node');
proxy.start();
```


### Driver API

Drivers are created using one of the following methods:

```js
driver = websocket.http(request, options)
driver = websocket.server(options)
driver = websocket.client(url, options)
```

The `http` method returns a driver chosen using the headers from a Node HTTP
request object. The `server` method returns a driver that will parse an HTTP
request and then decide which driver to use for it using the `http` method. The
`client` method always returns a driver for the RFC version of the protocol with
masking enabled on outgoing frames.

The `options` argument is optional, and is an object. It may contain the
following fields:

- `maxLength` - the maximum allowed size of incoming message frames, in bytes.
  The default value is `2^26 - 1`, or 1 byte short of 64 MiB.
- `protocols` - an array of strings representing acceptable subprotocols for use
  over the socket. The driver will negotiate one of these to use via the
  `Sec-WebSocket-Protocol` header if supported by the other peer.

A driver has two duplex streams attached to it:

- **`driver.io`** - this stream should be attached to an I/O socket like a TCP
  stream. Pipe incoming TCP chunks to this stream for them to be parsed, and
  pipe this stream back into TCP to send outgoing frames.
- **`driver.messages`** - this stream emits messages received over the
  WebSocket.  Writing to it sends messages to the other peer by emitting frames
  via the `driver.io` stream.

All drivers respond to the following API methods, but some of them are no-ops
depending on whether the client supports the behaviour.

Note that most of these methods are commands: if they produce data that should
be sent over the socket, they will give this to you by emitting `data` events on
the `driver.io` stream.

#### `driver.on('open', function(event) {})`

Adds a callback to execute when the socket becomes open.

#### `driver.on('message', function(event) {})`

Adds a callback to execute when a message is received. `event` will have a
`data` attribute containing either a string in the case of a text message or a
`Buffer` in the case of a binary message.

You can also listen for messages using the `driver.messages.on('data')` event,
which emits strings for text messages and buffers for binary messages.

#### `driver.on('error', function(event) {})`

Adds a callback to execute when a protocol error occurs due to the other peer
sending an invalid byte sequence. `event` will have a `message` attribute
describing the error.

#### `driver.on('close', function(event) {})`

Adds a callback to execute when the socket becomes closed. The `event` object
has `code` and `reason` attributes.

#### `driver.on('ping', function(event) {})`

Adds a callback block to execute when a ping is received. You do not need to
handle this by sending a pong frame yourself; the driver handles this for you.

#### `driver.on('pong', function(event) {})`

Adds a callback block to execute when a pong is received. If this was in
response to a ping you sent, you can also handle this event via the
`driver.ping(message, function() { ... })` callback.

#### `driver.addExtension(extension)`

Registers a protocol extension whose operation will be negotiated via the
`Sec-WebSocket-Extensions` header. `extension` is any extension compatible with
the [websocket-extensions](https://github.com/faye/websocket-extensions-node)
framework.

#### `driver.setHeader(name, value)`

Sets a custom header to be sent as part of the handshake response, either from
the server or from the client. Must be called before `start()`, since this is
when the headers are serialized and sent.

#### `driver.start()`

Initiates the protocol by sending the handshake - either the response for a
server-side driver or the request for a client-side one. This should be the
first method you invoke.  Returns `true` if and only if a handshake was sent.

#### `driver.parse(string)`

Takes a string and parses it, potentially resulting in message events being
emitted (see `on('message')` above) or in data being sent to `driver.io`.  You
should send all data you receive via I/O to this method by piping a stream into
`driver.io`.

#### `driver.text(string)`

Sends a text message over the socket. If the socket handshake is not yet
complete, the message will be queued until it is. Returns `true` if the message
was sent or queued, and `false` if the socket can no longer send messages.

This method is equivalent to `driver.messages.write(string)`.

#### `driver.binary(buffer)`

Takes a `Buffer` and sends it as a binary message. Will queue and return `true`
or `false` the same way as the `text` method. It will also return `false` if the
driver does not support binary messages.

This method is equivalent to `driver.messages.write(buffer)`.

#### `driver.ping(string = '', function() {})`

Sends a ping frame over the socket, queueing it if necessary. `string` and the
callback are both optional. If a callback is given, it will be invoked when the
socket receives a pong frame whose content matches `string`. Returns `false` if
frames can no longer be sent, or if the driver does not support ping/pong.

#### `driver.pong(string = '')`

Sends a pong frame over the socket, queueing it if necessary. `string` is
optional. Returns `false` if frames can no longer be sent, or if the driver does
not support ping/pong.

You don't need to call this when a ping frame is received; pings are replied to
automatically by the driver. This method is for sending unsolicited pongs.

#### `driver.close()`

Initiates the closing handshake if the socket is still open. For drivers with no
closing handshake, this will result in the immediate execution of the
`on('close')` driver. For drivers with a closing handshake, this sends a closing
frame and `emit('close')` will execute when a response is received or a protocol
error occurs.

#### `driver.version`

Returns the WebSocket version in use as a string. Will either be `hixie-75`,
`hixie-76` or `hybi-$version`.

#### `driver.protocol`

Returns a string containing the selected subprotocol, if any was agreed upon
using the `Sec-WebSocket-Protocol` mechanism. This value becomes available after
`emit('open')` has fired.
