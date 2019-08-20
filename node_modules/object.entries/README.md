# object.entries <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

[![browser support][testling-svg]][testling-url]

An ES2017 spec-compliant `Object.entries` shim. Invoke its "shim" method to shim `Object.entries` if it is unavailable or noncompliant.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the [spec](https://tc39.github.io/ecma262/#sec-object.entries).

Most common usage:
```js
var assert = require('assert');
var entries = require('object.entries');

var obj = { a: 1, b: 2, c: 3 };
var expected = [['a', 1], ['b', 2], ['c', 3]];

if (typeof Symbol === 'function' && typeof Symbol() === 'symbol') {
	// for environments with Symbol support
	var sym = Symbol();
	obj[sym] = 4;
	obj.d = sym;
	expected.push(['d', sym]);
}

assert.deepEqual(entries(obj), expected);

if (!Object.entries) {
	entries.shim();
}

assert.deepEqual(Object.entries(obj), expected);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.com/package/object.entries
[npm-version-svg]: http://versionbadg.es/es-shims/Object.entries.svg
[travis-svg]: https://travis-ci.org/es-shims/Object.entries.svg
[travis-url]: https://travis-ci.org/es-shims/Object.entries
[deps-svg]: https://david-dm.org/es-shims/Object.entries.svg
[deps-url]: https://david-dm.org/es-shims/Object.entries
[dev-deps-svg]: https://david-dm.org/es-shims/Object.entries/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/Object.entries#info=devDependencies
[testling-svg]: https://ci.testling.com/es-shims/Object.entries.png
[testling-url]: https://ci.testling.com/es-shims/Object.entries
[npm-badge-png]: https://nodei.co/npm/object.entries.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/object.entries.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/object.entries.svg
[downloads-url]: http://npm-stat.com/charts.html?package=object.entries
