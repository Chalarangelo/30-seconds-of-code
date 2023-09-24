---
title: Validate number
type: snippet
language: javascript
tags: [math]
cover: flower-portrait-9
dateModified: 2020-10-22
---

Checks if the given value is a number.

- Use `parseFloat()` to try to convert `n` to a number.
- Use `Number.isNaN()` and logical not (`!`) operator to check if `num` is a number.
- Use `Number.isFinite()` to check if `num` is finite.
- Use `Number` and the loose equality operator (`==`) to check if the coercion holds.

```js
const validateNumber = n => {
  const num = parseFloat(n);
  return !Number.isNaN(num) && Number.isFinite(num) && Number(n) == n;
}
```

```js
validateNumber('10'); // true
validateNumber('a'); // false
```
