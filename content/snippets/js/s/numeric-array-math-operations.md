---
title: Perform math operations on arrays of numbers in JavaScript
shortTitle: Math operations on numeric arrays
language: javascript
tags: [array,math]
cover: red-lake
excerpt: Learn how to work with arrays of numbers in JavaScript, performing common math operations such as sum, average, product and more.
listed: true
dateModified: 2024-02-11
---

Numeric arrays are a very common data structure, one that you will often need to perform certain operations on. Most commonly, you will need to calculate the **sum**, **average**, **product** or **median** of the numbers in an array. Let's take a look at how you can do this, using JavaScript.

> [!NOTE]
>
> Some of the following functions are **variadic**, meaning they can accept any number of arguments. You can use the spread operator (`...`) to pass an array of numbers to these functions.

## Sum of an array

The sum of an array is the result of **adding all the numbers in the array together**.

Using `Array.prototype.reduce()`, you can easily calculate the sum of an array of numbers, by adding each value to an accumulator, initialized with a value of `0`.

```js
const sum = (...arr) =>
  [...arr].reduce((acc, val) => acc + val, 0);

sum(1, 2, 3, 4); // 10
sum(...[1, 2, 3, 4]); // 10
```

## Average of an array

The average of an array is the result of adding all the numbers in the array together and then **dividing the resulting sum by the length of the array**.

You can use the same technique as summing an array, then use `Array.prototype.length` to divide the resulting sum by the length of the array.

```js
const average = (...arr) =>
  [...arr].reduce((acc, val) => acc + val, 0) / arr.length;

average(...[1, 2, 3]); // 2
average(1, 2, 3); // 2
```

## Product of an array

The product of an array is the result of **multiplying all the numbers in the array together**.

You can use `Array.prototype.reduce()` to multiply each value with an accumulator, initialized with a value of `1`.

```js
const prod = (...arr) =>
  [...arr].reduce((acc, val) => acc * val, 1);

prod(1, 2, 3, 4); // 24
prod(...[1, 2, 3, 4]); // 24
```

## Median of an array

The median of an array is the **middle number when the array is sorted**. If the array has an **odd number of elements**, the median is the middle number. If the array has an **even number of elements**, the median is the average of the two middle numbers.

You can use `Array.prototype.sort()` to sort the values, then return the number at the midpoint if `Array.prototype.length` is odd, otherwise the average of the two middle numbers.

```js
const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

median([5, 6, 50, 1, -5]); // 5
```

## Weighted average of an array

The weighted average of an array is the result of **multiplying each number in the array by a corresponding weight**, adding the results together and then **dividing the resulting sum by the sum of the weights**.

You can use `Array.prototype.reduce()` to multiply each value with the corresponding weight and add the results together, then divide the resulting sum by the sum of the weights.

```js
const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};

weightedAverage([1, 2, 3], [0.6, 0.2, 0.3]); // 1.72727
```

## Standard deviation of an array

The standard deviation of an array is a measure of **how much the values in the array differ from the mean**. In order to calculate the standard deviation, you need to calculate the mean of the array, then calculate the difference between each value and the mean, square the differences, calculate the mean of the squared differences, and finally take the square root of the result.

Using `Array.prototype.reduce()` and `Math.sqrt()`, you can calculate the mean, variance and the sum of the variance of the values and determine the standard deviation. You can add an **optional second argument**, `usePopulation`, to get the population standard deviation.

```js

const standardDeviation = (arr, usePopulation = false) => {
  const mean = arr.reduce((acc, val) => acc + val, 0) / arr.length;
  return Math.sqrt(
    arr
      .reduce((acc, val) => acc.concat((val - mean) ** 2), [])
      .reduce((acc, val) => acc + val, 0) /
      (arr.length - (usePopulation ? 0 : 1))
  );
};

standardDeviation([10, 2, 38, 23, 38, 23, 21]); // 13.284434142114991 (sample)
standardDeviation([10, 2, 38, 23, 38, 23, 21], true);
// 12.29899614287479 (population)
```
