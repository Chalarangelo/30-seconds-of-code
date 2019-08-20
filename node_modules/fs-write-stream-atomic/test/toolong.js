var path = require('path')
var test = require('tap').test
var writeStream = require('../index.js')

function repeat (times, string) {
  var output = ''
  for (var ii = 0; ii < times; ++ii) {
    output += string
  }
  return output
}

var target = path.resolve(__dirname, repeat(1000, 'test'))

test('name too long', function (t) {
  t.plan(2)
  var stream = writeStream(target)
  var hadError = false
  stream.on('error', function (er) {
    if (!hadError) {
      t.is(er.code, 'ENAMETOOLONG', target.length + ' character name results in ENAMETOOLONG')
      hadError = true
    }
  })
  stream.on('close', function () {
    t.ok(hadError, 'got error before close')
  })
  stream.end()
})
