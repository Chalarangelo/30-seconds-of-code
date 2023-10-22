---
title: Number is power of ten
type: snippet
language: javascript
tags: [math]
cover: boulder-beach
dateModified: 2021-01-06
---

Checks if the given number is a power of `10`.

- Use `Math.log10()` and the modulo operator (`%`) to determine if `n` is a power of `10`.

```js
const isPowerOfTen = n => Math.log10(n) % 1 === 0;
```

```js
isPowerOfTen(1); // true
isPowerOfTen(10); // true
isPowerOfTen(20); // false
```
