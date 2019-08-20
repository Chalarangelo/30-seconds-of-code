# HPACK.js

[![Build Status](https://secure.travis-ci.org/indutny/hpack.js.png)](http://travis-ci.org/indutny/hpack.js)
[![NPM version](https://badge.fury.io/js/hpack.js.svg)](http://badge.fury.io/js/hpack.js)

Plain-JS implementation of [HPACK][0].

## Usage

```javascript
var hpack = require('hpack.js');

var comp = hpack.compressor.create({ table: { size: 256 } });
var decomp = hpack.decompressor.create({ table: { size: 256 } });

comp.write([ { name: 'host', value: 'localhost' } ]);
var raw = comp.read();
console.log(raw);
// <Buffer 66 86 a0 e4 1d 13 9d 09>

decomp.write(raw);
decomp.execute();
console.log(decomp.read());
// { name: 'host', value: 'localhost', neverIndex: false }
```

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

[0]: https://tools.ietf.org/html/rfc7541
