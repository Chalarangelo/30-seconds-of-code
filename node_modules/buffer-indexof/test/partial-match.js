var test = require('tape')
var bufferIndexOf = require('../')

test("doesnt skip partial matches",function(t){
  //'aaaba'.indexOf('aaba') // --> 1
  t.equals(bufferIndexOf(new Buffer('aaaba'), new Buffer('aaba')),1,'partial matches should not be skipped')
  t.end()
})
