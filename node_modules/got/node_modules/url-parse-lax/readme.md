# url-parse-lax [![Build Status](https://travis-ci.org/sindresorhus/url-parse-lax.svg?branch=master)](https://travis-ci.org/sindresorhus/url-parse-lax)

> Lax [`url.parse()`](https://nodejs.org/docs/latest/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost) with support for protocol-less URLs & IPs


## Install

```
$ npm install url-parse-lax
```


## Usage

```js
const urlParseLax = require('url-parse-lax');

urlParseLax('sindresorhus.com');
/*
{
	protocol: 'https:',
	slashes: true,
	auth: null,
	host: 'sindresorhus.com',
	port: null,
	hostname: 'sindresorhus.com',
	hash: null,
	search: null,
	query: null,
	pathname: '/',
	path: '/',
	href: 'https://sindresorhus.com/'
}
*/

urlParseLax('[2001:db8::]:8000');
/*
{
	protocol: null,
	slashes: true,
	auth: null,
	host: '[2001:db8::]:8000',
	port: '8000',
	hostname: '2001:db8::',
	hash: null,
	search: null,
	query: null,
	pathname: '/',
	path: '/',
	href: 'http://[2001:db8::]:8000/'
}
*/
```

And with the built-in `url.parse()`:

```js
const url = require('url');

url.parse('sindresorhus.com');
/*
{
	protocol: null,
	slashes: null,
	auth: null,
	host: null,
	port: null,
	hostname: null,
	hash: null,
	search: null,
	query: null,
	pathname: 'sindresorhus',
	path: 'sindresorhus',
	href: 'sindresorhus'
}
*/

url.parse('[2001:db8::]:8000');
/*
{
	protocol: null,
	slashes: null,
	auth: null,
	host: null,
	port: null,
	hostname: null,
	hash: null,
	search: null,
	query: null,
	pathname: '[2001:db8::]:8000',
	path: '[2001:db8::]:8000',
	href: '[2001:db8::]:8000'
}
*/
```


## API

### urlParseLax(url, [options])

#### url

Type: `string`

URL to parse.

#### options

Type: `Object`

##### https

Type: `boolean`<br>
Default: `true`

Prepend `https://` instead of `http://` to protocol-less URLs.


## Related

- [url-format-lax](https://github.com/sindresorhus/url-format-lax) - Lax `url.format()` that formats a hostname and port into IPv6-compatible socket form of `hostname:port`


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
