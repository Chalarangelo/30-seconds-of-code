# dns-equal

Compare DNS record strings for equality. Enforces [RFC
1035](https://tools.ietf.org/html/rfc1035) domain comparison.

[![Build status](https://travis-ci.org/watson/dns-equal.svg?branch=master)](https://travis-ci.org/watson/dns-equal)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install dns-equal --save
```

## Usage

```js
var dnsEqual = require('dns-equal')

var domain1 = 'Example.COM'
var domain2 = 'example.com'

if (dnsEqual(domain1, domain2)) {
  console.log('The two domains are the same')
}
```

## License

MIT
