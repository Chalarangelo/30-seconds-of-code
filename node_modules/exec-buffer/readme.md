# exec-buffer [![Build Status](http://img.shields.io/travis/kevva/exec-buffer.svg?style=flat)](https://travis-ci.org/kevva/exec-buffer)

> Run a Buffer through a child process


## Install

```
$ npm install exec-buffer
```


## Usage

```js
const fs = require('fs');
const execBuffer = require('exec-buffer');
const gifsicle = require('gifsicle').path;

execBuffer({
	input: fs.readFileSync('test.gif'),
	bin: gifsicle,
	args: ['-o', execBuffer.output, execBuffer.input]
}).then(data => {
	console.log(data);
	//=> <Buffer 47 49 46 38 37 61 ...>
});
```


## API

### execBuffer(options)

#### options

Type: `Object`

##### input

Type: `Buffer`

The `Buffer` to be ran through the child process.

##### bin

Type: `string`

Path to the binary.

##### args

Type: `Array`

Arguments to run the binary with.

#### inputPath

Type: `string`<br>
Default: `tempfile()`

Where `input` will be written to. In most cases you don't need to set this.

#### outputPath

Type: `string`<br>
Default: `tempfile()`

Where output file will be written to. In most cases you don't need to set this.

### execBuffer.input

Returns a temporary path to where the input file will be written.

### execBuffer.output

Returns a temporary path to where the output file will be written.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
