---
title: Calculate the nth root of a number in JavaScript
shortTitle: Nth root of number
language: javascript
tags: [math]
cover: tree-roots
excerpt: Use `Math.pow()` to calculate the nth root of a given number in JavaScript.
listed: true
dateModified: 2024-02-17
---

The **nth root** of a number `x` is a value that, when multiplied by itself `n` times, gives `x`. The nth root can also be expressed as a **power** of `x`, where `x ^ (1/n)` is equal to the nth root of `x`.

Given this, we can use `Math.pow()` to calculate the nth root of a given number. Simply pass it the number `x` and a power of `1 / n`, and you'll get the nth root of `x`.

```js
const nthRoot = (x, n) => Math.pow(x, 1 / n);

nthRoot(32, 5); // 2
```
