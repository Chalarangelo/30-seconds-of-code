---
title: Months, dates
tags: array,beginner
---

 Check the elements of an array in place and returns the sorted array.

- Use `Array.prototype.sort()` to return array in place, the default sort order is ascending.
- Time and space complexity of the sort cannot be guaranteed as it depends on the implementation.

```js
const months = ['April', 'March', 'Feb', 'Jan'];
const dates = [1, 29, 14, 21, 30];
```

```js
months.sort();
console.log(months);

dates.sort();
console.log(dates);
```
