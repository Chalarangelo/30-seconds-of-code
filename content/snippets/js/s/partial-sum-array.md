---
title: Create an array of partial sums in JavaScript
shortTitle: Partial sum array
language: javascript
tags: [array,math]
cover: people-on-beach
excerpt: Create an array of partial sums, using `Array.prototype.reduce()` and `Array.prototype.slice()`.
listed: true
dateModified: 2024-03-24
---

The **partial sum** of an array is the sum of all elements up to a certain index. While you may instinctively reach for `Array.prototype.map()` to calculate partial sums, you'll find that you need to keep track of the previous sum. This is where `Array.prototype.reduce()` comes in handy.

Using `Array.prototype.reduce()` allows you to **keep track of the previous sum** while iterating over the array. By initializing the accumulator with an **empty array**, you can then use `Array.prototype.slice()` to get the **previous partial sum** or `0` if it's the first element.

Finally, using the spread operator (`...`), you can add the new partial sum to the accumulator array containing the previous sums.

```js
const accumulate = (...nums) =>
  nums.reduce((acc, n) => [...acc, n + (acc.slice(-1)[0] || 0)], []);

accumulate(1, 2, 3, 4); // [1, 3, 6, 10]
accumulate(...[1, 2, 3, 4]); // [1, 3, 6, 10]
```
