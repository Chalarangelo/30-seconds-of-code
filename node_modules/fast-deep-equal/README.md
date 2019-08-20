# fast-deep-equal
The fastest deep equal

[![Build Status](https://travis-ci.org/epoberezkin/fast-deep-equal.svg?branch=master)](https://travis-ci.org/epoberezkin/fast-deep-equal)
[![npm version](https://badge.fury.io/js/fast-deep-equal.svg)](http://badge.fury.io/js/fast-deep-equal)
[![Coverage Status](https://coveralls.io/repos/github/epoberezkin/fast-deep-equal/badge.svg?branch=master)](https://coveralls.io/github/epoberezkin/fast-deep-equal?branch=master)


## Install

```bash
npm install fast-deep-equal
```


## Features

- ES5 compatible
- works in node.js (0.10+) and browsers (IE9+)
- checks equality of Date and RegExp objects by value.


## Usage

```javascript
var equal = require('fast-deep-equal');
console.log(equal({foo: 'bar'}, {foo: 'bar'})); // true
```


## Performance benchmark

Node.js v9.11.1:

```
fast-deep-equal x 226,960 ops/sec ±1.55% (86 runs sampled)
nano-equal x 218,210 ops/sec ±0.79% (89 runs sampled)
shallow-equal-fuzzy x 206,762 ops/sec ±0.84% (88 runs sampled)
underscore.isEqual x 128,668 ops/sec ±0.75% (91 runs sampled)
lodash.isEqual x 44,895 ops/sec ±0.67% (85 runs sampled)
deep-equal x 51,616 ops/sec ±0.96% (90 runs sampled)
deep-eql x 28,218 ops/sec ±0.42% (85 runs sampled)
assert.deepStrictEqual x 1,777 ops/sec ±1.05% (86 runs sampled)
ramda.equals x 13,466 ops/sec ±0.82% (86 runs sampled)
The fastest is fast-deep-equal
```

To run benchmark (requires node.js 6+):

```bash
npm install
node benchmark
```


## License

[MIT](https://github.com/epoberezkin/fast-deep-equal/blob/master/LICENSE)
