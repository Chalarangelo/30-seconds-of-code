---
title: arithmetic_progression
tags: math,beginner
---

Returns a list of numbers in the arithmetic progression starting with the given positive integer and up to the specified limit.

Use `range` and `list` with the appropriate start, step and end values.

```py
def find_multiples(n, lim):
  return list(range(n, lim + 1, n))
```

```py
find_multiples(5, 25) # [5, 10, 15, 20, 25] 
```
