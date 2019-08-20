
var tape = require('tape')

var indexes = require('./')

tape('indexes of - 2 matches', function (t) {
  var x = indexes([1,2,3, 2,4,5,9,8,0], 2)
  t.deepEqual(x, [1,3])
  t.end()
})


tape('indexes of - 1 match', function (t) {
  var x = indexes([1,2,3, 2,4,5,9,8,0], 2)
  t.deepEqual(x, [1,3])
  t.end()
})


tape('indexes of - empty', function (t) {
  var x = indexes([1,2,3, 2,4,5,9,8,0], 24)
  t.deepEqual(x, [])
  t.end()
})


tape('indexes of - empty', function (t) {
  var x = indexes([8,8,8,8,8,8,8], 8)
  t.deepEqual(x, [0,1,2,3,4,5,6])
  t.end()
})


tape('indexes of - string', function (t) {
  var x = indexes('foo bar baz foo', 'foo')
  t.deepEqual(x, [0, 12])
  t.end()
})
