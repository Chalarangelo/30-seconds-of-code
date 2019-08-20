# multicast-dns

Low level multicast-dns implementation in pure javascript

```
npm install multicast-dns
```

[![build status](http://img.shields.io/travis/mafintosh/multicast-dns.svg?style=flat)](http://travis-ci.org/mafintosh/multicast-dns)

## Usage

``` js
var mdns = require('multicast-dns')()

mdns.on('response', function(response) {
  console.log('got a response packet:', response)
})

mdns.on('query', function(query) {
  console.log('got a query packet:', query)
})

// lets query for an A record for 'brunhilde.local'
mdns.query({
  questions:[{
    name: 'brunhilde.local',
    type: 'A'
  }]
})
```

Running the above (change `brunhilde.local` to `your-own-hostname.local`) will print an echo of the query packet first

``` js
got a query packet: { type: 'query',
  questions: [ { name: 'brunhilde.local', type: 'A', class: 1 } ],
  answers: [],
  authorities: [],
  additionals: [] }
```

And then a response packet

``` js
got a response packet: { type: 'response',
  questions: [],
  answers:
   [ { name: 'brunhilde.local',
       type: 'A',
       class: 1,
       ttl: 120,
       flush: true,
       data: '192.168.1.5' } ],
  authorities: [],
  additionals:
   [ { name: 'brunhilde.local',
       type: 'A',
       class: 1,
       ttl: 120,
       flush: true,
       data: '192.168.1.5' },
     { name: 'brunhilde.local',
       type: 'AAAA',
       class: 1,
       ttl: 120,
       flush: true,
       data: 'fe80::5ef9:38ff:fe8c:ceaa' } ] }
```


# CLI

```
npm install -g multicast-dns
```

```
multicast-dns brunhilde.local
> 192.168.1.1
```

# API

A packet has the following format

``` js
{
  questions: [{
    name:'brunhilde.local',
    type:'A'
  }],
  answers: [{
    name:'brunhilde.local',
    type:'A',
    ttl:seconds,
    data:(record type specific data)
  }],
  additionals: [
    (same format as answers)
  ],
  authorities: [
    (same format as answers)
  ]
}
```

Currently data from `SRV`, `A`, `PTR`, `TXT`, `AAAA` and `HINFO` records is passed

#### `mdns = multicastdns([options])`

Creates a new `mdns` instance. Options can contain the following

``` js
{
  multicast: true // use udp multicasting
  interface: '192.168.0.2' // explicitly specify a network interface. defaults to all
  port: 5353, // set the udp port
  ip: '224.0.0.251', // set the udp ip
  ttl: 255, // set the multicast ttl
  loopback: true, // receive your own packets
  reuseAddr: true // set the reuseAddr option when creating the socket (requires node >=0.11.13)
}
```

#### `mdns.on('query', (packet, rinfo))`

Emitted when a query packet is received.

``` js
mdns.on('query', function(query) {
  if (query.questions[0] && query.questions[0].name === 'brunhilde.local') {
    mdns.respond(someResponse) // see below
  }
})
```

#### `mdns.on('response', (packet, rinfo))`

Emitted when a response packet is received.

The response might not be a response to a query you send as this
is the result of someone multicasting a response.

#### `mdns.query(packet, [cb])`

Send a dns query. The callback will be called when the packet was sent.

The following shorthands are equivalent

``` js
mdns.query('brunhilde.local', 'A')
mdns.query([{name:'brunhilde.local', type:'A'}])
mdns.query({
  questions: [{name:'brunhilde.local', type:'A'}]
})
```

#### `mdns.respond(packet, [cb])`

Send a dns response. The callback will be called when the packet was sent.

``` js
// reply with a SRV and a A record as an answer
mdns.respond({
  answers: [{
    name: 'my-service',
    type: 'SRV',
    data: {
      port:9999,
      weigth: 0,
      priority: 10,
      target: 'my-service.example.com'
    }
  }, {
    name: 'brunhilde.local',
    type: 'A',
    ttl: 300,
    data: '192.168.1.5'
  }]
})
```

The following shorthands are equivalent

``` js
mdns.respond([{name:'brunhilde.local', type:'A', data:'192.158.1.5'}])
mdns.respond({
  answers: [{name:'brunhilde.local', type:'A', data:'192.158.1.5'}]
})
```

#### `mdns.destroy()`

Destroy the mdns instance. Closes the udp socket.

# Development

To start hacking on this module you can use this example to get started

```
git clone git://github.com/mafintosh/multicast-dns.git
npm install
node example.js
node cli.js $(hostname).local
```

## License

MIT
