---
title: List is contained in other list
type: snippet
language: python
tags: [list]
cover: sunrise-over-mountains
excerpt: Checks if the elements of the first list are contained in the second one regardless of order.
listed: true
dateModified: 2021-01-07
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

is_contained_in([1, 4], [2, 4, 1]) # True
```
