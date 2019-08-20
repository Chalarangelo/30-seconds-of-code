var assert = require('assert');
var helper = require('./lib/helper');
var Queue = require('../lib/queue');

describe('Basic Queue', function() {
  afterEach(helper.destroyQueues);

  it('should succeed', function (done) {
    var q = new Queue(function (n, cb) {
      cb(null, n+1)
    }, { autoResume: true })
    q.on('task_finish', function (taskId, r) {
      assert.equal(r, 2);
      done();
    })
    q.push(1, function (err, r) {
      assert.equal(r, 2);
    })
    this.q = q;
  });

  it('should fail task if failTaskOnProcessException is true', function (done) {
    var q = new Queue(function (n, cb) {
      throw new Error("failed");
    }, { autoResume: true })
    q.on('task_failed', function (taskId, err) {
      assert.equal(err.message, "failed");
      done();
    })
    q.push(1)
    this.q = q;
  });

  it('should emit an error if failTaskOnProcessException is false', function (done) {
    var q = new Queue(function (n, cb) {
      throw new Error("failed");
    }, { failTaskOnProcessException: false, autoResume: true })
    q.on('error', function () {
      done();
    })
    q.push(1)
    this.q = q;
  });

  it('should fail', function (done) {
    var q = new Queue(function (n, cb) {
      cb('nope')
    }, { autoResume: true })
    q.on('task_failed', function (taskId, msg) {
      assert.equal(msg, 'nope');
      done();
    })
    q.push(1, function (err, r) {
      assert.equal(err, 'nope');
    })
    this.q = q;
  });

  it('should run fifo', function (done) {
    var finished = 0;
    var queued = 0;
    var q = new Queue(function (num, cb) { cb() })
    q.on('task_finish', function () {
      if (finished >= 3) {
        done();
      }
    })
    q.on('task_queued', function () {
      queued++;
      if (queued >= 3) {
        q.resume();
      }
    })
    q.pause();
    q.push(1, function (err, r) {
      assert.equal(finished, 0);
      finished++;
    })
    q.push(2, function (err, r) {
      assert.equal(finished, 1);
      finished++;
    })
    q.push(3, function (err, r) {
      assert.equal(finished, 2);
      finished++;
    })
    this.q = q;
  })

  it('should prioritize', function (done) {
    var q = new Queue(function (num, cb) { cb() }, {
      priority: function (n, cb) {
        if (n === 2) return cb(null, 10);
        if (n === 1) return cb(null, 5);
        return cb(null, 1);
      }
    })
    q.pause();
    var finished = 0;
    var queued = 0;
    q.on('task_queued', function () {
      queued++;
      if (queued === 3) {
        q.resume();
      }
    })
    q.push(3, function (err, r) {
      assert.equal(finished, 2);
      finished++;
    });
    q.push(2, function (err, r) {
      assert.equal(finished, 0);
      finished++;
    });
    q.push(1, function (err, r) {
      assert.equal(finished, 1);
      finished++;
      done()
    });
    this.q = q;
  })

  it('should run filo', function (done) {
    var finished = 0;
    var queued = 0;
    var q = new Queue(function (num, cb) {
      cb();
    }, { filo: true })
    q.on('task_finish', function () {
      if (finished >= 3) {
        done();
      }
    })
    q.on('task_queued', function () {
      queued++;
      if (queued >= 3) {
        q.resume();
      }
    })
    q.pause();
    q.push(1, function (err, r) {
      assert.equal(finished, 2);
      finished++;
    })
    q.push(2, function (err, r) {
      assert.equal(finished, 1);
      finished++;
    })
    q.push(3, function (err, r) {
      assert.equal(finished, 0);
      finished++;
    })
    this.q = q;
  })

  it('should filter before process', function (done) {
    var q = new Queue(function (n, cb) { cb(null, n) }, {
      filter: function (n, cb) {
        cb(null, n === 2 ? false : n);
      }
    })
    q.push(2, function (err, r) {
      assert.equal(err, 'input_rejected');
    })
    q.push(3, function (err, r) {
      assert.equal(r, 3);
      done();
    })
    this.q = q;
  })

  it('should batch delay', function (done) {
    var batches = 0;
    var q = new Queue(function (batch, cb) {
      batches++;
      if (batches === 1) {
        assert.equal(batch.length, 2);
        return cb();
      }
      if (batches === 2) {
        assert.equal(batch.length, 1);
        cb();
        return done();
      }
    }, { batchSize: 2, batchDelay: 5, failTaskOnProcessException: false });
    q.push(1);
    q.push(2);
    q.push(3);
    this.q = q;
  })

  it('should batch 2', function (done) {
    var finished = 0;
    var q = new Queue(function (batch, cb) {
      finished++;
      assert.equal(batch.length, 1);
      if (finished >= 2) {
        done();
      }
      cb();
    }, { batchSize: 2, batchDelay: 1, autoResume: true });
    q.push(1)
      .on('queued', function () {
        setTimeout(function () {
          q.push(2);
        }, 2)
      })
    this.q = q;
  })

  it('should drain and empty', function (done) {
    var emptied = false;
    var q = new Queue(function (n, cb) { cb() })
    q.on('empty', function () {
      emptied = true;
    }, { autoResume: true })
    q.on('drain', function () {
      assert.ok(emptied);
      done();
    });
    var queued = 0;
    q.on('task_queued', function () {
      queued++;
      if (queued >= 3) {
        q.resume();
      }
    })
    q.pause();
    q.push(1)
    q.push(2)
    q.push(3)
    this.q = q;
  })

  it('should drain only once the task is complete', function (done) {
    var finished_task = false;
    var q = new Queue(function (n, cb) {
        finished_task = true;
        cb();
    }, { concurrent: 2 });
    q.on('drain', function () {
      assert.ok(finished_task);
      done();
    });
    q.push(1);
    this.q = q;
  });

  it('should queue 50 things', function (done) {
    var q = new Queue(function (n, cb) {
      cb(null, n+1);
    })
    var finished = 0;
    for (var i = 0; i < 50; i++) {
      (function (n) {
        q.push(n, function (err, r) {
          assert.equal(r, n+1);
          finished++;
          if (finished === 50) {
            done();
          }
        })
      })(i)
    }
    this.q = q;
  });

  it('should concurrently handle tasks', function (done) {
    var concurrent = 0;
    var ok = false;
    var q = new Queue(function (n, cb) {
      var wait = function () {
        if (concurrent === 3) {
          ok = true;
        }
        if (ok) return cb();
        setImmediate(function () {
          wait();
        })
      }
      concurrent++;
      wait();
    }, { concurrent: 3 })
    var finished = 0;
    var finish = function () {
      finished++;
      if (finished >= 4) {
        done();
      }
    }
    q.push(0, finish);
    q.push(1, finish);
    q.push(2, finish);
    q.push(3, finish);
    this.q = q;
  })

  it('should pause and resume', function (done) {
    var running = false;
    var q = new Queue(function (n, cb) {
      running = true;
      return {
        pause: function () {
          running = false;
        },
        resume: function () {
          running = true;
          cb();
          done();
        }
      }
    })
    q.pause();
    q.push(1)
      .on('started', function () {
        setTimeout(function () {
          assert.ok(running);
          q.pause();
          assert.ok(!running);
          q.resume();
        }, 1)
      })
    assert.ok(!running);
    q.resume();
    this.q = q;
  })

  it('should timeout and fail', function (done) {
    var tries = 0;
    var q = new Queue(function (n, cb) {
      tries++;
      setTimeout(function () {
        cb(null, 'done!')
      }, 3)
    }, { maxTimeout: 1, maxRetries: 2 })
    q.push(1)
      .on('finish', function (result) {
        assert.ok(false)
      })
      .on('failed', function (err) {
        assert.equal(tries, 2);
        setTimeout(function () {
          done();
        }, 5)
      })
    this.q = q;
  })

  it('should cancel while running and in queue', function (done) {
    var q = new Queue(function (task, cb) {
      assert.ok(task.n, 2)
      setTimeout(function () {
        q.cancel(1);
      }, 1)
      return {
        cancel: function () {
          done();
        }
      }
    }, {
      id: 'id',
      merge: function (a,b) {
        assert.ok(false);
      }
    })
    q.push({ id: 1, n: 1 })
      .on('queued', function () {
        q.cancel(1, function () {
          q.push({ id: 1, n: 2 });
        })
      });
    this.q = q;
  })

  it('should stop if precondition fails', function (done) {
    var retries = 0;
    var q = new Queue(function (n) {
      assert.equal(retries, 2);
      done();
    }, {
      precondition: function (cb) {
        retries++;
        cb(null, retries === 2)
      },
      preconditionRetryTimeout: 1
    })
    q.push(1);
    this.q = q;
  })

  it('should call cb on throw', function (done) {
    var called = false;
    var q = new Queue(function (task, cb) {
      throw new Error('fail');
    });
    q.push(1, function (err) {
      called = true;
      assert.ok(err);
    });
    q.on('drain', function () {
      assert.ok(called);
      done();
    });
    this.q = q;
  })

  it('should respect batchDelayTimeout', function (done) {
    var q = new Queue(function (arr) {
      assert.equal(arr.length, 2);
      done();
    }, {
      batchSize: 3,
      batchDelay: Infinity,
      batchDelayTimeout: 5
    })
    q.push(1);
    setTimeout(function () {
      q.push(2);
    }, 1)
    this.q = q;
  })

  it('should merge but not batch until the delay has happened', function (done) {
    var running = false;
    var q = new Queue(function (arr) {
      running = true;
    }, {
      autoResume: true,
      batchSize: 2,
      batchDelay: Infinity,
      id: 'id'
    })
    setTimeout(function () {
      q.push({ id: 'a', x: 1 });
      q.push({ id: 'a', x: 2 });
    }, 1)
    setTimeout(function () {
      assert.ok(!running);
      done();
    }, 10)
    this.q = q;
  })

  it('merge batches should call all push callbacks', function (done) {
    var count = 0
    function finish() {
      count++
      if (count === 2) done()
    }
    var q = new Queue(function (arr, cb) {
      cb()
    }, {
      autoResume: true,
      batchSize: 2,
      id: 'id'
    })
    q.push({ id: 'a', x: 1 }, finish)
    q.push({ id: 'a', x: 2 }, finish)
    this.q = q;
  })

  it('cancel should not retry', function (done) {
    var count = 0;
    var q = new Queue(function (n, cb) {
      count++;
      if (count === 2) {
        q.cancel('a', function () {
          cb('failed again');
          setTimeout(function () {
            if (count === 2) {
              done();
            }
          }, 100)
        })
      } else {
        cb('failed');
      }
    }, {
      autoResume: true,
      failTaskOnProcessException: true,
      maxRetries: Infinity,
      id: 'id'
    })
    q.push({ id: 'a', x: 1 });
    this.q = q;
  })

})
