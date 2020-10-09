---
title: weighted_average
tags: list,intermediate
---

Returns the weighted average of two or more noumbers.

- Use `sum` to sum the products of the numbers by it's weight and to sum the weights.
- Use `for i in range(len(nums))` to move over every number in the two lists.

```py
def weightedAverage(nums,weights):
    return sum(nums[i] * weights[i] for i in range(len(nums))) / sum(weights)
```

```py
weightedAverage([1, 2, 3], [0.6,0.2,0.3]) # 1.727272727272727
```
