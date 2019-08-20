'use strict'

var transport = require('../../../spdy-transport')
var utils = transport.utils

var assert = require('assert')
var util = require('util')
var debug = require('debug')('spdy:scheduler')
var Readable = require('readable-stream').Readable

/*
 * We create following structure in `pending`:
 * [ [ id = 0 ], [ id = 1 ], [ id = 2 ], [ id = 0 ] ]
 *     chunks      chunks      chunks      chunks
 *     chunks                  chunks
 *     chunks
 *
 * Then on the `.tick()` pass we pick one chunks from each item and remove the
 * item if it is empty:
 *
 * [ [ id = 0 ], [ id = 2 ] ]
 *     chunks      chunks
 *     chunks
 *
 * Writing out: chunks for 0, chunks for 1, chunks for 2, chunks for 0
 *
 * This way data is interleaved between the different streams.
 */

function Scheduler (options) {
  Readable.call(this)

  // Pretty big window by default
  this.window = 0.25

  if (options && options.window) { this.window = options.window }

  this.sync = []
  this.list = []
  this.count = 0
  this.pendingTick = false
}
util.inherits(Scheduler, Readable)
module.exports = Scheduler

// Just for testing, really
Scheduler.create = function create (options) {
  return new Scheduler(options)
}

function insertCompare (a, b) {
  return a.priority === b.priority
    ? a.stream - b.stream
    : b.priority - a.priority
}

Scheduler.prototype.schedule = function schedule (data) {
  var priority = data.priority
  var stream = data.stream
  var chunks = data.chunks

  // Synchronous frames should not be interleaved
  if (priority === false) {
    debug('queue sync', chunks)
    this.sync.push(data)
    this.count += chunks.length

    this._read()
    return
  }

  debug('queue async priority=%d stream=%d', priority, stream, chunks)
  var item = new SchedulerItem(stream, priority)
  var index = utils.binaryLookup(this.list, item, insertCompare)

  // Push new item
  if (index >= this.list.length || insertCompare(this.list[index], item) !== 0) {
    this.list.splice(index, 0, item)
  } else { // Coalesce
    item = this.list[index]
  }

  item.push(data)

  this.count += chunks.length

  this._read()
}

Scheduler.prototype._read = function _read () {
  if (this.count === 0) {
    return
  }

  if (this.pendingTick) {
    return
  }
  this.pendingTick = true

  var self = this
  process.nextTick(function () {
    self.pendingTick = false
    self.tick()
  })
}

Scheduler.prototype.tick = function tick () {
  // No luck for async frames
  if (!this.tickSync()) { return false }

  return this.tickAsync()
}

Scheduler.prototype.tickSync = function tickSync () {
  // Empty sync queue first
  var sync = this.sync
  var res = true
  this.sync = []
  for (var i = 0; i < sync.length; i++) {
    var item = sync[i]
    debug('tick sync pending=%d', this.count, item.chunks)
    for (var j = 0; j < item.chunks.length; j++) {
      this.count--
      // TODO: handle stream backoff properly
      try {
        res = this.push(item.chunks[j])
      } catch (err) {
        this.emit('error', err)
        return false
      }
    }
    debug('after tick sync pending=%d', this.count)

    // TODO(indutny): figure out the way to invoke callback on actual write
    if (item.callback) {
      item.callback(null)
    }
  }
  return res
}

Scheduler.prototype.tickAsync = function tickAsync () {
  var res = true
  var list = this.list
  if (list.length === 0) {
    return res
  }

  var startPriority = list[0].priority
  for (var index = 0; list.length > 0; index++) {
    // Loop index
    index %= list.length
    if (startPriority - list[index].priority > this.window) { index = 0 }
    debug('tick async index=%d start=%d', index, startPriority)

    var current = list[index]
    var item = current.shift()

    if (current.isEmpty()) {
      list.splice(index, 1)
      if (index === 0 && list.length > 0) {
        startPriority = list[0].priority
      }
      index--
    }

    debug('tick async pending=%d', this.count, item.chunks)
    for (var i = 0; i < item.chunks.length; i++) {
      this.count--
      // TODO: handle stream backoff properly
      try {
        res = this.push(item.chunks[i])
      } catch (err) {
        this.emit('error', err)
        return false
      }
    }
    debug('after tick pending=%d', this.count)

    // TODO(indutny): figure out the way to invoke callback on actual write
    if (item.callback) {
      item.callback(null)
    }
    if (!res) { break }
  }

  return res
}

Scheduler.prototype.dump = function dump () {
  this.tickSync()

  // Write everything out
  while (!this.tickAsync()) {
    // Intentional no-op
  }
  assert.strictEqual(this.count, 0)
}

function SchedulerItem (stream, priority) {
  this.stream = stream
  this.priority = priority
  this.queue = []
}

SchedulerItem.prototype.push = function push (chunks) {
  this.queue.push(chunks)
}

SchedulerItem.prototype.shift = function shift () {
  return this.queue.shift()
}

SchedulerItem.prototype.isEmpty = function isEmpty () {
  return this.queue.length === 0
}
