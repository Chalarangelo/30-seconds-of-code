# multicast-dns-service-types

Parse and stringify mdns service types

```
npm install multicast-dns-service-types
```

[![build status](http://img.shields.io/travis/mafintosh/multicast-dns-service-types.svg?style=flat)](http://travis-ci.org/mafintosh/multicast-dns-service-types)

## Usage

``` js
var types = require('multicast-dns-service-types')

console.log(types.stringify({name: 'http', protocol: 'tcp', subtypes: ['sub1', 'sub2']})) // _http._tcp._sub1._sub2
console.log(types.parse('_http._tcp._sub1._sub2')) // {name: 'http', protocol: 'tcp', subtypes: ['sub1', 'sub2']}
```

The following shorthands also exist

``` js
types.stringify(name, protocol, subtypes)
types.tcp(name, subtypes) // set protocol to tcp
types.udp(name, subtypes) // set protocol to udp
```

## License

MIT
