---
title: getType
tags: type,beginner
---

Returns the native type of a value.

Return `'undefined'` or `'null'` if the value is `undefined` or `null`.
Otherwise, use `Object.prototype.constructor.name` to get the name of the constructor.

```js
const getType = v => (v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name);
```

```js
getType(new Set([1, 2, 3])); // 'Set'
```
