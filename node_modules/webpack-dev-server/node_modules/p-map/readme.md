# p-map [![Build Status](https://travis-ci.org/sindresorhus/p-map.svg?branch=master)](https://travis-ci.org/sindresorhus/p-map)

> Map over promises concurrently

Useful when you need to run promise-returning & async functions multiple times with different inputs concurrently.


## Install

```
$ npm install p-map
```


## Usage

```js
const pMap = require('p-map');
const got = require('got');

const sites = [
	getWebsiteFromUsername('sindresorhus'), //=> Promise
	'ava.li',
	'todomvc.com',
	'github.com'
];

(async () => {
	const mapper = async site => {
		const {requestUrl} = await got.head(site);
		return requestUrl;
	};

 	const result = await pMap(sites, mapper, {concurrency: 2});

	console.log(result);
	//=> ['http://sindresorhus.com/', 'http://ava.li/', 'http://todomvc.com/', 'http://github.com/']
})();
```

## API

### pMap(input, mapper, [options])

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is an `Array` of the fulfilled values returned from `mapper` in `input` order.

#### input

Type: `Iterable<Promise|any>`

Iterated over concurrently in the `mapper` function.

#### mapper(element, index)

Type: `Function`

Expected to return a `Promise` or value.

#### options

Type: `Object`

##### concurrency

Type: `number`<br>
Default: `Infinity`<br>
Minimum: `1`

Number of concurrently pending promises returned by `mapper`.


## Related

- [p-all](https://github.com/sindresorhus/p-all) - Run promise-returning & async functions concurrently with optional limited concurrency
- [p-filter](https://github.com/sindresorhus/p-filter) - Filter promises concurrently
- [p-times](https://github.com/sindresorhus/p-times) - Run promise-returning & async functions a specific number of times concurrently
- [p-props](https://github.com/sindresorhus/p-props) - Like `Promise.all()` but for `Map` and `Object`
- [p-map-series](https://github.com/sindresorhus/p-map-series) - Map over promises serially
- [p-queue](https://github.com/sindresorhus/p-queue) - Promise queue with concurrency control
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
