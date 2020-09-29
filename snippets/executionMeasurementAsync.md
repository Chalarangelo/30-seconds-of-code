---
title: executionMeasurementAsync
tags: function,beginner
---

Returns the execution time of an async function.

- Use `performance.now()` to get the difference in milliseconds before and after the function's execution.
- Use `await` to check how much time the async function executed. 

```js
const executionMeasurementAsync = async (functionToMeasure, ...functionArgs) =>
  {
      let timeBeforeExecution = performance.now();
      await functionToMeasure(...functionArgs);
      let timeAfterExecution = performance.now();
      return timeAfterExecution - timeBeforeExecution;
  }
```

```js
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

await executionMeasurementAsync(sleep, 1000); // 1001.9600000232458
await executionMeasurementAsync(sleep, 3000); // 3009.635000023991
await executionMeasurementAsync(sleep, 5000); // 5010.509999934584
```
