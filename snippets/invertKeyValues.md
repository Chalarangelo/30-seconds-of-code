---
title: Invert object
tags: object
expertise: advanced
cover: blog_images/pineapple-on-green.jpg
firstSeen: 2018-01-01T17:33:46+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Inverts the key-value pairs of an object, without mutating it.

- Use `Object.keys()` and `Array.prototype.reduce()` to invert the key-value pairs of an object and apply the function provided (if any).
- Omit the second argument, `fn`, to get the inverted keys without applying a function to them.
- The corresponding inverted value of each inverted key is an array of keys responsible for generating the inverted value. If a function is supplied, it is applied to each inverted key.

```js
const invertKeyValues = (obj, fn) =>
  Object.keys(obj).reduce((acc, key) => {
    const val = fn ? fn(obj[key]) : obj[key];
    acc[val] = acc[val] || [];
    acc[val].push(key);
    return acc;
  }, {});
```

```js
invertKeyValues({ a: 1, b: 2, c: 1 }); // { 1: [ 'a', 'c' ], 2: [ 'b' ] }
invertKeyValues({ a: 1, b: 2, c: 1 }, value => 'group' + value);
// { group1: [ 'a', 'c' ], group2: [ 'b' ] }
```
