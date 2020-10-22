---
title: deepClone
tags: object,recursion,advanced
---

Creates a deep clone of an object. 
Clones primitives, arrays and objects, excluding class instances.

- Use recursion.
- Check if the passed object is `null` and, if so, return `null`.
- Use `Object.assign()` and an empty object (`{}`) to create a shallow clone of the original.
- Use `Object.keys()` and `Array.prototype.forEach()` to determine which key-value pairs need to be deep cloned.
- If the object is an `Array`, set the `clone`'s `length` to that of the original and use `Array.from(clone)` to create a clone.

```js
const deepClone = obj => {
  if (obj === null) return null;
  let clone = Object.assign({}, obj);
  Object.keys(clone).forEach(
    key =>
      (clone[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
  );
  if (Array.isArray(obj)) {
    clone.length = obj.length;
    return Array.from(clone);
  }
  return clone;
};
```

```js
const a = { foo: 'bar', obj: { a: 1, b: 2 } };
const b = deepClone(a); // a !== b, a.obj !== b.obj
```
