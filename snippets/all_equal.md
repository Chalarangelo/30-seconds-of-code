---
title: Check if list elements are identical
tags: list
expertise: beginner
firstSeen: 2019-08-20T11:39:18+03:00
lastUpdated: 2020-10-11T13:40:42+03:00
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
