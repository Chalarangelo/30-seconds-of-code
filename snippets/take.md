---
title: take
tags: list,beginner
---

Returns a list with `n` elements removed from the beginning.

Use slice notation to create a slice of the list with `n` elements taken from the beginning.

```py
def take(itr, n = 1):
  return itr[:n]
```

```py
take([1, 2, 3], 5) # [1, 2, 3]
take([1, 2, 3], 0) # []
```
