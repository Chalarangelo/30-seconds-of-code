---
title: decimalToBinary
tags: decimal, binary, number, javascript, beginner
---

Convert decimal to binary number.

- For Numbers and BigInts `Object.prototype.toString()` takes an optional argument called `radix`
- Value of radix must be minimum 2 and maximum 36
- By using radix you can also convert base 10 numbers to another base numbers
- Be sure you are passing a number, not a string (for example: `5`, not `"5"`)

```js
const decimalToBinary = (decimal) => decimal.toString(2);
```

```js
decimalToBinary(5); // '101'
```
