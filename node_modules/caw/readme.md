# caw [![Build Status](https://travis-ci.org/kevva/caw.svg?branch=master)](https://travis-ci.org/kevva/caw)

> Construct HTTP/HTTPS agents for tunneling proxies


## Install

```
$ npm install caw
```


## Usage

```js
const caw = require('caw');
const got = require('got');

got('todomvc.com', {
	agent: caw()
}, () => {});
```


## API

### caw([proxy], [options])

#### proxy

Type: `string`

Proxy URL. If not set, it'll try getting it using [`get-proxy`](https://github.com/kevva/get-proxy).

#### options

Type: `Object`

Besides the options below, you can pass in options allowed in [tunnel-agent](https://github.com/request/tunnel-agent).

##### protocol

Type: `string`<br>
Default: `http`

Endpoint protocol.


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
