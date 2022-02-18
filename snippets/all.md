---
title: Test if all array elements are truthy
tags: array,beginner
firstSeen: 2018-02-14T11:46:15+02:00
lastUpdated: 2020-10-18T20:24:28+03:00
---

Checks if the provided predicate function returns `true` for all elements in a collection.

- Use `Array.prototype.every()` to test if all elements in the collection return `true` based on `fn`.
- Omit the second argument, `fn`, to use `Boolean` as a default.

```js
const all = (arr, fn = Boolean) => arr.every(fn);
```

```js
all([4, 2, 3], x => x > 1); // true
all([1, 2, 3]); // true
```
