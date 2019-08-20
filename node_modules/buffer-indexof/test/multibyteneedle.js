var test = require('tape')
var bindexof = require('../')

test("can find mutibyte needles",function(t){

  t.equals(bindexof(new Buffer("hi"),new Buffer("hi")),0,'should find multibyte needle when its the whole buffer')

  // https://github.com/soldair/node-buffer-indexof/issues/2
  t.equals(bindexof(new Buffer("aaba"), new Buffer("ab")),1,'should find multibyte needle in haystack')


  t.end();


})
