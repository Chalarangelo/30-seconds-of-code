---
title: How can I remove trailing zeros from a number in JavaScript?
shortTitle: Remove trailing zeros from number
type: story
tags: [javascript,math]
author: chalarangelo
cover: island-corridor
excerpt: When formatting decimal values in JavaScript, trailing zeros can be undesired. Here's how to deal with them.
dateModified: 2022-05-08T05:00:00-04:00
---

JavaScript provides a couple of ways to format numeric values to a given precision. Namely, you can use `Number.prototype.toFixed()` and `Number.prototype.toPrecision()` to similar effect. However, neither of them deals with trailing zeros in the decimal part. Here's a few ways you can remove them:

### Regular expression

Provided that the number is converted to a fixed-point string, you can use a regular expression to remove trailing zeros. All you have to do is match the decimal point (`\.`) and replace any zeros after it (`0+`) until the end of the string (`$`).

```js
const toFixedWithoutZeros = (num, precision) =>
  num.toFixed(precision).replace(/\.0+$/, '');

toFixedWithoutZeros(1.001, 2); // '1'
toFixedWithoutZeros(1.500, 2); // '1.50'
```

The main issue with this approach is that the regular expression will only remove trailing zeros if the decimal part has no other digits before them. Writing a regular expression to remove trailing zeros from any number is a bit more involved and gets harder to read. Thus, this approach is discouraged.

### Multiply by 1

A better way to remove trailing zeros is to multiply by `1`. This method will remove trailing zeros from the decimal part of the number, accounting for non-zero digits after the decimal point. The only downside is that the result is a numeric value, so it has to be converted back to a string.

```js
const toFixedWithoutZeros = (num, precision) =>
  `${1 * num.toFixed(precision)}`;

toFixedWithoutZeros(1.001, 2); // '1'
toFixedWithoutZeros(1.500, 2); // '1.5'
```

### Number.parseFloat

Similar to the previous approach, you can use `Number.parseFloat()` to remove trailing zeros from a number. This method also accounts for non-zero digits after the decimal point. We recommend this approach as it's the most readable.

```js
const toFixedWithoutZeros = (num, precision) =>
  `${Number.parseFloat(num.toFixed(precision))}`;

toFixedWithoutZeros(1.001, 2); // '1'
toFixedWithoutZeros(1.500, 2); // '1.5'
```
