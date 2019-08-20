'use strict'

var crypto = require('crypto')
var fs = require('fs')
var alloc = require('buffer-alloc')

var BUFFER_SIZE = 8192

function md5FileSync (filename) {
  var fd = fs.openSync(filename, 'r')
  var hash = crypto.createHash('md5')
  var buffer = alloc(BUFFER_SIZE)

  try {
    var bytesRead

    do {
      bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE)
      hash.update(buffer.slice(0, bytesRead))
    } while (bytesRead === BUFFER_SIZE)
  } finally {
    fs.closeSync(fd)
  }

  return hash.digest('hex')
}

function md5File (filename, cb) {
  if (typeof cb !== 'function') throw new TypeError('Argument cb must be a function')

  var output = crypto.createHash('md5')
  var input = fs.createReadStream(filename)

  input.on('error', function (err) {
    cb(err)
  })

  output.once('readable', function () {
    cb(null, output.read().toString('hex'))
  })

  input.pipe(output)
}

module.exports = md5File
module.exports.sync = md5FileSync
