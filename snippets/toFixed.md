---
title: toFixed
tags: number,string,beginner
---

Returns a string that represents a number, rounded to the specified number of decimals

- Use `number.toFixed(x)` to round a number to a given decimal point(x)
- Here,x is optional.If x is not specified, number will be rounded to the nearest integer

```js
const toFixed = (number,n = 0) =>
  number.toFixed(n)
```

```js
toFixed(123.33334,2);  // '123.33'
toFixed(64.5,3);      // '64.500'
toFixed(123.33334);   // '123'
```
