---
title: sdbm
tags: math,intermediate
firstSeen: 2017-12-27T17:12:34+02:00
lastUpdated: 2020-10-22T20:24:30+03:00
---

Hashes the input string into a whole number.

- Use `String.prototype.split()` and `Array.prototype.reduce()` to create a hash of the input string, utilizing bit shifting.

```js
const sdbm = str => {
  let arr = str.split('');
  return arr.reduce(
    (hashCode, currentVal) =>
      (hashCode =
        currentVal.charCodeAt(0) +
        (hashCode << 6) +
        (hashCode << 16) -
        hashCode),
    0
  );
};
```

```js
sdbm('name'); // -3521204949
```
