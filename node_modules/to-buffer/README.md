# to-buffer

Pass in a string, get a buffer back. Pass in a buffer, get the same buffer back.

```
npm install to-buffer
```

[![build status](https://travis-ci.org/mafintosh/to-buffer.svg?branch=master)](https://travis-ci.org/mafintosh/to-buffer)

## Usage

``` js
var toBuffer = require('to-buffer')
console.log(toBuffer('hi')) // <Buffer 68 69>
console.log(toBuffer(Buffer('hi'))) // <Buffer 68 69>
console.log(toBuffer('6869', 'hex')) // <Buffer 68 69>
console.log(toBuffer(43)) // throws
```

## License

MIT
