---
title: offset
tags: array,beginner
firstSeen: 2018-04-10T19:07:50+03:00
lastUpdated: 2020-10-21T21:54:53+03:00
---

Moves the specified amount of elements to the end of the array.

- Use `Array.prototype.slice()` twice to get the elements after the specified index and the elements before that.
- Use the spread operator (`...`) to combine the two into one array.
- If `offset` is negative, the elements will be moved from end to start.

```js
const offset = (arr, offset) => [...arr.slice(offset), ...arr.slice(0, offset)];
```

```js
offset([1, 2, 3, 4, 5], 2); // [3, 4, 5, 1, 2]
offset([1, 2, 3, 4, 5], -2); // [4, 5, 1, 2, 3]
```
