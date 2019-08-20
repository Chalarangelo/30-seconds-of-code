# p-reduce [![Build Status](https://travis-ci.org/sindresorhus/p-reduce.svg?branch=master)](https://travis-ci.org/sindresorhus/p-reduce)

> Reduce a list of values using promises into a promise for a value

Useful when you need to calculate some accumulated value based on async resources.


## Install

```
$ npm install --save p-reduce
```


## Usage

```js
const pReduce = require('p-reduce');
const humanInfo = require('human-info'); // not a real module

const names = [
	getUser('sindresorhus').then(info => info.name),
	'Addy Osmani',
	'Pascal Hartig',
	'Stephen Sawchuk'
];

pReduce(names, (total, name) => {
	return humanInfo(name).then(info => total + info.age);
}, 0).then(totalAge => {
	console.log(totalAge);
	//=> 125
});
```


## API

### pReduce(input, reducer, [initialValue])

Returns a `Promise` that is fulfilled when all promises in `input` and ones returned from `reducer` are fulfilled, or rejects if any of the promises reject. The fulfilled value is the result of the reduction.

#### input

Type: `Iterable<Promise|any>`

Iterated over serially in the `reducer` function.

#### reducer(previousValue, currentValue, index)

Type: `Function`

Expected to return a value. If a `Promise` is returned, it's awaited before continuing with the next iteration.

#### initialValue

Type: `any`

Value to use as `previousValue` in the first `reducer` invocation.


## Related

- [p-each-series](https://github.com/sindresorhus/p-each-series) - Iterate over promises serially
- [p-map-series](https://github.com/sindresorhus/p-map-series) - Map over promises serially
- [p-map](https://github.com/sindresorhus/p-map) - Map over promises concurrently
- [More…](https://github.com/sindresorhus/promise-fun)


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
