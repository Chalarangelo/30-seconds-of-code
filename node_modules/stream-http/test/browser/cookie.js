var Buffer = require('buffer').Buffer
var test = require('tape')

var http = require('../..')

test('cookie', function (t) {
  var cookie = 'hello=world'
  window.document.cookie = cookie

  http.get({
    path: '/cookie',
    withCredentials: false
  }, function (res) {
    var buffers = []

    res.on('end', function () {
      t.ok(new Buffer(cookie).equals(Buffer.concat(buffers)), 'hello cookie echoed')
      t.end()
    })

    res.on('data', function (data) {
      buffers.push(data)
    })
  })
})
