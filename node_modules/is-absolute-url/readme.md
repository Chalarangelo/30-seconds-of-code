# is-absolute-url [![Build Status](https://travis-ci.org/sindresorhus/is-absolute-url.svg?branch=master)](https://travis-ci.org/sindresorhus/is-absolute-url)

> Check if an URL is absolute


## Install

```sh
$ npm install --save is-absolute-url
```


## Usage

```js
var isAbsoluteUrl = require('is-absolute-url');

isAbsoluteUrl('http://sindresorhus.com/foo/bar');
//=> true

isAbsoluteUrl('//sindresorhus.com');
//=> false

isAbsoluteUrl('foo/bar');
//=> false
```


## Related

See [is-relative-url](https://github.com/sindresorhus/is-relative-url) for the inverse.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
