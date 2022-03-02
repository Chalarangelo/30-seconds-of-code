---
title: List is contained in other list
tags: list
expertise: intermediate
firstSeen: 2020-03-16T19:48:15+02:00
lastUpdated: 2021-01-07T23:30:28+02:00
---

Checks if the elements of the first list are contained in the second one regardless of order.

- Use `count()` to check if any value in `a` has more occurrences than it has in `b`.
- Return `False` if any such value is found, `True` otherwise.

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
