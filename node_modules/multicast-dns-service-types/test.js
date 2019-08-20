var tape = require('tape')
var type = require('./')

tape('stringifies', function (t) {
  t.same(type.stringify('http', 'tcp'), '_http._tcp')
  t.same(type.stringify('http', 'tcp', 'sub'), '_http._tcp._sub')
  t.same(type.stringify('http', 'tcp', 'sub', 'sub2'), '_http._tcp._sub._sub2')
  t.same(type.stringify('http', 'tcp', ['sub', 'sub2']), '_http._tcp._sub._sub2')
  t.same(type.stringify({name: 'http', protocol: 'tcp', subtypes: ['sub', 'sub2']}), '_http._tcp._sub._sub2')
  t.end()
})

tape('parses', function (t) {
  t.same(type.parse('_http._tcp'), {name: 'http', protocol: 'tcp', subtypes: []})
  t.same(type.parse('_http._tcp._sub'), {name: 'http', protocol: 'tcp', subtypes: ['sub']})
  t.same(type.parse('_http._tcp._sub._sub2'), {name: 'http', protocol: 'tcp', subtypes: ['sub', 'sub2']})
  t.end()
})

tape('shorthands', function (t) {
  t.same(type.tcp('http'), '_http._tcp')
  t.same(type.tcp('http', 'sub'), '_http._tcp._sub')
  t.same(type.tcp('http', 'sub', 'sub2'), '_http._tcp._sub._sub2')
  t.same(type.tcp('http', ['sub', 'sub2']), '_http._tcp._sub._sub2')
  t.end()
})
