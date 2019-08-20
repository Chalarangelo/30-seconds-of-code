# decompress [![Build Status](https://travis-ci.org/kevva/decompress.svg?branch=master)](https://travis-ci.org/kevva/decompress)

> Extracting archives made easy

*See [decompress-cli](https://github.com/kevva/decompress-cli) for the command-line version.*

## Install

```
$ npm install --save decompress
```


## Usage

```js
const decompress = require('decompress');

decompress('unicorn.zip', 'dist').then(files => {
	console.log('done!');
});
```


## API

### decompress(input, [output], [options])

Returns a Promise for an array of files in the following format:

```js
{
	data: Buffer,
	mode: Number,
	mtime: String,
	path: String,
	type: String
}
```

#### input

Type: `string` `Buffer`

File to decompress.

#### output

Type: `string`

Output directory.

#### options

##### filter

Type: `Function`

Filter out files before extracting. E.g:

```js
decompress('unicorn.zip', 'dist', {
	filter: file => path.extname(file.path) !== '.exe'
}).then(files => {
	console.log('done!');
});
```

##### map

Type: `Function`

Map files before extracting: E.g:

```js
decompress('unicorn.zip', 'dist', {
	map: file => {
		file.path = `unicorn-${file.path}`;
		return file;
	}
}).then(files => {
	console.log('done!');
});
```

##### plugins

Type: `Array`<br>
Default: `[decompressTar(), decompressTarbz2(), decompressTargz(), decompressUnzip()]`

Array of [plugins](https://www.npmjs.com/browse/keyword/decompressplugin) to use.

##### strip

Type: `number`<br>
Default: `0`

Remove leading directory components from extracted files.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
