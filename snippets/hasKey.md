---
title: hasKey
tags: object,recursion,intermediate
---

Returns `true` if the target value exists in a JSON object, `false` otherwise.

Check if the key contains `.`, use `String.prototype.split('.')[0]` to get the first part and store as `_key`.
Use `typeof` to check if the contents of `obj[key]` are an `object` and, if so, call `hasKey` with that object and the remainder of the `key`.
Otherwise, use `Object.keys(obj)` in combination with `Array.prototype.includes()` to check if the given `key` exists.

```js
const hasKey = (obj, key) => {
  if (key.includes('.')) {
    let _key = key.split('.')[0];
    if (typeof obj[_key] === 'object')
      return hasKey(obj[_key], key.slice(key.indexOf('.') + 1))
  }
  return Object.keys(obj).includes(key);
}
```

```js
let obj = {
  a: 1, b: { c: 4 }, 'd.e': 5
}
hasKey(obj, 'a'); // true
hasKey(obj, 'b'); // true
hasKey(obj, 'b.c'); // true
hasKey(obj, 'd.e'); // true
hasKey(obj, 'd'); // false
hasKey(obj, 'f'); // false
```
