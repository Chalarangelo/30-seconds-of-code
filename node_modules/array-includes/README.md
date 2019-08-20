#array-includes <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

[![browser support][testling-svg]][testling-url]

An ES7/ES2016 spec-compliant `Array.prototype.includes` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the proposed [spec](http://www.ecma-international.org/ecma-262/6.0/).

Because `Array.prototype.includes` depends on a receiver (the `this` value), the main export takes the array to operate on as the first argument.

## Getting started

```sh
npm install --save array-includes
```

## Usage

Basic usage: **includes(array, value[, fromIndex=0])**

```js
var includes = require('array-includes');
var arr = [ 'one', 'two' ];

includes(arr, 'one'); // true
includes(arr, 'three'); // false
includes(arr, 'one', 1); // false
```



## Example

```js
var includes = require('array-includes');
var assert = require('assert');
var arr = [
	1,
	'foo',
	NaN,
	-0
];

assert.equal(arr.indexOf(0) > -1, true);
assert.equal(arr.indexOf(-0) > -1, true);
assert.equal(includes(arr, 0), true);
assert.equal(includes(arr, -0), true);

assert.equal(arr.indexOf(NaN) > -1, false);
assert.equal(includes(arr, NaN), true);

assert.equal(includes(arr, 'foo', 0), true);
assert.equal(includes(arr, 'foo', 1), true);
assert.equal(includes(arr, 'foo', 2), false);
```

```js
var includes = require('array-includes');
var assert = require('assert');
/* when Array#includes is not present */
delete Array.prototype.includes;
var shimmedIncludes = includes.shim();

assert.equal(shimmedIncludes, includes.getPolyfill());
assert.deepEqual(arr.includes('foo', 1), includes(arr, 'foo', 1));
```

```js
var includes = require('array-includes');
var assert = require('assert');
/* when Array#includes is present */
var shimmedIncludes = includes.shim();

assert.equal(shimmedIncludes, Array.prototype.includes);
assert.deepEqual(arr.includes(1, 'foo'), includes(arr, 1, 'foo'));
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/array-includes
[npm-version-svg]: http://versionbadg.es/ljharb/array-includes.svg
[travis-svg]: https://travis-ci.org/ljharb/array-includes.svg
[travis-url]: https://travis-ci.org/ljharb/array-includes
[deps-svg]: https://david-dm.org/ljharb/array-includes.svg
[deps-url]: https://david-dm.org/ljharb/array-includes
[dev-deps-svg]: https://david-dm.org/ljharb/array-includes/dev-status.svg
[dev-deps-url]: https://david-dm.org/ljharb/array-includes#info=devDependencies
[testling-svg]: https://ci.testling.com/ljharb/array-includes.png
[testling-url]: https://ci.testling.com/ljharb/array-includes
[npm-badge-png]: https://nodei.co/npm/array-includes.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/array-includes.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/array-includes.svg
[downloads-url]: http://npm-stat.com/charts.html?package=array-includes
