var mdns = require('./')
var tape = require('tape')
var dgram = require('dgram')

var port = function (cb) {
  var s = dgram.createSocket('udp4')
  s.bind(0, function () {
    var port = s.address().port
    s.on('close', function () {
      cb(port)
    })
    s.close()
  })
}

var configs = [
   {ip: '127.0.0.1', multicast: false}
  // {'interface': '127.0.0.1', multicast: true}
]

var tests = configs.map(function (config) {
  return function (name, fn) {
    tape(name, function (t) {
      port(function (p) {
        config.port = p
        var dns = mdns(config)
        dns.on('warning', function (e) {
          t.error(e)
        })
        fn(dns, t)
      })
    })
  }
})

tests.forEach(function (test) {
  test('works', function (dns, t) {
    t.plan(3)

    dns.once('query', function (packet) {
      t.same(packet.type, 'query')
      dns.destroy(function () {
        t.ok(true, 'destroys')
      })
    })

    dns.query('hello-world', function () {
      t.ok(true, 'flushed')
    })
  })

  test('ANY query', function (dns, t) {
    dns.once('query', function (packet) {
      t.same(packet.questions.length, 1, 'one question')
      t.same(packet.questions[0], {name: 'hello-world', type: 'ANY', class: 1})
      dns.destroy(function () {
        t.end()
      })
    })

    dns.query('hello-world', 'ANY')
  })

  test('A record', function (dns, t) {
    dns.once('query', function (packet) {
      t.same(packet.questions.length, 1, 'one question')
      t.same(packet.questions[0], {name: 'hello-world', type: 'A', class: 1})
      dns.respond([{type: 'A', name: 'hello-world', ttl: 120, data: '127.0.0.1'}])
    })

    dns.once('response', function (packet) {
      t.same(packet.answers.length, 1, 'one answer')
      t.same(packet.answers[0], {type: 'A', name: 'hello-world', ttl: 120, data: '127.0.0.1', class: 1, flush: false})
      dns.destroy(function () {
        t.end()
      })
    })

    dns.query('hello-world', 'A')
  })

  test('A record (two questions)', function (dns, t) {
    dns.once('query', function (packet) {
      t.same(packet.questions.length, 2, 'two questions')
      t.same(packet.questions[0], {name: 'hello-world', type: 'A', class: 1})
      t.same(packet.questions[1], {name: 'hej.verden', type: 'A', class: 1})
      dns.respond([{type: 'A', name: 'hello-world', ttl: 120, data: '127.0.0.1'}, {
        type: 'A',
        name: 'hej.verden',
        ttl: 120,
        data: '127.0.0.2'
      }])
    })

    dns.once('response', function (packet) {
      t.same(packet.answers.length, 2, 'one answers')
      t.same(packet.answers[0], {type: 'A', name: 'hello-world', ttl: 120, data: '127.0.0.1', class: 1, flush: false})
      t.same(packet.answers[1], {type: 'A', name: 'hej.verden', ttl: 120, data: '127.0.0.2', class: 1, flush: false})
      dns.destroy(function () {
        t.end()
      })
    })

    dns.query([{name: 'hello-world', type: 'A'}, {name: 'hej.verden', type: 'A'}])
  })

  test('AAAA record', function (dns, t) {
    dns.once('query', function (packet) {
      t.same(packet.questions.length, 1, 'one question')
      t.same(packet.questions[0], {name: 'hello-world', type: 'AAAA', class: 1})
      dns.respond([{type: 'AAAA', name: 'hello-world', ttl: 120, data: 'fe80::5ef9:38ff:fe8c:ceaa'}])
    })

    dns.once('response', function (packet) {
      t.same(packet.answers.length, 1, 'one answer')
      t.same(packet.answers[0], {
        type: 'AAAA',
        name: 'hello-world',
        ttl: 120,
        data: 'fe80::5ef9:38ff:fe8c:ceaa',
        class: 1,
        flush: false
      })
      dns.destroy(function () {
        t.end()
      })
    })

    dns.query('hello-world', 'AAAA')
  })

  test('SRV record', function (dns, t) {
    dns.once('query', function (packet) {
      t.same(packet.questions.length, 1, 'one question')
      t.same(packet.questions[0], {name: 'hello-world', type: 'SRV', class: 1})
      dns.respond([{
        type: 'SRV',
        name: 'hello-world',
        ttl: 120,
        data: {port: 11111, target: 'hello.world.com', priority: 10, weight: 12}
      }])
    })

    dns.once('response', function (packet) {
      t.same(packet.answers.length, 1, 'one answer')
      t.same(packet.answers[0], {
        type: 'SRV',
        name: 'hello-world',
        ttl: 120,
        data: {port: 11111, target: 'hello.world.com', priority: 10, weight: 12},
        class: 1,
        flush: false
      })
      dns.destroy(function () {
        t.end()
      })
    })

    dns.query('hello-world', 'SRV')
  })

  test('TXT record', function (dns, t) {
    var data = Buffer.from('black box')

    dns.once('query', function (packet) {
      t.same(packet.questions.length, 1, 'one question')
      t.same(packet.questions[0], {name: 'hello-world', type: 'TXT', class: 1})
      dns.respond([{type: 'TXT', name: 'hello-world', ttl: 120, data: data}])
    })

    dns.once('response', function (packet) {
      t.same(packet.answers.length, 1, 'one answer')
      t.same(packet.answers[0], {type: 'TXT', name: 'hello-world', ttl: 120, data: data, class: 1, flush: false})
      dns.destroy(function () {
        t.end()
      })
    })

    dns.query('hello-world', 'TXT')
  })

  test('QU question bit', function (dns, t) {
    dns.once('query', function (packet) {
      t.same(packet.questions, [
        {type: 'A', name: 'foo', class: 1},
        {type: 'A', name: 'bar', class: 1}
      ])
      dns.destroy(function () {
        t.end()
      })
    })

    dns.query([
      {type: 'A', name: 'foo', class: 32769},
      {type: 'A', name: 'bar', class: 1}
    ])
  })

  test('cache flush bit', function (dns, t) {
    dns.once('query', function (packet) {
      dns.respond({
        answers: [
          {type: 'A', name: 'foo', ttl: 120, data: '127.0.0.1', class: 1, flush: true},
          {type: 'A', name: 'foo', ttl: 120, data: '127.0.0.2', class: 1, flush: false}
        ],
        additionals: [
          {type: 'A', name: 'foo', ttl: 120, data: '127.0.0.3', class: 1, flush: true}
        ]
      })
    })

    dns.once('response', function (packet) {
      t.same(packet.answers, [
        {type: 'A', name: 'foo', ttl: 120, data: '127.0.0.1', class: 1, flush: true},
        {type: 'A', name: 'foo', ttl: 120, data: '127.0.0.2', class: 1, flush: false}
      ])
      t.same(packet.additionals[0], {type: 'A', name: 'foo', ttl: 120, data: '127.0.0.3', class: 1, flush: true})
      dns.destroy(function () {
        t.end()
      })
    })

    dns.query('foo', 'A')
  })

  test('Authoritive Answer bit', function (dns, t) {
    dns.once('query', function (packet) {
      dns.respond([])
    })

    dns.once('response', function (packet) {
      t.ok(packet.flag_auth, 'should be set')
      dns.destroy(function () {
        t.end()
      })
    })

    dns.query('foo', 'A')
  })
})
