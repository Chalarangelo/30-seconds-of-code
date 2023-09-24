---
title: Fibonacci
type: snippet
language: javascript
tags: [math,algorithm]
cover: matrix-flow
dateModified: 2020-12-28
---

Generates an array, containing the Fibonacci sequence, up until the nth term.

- Use `Array.from()` to create an empty array of the specific length, initializing the first two values (`0` and `1`).
- Use `Array.prototype.reduce()` and `Array.prototype.concat()` to add values into the array, using the sum of the last two values, except for the first two.

```js
const fibonacci = n =>
  Array.from({ length: n }).reduce(
    (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
    []
  );
```

```js
fibonacci(6); // [0, 1, 1, 2, 3, 5]
```
