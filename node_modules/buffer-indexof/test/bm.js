var test = require('tape')
var bm = require('../bm')
test("omg",function(t){

  t.equals(bm('abc','bc'),1)
  t.equals(bm('ababc','bc'),3)
  t.equals(bm('abc','de'),-1)

  t.equals(bm('123123412345','345'),9)

  t.equals(bm('aaaba','aaba'),1,'partial matches should not be skipped')
  t.end()
  

})
