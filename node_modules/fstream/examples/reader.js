var fstream = require('../fstream.js')
var tap = require('tap')
var fs = require('fs')
var path = require('path')
var dir = path.dirname(__dirname)

tap.test('reader test', function (t) {
  var children = -1
  var gotReady = false
  var ended = false

  var r = fstream.Reader({
    path: dir,
    filter: function () {
      // return this.parent === r
      return this.parent === r || this === r
    }
  })

  r.on('ready', function () {
    gotReady = true
    children = fs.readdirSync(dir).length
    console.error('Setting expected children to ' + children)
    t.equal(r.type, 'Directory', 'should be a directory')
  })

  r.on('entry', function (entry) {
    children--
    if (!gotReady) {
      t.fail('children before ready!')
    }
    t.equal(entry.dirname, r.path, 'basename is parent dir')
  })

  r.on('error', function (er) {
    t.fail(er)
    t.end()
    process.exit(1)
  })

  r.on('end', function () {
    t.equal(children, 0, 'should have seen all children')
    ended = true
  })

  var closed = false
  r.on('close', function () {
    t.ok(ended, 'saw end before close')
    t.notOk(closed, 'close should only happen once')
    closed = true
    t.end()
  })
})

tap.test('reader error test', function (t) {
  // assumes non-root on a *nix system
  var r = fstream.Reader({ path: '/etc/shadow' })

  r.once('error', function (er) {
    t.ok(true)
    t.end()
  })

  r.on('end', function () {
    t.fail('reader ended without error')
    t.end()
  })
})
