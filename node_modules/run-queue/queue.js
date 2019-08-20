'use strict'
module.exports = RunQueue

var validate = require('aproba')

function RunQueue (opts) {
  validate('Z|O', [opts])
  if (!opts) opts = {}
  this.finished = false
  this.inflight = 0
  this.maxConcurrency = opts.maxConcurrency || 1
  this.queued = 0
  this.queue = []
  this.currentPrio = null
  this.currentQueue = null
  this.Promise = opts.Promise || global.Promise
  this.deferred = {}
}

RunQueue.prototype = {}

RunQueue.prototype.run = function () {
  if (arguments.length !== 0) throw new Error('RunQueue.run takes no arguments')
  var self = this
  var deferred = this.deferred
  if (!deferred.promise) {
    deferred.promise = new this.Promise(function (resolve, reject) {
      deferred.resolve = resolve
      deferred.reject = reject
      self._runQueue()
    })
  }
  return deferred.promise
}

RunQueue.prototype._runQueue = function () {
  var self = this

  while ((this.inflight < this.maxConcurrency) && this.queued) {
    if (!this.currentQueue || this.currentQueue.length === 0) {
      // wait till the current priority is entirely processed before
      // starting a new one
      if (this.inflight) return
      var prios = Object.keys(this.queue)
      for (var ii = 0; ii < prios.length; ++ii) {
        var prioQueue = this.queue[prios[ii]]
        if (prioQueue.length) {
          this.currentQueue = prioQueue
          this.currentPrio = prios[ii]
          break
        }
      }
    }

    --this.queued
    ++this.inflight
    var next = this.currentQueue.shift()
    var args = next.args || []

    // we explicitly construct a promise here so that queue items can throw
    // or immediately return to resolve
    var queueEntry = new this.Promise(function (resolve) {
      resolve(next.cmd.apply(null, args))
    })

    queueEntry.then(function () {
      --self.inflight
      if (self.finished) return
      if (self.queued <= 0 && self.inflight <= 0) {
        self.finished = true
        self.deferred.resolve()
      }
      self._runQueue()
    }, function (err) {
      self.finished = true
      self.deferred.reject(err)
    })
  }
}

RunQueue.prototype.add = function (prio, cmd, args) {
  if (this.finished) throw new Error("Can't add to a finished queue. Create a new queue.")
  if (Math.abs(Math.floor(prio)) !== prio) throw new Error('Priorities must be a positive integer value.')
  validate('NFA|NFZ', [prio, cmd, args])
  prio = Number(prio)
  if (!this.queue[prio]) this.queue[prio] = []
  ++this.queued
  this.queue[prio].push({cmd: cmd, args: args})
  // if this priority is higher than the one we're currently processing,
  // switch back to processing its queue.
  if (this.currentPrio > prio) {
    this.currentQueue = this.queue[prio]
    this.currentPrio = prio
  }
}
