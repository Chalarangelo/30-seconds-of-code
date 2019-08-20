/* eslint-env mocha */

var assert = require('assert')
var https = require('https')
var http = require('http')
var util = require('util')

var fixtures = require('./fixtures')
var spdy = require('../')

// Node.js 0.10 and 0.12 support
Object.assign = process.versions.modules >= 46
  ? Object.assign // eslint-disable-next-line
  : util._extend

describe('SPDY Client', function () {
  describe('regular', function () {
    fixtures.everyConfig(function (protocol, alpn, version, plain) {
      var server
      var agent
      var hmodule

      beforeEach(function (done) {
        hmodule = plain ? http : https

        var options = Object.assign({
          spdy: {
            plain: plain
          }
        }, fixtures.keys)
        server = spdy.createServer(options, function (req, res) {
          var body = ''
          req.on('data', function (chunk) {
            body += chunk
          })
          req.on('end', function () {
            res.writeHead(200, req.headers)
            res.addTrailers({ trai: 'ler' })

            var push = res.push('/push', {
              request: {
                push: 'yes'
              }
            }, function (err) {
              assert(!err)

              push.end('push')
              push.on('error', function () {
              })

              res.end(body || 'okay')
            })
          })
        })

        server.listen(fixtures.port, function () {
          agent = spdy.createAgent({
            rejectUnauthorized: false,
            port: fixtures.port,
            spdy: {
              plain: plain,
              protocol: plain ? alpn : null,
              protocols: [alpn]
            }
          })

          done()
        })
      })

      afterEach(function (done) {
        var waiting = 2
        agent.close(next)
        server.close(next)

        function next () {
          if (--waiting === 0) {
            done()
          }
        }
      })

      it('should send GET request', function (done) {
        var req = hmodule.request({
          agent: agent,

          method: 'GET',
          path: '/get',
          headers: {
            a: 'b'
          }
        }, function (res) {
          assert.strictEqual(res.statusCode, 200)
          assert.strictEqual(res.headers.a, 'b')

          fixtures.expectData(res, 'okay', done)
        })
        req.end()
      })

      it('should send POST request', function (done) {
        var req = hmodule.request({
          agent: agent,

          method: 'POST',
          path: '/post',

          headers: {
            post: 'headers'
          }
        }, function (res) {
          assert.strictEqual(res.statusCode, 200)
          assert.strictEqual(res.headers.post, 'headers')

          fixtures.expectData(res, 'post body', done)
        })

        agent._spdyState.socket.once(plain ? 'connect' : 'secureConnect',
          function () {
            req.end('post body')
          })
      })

      it('should receive PUSH_PROMISE', function (done) {
        var req = hmodule.request({
          agent: agent,

          method: 'GET',
          path: '/get'
        }, function (res) {
          assert.strictEqual(res.statusCode, 200)

          res.resume()
        })
        req.on('push', function (push) {
          assert.strictEqual(push.path, '/push')
          assert.strictEqual(push.headers.push, 'yes')

          push.resume()
          push.once('end', done)
        })
        req.end()
      })

      it('should receive trailing headers', function (done) {
        var req = hmodule.request({
          agent: agent,

          method: 'GET',
          path: '/get'
        }, function (res) {
          assert.strictEqual(res.statusCode, 200)

          res.on('trailers', function (headers) {
            assert.strictEqual(headers.trai, 'ler')
            fixtures.expectData(res, 'okay', done)
          })
        })
        req.end()
      })
    })
  })

  describe('x-forwarded-for', function () {
    fixtures.everyConfig(function (protocol, alpn, version, plain) {
      var server
      var agent
      var hmodule
      // The underlying spdy Connection created by the agent.
      var connection

      beforeEach(function (done) {
        hmodule = plain ? http : https

        var options = Object.assign({
          spdy: {
            plain: plain,
            'x-forwarded-for': true
          }
        }, fixtures.keys)
        server = spdy.createServer(options, function (req, res) {
          res.writeHead(200, req.headers)
          res.end()
        })

        server.listen(fixtures.port, function () {
          agent = spdy.createAgent({
            rejectUnauthorized: false,
            port: fixtures.port,
            spdy: {
              'x-forwarded-for': '1.2.3.4',
              plain: plain,
              protocol: plain ? alpn : null,
              protocols: [alpn]
            }
          })
          // Once aagent has connection, keep a copy for testing.
          agent.once('_connect', function () {
            connection = agent._spdyState.connection
            done()
          })
        })
      })

      afterEach(function (done) {
        var waiting = 2
        agent.close(next)
        server.close(next)

        function next () {
          if (--waiting === 0) {
            done()
          }
        }
      })

      it('should send x-forwarded-for', function (done) {
        var req = hmodule.request({
          agent: agent,

          method: 'GET',
          path: '/get'
        }, function (res) {
          assert.strictEqual(res.statusCode, 200)
          assert.strictEqual(res.headers['x-forwarded-for'], '1.2.3.4')

          res.resume()
          res.once('end', done)
        })
        req.end()
      })

      it('agent should emit connection level errors', function (done) {
        agent.once('error', function (err) {
          assert.strictEqual(err.message, 'mock error')
          done()
        })
        connection.emit('error', new Error('mock error'))
      })
    })
  })
})
