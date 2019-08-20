# p-map-series [![Build Status](https://travis-ci.org/sindresorhus/p-map-series.svg?branch=master)](https://travis-ci.org/sindresorhus/p-map-series)

> Map over promises serially

Useful as a side-effect mapper. Use [`p-map`](https://github.com/sindresorhus/p-map) if you don't need side-effects, as it's concurrent.


## Install

```
$ npm install --save p-map-series
```


## Usage

```js
const pMapSeries = require('p-map-series');

const keywords = [
	getTopKeyword() //=> Promise
	'rainbow',
	'pony'
];

let scores = [];

const mapper = keyword => fetchScore(keyword).then(score => {
	scores.push(score);
	return {keyword, score};
});

pMapSeries(keywords, mapper).then(result => {
	console.log(result);
	/*
	[{
		keyword: 'unicorn',
		score: 99
	}, {
		keyword: 'rainbow',
		score: 70
	}, {
		keyword: 'pony',
		score: 79}
	]
	*/
});
```


## API

### pMapSeries(input, mapper)

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `mapper` are fulfilled, or rejects if any of the promises reject. The fulfilled value is an `Array` of the `mapper` created promises fulfillment values.

#### input

Type: `Iterable<Promise|any>`

Mapped over serially in the `mapper` function.

#### mapper(element, index)

Type: `Function`

Expected to return a value. If it's a `Promise`, it's awaited before continuing with the next iteration.


## Related

- [p-each-series](https://github.com/sindresorhus/p-each-series) - Iterate over promises serially
- [p-reduce](https://github.com/sindresorhus/p-reduce) - Reduce a list of values using promises into a promise for a value
- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
