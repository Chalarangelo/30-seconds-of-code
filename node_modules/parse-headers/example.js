var parse = require('./parse-headers')

  , headers = [
        'Date: Sun, 17 Aug 2014 16:24:52 GMT'
      , 'Content-Type: text/html; charset=utf-8'
      , 'Transfer-Encoding: chunked'
      , 'X-Custom-Header: beep'
      , 'X-Custom-Header: boop'
    ].join('\n')

console.log(parse(headers))