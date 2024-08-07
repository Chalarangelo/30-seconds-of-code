---
title: Weighted average
type: snippet
language: python
tags: [math,list]
cover: digital-nomad-4
excerpt: Returns the weighted average of two or more numbers.
listed: true
dateModified: 2020-12-24
---

Returns the weighted average of two or more numbers.

- Use `sum()` to sum the products of the numbers by their weight and to sum the weights.
- Use `zip()` and a list comprehension to iterate over the pairs of values and weights.

```py
def weighted_average(nums, weights):
  return sum(x * y for x, y in zip(nums, weights)) / sum(weights)

weighted_average([1, 2, 3], [0.6, 0.2, 0.3]) # 1.72727
```
