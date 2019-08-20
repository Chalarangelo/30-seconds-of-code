# prepend-http [![Build Status](https://travis-ci.org/sindresorhus/prepend-http.svg?branch=master)](https://travis-ci.org/sindresorhus/prepend-http)

> Prepend `http://` to humanized URLs like `todomvc.com` and `localhost`


## Install

```
$ npm install prepend-http
```


## Usage

```js
const prependHttp = require('prepend-http');

prependHttp('todomvc.com');
//=> 'http://todomvc.com'

prependHttp('localhost');
//=> 'http://localhost'

prependHttp('http://todomvc.com');
//=> 'http://todomvc.com'

prependHttp('todomvc.com', {https: true});
//=> 'https://todomvc.com'
```


## API

### prependHttp(url, [options])

#### url

Type: `string`

URL to prepend `http://` on.

#### options

Type: `Object`

##### https

Type: `boolean`<br>
Default: `false`

Prepend `https://` instead of `http://`.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
