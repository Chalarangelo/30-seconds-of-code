---
title: What is the difference between prefix and postfix operators?
shortTitle: Prefix and postfix operators
type: question
tags: [javascript,math]
author: chalarangelo
cover: plant-candle
excerpt: While both the prefix and postfix operators increment a value, the resulting value of the expression is very different.
dateModified: 2021-10-31T05:00:00-04:00
---

The increment operator (`++`) adds `1` to its operand and returns a value. Similarly, the decrement operator (`--`) subtracts `1` from its operand and returns a value. Both of these operators can be used either prefix (`++i`, `--i`) or postfix (`i++`, `i--`).

If used prefix, the value is incremented/decremented, and the value of the expression is the updated value.

```js
let i = 0;    // i = 0
let j = ++i;  // i = 1, j = 1
let k = --i;  // i = 0, k = 0
```

If used postfix, the value is incremented/decremented, and the value of the expression is the original value.

```js
let i = 0;    // i = 0
let j = i++;  // i = 1, j = 0
let k = i--;  // i = 0, k = 1
```
