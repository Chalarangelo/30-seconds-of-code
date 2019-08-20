<h1 align="center">
	<br>
	<img width="360" src="https://rawgit.com/sindresorhus/got/master/media/logo.svg" alt="got">
	<br>
	<br>
	<br>
</h1>

> Simplified HTTP requests

[![Build Status](https://travis-ci.org/sindresorhus/got.svg?branch=master)](https://travis-ci.org/sindresorhus/got) [![Coverage Status](https://coveralls.io/repos/github/sindresorhus/got/badge.svg?branch=master)](https://coveralls.io/github/sindresorhus/got?branch=master) [![Downloads](https://img.shields.io/npm/dm/got.svg)](https://npmjs.com/got)

A nicer interface to the built-in [`http`](http://nodejs.org/api/http.html) module.

Created because [`request`](https://github.com/request/request) is bloated *(several megabytes!)*.


## Highlights

- [Promise & stream API](#api)
- [Request cancelation](#aborting-the-request)
- [Follows redirects](#followredirect)
- [Retries on network failure](#retries)
- [Handles gzip/deflate](#decompress)
- [Timeout handling](#timeout)
- [Errors with metadata](#errors)
- [JSON mode](#json)
- [WHATWG URL support](#url)
- [Electron support](#useelectronnet)


## Install

```
$ npm install --save got
```


## Usage

```js
const fs = require('fs');
const got = require('got');

got('todomvc.com')
	.then(response => {
		console.log(response.body);
		//=> '<!doctype html> ...'
	})
	.catch(error => {
		console.log(error.response.body);
		//=> 'Internal server error ...'
	});

// Streams
got.stream('todomvc.com').pipe(fs.createWriteStream('index.html'));

// For POST, PUT and PATCH methods got.stream returns a WritableStream
fs.createReadStream('index.html').pipe(got.stream.post('todomvc.com'));
```


### API

It's a `GET` request by default, but can be changed in `options`.

#### got(url, [options])

Returns a Promise for a `response` object with a `body` property, a `url` property with the request URL or the final URL after redirects, and a `requestUrl` property with the original request URL.

##### url

Type: `string` `Object`

The URL to request as simple string, a [`http.request` options](https://nodejs.org/api/http.html#http_http_request_options_callback), or a [WHATWG `URL`](https://nodejs.org/api/url.html#url_class_url).

Properties from `options` will override properties in the parsed `url`.

##### options

Type: `Object`

Any of the [`http.request`](http://nodejs.org/api/http.html#http_http_request_options_callback) options.

###### body

Type: `string` `Buffer` `stream.Readable`

*This is mutually exclusive with stream mode.*

Body that will be sent with a `POST` request.

If present in `options` and `options.method` is not set, `options.method` will be set to `POST`.

If `content-length` or `transfer-encoding` is not set in `options.headers` and `body` is a string or buffer, `content-length` will be set to the body length.

###### encoding

Type: `string` `null`<br>
Default: `'utf8'`

[Encoding](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings) to be used on `setEncoding` of the response data. If `null`, the body is returned as a Buffer.

###### form

Type: `boolean`<br>
Default: `false`

*This is mutually exclusive with stream mode.*

If set to `true` and `Content-Type` header is not set, it will be set to `application/x-www-form-urlencoded`.

`body` must be a plain object or array and will be stringified.

###### json

Type: `boolean`<br>
Default: `false`

*This is mutually exclusive with stream mode.*

If set to `true` and `Content-Type` header is not set, it will be set to `application/json`.

Parse response body with `JSON.parse` and set `accept` header to `application/json`. If used in conjunction with the `form` option, the `body` will the stringified as querystring and the response parsed as JSON.

`body` must be a plain object or array and will be stringified.

###### query

Type: `string` `Object`<br>

Query string object that will be added to the request URL. This will override the query string in `url`.

###### timeout

Type: `number` `Object`

Milliseconds to wait for the server to end the response before aborting request with `ETIMEDOUT` error.

This also accepts an object with separate `connect`, `socket`, and `request` fields for connection, socket, and entire request timeouts.

###### retries

Type: `number` `Function`<br>
Default: `2`

Number of request retries when network errors happens. Delays between retries counts with function `1000 * Math.pow(2, retry) + Math.random() * 100`, where `retry` is attempt number (starts from 0).

Option accepts `function` with `retry` and `error` arguments. Function must return delay in milliseconds (`0` return value cancels retry).

**Note:** if `retries` is `number`, `ENOTFOUND` and `ENETUNREACH` error will not be retried (see full list in [`is-retry-allowed`](https://github.com/floatdrop/is-retry-allowed/blob/master/index.js#L12) module).

###### followRedirect

Type: `boolean`<br>
Default: `true`

Defines if redirect responses should be followed automatically.

Note that if a `303` is sent by the server in response to any request type (`POST`, `DELETE`, etc.), got will automatically
request the resource pointed to in the location header via `GET`. This is in accordance with [the spec](https://tools.ietf.org/html/rfc7231#section-6.4.4).

###### decompress

Type: `boolean`<br>
Default: `true`

Decompress the response automatically.

If this is disabled, a compressed response is returned as a `Buffer`. This may be useful if you want to handle decompression yourself or stream the raw compressed data.

###### useElectronNet

Type: `boolean`<br>
Default: `true`

When used in Electron, Got will automatically use [`electron.net`](https://electron.atom.io/docs/api/net/) instead of the Node.js `http` module. It should be fully compatible, but you can turn it off here if you encounter a problem. Please open an issue if you do!


#### Streams

#### got.stream(url, [options])

`stream` method will return Duplex stream with additional events:

##### .on('request', request)

`request` event to get the request object of the request.

**Tip**: You can use `request` event to abort request:

```js
got.stream('github.com')
	.on('request', req => setTimeout(() => req.abort(), 50));
```

##### .on('response', response)

`response` event to get the response object of the final request.

##### .on('redirect', response, nextOptions)

`redirect` event to get the response object of a redirect. The second argument is options for the next request to the redirect location.

##### .on('error', error, body, response)

`error` event emitted in case of protocol error (like `ENOTFOUND` etc.) or status error (4xx or 5xx). The second argument is the body of the server response in case of status error. The third argument is response object.

#### got.get(url, [options])
#### got.post(url, [options])
#### got.put(url, [options])
#### got.patch(url, [options])
#### got.head(url, [options])
#### got.delete(url, [options])

Sets `options.method` to the method name and makes a request.


## Errors

Each error contains (if available) `statusCode`, `statusMessage`, `host`, `hostname`, `method`, `path`, `protocol` and `url` properties to make debugging easier.

In Promise mode, the `response` is attached to the error.

#### got.RequestError

When a request fails. Contains a `code` property with error class code, like `ECONNREFUSED`.

#### got.ReadError

When reading from response stream fails.

#### got.ParseError

When `json` option is enabled, server response code is 2xx, and `JSON.parse` fails.

#### got.HTTPError

When server response code is not 2xx. Includes `statusCode`, `statusMessage`, and `redirectUrls` properties.

#### got.MaxRedirectsError

When server redirects you more than 10 times. Includes a `redirectUrls` property, which is an array of the URLs Got was redirected to before giving up.

#### got.UnsupportedProtocolError

When given an unsupported protocol.


## Aborting the request

The promise returned by Got has a `.cancel()` function which, when called, aborts the request.


## Proxies

You can use the [`tunnel`](https://github.com/koichik/node-tunnel) module with the `agent` option to work with proxies:

```js
const got = require('got');
const tunnel = require('tunnel');

got('todomvc.com', {
	agent: tunnel.httpOverHttp({
		proxy: {
			host: 'localhost'
		}
	})
});
```


## Cookies

You can use the [`cookie`](https://github.com/jshttp/cookie) module to include cookies in a request:

```js
const got = require('got');
const cookie = require('cookie');

got('google.com', {
	headers: {
		cookie: cookie.serialize('foo', 'bar')
	}
});
```


## Form data

You can use the [`form-data`](https://github.com/form-data/form-data) module to create POST request with form data:

```js
const fs = require('fs');
const got = require('got');
const FormData = require('form-data');
const form = new FormData();

form.append('my_file', fs.createReadStream('/foo/bar.jpg'));

got.post('google.com', {
	body: form
});
```


## OAuth

You can use the [`oauth-1.0a`](https://github.com/ddo/oauth-1.0a) module to create a signed OAuth request:

```js
const got = require('got');
const crypto  = require('crypto');
const OAuth = require('oauth-1.0a');

const oauth = OAuth({
	consumer: {
		key: process.env.CONSUMER_KEY,
		secret: process.env.CONSUMER_SECRET
	},
	signature_method: 'HMAC-SHA1',
	hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

const token = {
	key: process.env.ACCESS_TOKEN,
	secret: process.env.ACCESS_TOKEN_SECRET
};

const url = 'https://api.twitter.com/1.1/statuses/home_timeline.json';

got(url, {
	headers: oauth.toHeader(oauth.authorize({url, method: 'GET'}, token)),
	json: true
});
```


## Unix Domain Sockets

Requests can also be sent via [unix domain sockets](http://serverfault.com/questions/124517/whats-the-difference-between-unix-socket-and-tcp-ip-socket). Use the following URL scheme: `PROTOCOL://unix:SOCKET:PATH`.

- `PROTOCOL` - `http` or `https` *(optional)*
- `SOCKET` - absolute path to a unix domain socket, e.g. `/var/run/docker.sock`
- `PATH` - request path, e.g. `/v2/keys`

```js
got('http://unix:/var/run/docker.sock:/containers/json');

// or without protocol (http by default)
got('unix:/var/run/docker.sock:/containers/json');
```

## AWS

Requests to AWS services need to have their headers signed. This can be accomplished by using the [`aws4`](https://www.npmjs.com/package/aws4) package. This is an example for querying an ["Elasticsearch Service"](https://aws.amazon.com/elasticsearch-service/) host with a signed request.

```js
const url = require('url');
const AWS = require('aws-sdk');
const aws4 = require('aws4');
const got = require('got');
const config = require('./config');

// Reads keys from the environment or `~/.aws/credentials`. Could be a plain object.
const awsConfig = new AWS.Config({ region: config.region });

function request(uri, options) {
	const awsOpts = {
		region: awsConfig.region,
		headers: {
			accept: 'application/json',
			'content-type': 'application/json'
		},
		method: 'GET',
		json: true
	};

	// We need to parse the URL before passing it to `got` so `aws4` can sign the request
	const opts = Object.assign(url.parse(uri), awsOpts, options);
	aws4.sign(opts, awsConfig.credentials);

	return got(opts);
}

request(`https://${config.host}/production/users/1`);

request(`https://${config.host}/production/`, {
	// All usual `got` options
});
```


## Tips

### User Agent

It's a good idea to set the `'user-agent'` header so the provider can more easily see how their resource is used. By default, it's the URL to this repo.

```js
const got = require('got');
const pkg = require('./package.json');

got('todomvc.com', {
	headers: {
		'user-agent': `my-module/${pkg.version} (https://github.com/username/my-module)`
	}
});
```

### 304 Responses

Bear in mind, if you send an `if-modified-since` header and receive a `304 Not Modified` response, the body will be empty. It's your responsibility to cache and retrieve the body contents.


## Related

- [gh-got](https://github.com/sindresorhus/gh-got) - Convenience wrapper for interacting with the GitHub API
- [travis-got](https://github.com/samverschueren/travis-got) - Convenience wrapper for interacting with the Travis API


## Created by

[![Sindre Sorhus](https://avatars.githubusercontent.com/u/170270?v=3&s=100)](https://sindresorhus.com) | [![Vsevolod Strukchinsky](https://avatars.githubusercontent.com/u/365089?v=3&s=100)](https://github.com/floatdrop) | [![Alexander Tesfamichael](https://avatars.githubusercontent.com/u/2011351?v=3&s=100)](https://alextes.me)
---|---|---
[Sindre Sorhus](https://sindresorhus.com) | [Vsevolod Strukchinsky](https://github.com/floatdrop) | [Alexander Tesfamichael](https://alextes.me)


## License

MIT
