---
title: Deep flatten array
tags: array,recursion
expertise: intermediate
cover: blog_images/digital-nomad-4.jpg
firstSeen: 2017-12-17T17:55:51+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Deep flattens an array.

- Use recursion.
- Use `Array.prototype.concat()` with an empty array (`[]`) and the spread operator (`...`) to flatten an array.
- Recursively flatten each element that is an array.

```js
const deepFlatten = arr =>
  [].concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
```

```js
deepFlatten([1, [2], [[3], 4], 5]); // [1, 2, 3, 4, 5]
```
