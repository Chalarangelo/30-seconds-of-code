---
title: has_duplicates
tags: list,beginner
---

Checks if there are duplicate values in a flat list.

- Use `set()` on the given list to remove duplicates, compare its length with the length of the list.

```py
def has_duplicates(lst):
  return len(lst) != len(set(lst))
```

```py
x = [1, 2, 3, 4, 5, 5]
y = [1, 2, 3, 4, 5]
has_duplicates(x) # True
has_duplicates(y) # False
```
