var Buffer = require('buffer').Buffer
var fs = require('fs')
var test = require('tape')
var UAParser = require('ua-parser-js')
var url = require('url')

var http = require('../..')

var browser = (new UAParser()).setUA(navigator.userAgent).getBrowser()
var browserName = browser.name
var browserVersion = browser.major
// Response urls don't work on many browsers
var skipResponseUrl = ((browserName === 'IE') ||
	(browserName === 'Edge') ||
	(browserName === 'Chrome' && browserVersion <= 36) ||
	(browserName === 'Firefox' && browserVersion <= 31) ||
	((browserName === 'Safari' || browserName === 'Mobile Safari') && browserVersion <= 8) ||
	(browserName === 'WebKit') || // Old mobile safari
	(browserName === 'Android Browser' && browserVersion <= 4))

var reference = fs.readFileSync(__dirname + '/../server/static/basic.txt')

test('basic functionality', function (t) {
	http.get('/basic.txt', function (res) {
		if (!skipResponseUrl) {
			var testUrl = url.resolve(global.location.href, '/basic.txt')
			// Redirects aren't tested, but presumably only browser bugs
			// would cause this to fail only after redirects.
			t.equals(res.url, testUrl, 'response url correct')
		}

		var buffers = []

		res.on('end', function () {
			t.ok(reference.equals(Buffer.concat(buffers)), 'contents match')
			t.end()
		})

		res.on('data', function (data) {
			buffers.push(data)
		})
	})
})