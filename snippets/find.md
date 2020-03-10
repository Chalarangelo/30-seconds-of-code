---
title: find
tags: list,beginner
---

Returns the value of the first element in the provided list that satisfies the provided testing function.

Use list comprehension and `next()` to return the first element in `lst` for which `fn` returns `True`.

```py
def find(lst, fn):
  return next(x for x in lst if fn(x))
```

```py
find([1, 2, 3, 4], lambda n: n % 2 == 1) # 1
```
