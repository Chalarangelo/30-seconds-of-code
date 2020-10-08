---
title: keyBy
tags: array,object,function,intermediate
---

Creates an object from an array, generating keys according to a given function.

- Use `Array.prototype.map()` to create array of entries (tuples), with the key as first item and value as the second.
- Use `Object.fromEntries()` to create an object from array of the entries.

```js
function keyBy(arr, fn) {
  const entries = arr.map((item, i) => [fn(item, i), item]);
  return Object.fromEntries(entries);
}
```

```js
keyBy(['a','bb','ccc'], a => a); // { a: "a", bb: "bb", ccc: "ccc" }
keyBy(['a','bb','ccc'], a => a.length); // {1: "a", 2: "bb", 3: "ccc"}
```


