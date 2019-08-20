# array-reduce

`[].reduce()` for old browsers

[![testling badge](https://ci.testling.com/substack/array-reduce.png)](https://ci.testling.com/substack/array-reduce)

[![build status](https://secure.travis-ci.org/substack/array-reduce.png)](http://travis-ci.org/substack/array-reduce)

# example

```
var reduce = require('array-reduce');
var xs = [ 1, 2, 3, 4 ];
var sum = reduce(xs, function (acc, x) { return acc + x }, 0);
console.log(sum);
```

output:

```
10
```

# methods

``` js
var reduce = require('array-reduce')
```

## var res = reduce(xs, f, init)

Create a result `res` by folding `acc = f(acc, xs[i], i)` over each element in
the array `xs` at element `i`. If `init` is given, the first `acc` value is
`init`, otherwise `xs[0]` is used.

# install

With [npm](https://npmjs.org) do:

```
npm install array-reduce
```

# license

MIT
