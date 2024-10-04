---
title: Initialize a JavaScript array with a given numeric range
shortTitle: Initialize array with range
language: javascript
tags: [array]
cover: spanish-resort
excerpt: Learn how to create an inclusive array with numbers in a range, using a common `step` difference.
listed: true
dateModified: 2023-12-25
---

[Array initialization](/js/s/array-initialization) could be considered a fundamental JavaScript skill. Unfortunately, JavaScript lacks some of the built-in functionality that other languages have, such as Python's [`range()`](https://docs.python.org/3/library/functions.html#func-range) function. Let's dive into building a JavaScript equivalent.

> [!NOTE]
>
> All methods presented here will produce an array containing `start` (**inclusive**) but not `end` (**exclusive**) for consistency with Python's `range()` method. To include the `end` value, you will have to alter the `length` formula and the mapping function accordingly.

## Initialize array with a numeric range

We can use `Array.from()` for the purpose of creating a new array. We need to know the `length` of the array beforehand, which can be calculated from the range of numbers we want to include.

The general formula for the `length` of the array is `(end - start) / step`.
All three values are supplied as function arguments. To make sure that the `length` is an integer, we will use `Math.ceil()` to round up the result.

```js
const range = (end, start = 0, step = 1) =>
  Array.from(
    { length: Math.ceil((end - start) / step) },
    (_, i) => i * step + start
  );

range(5); // [0, 1, 2, 3, 4]
range(7, 3); // [3, 4, 5, 6]
range(9, 0, 2); // [0, 2, 4, 6, 8]
```

## Initialize array with a reversed numeric range

If you want a reversed range, you might be tempted to use `Array.prototype.reverse()` on the result of the previous snippet. However, this is relatively inefficient, as it requires **iterating over the entire array twice**.

Instead, we can modify the mapping function of the previous snippet to produce the desired result, iterating over the given range in reverse. In order to do so, we will need to swap `start` for `end` and negate the `step` value.

```js
const rangeReverse = (end, start = 0, step = 1) =>
  Array.from(
    { length: Math.ceil((end - start) / step) },
    (_, i) => i * -step + end
  );

rangeReverse(5); // [5, 4, 3, 2, 1]
rangeReverse(7, 3); // [7, 6, 5, 4]
rangeReverse(9, 0, 2); // [9, 7, 5, 3, 1]
```

## Generalized `range()` function, matching Python's signature

Having two functions that serve slightly different purposes is not uncommon, but we can generalize the solution to **infer the correct behavior based on the supplied arguments**. For reverse ranges, we would simply supply a negative `step` value.

Another quality of life improvement would be to match Python's `range()` signatures. This would allow us to supply either `(end)`, `(start, end)`, or `(start, end, step)` as arguments. Notice the **change in order of the first two arguments**. In order to do so, we will have to ditch the default values for the arguments and use a conditional statement to **check the number of supplied arguments**.

```js
const range = (start, end, step) => {
  if (end === undefined) [end, start] = [start, 0];
  if (step === undefined) step = start < end ? 1 : -1;

  return Array.from(
    { length:  Math.ceil((end - start) / step) },
    (_, i) => i * step + start
  );
};

// Positive step value
range(5); // [0, 1, 2, 3, 4]
range(3, 7); // [3, 4, 5, 6]
range(0, 9, 2); // [0, 2, 4, 6, 8]

// Negative step value
range(5, 0, -1); // [5, 4, 3, 2, 1]
range(7, 3); // [7, 6, 5, 4]
range(9, 0, -2); // [9, 7, 5, 3, 1]
```
