---
title: Array union
tags: array
expertise: beginner
firstSeen: 2017-12-17T16:41:31+02:00
lastUpdated: 2020-10-22T20:24:44+03:00
---

Returns every element that exists in any of the two arrays at least once.

- Create a `Set` with all values of `a` and `b` and convert it to an array.

```js
const union = (a, b) => Array.from(new Set([...a, ...b]));
```

```js
union([1, 2, 3], [4, 3, 2]); // [1, 2, 3, 4]
```
