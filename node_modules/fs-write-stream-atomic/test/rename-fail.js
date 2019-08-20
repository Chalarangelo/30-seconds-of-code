'use strict'
var fs = require('graceful-fs')
var path = require('path')
var test = require('tap').test
var rimraf = require('rimraf')
var writeStream = require('../index.js')

var target = path.resolve(__dirname, 'test-rename')

test('rename fails', function (t) {
  t.plan(1)
  fs.rename = function (src, dest, cb) {
    cb(new Error('TEST BREAK'))
  }
  var stream = writeStream(target)
  var hadError = false
  stream.on('error', function (er) {
    hadError = true
    console.log('#', er)
  })
  stream.on('close', function () {
    t.is(hadError, true, 'error before close')
  })
  stream.end()
})

test('cleanup', function (t) {
  rimraf.sync(target)
  t.end()
})
