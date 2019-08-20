# map-obj [![Build Status](https://travis-ci.org/sindresorhus/map-obj.svg?branch=master)](https://travis-ci.org/sindresorhus/map-obj)

> Map object keys and values into a new object


## Install

```
$ npm install --save map-obj
```


## Usage

```js
var mapObj = require('map-obj');

var newObject = mapObj({foo: 'bar'}, function (key, value, object) {
	// first element is the new key and second is the new value
	// here we reverse the order
	return [value, key];
});
//=> {bar: 'foo'}
```


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
