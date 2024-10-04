---
title: Check if two JavaScript arrays have same contents
shortTitle: Arrays have same contents
language: javascript
tags: [array]
cover: interior-15
excerpt: Learn how to compare the contents of two arrays to see if they contain the same elements regardless of order.
listed: true
dateModified: 2024-03-04
---

Have you ever wanted to compare the contents of two arrays to see if they contain the **same elements regardless of order**? While this sounds like a fairly easy task, implementing it efficiently can be a little tricky.

Starting with the most **naive solution**, you can simply **iterate** over the first array and check if each element is present the same amount of times in the second array. You can use `Array.prototype.every()` and `Array.prototype.filter()` to achieve this.

```js
const haveSameContents = (a, b) =>
  a.length === b.length &&
  a.every(v => a.filter(e => e === v).length === b.filter(e => e === v).length);

haveSameContents([1, 2, 4], [2, 4, 1]); // true
haveSameContents([1, 1, 2, 3], [2, 1, 1, 3]); // true
```

This approach is inefficient, as we might end up calculating the **frequency** of the same element in each array multiple times. We can minimize this by using a `Set` to store the **unique values** of both arrays and then comparing the frequency of each value in both arrays.

```js
const haveSameContents = (a, b) =>
  a.length === b.length &&
  [...new Set([...a, ...b])].every(
    v => a.filter(e => e === v).length === b.filter(e => e === v).length
  );

haveSameContents([1, 2, 4], [2, 4, 1]); // true
haveSameContents([1, 1, 2, 3], [2, 1, 1, 3]); // true
```

This small change can net us a significant performance improvement, as we only calculate the frequency of each value once. It also ensures that we only iterate over the unique values of both arrays, which can be a huge performance boost for large arrays.
