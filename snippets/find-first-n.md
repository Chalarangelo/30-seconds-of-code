---
title: Find first n matches
tags: array
cover: digital-nomad-5
firstSeen: 2021-05-09T13:31:36+03:00
lastUpdated: 2021-05-09T13:31:36+03:00
---

Finds the first `n` elements for which the provided function returns a truthy value.

- Use a `for...in` loop to execute the provided `matcher` for each element of `arr`.
- Use `Array.prototype.push()` to append elements to the results array and return them if its `length` is equal to `n`.

```js
const findFirstN = (arr, matcher, n = 1) => {
  let res = [];
  for (let i in arr) {
    const el = arr[i];
    const match = matcher(el, i, arr);
    if (match) res.push(el);
    if (res.length === n) return res;
  }
  return res;
};
```

```js
findFirstN([1, 2, 4, 6], n => n % 2 === 0, 2); // [2, 4]
findFirstN([1, 2, 4, 6], n => n % 2 === 0, 5); // [2, 4, 6]
```
