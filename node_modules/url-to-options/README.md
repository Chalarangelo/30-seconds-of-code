# url-to-options [![NPM Version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

Convert a WHATWG [URL](https://developer.mozilla.org/en/docs/Web/API/URL) to an `http.request`/`https.request` options object.


## Installation

[Node.js](http://nodejs.org/) `>= 4` is required. To install, type this at the command line:
```shell
npm install url-to-options
```


## Usage

```js
const urlToOptions = require('url-to-options');

const url = new URL('http://user:pass@hostname:8080/');

const opts = urlToOptions(url);
//-> { auth:'user:pass', port:8080, … }
```


[npm-image]: https://img.shields.io/npm/v/url-to-options.svg
[npm-url]: https://npmjs.org/package/url-to-options
[travis-image]: https://img.shields.io/travis/stevenvachon/url-to-options.svg
[travis-url]: https://travis-ci.org/stevenvachon/url-to-options
