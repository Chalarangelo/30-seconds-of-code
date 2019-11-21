---
title: getType
tags: type,beginner
---

Returns the native type of a value.

Returns lowercased constructor name of value, `"undefined"` or `"null"` if value is `undefined` or `null`.

```js
const getType = el => Object.prototype.toString.call(el).slice(8, -1).toLowerCase();
```

```js
getType(new Set([1, 2, 3])); // 'set'
```