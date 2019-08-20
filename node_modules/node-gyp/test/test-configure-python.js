'use strict'

var test = require('tape')
var path = require('path')
var gyp = require('../lib/node-gyp')
var requireInject = require('require-inject')
var configure = requireInject('../lib/configure', {
  'graceful-fs': {
    'openSync': function (file, mode) { return 0; },
    'closeSync': function (fd) { },
    'writeFile': function (file, data, cb) { cb() },
    'stat': function (file, cb) { cb(null, {}) }
  }
})

var EXPECTED_PYPATH = path.join(__dirname, '..', 'gyp', 'pylib')
var SEPARATOR = process.platform == 'win32' ? ';' : ':'
var SPAWN_RESULT = { on: function () { } }

test('configure PYTHONPATH with no existing env', function (t) {
  t.plan(1)

  delete process.env.PYTHONPATH

  var prog = gyp()
  prog.parseArgv([])
  prog.spawn = function () {
    t.equal(process.env.PYTHONPATH, EXPECTED_PYPATH)
    return SPAWN_RESULT
  }
  configure(prog, [], t.fail)
})

test('configure PYTHONPATH with existing env of one dir', function (t) {
  t.plan(2)

  var existingPath = path.join('a', 'b')
  process.env.PYTHONPATH = existingPath

  var prog = gyp()
  prog.parseArgv([])
  prog.spawn = function () {

    t.equal(process.env.PYTHONPATH, [EXPECTED_PYPATH, existingPath].join(SEPARATOR))

    var dirs = process.env.PYTHONPATH.split(SEPARATOR)
    t.deepEqual(dirs, [EXPECTED_PYPATH, existingPath])

    return SPAWN_RESULT
  }
  configure(prog, [], t.fail)
})

test('configure PYTHONPATH with existing env of multiple dirs', function (t) {
  t.plan(2)

  var pythonDir1 = path.join('a', 'b')
  var pythonDir2 = path.join('b', 'c')
  var existingPath = [pythonDir1, pythonDir2].join(SEPARATOR)
  process.env.PYTHONPATH = existingPath

  var prog = gyp()
  prog.parseArgv([])
  prog.spawn = function () {

    t.equal(process.env.PYTHONPATH, [EXPECTED_PYPATH, existingPath].join(SEPARATOR))

    var dirs = process.env.PYTHONPATH.split(SEPARATOR)
    t.deepEqual(dirs, [EXPECTED_PYPATH, pythonDir1, pythonDir2])

    return SPAWN_RESULT
  }
  configure(prog, [], t.fail)
})
