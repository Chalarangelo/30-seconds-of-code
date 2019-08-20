# bin-build [![Build Status](https://travis-ci.org/kevva/bin-build.svg?branch=master)](https://travis-ci.org/kevva/bin-build)

> Easily build binaries


## Install

```
$ npm install --save bin-build
```


## Usage

```js
const binBuild = require('bin-build');

binBuild.url('http://www.lcdf.org/gifsicle/gifsicle-1.80.tar.gz', [
	'./configure --disable-gifview --disable-gifdiff',
	'make install'
]).then(() => {
	console.log('gifsicle built successfully');
});

binBuild.file('gifsicle-1.80.tar.gz', [
	'./configure --disable-gifview --disable-gifdiff',
	'make install'
]).then(() => {
	console.log('gifsicle built successfully');
});
```


## API

### binBuild.directory(directory, commands)

#### directory

Type: `string`

Path to a directory containing the source code.

#### commands

Type: `Array`

Commands to run when building.

### binBuild.file(file, commands, [options])

#### file

Type: `string`

Path to a archive file containing the source code.

#### commands

Type: `Array`

Commands to run when building.

#### options

Type: `Object`

##### strip

Type: `number`<br>
Default: `1`

Strip a number of leading paths from file names on extraction.

### binBuild.url(url, commands, [options])

#### url

Type: `string`

URL to a archive file containing the source code.

#### commands

Type: `Array`

Commands to run when building.

#### options

Type: `Object`

##### strip

Type: `number`<br>
Default: `1`

Strip a number of leading paths from file names on extraction.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
