---
title: drop_right
tags: list,beginner
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
