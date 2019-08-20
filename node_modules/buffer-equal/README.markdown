buffer-equal
============

Return whether two buffers are equal.

[![build status](https://secure.travis-ci.org/substack/node-buffer-equal.png)](http://travis-ci.org/substack/node-buffer-equal)

example
=======

``` js
var bufferEqual = require('buffer-equal');

console.dir(bufferEqual(
    new Buffer([253,254,255]),
    new Buffer([253,254,255])
));
console.dir(bufferEqual(
    new Buffer('abc'),
    new Buffer('abcd')
));
console.dir(bufferEqual(
    new Buffer('abc'),
    'abc'
));
```

output:

```
true
false
undefined
```

methods
=======

``` js
var bufferEqual = require('buffer-equal')
```

bufferEqual(a, b)
-----------------

Return whether the two buffers `a` and `b` are equal.

If `a` or `b` is not a buffer, return `undefined`.

install
=======

With [npm](http://npmjs.org) do:

```
npm install buffer-equal
```

license
=======

MIT
