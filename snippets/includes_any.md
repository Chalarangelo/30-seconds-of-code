---
title: List includes any values
tags: list
expertise: intermediate
author: maciv
firstSeen: 2020-03-15T12:54:08+02:00
lastUpdated: 2020-11-02T19:28:05+02:00
---

Checks if any element in `values` is included in `lst`.

- Check if any value in `values` is contained in `lst` using a `for` loop.
- Return `True` if any one value is found, `False` otherwise.

```py
def includes_any(lst, values):
  for v in values:
    if v in lst:
      return True
  return False
```

```py
includes_any([1, 2, 3, 4], [2, 9]) # True
includes_any([1, 2, 3, 4], [8, 9]) # False
```
