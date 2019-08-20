#!/usr/bin/env node

var concat = require('concat-stream')
var cp = require('child_process')
var fs = require('fs')
var hyperquest = require('hyperquest')
var path = require('path')
var split = require('split')
var through = require('through2')

var url = 'https://api.github.com/repos/nodejs/node/contents'
var dirs = [
  '/test/parallel',
  '/test/pummel'
]

cp.execSync('rm -rf node/*.js', { cwd: path.join(__dirname, '../test') })

var httpOpts = {
  headers: {
    'User-Agent': null
    // auth if github rate-limits you...
    // 'Authorization': 'Basic ' + Buffer('username:password').toString('base64'),
  }
}

dirs.forEach(function (dir) {
  var req = hyperquest(url + dir, httpOpts)
  req.pipe(concat(function (data) {
    if (req.response.statusCode !== 200) {
      throw new Error(url + dir + ': ' + data.toString())
    }
    downloadBufferTests(dir, JSON.parse(data))
  }))
})

function downloadBufferTests (dir, files) {
  files.forEach(function (file) {
    if (!/test-buffer.*/.test(file.name)) return

    if (file.name === 'test-buffer-fakes.js') {
      // These teses only apply to node, where they're calling into C++ and need to
      // ensure the prototype can't be faked, or else there will be a segfault.
      return
    }

    console.log(file.download_url)

    var out = path.join(__dirname, '../test/node', file.name)
    hyperquest(file.download_url, httpOpts)
      .pipe(split())
      .pipe(testfixer(file.name))
      .pipe(fs.createWriteStream(out))
      .on('finish', function () {
        console.log('wrote ' + file.name)
      })
  })
}

function testfixer (filename) {
  var firstline = true

  return through(function (line, enc, cb) {
    line = line.toString()

    if (firstline) {
      // require buffer explicitly
      var preamble = 'var Buffer = require(\'../../\').Buffer;\n'
      if (/use strict/.test(line)) line += '\n' + preamble
      else line + preamble + '\n' + line
      firstline = false
    }

    // use `var` instead of `const`/`let`
    line = line.replace(/(const|let) /g, 'var ')

    // make `var common = require('common')` work
    line = line.replace(/(var common = require.*)/g, 'var common = { skip: function () {} };')

    // make `require('../common')` work
    line = line.replace(/require\('\.\.\/common'\);/g, '')

    // require browser buffer
    line = line.replace(/(.*)require\('buffer'\)(.*)/g, '$1require(\'../../\')$2')

    // comment out console logs
    line = line.replace(/(.*console\..*)/g, '// $1')

    // we can't reliably test typed array max-sizes in the browser
    if (filename === 'test-buffer-big.js') {
      line = line.replace(/(.*new Int8Array.*RangeError.*)/, '// $1')
      line = line.replace(/(.*new ArrayBuffer.*RangeError.*)/, '// $1')
      line = line.replace(/(.*new Float64Array.*RangeError.*)/, '// $1')
    }

    // https://github.com/nodejs/node/blob/v0.12/test/parallel/test-buffer.js#L1138
    // unfortunately we can't run this because crypto-browserify doesn't work in old
    // versions of ie
    if (filename === 'test-buffer.js') {
      line = line.replace(/^(\s*)(var crypto = require.*)/, '$1// $2')
      line = line.replace(/(crypto.createHash.*\))/, '1 /*$1*/')
    }

    cb(null, line + '\n')
  })
}
