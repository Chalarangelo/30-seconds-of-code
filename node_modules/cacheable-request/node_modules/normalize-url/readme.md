# normalize-url [![Build Status](https://travis-ci.org/sindresorhus/normalize-url.svg?branch=master)](https://travis-ci.org/sindresorhus/normalize-url)

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

##### normalizeProtocol

Type: `boolean`<br>
Default: `true`

Prepend `http:` to the URL if it's protocol-relative.

```js
normalizeUrl('//sindresorhus.com:80/');
//=> 'http://sindresorhus.com'

normalizeUrl('//sindresorhus.com:80/', {normalizeProtocol: false});
//=> '//sindresorhus.com'
```

##### normalizeHttps

Type: `boolean`<br>
Default: `false`

Normalize `https:` URLs to `http:`.

```js
normalizeUrl('https://sindresorhus.com:80/');
//=> 'https://sindresorhus.com'

normalizeUrl('https://sindresorhus.com:80/', {normalizeHttps: true});
//=> 'http://sindresorhus.com'
```

##### stripFragment

Type: `boolean`<br>
Default: `true`

Remove the fragment at the end of the URL.

```js
normalizeUrl('sindresorhus.com/about.html#contact');
//=> 'http://sindresorhus.com/about.html'

normalizeUrl('sindresorhus.com/about.html#contact', {stripFragment: false});
//=> 'http://sindresorhus.com/about.html#contact'
```

##### stripWWW

Type: `boolean`<br>
Default: `true`

Remove `www.` from the URL.

```js
normalizeUrl('http://www.sindresorhus.com/about.html#contact');
//=> 'http://sindresorhus.com/about.html#contact'

normalizeUrl('http://www.sindresorhus.com/about.html#contact', {stripWWW: false});
//=> 'http://www.sindresorhus.com/about.html#contact'
```

##### removeQueryParameters

Type: `Array<RegExp|string>`<br>
Default: `[/^utm_\w+/i]`

Remove query parameters that matches any of the provided strings or regexes.

```js
normalizeUrl('www.sindresorhus.com?foo=bar&ref=test_ref', {
	removeQueryParameters: ['ref']
});
//=> 'http://sindresorhus.com/?foo=bar'
```

##### removeTrailingSlash

Type: `boolean`<br>
Default: `true`

Remove trailing slash.

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

Remove the default directory index file from path that matches any of the provided strings or regexes. When `true`, the regex `/^index\.[a-z]+$/` is used.

```js
normalizeUrl('www.sindresorhus.com/foo/default.php', {
	removeDirectoryIndex: [/^default\.[a-z]+$/]
});
//=> 'http://sindresorhus.com/foo'
```

##### sortQueryParameters

Type: `boolean`<br>
Default: `true`

Sort the query parameters alphabetically by key.

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
