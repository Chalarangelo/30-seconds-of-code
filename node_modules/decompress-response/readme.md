# decompress-response [![Build Status](https://travis-ci.org/sindresorhus/decompress-response.svg?branch=master)](https://travis-ci.org/sindresorhus/decompress-response)

> Decompress a HTTP response if needed

Decompresses the [response](https://nodejs.org/api/http.html#http_class_http_incomingmessage) from [`http.request`](https://nodejs.org/api/http.html#http_http_request_options_callback) if it's gzipped or deflated, otherwise just passes it through.

Used by [`got`](https://github.com/sindresorhus/got).


## Install

```
$ npm install decompress-response
```


## Usage

```js
const http = require('http');
const decompressResponse = require('decompress-response');

http.get('http://sindresorhus.com', response => {
	response = decompressResponse(response);
});
```


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
