# decompress-unzip [![Build Status](https://travis-ci.org/kevva/decompress-unzip.svg?branch=master)](https://travis-ci.org/kevva/decompress-unzip)

> zip decompress plugin


## Install

```
$ npm install --save decompress-unzip
```


## Usage

```js
const decompress = require('decompress');
const decompressUnzip = require('decompress-unzip');

decompress('unicorn.zip', 'dist', {
	plugins: [
		decompressUnzip()
	]
}).then(() => {
	console.log('Files decompressed');
});
```


## API

### decompressUnzip()(buf)

#### buf

Type: `Buffer`

Buffer to decompress.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
