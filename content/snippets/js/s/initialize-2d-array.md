---
title: How can I initialize 2D array in JavaScript?
shortTitle: Initialize 2D array
language: javascript
tags: [array,recursion]
cover: cloudy-rock-formation
excerpt: Learn how to initialize a 2D array in JavaScript in a handful of different ways.
listed: true
dateModified: 2023-12-27
---

**2D arrays**, also known as **matrices**, are pretty common in many areas of programming. While some languages provide a built-in way to initialize a 2D array, JavaScript does not.

## Initialize a 2D array with a specific value

Given a **width** and **height**, you can create a 2D array and fill it with a specific value. Use `Array.from()` and `Array.prototype.map()` to generate rows equal to `height` where each row is an array of size `width`. Use `Array.prototype.fill()` to initialize all items with the desired value.

```js
const initialize2DArray = (width, height, val = null) =>
  Array.from({ length: height }).map(() =>
    Array.from({ length: width }).fill(val)
  );

initialize2DArray(2, 2, 0); // [[0, 0], [0, 0]]
```

### Initialize n-dimensional array with a specific value

A more generic version of the above snippet can be used to initialize an **n-dimensional array** with a specific value. The technique at its core is the same, except for the use of rest arguments and recursion to handle the arbitrary number of dimensions.

```js
const initializeNDArray = (val, ...args) =>
  args.length === 0
    ? val
    : Array.from({ length: args[0] }).map(() =>
        initializeNDArray(val, ...args.slice(1))
      );

initializeNDArray(1, 3); // [1, 1, 1]
initializeNDArray(5, 2, 2, 2); // [[[5, 5], [5, 5]], [[5, 5], [5, 5]]]
```

## Initialize a 2D array using a map function

A more complex scenario might involve initializing a 2D array with a **sequence of generated values**. For example, you might want to generate a 2D array of coordinates for a grid. Replacing `Array.prototype.fill()` with `Array.prototype.map()` allows us to use a map function to generate the values.

```js
const initializeMapped2DArray = (width, height, mapFn = () => null) =>
  Array.from({ length: height }).map((_, i) =>
    Array.from({ length: width }).map((_, j) => mapFn(i, j))
  );

initializeMapped2DArray(2, 2, (x, y) => `(${x}, ${y})`);
// [['(0, 0)', '(0, 1)'], ['(1, 0)', '(1, 1)']]
```

## Initialize a skewed 2D array

**Skewed 2D arrays** are arrays where the length of each row is not the same. A simple example would be a triangle where the length of each row is equal to its index. In this case, we can replace the numeric width argument with a **function that calculates the length of each row**.

```js
const initializeSkewed2DArray = (
  heigh,
  widthFn = () => h,
  mapFn = () => null
) =>
  Array.from({ length: heigh }, (_, i) =>
    Array.from({ length: widthFn(i) }).map((_, j) => mapFn(i, j))
  );

initializeSkewed2DArray(
  5,
  i => i + 1,
  (x, y) => x * y
);
// [[0], [0, 1], [0, 2, 4], [0, 3, 6, 9], [0, 4, 8, 12, 16]]
```
