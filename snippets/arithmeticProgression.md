---
title: arithmeticProgression
tags: math,beginner
---

Creates an array of numbers in the arithmetic progression, starting with the given positive integer and up to the specified limit.

- Use `Array.from()` to create an array of the desired length, `lim/n`, and a map function to fill it with the desired values in the given range.

```js
const arithmeticProgression  = (n, lim) => 
  Array.from({ length: Math.ceil(lim / n) }, (_, i) => (i + 1) * n );
```

```js
arithmeticProgression(5, 25); // [5, 10, 15, 20, 25]
```
