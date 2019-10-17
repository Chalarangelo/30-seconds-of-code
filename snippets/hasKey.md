---
title: hasKey
tags: object,intermediate
---

Returns `true` if the target value exists in a JSON object, `false` otherwise.
Accepts target object as first parameter and list of string keys as second parameter.

Check if the list of keys is non-empty and use `Array.prototype.every()` to sequentially check
keys from given key list to internal depth of the object. Use `Object.prototype.hasOwnProperty()` to check if current object does not have
current key or is not an object at all then stop propagation and return `false`, else assign inner
value as the new object to `obj` to use it next time. Return `true` on completion.

Return `false` beforehand if given key list is empty.

```js
const hasKey = (obj, keys) => {
  return (keys.length > 0) && keys.every((key) => {
    if (typeof obj !== 'object' || !obj.hasOwnProperty(key)) return false;
    obj = obj[key];
    return true;
  });
};
```

```js
let obj = {
  a: 1,
  b: { c: 4 },
  'b.d': 5,
};
hasKey(obj, ['a']); // true
hasKey(obj, ['b']); // true
hasKey(obj, ['b', 'c']); // true
hasKey(obj, ['b.d']); // true
hasKey(obj, ['d']); // false
hasKey(obj, ['c']); // false
hasKey(obj, ['b', 'f']); // false
```
