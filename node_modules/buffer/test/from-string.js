if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false
var B = require('../').Buffer
var test = require('tape')

test('detect utf16 surrogate pairs', function (t) {
  var text = '\uD83D\uDE38' + '\uD83D\uDCAD' + '\uD83D\uDC4D'
  var buf = new B(text)
  t.equal(text, buf.toString())
  t.end()
})

test('detect utf16 surrogate pairs over U+20000 until U+10FFFF', function (t) {
  var text = '\uD842\uDFB7' + '\uD93D\uDCAD' + '\uDBFF\uDFFF'
  var buf = new B(text)
  t.equal(text, buf.toString())
  t.end()
})

test('replace orphaned utf16 surrogate lead code point', function (t) {
  var text = '\uD83D\uDE38' + '\uD83D' + '\uD83D\uDC4D'
  var buf = new B(text)
  t.deepEqual(buf, new B([ 0xf0, 0x9f, 0x98, 0xb8, 0xef, 0xbf, 0xbd, 0xf0, 0x9f, 0x91, 0x8d ]))
  t.end()
})

test('replace orphaned utf16 surrogate trail code point', function (t) {
  var text = '\uD83D\uDE38' + '\uDCAD' + '\uD83D\uDC4D'
  var buf = new B(text)
  t.deepEqual(buf, new B([ 0xf0, 0x9f, 0x98, 0xb8, 0xef, 0xbf, 0xbd, 0xf0, 0x9f, 0x91, 0x8d ]))
  t.end()
})

test('do not write partial utf16 code units', function (t) {
  var f = new B([0, 0, 0, 0, 0])
  t.equal(f.length, 5)
  var size = f.write('あいうえお', 'utf16le')
  t.equal(size, 4)
  t.deepEqual(f, new B([0x42, 0x30, 0x44, 0x30, 0x00]))
  t.end()
})

test('handle partial utf16 code points when encoding to utf8 the way node does', function (t) {
  var text = '\uD83D\uDE38' + '\uD83D\uDC4D'

  var buf = new B(8)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0xf0, 0x9f, 0x98, 0xb8, 0xf0, 0x9f, 0x91, 0x8d ]))

  buf = new B(7)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0xf0, 0x9f, 0x98, 0xb8, 0x00, 0x00, 0x00 ]))

  buf = new B(6)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0xf0, 0x9f, 0x98, 0xb8, 0x00, 0x00 ]))

  buf = new B(5)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0xf0, 0x9f, 0x98, 0xb8, 0x00 ]))

  buf = new B(4)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0xf0, 0x9f, 0x98, 0xb8 ]))

  buf = new B(3)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0x00, 0x00, 0x00 ]))

  buf = new B(2)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0x00, 0x00 ]))

  buf = new B(1)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0x00 ]))

  t.end()
})

test('handle invalid utf16 code points when encoding to utf8 the way node does', function (t) {
  var text = 'a' + '\uDE38\uD83D' + 'b'

  var buf = new B(8)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0x61, 0xef, 0xbf, 0xbd, 0xef, 0xbf, 0xbd, 0x62 ]))

  buf = new B(7)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0x61, 0xef, 0xbf, 0xbd, 0xef, 0xbf, 0xbd ]))

  buf = new B(6)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0x61, 0xef, 0xbf, 0xbd, 0x00, 0x00 ]))

  buf = new B(5)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0x61, 0xef, 0xbf, 0xbd, 0x00 ]))

  buf = new B(4)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0x61, 0xef, 0xbf, 0xbd ]))

  buf = new B(3)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0x61, 0x00, 0x00 ]))

  buf = new B(2)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0x61, 0x00 ]))

  buf = new B(1)
  buf.fill(0)
  buf.write(text)
  t.deepEqual(buf, new B([ 0x61 ]))

  t.end()
})
