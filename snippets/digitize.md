---
title: digitize
tags: math,list,beginner
---

Converts a number to a list of digits.

- Use `map()` combined with `int` on the string representation of `n` and return a list from the result.

```py
def digitize(n):
  return list(map(int, str(n)))
```

```py
digitize(123) # [1, 2, 3]
```
