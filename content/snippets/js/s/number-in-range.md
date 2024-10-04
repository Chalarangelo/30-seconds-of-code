---
title: Check if a number is inside a given range with JavaScript
shortTitle: Number in range
language: javascript
tags: [math]
cover: white-tablet
excerpt: Check if the given number falls within the specified numeric range.
listed: true
dateModified: 2024-08-12
---

Given a number and a range, you can **check if the number falls within the specified range**. This can be useful when you need to validate user input or filter a list of numbers.

As the simplest solutions are often the best, we need only use **arithmetic comparison** to check if the number is in the specified range. If the second argument, `end`, is not specified, the range is considered to be from `0` to `start`. If, however, the `start` value is greater than the `end` value, we can swap them to ensure that the range is valid.

```js
const inRange = (n, start, end = null) => {
  if (end && start > end) [end, start] = [start, end];
  return end == null ? n >= 0 && n < start : n >= start && n < end;
};

inRange(3, 2, 5); // true
inRange(3, 4); // true
inRange(2, 3, 5); // false
inRange(3, 2); // false
```
