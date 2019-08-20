var test = require('tap').test
var lockFile = require('../lockfile.js')
var path = require('path')
var fs = require('fs')
var touch = require('touch')

// On Unix systems, it uses ctime by default for staleness checks, since it's
// the most reliable.  However, because this test artificially sets some locks
// to an earlier time to simulate staleness, we use mtime here.
lockFile.filetime = 'mtime'

test('setup', function (t) {
  try { lockFile.unlockSync('basic-lock') } catch (er) {}
  try { lockFile.unlockSync('sync-lock') } catch (er) {}
  try { lockFile.unlockSync('never-forget') } catch (er) {}
  try { lockFile.unlockSync('stale-lock') } catch (er) {}
  try { lockFile.unlockSync('watch-lock') } catch (er) {}
  try { lockFile.unlockSync('retry-lock') } catch (er) {}
  try { lockFile.unlockSync('contentious-lock') } catch (er) {}
  try { lockFile.unlockSync('stale-wait-lock') } catch (er) {}
  try { lockFile.unlockSync('stale-windows-lock') } catch (er) {}
  t.end()
})

test('lock contention', function (t) {
  var gotlocks = 0;
  var N = 200
  var delay = 10
  // allow for some time for each lock acquisition and release.
  // note that raising N higher will mean that the overhead
  // increases, because we're creating more and more watchers.
  // irl, you should never have several hundred contenders for a
  // single lock, so this situation is somewhat pathological.
  var overhead = 200
  var wait = N * overhead + delay

  // first make it locked, so that everyone has to wait
  lockFile.lock('contentious-lock', function(er, lock) {
    t.ifError(er, 'acquiring starter')
    if (er) throw er;
    t.pass('acquired starter lock')
    setTimeout(function() {
      lockFile.unlock('contentious-lock', function (er) {
        t.ifError(er, 'unlocking starter')
        if (er) throw er
        t.pass('unlocked starter')
      })
    }, delay)
  })

  for (var i=0; i < N; i++)
    lockFile.lock('contentious-lock', { wait: wait }, function(er, lock) {
      if (er) throw er;
      lockFile.unlock('contentious-lock', function(er) {
        if (er) throw er
        gotlocks++
        t.pass('locked and unlocked #' + gotlocks)
        if (gotlocks === N) {
          t.pass('got all locks')
          t.end()
        }
      })
    })
})

test('basic test', function (t) {
  lockFile.check('basic-lock', function (er, locked) {
    if (er) throw er
    t.notOk(locked)
    lockFile.lock('basic-lock', function (er) {
      if (er) throw er
      lockFile.lock('basic-lock', function (er) {
        t.ok(er)
        lockFile.check('basic-lock', function (er, locked) {
          if (er) throw er
          t.ok(locked)
          lockFile.unlock('basic-lock', function (er) {
            if (er) throw er
            lockFile.check('basic-lock', function (er, locked) {
              if (er) throw er
              t.notOk(locked)
              t.end()
            })
          })
        })
      })
    })
  })
})

test('sync test', function (t) {
  var locked
  locked = lockFile.checkSync('sync-lock')
  t.notOk(locked)
  lockFile.lockSync('sync-lock')
  locked = lockFile.checkSync('sync-lock')
  t.ok(locked)
  lockFile.unlockSync('sync-lock')
  locked = lockFile.checkSync('sync-lock')
  t.notOk(locked)
  t.end()
})

test('exit cleanup test', function (t) {
  var child = require.resolve('./fixtures/child.js')
  var node = process.execPath
  var spawn = require('child_process').spawn
  spawn(node, [child]).on('exit', function () {
    setTimeout(function () {
      var locked = lockFile.checkSync('never-forget')
      t.notOk(locked)
      t.end()
    }, 100)
  })
})

test('error exit cleanup test', function (t) {
  var child = require.resolve('./fixtures/bad-child.js')
  var node = process.execPath
  var spawn = require('child_process').spawn
  spawn(node, [child]).on('exit', function () {
    setTimeout(function () {
      var locked = lockFile.checkSync('never-forget')
      t.notOk(locked)
      t.end()
    }, 100)
  })
})


test('staleness test', function (t) {
  lockFile.lock('stale-lock', function (er) {
    if (er) throw er

    // simulate 2s old
    touch.sync('stale-lock', { time: new Date(Date.now() - 2000) })

    var opts = { stale: 1 }
    lockFile.check('stale-lock', opts, function (er, locked) {
      if (er) throw er
      t.notOk(locked)
      lockFile.lock('stale-lock', opts, function (er) {
        if (er) throw er
        lockFile.unlock('stale-lock', function (er) {
          if (er) throw er
          t.end()
        })
      })
    })
  })
})

test('staleness sync test', function (t) {
  var opts = { stale: 1 }
  lockFile.lockSync('stale-lock')
  // simulate 2s old
  touch.sync('stale-lock', { time: new Date(Date.now() - 2000) })
  var locked
  locked = lockFile.checkSync('stale-lock', opts)
  t.notOk(locked)
  lockFile.lockSync('stale-lock', opts)
  lockFile.unlockSync('stale-lock')
  t.end()
})

test('retries', function (t) {
  // next 5 opens will fail.
  var opens = 5
  fs._open = fs.open
  fs.open = function (path, mode, cb) {
    if (--opens === 0) {
      fs.open = fs._open
      return fs.open(path, mode, cb)
    }
    var er = new Error('bogus')
    // to be, or not to be, that is the question.
    er.code = opens % 2 ? 'EEXIST' : 'ENOENT'
    process.nextTick(cb.bind(null, er))
  }

  lockFile.lock('retry-lock', { retries: opens }, function (er) {
    if (er) throw er
    t.equal(opens, 0)
    lockFile.unlockSync('retry-lock')
    t.end()
  })
})

test('retryWait', function (t) {
  // next 5 opens will fail.
  var opens = 5
  fs._open = fs.open
  fs.open = function (path, mode, cb) {
    if (--opens === 0) {
      fs.open = fs._open
      return fs.open(path, mode, cb)
    }
    var er = new Error('bogus')
    // to be, or not to be, that is the question.
    er.code = opens % 2 ? 'EEXIST' : 'ENOENT'
    process.nextTick(cb.bind(null, er))
  }

  var opts = { retries: opens, retryWait: 100 }
  lockFile.lock('retry-lock', opts, function (er) {
    if (er) throw er
    t.equal(opens, 0)
    lockFile.unlockSync('retry-lock')
    t.end()
  })
})

test('retry sync', function (t) {
  // next 5 opens will fail.
  var opens = 5
  fs._openSync = fs.openSync
  fs.openSync = function (path, mode) {
    if (--opens === 0) {
      fs.openSync = fs._openSync
      return fs.openSync(path, mode)
    }
    var er = new Error('bogus')
    // to be, or not to be, that is the question.
    er.code = opens % 2 ? 'EEXIST' : 'ENOENT'
    throw er
  }

  var opts = { retries: opens }
  lockFile.lockSync('retry-lock', opts)
  t.equal(opens, 0)
  lockFile.unlockSync('retry-lock')
  t.end()
})

test('wait and stale together', function (t) {
  // first locker.
  var interval
  lockFile.lock('stale-wait-lock', function(er) {
    // keep refreshing the lock, so we keep it forever
    interval = setInterval(function() {
      touch.sync('stale-wait-lock')
    }, 10)

    // try to get another lock.  this must fail!
    var opt = { stale: 1000, wait: 2000, pollInterval: 1000 }
    lockFile.lock('stale-wait-lock', opt, function (er) {
      if (!er)
        t.fail('got second lock?  that unpossible!')
      else
        t.pass('second lock failed, as i have foreseen it')
      clearInterval(interval)
      t.end()
    })
  })
})


test('stale windows file tunneling test', function (t) {
  // for windows only
  // nt file system tunneling feature will make file creation time not updated
  var opts = { stale: 1000 }
  lockFile.lockSync('stale-windows-lock')
  touch.sync('stale-windows-lock', { time: new Date(Date.now() - 3000) })

  var locked
  lockFile.unlockSync('stale-windows-lock')
  lockFile.lockSync('stale-windows-lock', opts)
  locked = lockFile.checkSync('stale-windows-lock', opts)
  t.ok(locked, "should be locked and not stale")
  lockFile.lock('stale-windows-lock', opts, function (er) {
    if (!er)
      t.fail('got second lock?  impossible, windows file tunneling problem!')
    else
      t.pass('second lock failed, windows file tunneling problem fixed')
    t.end()
  })
})


test('cleanup', function (t) {
  try { lockFile.unlockSync('basic-lock') } catch (er) {}
  try { lockFile.unlockSync('sync-lock') } catch (er) {}
  try { lockFile.unlockSync('never-forget') } catch (er) {}
  try { lockFile.unlockSync('stale-lock') } catch (er) {}
  try { lockFile.unlockSync('watch-lock') } catch (er) {}
  try { lockFile.unlockSync('retry-lock') } catch (er) {}
  try { lockFile.unlockSync('contentious-lock') } catch (er) {}
  try { lockFile.unlockSync('stale-wait-lock') } catch (er) {}
  try { lockFile.unlockSync('stale-windows-lock') } catch (er) {}
  t.end()
})

