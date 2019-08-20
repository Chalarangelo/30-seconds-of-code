'use strict'

var util = require('util')
var EventEmitter = require('events').EventEmitter
var debug = {
  server: require('debug')('spdy:window:server'),
  client: require('debug')('spdy:window:client')
}

function Side (window, name, options) {
  EventEmitter.call(this)

  this.name = name
  this.window = window
  this.current = options.size
  this.max = options.size
  this.limit = options.max
  this.lowWaterMark = options.lowWaterMark === undefined
    ? this.max / 2
    : options.lowWaterMark

  this._refilling = false
  this._refillQueue = []
}
util.inherits(Side, EventEmitter)

Side.prototype.setMax = function setMax (max) {
  this.window.debug('id=%d side=%s setMax=%d',
    this.window.id,
    this.name,
    max)
  this.max = max
  this.lowWaterMark = this.max / 2
}

Side.prototype.updateMax = function updateMax (max) {
  var delta = max - this.max
  this.window.debug('id=%d side=%s updateMax=%d delta=%d',
    this.window.id,
    this.name,
    max,
    delta)

  this.max = max
  this.lowWaterMark = max / 2

  this.update(delta)
}

Side.prototype.setLowWaterMark = function setLowWaterMark (lwm) {
  this.lowWaterMark = lwm
}

Side.prototype.update = function update (size, callback) {
  // Not enough space for the update, wait for refill
  if (size <= 0 && callback && this.isEmpty()) {
    this.window.debug('id=%d side=%s wait for refill=%d [%d/%d]',
      this.window.id,
      this.name,
      -size,
      this.current,
      this.max)
    this._refillQueue.push({
      size: size,
      callback: callback
    })
    return
  }

  this.current += size

  if (this.current > this.limit) {
    this.emit('overflow')
    return
  }

  this.window.debug('id=%d side=%s update by=%d [%d/%d]',
    this.window.id,
    this.name,
    size,
    this.current,
    this.max)

  // Time to send WINDOW_UPDATE
  if (size < 0 && this.isDraining()) {
    this.window.debug('id=%d side=%s drained', this.window.id, this.name)
    this.emit('drain')
  }

  // Time to write
  if (size > 0 && this.current > 0 && this.current <= size) {
    this.window.debug('id=%d side=%s full', this.window.id, this.name)
    this.emit('full')
  }

  this._processRefillQueue()

  if (callback) { process.nextTick(callback) }
}

Side.prototype.getCurrent = function getCurrent () {
  return this.current
}

Side.prototype.getMax = function getMax () {
  return this.max
}

Side.prototype.getDelta = function getDelta () {
  return this.max - this.current
}

Side.prototype.isDraining = function isDraining () {
  return this.current <= this.lowWaterMark
}

Side.prototype.isEmpty = function isEmpty () {
  return this.current <= 0
}

// Private

Side.prototype._processRefillQueue = function _processRefillQueue () {
  // Prevent recursion
  if (this._refilling) {
    return
  }
  this._refilling = true

  while (this._refillQueue.length > 0) {
    var item = this._refillQueue[0]

    if (this.isEmpty()) {
      break
    }

    this.window.debug('id=%d side=%s refilled for size=%d',
      this.window.id,
      this.name,
      -item.size)

    this._refillQueue.shift()
    this.update(item.size, item.callback)
  }

  this._refilling = false
}

function Window (options) {
  this.id = options.id
  this.isServer = options.isServer
  this.debug = this.isServer ? debug.server : debug.client

  this.recv = new Side(this, 'recv', options.recv)
  this.send = new Side(this, 'send', options.send)
}
module.exports = Window

Window.prototype.clone = function clone (id) {
  return new Window({
    id: id,
    isServer: this.isServer,
    recv: {
      size: this.recv.max,
      max: this.recv.limit,
      lowWaterMark: this.recv.lowWaterMark
    },
    send: {
      size: this.send.max,
      max: this.send.limit,
      lowWaterMark: this.send.lowWaterMark
    }
  })
}
