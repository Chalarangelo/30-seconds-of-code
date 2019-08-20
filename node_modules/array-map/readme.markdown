# array-map

`[].map(f)` for older browsers

[![testling badge](https://ci.testling.com/substack/array-map.png)](https://ci.testling.com/substack/array-map)

[![build status](https://secure.travis-ci.org/substack/array-map.png)](http://travis-ci.org/substack/array-map)

# example

``` js
var map = require('array-map');
var letters = map([97,98,99], function (c) {
    return String.fromCharCode(c);
});
console.log(letters.join(''));
```

output:

```
abc
```

# methods

``` js
var map = require('array-map')
```

## var ys = map(xs, f)

Create a new array `ys` by applying `f(xs[i], i, xs)` to each element in `xs` at
index `i`.

# install

With [npm](https://npmjs.org) do:

```
npm install array-map
```

# license

MIT
