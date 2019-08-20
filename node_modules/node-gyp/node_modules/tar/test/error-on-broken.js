var fs = require('fs')
var path = require('path')
var zlib = require('zlib')

var tap = require('tap')

var tar = require('../tar.js')

var file = path.join(__dirname, 'cb-never-called-1.0.1.tgz')
var target = path.join(__dirname, 'tmp/extract-test')

tap.test('preclean', function (t) {
  require('rimraf').sync(__dirname + '/tmp/extract-test')
  t.pass('cleaned!')
  t.end()
})

tap.test('extract test', function (t) {
  var extract = tar.Extract(target)
  var inp = fs.createReadStream(file)

  inp.pipe(zlib.createGunzip()).pipe(extract)

  extract.on('error', function (er) {
    t.equal(er.message, 'unexpected eof', 'error noticed')
    t.end()
  })

  extract.on('end', function () {
    t.fail('shouldn\'t reach this point due to errors')
    t.end()
  })
})
