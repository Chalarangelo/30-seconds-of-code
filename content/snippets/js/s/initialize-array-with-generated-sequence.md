---
title: Initialize a JavaScript array with a sequence of generated values
shortTitle: Initialize array with generated sequence
language: javascript
tags: [array, generator]
cover: neon-desk-2
excerpt: Ever wanted to initialize an array with a sequence of generated values? Here's a few ways to do it.
listed: true
dateModified: 2023-12-27
---

Have you ever needed to initialize an array with a **sequence of generated values**? Or perhaps you wanted to generate an array of values **until a condition is met**? While JavaScript's `Array.prototype.map()` may be your go-to solution, you might need to reach for some other tools to get the job done in some cases.

## Initialize an array using a map function

At the most basic level, you can use the `Array()` constructor and `Array.prototype.map()` to initialize an array with a sequence of values. As the `Array()` constructor results in an **array of empty slots**, you may need to use `Array.prototype.fill()` to fill it with `null` values first to avoid any weird behavior.

```js
const initializeMappedArray = (n, mapFn = (_, i) => i) =>
  Array(n).fill(null).map(mapFn);

initializeMappedArray(5); // [0, 1, 2, 3, 4]
initializeMappedArray(5, i => `item ${i + 1}`);
// ['item 1', 'item 2', 'item 3', 'item 4', 'item 5']
```

## Initialize an array while a condition is met

The previous code snippet assumed that the **length** of the array to be created is **known in advance**. But what if you want to initialize an array **while a condition is met**? For example, you might want to generate the Fibonacci sequence until you reach a certain number. In this case, you can use a `while` loop to initialize the array.

```js
const initializeArrayWhile = (conditionFn, mapFn) => {
  const arr = [];
  let i = 0;
  let el = mapFn(i, undefined, arr);
  while (conditionFn(i, el, arr)) {
    arr.push(el);
    i++;
    el = mapFn(i, el, arr);
  }
  return arr;
};

initializeArrayWhile(
  (i, val) => val < 10,
  (i, val, arr) => (i <= 1 ? 1 : val + arr[i - 2])
); // [1, 1, 2, 3, 5, 8]
```

In this code snippet, we create an empty array, `arr`, an index variable `i` and an element `el`. We then use a loop to add elements to the array, using the `mapFn` function, as long as the `conditionFn` function returns `true`.

The **condition function**, `conditionFn`, takes three arguments: the current index, the previous element and the array itself. The **mapping function**, `mapFn`, takes three arguments: the current index, the current element and the array itself.

> [!TIP]
>
> You can easily alter the behavior of this function to add elements **until the condition is met**, using a `do..while` loop, instead.

## Initialize an array using an iterator function & a seed value

Ramda's [`unfold()`](https://ramdajs.com/docs/#unfold) function provides another unique way to initialize an array. It accepts an initial **seed value** and an **iterator function** to generate the next value in the sequence. The iterator function must return an array with two elements: the **next value** in the sequence and the **next seed value**. If the iterator function returns `false`, the sequence is terminated. Here's a vanilla JavaScript implementation of this concept:

```js
const unfold = (fn, seed) => {
  let result = [],
    val = [null, seed];
  while ((val = fn(val[1]))) result.push(val[0]);
  return result;
};

const f = n => (n > 50 ? false : [-n, n + 10]);
unfold(f, 10); // [-10, -20, -30, -40, -50]
```

## Lazy initialization

As a side note, some of these operations can be time-consuming and memory-intensive. Oftentimes you may not need the entire array to be initialized at once. In these cases, you can use a **generator function** to lazily initialize the array.

As the array itself **doesn't exist in memory**, the mapping function can't access it. Instead, you can only pass the previous element as the second argument to the mapping function, allowing you to generate the next element in the sequence.

```js
const generateArrayWhile = function* (conditionFn, mapFn) {
  let i = 0;
  let el = mapFn(i, undefined);
  while (conditionFn(i, el)) {
    yield el;
    i++;
    el = mapFn(i, el);
  }
};

const range5 = generateArrayWhile(i => i < 5, i => i);
[...range5]; // [0, 1, 2, 3, 4]

const doubleUntil50 = generateArrayWhile(
  (i, val) => val < 50,
  (i, val) => (i < 1 ? 1 : val * 2)
);
[...doubleUntil50]; // [1, 2, 4, 8, 16, 32]
```

This snippet implements a generator function that returns the next element in the sequence as long as the condition is met. The only major difference is that the mapping function only accepts two arguments: the current index and the previous element.
