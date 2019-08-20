# is-alphanumeric [![Build Status](https://travis-ci.org/arthurvr/is-alphanumeric.svg?branch=master)](https://travis-ci.org/arthurvr/is-alphanumeric)

> Check if a string only contains alphanumeric characters


## Install

```
$ npm install --save is-alphanumeric
```


## Usage

```js
var isAlphanumeric = require('is-alphanumeric');

isAlphanumeric('unicorns');
//=> true

isAlphanumeric('55');
//=> true

isAlphanumeric('ABC');
//=> true

isAlphanumeric('*unicorns');
//=> false

isAlphanumeric('{unicorns}');
//=> false

isAlphanumeric(' ');
//=> false
```


## License

MIT © [Arthur Verschaeve](http://arthurverschaeve.be)
