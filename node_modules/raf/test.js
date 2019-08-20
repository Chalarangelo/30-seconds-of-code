var test = require('tape')
  , raf = require('./index.js')

test('continues to emit events', function(t) {
  t.plan(11)

  var start = new Date().getTime()
    , times = 0

  raf(function tick(dt) {
    t.ok(dt >= 0, 'time has passed: ' + dt)
    if(++times == 10) {
      var elapsed = (new Date().getTime() - start)
      t.ok(elapsed >= 150, 'should take at least 9 frames worth of wall time: ' + elapsed)
      t.end()
    } else {
      raf(tick)
    }
  })
})

test('cancel removes callbacks from queue', function(t) {
  t.plan(6)

  function cb1() { cb1.called = true }
  function cb2() { cb2.called = true }
  function cb3() { cb3.called = true }

  var handle1 = raf(cb1)
  t.ok(handle1, 'returns a handle')
  var handle2 = raf(cb2)
  t.ok(handle2, 'returns a handle')
  var handle3 = raf(cb3)
  t.ok(handle3, 'returns a handle')

  raf.cancel(handle2)

  raf(function() {
    t.ok(cb1.called, 'callback was invoked')
    t.notOk(cb2.called, 'callback was cancelled')
    t.ok(cb3.called, 'callback was invoked')
    t.end()
  })
})

test('raf should throw on errors', function(t) {
  t.plan(1)

  var onError = function() {
    t.pass('error bubbled up to event loop')
  }

  if(typeof window !== 'undefined') {
    window.onerror = onError
  } else if(typeof process !== 'undefined') {
    process.on('uncaughtException', onError)
  }

  raf(function() {
    throw new Error('foo')
  })
})
