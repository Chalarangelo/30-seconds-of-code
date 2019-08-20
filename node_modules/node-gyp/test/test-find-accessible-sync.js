'use strict'

var test = require('tape')
var path = require('path')
var requireInject = require('require-inject')
var configure = requireInject('../lib/configure', {
  'graceful-fs': {
    'closeSync': function (fd) { return undefined },
    'openSync': function (path) {
      if (readableFiles.some(function (f) { return f === path} )) {
        return 0
      } else {
        var error = new Error('ENOENT - not found')
        throw error
      }
    }
  }
})

var dir = path.sep + 'testdir'
var readableFile = 'readable_file'
var anotherReadableFile = 'another_readable_file'
var readableFileInDir = 'somedir' + path.sep + readableFile
var readableFiles = [
  path.resolve(dir, readableFile),
  path.resolve(dir, anotherReadableFile),
  path.resolve(dir, readableFileInDir)
]

test('find accessible - empty array', function (t) {
  t.plan(1)

  var candidates = []
  var found = configure.test.findAccessibleSync('test', dir, candidates)
  t.strictEqual(found, undefined)
})

test('find accessible - single item array, readable', function (t) {
  t.plan(1)

  var candidates = [ readableFile ]
  var found = configure.test.findAccessibleSync('test', dir, candidates)
  t.strictEqual(found, path.resolve(dir, readableFile))
})

test('find accessible - single item array, readable in subdir', function (t) {
  t.plan(1)

  var candidates = [ readableFileInDir ]
  var found = configure.test.findAccessibleSync('test', dir, candidates)
  t.strictEqual(found, path.resolve(dir, readableFileInDir))
})

test('find accessible - single item array, unreadable', function (t) {
  t.plan(1)

  var candidates = [ 'unreadable_file' ]
  var found = configure.test.findAccessibleSync('test', dir, candidates)
  t.strictEqual(found, undefined)
})


test('find accessible - multi item array, no matches', function (t) {
  t.plan(1)

  var candidates = [ 'non_existent_file', 'unreadable_file' ]
  var found = configure.test.findAccessibleSync('test', dir, candidates)
  t.strictEqual(found, undefined)
})


test('find accessible - multi item array, single match', function (t) {
  t.plan(1)

  var candidates = [ 'non_existent_file', readableFile ]
  var found = configure.test.findAccessibleSync('test', dir, candidates)
  t.strictEqual(found, path.resolve(dir, readableFile))
})

test('find accessible - multi item array, return first match', function (t) {
  t.plan(1)

  var candidates = [ 'non_existent_file', anotherReadableFile, readableFile ]
  var found = configure.test.findAccessibleSync('test', dir, candidates)
  t.strictEqual(found, path.resolve(dir, anotherReadableFile))
})
