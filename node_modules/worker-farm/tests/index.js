'use strict'

const tape          = require('tape')
    , child_process = require('child_process')
    , workerFarm    = require('../')
    , childPath     = require.resolve('./child')
    , fs            = require('fs')
    , os            = require('os')

function uniq (ar) {
  let a = [], i, j
  o: for (i = 0; i < ar.length; ++i) {
    for (j = 0; j < a.length; ++j) if (a[j] == ar[i]) continue o
    a[a.length] = ar[i]
  }
  return a
}


// a child where module.exports = function ...
tape('simple, exports=function test', function (t) {
  t.plan(4)

  let child = workerFarm(childPath)
  child(0, function (err, pid, rnd) {
    t.ok(pid > process.pid, 'pid makes sense')
    t.ok(pid < process.pid + 750, 'pid makes sense')
    t.ok(rnd >= 0 && rnd < 1, 'rnd result makes sense')
  })

  workerFarm.end(child, function () {
    t.ok(true, 'workerFarm ended')
  })
})


// a child where we have module.exports.fn = function ...
tape('simple, exports.fn test', function (t) {
  t.plan(4)

  let child = workerFarm(childPath, [ 'run0' ])
  child.run0(function (err, pid, rnd) {
    t.ok(pid > process.pid, 'pid makes sense')
    t.ok(pid < process.pid + 750, 'pid makes sense')
    t.ok(rnd >= 0 && rnd < 1, 'rnd result makes sense')
  })

  workerFarm.end(child, function () {
    t.ok(true, 'workerFarm ended')
  })
})


tape('on child', function (t) {
    t.plan(2)

    let child = workerFarm({ onChild: function(subprocess) { childPid = subprocess.pid } }, childPath)
      , childPid = null;

    child(0, function(err, pid) {
      t.equal(childPid, pid)
    })

    workerFarm.end(child, function () {
      t.ok(true, 'workerFarm ended')
    })
})


// use the returned pids to check that we're using a single child process
// when maxConcurrentWorkers = 1
tape('single worker', function (t) {
  t.plan(2)

  let child = workerFarm({ maxConcurrentWorkers: 1 }, childPath)
    , pids  = []
    , i     = 10

  while (i--) {
    child(0, function (err, pid) {
      pids.push(pid)
      if (pids.length == 10) {
        t.equal(1, uniq(pids).length, 'only a single process (by pid)')
      } else if (pids.length > 10)
        t.fail('too many callbacks!')
    })
  }

  workerFarm.end(child, function () {
    t.ok(true, 'workerFarm ended')
  })
})


// use the returned pids to check that we're using two child processes
// when maxConcurrentWorkers = 2
tape('two workers', function (t) {
  t.plan(2)

  let child = workerFarm({ maxConcurrentWorkers: 2 }, childPath)
    , pids  = []
    , i     = 10

  while (i--) {
    child(0, function (err, pid) {
      pids.push(pid)
      if (pids.length == 10) {
        t.equal(2, uniq(pids).length, 'only two child processes (by pid)')
      } else if (pids.length > 10)
        t.fail('too many callbacks!')
    })
  }

  workerFarm.end(child, function () {
    t.ok(true, 'workerFarm ended')
  })
})


// use the returned pids to check that we're using a child process per
// call when maxConcurrentWorkers = 10
tape('many workers', function (t) {
  t.plan(2)

  let child = workerFarm({ maxConcurrentWorkers: 10 }, childPath)
    , pids  = []
    , i     = 10

  while (i--) {
    child(1, function (err, pid) {
      pids.push(pid)
      if (pids.length == 10) {
        t.equal(10, uniq(pids).length, 'pids are all the same (by pid)')
      } else if (pids.length > 10)
        t.fail('too many callbacks!')
    })
  }

  workerFarm.end(child, function () {
    t.ok(true, 'workerFarm ended')
  })
})


tape('auto start workers', function (t) {
  let child = workerFarm({ maxConcurrentWorkers: 3, autoStart: true }, childPath, ['uptime'])
    , pids  = []
    , count = 5
    , i     = count
    , delay = 250

  t.plan(count + 1)

  setTimeout(function() {
    while (i--)
      child.uptime(function (err, uptime) {
        t.ok(uptime > 10, 'child has been up before the request (' + uptime + 'ms)')
      })

    workerFarm.end(child, function () {
      t.ok(true, 'workerFarm ended')
    })
  }, delay)
})


// use the returned pids to check that we're using a child process per
// call when we set maxCallsPerWorker = 1 even when we have maxConcurrentWorkers = 1
tape('single call per worker', function (t) {
  t.plan(2)

  let child = workerFarm({
          maxConcurrentWorkers: 1
        , maxConcurrentCallsPerWorker: Infinity
        , maxCallsPerWorker: 1
        , autoStart: true
      }, childPath)
    , pids  = []
    , count = 25
    , i     = count

  while (i--) {
    child(0, function (err, pid) {
      pids.push(pid)
      if (pids.length == count) {
        t.equal(count, uniq(pids).length, 'one process for each call (by pid)')
        workerFarm.end(child, function () {
          t.ok(true, 'workerFarm ended')
        })
      } else if (pids.length > count)
        t.fail('too many callbacks!')
    })
  }
})


// use the returned pids to check that we're using a child process per
// two-calls when we set maxCallsPerWorker = 2 even when we have maxConcurrentWorkers = 1
tape('two calls per worker', function (t) {
  t.plan(2)

  let child = workerFarm({
          maxConcurrentWorkers: 1
        , maxConcurrentCallsPerWorker: Infinity
        , maxCallsPerWorker: 2
        , autoStart: true
      }, childPath)
    , pids  = []
    , count = 20
    , i     = count

  while (i--) {
    child(0, function (err, pid) {
      pids.push(pid)
      if (pids.length == count) {
        t.equal(count / 2, uniq(pids).length, 'one process for each call (by pid)')
        workerFarm.end(child, function () {
          t.ok(true, 'workerFarm ended')
        })
      } else if (pids.length > count)
        t.fail('too many callbacks!')
    })
  }
})


// use timing to confirm that one worker will process calls sequentially
tape('many concurrent calls', function (t) {
  t.plan(2)

  let child = workerFarm({
          maxConcurrentWorkers: 1
        , maxConcurrentCallsPerWorker: Infinity
        , maxCallsPerWorker: Infinity
        , autoStart: true
      }, childPath)
    , defer = 200
    , count = 200
    , i     = count
    , cbc   = 0

  setTimeout(function () {
    let start = Date.now()

    while (i--) {
      child(defer, function () {
        if (++cbc == count) {
          let time = Date.now() - start
          // upper-limit not tied to `count` at all
          t.ok(time > defer && time < (defer * 2.5), 'processed tasks concurrently (' + time + 'ms)')
          workerFarm.end(child, function () {
            t.ok(true, 'workerFarm ended')
          })
        } else if (cbc > count)
          t.fail('too many callbacks!')
      })
    }
  }, 250)
})


// use timing to confirm that one child processes calls sequentially with
// maxConcurrentCallsPerWorker = 1
tape('single concurrent call', function (t) {
  t.plan(2)

  let child = workerFarm({
          maxConcurrentWorkers: 1
        , maxConcurrentCallsPerWorker: 1
        , maxCallsPerWorker: Infinity
        , autoStart: true
      }, childPath)
    , defer = 20
    , count = 100
    , i     = count
    , cbc   = 0

  setTimeout(function () {
    let start = Date.now()

    while (i--) {
      child(defer, function () {
        if (++cbc == count) {
          let time = Date.now() - start
          // upper-limit tied closely to `count`, 1.3 is generous but accounts for all the timers
          // coming back at the same time and the IPC overhead
          t.ok(time > (defer * count) && time < (defer * count * 1.3), 'processed tasks sequentially (' + time + ')')
          workerFarm.end(child, function () {
            t.ok(true, 'workerFarm ended')
          })
        } else if (cbc > count)
          t.fail('too many callbacks!')
      })
    }
  }, 250)
})


// use timing to confirm that one child processes *only* 5 calls concurrently
tape('multiple concurrent calls', function (t) {
  t.plan(2)

  let callsPerWorker = 5
    , child = workerFarm({
          maxConcurrentWorkers: 1
        , maxConcurrentCallsPerWorker: callsPerWorker
        , maxCallsPerWorker: Infinity
        , autoStart: true
      }, childPath)
    , defer = 100
    , count = 100
    , i     = count
    , cbc   = 0

  setTimeout(function () {
    let start = Date.now()

    while (i--) {
      child(defer, function () {
        if (++cbc == count) {
          let time = Date.now() - start
          let min = defer * 1.5
          // (defer * (count / callsPerWorker + 2)) - if precise it'd be count/callsPerWorker
          // but accounting for IPC and other overhead, we need to give it a bit of extra time,
          // hence the +2
          let max = defer * (count / callsPerWorker + 2)
          t.ok(time > min && time < max, 'processed tasks concurrently (' + time + ' > ' + min + ' && ' + time + ' < ' + max + ')')
          workerFarm.end(child, function () {
            t.ok(true, 'workerFarm ended')
          })
        } else if (cbc > count)
          t.fail('too many callbacks!')
      })
    }
  }, 250)
})


// call a method that will die with a probability of 0.5 but expect that
// we'll get results for each of our calls anyway
tape('durability', function (t) {
  t.plan(3)

  let child = workerFarm({ maxConcurrentWorkers: 2 }, childPath, [ 'killable' ])
    , ids   = []
    , pids  = []
    , count = 20
    , i     = count

  while (i--) {
    child.killable(i, function (err, id, pid) {
      ids.push(id)
      pids.push(pid)
      if (ids.length == count) {
        t.ok(uniq(pids).length > 2, 'processed by many (' + uniq(pids).length + ') workers, but got there in the end!')
        t.ok(uniq(ids).length == count, 'received a single result for each unique call')
        workerFarm.end(child, function () {
          t.ok(true, 'workerFarm ended')
        })
      } else if (ids.length > count)
        t.fail('too many callbacks!')
    })
  }
})


// a callback provided to .end() can and will be called (uses "simple, exports=function test" to create a child)
tape('simple, end callback', function (t) {
  t.plan(4)

  let child = workerFarm(childPath)
  child(0, function (err, pid, rnd) {
    t.ok(pid > process.pid, 'pid makes sense ' + pid + ' vs ' + process.pid)
    t.ok(pid < process.pid + 750, 'pid makes sense ' + pid + ' vs ' + process.pid)
    t.ok(rnd >= 0 && rnd < 1, 'rnd result makes sense')
  })

  workerFarm.end(child, function() {
    t.pass('an .end() callback was successfully called')
  })
})


tape('call timeout test', function (t) {
  t.plan(3 + 3 + 4 + 4 + 4 + 3 + 1)

  let child = workerFarm({ maxCallTime: 250, maxConcurrentWorkers: 1 }, childPath)

  // should come back ok
  child(50, function (err, pid, rnd) {
    t.ok(pid > process.pid, 'pid makes sense ' + pid + ' vs ' + process.pid)
    t.ok(pid < process.pid + 750, 'pid makes sense ' + pid + ' vs ' + process.pid)
    t.ok(rnd > 0 && rnd < 1, 'rnd result makes sense ' + rnd)
  })

  // should come back ok
  child(50, function (err, pid, rnd) {
    t.ok(pid > process.pid, 'pid makes sense ' + pid + ' vs ' + process.pid)
    t.ok(pid < process.pid + 750, 'pid makes sense ' + pid + ' vs ' + process.pid)
    t.ok(rnd > 0 && rnd < 1, 'rnd result makes sense ' + rnd)
  })

  // should die
  child(500, function (err, pid, rnd) {
    t.ok(err, 'got an error')
    t.equal(err.type, 'TimeoutError', 'correct error type')
    t.ok(pid === undefined, 'no pid')
    t.ok(rnd === undefined, 'no rnd')
  })

  // should die
  child(1000, function (err, pid, rnd) {
    t.ok(err, 'got an error')
    t.equal(err.type, 'TimeoutError', 'correct error type')
    t.ok(pid === undefined, 'no pid')
    t.ok(rnd === undefined, 'no rnd')
  })

  // should die even though it is only a 100ms task, it'll get caught up
  // in a dying worker
  setTimeout(function () {
    child(100, function (err, pid, rnd) {
      t.ok(err, 'got an error')
      t.equal(err.type, 'TimeoutError', 'correct error type')
      t.ok(pid === undefined, 'no pid')
      t.ok(rnd === undefined, 'no rnd')
    })
  }, 200)

  // should be ok, new worker
  setTimeout(function () {
    child(50, function (err, pid, rnd) {
      t.ok(pid > process.pid, 'pid makes sense ' + pid + ' vs ' + process.pid)
      t.ok(pid < process.pid + 750, 'pid makes sense ' + pid + ' vs ' + process.pid)
      t.ok(rnd > 0 && rnd < 1, 'rnd result makes sense ' + rnd)
    })
    workerFarm.end(child, function () {
      t.ok(true, 'workerFarm ended')
    })
  }, 400)
})


tape('test error passing', function (t) {
  t.plan(10)

  let child = workerFarm(childPath, [ 'err' ])
  child.err('Error', 'this is an Error', function (err) {
    t.ok(err instanceof Error, 'is an Error object')
    t.equal('Error', err.type, 'correct type')
    t.equal('this is an Error', err.message, 'correct message')
  })
  child.err('TypeError', 'this is a TypeError', function (err) {
    t.ok(err instanceof Error, 'is a TypeError object')
    t.equal('TypeError', err.type, 'correct type')
    t.equal('this is a TypeError', err.message, 'correct message')
  })
  child.err('Error', 'this is an Error with custom props', {foo: 'bar', 'baz': 1}, function (err) {
    t.ok(err instanceof Error, 'is an Error object')
    t.equal(err.foo, 'bar', 'passes data')
    t.equal(err.baz, 1, 'passes data')
  })

  workerFarm.end(child, function () {
    t.ok(true, 'workerFarm ended')
  })
})


tape('test maxConcurrentCalls', function (t) {
  t.plan(10)

  let child = workerFarm({ maxConcurrentCalls: 5 }, childPath)

  child(50, function (err) { t.notOk(err, 'no error') })
  child(50, function (err) { t.notOk(err, 'no error') })
  child(50, function (err) { t.notOk(err, 'no error') })
  child(50, function (err) { t.notOk(err, 'no error') })
  child(50, function (err) { t.notOk(err, 'no error') })
  child(50, function (err) {
    t.ok(err)
    t.equal(err.type, 'MaxConcurrentCallsError', 'correct error type')
  })
  child(50, function (err) {
    t.ok(err)
    t.equal(err.type, 'MaxConcurrentCallsError', 'correct error type')
  })

  workerFarm.end(child, function () {
    t.ok(true, 'workerFarm ended')
  })
})


tape('test maxConcurrentCalls + queue', function (t) {
  t.plan(13)

  let child = workerFarm({ maxConcurrentCalls: 4, maxConcurrentWorkers: 2, maxConcurrentCallsPerWorker: 1 }, childPath)

  child(20, function (err) { console.log('ended short1'); t.notOk(err, 'no error, short call 1') })
  child(20, function (err) { console.log('ended short2'); t.notOk(err, 'no error, short call 2') })
  child(300, function (err) { t.notOk(err, 'no error, long call 1') })
  child(300, function (err) { t.notOk(err, 'no error, long call 2') })
  child(20, function (err) {
    t.ok(err, 'short call 3 should error')
    t.equal(err.type, 'MaxConcurrentCallsError', 'correct error type')
  })
  child(20, function (err) {
    t.ok(err, 'short call 4 should error')
    t.equal(err.type, 'MaxConcurrentCallsError', 'correct error type')
  })

  // cross fingers and hope the two short jobs have ended
  setTimeout(function () {
    child(20, function (err) { t.notOk(err, 'no error, delayed short call 1') })
    child(20, function (err) { t.notOk(err, 'no error, delayed short call 2') })
    child(20, function (err) {
      t.ok(err, 'delayed short call 3 should error')
      t.equal(err.type, 'MaxConcurrentCallsError', 'correct error type')
    })

    workerFarm.end(child, function () {
      t.ok(true, 'workerFarm ended')
    })
  }, 250)
})


// this test should not keep the process running! if the test process
// doesn't die then the problem is here
tape('test timeout kill', function (t) {
  t.plan(3)

  let child = workerFarm({ maxCallTime: 250, maxConcurrentWorkers: 1 }, childPath, [ 'block' ])
  child.block(function (err) {
    t.ok(err, 'got an error')
    t.equal(err.type, 'TimeoutError', 'correct error type')
  })

  workerFarm.end(child, function () {
    t.ok(true, 'workerFarm ended')
  })
})


tape('test max retries after process terminate', function (t) {
  t.plan(7)

  // temporary file is used to store the number of retries among terminating workers
  let filepath1 = '.retries1'
  let child1 = workerFarm({ maxConcurrentWorkers: 1, maxRetries: 5}, childPath, [ 'stubborn' ])
  child1.stubborn(filepath1, function (err, result) {
    t.notOk(err, 'no error')
    t.equal(result, 12, 'correct result')
  })

  workerFarm.end(child1, function () {
    fs.unlinkSync(filepath1)
    t.ok(true, 'workerFarm ended')
  })

  let filepath2 = '.retries2'
  let child2 = workerFarm({ maxConcurrentWorkers: 1, maxRetries: 3}, childPath, [ 'stubborn' ])
  child2.stubborn(filepath2, function (err, result) {
    t.ok(err, 'got an error')
    t.equal(err.type, 'ProcessTerminatedError', 'correct error type')
    t.equal(err.message, 'cancel after 3 retries!', 'correct message and number of retries')
  })

  workerFarm.end(child2, function () {
    fs.unlinkSync(filepath2)
    t.ok(true, 'workerFarm ended')
  })
})


tape('custom arguments can be passed to "fork"', function (t) {
  t.plan(3)

  // allocate a real, valid path, in any OS
  let cwd = fs.realpathSync(os.tmpdir())
    , workerOptions = {
        cwd      : cwd
      , execArgv : ['--expose-gc']
    }
    , child = workerFarm({ maxConcurrentWorkers: 1, maxRetries: 5, workerOptions: workerOptions}, childPath, ['args'])

  child.args(function (err, result) {
    t.equal(result.execArgv[0], '--expose-gc', 'flags passed (overridden default)')
    t.equal(result.cwd, cwd, 'correct cwd folder')
  })

  workerFarm.end(child, function () {
    t.ok(true, 'workerFarm ended')
  })
})


tape('ensure --debug/--inspect not propagated to children', function (t) {
  t.plan(3)

  let script   = __dirname + '/debug.js'
    , debugArg = process.version.replace(/^v(\d+)\..*$/, '$1') >= 8 ? '--inspect' : '--debug=8881'
    , child    = child_process.spawn(process.execPath, [ debugArg, script ])
    , stdout   = ''

  child.stdout.on('data', function (data) {
    stdout += data.toString()
  })

  child.on('close', function (code) {
    t.equal(code, 0, 'exited without error (' + code + ')')
    t.ok(stdout.indexOf('FINISHED') > -1, 'process finished')
    t.ok(stdout.indexOf('--debug') === -1, 'child does not receive debug flag')
  })
})
