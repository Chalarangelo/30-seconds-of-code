var tape = require('tape')
var thunky = require('./')

tape('run only once', function (t) {
  t.plan(3)

  var ran = 0
  var run = thunky(function (cb) {
    ran++
    cb()
  })

  run(function () {
    t.same(ran, 1, 'ran once')
  })
  run(function () {
    t.same(ran, 1, 'ran once')
  })
  run(function () {
    t.same(ran, 1, 'ran once')
  })
})

tape('run only once async', function (t) {
  t.plan(3)

  var ran = 0
  var run = thunky(function (cb) {
    process.nextTick(function () {
      ran++
      cb()
    })
  })

  run(function () {
    t.same(ran, 1, 'ran once')
  })
  run(function () {
    t.same(ran, 1, 'ran once')
  })
  run(function () {
    t.same(ran, 1, 'ran once')
  })
})

tape('re-run on error', function (t) {
  t.plan(3)

  var ran = 0
  var run = thunky(function (cb) {
    ran++
    cb(new Error('stop'))
  })

  run(function () {
    t.same(ran, 1, 'ran once')
    run(function () {
      t.same(ran, 2, 'ran once')
      run(function () {
        t.same(ran, 3, 'ran once')
      })
    })
  })
})

tape('pass arguments', function (t) {
  t.plan(6)

  var ran = 0
  var run = thunky(function (fn) {
    ran++
    fn({ hello: 'world' })
  })

  run(function (val) {
    t.same(ran, 1, 'ran once')
    t.same(val, { hello: 'world' })
    run(function (val) {
      t.same(ran, 1, 'ran once')
      t.same(val, { hello: 'world' })
      run(function (val) {
        t.same(ran, 1, 'ran once')
        t.same(val, { hello: 'world' })
      })
    })
  })
})

tape('callback is optional', function (t) {
  t.plan(2)

  var ran = 0
  var run = thunky(function (fn) {
    ran++
    fn({ hello: 'world' })
  })

  run()
  run(function (val) {
    t.same(ran, 1, 'ran once')
    t.same(val, { hello: 'world' })
  })
})

tape('always async', function (t) {
  t.plan(2)

  var run = thunky(function (cb) {
    process.nextTick(cb)
  })

  var sync = true
  run(function () {
    t.ok(!sync, 'not sync')
    var innerSync = true
    run(function () {
      t.ok(!innerSync, 'not sync')
    })
    innerSync = false
  })
  sync = false
})
