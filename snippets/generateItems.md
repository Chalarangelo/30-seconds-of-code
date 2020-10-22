---
title: generateItems
tags: array,function,intermediate
---

Generates an array with the given amount of items, using the given function.

- Use  `Array.from()`  to create an empty array of the specific length, calling `fn` with the index of each newly created element.
- The callback takes one argument - the index of each element.

```js
const generateItems = (n, fn) => Array.from({ length: n }, (_, i) => fn(i));
```

```js
generateItems(10, Math.random);
// [0.21, 0.08, 0.40, 0.96, 0.96, 0.24, 0.19, 0.96, 0.42, 0.70]
```
