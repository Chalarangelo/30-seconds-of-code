var Buffer = require('buffer').Buffer
var fs = require('fs')
var test = require('tape')

var http = require('../..')

test('timeout', function (t) {
	var req = http.get({
		path: '/browserify.png?copies=5',
		requestTimeout: 10 // ms
	}, function (res) {
		res.on('data', function (data) {
		})
		res.on('end', function () {
			t.fail('request completed (should have timed out)')
		})
	})
	req.on('requestTimeout', function () {
		t.pass('got timeout')
		t.end()
	})
})

// TODO: reenable this if there's a way to make it simultaneously
// fast and reliable
test.skip('no timeout after success', function (t) {
	var req = http.get({
		path: '/basic.txt',
		requestTimeout: 50000 // ms
	}, function (res) {
		res.on('data', function (data) {
		})
		res.on('end', function () {
			t.pass('success')
			global.setTimeout(function () {
				t.end()
			}, 50000)
		})
	})
	req.on('requestTimeout', function () {
		t.fail('unexpected timeout')
	})
})