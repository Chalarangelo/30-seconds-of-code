---
title: Prime factors of number
language: python
tags: [math,algorithm]
cover: river-flow
excerpt: Find the list of prime factors of a number, using a simple Python function.
listed: false
dateModified: 2024-05-12
---

The list of prime factors of a number is a list of prime numbers that multiply together to give the original number. You can find the list of prime factors of a number using a simple Python function.

All you really need is a `while` loop to iterate over all possible prime factors, starting with `2`. If the current `factor` exactly divides `num`, you can add `factor` to the `factors` list and divide `num` by `factor`. Otherwise, you can increment `factor` by one.

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

prime_factors(12) # [2,2,3]
prime_factors(42) # [2,3,7]
```
