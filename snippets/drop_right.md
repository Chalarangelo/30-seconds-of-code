---
title: Drop list elements from the right
tags: list
expertise: beginner
author: chalarangelo
firstSeen: 2020-03-10T21:59:41+02:00
lastUpdated: 2020-11-02T19:27:53+02:00
---

Returns a list with `n` elements removed from the right.

- Use slice notation to remove the specified number of elements from the right.
- Omit the last argument, `n`, to use a default value of `1`.

```py
def drop_right(a, n = 1):
  return a[:-n]
```

```py
drop_right([1, 2, 3]) # [1, 2]
drop_right([1, 2, 3], 2) # [1]
drop_right([1, 2, 3], 42) # []
```
