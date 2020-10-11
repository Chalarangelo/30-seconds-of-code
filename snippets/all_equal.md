---
title: all_equal
tags: list,beginner
---

Checks if all elements in a list are equal.

- Use `set()` to eliminate duplicate elements and then use `len()` to check if length is `1`.

```py
def all_equal(lst):
  return len(set(lst)) == 1
```

```py
all_equal([1, 2, 3, 4, 5, 6]) # False
all_equal([1, 1, 1, 1]) # True
```
