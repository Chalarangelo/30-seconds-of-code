# download [![Build Status](https://travis-ci.org/kevva/download.svg?branch=master)](https://travis-ci.org/kevva/download)

> Download and extract files

*See [download-cli](https://github.com/kevva/download-cli) for the command-line version.*


## Install

```
$ npm install download
```


## Usage

```js
const fs = require('fs');
const download = require('download');

download('http://unicorn.com/foo.jpg', 'dist').then(() => {
	console.log('done!');
});

download('http://unicorn.com/foo.jpg').then(data => {
	fs.writeFileSync('dist/foo.jpg', data);
});

download('unicorn.com/foo.jpg').pipe(fs.createWriteStream('dist/foo.jpg'));

Promise.all([
	'unicorn.com/foo.jpg',
	'cats.com/dancing.gif'
].map(x => download(x, 'dist'))).then(() => {
	console.log('files downloaded!');
});
```


## API

### download(url, [destination], [options])

Returns both a `Promise<Buffer>` and a [Duplex stream](https://nodejs.org/api/stream.html#stream_class_stream_duplex) with [additional events](https://github.com/sindresorhus/got#streams-1).

#### url

Type: `string`

URL to download.

#### destination

Type: `string`

Path to where your file will be written.

#### options

Type: `Object`

Same options as [`got`](https://github.com/sindresorhus/got#options) and [`decompress`](https://github.com/kevva/decompress#options) in addition to the ones below.

##### extract

Type: `boolean`<br>
Default: `false`

If set to `true`, try extracting the file using [`decompress`](https://github.com/kevva/decompress).

##### filename

Type: `string`

Name of the saved file.

##### proxy

Type: `string`

Proxy endpoint.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
