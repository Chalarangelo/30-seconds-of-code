---
title: Sampling, shuffling and weighted selection in JavaScript arrays
shortTitle: Sample, shuffle and weighted selection
language: javascript
tags: [array,random]
cover: blue-bench
excerpt: Learn how to shuffle, sample and perform weighted selection on JavaScript arrays.
listed: true
dateModified: 2024-03-15
---

Random value selection and shuffling are essential tools to have when working with arrays in JavaScript. While `Math.random()` seems like the easy solution for everything, it's sometimes not enough. In other cases, it's not obvious how to use it to get, for example, a random element while taking into account weight factors. Luckily, there's a solution for every one of these problems.

## Shuffle an array

Using `Math.random()` to shuffle an array seems like the obvious solution, yet it's **heavily biased and not recommended**. Instead, you can use the [Fisher-Yates algorithm](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates'_original_method) to reorder the elements of the array. This algorithm is efficient and unbiased, and it's the go-to solution for shuffling arrays. The implementation below creates a **new array** and shuffles the elements of the original array into it.

```js
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const foo = [1, 2, 3];
shuffle(foo); // [2, 3, 1], foo = [1, 2, 3]
```

## Sample a random element from an array

Getting a random element from an array is as simple as generating a **random index** and returning the element at that index. To calculate the index, you can use `Math.random()` and `Array.prototype.length` to generate a random number in the range of the array's length. Additionally, you need to use `Math.floor()` to round the number down to the nearest integer.

```js
const sample = arr => arr[Math.floor(Math.random() * arr.length)];

sample([3, 7, 9, 11]); // 9
```

## Sample multiple random elements from an array

Sampling multiple elements is a little more involved. Using the **shuffle** function provided above, you can use `Array.prototype.slice()` to get the first `n` elements from the shuffled array. If you don't provide a second argument, `n`, you'll get only one element at random from the array.

```js
const shuffle = ([...arr]) => {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
};

const sampleSize = ([...arr], n = 1) => shuffle(arr).slice(0, n);

sampleSize([1, 2, 3], 2); // [3, 1]
sampleSize([1, 2, 3], 4); // [2, 3, 1]
```

## Weighted sample from an array

A more advanced use cases might involve weighted selection, where the **probability** of each element being selected is provided upfront. In order for this to work, you can use `Array.prototype.reduce()` to create an **array of partial sums** for each value in `weights`. Then, you can use `Math.random()` to generate a random number and `Array.prototype.findIndex()` to find the correct index based on it.

```js
const weightedSample = (arr, weights) => {
  let roll = Math.random();
  return arr[
    weights
      .reduce(
        (acc, w, i) => (i === 0 ? [w] : [...acc, acc[acc.length - 1] + w]),
        []
      )
      .findIndex((v, i, s) => roll >= (i === 0 ? 0 : s[i - 1]) && roll < v)
  ];
};

weightedSample([3, 7, 9, 11], [0.1, 0.2, 0.6, 0.1]); // 9
```
