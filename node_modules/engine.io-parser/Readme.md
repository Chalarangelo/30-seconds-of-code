
# engine.io-parser

[![Build Status](https://secure.travis-ci.org/socketio/engine.io-parser.svg)](http://travis-ci.org/socketio/engine.io-parser)
[![NPM version](https://badge.fury.io/js/engine.io-parser.svg)](http://badge.fury.io/js/engine.io-parser)

This is the JavaScript parser for the engine.io protocol encoding,
shared by both
[engine.io-client](https://github.com/socketio/engine.io-client) and
[engine.io](https://github.com/socketio/engine.io).

## How to use

### Standalone

The parser can encode/decode packets, payloads, and payloads as binary
with the following methods: `encodePacket`, `decodePacket`, `encodePayload`,
`decodePayload`, `encodePayloadAsBinary`, `decodePayloadAsBinary`.

The browser-side parser also includes `encodePayloadAsArrayBuffer` and `encodePayloadAsBlob`.

Example:

```js
var parser = require('engine.io-parser');

var data = new Buffer(5);
for (var i = 0; i < data.length; i++) { data[i] = i; }

parser.encodePacket({ type: 'message', data: data }, function(encoded) {
  var decodedData = parser.decodePacket(encoded); // { type: 'message', data: data }
});
```

### With browserify

Engine.IO Parser is a commonjs module, which means you can include it by using
`require` on the browser and package using [browserify](http://browserify.org/):

1. install the parser package

    ```shell
    npm install engine.io-parser
    ```

1. write your app code

    ```js
    var parser = require('engine.io-parser');

    var testBuffer = new Int8Array(10);
    for (var i = 0; i < testBuffer.length; i++) testBuffer[i] = i;

    var packets = [{ type: 'message', data: testBuffer.buffer }, { type: 'message', data: 'hello' }];

    parser.encodePayload(packets, function(encoded) {
      parser.decodePayload(encoded,
        function(packet, index, total) {
          var isLast = index + 1 == total;
          if (!isLast) {
            var buffer = new Int8Array(packet.data); // testBuffer
          } else {
            var message = packet.data; // 'hello'
          }
        });
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

## Features

- Runs on browser and node.js seamlessly
- Runs inside HTML5 WebWorker
- Can encode and decode packets
  - Encodes from/to ArrayBuffer or Blob when in browser, and Buffer or ArrayBuffer in Node

## API

Note: `cb(type)` means the type is a callback function that contains a parameter of type `type` when called.

### Node

- `encodePacket`
    - Encodes a packet.
    - **Parameters**
      - `Object`: the packet to encode, has `type` and `data`.
        - `data`: can be a `String`, `Number`, `Buffer`, `ArrayBuffer`
      - `Boolean`: optional, binary support
      - `Function`: callback, returns the encoded packet (`cb(String)`)
- `decodePacket`
    - Decodes a packet. Data also available as an ArrayBuffer if requested.
    - Returns data as `String` or (`Blob` on browser, `ArrayBuffer` on Node)
    - **Parameters**
      - `String` | `ArrayBuffer`: the packet to decode, has `type` and `data`
      - `String`: optional, the binary type

- `encodeBase64Packet`
    - Encodes a packet with binary data in a base64 string (`String`)
    - **Parameters**
      - `Object`: the packet to encode, has `type` and `data`
      - `Function`: callback, returns the base64 encoded message (`cb(String)`)
- `decodeBase64Packet`
    - Decodes a packet encoded in a base64 string.
    - **Parameters**
      - `String`: the base64 encoded message
      - `String`: optional, the binary type

- `encodePayload`
    - Encodes multiple messages (payload).
    - If any contents are binary, they will be encoded as base64 strings. Base64
      encoded strings are marked with a b before the length specifier
    - **Parameters**
      - `Array`: an array of packets
      - `Boolean`: optional, binary support
      - `Function`: callback, returns the encoded payload (`cb(String)`)
- `decodePayload`
    - Decodes data when a payload is maybe expected. Possible binary contents are
      decoded from their base64 representation.
    - **Parameters**
      - `String`: the payload
      - `String`: optional, the binary type
      - `Function`: callback, returns (cb(`Object`: packet, `Number`:packet index, `Number`:packet total))

- `encodePayloadAsBinary`
    - Encodes multiple messages (payload) as binary.
    - **Parameters**
      - `Array`: an array of packets
      - `Function`: callback, returns the encoded payload (`cb(Buffer)`)
- `decodePayloadAsBinary`
    - Decodes data when a payload is maybe expected. Strings are decoded by
      interpreting each byte as a key code for entries marked to start with 0. See
      description of encodePayloadAsBinary.
    - **Parameters**
      - `Buffer`: the buffer
      - `String`: optional, the binary type
      - `Function`: callback, returns the decoded packet (`cb(Object)`)

### Browser

- `encodePayloadAsArrayBuffer`
    - Encodes multiple messages (payload) as binary.
    - **Parameters**
      - `Array`: an array of packets
      - `Function`: callback, returns the encoded payload (`cb(ArrayBuffer)`)
- `encodePayloadAsBlob`
    - Encodes multiple messages (payload) as blob.
    - **Parameters**
      - `Array`: an array of packets
      - `Function`: callback, returns the encoded payload (`cb(Blob)`)

## Tests

Standalone tests can be run with `make test` which will run both node.js and browser tests.

Browser tests are run using [zuul](https://github.com/defunctzombie/zuul).
(You must have zuul setup with a saucelabs account.)

You can run the tests locally using the following command:

```
./node_modules/.bin/zuul --local 8080 -- test/index.js
```

## Support

The support channels for `engine.io-parser` are the same as `socket.io`:
  - irc.freenode.net **#socket.io**
  - [Google Groups](http://groups.google.com/group/socket_io)
  - [Website](http://socket.io)

## Development

To contribute patches, run tests or benchmarks, make sure to clone the
repository:

```bash
git clone git://github.com/LearnBoost/engine.io-parser.git
```

Then:

```bash
cd engine.io-parser
npm install
```

See the `Tests` section above for how to run tests before submitting any patches.

## License

MIT
