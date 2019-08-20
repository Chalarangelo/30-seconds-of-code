# is-object <sup>[![Version Badge][12]][11]</sup>

[![build status][1]][2]
[![dependency status][3]][4]
[![dev dependency status][9]][10]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][13]][11]

[![browser support][5]][6]

Checks whether a value is an object

Because `typeof null` is a troll.

## Example

```js
var isObject = require('is-object');
var assert = require('assert');

assert.equal(isObject(null), false);
assert.equal(isObject({}), true);
```

## Installation

`npm install is-object`

## Contributors

 - [Raynos][7]
 - [Jordan Harband][8]

## MIT Licensed

  [1]: https://secure.travis-ci.org/ljharb/is-object.svg
  [2]: http://travis-ci.org/ljharb/is-object
  [3]: http://david-dm.org/ljharb/is-object/status.svg
  [4]: http://david-dm.org/ljharb/is-object
  [5]: http://ci.testling.com/ljharb/is-object.svg
  [6]: http://ci.testling.com/ljharb/is-object
  [7]: https://github.com/Raynos
  [8]: https://github.com/ljharb
  [9]: https://david-dm.org/ljharb/is-object/dev-status.svg
  [10]: https://david-dm.org/ljharb/is-object#info=devDependencies
  [11]: https://npmjs.org/package/is-object
  [12]: http://vb.teelaun.ch/ljharb/is-object.svg
  [13]: https://nodei.co/npm/is-object.png?downloads=true&stars=true
[license-image]: http://img.shields.io/npm/l/is-object.svg
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/is-object.svg
[downloads-url]: http://npm-stat.com/charts.html?package=is-object

