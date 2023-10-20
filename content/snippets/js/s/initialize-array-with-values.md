---
title: Initialize array with values
type: snippet
language: javascript
tags: [array]
cover: flower-portrait-1
dateModified: 2020-10-20
---

Initializes and fills an array with the specified values.

- Use the `Array()` constructor to create an array of the desired length.
- Use `Array.prototype.fill()` to fill it with the desired values.
- Omit the last argument, `val`, to use a default value of `0`.

```js
const initializeArrayWithValues = (n, val = 0) => Array(n).fill(val);
```

```js
initializeArrayWithValues(5, 2); // [2, 2, 2, 2, 2]
```
