/* eslint-env mocha */

var assert = require('assert')
var tls = require('tls')
var net = require('net')
var https = require('https')
var transport = require('spdy-transport')
var util = require('util')

var fixtures = require('./fixtures')
var spdy = require('../')

describe('SPDY Server', function () {
  fixtures.everyConfig(function (protocol, alpn, version, plain) {
    var server
    var client

    beforeEach(function (done) {
      server = spdy.createServer(Object.assign({
        spdy: {
          'x-forwarded-for': true,
          plain: plain
        }
      }, fixtures.keys))

      server.listen(fixtures.port, function () {
        var socket = (plain ? net : tls).connect({
          rejectUnauthorized: false,
          port: fixtures.port,
          ALPNProtocols: [alpn]
        }, function () {
          client = transport.connection.create(socket, {
            protocol: protocol,
            isServer: false
          })
          client.start(version)
          done()
        })
      })
    })

    afterEach(function (done) {
      client.socket.destroy()
      server.close(done)
    })

    it('should process GET request', function (done) {
      var stream = client.request({
        method: 'GET',
        path: '/get',
        headers: {
          a: 'b'
        }
      }, function (err) {
        assert(!err)

        stream.on('error', (err) => {
          done(err)
        })

        stream.on('response', function (status, headers) {
          assert.strictEqual(status, 200)
          assert.strictEqual(headers.ok, 'yes')

          fixtures.expectData(stream, 'response', done)
        })

        stream.end()
      })

      server.on('request', function (req, res) {
        assert.strictEqual(req.isSpdy, res.isSpdy)
        assert.strictEqual(req.spdyVersion, res.spdyVersion)
        assert(req.isSpdy)
        if (!plain) {
          assert(req.socket.encrypted)
          assert(req.socket.getPeerCertificate())
        }

        // Auto-detection
        if (version === 3.1) {
          assert(req.spdyVersion >= 3 && req.spdyVersion <= 3.1)
        } else {
          assert.strictEqual(req.spdyVersion, version)
        }
        assert(req.spdyStream)
        assert(res.spdyStream)

        assert.strictEqual(req.method, 'GET')
        assert.strictEqual(req.url, '/get')
        assert.deepStrictEqual(req.headers, { a: 'b', host: 'localhost' })

        req.on('end', function () {
          res.writeHead(200, {
            ok: 'yes'
          })
          res.end('response')
          assert(res.finished, 'res.finished should be set')
        })
        req.resume()
      })
    })

    it('should process POST request', function (done) {
      var stream = client.request({
        method: 'POST',
        path: '/post'
      }, function (err) {
        assert(!err)

        stream.on('response', function (status, headers) {
          assert.strictEqual(status, 200)
          assert.strictEqual(headers.ok, 'yes')

          fixtures.expectData(stream, 'response', next)
        })

        stream.end('request')
      })

      server.on('request', function (req, res) {
        assert.strictEqual(req.method, 'POST')
        assert.strictEqual(req.url, '/post')

        res.writeHead(200, {
          ok: 'yes'
        })
        res.end('response')

        fixtures.expectData(req, 'request', next)
      })

      var waiting = 2
      function next () {
        if (--waiting === 0) {
          return done()
        }
      }
    })

    it('should process expect-continue request', function (done) {
      var stream = client.request({
        method: 'GET',
        path: '/get',
        headers: {
          Expect: '100-continue'
        }
      }, function (err) {
        assert(!err)

        stream.on('response', function (status, headers) {
          assert.strictEqual(status, 100)

          fixtures.expectData(stream, 'response', done)
        })

        stream.end()
      })

      server.on('request', function (req, res) {
        req.on('end', function () {
          res.end('response')
        })
        req.resume()
      })
    })

    it('should emit `checkContinue` request', function (done) {
      var stream = client.request({
        method: 'GET',
        path: '/get',
        headers: {
          Expect: '100-continue'
        }
      }, function (err) {
        assert(!err)

        stream.on('response', function (status, headers) {
          assert.strictEqual(status, 100)

          fixtures.expectData(stream, 'response', done)
        })

        stream.end()
      })

      server.on('checkContinue', function (req, res) {
        req.on('end', function () {
          res.writeContinue()
          res.end('response')
        })
        req.resume()
      })
    })

    it('should send PUSH_PROMISE', function (done) {
      var stream = client.request({
        method: 'POST',
        path: '/page'
      }, function (err) {
        assert(!err)

        stream.on('pushPromise', function (push) {
          assert.strictEqual(push.path, '/push')
          assert.strictEqual(push.headers.yes, 'push')

          fixtures.expectData(push, 'push', next)
          fixtures.expectData(stream, 'response', next)
        })

        stream.end('request')
      })

      server.on('request', function (req, res) {
        assert.strictEqual(req.method, 'POST')
        assert.strictEqual(req.url, '/page')

        res.writeHead(200, {
          ok: 'yes'
        })

        var push = res.push('/push', {
          request: {
            yes: 'push'
          }
        })
        push.end('push')

        res.end('response')

        fixtures.expectData(req, 'request', next)
      })

      var waiting = 3
      function next () {
        if (--waiting === 0) {
          return done()
        }
      }
    })

    it('should receive trailing headers', function (done) {
      var stream = client.request({
        method: 'POST',
        path: '/post'
      }, function (err) {
        assert(!err)

        stream.sendHeaders({ trai: 'ler' })
        stream.end()

        stream.on('response', function (status, headers) {
          assert.strictEqual(status, 200)
          assert.strictEqual(headers.ok, 'yes')

          fixtures.expectData(stream, 'response', done)
        })
      })

      server.on('request', function (req, res) {
        var gotHeaders = false
        req.on('trailers', function (headers) {
          gotHeaders = true
          assert.strictEqual(headers.trai, 'ler')
        })

        req.on('end', function () {
          assert(gotHeaders)

          res.writeHead(200, {
            ok: 'yes'
          })
          res.end('response')
        })
        req.resume()
      })
    })

    it('should call .writeHead() automatically', function (done) {
      var stream = client.request({
        method: 'POST',
        path: '/post'
      }, function (err) {
        assert(!err)

        stream.on('response', function (status, headers) {
          assert.strictEqual(status, 300)

          fixtures.expectData(stream, 'response', done)
        })
        stream.end()
      })

      server.on('request', function (req, res) {
        req.on('end', function () {
          res.statusCode = 300
          res.end('response')
        })
        req.resume()
      })
    })

    it('should not crash on .writeHead() after socket close', function (done) {
      var stream = client.request({
        method: 'POST',
        path: '/post'
      }, function (err) {
        assert(!err)

        setTimeout(function () {
          client.socket.destroy()
        }, 50)
        stream.on('error', function () {})
        stream.end()
      })

      server.on('request', function (req, res) {
        req.connection.on('close', function () {
          assert.doesNotThrow(function () {
            res.writeHead(200)
            res.end('response')
          })
          done()
        })
      })
    })

    it('should not crash on .push() after socket close', function (done) {
      var stream = client.request({
        method: 'POST',
        path: '/post'
      }, function (err) {
        assert(!err)

        setTimeout(function () {
          client.socket.destroy()
        }, 50)
        stream.on('error', function () {})
        stream.end()
      })

      server.on('request', function (req, res) {
        req.connection.on('close', function () {
          assert.doesNotThrow(function () {
            assert.strictEqual(res.push('/push', {}), undefined)
            res.end('response')
          })
          done()
        })
      })
    })

    it('should end response after writing everything down', function (done) {
      var stream = client.request({
        method: 'GET',
        path: '/post'
      }, function (err) {
        assert(!err)

        stream.on('response', function (status, headers) {
          assert.strictEqual(status, 200)

          fixtures.expectData(stream, 'hello world, what\'s up?', done)
        })

        stream.end()
      })

      server.on('request', function (req, res) {
        req.resume()
        res.writeHead(200)
        res.write('hello ')
        res.write('world')
        res.write(', what\'s')
        res.write(' up?')
        res.end()
      })
    })

    it('should handle x-forwarded-for', function (done) {
      client.sendXForwardedFor('1.2.3.4')

      var stream = client.request({
        method: 'GET',
        path: '/post'
      }, function (err) {
        assert(!err)

        stream.resume()
        stream.on('end', done)
        stream.end()
      })

      server.on('request', function (req, res) {
        assert.strictEqual(req.headers['x-forwarded-for'], '1.2.3.4')
        req.resume()
        res.end()
      })
    })

    it('should destroy request after end', function (done) {
      var stream = client.request({
        method: 'POST',
        path: '/post'
      }, function (err) {
        assert(!err)
      })
      stream.end()
      stream.on('error', function () {})

      server.on('request', function (req, res) {
        res.end()
        res.destroy()
        res.socket.on('close', function () {
          done()
        })
      })
    })
  })

  it('should respond to http/1.1', function (done) {
    var server = spdy.createServer(fixtures.keys, function (req, res) {
      assert.strictEqual(req.isSpdy, res.isSpdy)
      assert.strictEqual(req.spdyVersion, res.spdyVersion)
      assert(!req.isSpdy)
      assert.strictEqual(req.spdyVersion, 1)

      res.writeHead(200)
      res.end()
    })

    server.listen(fixtures.port, function () {
      var req = https.request({
        agent: false,
        rejectUnauthorized: false,
        NPNProtocols: ['http/1.1'],
        port: fixtures.port,
        method: 'GET',
        path: '/'
      }, function (res) {
        assert.strictEqual(res.statusCode, 200)
        res.resume()
        res.on('end', function () {
          server.close(done)
        })
      })

      req.end()
    })
  })

  it('should support custom base', function (done) {
    function Pseuver (options, listener) {
      https.Server.call(this, options, listener)
    }
    util.inherits(Pseuver, https.Server)

    var server = spdy.createServer(Pseuver, fixtures.keys, function (req, res) {
      assert.strictEqual(req.isSpdy, res.isSpdy)
      assert.strictEqual(req.spdyVersion, res.spdyVersion)
      assert(!req.isSpdy)
      assert.strictEqual(req.spdyVersion, 1)

      res.writeHead(200)
      res.end()
    })

    server.listen(fixtures.port, function () {
      var req = https.request({
        agent: false,
        rejectUnauthorized: false,
        NPNProtocols: ['http/1.1'],
        port: fixtures.port,
        method: 'GET',
        path: '/'
      }, function (res) {
        assert.strictEqual(res.statusCode, 200)
        res.resume()
        res.on('end', function () {
          server.close(done)
        })
      })

      req.end()
    })
  })
})
