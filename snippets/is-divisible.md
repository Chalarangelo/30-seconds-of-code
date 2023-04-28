---
title: Number is divisible
type: snippet
tags: [math]
cover: clutter-2
dateModified: 2020-09-15T16:28:04+03:00
---

Checks if the first numeric argument is divisible by the second one.

- Use the modulo operator (`%`) to check if the remainder is equal to `0`.

```js
const isDivisible = (dividend, divisor) => dividend % divisor === 0;
```

```js
isDivisible(6, 3); // true
```
