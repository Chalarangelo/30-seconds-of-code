---
title: Group data using the K-means clustering algorithm in JavaScript
shortTitle: K-means clustering
language: javascript
tags: [algorithm,array]
cover: antelope
excerpt: Implement the K-means clustering algorithm in JavaScript to group data into clusters.
listed: true
dateModified: 2024-05-11
---

## Definition

The [K-means clustering]((https://en.wikipedia.org/wiki/K-means_clustering)) algorithm is a popular **unsupervised machine learning algorithm** used to group a set of data into clusters. It works by **iteratively** assigning data points to the nearest cluster centroid and then recalculating the centroids based on the new assignments. This process is repeated until the centroids no longer change significantly or a maximum number of iterations is reached.

## Implementation

This implementation of the K-means clustering algorithm groups the given data into `k` clusters. **No maximum number of iterations** is set, so the algorithm will run until convergence is reached.

1. As no **initial centroids** are provided, start by using the first `k` data points as the initial `centroids`, using `Array.prototype.slice()`.
2. Initialize the `distances` array to store the **distances** between each data point and each centroid, as well as the `classes` array to store the **cluster assignments** for each data point.
3. Use a `while` loop to repeat the **assignment and update steps** as long as there are changes in the previous iteration, as indicated by the `itr` variable.
4. Calculate the [**Euclidean distance**](/js/s/euclidean-distance) between each data point and centroid using `Math.hypot()`, `Object.keys()`, and `Array.prototype.map()`.
5. Use `Array.prototype.indexOf()` and `Math.min()` to find the **closest centroid** for each data point.
6. Update the cluster assignments in the `classes` array and **check if any changes were made**.
7. **Recalculate the centroids** by summing the data points assigned to each cluster and dividing by the number of data points in each cluster, using `Array.from()`, `Array.prototype.reduce()`, `Number.parseFloat()`, and `Number.prototype.toFixed()`.
8. Repeat the process until **convergence** is reached.

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
        centroids[c][i] = Number.parseFloat(
          Number(centroids[c][i] / size).toFixed(2)
        );
      }
    }
  }

  return classes;
};

kMeans([[0, 0], [0, 1], [1, 3], [2, 0]], 2); // [0, 1, 1, 0]
```

## Complexity

The **time complexity** of the K-means clustering algorithm is `O(n * k * d * i)`, where `n` is the number of data points, `k` is the number of clusters, `d` is the number of dimensions in the data, and `i` is the number of iterations until convergence. The **space complexity** is `O(n * k + n * d)`, where the first term represents the space used by the centroids and classes arrays, and the second term represents the space used by the distances array.
