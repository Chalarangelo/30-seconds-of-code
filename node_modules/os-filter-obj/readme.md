# os-filter-obj [![Build Status](https://travis-ci.org/kevva/os-filter-obj.svg?branch=master)](https://travis-ci.org/kevva/os-filter-obj)

> Filter an array of objects to a specific OS


## Install

```
$ npm install os-filter-obj
```


## Usage

```js
const osFilterObj = require('os-filter-obj');

const objects = [{
	os: 'linux',
	arch: 'x64',
	foo: 'unicorn',
	bar: 'cow'
}, {
	os: 'darwin',
	arch: 'x64',
	foo: 'unicorn',
	bar: 'cow'
},{
	os: 'win32',
	arch: 'x64',
	foo: 'unicorn',
	bar: 'cow'
}];

osFilterObj(objects);
/*
	[{
		os: 'linux',
		arch: 'x64',
		foo: 'unicorn',
		bar: 'cow'
	}];
*/
```


## API

### osFilterObj(objects)

Returns an `Array` with the filtered objects.

#### objects

Type: `Array`

The `Array` to filter.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
