---
title: arithmetic_progression
tags: math,beginner
---

Generates a list of numbers in the arithmetic progression starting with the given positive integer and up to the specified limit.

- Use `range()` and `list()` with the appropriate start, step and end values.

```py
def arithmetic_progression(n, lim):
  return list(range(n, lim + 1, n))
```

```py
arithmetic_progression(5, 25) # [5, 10, 15, 20, 25] 
```
