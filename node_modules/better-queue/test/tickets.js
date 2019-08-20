var assert = require('assert');
var Ticket = require('../lib/ticket');
var Tickets = require('../lib/tickets');

describe('Tickets', function() {
  var ts, t1, t2;

  before(function () {
    t1 = new Ticket();
    t2 = new Ticket();
    ts = new Tickets();
    ts.push(t1);
    ts.push(t2);
  })

  it('should accept', function () {
    assert.ok(!t1.isAccepted, 'ticket 1 is not accepted');
    assert.ok(!t2.isAccepted, 'ticket 2 is not accepted');
    ts.accept();
    assert.ok(t1.isAccepted, 'ticket 1 is accepted');
    assert.ok(t2.isAccepted, 'ticket 2 is accepted');
  })

  it('should queue', function () {
    assert.ok(!t1.isQueued, 'ticket 1 is not queued');
    assert.ok(!t2.isQueued, 'ticket 2 is not queued');
    ts.queued();
    assert.ok(t1.isQueued, 'ticket 1 is queued');
    assert.ok(t2.isQueued, 'ticket 2 is queued');
  })

  it('should start and stop', function () {
    assert.ok(!t1.isStarted, 'ticket 1 is not started');
    assert.ok(!t2.isStarted, 'ticket 2 is not started');
    ts.started();
    assert.ok(t1.isStarted, 'ticket 1 is started');
    assert.ok(t2.isStarted, 'ticket 2 is started');
    ts.stopped();
    assert.ok(!t1.isStarted, 'ticket 1 is stopped');
    assert.ok(!t2.isStarted, 'ticket 2 is stopped');
  })

  it('should finish and emit', function (done) {
    assert.ok(!t1.isFinished, 'ticket 1 is not finished');
    assert.ok(!t2.isFinished, 'ticket 2 is not finished');
    t2.once('finish', function (result) {
      assert.deepEqual(result, { x: 1 });
      assert.ok(t2.isFinished, 'ticket 2 is finished');
      done();
    })
    ts.finish({ x: 1 });
  })

  it('should fail and emit', function (done) {
    assert.ok(!t1.isFailed, 'ticket 1 not failed');
    assert.ok(!t2.isFailed, 'ticket 2 not failed');
    var called = 0;
    t1.once('failed', function (err) {
      assert.equal(err, 'some_error');
      assert.ok(t1.isFailed, 'ticket 1 failed');
      called++;
      if (called == 2) { done() }
    })
    t2.once('failed', function (err) {
      assert.equal(err, 'some_error');
      assert.ok(t2.isFailed, 'ticket 2 failed');
      called++;
      if (called == 2) { done() }
    })
    ts.failed('some_error');
  })

  it('should progress and emit', function (done) {
    t1.once('progress', function (progress) {
      assert.equal(progress.pct, 50);
      assert.equal(progress.complete, 1);
      assert.equal(progress.total, 2);
      assert.equal(progress.message, 'test');
      assert.equal(typeof progress.eta, 'string');
      done()
    });
    ts.progress({
      complete: 1,
      total: 2,
      message: 'test'
    });
  })
  
  
})
