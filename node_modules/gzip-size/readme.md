# gzip-size [![Build Status](https://travis-ci.org/sindresorhus/gzip-size.svg?branch=master)](https://travis-ci.org/sindresorhus/gzip-size)

> Get the gzipped size of a string or buffer


## Install

```
$ npm install --save gzip-size
```


## Usage

```js
var gzipSize = require('gzip-size');
var string = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.';

console.log(string.length);
//=> 191

console.log(gzipSize.sync(string));
//=> 78
```


## API

### gzipSize(input, callback)
### gzipSize.sync(input)

#### input

Type: `string`, `buffer`

#### callback(error, size)

Type: `function`

### gzipSize.stream()

Returns a passthrough stream. The stream emits a `gzip-size` event and has a `gzipSize` property.


## Related

- [gzip-size-cli](https://github.com/sindresorhus/gzip-size-cli) - CLI for this module


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
