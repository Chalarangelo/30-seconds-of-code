var test = require('tape');
var bindexOf = require('../');

test("can haz working",function(t){


  var newLineBuffer = new Buffer("\n");

  var b = new Buffer("hi\nho\nsilver");

  t.equals(bindexOf(new Buffer('a'), new Buffer('abc')), -1, 'should not match')


  t.equals(bindexOf(new Buffer('aaa'), new Buffer('aa'), 2), -1, 'should not match with 2 offset')
  t.equals(bindexOf(new Buffer('aaa'), new Buffer('aa')), 0, 'should match')

  t.equals(bindexOf(b,newLineBuffer),2,'should find newlines');

  // you can also start from index

  t.equals(bindexOf(b,newLineBuffer,3),5,"should find newlines after offset");

  // no match === -1

  t.equals(bindexOf(b,newLineBuffer,6),-1,"should not find newlines where none are.");


  t.end();
})


test("can handle overlapping matches",function(t){
  console.log(1,'aaaba'.indexOf('aaba'))
  console.log(2,bindexOf(new Buffer('aaaba'), new Buffer('aaba')))
  console.log(3,(new Buffer('aaaba')).indexOf(new Buffer('aaba')))
  t.end()
})
