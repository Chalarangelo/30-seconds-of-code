[![Build Status](https://secure.travis-ci.org/soldair/node-buffer-indexof.png)](http://travis-ci.org/soldair/node-buffer-indexof)
 

buffer-indexof
===================

find the index of a buffer in a buffer. should behave like String.indexOf etc.

```js

var bindexOf = require('buffer-indexof');

var newLineBuffer = new Buffer("\n");

var b = new Buffer("hi\nho\nsilver");


bindexOf(b,newLineBuffer) === 2

// you can also start from index

bindexOf(b,newLineBuffer,3) === 5

// no match === -1

bindexOf(b,newLineBuffer,6) === -1


```

CHANGELOG
----------

- 1.0.0
  - fixed issue finding multibyte needles in haystack.  thanks @imulus
- 1.0.1
  - fixed failing to find partial matches as pointed out by @bahaa-aidi in #2
