---
title: intersection
tags: list,beginner
---

Returns a list of elements that exist in both lists.

Create a `set` from `b`, then use list comprehension on `a` to only keep values contained in both lists.

```py
def intersection(a, b):
  _b = set(b)
  return [item for item in a if item in _b]
```

```py
intersection([1, 2, 3], [4, 3, 2]) # [2, 3]
```
