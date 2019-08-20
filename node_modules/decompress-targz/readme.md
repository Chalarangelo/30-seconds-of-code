# decompress-targz [![Build Status](https://travis-ci.org/kevva/decompress-targz.svg?branch=master)](https://travis-ci.org/kevva/decompress-targz)

> tar.gz decompress plugin


## Install

```
$ npm install decompress-targz
```


## Usage

```js
const decompress = require('decompress');
const decompressTargz = require('decompress-targz');

decompress('unicorn.tar.gz', 'dist', {
	plugins: [
		decompressTargz()
	]
}).then(() => {
	console.log('Files decompressed');
});
```


## API

### decompressTargz()(input)

Returns both a Promise for a Buffer and a [Duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex).

#### input

Type: `Buffer` `Stream`

Buffer or stream to decompress.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
