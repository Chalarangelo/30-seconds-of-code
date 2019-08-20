# currently-unhandled [![Build Status](https://travis-ci.org/jamestalmage/currently-unhandled.svg?branch=master)](https://travis-ci.org/jamestalmage/currently-unhandled) [![Coverage Status](https://coveralls.io/repos/github/jamestalmage/currently-unhandled/badge.svg?branch=master)](https://coveralls.io/github/jamestalmage/currently-unhandled?branch=master)

> Track the list of currently unhandled promise rejections.


## Install

```
$ npm install --save currently-unhandled
```


## Usage

```js
const currentlyUnhandled = require('currently-unhandled')(); // <- note the invocation

var fooError = new Error('foo');
var p = Promise.reject(new Error('foo'));

// on the next tick - unhandled rejected promise is added to the list:
currentlyUnhandled();
//=> [{promise: p, reason: fooError}]'

p.catch(() => {});

// on the next tick - handled promise is now removed from the list:
currentlyUnhandled();
//=> [];
```

## API

### currentlyUnhandled()

Returns an array of objects with `promise` and `reason` properties representing the rejected promises that currently do not have a rejection handler. The list grows and shrinks as unhandledRejections are published, and later handled.

## Browser Support

This module can be bundled with `browserify`. At time of writing, it will work with native Promises in the Chrome browser only. For best cross-browser support, use `bluebird` instead of native Promise support in browsers.

## License

MIT © [James Talmage](http://github.com/jamestalmage)
