# yeast

[![Made by unshift](https://img.shields.io/badge/made%20by-unshift-00ffcc.svg?style=flat-square)](http://unshift.io)[![Version npm](https://img.shields.io/npm/v/yeast.svg?style=flat-square)](http://browsenpm.org/package/yeast)[![Build Status](https://img.shields.io/travis/unshiftio/yeast/master.svg?style=flat-square)](https://travis-ci.org/unshiftio/yeast)[![Dependencies](https://img.shields.io/david/unshiftio/yeast.svg?style=flat-square)](https://david-dm.org/unshiftio/yeast)[![Coverage Status](https://img.shields.io/coveralls/unshiftio/yeast/master.svg?style=flat-square)](https://coveralls.io/r/unshiftio/yeast?branch=master)[![IRC channel](https://img.shields.io/badge/IRC-irc.freenode.net%23unshift-00a8ff.svg?style=flat-square)](https://webchat.freenode.net/?channels=unshift)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/yeast.svg)](https://saucelabs.com/u/yeast)

Yeast is a unique id generator. It has been primarily designed to generate a
unique id which can be used for cache busting. A common practice for this is
to use a timestamp, but there are couple of downsides when using timestamps.

1. The timestamp is already 13 chars long. This might not matter for 1 request
   but if you make hundreds of them this quickly adds up in bandwidth and
   processing time.
2. It's not unique enough. If you generate two stamps right after each other,
   they would be identical because the timing accuracy is limited to
   milliseconds.

Yeast solves both of these issues by:

1. Compressing the generated timestamp using a custom `encode()` function that
   returns a string representation of the number.
2. Seeding the id in case of collision (when the id is identical to the previous
   one).

To keep the strings unique it will use the `.` char to separate the generated
stamp from the seed.

## Installation

The module is intended to be used in browsers as well as in Node.js and is
therefore released in the npm registry and can be installed using:

```
npm install --save yeast
```

## Usage

All the examples assume that this library is initialized as follow:

```js
'use strict';

var yeast = require('yeast');
```

To generate an id just call the `yeast` function.

```js
console.log(yeast(), yeast(), yeast()); // outputs: KyxidwN KyxidwN.0 KyxidwN.1

setTimeout(function () {
  console.log(yeast()); // outputs: KyxidwO
});
```

### yeast.encode(num)

An helper function that returns a string representing the specified number. The
returned string contains only URL safe characters.

```js
yeast.encode(+new Date()); // outputs: Kyxjuo1
```

### yeast.decode(str)

An helper function that returns the integer value specified by the given string.
This function can be used to retrieve the timestamp from a `yeast` id.

```js
var id = yeast(); // holds the value: Kyxl1OU

yeast.decode(id); // outputs: 1439816226334
```

That's all folks. If you have ideas on how we can further compress the ids
please open an issue!

## License

[MIT](LICENSE)
