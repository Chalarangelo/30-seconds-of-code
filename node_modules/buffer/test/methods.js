if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false
var B = require('../').Buffer
var test = require('tape')

test('buffer.toJSON', function (t) {
  var data = [1, 2, 3, 4]
  t.deepEqual(
    new B(data).toJSON(),
    { type: 'Buffer', data: [ 1, 2, 3, 4 ] }
  )
  t.end()
})

test('buffer.copy', function (t) {
  // copied from nodejs.org example
  var buf1 = new B(26)
  var buf2 = new B(26)

  for (var i = 0; i < 26; i++) {
    buf1[i] = i + 97 // 97 is ASCII a
    buf2[i] = 33 // ASCII !
  }

  buf1.copy(buf2, 8, 16, 20)

  t.equal(
    buf2.toString('ascii', 0, 25),
    '!!!!!!!!qrst!!!!!!!!!!!!!'
  )
  t.end()
})

test('test offset returns are correct', function (t) {
  var b = new B(16)
  t.equal(4, b.writeUInt32LE(0, 0))
  t.equal(6, b.writeUInt16LE(0, 4))
  t.equal(7, b.writeUInt8(0, 6))
  t.equal(8, b.writeInt8(0, 7))
  t.equal(16, b.writeDoubleLE(0, 8))
  t.end()
})

test('concat() a varying number of buffers', function (t) {
  var zero = []
  var one = [ new B('asdf') ]
  var long = []
  for (var i = 0; i < 10; i++) {
    long.push(new B('asdf'))
  }

  var flatZero = B.concat(zero)
  var flatOne = B.concat(one)
  var flatLong = B.concat(long)
  var flatLongLen = B.concat(long, 40)

  t.equal(flatZero.length, 0)
  t.equal(flatOne.toString(), 'asdf')
  t.deepEqual(flatOne, one[0])
  t.equal(flatLong.toString(), (new Array(10 + 1).join('asdf')))
  t.equal(flatLongLen.toString(), (new Array(10 + 1).join('asdf')))
  t.end()
})

test('fill', function (t) {
  var b = new B(10)
  b.fill(2)
  t.equal(b.toString('hex'), '02020202020202020202')
  t.end()
})

test('fill (string)', function (t) {
  var b = new B(10)
  b.fill('abc')
  t.equal(b.toString(), 'abcabcabca')
  b.fill('է')
  t.equal(b.toString(), 'էէէէէ')
  t.end()
})

test('copy() empty buffer with sourceEnd=0', function (t) {
  var source = new B([42])
  var destination = new B([43])
  source.copy(destination, 0, 0, 0)
  t.equal(destination.readUInt8(0), 43)
  t.end()
})

test('copy() after slice()', function (t) {
  var source = new B(200)
  var dest = new B(200)
  var expected = new B(200)
  for (var i = 0; i < 200; i++) {
    source[i] = i
    dest[i] = 0
  }

  source.slice(2).copy(dest)
  source.copy(expected, 0, 2)
  t.deepEqual(dest, expected)
  t.end()
})

test('copy() ascending', function (t) {
  var b = new B('abcdefghij')
  b.copy(b, 0, 3, 10)
  t.equal(b.toString(), 'defghijhij')
  t.end()
})

test('copy() descending', function (t) {
  var b = new B('abcdefghij')
  b.copy(b, 3, 0, 7)
  t.equal(b.toString(), 'abcabcdefg')
  t.end()
})

test('buffer.slice sets indexes', function (t) {
  t.equal((new B('hallo')).slice(0, 5).toString(), 'hallo')
  t.end()
})

test('buffer.slice out of range', function (t) {
  t.plan(2)
  t.equal((new B('hallo')).slice(0, 10).toString(), 'hallo')
  t.equal((new B('hallo')).slice(10, 2).toString(), '')
  t.end()
})
