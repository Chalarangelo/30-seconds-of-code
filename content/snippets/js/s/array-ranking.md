---
title: Array ranking
type: snippet
language: javascript
tags: [array,math]
author: chalarangelo
cover: eagle
dateModified: 2022-04-13
---

Calculates the ranking of an array based on a comparator function.

- Use `Array.prototype.map()` and `Array.prototype.filter()` to map each element to a rank using the provided comparator function.

```js
const ranking = (arr, compFn) =>
  arr.map(a => arr.filter(b => compFn(a, b)).length + 1);
```

```js
ranking([8, 6, 9, 5], (a, b) => a < b);
// [2, 3, 1, 4]
ranking(['c', 'a', 'b', 'd'], (a, b) => a.localeCompare(b) > 0);
// [3, 1, 2, 4]
```
