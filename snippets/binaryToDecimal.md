---
title: binaryToDecimal
tags: math,beginner
---

Converts a binary string to a decimal number.

- Use `parseInt` which takes two arguments, the value passed and base 2.

```js
const binaryToDecimal = bstr => parseInt(bstr, 2);
```

```js
binaryToDecimal('00001111'); // 15
```
