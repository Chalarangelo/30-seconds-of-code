---
title: kMeans
tags: algorithm,array,advanced
---

Groups the given data into `k` clusters using the k-means clustering algorithm.

- Use `Array.from()` and `Array.prototype.slice()` to initialize appropriate variables for the cluster `centroids`, `distances` and `classes`.
- Use a `while` loop to repeat the assignment and update steps as long as there are changes in the previous iteration, as indicated by `itr`.
- Calculate the euclidean distance between each data point and centroid using `Math.hypot()`, `Object.keys()` and `Array.prototype.map()`.
- Use `Array.prototype.indexOf()` and `Math.min()` to find the closest centroid.
- Use `Array.from()` and `Array.prototype.reduce()`, as well as `parseFloat()` and `Number.prototype.toFixed()` to calculate the new centroids.

```js
const kMeans = (data, k = 1) => {
  const centroids = data.slice(0, k);
  const distances = Array.from({ length: data.length }, () =>
    Array.from({ length: k }, () => 0)
  );
  const classes = Array.from({ length: data.length }, () => -1);
  let itr = true;

  while (itr) {
    itr = false;

    for (let d in data) {
      for (let c = 0; c < k; c++) {
        distances[d][c] = Math.hypot(
          ...Object.keys(data[0]).map(key => data[d][key] - centroids[c][key])
        );
      }
      const m = distances[d].indexOf(Math.min(...distances[d]));
      if (classes[d] !== m) itr = true;
      classes[d] = m;
    }

    for (let c = 0; c < k; c++) {
      centroids[c] = Array.from({ length: data[0].length }, () => 0);
      const size = data.reduce((acc, _, d) => {
        if (classes[d] === c) {
          acc++;
          for (let i in data[0]) centroids[c][i] += data[d][i];
        }
        return acc;
      }, 0);
      for (let i in data[0]) {
        centroids[c][i] = parseFloat(Number(centroids[c][i] / size).toFixed(2));
      }
    }
  }

  return classes;
};
```

```js
kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]
```
