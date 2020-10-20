---
title: toDecimalMark
tags: math,beginner
---

Converts a number to a decimal mark formatted string.

- Use `Number.prototype.toLocaleString()` to convert the numbre to decimal mark format.

```js
const toDecimalMark = num => num.toLocaleString('en-US');
```

```js
toDecimalMark(12305030388.9087); // '12,305,030,388.909'
```
