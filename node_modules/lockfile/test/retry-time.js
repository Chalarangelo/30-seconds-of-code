// In these tests, we do the following:
// try for 200ms (rt=2)
// wait for 300ms
// try for 200ms (rt=1)
// wait for 300ms
// try for 200ms (rt=0)
// fail after 1200
// Actual time will be more like 1220-ish for setTimeout irregularity
// But it should NOT be as slow as 2000.

var lockFile = require('../')
var touch = require('touch')
var test = require('tap').test
var fs = require('fs')

var RETRYWAIT = 100
var WAIT = 100
var RETRIES = 2
var EXPECTTIME = (RETRYWAIT * RETRIES) + (WAIT * (RETRIES + 1))
var TOOLONG = EXPECTTIME * 1.5

test('setup', function (t) {
  touch.sync('file.lock')
  t.end()
})

var pollPeriods = [10, 100, 10000]
pollPeriods.forEach(function (pp) {
  test('retry+wait, poll=' + pp, function (t) {
    var ended = false
    var timer = setTimeout(function() {
      t.fail('taking too long!')
      ended = true
      t.end()
    }, 2000)

    if (timer.unref)
      timer.unref()

    var start = Date.now()
    lockFile.lock('file.lock', {
      wait: WAIT,
      retries: RETRIES,
      retryWait: RETRYWAIT,
      pollPeriod: pp
    }, function (er) {
      if (ended) return
      var time = Date.now() - start
      t.ok(time >= EXPECTTIME, 'should take at least ' + EXPECTTIME)
      t.ok(time < TOOLONG, 'should take less than ' + TOOLONG)
      clearTimeout(timer)
      t.end()
    })
  })
})

test('cleanup', function (t) {
  fs.unlinkSync('file.lock')
  t.end()
  var timer = setTimeout(function() {
    process.exit(1)
  }, 500)
  if (timer.unref)
    timer.unref()
  else
    clearTimeout(timer)
})
