# bin-check [![Build Status](https://travis-ci.org/kevva/bin-check.svg?branch=master)](https://travis-ci.org/kevva/bin-check)

> Check if a binary is working by checking its exit code


## Install

```
$ npm install bin-check
```


## Usage

```js
const binCheck = require('bin-check');

binCheck('/bin/sh', ['--version']).then(works => {
	console.log(works);
	//=> true
});
```


## API

### binCheck(binary, [arguments])

Returns a `Promise` for a `boolean`.

### binCheck.sync(binary, [arguments])

Returns a `boolean`.

#### binary

Type: `string`

Path to the binary.

#### arguments

Type: `Array`<br>
Default: `['--help']`

Arguments to run the binary with.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
