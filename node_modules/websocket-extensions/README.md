# websocket-extensions [![Build status](https://secure.travis-ci.org/faye/websocket-extensions-node.svg)](http://travis-ci.org/faye/websocket-extensions-node)

A minimal framework that supports the implementation of WebSocket extensions in
a way that's decoupled from the main protocol. This library aims to allow a
WebSocket extension to be written and used with any protocol library, by
defining abstract representations of frames and messages that allow modules to
co-operate.

`websocket-extensions` provides a container for registering extension plugins,
and provides all the functions required to negotiate which extensions to use
during a session via the `Sec-WebSocket-Extensions` header. By implementing the
APIs defined in this document, an extension may be used by any WebSocket library
based on this framework.

## Installation

```
$ npm install websocket-extensions
```

## Usage

There are two main audiences for this library: authors implementing the
WebSocket protocol, and authors implementing extensions. End users of a
WebSocket library or an extension should be able to use any extension by passing
it as an argument to their chosen protocol library, without needing to know how
either of them work, or how the `websocket-extensions` framework operates.

The library is designed with the aim that any protocol implementation and any
extension can be used together, so long as they support the same abstract
representation of frames and messages.

### Data types

The APIs provided by the framework rely on two data types; extensions will
expect to be given data and to be able to return data in these formats:

#### *Frame*

*Frame* is a structure representing a single WebSocket frame of any type. Frames
are simple objects that must have at least the following properties, which
represent the data encoded in the frame:

| property     | description                                                        |
| ------------ | ------------------------------------------------------------------ |
| `final`      | `true` if the `FIN` bit is set, `false` otherwise                  |
| `rsv1`       | `true` if the `RSV1` bit is set, `false` otherwise                 |
| `rsv2`       | `true` if the `RSV2` bit is set, `false` otherwise                 |
| `rsv3`       | `true` if the `RSV3` bit is set, `false` otherwise                 |
| `opcode`     | the numeric opcode (`0`, `1`, `2`, `8`, `9`, or `10`) of the frame |
| `masked`     | `true` if the `MASK` bit is set, `false` otherwise                 |
| `maskingKey` | a 4-byte `Buffer` if `masked` is `true`, otherwise `null`          |
| `payload`    | a `Buffer` containing the (unmasked) application data              |

#### *Message*

A *Message* represents a complete application message, which can be formed from
text, binary and continuation frames. It has the following properties:

| property | description                                                       |
| -------- | ----------------------------------------------------------------- |
| `rsv1`   | `true` if the first frame of the message has the `RSV1` bit set   |
| `rsv2`   | `true` if the first frame of the message has the `RSV2` bit set   |
| `rsv3`   | `true` if the first frame of the message has the `RSV3` bit set   |
| `opcode` | the numeric opcode (`1` or `2`) of the first frame of the message |
| `data`   | the concatenation of all the frame payloads in the message        |

### For driver authors

A driver author is someone implementing the WebSocket protocol proper, and who
wishes end users to be able to use WebSocket extensions with their library.

At the start of a WebSocket session, on both the client and the server side,
they should begin by creating an extension container and adding whichever
extensions they want to use.

```js
var Extensions = require('websocket-extensions'),
    deflate    = require('permessage-deflate');

var exts = new Extensions();
exts.add(deflate);
```

In the following examples, `exts` refers to this `Extensions` instance.

#### Client sessions

Clients will use the methods `generateOffer()` and `activate(header)`.

As part of the handshake process, the client must send a
`Sec-WebSocket-Extensions` header to advertise that it supports the registered
extensions. This header should be generated using:

```js
request.headers['sec-websocket-extensions'] = exts.generateOffer();
```

This returns a string, for example `"permessage-deflate;
client_max_window_bits"`, that represents all the extensions the client is
offering to use, and their parameters. This string may contain multiple offers
for the same extension.

When the client receives the handshake response from the server, it should pass
the incoming `Sec-WebSocket-Extensions` header in to `exts` to activate the
extensions the server has accepted:

```js
exts.activate(response.headers['sec-websocket-extensions']);
```

If the server has sent any extension responses that the client does not
recognize, or are in conflict with one another for use of RSV bits, or that use
invalid parameters for the named extensions, then `exts.activate()` will
`throw`. In this event, the client driver should fail the connection with
closing code `1010`.

#### Server sessions

Servers will use the method `generateResponse(header)`.

A server session needs to generate a `Sec-WebSocket-Extensions` header to send
in its handshake response:

```js
var clientOffer = request.headers['sec-websocket-extensions'],
    extResponse = exts.generateResponse(clientOffer);

response.headers['sec-websocket-extensions'] = extResponse;
```

Calling `exts.generateResponse(header)` activates those extensions the client
has asked to use, if they are registered, asks each extension for a set of
response parameters, and returns a string containing the response parameters for
all accepted extensions.

#### In both directions

Both clients and servers will use the methods `validFrameRsv(frame)`,
`processIncomingMessage(message)` and `processOutgoingMessage(message)`.

The WebSocket protocol requires that frames do not have any of the `RSV` bits
set unless there is an extension in use that allows otherwise. When processing
an incoming frame, sessions should pass a *Frame* object to:

```js
exts.validFrameRsv(frame)
```

If this method returns `false`, the session should fail the WebSocket connection
with closing code `1002`.

To pass incoming messages through the extension stack, a session should
construct a *Message* object according to the above datatype definitions, and
call:

```js
exts.processIncomingMessage(message, function(error, msg) {
  // hand the message off to the application
});
```

If any extensions fail to process the message, then the callback will yield an
error and the session should fail the WebSocket connection with closing code
`1010`. If `error` is `null`, then `msg` should be passed on to the application.

To pass outgoing messages through the extension stack, a session should
construct a *Message* as before, and call:

```js
exts.processOutgoingMessage(message, function(error, msg) {
  // write message to the transport
});
```

If any extensions fail to process the message, then the callback will yield an
error and the session should fail the WebSocket connection with closing code
`1010`. If `error` is `null`, then `message` should be converted into frames
(with the message's `rsv1`, `rsv2`, `rsv3` and `opcode` set on the first frame)
and written to the transport.

At the end of the WebSocket session (either when the protocol is explicitly
ended or the transport connection disconnects), the driver should call:

```js
exts.close(function() {})
```

The callback is invoked when all extensions have finished processing any
messages in the pipeline and it's safe to close the socket.

### For extension authors

An extension author is someone implementing an extension that transforms
WebSocket messages passing between the client and server. They would like to
implement their extension once and have it work with any protocol library.

Extension authors will not install `websocket-extensions` or call it directly.
Instead, they should implement the following API to allow their extension to
plug into the `websocket-extensions` framework.

An `Extension` is any object that has the following properties:

| property | description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| `name`   | a string containing the name of the extension as used in negotiation headers |
| `type`   | a string, must be `"permessage"`                                             |
| `rsv1`   | either `true` if the extension uses the RSV1 bit, `false` otherwise          |
| `rsv2`   | either `true` if the extension uses the RSV2 bit, `false` otherwise          |
| `rsv3`   | either `true` if the extension uses the RSV3 bit, `false` otherwise          |

It must also implement the following methods:

```js
ext.createClientSession()
```

This returns a *ClientSession*, whose interface is defined below.

```js
ext.createServerSession(offers)
```

This takes an array of offer params and returns a *ServerSession*, whose
interface is defined below. For example, if the client handshake contains the
offer header:

```
Sec-WebSocket-Extensions: permessage-deflate; server_no_context_takeover; server_max_window_bits=8, \
                          permessage-deflate; server_max_window_bits=15
```

then the `permessage-deflate` extension will receive the call:

```js
ext.createServerSession([
  {server_no_context_takeover: true, server_max_window_bits: 8},
  {server_max_window_bits: 15}
]);
```

The extension must decide which set of parameters it wants to accept, if any,
and return a *ServerSession* if it wants to accept the parameters and `null`
otherwise.

#### *ClientSession*

A *ClientSession* is the type returned by `ext.createClientSession()`. It must
implement the following methods, as well as the *Session* API listed below.

```js
clientSession.generateOffer()
// e.g.  -> [
//            {server_no_context_takeover: true, server_max_window_bits: 8},
//            {server_max_window_bits: 15}
//          ]
```

This must return a set of parameters to include in the client's
`Sec-WebSocket-Extensions` offer header. If the session wants to offer multiple
configurations, it can return an array of sets of parameters as shown above.

```js
clientSession.activate(params) // -> true
```

This must take a single set of parameters from the server's handshake response
and use them to configure the client session. If the client accepts the given
parameters, then this method must return `true`. If it returns any other value,
the framework will interpret this as the client rejecting the response, and will
`throw`.

#### *ServerSession*

A *ServerSession* is the type returned by `ext.createServerSession(offers)`. It
must implement the following methods, as well as the *Session* API listed below.

```js
serverSession.generateResponse()
// e.g.  -> {server_max_window_bits: 8}
```

This returns the set of parameters the server session wants to send in its
`Sec-WebSocket-Extensions` response header. Only one set of parameters is
returned to the client per extension. Server sessions that would confict on
their use of RSV bits are not activated.

#### *Session*

The *Session* API must be implemented by both client and server sessions. It
contains two methods, `processIncomingMessage(message)` and
`processOutgoingMessage(message)`.

```js
session.processIncomingMessage(message, function(error, msg) { ... })
```

The session must implement this method to take an incoming *Message* as defined
above, transform it in any way it needs, then return it via the callback. If
there is an error processing the message, this method should yield an error as
the first argument.

```js
session.processOutgoingMessage(message, function(error, msg) { ... })
```

The session must implement this method to take an outgoing *Message* as defined
above, transform it in any way it needs, then return it via the callback. If
there is an error processing the message, this method should yield an error as
the first argument.

Note that both `processIncomingMessage()` and `processOutgoingMessage()` can
perform their logic asynchronously, are allowed to process multiple messages
concurrently, and are not required to complete working on messages in the same
order the messages arrive. `websocket-extensions` will reorder messages as your
extension emits them and will make sure every extension is given messages in the
order they arrive from the driver. This allows extensions to maintain state that
depends on the messages' wire order, for example keeping a DEFLATE compression
context between messages.

```js
session.close()
```

The framework will call this method when the WebSocket session ends, allowing
the session to release any resources it's using.

## Examples

* Consumer: [websocket-driver](https://github.com/faye/websocket-driver-node)
* Provider: [permessage-deflate](https://github.com/faye/permessage-deflate-node)
