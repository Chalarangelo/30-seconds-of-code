---
title: equals
tags: object,array,type,advanced
firstSeen: 2018-01-15T18:34:11+02:00
lastUpdated: 2020-10-22T20:23:47+03:00
---

Performs a deep comparison between two values to determine if they are equivalent.

- Check if the two values are identical, if they are both `Date` objects with the same time, using `Date.prototype.getTime()` or if they are both non-object values with an equivalent value (strict comparison).
- Check if only one value is `null` or `undefined` or if their prototypes differ.
- If none of the above conditions are met, use `Object.keys()` to check if both values have the same number of keys.
- Use `Array.prototype.every()` to check if every key in `a` exists in `b` and if they are equivalent by calling `equals()` recursively.

```js
const equals = (a, b) => {
  if (a === b) return true;
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== 'object' && typeof b !== 'object'))
    return a === b;
  if (a.prototype !== b.prototype) return false;
  let keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every(k => equals(a[k], b[k]));
};
```

```js
equals(
  { a: [2, { e: 3 }], b: [4], c: 'foo' },
  { a: [2, { e: 3 }], b: [4], c: 'foo' }
); // true
equals([1, 2, 3], { 0: 1, 1: 2, 2: 3 }); // true
```
