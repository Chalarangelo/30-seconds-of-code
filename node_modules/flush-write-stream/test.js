var tape = require('tape')
var writer = require('./')

tape('is a write stream', function (t) {
  var expected = ['hello', 'world', 'verden']
  var ws = writer.obj(write)

  ws.write('hello')
  ws.write('world')
  ws.write('verden')
  ws.end(function () {
    t.same(expected.length, 0)
    t.end()
  })

  function write (data, enc, cb) {
    t.same(data, expected.shift())
    cb()
  }
})

tape('is flushable', function (t) {
  var expected = ['hello', 'world', 'verden']
  var flushed = false

  var ws = writer.obj(write, flush)

  ws.write('hello')
  ws.write('world')
  ws.write('verden')
  ws.end(function () {
    t.same(expected.length, 0)
    t.ok(flushed, 'was flushed')
    t.end()
  })

  function write (data, enc, cb) {
    t.same(data, expected.shift())
    cb()
  }

  function flush (cb) {
    flushed = true
    process.nextTick(cb)
  }
})

tape('can pass options', function (t) {
  var expected = ['hello', 'world', 'verden']
  var flushed = false

  var ws = writer({objectMode: true}, write, flush)

  ws.write('hello')
  ws.write('world')
  ws.write('verden')
  ws.end(function () {
    t.same(expected.length, 0)
    t.ok(flushed, 'was flushed')
    t.end()
  })

  function write (data, enc, cb) {
    t.same(data, expected.shift())
    cb()
  }

  function flush (cb) {
    flushed = true
    process.nextTick(cb)
  }
})

tape('emits error on destroy', function (t) {
  var expected = new Error()

  var ws = writer({objectMode: true}, function () {})

  ws.on('error', function (err) {
    t.equal(err, expected)
  })
  ws.on('close', t.end)

  ws.destroy(expected)
})
