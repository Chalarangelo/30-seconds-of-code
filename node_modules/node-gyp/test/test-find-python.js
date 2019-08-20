'use strict'

var test = require('tape')
var path = require('path')
var configure = require('../lib/configure')
var execFile = require('child_process').execFile
var PythonFinder = configure.test.PythonFinder

test('find python', function (t) {
  t.plan(4)

  configure.test.findPython('python', function (err, found) {
    t.strictEqual(err, null)
    var proc = execFile(found, ['-V'], function (err, stdout, stderr) {
      t.strictEqual(err, null)
      t.strictEqual(stdout, '')
      t.ok(/Python 2/.test(stderr))
    })
    proc.stdout.setEncoding('utf-8')
    proc.stderr.setEncoding('utf-8')
  })
})

function poison(object, property) {
  function fail() {
    throw new Error('Property ' + property + ' should not have been accessed.')
  }
  var descriptor = {
    configurable: true,
    enumerable: false,
    writable: true,
    getter: fail,
    setter: fail,
  }
  Object.defineProperty(object, property, descriptor)
}

// Work around a v0.10.x CI issue where path.resolve() on UNIX systems prefixes
// Windows paths with the current working directory.  v0.12 and up are free of
// this issue because they use path.win32.resolve() which does the right thing.
var resolve = path.win32 && path.win32.resolve || function() {
  function rstrip(s) { return s.replace(/\\+$/, '') }
  return [].slice.call(arguments).map(rstrip).join('\\')
}

function TestPythonFinder() { PythonFinder.apply(this, arguments) }
TestPythonFinder.prototype = Object.create(PythonFinder.prototype)
poison(TestPythonFinder.prototype, 'env')
poison(TestPythonFinder.prototype, 'execFile')
poison(TestPythonFinder.prototype, 'resolve')
poison(TestPythonFinder.prototype, 'stat')
poison(TestPythonFinder.prototype, 'which')
poison(TestPythonFinder.prototype, 'win')

test('find python - python', function (t) {
  t.plan(5)

  var f = new TestPythonFinder('python', done)
  f.which = function(program, cb) {
    t.strictEqual(program, 'python')
    cb(null, program)
  }
  f.execFile = function(program, args, opts, cb) {
    t.strictEqual(program, 'python')
    t.ok(/import sys/.test(args[1]))
    cb(null, '2.7.0')
  }
  f.checkPython()

  function done(err, python) {
    t.strictEqual(err, null)
    t.strictEqual(python, 'python')
  }
})

test('find python - python too old', function (t) {
  t.plan(4)

  var f = new TestPythonFinder('python', done)
  f.which = function(program, cb) {
    t.strictEqual(program, 'python')
    cb(null, program)
  }
  f.execFile = function(program, args, opts, cb) {
    t.strictEqual(program, 'python')
    t.ok(/import sys/.test(args[1]))
    cb(null, '2.3.4')
  }
  f.checkPython()

  function done(err, python) {
    t.ok(/is not supported by gyp/.test(err))
  }
})

test('find python - python too new', function (t) {
  t.plan(4)

  var f = new TestPythonFinder('python', done)
  f.which = function(program, cb) {
    t.strictEqual(program, 'python')
    cb(null, program)
  }
  f.execFile = function(program, args, opts, cb) {
    t.strictEqual(program, 'python')
    t.ok(/import sys/.test(args[1]))
    cb(null, '3.0.0')
  }
  f.checkPython()

  function done(err, python) {
    t.ok(/is not supported by gyp/.test(err))
  }
})

test('find python - no python', function (t) {
  t.plan(2)

  var f = new TestPythonFinder('python', done)
  f.which = function(program, cb) {
    t.strictEqual(program, 'python')
    cb(new Error('not found'))
  }
  f.checkPython()

  function done(err, python) {
    t.ok(/Can't find Python executable/.test(err))
  }
})

test('find python - no python2', function (t) {
  t.plan(6)

  var f = new TestPythonFinder('python2', done)
  f.which = function(program, cb) {
    f.which = function(program, cb) {
      t.strictEqual(program, 'python')
      cb(null, program)
    }
    t.strictEqual(program, 'python2')
    cb(new Error('not found'))
  }
  f.execFile = function(program, args, opts, cb) {
    t.strictEqual(program, 'python')
    t.ok(/import sys/.test(args[1]))
    cb(null, '2.7.0')
  }
  f.checkPython()

  function done(err, python) {
    t.strictEqual(err, null)
    t.strictEqual(python, 'python')
  }
})

test('find python - no python2, no python, unix', function (t) {
  t.plan(3)

  var f = new TestPythonFinder('python2', done)
  poison(f, 'checkPythonLauncher')
  f.win = false

  f.which = function(program, cb) {
    f.which = function(program, cb) {
      t.strictEqual(program, 'python')
      cb(new Error('not found'))
    }
    t.strictEqual(program, 'python2')
    cb(new Error('not found'))
  }
  f.checkPython()

  function done(err, python) {
    t.ok(/Can't find Python executable/.test(err))
  }
})

test('find python - no python, use python launcher', function (t) {
  t.plan(8)

  var f = new TestPythonFinder('python', done)
  f.env = {}
  f.win = true

  f.which = function(program, cb) {
    t.strictEqual(program, 'python')
    cb(new Error('not found'))
  }
  f.execFile = function(program, args, opts, cb) {
    f.execFile = function(program, args, opts, cb) {
      t.strictEqual(program, 'Z:\\snake.exe')
      t.ok(/import sys/.test(args[1]))
      cb(null, '2.7.0')
    }
    t.strictEqual(program, 'py.exe')
    t.notEqual(args.indexOf('-2'), -1)
    t.notEqual(args.indexOf('-c'), -1)
    cb(null, 'Z:\\snake.exe')
  }
  f.checkPython()

  function done(err, python) {
    t.strictEqual(err, null)
    t.strictEqual(python, 'Z:\\snake.exe')
  }
})

test('find python - python 3, use python launcher', function (t) {
  t.plan(10)

  var f = new TestPythonFinder('python', done)
  f.env = {}
  f.win = true

  f.which = function(program, cb) {
    t.strictEqual(program, 'python')
    cb(null, program)
  }
  f.execFile = function(program, args, opts, cb) {
    f.execFile = function(program, args, opts, cb) {
      f.execFile = function(program, args, opts, cb) {
        t.strictEqual(program, 'Z:\\snake.exe')
        t.ok(/import sys/.test(args[1]))
        cb(null, '2.7.0')
      }
      t.strictEqual(program, 'py.exe')
      t.notEqual(args.indexOf('-2'), -1)
      t.notEqual(args.indexOf('-c'), -1)
      cb(null, 'Z:\\snake.exe')
    }
    t.strictEqual(program, 'python')
    t.ok(/import sys/.test(args[1]))
    cb(null, '3.0.0')
  }
  f.checkPython()

  function done(err, python) {
    t.strictEqual(err, null)
    t.strictEqual(python, 'Z:\\snake.exe')
  }
})

test('find python - python 3, use python launcher, python 2 too old',
     function (t) {
  t.plan(9)

  var f = new TestPythonFinder('python', done)
  f.checkedPythonLauncher = false
  f.env = {}
  f.win = true

  f.which = function(program, cb) {
    t.strictEqual(program, 'python')
    cb(null, program)
  }
  f.execFile = function(program, args, opts, cb) {
    f.execFile = function(program, args, opts, cb) {
      f.execFile = function(program, args, opts, cb) {
        t.strictEqual(program, 'Z:\\snake.exe')
        t.ok(/import sys/.test(args[1]))
        cb(null, '2.3.4')
      }
      t.strictEqual(program, 'py.exe')
      t.notEqual(args.indexOf('-2'), -1)
      t.notEqual(args.indexOf('-c'), -1)
      cb(null, 'Z:\\snake.exe')
    }
    t.strictEqual(program, 'python')
    t.ok(/import sys/.test(args[1]))
    cb(null, '3.0.0')
  }
  f.checkPython()

  function done(err, python) {
    t.ok(/is not supported by gyp/.test(err))
  }
})

test('find python - no python, no python launcher, good guess', function (t) {
  t.plan(6)

  var re = /C:[\\\/]Python27[\\\/]python[.]exe/
  var f = new TestPythonFinder('python', done)
  f.env = {}
  f.win = true

  f.which = function(program, cb) {
    t.strictEqual(program, 'python')
    cb(new Error('not found'))
  }
  f.execFile = function(program, args, opts, cb) {
    f.execFile = function(program, args, opts, cb) {
      t.ok(re.test(program))
      t.ok(/import sys/.test(args[1]))
      cb(null, '2.7.0')
    }
    t.strictEqual(program, 'py.exe')
    cb(new Error('not found'))
  }
  f.resolve = resolve
  f.stat = function(path, cb) {
    t.ok(re.test(path))
    cb(null, {})
  }
  f.checkPython()

  function done(err, python) {
    t.ok(re.test(python))
  }
})

test('find python - no python, no python launcher, bad guess', function (t) {
  t.plan(4)

  var f = new TestPythonFinder('python', done)
  f.env = { SystemDrive: 'Z:\\' }
  f.win = true

  f.which = function(program, cb) {
    t.strictEqual(program, 'python')
    cb(new Error('not found'))
  }
  f.execFile = function(program, args, opts, cb) {
    t.strictEqual(program, 'py.exe')
    cb(new Error('not found'))
  }
  f.resolve = resolve
  f.stat = function(path, cb) {
    t.ok(/Z:[\\\/]Python27[\\\/]python.exe/.test(path))
    var err = new Error('not found')
    err.code = 'ENOENT'
    cb(err)
  }
  f.checkPython()

  function done(err, python) {
    t.ok(/Can't find Python executable/.test(err))
  }
})
