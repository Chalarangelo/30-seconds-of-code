var test = require('tape')
  , parse = require('./parse-headers')

  , headers1 = [
        ''
      , 'Date: Sun, 17 Aug 2014 16:24:52 GMT'
      , 'Content-Type: text/html; charset=utf-8'
      , 'Transfer-Encoding: chunked'
      , ''
    ]
  , headers2 = [
        ''
      , 'Date: Sun, 17 Aug 2014 16:24:52 GMT'
      , 'Content-Type: text/html; charset=utf-8'
      , 'Transfer-Encoding: chunked'
      , 'Set-Cookie: Foo'
      , 'set-Cookie: bar'
      , 'set-cookie: bong'
    ]

test('sanity check', function (t) {

  t.deepEqual(parse(), {})
  t.deepEqual(parse(''), {})
  t.end()
})

test('simple', function (t) {
  t.deepEqual(
      parse(headers1.join('\r\n'))
    , {
          date: 'Sun, 17 Aug 2014 16:24:52 GMT'
        , 'content-type': 'text/html; charset=utf-8'
        , 'transfer-encoding': 'chunked'
      }
  )
  t.deepEqual(
      parse(headers1.join('\n'))
    , {
          date: 'Sun, 17 Aug 2014 16:24:52 GMT'
        , 'content-type': 'text/html; charset=utf-8'
        , 'transfer-encoding': 'chunked'
      }
  )

  t.end()
})

test('duplicate keys', function (t) {
  t.deepEqual(
      parse(headers2.join('\r\n'))
    , {
          date: 'Sun, 17 Aug 2014 16:24:52 GMT'
        , 'content-type': 'text/html; charset=utf-8'
        , 'transfer-encoding': 'chunked'
        , 'set-cookie': [ 'Foo', 'bar', 'bong' ]
      }
  )
  t.deepEqual(
      parse(headers2.join('\n'))
    , {
          date: 'Sun, 17 Aug 2014 16:24:52 GMT'
        , 'content-type': 'text/html; charset=utf-8'
        , 'transfer-encoding': 'chunked'
        , 'set-cookie': [ 'Foo', 'bar', 'bong' ]
      }
  )

  t.end()
})