var Buffer = require('buffer').Buffer
var test = require('tape')

var toArrayBuffer = require('.')

function elementsEqual (ab, buffer) {
	var view = new Uint8Array(ab)
	for (var i = 0; i < view.length; i++) {
		if (view[i] !== buffer[i]) {
			return false
		}
	}
	return true
}

test('Basic behavior', function (t) {
	var buf = new Buffer(10)
	for (var i = 0; i < 10; i++) {
		buf[i] = i
	}

	var ab = toArrayBuffer(buf)

	t.equals(ab.byteLength, 10, 'correct length')
	t.ok(elementsEqual(ab, buf), 'elements equal')
	t.end()
})

test('Behavior when input is a subarray 1', function (t) {
	var origBuf = new Buffer(10)
	for (var i = 0; i < 10; i++) {
		origBuf[i] = i
	}
	var buf = origBuf.slice(1)

	var ab = toArrayBuffer(buf)

	t.equals(ab.byteLength, 9, 'correct length')
	t.ok(elementsEqual(ab, buf), 'elements equal')
	t.notOk(ab === buf.buffer, 'the underlying ArrayBuffer is not returned when incorrect')
	t.end()
})

test('Behavior when input is a subarray 2', function (t) {
	var origBuf = new Buffer(10)
	for (var i = 0; i < 10; i++) {
		origBuf[i] = i
	}
	var buf = origBuf.slice(0, 9)

	var ab = toArrayBuffer(buf)

	t.equals(ab.byteLength, 9, 'correct length')
	t.ok(elementsEqual(ab, buf), 'elements equal')
	t.notOk(ab === buf.buffer, 'the underlying ArrayBuffer is not returned when incorrect')
	t.end()
})
