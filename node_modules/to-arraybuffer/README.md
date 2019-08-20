# to-arraybuffer [![Build Status](https://travis-ci.org/jhiesey/to-arraybuffer.svg?branch=master)](https://travis-ci.org/jhiesey/to-arraybuffer)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/to-arraybuffer.svg)](https://saucelabs.com/u/to-arraybuffer)

Convert from a Buffer to an ArrayBuffer as fast as possible.

Note that in some cases the returned ArrayBuffer is backed by the same memory as the original
Buffer (but in other cases it is a copy), so **modifying the ArrayBuffer is not recommended**.

This module is designed to work both in node.js and in all browsers with ArrayBuffer support
when using [the Buffer implementation provided by Browserify](https://www.npmjs.com/package/buffer).

## Usage

``` js
var toArrayBuffer = require('to-arraybuffer')

var buffer = new Buffer(100)
// Fill the buffer with some data

var ab = toArrayBuffer(buffer)
// `ab` now contains the same data as `buffer`
```

## License

MIT