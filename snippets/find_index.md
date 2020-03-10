---
title: find_index
tags: list,beginner
---

Returns the index of the first element in the provided list that satisfies the provided testing function.

Use list comprehension, `enumerate()` and `next()` to return the index of the first element in `lst` for which `fn` returns `True`.

```py
def find_index(lst, fn):
  return next(i for i, x in enumerate(lst) if fn(x))
```

```py
find_index([1, 2, 3, 4], lambda n: n % 2 == 1) # 0
```
