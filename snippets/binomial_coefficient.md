---
title: Binomial coefficient
tags: math
expertise: beginner
author: maciv
firstSeen: 2020-10-04T11:56:31+03:00
lastUpdated: 2020-11-02T19:27:07+02:00
---

Calculates the number of ways to choose `k` items from `n` items without repetition and without order.

- Use `math.comb()` to calculate the binomial coefficient.

```py
from math import comb

def binomial_coefficient(n, k):
  return comb(n, k)
```

```py
binomial_coefficient(8, 2) # 28
```
