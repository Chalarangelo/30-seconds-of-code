# os-locale [![Build Status](https://travis-ci.org/sindresorhus/os-locale.svg?branch=master)](https://travis-ci.org/sindresorhus/os-locale)

> Get the system [locale](http://en.wikipedia.org/wiki/Locale)

Useful for localizing your module or app.

POSIX systems: The returned locale refers to the [`LC_MESSAGE`](http://www.gnu.org/software/libc/manual/html_node/Locale-Categories.html#Locale-Categories) category, suitable for selecting the language used in the user interface for message translation.


## Install

```
$ npm install --save os-locale
```


## Usage

```js
var osLocale = require('os-locale');

osLocale(function (err, locale) {
	console.log(locale);
	//=> 'en_US'
});
```


## API

### osLocale([options], callback(error, locale))

### osLocale.sync([options])

Returns the locale.

#### options.spawn

Type: `boolean`  
Default: `true`

Set to `false` to avoid spawning subprocesses and instead only resolve the locale from environment variables.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
