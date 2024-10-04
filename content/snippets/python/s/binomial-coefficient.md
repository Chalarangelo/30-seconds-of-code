---
title: Binomial coefficient
language: python
tags: [math]
cover: digital-nomad-5
excerpt: Calculate the number of ways to choose `k` items from `n` items without repetition and without order.
listed: false
dateModified: 2024-05-09
---

The binomial coefficient is the number of ways to choose `k` items from `n` items without repetition and without order. In Python, you can calculate the binomial coefficient using the `math.comb()` function.s

```py
from math import comb

def binomial_coefficient(n, k):
  return comb(n, k)

binomial_coefficient(8, 2) # 28
```
