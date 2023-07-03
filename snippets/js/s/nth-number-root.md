---
title: Nth root of number
type: snippet
language: javascript
tags: [math]
author: chalarangelo
cover: tree-roots
dateModified: 2021-01-06T22:47:48+02:00
---

Calculates the nth root of a given number.

- Use `Math.pow()` to calculate `x` to the power of `1 / n` which is equal to the nth root of `x`.

```js
const nthRoot = (x, n) => Math.pow(x, 1 / n);
```

```js
nthRoot(32, 5); // 2
```
