---
title: Partition a JavaScript array into two or more arrays based on a condition
shortTitle: Partition array
language: javascript
tags: [array,object]
cover: camping-trip
excerpt: Group array elements into two or more arrays arrays, depending on the provided function's return value.
listed: true
dateModified: 2024-01-09
---

Array **partitioning** is often useful when processing data. Conceptually, partitioning an array into two is very **similar to filtering**, but instead of removing elements from the array, we group them based on the [truthiness](/js/s/truthy-falsy-values) of the provided function. For more than two partitions, the concept is fairly similar, but the implementation is a little more nuanced.

## Partition array into two

A two-partition is the simplest case and requires very little work. All we have to do is use `Array.prototype.reduce()` to create an **array of two arrays**. Then, we call the given function and use `Array.prototype.push()` to add elements for which `fn` returns `true` to the first array and elements for which `fn` returns `false` to the second one.

```js
const partition = (arr, fn) =>
  arr.reduce(
    (acc, val, i, arr) => {
      acc[fn(val, i, arr) ? 0 : 1].push(val);
      return acc;
    },
    [[], []]
  );

const users = [
  { user: 'barney', age: 36, active: false },
  { user: 'fred', age: 40, active: true },
];
partition(users, o => o.active);
// [
//   [{ user: 'fred', age: 40, active: true }],
//   [{ user: 'barney', age: 36, active: false }]
// ]
```

## Partition array into multiple arrays

Partitioning an array into an arbitrary number of arrays, based on the return value of the provided function, poses a little more of a challenge. We can still make use of `Array.prototype.reduce()`, but instead of using an array of two arrays as the accumulator, we'll use a `Map` object. This will allow us to group the elements into **as many arrays as we need**.

It also allows us to easily **check if a partition already exists** via the use of `Map.prototype.has()`. If it does, we can simply add the element to the existing partition. If it doesn't, we can create a new partition with an array containing the element.

Finally, we use `Map.prototype.values()` to get an iterator over the values of the `Map` object and use the spread operator (`...`) to convert it to an array.

```js
const partitionBy = (arr, fn) => [
  ...arr
    .reduce((acc, val, i, arr) => {
      const current = fn(val, i, arr);
      if (acc.has(current)) acc.get(current).push(val);
      else acc.set(current, [val]);
      return acc;
    }, new Map())
    .values(),
];


const numbers = [1, 1, 3, 3, 4, 5, 5, 5];

partitionBy(numbers, n => n % 3);
// [[1, 1, 4], [3, 3], [5, 5, 5]]
partitionBy(numbers, n => n);
// [[1, 1], [3, 3], [4], [5, 5, 5]]
```
