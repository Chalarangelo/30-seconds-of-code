var Buffer = require('buffer').Buffer
var fs = require('fs')
var test = require('tape')
var UAParser = require('ua-parser-js')

var http = require('../..')

var browser = (new UAParser()).setUA(navigator.userAgent).getBrowser()
var browserName = browser.name
var browserVersion = browser.major
// Binary request bodies don't work in a bunch of browsers
var skipVerification = ((browserName === 'IE' && browserVersion <= 10) ||
	(browserName === 'Safari' && browserVersion <= 5) ||
	(browserName === 'WebKit' && browserVersion <= 534) || // Old mobile safari
	(browserName === 'Android Browser' && browserVersion <= 4))

var reference = fs.readFileSync(__dirname + '/../server/static/browserify.png')

test('post binary', function (t) {
	var req = http.request({
		path: '/echo',
		method: 'POST'
	}, function (res) {
		var buffers = []

		res.on('end', function () {
			if (skipVerification)
				t.skip('binary data not preserved on this browser')
			else
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