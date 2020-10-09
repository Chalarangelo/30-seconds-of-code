---
title: weightedAverage
tags: math,array,intermediate
---

Returns the weighted average of two or more numbers.

- Use `Array.prototype.reduce()` to create the weighted sum of the values and the sum of the weights.
- Divide them with each other to get the weighted average.

```js
const weightedAverage = (nums, weights) => {
  const [sum, weightSum] = weights.reduce(
    (acc, w, i) => {
      acc[0] = acc[0] + nums[i] * w;
      acc[1] = acc[1] + w;
      return acc;
    },
    [0, 0]
  );
  return sum / weightSum;
};
```

```js
weightedAverage([1, 2, 3], [0.6,0.2,0.3]); // 1.72727
```
