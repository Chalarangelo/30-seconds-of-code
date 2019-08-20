var Buffer = require('buffer').Buffer
var fs = require('fs')
var test = require('tape')

var http = require('../..')

test('abort before response', function (t) {
	var req = http.get('/basic.txt', function (res) {
		t.fail('unexpected response')
	})
	req.abort()
	t.end()
})

test('abort on response', function (t) {
	var req = http.get('/basic.txt', function (res) {
		req.abort()
		t.end()

		res.on('end', function () {
			t.fail('unexpected end')
		})

		res.on('data', function (data) {
			t.fail('unexpected data')
		})
	})
})

test('abort on data', function (t) {
	var req = http.get('/browserify.png?copies=5', function (res) {
		var firstData = true
		var failOnData = false

		res.on('end', function () {
			t.fail('unexpected end')
		})

		res.on('data', function (data) {
			if (failOnData)
				t.fail('unexpected data')
			else if (firstData) {
				firstData = false
				req.abort()
				t.end()
				process.nextTick(function () {
					// Wait for any data that may have been queued
					// in the stream before considering data events
					// as errors
					failOnData = true
				})
			}
		})
	})
})