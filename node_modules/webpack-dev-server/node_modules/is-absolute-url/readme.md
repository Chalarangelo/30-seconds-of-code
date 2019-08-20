# is-absolute-url [![Build Status](https://travis-ci.org/sindresorhus/is-absolute-url.svg?branch=master)](https://travis-ci.org/sindresorhus/is-absolute-url)

> Check if a URL is absolute


## Install

```
$ npm install is-absolute-url
```


## Usage

```js
const isAbsoluteUrl = require('is-absolute-url');

isAbsoluteUrl('https://sindresorhus.com/foo/bar');
//=> true

isAbsoluteUrl('//sindresorhus.com');
//=> false

isAbsoluteUrl('foo/bar');
//=> false
```


## Related

See [is-relative-url](https://github.com/sindresorhus/is-relative-url) for the inverse.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
