---
title: Mapped array sum
tags: math,array
expertise: intermediate
cover: blog_images/avocado-slices.jpg
firstSeen: 2018-01-11T12:25:54+02:00
lastUpdated: 2020-11-03T22:11:18+02:00
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
