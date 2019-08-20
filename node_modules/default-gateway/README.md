# default-gateway
[![](https://img.shields.io/npm/v/default-gateway.svg?style=flat)](https://www.npmjs.org/package/default-gateway) [![](https://img.shields.io/npm/dm/default-gateway.svg)](https://www.npmjs.org/package/default-gateway) [![](https://api.travis-ci.org/silverwind/default-gateway.svg?style=flat)](https://travis-ci.org/silverwind/default-gateway)

> Get the default network gateway, cross-platform.

Obtains the machine's default gateway through `exec` calls to OS routing interfaces. On Linux and Android, the `ip` command must be available (usually provided by the `iproute2` package). On IBM i, the `db2util` command must be available (provided by the `db2util` package).

## Installation

```
$ npm install default-gateway
```

## Example

```js
const defaultGateway = require('default-gateway');

defaultGateway.v4().then(result => {
  // result = {gateway: '1.2.3.4', interface: 'en1'}
});

defaultGateway.v6().then(result => {
  // result = {gateway: '2001:db8::1', interface: 'en2'}
});

const result = defaultGateway.v4.sync();
// result = {gateway: '1.2.3.4', interface: 'en1'}

const result = defaultGateway.v6.sync();
// result = {gateway: '2001:db8::1', interface: 'en2'}
```

## API
### defaultGateway.v4()
### defaultGateway.v6()
### defaultGateway.v4.sync()
### defaultGateway.v6.sync()

Returns: `result` *Object*
  - `gateway`: The IP address of the default gateway.
  - `interface`: The name of the interface. On Windows, this is the network adapter name.

The `.v{4,6}()` methods return a Promise while the `.v{4,6}.sync()` variants will return the result synchronously.

The `gateway` property will always be defined on success, while `interface` can be `null` if it cannot be determined. All methods reject/throw on unexpected conditions.

## License

© [silverwind](https://github.com/silverwind), distributed under BSD licence
