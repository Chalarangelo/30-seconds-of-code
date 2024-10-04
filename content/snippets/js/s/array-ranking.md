---
title: Calculate the ranking of a JavaScript array
shortTitle: Array ranking
language: javascript
tags: [array,math]
cover: eagle
excerpt: Calculate the ranking of an array based on a comparator function in JavaScript.
listed: true
dateModified: 2024-02-16
---

The **ranking** of an array is a list of the **positions** of its elements, based on a **comparator function**. This can be useful for sorting algorithms or ranking items in a list for display purposes.

In order to implement this, you can use `Array.prototype.map()` to iterate over each element and map it to its ranking. In order to calculate the ranking, you can use `Array.prototype.filter()` to count the number of elements that are smaller than the current element, based on the provided comparator function, `compFn`.

```js
const ranking = (arr, compFn) =>
  arr.map(a => arr.filter(b => compFn(a, b)).length + 1);

ranking([8, 6, 9, 5], (a, b) => a < b);
// [2, 3, 1, 4]
ranking(['c', 'a', 'b', 'd'], (a, b) => a.localeCompare(b) > 0);
// [3, 1, 2, 4]
```
