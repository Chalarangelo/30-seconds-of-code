var Buffer = require('buffer').Buffer
var fs = require('fs')
var test = require('tape')

var http = require('../..')

var reference = fs.readFileSync(__dirname + '/../server/static/basic.txt')

test('get body empty', function (t) {
	var req = http.request({
		path: '/verifyEmpty',
		method: 'GET'
	}, function (res) {
		var buffers = []

		res.on('end', function () {
			console.log(Buffer.concat(buffers).toString('utf8'))
			t.ok(Buffer.from('empty').equals(Buffer.concat(buffers)), 'response body indicates request body was empty')
			t.end()
		})

		res.on('data', function (data) {
			buffers.push(data)
		})
	})

	req.write(reference)
	req.end()
})
