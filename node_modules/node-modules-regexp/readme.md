# node-modules-regexp [![Build Status](https://travis-ci.org/jamestalmage/node-modules-regexp.svg?branch=master)](https://travis-ci.org/jamestalmage/node-modules-regexp)

> A regular expression for file paths that contain a `node_modules` folder.


## Install

```
$ npm install --save node-modules-regexp
```


## Usage

```js
const nodeModules = require('node-modules-regexp');

nodeModules.test('/foo/node_modules/bar.js');
//=> true

nodeModules.test('/foo/bar.js');
//=> false
```


## API

The returned value is a regular expression, [soooo....](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

## License

MIT © [James Talmage](http://github.com/jamestalmage)
