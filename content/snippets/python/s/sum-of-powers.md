---
title: Sum of powers
language: python
tags: [math]
cover: river-flow
excerpt: Find the sum of the powers of all the numbers from `start` to `end` (both inclusive).
listed: false
dateModified: 2024-05-10
---

Using `range()` and a list comprehension, you can easily create a list of elements in a given range raised to the desired power. Then, you can use `sum()` to add the values together. This way you can find the sum of the powers of all the numbers from `start` to `end` (both inclusive).

```py
def sum_of_powers(end, power = 2, start = 1):
  return sum([(i) ** power for i in range(start, end + 1)])

sum_of_powers(10) # 385
sum_of_powers(10, 3) # 3025
sum_of_powers(10, 3, 5) # 2925
```
