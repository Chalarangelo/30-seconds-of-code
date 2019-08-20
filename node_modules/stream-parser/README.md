node-stream-parser
==================
### Generic interruptible "parser" mixin for Transform & Writable streams
[![Build Status](https://secure.travis-ci.org/TooTallNate/node-stream-parser.svg)](http://travis-ci.org/TooTallNate/node-stream-parser)

This module offers the `stream-parser` mixin, which provides an easy-to-use API
for parsing bytes from `Writable` and/or `Transform` stream instances. This module
is great for implementing streaming parsers for standardized file formats.

For `Writable` streams, the parser takes control over the `_write` callback
function. For `Transform` streams, the parser controls the `_transform` callback
function.

Installation
------------

``` bash
$ npm install stream-parser
```


Example
-------

Let's create a quick `Transform` stream subclass that utilizes the parser's
`_bytes()` and `_passthrough()` functions to parse a theoretical file format that
has an 8-byte header we want to parse, and then pass through the rest of the data.

``` javascript
var Parser = require('stream-parser');
var inherits = require('util').inherits;
var Transform = require('stream').Transform;

// create a Transform stream subclass
function MyParser () {
  Transform.call(this);

  // buffer the first 8 bytes written
  this._bytes(8, this.onheader);
}
inherits(MyParser, Transform);

// mixin stream-parser into MyParser's `prototype`
Parser(MyParser.prototype);

// invoked when the first 8 bytes have been received
MyParser.prototype.onheader = function (buffer, output) {
  // parse the "buffer" into a useful "header" object
  var header = {};
  header.type = buffer.readUInt32LE(0);
  header.name = buffer.toString('utf8', 4);
  this.emit('header', header);

  // it's usually a good idea to queue the next "piece" within the callback
  this._passthrough(Infinity);
};


// now we can *use* it!
var parser = new MyParser();
parser.on('header', function (header) {
  console.error('got "header"', header);
});
process.stdin.pipe(parser).pipe(process.stdout);
```

Here's an example of manually creating a `Transform` stream and turning it into a
"pass through" stream equivalent to the one built into node core:

``` javascript
var Parser = require('stream-parser');
var Transform = require('stream').Transform;

// create a Transform instance and extend it with "stream-parser"
var p = new Transform();
Parser(p);

// pass through `Infinity` bytes... forever...
p._passthrough(Infinity);

// now `p` is equivalent to a stream.PassThrough instance
process.stdin.pipe(p).pipe(process.stdout);
```

See the `test` directory for some more example code in the test cases.

A list of known concrete implementations is here (send pull requests for more!):

 * [node-icecast][]
 * [node-throttle][]
 * [node-flv][]
 * [node-wav][]

API
---

  - [Parser()](#parser)
    - [._bytes(n, cb)](#_bytesn-cb)
    - [._skipBytes(n, cb)](#_skipbytesn-cb)
    - [._passthrough(n, cb)](#_passthroughn-cb)

## Parser()

  The `Parser` stream mixin works with either `Writable` or `Transform` stream
  instances/subclasses. Provides a convenient generic "parsing" API:

```js
_bytes(n, cb) - buffers "n" bytes and then calls "cb" with the "chunk"
_skipBytes(n, cb) - skips "n" bytes and then calls "cb" when done
```

  If you extend a `Transform` stream, then the `_passthrough()` function is also
  added:

```js
_passthrough(n, cb) - passes through "n" bytes untouched and then calls "cb"
```

### ._bytes(n, cb)

  Buffers `n` bytes and then invokes `cb` once that amount has been collected.

### ._skipBytes(n, cb)

  Skips over the next `n` bytes and then invokes `cb` once that amount has been
  discarded.

### ._passthrough(n, cb)

  Passes through `n` bytes to the readable side of this stream untouched,
  then invokes `cb` once that amount has been passed through. This function is only defined
  when stream-parser is extending a `Transform` stream.

[node-icecast]: https://github.com/TooTallNate/node-icecast
[node-throttle]: https://github.com/TooTallNate/node-throttle
[node-flv]: https://github.com/TooTallNate/node-flv
[node-wav]: https://github.com/TooTallNate/node-wav
