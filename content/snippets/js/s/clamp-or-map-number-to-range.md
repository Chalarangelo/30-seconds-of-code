---
title: Clamp or map a number to a range in JavaScript
shortTitle: Clamp or map to range
language: javascript
tags: [math]
cover: clay-pot-horizon
excerpt: Clamping and mapping a number to a range are two common and easily confused operations. Learn how to perform each in JavaScript.
listed: true
dateModified: 2024-02-14
---

Clamping a number means to restrict it to a certain range. Mapping a number to a range means to convert it from one range to another. Both operations are common in JavaScript and can be easily implemented using simple math.

## Clamp a number

In order to clamp a number, you can use `Math.max()` and `Math.min()` to find the **closest value** within the specified range.

```js
const clampNumber = (num, a, b) =>
  Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));

clampNumber(2, 3, 5); // 3
clampNumber(1, -1, -5); // -1
```

### Convert a number to a safe integer

A special case of clamping a number is converting it to a **safe integer**. You can use the `Number.MAX_SAFE_INTEGER` and `Number.MIN_SAFE_INTEGER` constants to find the closest safe value. Additionally, use `Math.round()` to convert to an integer.

```js
const toSafeInteger = num =>
  Math.round(
    Math.max(Math.min(num, Number.MAX_SAFE_INTEGER), Number.MIN_SAFE_INTEGER)
  );

toSafeInteger('3.2'); // 3
toSafeInteger(Infinity); // 9007199254740991
```

## Map a number to a range

Mapping a number to a range is a simple **linear transformation**. Provided the original and the target range, you can map between the limits of the two ranges.

```js
const mapNumRange = (num, inMin, inMax, outMin, outMax) =>
  ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

mapNumRange(5, 0, 10, 0, 100); // 50
```
