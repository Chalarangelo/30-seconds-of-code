---
title: Invoke functions on arguments
type: snippet
language: javascript
tags: [function]
cover: armchair-in-yellow
dateModified: 2020-10-21
---

Creates a function that invokes each provided function with the arguments it receives and returns the results.

- Use `Array.prototype.map()` and `Function.prototype.apply()` to apply each function to the given arguments.

```js
const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args));
```

```js
const minMax = over(Math.min, Math.max);
minMax(1, 2, 3, 4, 5); // [1, 5]
```
