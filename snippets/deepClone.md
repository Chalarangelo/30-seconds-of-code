---
title: deepClone
tags: object,recursion,intermediate
---

Creates a deep clone of an object.

Use recursion.
Use `Object.assign()` and an empty object (`{}`) to create a shallow clone of the original.
Use `Object.keys()` and `Array.prototype.forEach()` to determine which key-value pairs need to be deep cloned.

```js
const deepClone = obj => {
  let type = typeof obj;
  let isAssignable = type === "function" || type === "object" && !!obj;
  if (!isAssignable) {
    return obj;
  }
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  if (obj) {
    Object.setPrototypeOf(clone, Object.getPrototypeOf(obj));
  }
  return Array.isArray(obj) && obj.length
    ? (clone.length = obj.length) && Array.from(clone)
    : Array.isArray(obj)
    ? Array.from(obj)
    : clone;
};
```

```js
const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```