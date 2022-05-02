---
title: K-nearest neighbors
tags: algorithm,array
expertise: advanced
author: chalarangelo
cover: blog_images/building-blocks.jpg
firstSeen: 2020-12-28T16:31:43+02:00
lastUpdated: 2021-10-13T19:29:39+02:00
---

Classifies a data point relative to a labelled data set, using the [k-nearest neighbors](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) algorithm.

- Use `Array.prototype.map()` to map the `data` to objects. Each object contains the euclidean distance of the element from `point`, calculated using `Math.hypot()`, `Object.keys()` and its `label`.
- Use `Array.prototype.sort()` and `Array.prototype.slice()` to get the `k` nearest neighbors of `point`.
- Use `Array.prototype.reduce()` in combination with `Object.keys()` and `Array.prototype.indexOf()` to find the most frequent `label` among them.

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
```

```js
const data = [[0, 0], [0, 1], [1, 3], [2, 0]];
const labels = [0, 1, 1, 0];

kNearestNeighbors(data, labels, [1, 2], 2); // 1
kNearestNeighbors(data, labels, [1, 0], 2); // 0
```
