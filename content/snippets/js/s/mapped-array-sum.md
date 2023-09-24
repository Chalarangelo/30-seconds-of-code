---
title: Mapped array sum
type: snippet
language: javascript
tags: [math,array]
cover: avocado-slices
dateModified: 2020-11-03
---

Calculates the sum of an array, after mapping each element to a value using the provided function.

- Use `Array.prototype.map()` to map each element to the value returned by `fn`.
- Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`.

```js
const sumBy = (arr, fn) =>
  arr
    .map(typeof fn === 'function' ? fn : val => val[fn])
    .reduce((acc, val) => acc + val, 0);
```

```js
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], x => x.n); // 20
sumBy([{ n: 4 }, { n: 2 }, { n: 8 }, { n: 6 }], 'n'); // 20
```
