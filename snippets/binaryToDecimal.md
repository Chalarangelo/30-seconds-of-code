---
title: binaryToDecimal
tags: decimal, binary, number, javascript, beginner
---

Convert binary to decimal number.

- `parseInt(string [, radix])` function parses a string argument and returns an integer of the specified radix
- `radix` is an optional argument (an integer between 2 and 36)

```js
const binaryToDecimal = binary => parseInt(binary, 2);
```

```js
binaryToDecimal('101'); // 5
```
