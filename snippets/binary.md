---
title: binary
tags: function,beginner
---

Creates a function that accepts up to two arguments, ignoring any additional arguments.

Call the provided function, `fn`, with the first two arguments given.

```js
const binary = fn => (a, b) => fn(a, b);
```

```js
['2', '1', '0'].map(binary(Math.max)); // [2, 1, 2]
```
