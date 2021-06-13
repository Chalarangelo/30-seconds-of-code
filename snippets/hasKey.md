---
title: hasKey
tags: object,intermediate
firstSeen: 2019-10-15T15:45:13+03:00
lastUpdated: 2020-10-19T22:49:51+03:00
---

Checks if the target value exists in a JSON object.

- Check if `keys` is non-empty and use `Array.prototype.every()` to sequentially check its keys to internal depth of the object, `obj`.
- Use `Object.prototype.hasOwnProperty()` to check if `obj` does not have the current key or is not an object, stop propagation and return `false`.
- Otherwise assign the key's value to `obj` to use on the next iteration.
- Return `false` beforehand if given key list is empty.

```js
const hasKey = (obj, keys) => {
  return (
    keys.length > 0 &&
    keys.every(key => {
      if (typeof obj !== 'object' || !obj.hasOwnProperty(key)) return false;
      obj = obj[key];
      return true;
    })
  );
};
```

```js
let obj = {
  a: 1,
  b: { c: 4 },
  'b.d': 5
};
hasKey(obj, ['a']); // true
hasKey(obj, ['b']); // true
hasKey(obj, ['b', 'c']); // true
hasKey(obj, ['b.d']); // true
hasKey(obj, ['d']); // false
hasKey(obj, ['c']); // false
hasKey(obj, ['b', 'f']); // false
```
