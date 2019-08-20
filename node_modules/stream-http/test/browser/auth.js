var Buffer = require('buffer').Buffer
var test = require('tape')

var http = require('../..')

test('authentication', function (t) {
	http.get({
		path: '/auth',
		auth: 'TestUser:trustno1'
	}, function (res) {
		var buffers = []

		res.on('end', function () {
			t.ok(new Buffer('You\'re in!').equals(Buffer.concat(buffers)), 'authentication succeeded')
			t.end()
		})

		res.on('data', function (data) {
			buffers.push(data)
		})
	})
})