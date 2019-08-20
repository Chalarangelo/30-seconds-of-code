# array-uniq [![Build Status](https://travis-ci.org/sindresorhus/array-uniq.svg?branch=master)](https://travis-ci.org/sindresorhus/array-uniq)

> Create an array without duplicates


## Install

```
$ npm install array-uniq
```


## Usage

```js
const arrayUniq = require('array-uniq');

arrayUniq([1, 1, 2, 3, 3]);
//=> [1, 2, 3]

arrayUniq(['foo', 'foo', 'bar', 'foo']);
//=> ['foo', 'bar']
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
