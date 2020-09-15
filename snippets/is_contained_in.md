---
title: is_contained_in
tags: list,intermediate
---

Returns `True` if the elements of the first list are contained in the second one regardless of order, `False` otherwise.

- Use `count()` to check if any value in `a` has more occurences than it has in `b`, returning `False` if any such value is found, `True` otherwise.

```py
def is_contained_in(a, b):
  for v in set(a):
    if a.count(v) > b.count(v):
      return False
  return True
```

```py
is_contained_in([1, 4], [2, 4, 1]) # True
```
