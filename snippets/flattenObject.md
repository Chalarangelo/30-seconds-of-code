---
title: flattenObject
tags: object,recursion,advanced
---

Flattens an object with the paths for keys.

- Use recursion.
- Use `Object.keys(obj)` combined with `Array.prototype.reduce()` to convert every leaf node to a flattened path node.
- If the value of a key is an object, the function calls itself with the appropriate `prefix` to create the path using `Object.assign()`.
- Otherwise, it adds the appropriate prefixed key-value pair to the accumulator object.
- You should always omit the second argument, `prefix`, unless you want every key to have a prefix.

```js
const flattenObject = (obj, prefix = '') =>
  Object.keys(obj).reduce((acc, k) => {
    const pre = prefix.length ? `${prefix}.` : '';
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      Object.keys(obj[k]).length > 0
    )
      Object.assign(acc, flattenObject(obj[k], pre + k));
    else acc[pre + k] = obj[k];
    return acc;
  }, {});
```

```js
flattenObject({ a: { b: { c: 1 } }, d: 1 }); // { 'a.b.c': 1, d: 1 }
```
