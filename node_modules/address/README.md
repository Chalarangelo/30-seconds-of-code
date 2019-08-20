address
=======

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/address.svg?style=flat-square
[npm-url]: https://npmjs.org/package/address
[travis-image]: https://img.shields.io/travis/node-modules/address.svg?style=flat-square
[travis-url]: https://travis-ci.org/node-modules/address
[coveralls-image]: https://img.shields.io/coveralls/node-modules/address.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/node-modules/address?branch=master
[gittip-image]: https://img.shields.io/gittip/fengmk2.svg?style=flat-square
[gittip-url]: https://www.gittip.com/fengmk2/
[david-image]: https://img.shields.io/david/node-modules/address.svg?style=flat-square
[david-url]: https://david-dm.org/node-modules/address
[download-image]: https://img.shields.io/npm/dm/address.svg?style=flat-square
[download-url]: https://npmjs.org/package/address

Get current machine IP, MAC and DNS servers.

DNS servers receive from `/etc/resolv.conf`.

## Install

```bash
$ npm install address
```

## Usage

Get IP is sync and get MAC is async for now.

```js
var address = require('address');

// default interface 'eth' on linux, 'en' on osx.
address.ip();   // '192.168.0.2'
address.ipv6(); // 'fe80::7aca:39ff:feb0:e67d'
address.mac(function (err, addr) {
  console.log(addr); // '78:ca:39:b0:e6:7d'
});

// local loopback
address.ip('lo'); // '127.0.0.1'

// vboxnet MAC
address.mac('vboxnet', function (err, addr) {
  console.log(addr); // '0a:00:27:00:00:00'
});
```

### Get all addresses: IPv4, IPv6 and MAC

```js
address(function (err, addrs) {
  console.log(addrs.ip, addrs.ipv6, addrs.mac);
  // '192.168.0.2', 'fe80::7aca:39ff:feb0:e67d', '78:ca:39:b0:e6:7d'
});

address('vboxnet', function (err, addrs) {
  console.log(addrs.ip, addrs.ipv6, addrs.mac);
  // '192.168.56.1', null, '0a:00:27:00:00:00'
});
```

### Get an interface info with family

```js
address.interface('IPv4', 'eth1');
// { address: '192.168.1.1', family: 'IPv4', mac: '78:ca:39:b0:e6:7d' }
```

### Get DNS servers

```js
address.dns(function (err, addrs) {
  console.log(addrs);
  // ['10.13.2.1', '10.13.2.6']
});
```

## benchmark

run `$ npm run benchmark`

```
18,929 op/s » #ip
17,622 op/s » #ipv6
16,347 op/s » #mac
11,906 op/s » #dns
```

## License

[MIT](LICENSE.txt)
