---
title: N max elements
tags: list,math
expertise: beginner
firstSeen: 2018-01-19T11:25:28+02:00
lastUpdated: 2020-11-02T19:28:27+02:00
---

Returns the `n` maximum elements from the provided list.

- Use `sorted()` to sort the list.
- Use slice notation to get the specified number of elements.
- Omit the second argument, `n`, to get a one-element list.
- If `n` is greater than or equal to the provided list's length, then return the original list (sorted in descending order).

```py
def max_n(lst, n = 1):
  return sorted(lst, reverse = True)[:n]
```

```py
max_n([1, 2, 3]) # [3]
max_n([1, 2, 3], 2) # [3, 2]
```
