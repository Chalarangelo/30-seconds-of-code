var pump = require('./index')

var rs = require('fs').createReadStream('/dev/random')
var ws = require('fs').createWriteStream('/dev/null')

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
  if (wsClosed && rsClosed && callbackCalled) process.exit(0)
}

ws.on('close', function () {
  wsClosed = true
  check()
})

rs.on('close', function () {
  rsClosed = true
  check()
})

pump(rs, toHex(), toHex(), toHex(), ws, function () {
  callbackCalled = true
  check()
})

setTimeout(function () {
  rs.destroy()
}, 1000)

setTimeout(function () {
  throw new Error('timeout')
}, 5000)
