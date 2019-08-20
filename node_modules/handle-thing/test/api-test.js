/* eslint-env mocha */

var assert = require('assert')
var net = require('net')
var streamPair = require('stream-pair')

var thing = require('../')

describe('Handle Thing', function () {
  var handle
  var pair
  var socket;

  [ 'normal', 'lazy' ].forEach(function (mode) {
    describe(mode, function () {
      beforeEach(function () {
        pair = streamPair.create()
        handle = thing.create(mode === 'normal' ? pair.other : null)
        socket = new net.Socket({
          handle: handle,
          readable: true,
          writable: true
        })

        if (mode === 'lazy') {
          setTimeout(function () {
            handle.setStream(pair.other)
          }, 50)
        }
      })

      afterEach(function () {
        assert(handle._stream)
      })

      it('should write data to Socket', function (done) {
        pair.write('hello')
        pair.write(' world')
        pair.end('... ok')

        var chunks = ''
        socket.on('data', function (chunk) {
          chunks += chunk
        })
        socket.on('end', function () {
          assert.strictEqual(chunks, 'hello world... ok')

          // allowHalfOpen is `false`, so the `end` should be followed by `close`
          socket.once('close', function () {
            done()
          })
        })
      })

      it('should read data from Socket', function (done) {
        socket.write('hello')
        socket.write(' world')
        socket.end('... ok')

        var chunks = ''
        pair.on('data', function (chunk) {
          chunks += chunk
        })
        pair.on('end', function () {
          assert.strictEqual(chunks, 'hello world... ok')

          done()
        })
      })

      it('should invoke `close` callback', function (done) {
        handle._options.close = function (callback) {
          done()
          process.nextTick(callback)
        }

        pair.end('hello')
        socket.resume()
      })

      it('should kill pending requests', function (done) {
        handle._options.close = function () {
          setTimeout(done, 75)
        }

        socket.write('hello')
        socket.destroy()
      })

      if (mode === 'normal') {
        it('should invoke `getPeerName` callback', function () {
          handle._options.getPeerName = function () {
            return { address: 'ohai' }
          }

          assert.strictEqual(socket.remoteAddress, 'ohai')
        })

        it('should emit ECONNRESET at `close` event', function (done) {
          pair.other.emit('close')

          socket.on('error', function (err) {
            assert(/ECONNRESET/.test(err.message))
            done()
          })
        })
      }
    })
  })
})
