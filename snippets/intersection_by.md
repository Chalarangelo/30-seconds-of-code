---
title: intersection_by
tags: list,function,intermediate
---

Returns a list of elements that exist in both lists, after applying the provided function to each list element of both.

- Create a `set`, using `map()` to apply `fn` to each element in `b`.
- Use a list comprehension in combination with `fn` on `a` to only keep values contained in both lists.

```py
def intersection_by(a, b, fn):
  _b = set(map(fn, b))
  return [item for item in a if fn(item) in _b]
```

```py
from math import floor

intersection_by([2.1, 1.2], [2.3, 3.4], floor) # [2.1]
```
