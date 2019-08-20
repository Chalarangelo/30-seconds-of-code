# logalot [![Build Status](http://img.shields.io/travis/imagemin/logalot.svg?style=flat)](https://travis-ci.org/imagemin/logalot)

> Tiny log utility

## Install

```sh
$ npm install --save logalot
```

## Usage

```js
var log = require('logalot');

log.info('this is a message');
log.warn('this is a warning');
log.success('this is a success message');
log.error(new Error('this is a error').stack);

/*
  ℹ this is a message
  ⚠ this is a warning
  ✔ this is a success message
  ✖ Error: this is an error
    at ChildProcess.exithandler (child_process.js:648:15)
    at ChildProcess.emit (events.js:98:17)
 */
```

## License

MIT © [imagemin](https://github.com/imagemin)
