'use strict'
var fs = require('graceful-fs')
var path = require('path')
var test = require('tap').test
var rimraf = require('rimraf')
var writeStream = require('../index.js')

var target = path.resolve(__dirname, 'test-chown')

test('slow close', function (t) {
  t.plan(2)
  // The goal here is to simulate the "file close" step happening so slowly
  // that the whole close/rename process could finish before the file is
  // actually closed (and thus buffers truely flushed to the OS). In
  // previous versions of this module, this would result in the module
  // emitting finish & close before the file was fully written and in
  // turn, could break other layers that tried to read the new file.
  var realEmit = fs.WriteStream.prototype.emit
  var reallyClosed = false
  fs.WriteStream.prototype.emit = function (event) {
    if (event !== 'close') return realEmit.apply(this, arguments)
    setTimeout(function () {
      reallyClosed = true
      realEmit.call(this, 'close')
    }.bind(this), 200)
  }
  var stream = writeStream(target)
  stream.on('finish', function () {
    t.is(reallyClosed, true, "didn't finish before target was closed")
  })
  stream.on('close', function () {
    t.is(reallyClosed, true, "didn't close before target was closed")
  })
  stream.end()
})

test('cleanup', function (t) {
  rimraf.sync(target)
  t.end()
})
