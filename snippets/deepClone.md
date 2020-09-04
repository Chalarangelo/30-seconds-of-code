---
title: deepClone
tags: object,recursion,intermediate
---

Creates a deep clone of an object.

Use recursion.
Check if the passed object is `null` and, if so, return `null`.
Use `Object.assign()` and an empty object (`{}`) to create a shallow clone of the original.
Use `Object.keys()` and `Array.prototype.forEach()` to determine which key-value pairs need to be deep cloned.
Handle simple object and array only, exclude Set Map Function Class RegExp Symbol Promise Error Date [object Boolean] Circular etc.
```js
const deepClone = obj => {
  if (obj === null) return null;
  const baseObj = Array.isArray(obj) ? [] : {};
  let clone = Object.assign(baseObj, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  return clone;
};
```

```js
const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```