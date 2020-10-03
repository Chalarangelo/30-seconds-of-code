---
title: average
tags: math,array,beginner
---

Returns the weighted average of two or more numbers.


```js
function weightedAverage(arrValue, arrWeight) {
  const acc = arrValue.map(function (value, i) {
    var weight = arrWeight[i];
    var sum = value * weight;

    return [sum, weight];
  }).reduce(function (p, c) {
    return [p[0] + c[0], p[1] + c[1]];
  }, [0, 0]);
  return result[0] / result[1];
}


```

```js
weightedAverage([1, 2, 3], [0.6, 0.3, 0.2]);
// => 0.2
```
