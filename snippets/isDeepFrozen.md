---
title: isDeepFrozen
tags: object,recursion,intermediate
---

Checks if an object is deeply frozen.

- Use recursion.
- Use `Object.isFrozen()` on the given object.
- Use `Object.keys()`, `Array.prototype.every()` to check that all keys are either deeply frozen objects or non-object values.

```js
const isDeepFrozen = obj =>
  Object.isFrozen(obj) &&
  Object.keys(obj).every(
    prop => typeof obj[prop] !== 'object' || isDeepFrozen(obj[prop])
  );
```

```js
const x = Object.freeze({ a: 1 });
const y = Object.freeze({ b: { c: 2 } });
isDeepFrozen(x); // true
isDeepFrozen(y); // false
```
