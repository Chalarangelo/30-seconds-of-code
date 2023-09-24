---
title: Array union
type: snippet
language: javascript
tags: [array]
cover: yellow-white-mug-2
dateModified: 2020-10-22
---

Returns every element that exists in any of the two arrays at least once.

- Create a `Set` with all values of `a` and `b` and convert it to an array.

```js
const union = (a, b) => Array.from(new Set([...a, ...b]));
```

```js
union([1, 2, 3], [4, 3, 2]); // [1, 2, 3, 4]
```
