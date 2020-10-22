---
title: union
tags: array,beginner
---

Returns every element that exists in any of the two arrays at least once.

- Create a `new Set()` with all values of `a` and `b` and convert it to an array.

```js
const union = (a, b) => Array.from(new Set([...a, ...b]));
```

```js
union([1, 2, 3], [4, 3, 2]); // [1, 2, 3, 4]
```
