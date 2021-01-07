---
title: all_unique
tags: list,beginner
---

Checks if all the values in a list are unique.

- Use `set()` on the given list to keep only unique occurrences.
- Use `len()` to compare the length of the unique values to the original list.

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
