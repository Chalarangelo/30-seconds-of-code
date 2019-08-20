var stream = require('stream')
var pump = require('./index')

var rs = new stream.Readable()
var ws = new stream.Writable()

rs._read = function (size) {
  this.push(Buffer(size).fill('abc'))
}

ws._write = function (chunk, encoding, cb) {
  setTimeout(function () {
    cb()
  }, 100)
}

var toHex = function () {
  var reverse = new (require('stream').Transform)()

  reverse._transform = function (chunk, enc, callback) {
    reverse.push(chunk.toString('hex'))
    callback()
  }

  return reverse
}

var wsClosed = false
var rsClosed = false
var callbackCalled = false

var check = function () {
  if (wsClosed && rsClosed && callbackCalled) console.log('done')
}

ws.on('finish', function () {
  wsClosed = true
  check()
})

rs.on('end', function () {
  rsClosed = true
  check()
})

pump(rs, toHex(), toHex(), toHex(), ws, function () {
  callbackCalled = true
  check()
})

setTimeout(function () {
  rs.push(null)
  rs.emit('close')
}, 1000)

setTimeout(function () {
  if (!check()) throw new Error('timeout')
}, 5000)
