---
title: Partition array in two
tags: array,object
expertise: intermediate
firstSeen: 2018-01-08T16:58:23+02:00
lastUpdated: 2020-11-03T21:46:13+02:00
---

Groups the elements into two arrays, depending on the provided function's truthiness for each element.

- Use `Array.prototype.reduce()` to create an array of two arrays.
- Use `Array.prototype.push()` to add elements for which `fn` returns `true` to the first array and elements for which `fn` returns `false` to the second one.

```js
const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );
```

```js
const users = [
  { user: 'barney', age: 36, active: false },
  { user: 'fred', age: 40, active: true },
];
partition(users, o => o.active);
// [
//   [{ user: 'fred', age: 40, active: true }],
//   [{ user: 'barney', age: 36, active: false }]
// ]
```
