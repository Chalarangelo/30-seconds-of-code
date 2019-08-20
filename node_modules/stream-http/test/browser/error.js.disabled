var Buffer = require('buffer').Buffer
var test = require('tape')

var http = require('../..')

test('error handling', function (t) {
	var req = http.get('https://0.0.0.0:0/fail.txt')
	req.on('error', function (err) {
		t.ok(err && ('message' in err), 'got error')
		t.end()
	})
})