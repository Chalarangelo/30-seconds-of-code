---
title: getPorcentage
tags: math,beginner
---

Get the current porcentage of a value

- Gets the `porcentage` of a value divided by a maximum value.
- Use `Number.parseInt()` to convert the result into a integer number.

```js
const getPorcentage = (currentValue, maxValue = 100) => {
  return parseInt((currentValue / maxValue) * 100);
};
```

```js
getPorcentage(18, 31); // 58%
getPorcentage(5, 60); // 8%
getPorcentage(200, 80); // 250%
getPorcentage(56); // 56%
getPorcentage(10, 10); // 100%
getPorcentage(19.2303914, 73); // 26%
```
