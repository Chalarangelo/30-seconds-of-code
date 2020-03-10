---
title: find_last
tags: list,beginner
---

Returns the value of the last element in the provided list that satisfies the provided testing function.

Use list comprehension and `next()` to return the last element in `lst` for which `fn` returns `True`.

```py
def find_last(lst, fn):
  return next(x for x in lst[::-1] if fn(x))
```

```py
find_last([1, 2, 3, 4], lambda n: n % 2 == 1) # 3
```
