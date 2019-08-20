# p-is-promise [![Build Status](https://travis-ci.org/sindresorhus/p-is-promise.svg?branch=master)](https://travis-ci.org/sindresorhus/p-is-promise)

> Check if something is a promise

Why not [`is-promise`](https://github.com/then/is-promise)? That module [checks for a thenable](https://github.com/then/is-promise/issues/6), not an ES2015 promise. This one is stricter.

You most likely don't need this. Just pass your value to `Promise.resolve()` and let it handle it.

Can be useful if you need to create a fast path for a synchronous operation.


## Install

```
$ npm install p-is-promise
```


## Usage

```js
const pIsPromise = require('p-is-promise');
const Bluebird = require('bluebird');

pIsPromise(Promise.resolve('🦄'));
//=> true

pIsPromise(Bluebird.resolve('🦄'));
//=> true

pIsPromise('🦄');
//=> false
```


## Related

- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
