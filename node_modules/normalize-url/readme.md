# normalize-url [![Build Status](https://travis-ci.org/sindresorhus/normalize-url.svg?branch=master)](https://travis-ci.org/sindresorhus/normalize-url) [![Coverage Status](https://coveralls.io/repos/github/sindresorhus/normalize-url/badge.svg?branch=master)](https://coveralls.io/github/sindresorhus/normalize-url?branch=master)

> [Normalize](https://en.wikipedia.org/wiki/URL_normalization) a URL

Useful when you need to display, store, deduplicate, sort, compare, etc, URLs.


## Install

```
$ npm install normalize-url
```


## Usage

```js
const normalizeUrl = require('normalize-url');

normalizeUrl('sindresorhus.com');
//=> 'http://sindresorhus.com'

normalizeUrl('HTTP://xn--xample-hva.com:80/?b=bar&a=foo');
//=> 'http://êxample.com/?a=foo&b=bar'
```


## API

### normalizeUrl(url, [options])

#### url

Type: `string`

URL to normalize.

#### options

Type: `Object`

##### defaultProtocol

Type: `string`<br>
Default: `http:`

##### normalizeProtocol

Type: `boolean`<br>
Default: `true`

Prepends `defaultProtocol` to the URL if it's protocol-relative.

```js
normalizeUrl('//sindresorhus.com:80/');
//=> 'http://sindresorhus.com'

normalizeUrl('//sindresorhus.com:80/', {normalizeProtocol: false});
//=> '//sindresorhus.com'
```

##### forceHttp

Type: `boolean`<br>
Default: `false`

Normalizes `https:` URLs to `http:`.

```js
normalizeUrl('https://sindresorhus.com:80/');
//=> 'https://sindresorhus.com'

normalizeUrl('https://sindresorhus.com:80/', {normalizeHttps: true});
//=> 'http://sindresorhus.com'
```

##### forceHttps

Type: `boolean`<br>
Default: `false`

Normalizes `http:` URLs to `https:`.

```js
normalizeUrl('https://sindresorhus.com:80/');
//=> 'https://sindresorhus.com'

normalizeUrl('http://sindresorhus.com:80/', {normalizeHttp: true});
//=> 'https://sindresorhus.com'
```

This option can't be used with the `forceHttp` option at the same time.

##### stripHash

Type: `boolean`<br>
Default: `true`

Removes hash from the URL.

```js
normalizeUrl('sindresorhus.com/about.html#contact');
//=> 'http://sindresorhus.com/about.html'

normalizeUrl('sindresorhus.com/about.html#contact', {stripHash: false});
//=> 'http://sindresorhus.com/about.html#contact'
```

##### stripWWW

Type: `boolean`<br>
Default: `true`

Removes `www.` from the URL.

```js
normalizeUrl('http://www.sindresorhus.com/about.html#contact');
//=> 'http://sindresorhus.com/about.html#contact'

normalizeUrl('http://www.sindresorhus.com/about.html#contact', {stripWWW: false});
//=> 'http://www.sindresorhus.com/about.html#contact'
```

##### removeQueryParameters

Type: `Array<RegExp|string>`<br>
Default: `[/^utm_\w+/i]`

Removes query parameters that matches any of the provided strings or regexes.

```js
normalizeUrl('www.sindresorhus.com?foo=bar&ref=test_ref', {
	removeQueryParameters: ['ref']
});
//=> 'http://sindresorhus.com/?foo=bar'
```

##### removeTrailingSlash

Type: `boolean`<br>
Default: `true`

Removes trailing slash.

**Note:** Trailing slash is always removed if the URL doesn't have a pathname.

```js
normalizeUrl('http://sindresorhus.com/redirect/');
//=> 'http://sindresorhus.com/redirect'

normalizeUrl('http://sindresorhus.com/redirect/', {removeTrailingSlash: false});
//=> 'http://sindresorhus.com/redirect/'

normalizeUrl('http://sindresorhus.com/', {removeTrailingSlash: false});
//=> 'http://sindresorhus.com'
```

##### removeDirectoryIndex

Type: `boolean` `Array<RegExp|string>`<br>
Default: `false`

Removes the default directory index file from path that matches any of the provided strings or regexes. When `true`, the regex `/^index\.[a-z]+$/` is used.

```js
normalizeUrl('www.sindresorhus.com/foo/default.php', {
	removeDirectoryIndex: [/^default\.[a-z]+$/]
});
//=> 'http://sindresorhus.com/foo'
```

##### sortQueryParameters

Type: `boolean`<br>
Default: `true`

Sorts the query parameters alphabetically by key.

```js
normalizeUrl('www.sindresorhus.com?b=two&a=one&c=three', {
	sortQueryParameters: false
});
//=> 'http://sindresorhus.com/?b=two&a=one&c=three'
```


## Related

- [compare-urls](https://github.com/sindresorhus/compare-urls) - Compare URLs by first normalizing them


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
