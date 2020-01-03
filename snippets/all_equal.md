---
title: all_equal
tags: list,beginner
---

Checks if all elements in a list are equal.

Use `[1:]` and `[:-1]` to compare all the values in the given list.

```py
def all_equal(lst):
  return lst[1:] == lst[:-1]
```

```py
all_equal([1, 2, 3, 4, 5, 6]) # False
all_equal([1, 1, 1, 1]) # True
```
