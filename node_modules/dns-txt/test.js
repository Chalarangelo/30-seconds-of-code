'use strict'

var test = require('tape')
var txtStr = require('./')()
var txtBin = require('./')({ binary: true })

var obj = {
  String: 'foo',
  number: 42,
  empty: '',
  null: null,
  bool: true,
  buffer: new Buffer('bar')
}

test('encodingLength', function (t) {
  var len = txtBin.encodingLength(obj)
  t.equal(len, 54)
  t.end()
})

test('encode', function (t) {
  var buf = txtBin.encode(obj)
  var expected = new Buffer('0a' + '537472696e67' + '3d' + '666f6f' +
                            '09' + '6e756d626572' + '3d' + '3432' +
                            '06' + '656d707479' + '3d' +
                            '09' + '6e756c6c' + '3d' + '6e756c6c' +
                            '04' + '626f6f6c' +
                            '0a' + '627566666572' + '3d' + '626172', 'hex')
  t.deepEqual(buf, expected)
  t.equal(txtBin.encode.bytes, expected.length)
  t.end()
})

test('encode - empty', function (t) {
  var buf = txtBin.encode({})
  var expected = new Buffer('00', 'hex')
  t.deepEqual(buf, expected)
  t.equal(txtBin.encode.bytes, expected.length)
  t.end()
})

test('encode - undefined', function (t) {
  var buf = txtBin.encode()
  var expected = new Buffer('00', 'hex')
  t.deepEqual(buf, expected)
  t.equal(txtBin.encode.bytes, expected.length)
  t.end()
})

test('encode - with buffer', function (t) {
  var buf = new Buffer(3)
  buf.fill(255)
  txtBin.encode({}, buf)
  var expected = new Buffer('00ffff', 'hex')
  t.deepEqual(buf, expected)
  t.equal(txtBin.encode.bytes, 1)
  t.end()
})

test('encode - with buffer and offset', function (t) {
  var buf = new Buffer(3)
  buf.fill(255)
  txtBin.encode({}, buf, 1)
  var expected = new Buffer('ff00ff', 'hex')
  t.deepEqual(buf, expected)
  t.equal(txtBin.encode.bytes, 1)
  t.end()
})

test('decode', function (t) {
  var encoded = txtBin.encode(obj)
  var result = txtBin.decode(encoded)
  var expected = {
    string: new Buffer('foo'),
    number: new Buffer('42'),
    empty: new Buffer(0),
    null: new Buffer('null'),
    bool: true,
    buffer: new Buffer('bar')
  }
  t.deepEqual(result, expected)
  t.equal(txtBin.decode.bytes, encoded.length)
  t.end()
})

test('decode - strings', function (t) {
  var encoded = txtStr.encode(obj)
  var result = txtStr.decode(encoded)
  var expected = {
    string: 'foo',
    number: '42',
    empty: '',
    null: 'null',
    bool: true,
    buffer: 'bar'
  }
  t.deepEqual(result, expected)
  t.equal(txtStr.decode.bytes, encoded.length)
  t.end()
})

test('decode - duplicate', function (t) {
  var orig = {
    Foo: 'bar',
    foo: 'ignore this'
  }
  var expected = {
    foo: new Buffer('bar')
  }
  var encoded = txtBin.encode(orig)
  var result = txtBin.decode(encoded)
  t.deepEqual(result, expected)
  t.equal(txtBin.decode.bytes, encoded.length)
  t.end()
})

test('decode - single zero bype', function (t) {
  var encoded = new Buffer('00', 'hex')
  var result = txtBin.decode(encoded)
  t.deepEqual(result, {})
  t.equal(txtBin.decode.bytes, encoded.length)
  t.end()
})

test('decode - with offset', function (t) {
  var encoded = new Buffer('012300', 'hex')
  var result = txtBin.decode(encoded, 2)
  t.deepEqual(result, {})
  t.equal(txtBin.decode.bytes, 1)
  t.end()
})

test('decode - exactly 256 bytes', function (t) {
  var expected = { foo: '' }
  var maxLength = Object.keys(expected).reduce(function (total, key) {
    return total - key.length - 1 // - 1 for the equal sign used to separate the key and the value
  }, 255)

  for (var n = 0; n < maxLength; n++) {
    expected.foo += 'x'
  }

  // the max case:
  var encoded = txtStr.encode(expected)
  t.equal(txtStr.encode.bytes, 256)
  var result = txtStr.decode(encoded)
  t.deepEqual(result, expected)
  t.equal(txtStr.decode.bytes, encoded.length)

  // go beound the max:
  expected.foo += 'x'
  encoded = txtStr.encode(expected)
  t.equal(txtStr.encode.bytes, 257)
  result = txtStr.decode(encoded)
  t.notDeepEqual(result, expected)
  t.ok(txtStr.decode.bytes > encoded.length)

  t.end()
})
