[![Build Status](https://travis-ci.org/fgnass/uniqs.svg?branch=master)](https://travis-ci.org/fgnass/uniqs)

### Tiny utility to create unions and de-duplicated lists.

Example:

```js
var uniqs = require('uniqs');

var foo = { foo: 23 };
var list = [3, 2, 2, 1, foo, foo];

uniqs(list);
// => [3, 2, 1, { foo: 23 }]
```

You can pass multiple lists to create a union:

```js
uniqs([2, 1, 1], [2, 3, 3, 4], [4, 3, 2]);
// => [2, 1, 3, 4]
```

Passing individual items works too:
```js
uniqs(3, 2, 2, [1, 1, 2]);
// => [3, 2, 1]
```

### Summary

* Uniqueness is defined based on strict object equality.
* The lists do not need to be sorted.
* The resulting array contains the items in the order of their first appearance.

### About

This package has been written to accompany utilities like
[flatten](https://npmjs.org/package/flatten) as alternative to full-blown
libraries like underscore or lodash.

The implementation is optimized for simplicity rather than performance and
looks like this:

```js
module.exports = function uniqs() {
  var list = Array.prototype.concat.apply([], arguments);
  return list.filter(function(item, i) {
    return i == list.indexOf(item);
  });
};
```

### License
MIT
