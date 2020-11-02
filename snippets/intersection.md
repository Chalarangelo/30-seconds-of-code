---
title: intersection
tags: list,beginner
---

Returns a list of elements that exist in both lists.

- Create a `set` from `a` and `b`.
- Use the built-in set operator `&` to only keep values contained in both sets, then transform the `set` back into a `list`.

```py
def intersection(a, b):
  _a, _b = set(a), set(b)
  return list(_a & _b)
```

```py
intersection([1, 2, 3], [4, 3, 2]) # [2, 3]
```
