/* eslint-env mocha */
'use strict'

var assert = require('assert')

exports.port = 23433

exports.keys = {
  key: '-----BEGIN RSA PRIVATE KEY-----\n' +
       'MIIEogIBAAKCAQEA1ARXSoyizYSnHDYickxX4x2UG/8uNWnQWKlWR97NAwRsspN6\n' +
       'aFF1+LnyN9bvLNnhxIowcYy68+LpZ7pYAQgBZSyAhnF1S4qz2w/rxH4CNn96B/je\n' +
       'vQGo3e8vIQ8ChhfuYvGAtTEYJzW8aRoxWSPcukZZdxPQ1Wgbhd9DSXhgkUnkEEET\n' +
       'owyn8ufQFRnQHfc9Fn5DrJilI7vD+ZyRU3gZoBj2GVMQuxJLqQEHy2XsJ6ZWTea/\n' +
       'EfK93XfDyY7ZxyeK0ZdWCVoTqw9QNJSkGjesCBkcY4Rjxi9LbLJwW3Es4wgW4N4Y\n' +
       'cltfygjltSis+RVKJyGeDqTWAxceih3mlkdGIQIDAQABAoIBAB6akc8dBdMMtuKH\n' +
       'nelJw9XwyxRPfWgQYhaqOt4c9xLcbKRKTX0JZTIGBUSyLcwXl1M7b0q0ubfCpVZn\n' +
       'u5RKh4kHJ3ZAomHJH7UbUzkFx2P+eqrz7ZLyzmFayT7IX+DjS3HU0nNVJttiElRJ\n' +
       'h54KYy4wQXHC1n43jOGCHMBaM/ZEpO3xA7PLfVD/BpYLzL+FAYoFBb/x2buLv8Mg\n' +
       'D6QAWkS70mu8ER13NapKjg6PUsYPxHYU30BjGMTXw95Iz5PSAK8+/xQ6YaW7MEVM\n' +
       'twxxfJfZ+9u9nJMfJANqxCi6iZ6ft/e5cbhvNhV/X97XeoPWxqSpx98M6BC/vvBc\n' +
       'UjSmaRECgYEA4NH8Y20zC8zF4ALcBgqgrx+U9upov2UGa+kjS1/So4r/dpG4T8pT\n' +
       'T2tMW6zR5qe7g11kgJm0oI/I6x9P2qwFJONO3MdLYVKd2mSxG2fniCktLg2j6BAX\n' +
       'QTt5zjIEWvhRP2vkrS8gAaJbVMLTMg4s374bE/IdKT+c59tYpcVaXXMCgYEA8WvJ\n' +
       'dfPXoagEgaHRd++R2COMG19euOTFRle0MSq+S9ZeeSe9ejb9CIpWYZ3WVviKvf+E\n' +
       'zksmKTZJnig5pGEgU+2ka1C9PthCGlTlQagD6Ey4hblQgi+pOFgBjE9Yn3FxfppH\n' +
       '25ICXNY89EF6klEqKV67E/5O+nBZo+Y2TM4YKRsCgYAaEV8RbEUB9kFvYwV+Eddl\n' +
       '1uSf6LgykRU4h/TWtYqn+eL7LZRQdCZKzCczbgt8kjBU4AxaOPhPsbxbPus0cMO7\n' +
       '7jtjsBwWcczp2MkMY3TePeAGOgCqVMtNfgb2mKgWoDpTf0ApsJAmgFvUrS5t3GTp\n' +
       'oJJlMqqc8MpRvAZAWmzK7wKBgEVBFlmvyXumJyTItr4hC0VlbRutEA8aET1Mi3RP\n' +
       'Pqeipxc6PzB/9bYtePonvQTV53b5ha9n/1pzKEsmXuK4uf1ZfoEKeD8+6jeDgwCC\n' +
       'ohxRZd12e5Hc+j4fgNIvMM0MTfJzb4mdKPBYxMOMxQyUG/QiKKhjm2RcNlq9/3Wo\n' +
       '6WVhAoGAG4QPWoE4ccFECp8eyGw8rjE45y5uqUI/f/RssX7bnKbCRY0otDsPlJd6\n' +
       'Kf0XFssLnYsCXO+ua03gw2N+2mrcsuA5FXHmQMrbfnuojHIVY05nt4Wa5iqV/gqH\n' +
       'PJXWyOgD+Kd6eR/cih/SCoKl4tSGCSJG5TDEpMt+r8EJkCXJ7Fw=\n' +
       '-----END RSA PRIVATE KEY-----',
  cert: '-----BEGIN CERTIFICATE-----\n' +
        'MIICuTCCAaOgAwIBAgIDAQABMAsGCSqGSIb3DQEBCzAUMRIwEAYDVQQDFglub2Rl\n' +
        'LnNwZHkwHhcNNjkwMTAxMDAwMDAwWhcNMjUwNzA2MDUwMzQzWjAUMRIwEAYDVQQD\n' +
        'Fglub2RlLnNwZHkwggEgMAsGCSqGSIb3DQEBAQOCAQ8AMIIBCgKCAQEA1ARXSoyi\n' +
        'zYSnHDYickxX4x2UG/8uNWnQWKlWR97NAwRsspN6aFF1+LnyN9bvLNnhxIowcYy6\n' +
        '8+LpZ7pYAQgBZSyAhnF1S4qz2w/rxH4CNn96B/jevQGo3e8vIQ8ChhfuYvGAtTEY\n' +
        'JzW8aRoxWSPcukZZdxPQ1Wgbhd9DSXhgkUnkEEETowyn8ufQFRnQHfc9Fn5DrJil\n' +
        'I7vD+ZyRU3gZoBj2GVMQuxJLqQEHy2XsJ6ZWTea/EfK93XfDyY7ZxyeK0ZdWCVoT\n' +
        'qw9QNJSkGjesCBkcY4Rjxi9LbLJwW3Es4wgW4N4YcltfygjltSis+RVKJyGeDqTW\n' +
        'Axceih3mlkdGIQIDAQABoxowGDAWBgNVHREEDzANggsqLm5vZGUuc3BkeTALBgkq\n' +
        'hkiG9w0BAQsDggEBALn2FQSDMsyu+oqUnJgTVdGpnzKmfXoBPlQuznRdibri8ABO\n' +
        'kOo8FC72Iy6leVSsB26KtAdhpURZ3mv1Oyt4cGeeyQln2Olzp5flIos+GqYSztAq\n' +
        '5ZnrzTLLlip7KHkmastYRXhEwTLmo2JCU8RkRP1X/m1xONF/YkURxmqj6cQTahPY\n' +
        'FzzLP1clW3arJwPlUcKKby6WpxO5MihYEliheBr7fL2TDUA96eG+B/SKxvwaGF2v\n' +
        'gWF8rg5prjPaLW8HH3Efq59AimFqUVQ4HtcJApjLJDYUKlvsMNMvBqh/pQRRPafj\n' +
        '0Cp8dyS45sbZ2RgXdyfl6gNEj+DiPbaFliIuFmM=\n' +
        '-----END CERTIFICATE-----'
}

function expectData (stream, expected, callback) {
  var actual = ''

  stream.on('data', function (chunk) {
    actual += chunk
  })
  stream.on('end', function () {
    assert.strictEqual(actual, expected)
    callback()
  })
}
exports.expectData = expectData

exports.everyProtocol = function everyProtocol (body) {
  var protocols = [
    { protocol: 'http2', alpn: 'h2', version: 4 },
    { protocol: 'spdy', alpn: 'spdy/3.1', version: 3.1 },
    { protocol: 'spdy', alpn: 'spdy/3', version: 3 },
    { protocol: 'spdy', alpn: 'spdy/2', version: 2 }
  ]

  protocols.forEach(function (protocol) {
    describe(protocol.alpn, function () {
      body(protocol.protocol, protocol.alpn, protocol.version)
    })
  })
}

exports.everyConfig = function everyConfig (body) {
  exports.everyProtocol(function (protocol, alpn, version) {
    if (alpn === 'spdy/2') {
      return
    }

    [false, true].forEach(function (plain) {
      describe(plain ? 'plain mode' : 'ssl mode', function () {
        body(protocol, alpn, version, plain)
      })
    })
  })
}
