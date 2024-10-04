---
title: Classify data using the K-nearest neighbors algorithm in JavaScript
shortTitle: K-nearest neighbors
language: javascript
tags: [algorithm,array]
cover: building-blocks
excerpt: Implement the K-nearest neighbors algorithm in JavaScript to classify a data point relative to a labelled data set.
listed: true
dateModified: 2024-05-12
---

## Definition

The [K-nearest neighbors](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) algorithm is a **simple, instance-based learning algorithm** used for classification and regression tasks. It classifies a data point based on the majority class of its `k` nearest neighbors in a feature space.

## Implementation

This implementation classifies a data point relative to a labelled data set, using the K-nearest neighbors algorithm. The `data` is expected to be an array of objects, where each object represents a data point with its features. The `labels` are an array of the corresponding classes for each data point.

1. Use `Array.prototype.map()` to map the `data` to objects. Each object contains the [**Euclidean distance**](/js/s/euclidean-distance) of the element from `point`, calculated using `Math.hypot()`, `Object.keys()` and its `label`.
2. Use `Array.prototype.sort()` and `Array.prototype.slice()` to get the `k` **nearest neighbors** of `point`.
3. Use `Array.prototype.reduce()` in combination with `Object.keys()` and `Array.prototype.indexOf()` to find the **most frequent** `label` among them.
4. Return the most frequent `label` as the **classification** of `point`.

```js
const kNearestNeighbors = (data, labels, point, k = 3) => {
  const kNearest = data
    .map((el, i) => ({
      dist: Math.hypot(...Object.keys(el).map(key => point[key] - el[key])),
      label: labels[i]
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, k);

  return kNearest.reduce(
    (acc, { label }, i) => {
      acc.classCounts[label] =
        Object.keys(acc.classCounts).indexOf(label) !== -1
          ? acc.classCounts[label] + 1
          : 1;
      if (acc.classCounts[label] > acc.topClassCount) {
        acc.topClassCount = acc.classCounts[label];
        acc.topClass = label;
      }
      return acc;
    },
    {
      classCounts: {},
      topClass: kNearest[0].label,
      topClassCount: 0
    }
  ).topClass;
};

const data = [[0, 0], [0, 1], [1, 3], [2, 0]];
const labels = [0, 1, 1, 0];

kNearestNeighbors(data, labels, [1, 2], 2); // 1
kNearestNeighbors(data, labels, [1, 0], 2); // 0
```

## Complexity

The **time complexity** of this algorithm is `O(n)` for each classification, where `n` is the number of data points. The **space complexity** is `O(n)` as well, since we are storing the distances and labels for each data point. The algorithm is **non-parametric**, meaning it does not make any assumptions about the underlying data distribution. It is also **lazy**, as it does not require a training phase, making it suitable for online learning scenarios.
