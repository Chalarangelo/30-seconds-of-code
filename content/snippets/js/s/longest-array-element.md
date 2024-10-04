---
title: Find the longest element in a JavaScript array
shortTitle: Longest array element
language: javascript
tags: [array]
cover: interior-14
excerpt: Find the element with the greatest `length` in a JavaScript array.
listed: true
dateModified: 2024-08-04
---

I've often found a need to **find the longest element** in an array of strings or arrays. It has come especially handy when solving coding challenges. And it's an easy problem to solve, too.

All you need to do is create a function that takes any number of iterable objects or objects with a `length` property and returns the longest one. This can be done using `Array.prototype.reduce()` to **compare the length** of objects.

If multiple objects have the **same length**, the first one will be returned. If **no arguments** are provided, the function will return `undefined`.

```js
const longestItem = (...vals) =>
  vals.reduce((a, x) => (x.length > a.length ? x : a));

longestItem('this', 'is', 'a', 'testcase'); // 'testcase'
longestItem(...['a', 'ab', 'abc']); // 'abc'
longestItem(...['a', 'ab', 'abc'], 'abcd'); // 'abcd'
longestItem([1, 2, 3], [1, 2], [1, 2, 3, 4, 5]); // [1, 2, 3, 4, 5]
longestItem([1, 2, 3], 'foobar'); // 'foobar'
```
