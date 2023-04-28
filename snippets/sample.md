---
title: Random element in array
type: snippet
tags: [array,string,random]
cover: paper-card
dateModified: 2020-10-22T20:24:30+03:00
---

Gets a random element from an array.

- Use `Math.random()` to generate a random number.
- Multiply it by `Array.prototype.length` and round it off to the nearest whole number using `Math.floor()`.
- This method also works with strings.

```js
const sample = arr => arr[Math.floor(Math.random() * arr.length)];
```

```js
sample([3, 7, 9, 11]); // 9
```
