var test = require('tap').test
var meant = require('./')

test('test vs [\'tast\', \'tbst\', \'tcst\', \'foo\']', function (t) {
  var list = meant('test', ['tast', 'tbst', 'tcst', 'foo'])
  t.notEqual(list.indexOf('tast'), -1, 'list has tast')
  t.notEqual(list.indexOf('tbst'), -1, 'list has tbst')
  t.notEqual(list.indexOf('tcst'), -1, 'list has tcst')
  t.equal(list.indexOf('foo'), -1, 'list doesn\'t have foo')
  t.end()
})
