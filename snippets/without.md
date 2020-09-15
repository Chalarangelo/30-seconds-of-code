---
title: without
tags: array,beginner
---

Filters out the elements of an array, that have one of the specified values.

- Use `Array.prototype.filter()` to create an array excluding(using `!Array.includes()`) all given values.

```js
const without = (arr, ...args) => arr.filter(v => !args.includes(v));
```

```js
without([2, 1, 2, 3], 1, 2); // [3]
```
