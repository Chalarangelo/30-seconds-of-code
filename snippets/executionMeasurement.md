---
title: executionMeasurement
tags: function,beginner
---

Returns the execution time of a function.

- Use `performance.now()` to get the difference in milliseconds before and after the function's execution. 

```js
const executionMeasurement = (functionToMeasure, ...functionArgs) => {
  let timeBeforeExecution = performance.now();
  functionToMeasure(...functionArgs);
  let timeAfterExecution = performance.now();
  return timeAfterExecution - timeBeforeExecution;
}
```

```js
const sumUntil = (sumIndex) => {
  let sum = 0;
  for(let i = 0; i <= sumIndex; i++) {
    sum+=i;
  }
  return sum;
};

executionMeasurement(sumUntil, 1000); // 0.07999991066753864
executionMeasurement(sumUntil, 10 * 1000); // 0.960000092163682
executionMeasurement(sumUntil, 100 * 1000); // 2.839999971911311
executionMeasurement(sumUntil, 1000 * 1000); // 3.700000001117587
executionMeasurement(sumUntil, 10 * 1000 * 1000); // 18.109999829903245
executionMeasurement(sumUntil, 100 * 1000 * 1000); // 151.05500002391636
executionMeasurement(sumUntil, 1000 * 1000 * 1000); // 1529.1899999137968
```
