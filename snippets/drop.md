---
title: drop
tags: list,beginner
---

Returns a list with `n` elements removed from the left.

- Use slice notation to remove the specified number of elements from the left.
- Omit the last argument, `n`, to use a default value of `1`.

```py
def drop(a, n = 1):
  return a[n:]
```

```py
drop([1, 2, 3]) # [2, 3]
drop([1, 2, 3], 2) # [3]
drop([1, 2, 3], 42) # []
```
