var Buffer = require('buffer').Buffer
var test = require('tape')

var http = require('../..')

test('disable fetch', function (t) {
	var originalFetch
	if (typeof fetch === 'function') {
		originalFetch = fetch
	}

	var fetchCalled = false
	fetch = function (input, options) {
		fetchCalled = true
		if (originalFetch) {
			return originalFetch(input, options)
		}
	}

	http.get({
		path: '/browserify.png',
		mode: 'disable-fetch'
	}, function (res) {
		t.ok(!fetchCalled, 'fetch was not called')

		if (originalFetch) {
			fetch = originalFetch
		}

		res.on('end', function () {
			t.ok(res.headers['content-type'] === 'image/png', 'content-type was set correctly')
			t.end()
		})

		res.on('data', function () {})
	})
})
