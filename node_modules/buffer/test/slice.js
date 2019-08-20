if (process.env.OBJECT_IMPL) global.TYPED_ARRAY_SUPPORT = false
var B = require('../').Buffer
var test = require('tape')

test('modifying buffer created by .slice() modifies original memory', function (t) {
  if (!B.TYPED_ARRAY_SUPPORT) return t.end()

  var buf1 = new B(26)
  for (var i = 0; i < 26; i++) {
    buf1[i] = i + 97 // 97 is ASCII a
  }

  var buf2 = buf1.slice(0, 3)
  t.equal(buf2.toString('ascii', 0, buf2.length), 'abc')

  buf2[0] = '!'.charCodeAt(0)
  t.equal(buf1.toString('ascii', 0, buf2.length), '!bc')

  t.end()
})

test('modifying parent buffer modifies .slice() buffer\'s memory', function (t) {
  if (!B.TYPED_ARRAY_SUPPORT) return t.end()

  var buf1 = new B(26)
  for (var i = 0; i < 26; i++) {
    buf1[i] = i + 97 // 97 is ASCII a
  }

  var buf2 = buf1.slice(0, 3)
  t.equal(buf2.toString('ascii', 0, buf2.length), 'abc')

  buf1[0] = '!'.charCodeAt(0)
  t.equal(buf2.toString('ascii', 0, buf2.length), '!bc')

  t.end()
})
