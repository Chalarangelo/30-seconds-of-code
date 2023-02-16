---
title: Object to pairs
tags: object,array
author: chalarangelo
cover: purple-leaves
firstSeen: 2020-03-23T15:07:23+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Creates an array of key-value pair arrays from an object or other iterable.

- Check if `Symbol.iterator` is defined and, if so, use `Array.prototype.entries()` to get an iterator for the given iterable.
- Use `Array.from()` to convert the result to an array of key-value pair arrays.
- If `Symbol.iterator` is not defined for `obj`, use `Object.entries()` instead.

```js
const toPairs = obj =>
  obj[Symbol.iterator] instanceof Function && obj.entries instanceof Function
    ? Array.from(obj.entries())
    : Object.entries(obj);
```

```js
toPairs({ a: 1, b: 2 }); // [['a', 1], ['b', 2]]
toPairs([2, 4, 8]); // [[0, 2], [1, 4], [2, 8]]
toPairs('shy'); // [['0', 's'], ['1', 'h'], ['2', 'y']]
toPairs(new Set(['a', 'b', 'c', 'a'])); // [['a', 'a'], ['b', 'b'], ['c', 'c']]
```
