---
title: all_unique
tags: list,beginner
---

Returns `True` if all the values in a list are unique, `False` otherwise.

Use `set()` on the given list to remove duplicates, use `len()` to compare its length with the length of the list.

```py
def all_unique(lst):
  return len(lst) == len(set(lst))
```

```py
x = [1, 2, 3, 4, 5, 6]
y = [1, 2, 2, 3, 4, 5]
all_unique(x) # True
all_unique(y) # False
```
