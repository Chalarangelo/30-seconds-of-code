---
title: Check if object has value
tags: object
author: chalarangelo
cover: plant-corner
firstSeen: 2023-04-10T05:00:00-04:00
---

Checks if the target value exists in a JSON object.

- Use `Object.values()` to get all the values of the object.
- Use `Array.prototype.includes()` to check if the target value is included in the values array.

```js
const hasValue = (obj, value) => Object.values(obj).includes(value);
```

```js
const obj = { a: 100, b: 200 };
hasValue(obj, 100); // true
hasValue(obj, 999); // false
```
