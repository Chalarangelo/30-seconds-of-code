---
title: "Tip: Min and max value in a JavaScript array"
shortTitle: Min and max value of an array
type: tip
tags: javascript,array,math
author: chalarangelo
cover: little-tree
excerpt: When working with numeric arrays in JavaScript, you might find yourself in need of finding the minimum or maximum value. Here's a quick and easy way to do it.
firstSeen: 2021-03-01T11:00:00+02:00
lastUpdated: 2021-11-06T20:51:47+03:00
---

When working with numeric arrays in JavaScript, you might find yourself in need of finding the minimum or maximum value. Luckily, JavaScript's `Math` built-in object has got you covered. You can simply use `Math.min()` or `Math.max()` combined with the spread operator (`...`), as both functions accept any number of arguments.

```js
const nums = [2, 4, 6, 8, 1, 3, 5, 7];

Math.max(...nums); // 8
Math.min(...nums); // 1
```

For more complex cases, such as finding the min/max value in an array of objects, you might have to resort to `Array.prototype.map()` or `Array.prototype.reduce()`. On the other hand, our [minBy](/js/s/min-by) or [maxBy](/js/s/max-by) snippets might be all you need.
