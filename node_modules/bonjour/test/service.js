'use strict'

var os = require('os')
var test = require('tape')
var Service = require('../lib/service')

var getAddressesRecords = function (host) {
  var addresses_records = []
  var itrs = os.networkInterfaces()
  for (var i in itrs) {
    var addrs = itrs[i]
    for (var j in addrs) {
      if (addrs[j].internal === false) {
        addresses_records.push({ data: addrs[j].address, name: host, ttl: 120, type: addrs[j].family === 'IPv4' ? 'A' : 'AAAA' })
      }
    }
  }
  return addresses_records
}

test('no name', function (t) {
  t.throws(function () {
    new Service({ type: 'http', port: 3000 }) // eslint-disable-line no-new
  }, 'Required name not given')
  t.end()
})

test('no type', function (t) {
  t.throws(function () {
    new Service({ name: 'Foo Bar', port: 3000 }) // eslint-disable-line no-new
  }, 'Required type not given')
  t.end()
})

test('no port', function (t) {
  t.throws(function () {
    new Service({ name: 'Foo Bar', type: 'http' }) // eslint-disable-line no-new
  }, 'Required port not given')
  t.end()
})

test('minimal', function (t) {
  var s = new Service({ name: 'Foo Bar', type: 'http', port: 3000 })
  t.equal(s.name, 'Foo Bar')
  t.equal(s.protocol, 'tcp')
  t.equal(s.type, '_http._tcp')
  t.equal(s.host, os.hostname())
  t.equal(s.port, 3000)
  t.equal(s.fqdn, 'Foo Bar._http._tcp.local')
  t.equal(s.txt, null)
  t.equal(s.subtypes, null)
  t.equal(s.published, false)
  t.end()
})

test('protocol', function (t) {
  var s = new Service({ name: 'Foo Bar', type: 'http', port: 3000, protocol: 'udp' })
  t.deepEqual(s.protocol, 'udp')
  t.end()
})

test('host', function (t) {
  var s = new Service({ name: 'Foo Bar', type: 'http', port: 3000, host: 'example.com' })
  t.deepEqual(s.host, 'example.com')
  t.end()
})

test('txt', function (t) {
  var s = new Service({ name: 'Foo Bar', type: 'http', port: 3000, txt: { foo: 'bar' } })
  t.deepEqual(s.txt, { foo: 'bar' })
  t.end()
})

test('_records() - minimal', function (t) {
  var s = new Service({ name: 'Foo Bar', type: 'http', protocol: 'tcp', port: 3000 })
  t.deepEqual(s._records(), [
    { data: s.fqdn, name: '_http._tcp.local', ttl: 28800, type: 'PTR' },
    { data: { port: 3000, target: os.hostname() }, name: s.fqdn, ttl: 120, type: 'SRV' },
    { data: new Buffer('00', 'hex'), name: s.fqdn, ttl: 4500, type: 'TXT' }
  ].concat(getAddressesRecords(s.host)))
  t.end()
})

test('_records() - everything', function (t) {
  var s = new Service({ name: 'Foo Bar', type: 'http', protocol: 'tcp', port: 3000, host: 'example.com', txt: { foo: 'bar' } })
  t.deepEqual(s._records(), [
    { data: s.fqdn, name: '_http._tcp.local', ttl: 28800, type: 'PTR' },
    { data: { port: 3000, target: 'example.com' }, name: s.fqdn, ttl: 120, type: 'SRV' },
    { data: new Buffer('07666f6f3d626172', 'hex'), name: s.fqdn, ttl: 4500, type: 'TXT' }
  ].concat(getAddressesRecords(s.host)))
  t.end()
})
