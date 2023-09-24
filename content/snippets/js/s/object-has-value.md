---
title: Check if object has value
type: snippet
language: javascript
tags: [object]
author: chalarangelo
cover: plant-corner
dateModified: 2023-04-10
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
