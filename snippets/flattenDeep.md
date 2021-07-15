---
title: flattenDeep
tags: array,beginner
firstSeen: 2021-07-15T21:15:33+05:00
lastUpdated: 2021-07-15T21:15:33+05:00
---

Flattens an array depth.

-   Set the depth to level `1` using `flat`.

```js
const flattenDeep = (arr) => arr.flat(Infinity)
```

```js
flatten([1, [2], 3, 4]) // [1, 2, 3, 4]
flatten([1, [2, [3], 4], 5, 6, 7]) // [1, 2, 3, 4, 5, 6, 7]
```
