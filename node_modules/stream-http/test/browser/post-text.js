var Buffer = require('buffer').Buffer
var fs = require('fs')
var test = require('tape')

var http = require('../..')

var reference = fs.readFileSync(__dirname + '/../server/static/basic.txt')

test('post text', function (t) {
	var req = http.request({
		path: '/echo',
		method: 'POST'
	}, function (res) {
		var buffers = []

		res.on('end', function () {
			t.ok(reference.equals(Buffer.concat(buffers)), 'echoed contents match')
			t.end()
		})

		res.on('data', function (data) {
			buffers.push(data)
		})
	})

	req.write(reference)
	req.end()
})

test('post text with data in end()', function (t) {
	var req = http.request({
		path: '/echo',
		method: 'POST'
	}, function (res) {
		var buffers = []

		res.on('end', function () {
			t.ok(reference.equals(Buffer.concat(buffers)), 'echoed contents match')
			t.end()
		})

		res.on('data', function (data) {
			buffers.push(data)
		})
	})

	req.end(reference)
})