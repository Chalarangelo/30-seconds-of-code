---
title: Check lists have same contents
tags: list
expertise: intermediate
author: maciv
firstSeen: 2020-03-15T12:54:08+02:00
lastUpdated: 2020-11-02T19:28:05+02:00
---

Checks if two lists contain the same elements regardless of order.

- Use `set()` on the combination of both lists to find the unique values.
- Iterate over them with a `for` loop comparing the `count()` of each unique value in each list.
- Return `False` if the counts do not match for any element, `True` otherwise.

```py
def have_same_contents(a, b):
  for v in set(a + b):
    if a.count(v) != b.count(v):
      return False
  return True
```

```py
have_same_contents([1, 2, 4], [2, 4, 1]) # True
```
