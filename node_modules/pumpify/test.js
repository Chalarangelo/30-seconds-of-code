var tape = require('tape')
var through = require('through2')
var pumpify = require('./')
var stream = require('stream')
var duplexify = require('duplexify')

tape('basic', function(t) {
  t.plan(3)

  var pipeline = pumpify(
    through(function(data, enc, cb) {
      t.same(data.toString(), 'hello')
      cb(null, data.toString().toUpperCase())
    }),
    through(function(data, enc, cb) {
      t.same(data.toString(), 'HELLO')
      cb(null, data.toString().toLowerCase())
    })
  )

  pipeline.write('hello')
  pipeline.on('data', function(data) {
    t.same(data.toString(), 'hello')
    t.end()
  })
})

tape('3 times', function(t) {
  t.plan(4)

  var pipeline = pumpify(
    through(function(data, enc, cb) {
      t.same(data.toString(), 'hello')
      cb(null, data.toString().toUpperCase())
    }),
    through(function(data, enc, cb) {
      t.same(data.toString(), 'HELLO')
      cb(null, data.toString().toLowerCase())
    }),
    through(function(data, enc, cb) {
      t.same(data.toString(), 'hello')
      cb(null, data.toString().toUpperCase())
    })
  )

  pipeline.write('hello')
  pipeline.on('data', function(data) {
    t.same(data.toString(), 'HELLO')
    t.end()
  })
})

tape('destroy', function(t) {
  var test = through()
  test.destroy = function() {
    t.ok(true)
    t.end()
  }

  var pipeline = pumpify(through(), test)

  pipeline.destroy()
})

tape('close', function(t) {
  var test = through()
  var pipeline = pumpify(through(), test)

  pipeline.on('error', function(err) {
    t.same(err.message, 'lol')
    t.end()
  })

  test.emit('error', new Error('lol'))
})

tape('end waits for last one', function(t) {
  var ran = false

  var a = through()
  var b = through()
  var c = through(function(data, enc, cb) {
    setTimeout(function() {
      ran = true
      cb()
    }, 100)
  })

  var pipeline = pumpify(a, b, c)

  pipeline.write('foo')
  pipeline.end(function() {
    t.ok(ran)
    t.end()
  })

  t.ok(!ran)
})

tape('always wait for finish', function(t) {
  var a = new stream.Readable()
  a._read = function() {}
  a.push('hello')

  var pipeline = pumpify(a, through(), through())
  var ran = false

  pipeline.on('finish', function() {
    t.ok(ran)
    t.end()
  })

  setTimeout(function() {
    ran = true
    a.push(null)
  }, 100)
})

tape('async', function(t) {
  var pipeline = pumpify()

  t.plan(4)

  pipeline.write('hello')
  pipeline.on('data', function(data) {
    t.same(data.toString(), 'HELLO')
    t.end()
  })

  setTimeout(function() {
    pipeline.setPipeline(
      through(function(data, enc, cb) {
        t.same(data.toString(), 'hello')
        cb(null, data.toString().toUpperCase())
      }),
      through(function(data, enc, cb) {
        t.same(data.toString(), 'HELLO')
        cb(null, data.toString().toLowerCase())
      }),
      through(function(data, enc, cb) {
        t.same(data.toString(), 'hello')
        cb(null, data.toString().toUpperCase())
      })
    )
  }, 100)
})

tape('early destroy', function(t) {
  var a = through()
  var b = through()
  var c = through()

  b.destroy = function() {
    t.ok(true)
    t.end()
  }

  var pipeline = pumpify()

  pipeline.destroy()
  setTimeout(function() {
    pipeline.setPipeline(a, b, c)
  }, 100)
})

tape('preserves error', function (t) {
  var a = through()
  var b = through(function (data, enc, cb) {
    cb(new Error('stop'))
  })
  var c = through()
  var s = pumpify()

  s.on('error', function (err) {
    t.same(err.message, 'stop')
    t.end()
  })

  s.setPipeline(a, b, c)
  s.resume()
  s.write('hi')
})

tape('preserves error again', function (t) {
  var ws = new stream.Writable()
  var rs = new stream.Readable({highWaterMark: 16})

  ws._write = function (data, enc, cb) {
    cb(null)
  }

  rs._read = function () {
    process.nextTick(function () {
      rs.push('hello world')
    })
  }

  var pumpifyErr = pumpify(
    through(),
    through(function(chunk, _, cb) {
      cb(new Error('test'))
    }),
    ws
  )

  rs.pipe(pumpifyErr)
    .on('error', function (err) {
      t.ok(err)
      t.ok(err.message !== 'premature close', 'does not close with premature close')
      t.end()
    })
})

tape('returns error from duplexify', function (t) {
  var a = through()
  var b = duplexify()
  var s = pumpify()

  s.setPipeline(a, b)

  s.on('error', function (err) {
    t.same(err.message, 'stop')
    t.end()
  })

  s.write('data')
  // Test passes if `.end()` is not called
  s.end()

  b.setWritable(through())

  setImmediate(function () {
    b.destroy(new Error('stop'))
  })
})
