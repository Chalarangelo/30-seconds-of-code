---
title: Time taken by function
type: snippet
tags: [function]
cover: shelf-plant
dateModified: 2020-10-22T20:24:30+03:00
---

Measures the time it takes for a function to execute.

- Use `console.time()` and `console.timeEnd()` to measure the difference between the start and end times to determine how long the callback took to execute.

```js
const timeTaken = callback => {
  console.time('timeTaken');
  const r = callback();
  console.timeEnd('timeTaken');
  return r;
};
```

```js
timeTaken(() => Math.pow(2, 10)); // 1024, (logged): timeTaken: 0.02099609375ms
```
