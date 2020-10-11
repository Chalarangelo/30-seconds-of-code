---
title: isBinary
tags: string,regexp,intermediate
---

Check if a string is a Binary number.

- Use `RegExp.prototype.test()` to check if input string matches against binary number regex pattern.

```js
const isBinary = (binary) => /^[0-1]+$/.test(binary);
```

```js
isBinary(110011001); // true
isBinary(123); // false
isBinary('ab12s'); // false
```
