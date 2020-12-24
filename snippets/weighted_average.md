---
title: weighted_average
tags: math,list,intermediate
---

Returns the weighted average of two or more numbers.

- Use `sum()` to sum the products of the numbers by their weight and to sum the weights.
- Use `zip()` and a list comprehension to iterate over the pairs of values and weights.

```py
def weighted_average(nums, weights):
  return sum(x * y for x, y in zip(nums, weights)) / sum(weights)
```

```py
weighted_average([1, 2, 3], [0.6, 0.2, 0.3]) # 1.72727
```
