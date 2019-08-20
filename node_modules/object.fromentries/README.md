# object.fromentries <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![Build Status][travis-svg]][travis-url]
[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

[![browser support][testling-svg]][testling-url]

An ES spec-proposal-compliant `Object.fromEntries` shim. Invoke its "shim" method to shim `Object.fromEntries` if it is unavailable or noncompliant.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the [proposed spec](https://tc39.github.io/proposal-object-from-entries/).

Most common usage:
```js
var assert = require('assert');
var fromEntries = require('object.fromentries');

var obj = { a: 1, b: 2, c: 3 };
var actual = fromEntries(Object.entries(obj));

assert.deepEqual(obj, actual);

if (!Object.fromEntries) {
	fromEntries.shim();
}

assert.deepEqual(Object.fromEntries(Object.entries(obj)), obj);
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.com/package/object.fromentries
[npm-version-svg]: http://versionbadg.es/es-shims/Object.fromEntries.svg
[travis-svg]: https://travis-ci.org/es-shims/Object.fromEntries.svg
[travis-url]: https://travis-ci.org/es-shims/Object.fromEntries
[deps-svg]: https://david-dm.org/es-shims/Object.fromEntries.svg
[deps-url]: https://david-dm.org/es-shims/Object.fromEntries
[dev-deps-svg]: https://david-dm.org/es-shims/Object.fromEntries/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/Object.fromEntries#info=devDependencies
[testling-svg]: https://ci.testling.com/es-shims/Object.fromEntries.png
[testling-url]: https://ci.testling.com/es-shims/Object.fromEntries
[npm-badge-png]: https://nodei.co/npm/object.fromentries.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/object.fromentries.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/object.fromentries.svg
[downloads-url]: http://npm-stat.com/charts.html?package=object.fromentries
