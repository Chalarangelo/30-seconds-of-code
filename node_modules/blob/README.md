# Blob

A cross-browser `Blob` that falls back to `BlobBuilder` when appropriate.
If neither is available, it exports `undefined`.

## Installation

``` bash
$ npm install blob
```

## Example

``` js
var Blob = require('blob');
var b = new Blob(['hi', 'constructing', 'a', 'blob']);
```

## License

MIT
