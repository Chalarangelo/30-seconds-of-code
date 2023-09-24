---
title: Hash string into number
type: snippet
language: javascript
tags: [math]
cover: cloudy-lake-reflection
dateModified: 2020-10-22
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
