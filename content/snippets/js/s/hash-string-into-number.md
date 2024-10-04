---
title: Implement the SDBM hash function in JavaScript
shortTitle: Hash string into number
language: javascript
tags: [math]
cover: cloudy-lake-reflection
excerpt: SDBM is a simple, non-cryptographic hash function that can hash strings into whole numbers. Here's a JavaScript implementation.
listed: true
dateModified: 2024-03-03
---

The SDBM algorithm is a simple **hash function**. It is a fast and simple function that can be used to hash strings into whole numbers. It is **not suitable for cryptographic purposes**, but it is great for creating **unique identifiers** for objects.

The algorithm itself is pretty straightforward. It iterates over each character in the input string, adding the character's **Unicode value** to the hash, and then **left-shifting** the hash by 6 and 16 bits, and finally **subtracting** the original hash value.

In order to implement it in JavaScript, you can use `String.prototype.split()` and `Array.prototype.reduce()` to create a hash of the input string, utilizing bit shifting as described above.

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

sdbm('name'); // -3521204949
```
