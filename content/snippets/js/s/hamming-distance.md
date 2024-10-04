---
title: Hamming distance implementation in JavaScript
shortTitle: Hamming distance
language: javascript
tags: [math,algorithm]
cover: colorful-lounge
excerpt: Learn how to calculate the Hamming distance between two values.
listed: true
dateModified: 2024-07-18
---

The [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) is a measure of the **difference between two strings of equal length**. It is calculated by counting the number of positions at which the corresponding characters differ.

Implementing it in JavaScript is pretty straightforward, using the XOR operator (`^`) to find the **bit difference** between two numbers. We then convert the result to a **binary string**, using `Number.prototype.toString()`, and count the number of `1`s in it, using `String.prototype.match()`.

```js
const hammingDistance = (num1, num2) =>
  ((num1 ^ num2).toString(2).match(/1/g) || '').length;

hammingDistance(2, 3); // 1
```
