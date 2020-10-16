---
title: scaler min and max of your array between 0 and 1
tags: array,beginner,statistic,math
---

Return a list of new array between 0 and 1 with the same variance
- Find the minimum value from the list.
- Find the maximum value from the list.
- Convert each element in list by subtracking with the minumum and 
divide it with the difference value between the maximum and the minimum.

```js
const minmaxScaler = list_array => {
    let min = Math.min.apply(null, list_array);
    let max = Math.max.apply(null, list_array);
    return list_array.map(x => ((x - min) / (max - min)));
}
```

```js
minmaxScaler([4, 7, 9, 2]); // [0.285, 0.714, 1, 0]
```