---
title: Array sum
type: snippet
tags: [math]
cover: lake-trees
dateModified: 2020-10-22T20:24:30+03:00
---

Calculates the sum of two or more numbers/arrays.

- Use `Array.prototype.reduce()` to add each value to an accumulator, initialized with a value of `0`.

```js
const sum = (...arr) => [...arr].reduce((acc, val) => acc + val, 0);
```

```js
sum(1, 2, 3, 4); // 10
sum(...[1, 2, 3, 4]); // 10
```
