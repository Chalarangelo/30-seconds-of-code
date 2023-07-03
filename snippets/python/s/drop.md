---
title: Drop list elements from the left
type: snippet
language: python
tags: [list]
author: chalarangelo
cover: pink-flower
dateModified: 2020-11-02T19:27:53+02:00
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
