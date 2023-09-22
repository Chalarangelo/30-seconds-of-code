---
title: Prime factors of number
type: snippet
language: python
tags: [math,algorithm]
cover: river-flow
dateModified: 2023-05-24T05:00:00+02:00
---

Finds and returns the list of prime factors of a number.

- Use a `while` loop to iterate over all possible prime factors, starting with `2`.
- If the current `factor` exactly divides `num`, add `factor` to the `factors` list and divide `num` by `factor`. Otherwise, increment `factor` by one.

```py
def prime_factors(num):
  factors = []
  factor = 2
  while (num >= 2):
    if (num % factor == 0):
      factors.append(factor)
      num = num / factor
    else:
      factor += 1
  return factors
```

```py
prime_factors(12) # [2,2,3]
prime_factors(42) # [2,3,7]
```
