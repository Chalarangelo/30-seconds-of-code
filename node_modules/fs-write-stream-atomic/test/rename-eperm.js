'use strict'
var fs = require('graceful-fs')
var path = require('path')
var test = require('tap').test
var rimraf = require('rimraf')
var writeStream = require('../index.js')

var target = path.resolve(__dirname, 'test-rename-eperm1')
var target2 = path.resolve(__dirname, 'test-rename-eperm2')
var target3 = path.resolve(__dirname, 'test-rename-eperm3')

test('rename eperm none existing file', function (t) {
  t.plan(2)

  var _rename = fs.rename
  fs.existsSync = function (src) {
    return true
  }
  fs.rename = function (src, dest, cb) {
    // simulate a failure during rename where the file
    // is renamed successfully but the process encounters
    // an EPERM error and the target file does not exist
    _rename(src, dest, function (e) {
      var err = new Error('TEST BREAK')
      err.syscall = 'rename'
      err.code = 'EPERM'
      cb(err)
    })
  }

  var stream = writeStream(target, { isWin: true })
  var hadError = false
  var calledFinish = false
  stream.on('error', function (er) {
    hadError = true
    console.log('#', er)
  })
  stream.on('finish', function () {
    calledFinish = true
  })
  stream.on('close', function () {
    t.is(hadError, true, 'error was caught')
    t.is(calledFinish, false, 'finish was called before close')
  })
  stream.end()
})

// test existing file with diff. content
test('rename eperm existing file different content', function (t) {
  t.plan(2)

  var _rename = fs.rename
  fs.existsSync = function (src) {
    return true
  }
  fs.rename = function (src, dest, cb) {
    // simulate a failure during rename where the file
    // is renamed successfully but the process encounters
    // an EPERM error and the target file that has another content than the
    // destination
    _rename(src, dest, function (e) {
      fs.writeFile(src, 'dest', function (writeErr) {
        if (writeErr) {
          return console.log('WRITEERR: ' + writeErr)
        }

        fs.writeFile(target2, 'target', function (writeErr) {
          if (writeErr) {
            return console.log('WRITEERR: ' + writeErr)
          }

          var err = new Error('TEST BREAK')
          err.syscall = 'rename'
          err.code = 'EPERM'
          cb(err)
        })
      })
    })
  }

  var stream = writeStream(target2, { isWin: true })
  var hadError = false
  var calledFinish = false
  stream.on('error', function (er) {
    hadError = true
    console.log('#', er)
  })
  stream.on('finish', function () {
    calledFinish = true
  })
  stream.on('close', function () {
    t.is(hadError, true, 'error was caught')
    t.is(calledFinish, false, 'finish was called before close')
  })
  stream.end()
})

// test existing file with the same content
// test existing file with diff. content
test('rename eperm existing file different content', function (t) {
  t.plan(2)

  var _rename = fs.rename
  fs.existsSync = function (src) {
    return true
  }
  fs.rename = function (src, dest, cb) {
    // simulate a failure during rename where the file
    // is renamed successfully but the process encounters
    // an EPERM error and the target file that has the same content than the
    // destination
    _rename(src, dest, function (e) {
      fs.writeFile(src, 'target2', function (writeErr) {
        if (writeErr) {
          return console.log('WRITEERR: ' + writeErr)
        }

        fs.writeFile(target3, 'target2', function (writeErr) {
          if (writeErr) {
            return console.log('WRITEERR: ' + writeErr)
          }

          var err = new Error('TEST BREAK')
          err.syscall = 'rename'
          err.code = 'EPERM'
          cb(err)
        })
      })
    })
  }

  var stream = writeStream(target3, { isWin: true })
  var hadError = false
  var calledFinish = false
  stream.on('error', function (er) {
    hadError = true
    console.log('#', er)
  })
  stream.on('finish', function () {
    calledFinish = true
  })
  stream.on('close', function () {
    t.is(hadError, false, 'error was caught')
    t.is(calledFinish, true, 'finish was called before close')
  })
  stream.end()
})

test('cleanup', function (t) {
  rimraf.sync(target)
  rimraf.sync(target2)
  rimraf.sync(target3)
  t.end()
})
