# dir-glob [![Build Status](https://travis-ci.org/kevva/dir-glob.svg?branch=master)](https://travis-ci.org/kevva/dir-glob)

> Convert directories to glob compatible strings


## Install

```
$ npm install dir-glob
```


## Usage

```js
const dirGlob = require('dir-glob');

dirGlob(['index.js', 'test.js', 'fixtures']).then(files => {
	console.log(files);
	//=> ['index.js', 'test.js', 'fixtures/**']
});

dirGlob(['lib/**', 'fixtures'], {
	files: ['test', 'unicorn']
	extensions: ['js']
}).then(files => {
	console.log(files);
	//=> ['lib/**', 'fixtures/**/test.js', 'fixtures/**/unicorn.js']
});

dirGlob(['lib/**', 'fixtures'], {
	files: ['test', 'unicorn', '*.jsx'],
	extensions: ['js', 'png']
}).then(files => {
	console.log(files);
	//=> ['lib/**', 'fixtures/**/test.{js,png}', 'fixtures/**/unicorn.{js,png}', 'fixtures/**/*.jsx']
});
```


## API

### dirGlob(input, [options])

Returns a `Promise` for an array of glob strings.

### dirGlob.sync(input, [options])

Returns an array of glob strings.

#### input

Type: `Array` `string`

A `string` or an `Array` of paths.

#### options

##### extensions

Type: `Array`

Append extensions to the end of your globs.

##### files

Type: `Array`

Only glob for certain files.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
