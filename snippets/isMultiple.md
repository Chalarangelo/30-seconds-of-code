---
title: isMultiple
tags: math,begginer
---

This snippet checks if the second number is multiple of the first number.

- This snippet uses modulo (`%`) and verify if the remainder is 0.

```js
const isMultiple = (num1, num2) =>
  {num2 % num1 === 0}
```

```js
isMultiple(5,10); // 'true'
```
