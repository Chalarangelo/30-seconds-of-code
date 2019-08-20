# faye-websocket

* Travis CI build: [![Build
  status](https://secure.travis-ci.org/faye/faye-websocket-node.svg)](http://travis-ci.org/faye/faye-websocket-node)
* Autobahn tests: [server](http://faye.jcoglan.com/autobahn/servers/),
  [client](http://faye.jcoglan.com/autobahn/clients/)

This is a general-purpose WebSocket implementation extracted from the
[Faye](http://faye.jcoglan.com) project. It provides classes for easily building
WebSocket servers and clients in Node. It does not provide a server itself, but
rather makes it easy to handle WebSocket connections within an existing
[Node](http://nodejs.org/) application. It does not provide any abstraction
other than the standard [WebSocket API](http://dev.w3.org/html5/websockets/).

It also provides an abstraction for handling
[EventSource](http://dev.w3.org/html5/eventsource/) connections, which are
one-way connections that allow the server to push data to the client. They are
based on streaming HTTP responses and can be easier to access via proxies than
WebSockets.


## Installation

```
$ npm install faye-websocket
```


## Handling WebSocket connections in Node

You can handle WebSockets on the server side by listening for HTTP Upgrade
requests, and creating a new socket for the request. This socket object exposes
the usual WebSocket methods for receiving and sending messages. For example this
is how you'd implement an echo server:

```js
var WebSocket = require('faye-websocket'),
    http      = require('http');

var server = http.createServer();

server.on('upgrade', function(request, socket, body) {
  if (WebSocket.isWebSocket(request)) {
    var ws = new WebSocket(request, socket, body);
    
    ws.on('message', function(event) {
      ws.send(event.data);
    });
    
    ws.on('close', function(event) {
      console.log('close', event.code, event.reason);
      ws = null;
    });
  }
});

server.listen(8000);
```

`WebSocket` objects are also duplex streams, so you could replace the
`ws.on('message', ...)` line with:

```js
    ws.pipe(ws);
```

Note that under certain circumstances (notably a draft-76 client connecting
through an HTTP proxy), the WebSocket handshake will not be complete after you
call `new WebSocket()` because the server will not have received the entire
handshake from the client yet. In this case, calls to `ws.send()` will buffer
the message in memory until the handshake is complete, at which point any
buffered messages will be sent to the client.

If you need to detect when the WebSocket handshake is complete, you can use the
`onopen` event.

If the connection's protocol version supports it, you can call `ws.ping()` to
send a ping message and wait for the client's response. This method takes a
message string, and an optional callback that fires when a matching pong message
is received. It returns `true` if and only if a ping message was sent. If the
client does not support ping/pong, this method sends no data and returns
`false`.

```js
ws.ping('Mic check, one, two', function() {
  // fires when pong is received
});
```


## Using the WebSocket client

The client supports both the plain-text `ws` protocol and the encrypted `wss`
protocol, and has exactly the same interface as a socket you would use in a web
browser. On the wire it identifies itself as `hybi-13`.

```js
var WebSocket = require('faye-websocket'),
    ws        = new WebSocket.Client('ws://www.example.com/');

ws.on('open', function(event) {
  console.log('open');
  ws.send('Hello, world!');
});

ws.on('message', function(event) {
  console.log('message', event.data);
});

ws.on('close', function(event) {
  console.log('close', event.code, event.reason);
  ws = null;
});
```

The WebSocket client also lets you inspect the status and headers of the
handshake response via its `statusCode` and `headers` properties.

To connect via a proxy, set the `proxy` option to the HTTP origin of the proxy,
including any authorization information, custom headers and TLS config you
require. Only the `origin` setting is required.

```js
var ws = new WebSocket.Client('ws://www.example.com/', [], {
  proxy: {
    origin:  'http://username:password@proxy.example.com',
    headers: {'User-Agent': 'node'},
    tls:     {cert: fs.readFileSync('client.crt')}
  }
});
```

The `tls` value is a Node 'TLS options' object that will be passed to
[`tls.connect()`](http://nodejs.org/api/tls.html#tls_tls_connect_options_callback).


## Subprotocol negotiation

The WebSocket protocol allows peers to select and identify the application
protocol to use over the connection. On the client side, you can set which
protocols the client accepts by passing a list of protocol names when you
construct the socket:

```js
var ws = new WebSocket.Client('ws://www.example.com/', ['irc', 'amqp']);
```

On the server side, you can likewise pass in the list of protocols the server
supports after the other constructor arguments:

```js
var ws = new WebSocket(request, socket, body, ['irc', 'amqp']);
```

If the client and server agree on a protocol, both the client- and server-side
socket objects expose the selected protocol through the `ws.protocol` property.


## Protocol extensions

faye-websocket is based on the
[websocket-extensions](https://github.com/faye/websocket-extensions-node)
framework that allows extensions to be negotiated via the
`Sec-WebSocket-Extensions` header. To add extensions to a connection, pass an
array of extensions to the `:extensions` option. For example, to add
[permessage-deflate](https://github.com/faye/permessage-deflate-node):

```js
var deflate = require('permessage-deflate');

var ws = new WebSocket(request, socket, body, [], {extensions: [deflate]});
```


## Initialization options

Both the server- and client-side classes allow an options object to be passed in
at initialization time, for example:

```js
var ws = new WebSocket(request, socket, body, protocols, options);
var ws = new WebSocket.Client(url, protocols, options);
```

`protocols` is an array of subprotocols as described above, or `null`.
`options` is an optional object containing any of these fields:

* `extensions` - an array of
  [websocket-extensions](https://github.com/faye/websocket-extensions-node)
  compatible extensions, as described above
* `headers` - an object containing key-value pairs representing HTTP headers to
  be sent during the handshake process
* `maxLength` - the maximum allowed size of incoming message frames, in bytes.
  The default value is `2^26 - 1`, or 1 byte short of 64 MiB.
* `ping` - an integer that sets how often the WebSocket should send ping frames,
  measured in seconds

The client accepts some additional options:

* `proxy` - settings for a proxy as described above
* `tls` - a Node 'TLS options' object containing TLS settings for the origin
  server, this will be passed to
  [`tls.connect()`](http://nodejs.org/api/tls.html#tls_tls_connect_options_callback)
* `ca` - (legacy) a shorthand for passing `{tls: {ca: value}}`


## WebSocket API

Both server- and client-side `WebSocket` objects support the following API.

* <b>`on('open', function(event) {})`</b> fires when the socket connection is
  established. Event has no attributes.
* <b>`on('message', function(event) {})`</b> fires when the socket receives a
  message. Event has one attribute, <b>`data`</b>, which is either a `String`
  (for text frames) or a `Buffer` (for binary frames).
* <b>`on('error', function(event) {})`</b> fires when there is a protocol error
  due to bad data sent by the other peer. This event is purely informational,
  you do not need to implement error recover.
* <b>`on('close', function(event) {})`</b> fires when either the client or the
  server closes the connection. Event has two optional attributes, <b>`code`</b>
  and <b>`reason`</b>, that expose the status code and message sent by the peer
  that closed the connection.
* <b>`send(message)`</b> accepts either a `String` or a `Buffer` and sends a
  text or binary message over the connection to the other peer.
* <b>`ping(message, function() {})`</b> sends a ping frame with an optional
  message and fires the callback when a matching pong is received.
* <b>`close(code, reason)`</b> closes the connection, sending the given status
  code and reason text, both of which are optional.
* <b>`version`</b> is a string containing the version of the `WebSocket`
  protocol the connection is using.
* <b>`protocol`</b> is a string (which may be empty) identifying the subprotocol
  the socket is using.


## Handling EventSource connections in Node

EventSource connections provide a very similar interface, although because they
only allow the server to send data to the client, there is no `onmessage` API.
EventSource allows the server to push text messages to the client, where each
message has an optional event-type and ID.

```js
var WebSocket   = require('faye-websocket'),
    EventSource = WebSocket.EventSource,
    http        = require('http');

var server = http.createServer();

server.on('request', function(request, response) {
  if (EventSource.isEventSource(request)) {
    var es = new EventSource(request, response);
    console.log('open', es.url, es.lastEventId);
    
    // Periodically send messages
    var loop = setInterval(function() { es.send('Hello') }, 1000);
    
    es.on('close', function() {
      clearInterval(loop);
      es = null;
    });
  
  } else {
    // Normal HTTP request
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end('Hello');
  }
});

server.listen(8000);
```

The `send` method takes two optional parameters, `event` and `id`. The default
event-type is `'message'` with no ID. For example, to send a `notification`
event with ID `99`:

```js
es.send('Breaking News!', {event: 'notification', id: '99'});
```

The `EventSource` object exposes the following properties:

* <b>`url`</b> is a string containing the URL the client used to create the
  EventSource.
* <b>`lastEventId`</b> is a string containing the last event ID received by the
  client. You can use this when the client reconnects after a dropped connection
  to determine which messages need resending.

When you initialize an EventSource with ` new EventSource()`, you can pass
configuration options after the `response` parameter. Available options are:

* <b>`headers`</b> is an object containing custom headers to be set on the
  EventSource response.
* <b>`retry`</b> is a number that tells the client how long (in seconds) it
  should wait after a dropped connection before attempting to reconnect.
* <b>`ping`</b> is a number that tells the server how often (in seconds) to send
  'ping' packets to the client to keep the connection open, to defeat timeouts
  set by proxies. The client will ignore these messages.

For example, this creates a connection that allows access from any origin, pings
every 15 seconds and is retryable every 10 seconds if the connection is broken:

```js
var es = new EventSource(request, response, {
  headers: {'Access-Control-Allow-Origin': '*'},
  ping:    15,
  retry:   10
});
```

You can send a ping message at any time by calling `es.ping()`. Unlike
WebSocket, the client does not send a response to this; it is merely to send
some data over the wire to keep the connection alive.


## License

(The MIT License)

Copyright (c) 2010-2015 James Coglan

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the 'Software'), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
